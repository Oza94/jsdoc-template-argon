Tags
====

JSDoc3 has numerous [tags](http://usejsdoc.org/index.html). This template does not, currently, handle all JSDocs tags.

 * "Not concerned" means that the tag applies before template rendering, when JSDoc creates doclet records (e.g. `@name` override symbol name)
 * "Need verifiy" means that I need to do more tests with the tag to verify how JSDoc handle it

| Tag name | Template compatibility |
|--|--|
| @abstract (synonyms: @virtual) | no |
| @access | yes |
| @alias | not concerned* |
| @augments (synonyms: @extends) | yes |
| @author | no |
| @borrows | no |
| @callback | no |
| @class (synonyms: @constructor) | yes |
| @classdesc | yes |
| @constant (synonyms: @const) | partial (all except class members) |
| @constructs | need verify |
| @copyright | no |
| @default (synonyms: @defaultvalue) | partial (enum values only) |
| @deprecated | no |
| @description (synonyms: @desc) | yes |
| @enum | yes |
| @event | no |
| @example | partial (functions / methods only) |
| @exports | no |
| @external (synonyms: @host) | no |
| @file (synonyms: @fileoverview, @overview) | no |
| @fires (synonyms: @emits) | no |
| @function (synonyms: @func, @method) | yes |
| @global | not concerned* |
| @ignore | need verify |
| @implements | no |
| @inheritdoc | need verify |
| @inner | not concerned* |
| @instance | not concerned* |
| @interface | no |
| @kind | not concerned* |
| @lends | need verify |
| @license | no |
| @listens | no |
| @member (synonyms: @var) | not concerned* |
| @memberof | not concerned* |
| @mixes | no |
| @mixin | no |
| @module | yes |
| @name | not concerned* |
| @namespace | no |
| @override | no |
| @param (synonyms: @arg, @argument) | yes |
| @private | yes |
| @property (synonyms: @prop) | partial (functions / methods parameters only) |
| @protected | yes |
| @public | yes |
| @readonly | no |
| @requires | no |
| @returns (synonyms: @return) | yes |
| @see | no |
| @since | no |
| @static | yes |
| @summary | no |
| @this | no |
| @throws (synonyms: @exception) | no |
| @todo | no |
| @tutorial | no |
| @type | yes |
| @typedef | no |
| @variation | no |
| @version | no |
