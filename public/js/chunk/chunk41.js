webpackJsonp([41],{

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(249)
/* script */
var __vue_script__ = __webpack_require__(333)
/* template */
var __vue_template__ = __webpack_require__(334)
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
Component.options.__file = "resources/assets/js/view/system/sitebase/sitebase.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff5e5192", Component.options)
  } else {
    hotAPI.reload("data-v-ff5e5192", Component.options)
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

/***/ 333:
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
                site_name: '',
                icp: '',
                qq: '',
                phone: '',
                postNum: '',
                tel: '',
                // desc:'',
                // site_keyword:'',
                keyword: 'sitebase',
                items: [{
                    index: 1,
                    address: '',
                    tel: '',
                    status: 1
                }],
                jsSlot: [{
                    code: ''
                }]
            },
            configID: 0,
            operation: ""
        };
    },

    created: function created() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].get('/config', { params: { keyword: 'sitebase' } }).then(function (response) {
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
        JShandleAdd: function JShandleAdd() {
            this.formDynamic.jsSlot.push({
                code: ''
            });
            this.$set(this.formDynamic.jsSlot, this.formDynamic.jsSlot);
        },
        handleRemove: function handleRemove(index) {
            //   this.formDynamic.items[index].status = 0;
            this.formDynamic.items[index].status = 0;
            this.formDynamic.items.splice(index, 1);
        },
        JShandleRemove: function JShandleRemove(index) {

            var jsSlot = this.formDynamic.jsSlot.splice(index, 1);
            this.$set(this.formDynamic.jsSlot, jsSlot);
            console.log(index, jsSlot);
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

/***/ 334:
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
            { attrs: { label: "网站名称:", prop: "title" } },
            [
              _c("el-input", {
                attrs: { placeholder: "输入网站名称" },
                model: {
                  value: _vm.formDynamic.site_name,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "site_name", $$v)
                  },
                  expression: "formDynamic.site_name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "网站备案号:", prop: "icp" } },
            [
              _c("el-input", {
                attrs: { placeholder: "输入网站备案号" },
                model: {
                  value: _vm.formDynamic.icp,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "icp", $$v)
                  },
                  expression: "formDynamic.icp"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "联系电话:", prop: "phone" } },
            [
              _c("el-input", {
                attrs: { placeholder: "网站负责人联系电话" },
                model: {
                  value: _vm.formDynamic.phone,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "phone", $$v)
                  },
                  expression: "formDynamic.phone"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "服务热线:", prop: "tel" } },
            [
              _c("el-input", {
                attrs: { placeholder: "服务热线" },
                model: {
                  value: _vm.formDynamic.tel,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "tel", $$v)
                  },
                  expression: "formDynamic.tel"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "客服QQ:", prop: "qq" } },
            [
              _c("el-input", {
                attrs: { placeholder: "客服QQ" },
                model: {
                  value: _vm.formDynamic.qq,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "qq", $$v)
                  },
                  expression: "formDynamic.qq"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "邮编地址:", prop: "postNum" } },
            [
              _c("el-input", {
                attrs: { placeholder: "邮编地址" },
                model: {
                  value: _vm.formDynamic.postNum,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "postNum", $$v)
                  },
                  expression: "formDynamic.postNum"
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
                    { attrs: { label: "地址 " + (index + 1) } },
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
                                  value: item.address,
                                  callback: function($$v) {
                                    _vm.$set(item, "address", $$v)
                                  },
                                  expression: "item.address"
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
                    { attrs: { label: "电话 " + (index + 1) } },
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
                                  value: item.tel,
                                  callback: function($$v) {
                                    _vm.$set(item, "tel", $$v)
                                  },
                                  expression: "item.tel"
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
          _vm._l(_vm.formDynamic.jsSlot, function(itemJS, indexJS) {
            return [
              _c(
                "el-form-item",
                {
                  key: indexJS,
                  attrs: { label: "JS代码插槽 " + (indexJS + 1) }
                },
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
                              value: itemJS.code,
                              callback: function($$v) {
                                _vm.$set(itemJS, "code", $$v)
                              },
                              expression: "itemJS.code"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 4 } },
                        [
                          _c(
                            "el-button",
                            {
                              on: {
                                click: function($event) {
                                  _vm.JShandleRemove(indexJS)
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
              )
            ]
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
                          on: { click: _vm.JShandleAdd }
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
    require("vue-hot-reload-api")      .rerender("data-v-ff5e5192", module.exports)
  }
}

/***/ })

});