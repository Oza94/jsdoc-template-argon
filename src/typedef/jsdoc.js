/**
 * Define JSDoc TaffyDB records structure
 * @module JSDocTypedefs
 */

/**
 * A JSDoc doclet record.
 * @typedef {Object} JSDocRecord
 * @property {String} [comment] - The raw documentation comment of the record if any
 * @property {JSDocMeta} meta - Metadata about how this record relates to the source code
 * @property {String} [description] - The `@description` value of the record if any. If using
 *                                    `plugins/markdown` this string will be compiled in HTML
 * @property {Array<JSDocReturns>} [returns] - What is returned by documented symbol
 * @property {String} name - Shortname of the record parsed by JSDoc or overridden using `@name`
 * @property {String} longname - Longname of the record (name including `memberof` info)
 * @property {String} kind - Kind of record deduced by JSDoc or overridden using `@kind`
 * @property {String} [memberof] - Longname of the parent symbol. Can be overridden using `@memberof`
 * @property {Array<JSDocParam>} params - A collection of parameters information
 * @property {Array<JSDocProperty>} properties - A collection of properties information
 * @property {String} filepath - Path of thte source file for this record
 *
 * @see {@link http://usejsdoc.org/tags-kind.html} More information about `@kind`
 * @see {@link http://usejsdoc.org/tags-name.html} More information about `@name`
 * @see {@link http://usejsdoc.org/tags-memberof.html} More information about `@memberof`
 */

/**
 * A JSDoc returns data structure
 * @typedef {Object} JSDocReturns
 * @property {JSDocTypeInfo} type - Return type information
 * @property {String} [description] - An optional return description
 */

/**
 * A JSDoc Type information structure
 * @typedef {Object} JSDocTypeInfo
 * @property {Array<String>} names - An array containing type names (short version).
 */

/**
 * A JSDoc parameter data structure
 * @typedef {Object} JSDocParam
 */

/**
 * A JSDoc property data structure
 * @typedef {Object} JSDocProperty
 */
