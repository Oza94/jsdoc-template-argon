const slugify = require('slugify');
const MDN_URL = 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/%symbol%';
const identifier = /^[a-z_$][a-z0-9_$]*$/i;

const NATIVE_TYPES = ['String', 'Number', 'Boolean', 'Map', 'Set', 'Object'];

/**
 * Help building documentation links
 * @name LinkHelper
 */
module.exports = class LinkHelper {
  /**
   * Create a new LinkHelper
   * @return {void}
   */
  constructor() {
    /**
     * Map each type (either native or user-defined) to an URL
     * @type {Object}
     */
    this.typesTpl = {
      String: MDN_URL,
      Number: MDN_URL,
      Boolean: MDN_URL,
      Map: MDN_URL,
      Object: MDN_URL,
    };
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
    return complexStrType.split(/(\.<|>|,\s?)/)
      .map(token => (identifier.test(token) ? this.singleType(token) : token))
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
