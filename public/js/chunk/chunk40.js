webpackJsonp([40],{

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(335)
}
var normalizeComponent = __webpack_require__(249)
/* script */
var __vue_script__ = __webpack_require__(337)
/* template */
var __vue_template__ = __webpack_require__(339)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/view/product/product.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-59da1dd2", Component.options)
  } else {
    hotAPI.reload("data-v-59da1dd2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 249:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(251)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 251:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(336);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(250)("0d537d60", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-59da1dd2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-59da1dd2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.custom-tree-node {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    font-size: 14px;\n    padding-right: 8px;\n}\n", ""]);

// exports


/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_product__ = __webpack_require__(338);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var id = 1000;
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            product: [{
                id: 0,
                label: '产品信息介绍',
                children: []
            }],
            title: '添加信息',
            dialog: false,
            content: null,
            itemData: null,
            isEdit: false,
            productAuth: [{
                add: true,
                edit: true,
                delete: true
            }]
        };
    },

    created: function created() {
        var _this = this;

        Object(__WEBPACK_IMPORTED_MODULE_0__api_product__["a" /* getList */])().then(function (response) {
            _this.product[0].children = response.data.data;
        });
        // let product_Auth = this.$store.state.user.auth.article_product;
        // product_Auth.forEach((value) => {
        //     if (value === 'add') {
        //         this.productAuth.add = true;
        //         return true;
        //     }
        //     if (value === 'edit') {
        //         this.productAuth.edit = true;
        //         return true;
        //     }
        //     if (value === 'delete') {
        //         this.productAuth.delete = true;
        //         return true;
        //     }
        // });
    },
    methods: {
        append: function append(data) {
            this.title = '添加信息';
            //先清空对话框里面的输入框的值
            this.content = '';
            //判断一下是否超过了3级
            if (data.lv >= 3) {
                this.$message.error('当前层不允许在添加分类了!');
                return false;
            }
            //  this.itemData =  JSON.parse(JSON.stringify(data));
            this.itemData = data;
            this.dialog = true;
        },
        ok: function ok() {
            if (this.isEdit) {
                return this.handelEdit();
            } else {
                return this.handleAdd();
            }
        },
        handleAdd: function handleAdd() {
            var _this2 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__api_product__["b" /* product_add */])({ content: this.content, pid: this.itemData.id, lv: this.itemData.lv }).then(function (response) {
                if (response.data.code === 0) {
                    //关闭对话框
                    _this2.dialog = false;
                    var newChild = response.data.data;
                    if (!_this2.itemData.children) {
                        _this2.$set(_this2.itemData, 'children', []);
                    }
                    _this2.itemData.children.push(newChild);
                    _this2.$message.success('添加成功');
                } else {
                    _this2.$message.error('添加失败');
                }
            });
        },
        handelEdit: function handelEdit() {
            var _this3 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__api_product__["d" /* product_edit */])({ content: this.content }, this.itemData.id).then(function (response) {
                if (response.data.code === 0) {
                    //关闭对话框
                    _this3.dialog = false;
                    _this3.isEdit = false; //结束编辑状态
                    _this3.itemData.content = _this3.content;
                    _this3.itemData.label = _this3.content;
                    _this3.$message.success('修改成功');
                } else {
                    _this3.$message.error('修改失败');
                }
            });
        },
        edit: function edit(node, data) {
            this.title = '修改信息';
            //先清空对话框里面的输入框的值
            this.content = '';
            this.isEdit = true; //当前是修改状态
            this.content = data.content; //吧数据挂载到全局方便其他函数调用
            this.itemData = data; //吧数据挂载到全局方便其他函数调用
            this.dialog = true; //显示对话框
        },
        remove: function remove(node, data) {
            var _this4 = this;

            if (data.id == 0) {
                return false;
            }
            Object(__WEBPACK_IMPORTED_MODULE_0__api_product__["c" /* product_del */])(data.id).then(function (response) {
                if (response.data.code === 0) {
                    _this4.$message.success(response.data.msg);
                    var parent = node.parent;
                    var children = parent.data.children || parent.data;
                    var index = children.findIndex(function (d) {
                        return d.id === data.id;
                    });
                    children.splice(index, 1);
                } else {
                    _this4.$message.error(response.data.msg);
                    return false;
                }
            });
        }
    }
});

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return product_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return product_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return product_edit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var getList = function getList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/product/list',
        method: 'get'
    });
};
var product_del = function product_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/product/del/' + id,
        method: 'get'
    });
};
var product_add = function product_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/product/add',
        data: data,
        method: 'post'
    });
};
var product_edit = function product_edit(data, id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/product/edit/' + id,
        data: data,
        method: 'post'
    });
};

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticStyle: { width: "70%" } },
        [
          _c("el-tree", {
            attrs: {
              data: _vm.product,
              "node-key": "id",
              "default-expand-all": "",
              "expand-on-click-node": false
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var node = ref.node
                  var data = ref.data
                  return _c("span", { staticClass: "custom-tree-node" }, [
                    _c("span", [_vm._v(_vm._s(node.label))]),
                    _vm._v(" "),
                    _c(
                      "span",
                      [
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text", size: "mini" },
                            on: {
                              click: function() {
                                return _vm.append(data)
                              }
                            }
                          },
                          [_vm._v("添加内容")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text", size: "mini" },
                            on: {
                              click: function() {
                                return _vm.edit(node, data)
                              }
                            }
                          },
                          [_vm._v("修改内容")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text", size: "mini" },
                            on: {
                              click: function() {
                                return _vm.remove(node, data)
                              }
                            }
                          },
                          [_vm._v("删除内容")]
                        )
                      ],
                      1
                    )
                  ])
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.title,
            visible: _vm.dialog,
            width: "50%",
            center: ""
          },
          on: {
            "update:visible": function($event) {
              _vm.dialog = $event
            }
          }
        },
        [
          _c("el-input", {
            staticStyle: { width: "70%" },
            attrs: { placeholder: "输入分类名称" },
            model: {
              value: _vm.content,
              callback: function($$v) {
                _vm.content = $$v
              },
              expression: "content"
            }
          }),
          _vm._v(" "),
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.ok } },
            [_vm._v("确 定")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-59da1dd2", module.exports)
  }
}

/***/ })

});