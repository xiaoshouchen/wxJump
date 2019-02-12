webpackJsonp([42],{

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(249)
/* script */
var __vue_script__ = __webpack_require__(340)
/* template */
var __vue_template__ = __webpack_require__(341)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
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
Component.options.__file = "resources/assets/js/view/product/point.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39894538", Component.options)
  } else {
    hotAPI.reload("data-v-39894538", Component.options)
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

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);
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


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            index: 1,
            formDynamic: {
                english: '',
                title: '',
                desc: '',
                keyword: 'point',
                items: [{
                    index: 1,
                    title: '',
                    desc: '',
                    status: 1
                }]
            },
            configID: 0,
            operation: ""
        };
    },

    created: function created() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].get('/config', { params: { keyword: 'point' } }).then(function (response) {
            if (response.data.status) {
                _this.formDynamic = response.data.data;
                //有数据走修改逻辑
                _this.operation = 'edit';
                _this.configID = response.data.data.id;
            } else {
                //没数据走添加逻辑
                _this.operation = 'add';
            }
        });
    },
    methods: {
        handleAdd: function handleAdd() {
            this.index = this.formDynamic.items.length + 1;
            this.formDynamic.items.push({
                address: '',
                tel: '',
                index: this.index,
                status: 1
            });
        },
        handleRemove: function handleRemove(index) {
            this.formDynamic.items[index].status = 0;
            this.formDynamic.items.splice(index, 1);
        },
        handleSubmit: function handleSubmit(name) {
            var _this2 = this;

            if (this.operation === 'edit') {
                __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].patch('/config/' + this.configID, {
                    keyword: this.formDynamic.keyword,
                    value: this.formDynamic,
                    type: 'json'
                }).then(function (response) {
                    _this2.$message.info(response.data.message);
                });
            } else {
                __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].post('/config', {
                    keyword: this.formDynamic.keyword,
                    value: this.formDynamic,
                    type: 'json'
                }).then(function (response) {
                    _this2.$message.info(response.data.message);
                });
            }
        }
    }
});

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { width: "70%" } },
    [
      _c(
        "el-form",
        {
          ref: "formDynamic",
          attrs: { model: _vm.formDynamic, "label-width": "100px" }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "英文标头:", prop: "english" } },
            [
              _c("el-input", {
                attrs: { placeholder: "输入英文标头" },
                model: {
                  value: _vm.formDynamic.english,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "english", $$v)
                  },
                  expression: "formDynamic.english"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "标题:", prop: "title" } },
            [
              _c("el-input", {
                attrs: { placeholder: "标题" },
                model: {
                  value: _vm.formDynamic.title,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "title", $$v)
                  },
                  expression: "formDynamic.title"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "简介:", prop: "desc" } },
            [
              _c("el-input", {
                attrs: { placeholder: "简介" },
                model: {
                  value: _vm.formDynamic.desc,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "desc", $$v)
                  },
                  expression: "formDynamic.desc"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.formDynamic.items, function(item, index) {
            return item.status
              ? [
                  _c(
                    "el-form-item",
                    { attrs: { label: "特点 " + item.index } },
                    [
                      _c(
                        "el-row",
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 18 } },
                            [
                              _c("el-input", {
                                attrs: { type: "text" },
                                model: {
                                  value: item.title,
                                  callback: function($$v) {
                                    _vm.$set(item, "title", $$v)
                                  },
                                  expression: "item.title"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-col",
                            { attrs: { span: 4, offset: 1 } },
                            [
                              _c(
                                "el-button",
                                {
                                  on: {
                                    click: function($event) {
                                      _vm.handleRemove(index)
                                    }
                                  }
                                },
                                [_vm._v("移除")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "描述 " + item.index } },
                    [
                      _c(
                        "el-row",
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 18 } },
                            [
                              _c("el-input", {
                                attrs: { type: "text" },
                                model: {
                                  value: item.desc,
                                  callback: function($$v) {
                                    _vm.$set(item, "desc", $$v)
                                  },
                                  expression: "item.desc"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("el-col", { attrs: { span: 4, offset: 1 } })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              : _vm._e()
          }),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-row",
                [
                  _c(
                    "el-col",
                    { attrs: { span: 12 } },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "dashed", long: "", icon: "md-add" },
                          on: { click: _vm.handleAdd }
                        },
                        [_vm._v("添加子项")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      _vm.handleSubmit("formValidate")
                    }
                  }
                },
                [_vm._v("保存")]
              )
            ],
            1
          )
        ],
        2
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
    require("vue-hot-reload-api")      .rerender("data-v-39894538", module.exports)
  }
}

/***/ })

});