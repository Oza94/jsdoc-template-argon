/** @module publish */
const path = require('path');
const ejs = require('ejs');
const fs = require('fs-extra-promise');
const slugify = require('slugify');
const bluebird = require('bluebird');

const LinkHelper = require('./src/helpers/link');

const helpers = {
  link: new LinkHelper(),
};

/**
 * A custom logger.
 * @todo replace console calls with Function.prototype when options.debug === false
 * @type {Object}
 */
const logger = {
  /* eslint-disable no-console */
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  /* eslint-enable no-console */
};

function copyFile(src, dest) {
  return fs.readFileAsync(src)
    .then(content => fs.outputFile(dest, content));
}

function renderTemplate(relpath, data, options) {
  return new Promise((resolve, reject) => {
    data.helpers = helpers;
    ejs.renderFile(path.resolve(__dirname, relpath), data, options, (err, html) => {
      if (err) {
        logger.error(err);
        return reject(err);
      }

      resolve(html);
    });
  });
}

function createRecordPage(outpath, page, wrapper) {
  return renderTemplate('tpl/page/record.ejs', page)
    .then(html => wrapper(html))
    .then(html => fs.outputFileAsync(path.resolve(outpath, page.recordUrl), html));
}

/**
 * Generate documentation output.
 *
 * @param {TAFFY} data - A TaffyDB collection representing
 *                       all the symbols documented in your code.
 * @param {object} opts - An object with options information.
 */
exports.publish = function(data, opts) {
  const conf = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), opts.configure), 'utf-8'));
  const tplConf = conf.template || {};
  const outpath = path.resolve(process.cwd(), opts.destination || 'docs');
  // @todo handle multiple entries
  const srcpath = path.resolve(process.cwd(), opts._[0]);

  const menuData = {};
  const pages = [];

  // @todo move this thing in a "outputTaffy" debug template
  fs.outputFileAsync('./taffydata.json', data().stringify()).then(() => logger.log('output done'));

  // find modules members
  data({ kind: 'module' }).each((module) => {
    module.$members = [];

    data({ memberof: module.longname }).each(moduleMember => {
      moduleMember.skip = true;
      module.$members.push(moduleMember);
    });
  });

  // find class members (attributes / methods)
  data({ kind: 'class' }).each((record) => {
    record.$methods = [];
    record.$attributes = [];
    record.$staticmethods = [];
    record.$staticproperties = [];
    record.$augments = [];
    record.$augmentedBy = [];

    if (record.description) {
      const copy = JSON.parse(JSON.stringify(record));
      copy.name = 'constructor';
      copy.classConstructor = true;
      copy.slug = 'constructor';
      record.$methods.push(copy);
    }

    // find members
    data({
      memberof: record.longname,
    }).each((memberRecord) => {
      if (memberRecord.undocumented) {
        return;
      }

      memberRecord.skip = true;
      memberRecord.slug = slugify(memberRecord.longname);

      if (memberRecord.meta.code.type === 'MethodDefinition') {
        record.$methods.push(memberRecord);
      } else {
        record.$attributes.push(memberRecord);
      }
    });

    // find agmented
    if (record.augments) {
      record.augments.forEach(typeName => {
        const superclassRecord = data({ longname: typeName }).first();
        if (superclassRecord) {
          record.$augments.push(superclassRecord);
          superclassRecord.$augmentedBy.push({ name: record.name });
        } else {
          record.$augments.push({ name: typeName });
        }
      });
    }
  });

  logger.log('================');
  let sourceFiles = [];
  data().each((record) => {

    if (!record.meta) {
      if (record.kind === 'package') {
        sourceFiles = record.files;
      }
      return;
    }
    if (record.undocumented) return;

    const { name, kind, scope } = record;
    const { filename, path: filepath, lineno } = record.meta;
    const relpath = filepath.replace(srcpath, '').slice(1, filepath.length - srcpath.length);
    const fullpath = path.join(relpath, filename);
    const modulepath = relpath; 
    const menupath = tplConf.referencePaths === 'folder' ? modulepath : fullpath.replace('.js', '');
    const filepath2 = path.join(relpath, filename);
    record.filepath = filepath2;

    logger.log(name, '(', fullpath, '-', lineno, ')', kind, scope);

    if (!menuData[menupath]) {
      menuData[menupath] = [];
    }

    if (name === 'applyBlueprint') {
      logger.log(record);
    }

    let klassRecord = null;

    if (record.meta.code.type === 'MethodDefinition') {
      klassRecord = data({ name: record.memberof, kind: 'class' }).first();
      if (name === 'applyBlueprint') {
        logger.log(klassRecord);
      }
      if (klassRecord) {
        record.skip = true;
      } else {
        logger.warn('member will not show up in documentation');
      }
    } else if (record.scope === 'instance' && record.memberof) {
      // attribute
      klassRecord = data({ name: record.memberof, kind: 'class' }).first();

      if (klassRecord) {
        record.skip = true;
      } else {
        logger.warn('member attribute will not show up in documentation');
      }
    }

    if (record.kind !== 'member') {
      const recordUrl = slugify(`${menupath}-${name}.html`);
      helpers.link.registerType(name, recordUrl);
      menuData[menupath].push({
        name: name,
        kind: kind,
        record: record,
        scope: scope,
        recordUrl: recordUrl,
      });
      pages.push({
        name: name,
        kind: kind,
        record: record,
        recordUrl: recordUrl,
      });
    }
  });

  let _menuhtml = null;
  const menuWrapper = html => renderTemplate('tpl/index.ejs', {
    menu: _menuhtml,
    content: html,
  });

  //console.log('outpath', srcpath, outpath);
  // index.html generation
  // copyFile(path.resolve(__dirname, 'tpl/index.html'), path.resolve(outpath, 'index.html'));
  renderTemplate('tpl/menu/menu.ejs', { menuData: menuData })
    .then(html => {
      _menuhtml = html;
      return html;
    })
    // index page
    .then(html => renderTemplate('tpl/index.ejs', {
      menu: html,
      content: 'This is the homepage',
    }))
    .then(html => fs.outputFileAsync(path.resolve(outpath, 'index.html'), html))
    .then(() => bluebird.map(pages, page => createRecordPage(outpath, page, menuWrapper)))
    .then(copyFile(path.resolve(__dirname, 'tpl/style.css'), path.resolve(outpath, 'style.css')))
    .then(() => bluebird.map(sourceFiles, filepath => {
      const relpath = filepath.replace(srcpath, '');
      return fs.readFileAsync(filepath, 'utf-8')
        .then(source => renderTemplate('tpl/page/source.ejs', {
          source: source,
          path: filepath.replace(srcpath, ''),
        })).then(html => renderTemplate('tpl/index.ejs', {
          menu: _menuhtml,
          content: html,
        }))
        .then(html =>
          fs.outputFileAsync(path.resolve(outpath, `source-${slugify(relpath)}.html`), html)
        );
    }, { concurrency: 5 }));
};
