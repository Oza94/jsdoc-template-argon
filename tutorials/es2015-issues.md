# JSDoc and es2015+

The goal of this template is to provide a good alternative for es2015+ projects but
JSDoc has some flaws. Here is a list of tips to avoid some pitfalls.

## export default

JSDoc since `v3.4` handles *with some gotchas* es2015 syntax. The main problems concern `export default` patterns :

```js
/* My class */
export default class Foo {}

/* My function */
export default function foo() {}
```

See [this issue](https://github.com/jsdoc3/jsdoc/issues/1132) and [this one](https://github.com/jsdoc3/jsdoc/issues/1079) for more information.

For classes, the plugin `jsdoc-export-default-interop` works fine :

```json
// jsdoc.conf.json
{
  "plugins": [
    "node_modules/jsdoc-export-default-interop"
  ]
}

```

Unfortunatly for functions, I found no other way than overriding the symol
name and kind via specific tags :

```js
/**
 * My function
 * @name foo
 * @kind function
 * @return {void}
 */
export default function foo() {}
```

## JSDoc and babel

If your only use babel with the `es2015` preset then the previous section should be fine. Otherwise you can use the `jsdoc-babel` plugin. 

You should disable `babelrc` to only add transforms for new syntax that JSDoc can't parse itself, so you can benefit from simplified es2015 annotations on things like classes :

```json
{
  "plugins": [
    "node_modules/jsdoc-export-default-interop",
    "node_modules/jsdoc-babel"
  ],
  "babel": {
    "presets": ["stage-0"],
    "plugins": ["transform-class-properties"],
    "babelrc": false
  }
}

```

The mains problems concern `export default`, see next section.

## Class properties

If you use `transform-class-properties` you may encounter issues with JSDoc
not properly documenting these symbols. This is due to babel compilation 
which change structure of the code :

```
class Keyboard {
  /**
   * ENTER keycode
   * @name Z
   * @memberof Keyboard
   * @static
   * @type {Number}
   */
  static ENTER = 15;
  constructor() {

  }
}
```

The solution, like in the example above, is to override JSDoc parsing with
`@name`, `@memberof` and `@static` if needed.