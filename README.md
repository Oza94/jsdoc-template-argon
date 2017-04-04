JSDoc template Argon
=====================

*Note :* this is very much a WIP until this project reach `v1.0`

During my own documentation journey with es2015+ code, I found that it was tedious to get a nice documentation website with existing tooling. There's two alternatives :

 * [ESDoc](https://doc.esdoc.org/github.com/esdoc/esdoc/): a nice documentation tool+template built for ES2015+ code. The downside is that it is very strict compared to what you can document with JSDoc
 * [JSDoc](https://github.com/jsdoc3/jsdoc): the reference for JavaScript code documentation although it does not support properly all es2015+ and it lacks good website templates (in my opinion)


An example of how the template look likes :

![Template Screenshot](http://i.imgur.com/5WtQ3zq.png)

# Usage

Install `jsdoc-template-argon` somewhere on your machine (it can be in your deps)

```bash
npm install --save-dev jsdoc-template-argon
jsdoc src/ -c .jsdoc.json -r -d docs -t node_modules/jsdoc-template-argon
```

Please if you have any problem with es2015, make sure to read [ES2015+ issues](tutorials/es2015-issues.md) before posting.

## Demo

This project is self-documented using itself ! 

> [https://oza94.github.io/jsdoc-template-argon](https://oza94.github.io/jsdoc-template-argon)

Keep in mind that some demos use existing open source projects (lodash, pixi.js) but this is not their official documentation.

## Options

Find below the template options

 * `referencePaths {String}` Default to `file`. Can be `folder`. Define how symbols are grouped in the reference navigation menu (either by folder path or filename path)
 * `repository.url {String}` If set this will show a link to the repository if the top right corner (default to github icon)
 * `repository.icon {String}` Default to `github`. Find available icons on [Font awesome page](http://fontawesome.io/icons/)
 * `debug {Boolean}` Set to true if you want to output additional debug information in the generated site
 * `builtins.mdnLinks {Boolean}` Default to `false`. If set to `true`, native types and object (aka. Number, Array, Uint8Array ...) will be linked to relevant MDN documentation page
 * `builtins.allowUncapitalized {Boolean}` Default to `false`. If set to `true`, unproperly capitalized native names are coerced e.g. `string` will become `String`

# Todo v1.0

 * Some tags are not handled (see [tutorials/tags.md](tutorials/tags.md))
 * Code cleaning
 * Documentation
 * Testing

# License

This project is MIT-Licensed.
