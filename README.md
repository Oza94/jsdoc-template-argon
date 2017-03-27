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

Please if you have any problem with es2015, make sure to read [ES2015+ issues](docs/es2015-issues.md) before posting.

## Options

Todo !

# Todo v1.0

 * Some tags are not handled (@abstract, @namespace, @module)
 * Code cleaning
 * Documentation
 * Testing ?
 * Host some examples
     - Self documentation
     - lodash documentation (classic CommonJS/ES2015 module)
     - pixi.js documentation (full ES2015 with classes, namespaces, ect.)

# License

This project is MIT-Licensed.
