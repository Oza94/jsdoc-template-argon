# jsdoc-template-argon pixi.js demo

**Please note** this is not an official pixi.js documentation but a demo of [jsodc-template-argon](https://github.com/Oza94/jsdoc-template-argon), a template for JSDoc3.

How to generate this website :

```
# clone pixi.js and "cd" into folder
npm i jsdoc-template-argon
jsdoc . -t node_modules/jsdoc-template-argon -d docs -R README.md -c.jsdoc.json
```

Configuration file used (`.jsdoc.json`) :

```json
{
  "plugins": [
    "plugins/markdown"
  ]
}
```

Find the original pixi.js README below.
