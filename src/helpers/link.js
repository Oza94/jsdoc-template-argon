const slugify = require('slugify');
const MDN_URL = 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/%symbol%';
const identifier = /^[a-z_$][a-z0-9_$]*$/i;

const NATIVE_TYPES = ['String', 'Number', 'Boolean', 'Map', 'Set', 'Object', 'Array'];

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
 }

/**
 * Help building documentation links
 */
class LinkHelper {
  /**
   * Create a new LinkHelper
   * @param {Object} conf - The template configuration
   * @return {void}
   */
  constructor(conf) {
    /**
     * Map each type (either native or user-defined) to an URL
     * @type {Object}
     */
    this.typesTpl = {
      /* String: MDN_URL,
      Number: MDN_URL,
      Boolean: MDN_URL,
      Set: MDN_URL,
      Map: MDN_URL,
      Object: MDN_URL,
      Array: MDN_URL, */
    };

    if (conf.builtins && conf.builtins.mdnLinks) {
      // register built-ins with mdn URLs if enabled in configuration
      NATIVE_TYPES.forEach(type => this.registerType(type, MDN_URL));

      if (conf.builtins.allowUncapitalized) {
        // register builtins with lower case version if this is enabled in configuration
        NATIVE_TYPES
          .map(type => type.toLowerCase())
          .forEach(type => this.registerType(type, MDN_URL));          
      }
    }
  }
  /**
   * Format return type data into HTML String.
   * @param  {JSDocReturns} returnsData The `returns` property of a JSDocRecord
   * @return {String}                   A formatted HTML string that represents types returned
   */
  formatReturns(returnsData) {
    if (!returnsData) return 'void';

    return returnsData.map(typeData =>
      this.type(typeData.type.names.join(', '))
    ).join(', ');
  }
  registerType(type, url) {
    this.typesTpl[type] = url;
  }
  source(record) {
    const url = `source-${slugify(record.filepath)}.html#L${record.meta.lineno}`;
    return `<a href="${url}">${record.filepath}, line ${record.meta.lineno}</a>`;
  }
  type(complexStrType) {
    // this regex will parse complex types strings and extract type names
    // "String"               => "String"
    // "Array.<String>"       => "Array", ".<", "String", ">"
    // "Map.<Number, String>" => "Map", ".<", "Number", ", ", "String", ">"
    return complexStrType.split(/(\.<|>|\.\[|\]|,\s?)/)
      .map(token => (identifier.test(token) ? this.singleType(token) : escapeHtml(token)))
      .join('');
  }
  singleType(strType) {
    const typeLinkTpl = this.typesTpl[strType];
    let href = '';
    let target = '';
    let content = strType;

    if (typeLinkTpl) {
      href = `href="${typeLinkTpl.replace('%symbol%', strType)}"`;

      if (NATIVE_TYPES.indexOf(strType) !== -1) {
        target = 'target="_blank"';
      }
    }

    return `<a ${href} ${target}>${content}</a>`;
  }
};

module.exports = LinkHelper;
