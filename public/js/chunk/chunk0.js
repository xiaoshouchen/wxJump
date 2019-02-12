webpackJsonp([0],{

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(480)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(482)
/* template */
var __vue_template__ = __webpack_require__(512)
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/edit_goods.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24355ef3", Component.options)
  } else {
    hotAPI.reload("data-v-24355ef3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 236:
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

/***/ 237:
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

var listToStyles = __webpack_require__(238)

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

/***/ 238:
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

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 列表页公共属性及方法
 *
 * @function handleSearch()                 // 点击搜索按钮
 * @function handleDel(url)                 // 删除数据
 * @function handleGetSelection()           // 返回复选框选中数据
 * @function handleDel(url)                 // 删除数据
 * @function handleDelMultiple(url,data)    // 删除多条数据
 */

var form_page = {
    data: function data() {
        return {
            loading: false,
            loading_msg: '数据获取中...'
        };
    },
    created: function created() {
        console.log('mixin-form_page');
    },

    methods: {

        /**
         * 返回所选数据，通常用于编辑页
         * @param callback
         * @returns {Promise<any>}
         */
        handleGetData: function handleGetData(callback) {
            var _this = this;

            this.loading = true;
            return new Promise(function (resolve, reject) {
                callback.then(function (res) {
                    _this.loading = false;
                    resolve(res.data);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                    _this.loading = false;
                });
            });
        },


        /**
         * 验证表单数据
         * @param formName  表单名
         * @returns {*}
         */
        handleValid: function handleValid() {
            var formName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'form';

            var res = null;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    res = true;
                } else {
                    console.log('error submit!!');
                    res = false;
                }
            });
            return res;
        },


        /**
         * 提交表单数据
         * @param callback 回调函数
         */
        handleSubmit: function handleSubmit(callback) {
            var _this2 = this;

            this.loading = true;
            callback.then(function (res) {
                _this2.loading = false;
                _this2.$message.success(res.data.msg);
                _this2.$emit('render');
                _this2.close();
            }).catch(function (error) {
                console.log(error);
                _this2.loading = false;
                _this2.$message.error('操作失败');
                _this2.close();
            });
        },


        /**
         * 向父组件提交关闭事件
         */
        close: function close() {
            this.$emit('close');
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (form_page);

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(243)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(245)
/* template */
var __vue_template__ = __webpack_require__(256)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2eb7ba3f"
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
Component.options.__file = "resources/assets/js/components/public/table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2eb7ba3f", Component.options)
  } else {
    hotAPI.reload("data-v-2eb7ba3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 列表页公共属性及方法
 */

var list_page = {
    data: function data() {
        return {
            search: {},
            edit_id: null,
            tools_id: null,
            select_ids: null
        };
    },
    created: function created() {
        //console.log('mixin-list_page')
    },

    methods: {
        /**
         * 点击搜索按钮
         */
        handleSearch: function handleSearch() {
            this.handleSetFilter('search', this.search);
            this.handleRenderTable();
        },


        /**
         * 返回所选数据
         * @param field 要返回的字段名，为null则全部返回
         * @returns {*}
         */
        handleGetSelection: function handleGetSelection() {
            var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var data = this.$refs.table.selection;
            if (data === null) {
                data = [];
            }
            if (field == null) {
                return data;
            } else if (typeof field == 'string') {
                var value = [];
                data.forEach(function (item) {
                    if (field in item) {
                        value.push(item[field]);
                    }
                });
                return value;
            } else {
                console.error('handleGetSelection 参数错误');
            }
            return this.$refs.table.selection;
        },


        /**
         * 设置表格筛选参数
         * @param key   键
         * @param value 值
         */
        handleSetFilter: function handleSetFilter(key, value) {
            this.$refs.table.filterValue[key] = value;
        },


        /**
         * 获取表格筛选参数
         * @param key   键
         * @returns {*}
         */
        handleGetFilter: function handleGetFilter(key) {
            return this.$refs.table.filterValue[key];
        },


        /**
         * 要移除的条件
         *
         * @param value
         */
        handelDeleteFilter: function handelDeleteFilter(value) {
            var keyword = [];
            for (var item in value) {
                this.$refs.table.deleteFilter.push(item);
            }
        },


        /**
         * 重新渲染表格
         */
        handleRenderTable: function handleRenderTable() {
            this.$refs.table.renderTable();
        },


        /**
         * 移除表格中某行数据
         * @param index 下标
         */
        handleDeleteRow: function handleDeleteRow(index) {
            this.$refs.table.deleteRow(index);
        },


        /**
         * 删除数据
         * @param callback  删除操作
         * @param index     下标
         */
        handleDel: function handleDel(callback, index) {
            var _this = this;

            var loading = this.$loading({
                lock: true,
                text: '删除数据中...',
                spinner: 'el-icon-loading'
            });
            callback.then(function (res) {
                _this.loading = false;
                if (res['msg'] == 0) {
                    _this.$message.success('删除成功');
                    _this.handleDeleteRow(index);
                } else {
                    _this.$message.success('删除成功');
                }
                loading.close();
            }).catch(function (error) {
                _this.loading = false;
                _this.$message.error('删除失败');
                loading.close();
                console.log(error);
            });
        },


        /**
         * 设置子集数据，treeTable
         * @param row
         * @param children
         */
        handleSetChild: function handleSetChild(row, children) {
            this.$refs.table.SetChildren(row, children);
        },

        /**
         * 开启表格loading
         */
        handleOpenTableLoding: function handleOpenTableLoding() {
            this.$refs.table.loading = true;
        },


        /**
         * 关闭表格loading
         */
        handleCloseTableLoding: function handleCloseTableLoding() {
            this.$refs.table.loading = false;
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (list_page);

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return sourceDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return sourceAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return sourceIdGetName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return sourceIdUpdateName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return sourceBatchIdDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return setMealBatchIdDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return setMealIdDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return setMealAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return setMealIdGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return setMealIdUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return goodsTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return sizeAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return sizeIdGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return sizeIdUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return sizeIdDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return sizeBatchIdDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return goodsAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return goodsIdUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return goodsIdGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return goodsIdDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return goodsBatchDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return ipSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return goodsOrderDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return goodsOrderBatchDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return goodsOrderIdGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return goodsOrderIdUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return goodsOrderIdUpdateStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return sourceCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return zhCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return peopleCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return batchEditStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return repeatCheckAPI; });
/* unused harmony export orderSearchAPI */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegenerateAPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return orderCountAPI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


/**
 * 删除来源
 * @param id
 * @returns {*}
 */
var sourceDelete = function sourceDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/source/' + id,
        method: 'delete'
    });
};
/**
 * 添加来源
 * @returns {*}
 */
var sourceAdd = function sourceAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/source',
        data: data,
        method: 'post'
    });
};

/**
 * 根据Id获得名称
 * @returns {*}
 */
var sourceIdGetName = function sourceIdGetName(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/source/' + id,
        method: 'get'
    });
};

/**
 * 根据Id修改名称
 *
 * @param id
 * @param data
 * @returns {*}
 */
var sourceIdUpdateName = function sourceIdUpdateName(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/source/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * 根据Id批量删除来源信息
 *
 * @param data
 * @returns {*}
 */
var sourceBatchIdDelete = function sourceBatchIdDelete(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/source/batchIdDelete',
        data: data,
        method: 'post'
    });
};
/**
 * 根据Id批量删除套餐信息
 *
 * @param data
 * @returns {*}
 */
var setMealBatchIdDelete = function setMealBatchIdDelete(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/meal/batchIdDelete',
        data: data,
        method: 'post'
    });
};
/**
 * 根据Id删除套餐信息
 *
 * @param id
 * @returns {*}
 */
var setMealIdDelete = function setMealIdDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/meal/' + id,
        method: 'delete'
    });
};
/**
 * 添加套餐信息
 *
 * @param data
 * @returns {*}
 */
var setMealAdd = function setMealAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/meal',
        data: data,
        method: 'post'
    });
};
/**
 * 添加套餐信息
 *
 * @param id
 * @returns {*}
 */
var setMealIdGet = function setMealIdGet(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/meal/' + id,
        method: 'get'
    });
};
/**
 * 根据Id修改套餐信息
 * @param id
 * @param data
 * @returns {*}
 */
var setMealIdUpdate = function setMealIdUpdate(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/meal/' + id,
        data: data,
        method: 'put'
    });
};
/**
 * 获取商品展示模板
 *
 * @returns {*}
 */
var goodsTemplate = function goodsTemplate() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'template/list',
        method: 'get'
    });
};

/**
 * 添加产品尺码信息
 *
 * @param data
 * @returns {*}
 */
var sizeAdd = function sizeAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'size',
        data: data,
        method: 'post'
    });
};
/**
 * 添加产品尺码信息
 *
 * @returns {*}
 */
var sizeIdGet = function sizeIdGet(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'size/' + id,
        method: 'get'
    });
};
/**
 * 根据ID修改信息
 *
 * @returns {*}
 */
var sizeIdUpdate = function sizeIdUpdate(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'size/' + id,
        data: data,
        method: 'put'
    });
};
/**
 * 根据ID删除信息
 *
 * @returns {*}
 */
var sizeIdDelete = function sizeIdDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'size/' + id,
        method: 'delete'
    });
};
var sizeBatchIdDelete = function sizeBatchIdDelete(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'size/batchIdDelete',
        data: data,
        method: 'post'
    });
};
var goodsAdd = function goodsAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goods',
        data: data,
        method: 'post'
    });
};
var goodsIdUpdate = function goodsIdUpdate(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goods/' + id,
        data: data,
        method: 'put'
    });
};

var goodsIdGet = function goodsIdGet(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goods/' + id,
        method: 'get'
    });
};
var goodsIdDelete = function goodsIdDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goods/' + id,
        method: 'delete'
    });
};
var goodsBatchDelete = function goodsBatchDelete(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goods/batchDelete',
        data: data,
        method: 'post'
    });
};

var ipSource = function ipSource(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/ip_source/' + id,
        method: 'get'
    });
};

var goodsOrderDelete = function goodsOrderDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/' + id,
        method: 'delete'
    });
};
var goodsOrderBatchDelete = function goodsOrderBatchDelete(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/batchDelete',
        data: data,
        method: 'post'
    });
};
var goodsOrderIdGet = function goodsOrderIdGet(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/' + id,
        method: 'get'
    });
};
var goodsOrderIdUpdate = function goodsOrderIdUpdate(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/' + id,
        data: data,
        method: 'put'
    });
};
var goodsOrderIdUpdateStatus = function goodsOrderIdUpdateStatus(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/status/' + id,
        data: data,
        method: 'put'
    });
};

var sourceCount = function sourceCount() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'source/count',
        method: 'get'
    });
};

var zhCount = function zhCount() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'source/zhcount',
        method: 'get'
    });
};
var peopleCount = function peopleCount() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'source/peoplecount',
        method: 'get'
    });
};

var batchEditStatus = function batchEditStatus(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/batchEdit',
        data: data,
        method: 'post'
    });
};
var repeatCheckAPI = function repeatCheckAPI() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/repeatCheck',
        method: 'get'
    });
};
var orderSearchAPI = function orderSearchAPI(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/orderSearch',
        data: data,
        method: 'post'
    });
};
var RegenerateAPI = function RegenerateAPI(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'source/Regenerate/' + id,
        method: 'get'
    });
};
var orderCountAPI = function orderCountAPI() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/orderCount',
        method: 'get'
    });
};

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(244);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("ff2b3c24", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2eb7ba3f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2eb7ba3f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.el-pagination[data-v-2eb7ba3f]{\n    float: right;\n    margin-top: 8px;\n}\n", ""]);

// exports


/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fold__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fold___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fold__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_axios__ = __webpack_require__(26);
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

// 引入tools



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        url: String,
        columns: Array,
        page: {
            type: Boolean,
            default: true
        },
        checkbox: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            loading: false,
            data: null,
            selection: null,
            filterValue: {
                where: {},
                page: 1,
                limit: 10,
                search: '',
                orderBy: 'id,asc'
            },
            deleteFilter: [],
            total: 0
        };
    },

    components: { Tools: __WEBPACK_IMPORTED_MODULE_0__tools___default.a, Fold: __WEBPACK_IMPORTED_MODULE_1__fold___default.a },
    created: function created() {
        // 生成动态自定义列
        for (var x in this.columns) {
            if ('render' in this.columns[x]) {
                Vue.component('my-column-' + this.columns[x].prop, this.columns[x].render);
            }
        }
        // 展开列根据层级加上空格
        Vue.component('fold-prefix', {
            render: function render(createElement) {
                return createElement('span', { style: { paddingLeft: this.level * 2 + 'em' } });
            },
            props: { level: { type: Number, required: true } }
        });
        this.renderTable();
    },

    methods: {
        // 展开
        expanding: function expanding(row) {
            row.tree_fold = 'loading';
            this.$emit('children', row);
        },
        // 收起
        collapsing: function collapsing(row) {
            row.tree_fold = 'close';
            this.SetChildren(row, null);
        },
        // 监听Tool事件，抛出到上层处理
        Listeners: function Listeners(type, index, row) {
            this.$emit('tools', type, index, row);
        },
        // 表头筛选项
        filterHandler: function filterHandler(_filters) {
            for (var key in _filters) {
                if (_filters[key] == null || _filters[key].length == 0) {
                    delete this.filterValue.where[key];
                } else {
                    if (_filters[key].length == 1) {
                        this.filterValue.where[key] = _filters[key][0];
                    } else {
                        this.filterValue.where[key] = _filters[key];
                    }
                }
            }
            this.handelDeleteFilter();
            this.renderTable();
        },

        // 排序
        sortHandler: function sortHandler(obj) {
            if (obj.order == null) {
                this.filterValue.orderBy = null;
            } else {
                this.filterValue.orderBy = obj.prop + ',' + obj.order.slice(0, -6);
            }
            this.renderTable();
        },

        // 页数大小改变
        handleSizeChange: function handleSizeChange(pageSize) {
            this.filterValue.limit = pageSize;
            this.renderTable();
        },

        // 跳页
        handleCurrentChange: function handleCurrentChange(page) {
            this.filterValue.page = page;
            this.renderTable();
        },

        // 复选框操作
        handleSelectionChange: function handleSelectionChange(selection) {
            this.selection = selection;
            this.$emit('SelectionChange', selection);
        },

        // 重载表格数据
        renderTable: function renderTable() {
            var _this = this;

            this.loading = true;
            if (!this.page) {
                delete this.filterValue.page;
                delete this.filterValue.limit;
            }
            __WEBPACK_IMPORTED_MODULE_2__libs_axios__["a" /* default */].get(this.url, {
                params: this.filterValue
            }).then(function (res) {
                _this.total = res.data.count;
                _this.data = res.data.data;
                _this.loading = false;
            }).catch(function (error) {
                _this.loading = false;
                console.log(error);
            });
        },

        // 删除行
        deleteRow: function deleteRow(index) {
            this.data.splice(index, 1);
        },

        // 设置列表树子数据
        SetChildren: function SetChildren(row, children) {
            //this.handleSetTree(this.data,row.id,children);
            var path = row.tree_path;
            var data = this.data;
            for (var i = 0; i < path.length; i++) {
                if (i == 0) {
                    data = data[path[i]];
                } else {
                    data = data['tree_children'][path[i]];
                }
            }
            if (row.tree_fold == 'loading') {
                row.tree_fold = 'open';
            }
            this.$set(data, 'tree_fold', row.tree_fold);
            this.$set(data, 'tree_children', children);
        },


        /**
         * 欲删除的字段值
         */
        handelDeleteFilter: function handelDeleteFilter() {
            var _this2 = this;

            this.deleteFilter.forEach(function (item) {
                delete _this2.filterValue['where'][item];
            });
        }
    },
    computed: {
        // 根据树形结构渲染为list结构
        reversedData: function reversedData() {
            var data = this.data;
            data = getChildren(data, [], 0);
            return data;
        }
    }

    // 递归计算list结构
});function getChildren(data, path, level) {
    var field = 'tree_children';
    var return_data = [];
    for (var x in data) {
        data[x]['tree_level'] = level;
        path[level] = x;
        path.length = level + 1;
        data[x]['tree_path'] = path;
        var item = JSON.parse(JSON.stringify(data[x]));
        delete item[field];
        return_data.push(item);
        if (field in data[x]) {
            var children = getChildren(data[x][field], path, level + 1);
            return_data = return_data.concat(children);
        }
    }
    return return_data;
}

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(247)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(249)
/* template */
var __vue_template__ = __webpack_require__(250)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e5030c68"
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
Component.options.__file = "resources/assets/js/components/public/tools.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e5030c68", Component.options)
  } else {
    hotAPI.reload("data-v-e5030c68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("50b6e68c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e5030c68\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tools.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e5030c68\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tools.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
    name: "tools",
    props: ['row', 'index', 'buttons'],
    data: function data() {
        return {
            tooltip: { // tooltip默认显示字段
                add: '添加',
                show: '查看详情',
                edit: '编辑',
                delete: '删除'
            }
        };
    },

    methods: {
        handleTools: function handleTools(type) {
            this.$emit('listen-tools', type, this.index, this.row);
        }
    }
});

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-button-group",
    [
      _vm._l(_vm.buttons, function(val, key) {
        return [
          (val.text
          ? val.text
          : _vm.tooltip[key]
            ? _vm.tooltip[key]
            : false)
            ? [
                _c(
                  "el-tooltip",
                  {
                    staticClass: "item",
                    attrs: {
                      effect: "dark",
                      content: val.text ? val.text : _vm.tooltip[key],
                      placement: "bottom"
                    }
                  },
                  [
                    _c("el-button", {
                      attrs: { type: val.type, size: "mini", icon: val.icon },
                      on: {
                        click: function($event) {
                          _vm.handleTools(key)
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            : [
                _c("el-button", {
                  attrs: { type: val.type, size: "mini", icon: val.icon },
                  on: {
                    click: function($event) {
                      _vm.handleTools(key)
                    }
                  }
                })
              ]
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e5030c68", module.exports)
  }
}

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(254)
/* template */
var __vue_template__ = __webpack_require__(255)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-98a997c0"
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
Component.options.__file = "resources/assets/js/components/public/fold.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-98a997c0", Component.options)
  } else {
    hotAPI.reload("data-v-98a997c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(253);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("328aaa3a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-98a997c0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fold.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-98a997c0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fold.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "fold",
    props: {
        row: {
            type: Object
        },
        status: {
            default: 'close'
        }
    },
    data: function data() {
        return {
            state: this.status,
            className: {
                open: 'el-icon-caret-bottom',
                close: 'el-icon-caret-right',
                loading: 'el-icon-loading'
            }
        };
    },

    methods: {
        handleFold: function handleFold() {
            if (this.status == 'open') {
                this.$emit('collapsing', this.row); // 收起
            } else {
                this.state = 'loading';
                this.$emit('expanding', this.row); // 展开
            }
        }
    },
    watch: {
        status: function status(val) {
            this.state = val;
        }
    }
});

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", {
    class: _vm.className[this.state],
    staticStyle: { cursor: "pointer" },
    on: { click: _vm.handleFold }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-98a997c0", module.exports)
  }
}

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          attrs: { border: "", data: _vm.reversedData, size: "mini" },
          on: {
            "filter-change": _vm.filterHandler,
            "sort-change": _vm.sortHandler,
            "selection-change": _vm.handleSelectionChange
          }
        },
        [
          _vm.checkbox
            ? _c("el-table-column", {
                attrs: { type: "selection", width: "55" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.columns, function(item) {
            return [
              _c("el-table-column", {
                ref: "col-" + item.prop,
                refInFor: true,
                attrs: {
                  width: item.width ? item.width : null,
                  prop: item.prop,
                  "column-key": item.prop,
                  label: item.label,
                  sortable: item.sort ? "custom" : false,
                  filters: item.filter ? item.filter.data : null,
                  "filter-multiple": item.filter
                    ? item.filter.multiple === false
                      ? item.filter.multiple
                      : true
                    : true
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        "tools" in item
                          ? [
                              _c("Tools", {
                                attrs: {
                                  buttons: item.tools,
                                  row: scope.row,
                                  index: scope.$index
                                },
                                on: { "listen-tools": _vm.Listeners }
                              })
                            ]
                          : "render" in item
                            ? [
                                _c("my-column-" + item.prop, {
                                  tag: "component",
                                  attrs: { row: scope.row }
                                })
                              ]
                            : [
                                "lazy" in item
                                  ? _c("fold-prefix", {
                                      attrs: {
                                        level: scope.row.tree_level
                                          ? scope.row.tree_level
                                          : 0
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                "lazy" in item && scope.row.children_count > 0
                                  ? _c("Fold", {
                                      attrs: {
                                        status: scope.row.tree_fold,
                                        row: scope.row
                                      },
                                      on: {
                                        expanding: _vm.expanding,
                                        collapsing: _vm.collapsing
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      item.convert
                                        ? scope.row[item.prop + "_name"]
                                        : scope.row[item.prop]
                                    ) +
                                    "\n                        "
                                )
                              ]
                      ]
                    }
                  }
                ])
              })
            ]
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.page
        ? _c("el-pagination", {
            attrs: {
              "page-sizes": [10, 20, 30, 50],
              "page-size": _vm.filterValue.limit,
              "current-page": _vm.filterValue.page,
              layout: "total, sizes, prev, pager, next, jumper",
              total: _vm.total
            },
            on: {
              "size-change": _vm.handleSizeChange,
              "current-change": _vm.handleCurrentChange
            }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-2eb7ba3f", module.exports)
  }
}

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(260)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(262)
/* template */
var __vue_template__ = __webpack_require__(263)
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
Component.options.__file = "resources/assets/js/components/public/upload.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13e25f40", Component.options)
  } else {
    hotAPI.reload("data-v-13e25f40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("5a247739", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13e25f40\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13e25f40\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 100px;\n    height: 100px;\n    line-height: 100px;\n    text-align: center;\n}\n.avatar {\n    width: 100px;\n    height: 100px;\n    display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
            imageUrl: '',
            upload_url: "/api/upload",
            headers: {
                Authorization: 'Bearer ' + this.$store.state.user.token
            }
        };
    },

    props: ['img'],
    created: function created() {
        this.imageUrl = this.img;
    },
    watch: {
        img: function img(old) {
            this.imageUrl = old;
        }
    },
    methods: {
        handleAvatarSuccess: function handleAvatarSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit('img-success', response.url);
        },
        beforeAvatarUpload: function beforeAvatarUpload(file) {
            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }
    }
});

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-upload",
    {
      staticClass: "avatar-uploader",
      attrs: {
        action: _vm.upload_url,
        headers: _vm.headers,
        "show-file-list": false,
        "on-success": _vm.handleAvatarSuccess,
        "before-upload": _vm.beforeAvatarUpload
      }
    },
    [
      _vm.imageUrl
        ? _c("img", { staticClass: "avatar", attrs: { src: _vm.imageUrl } })
        : _c("i", { staticClass: "el-icon-plus avatar-uploader-icon" })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-13e25f40", module.exports)
  }
}

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(266)

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(267)
/* template */
var __vue_template__ = __webpack_require__(268)
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
Component.options.__file = "node_modules/vue-ueditor-wrap/lib/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a64a0188", Component.options)
  } else {
    hotAPI.reload("data-v-a64a0188", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//
//
//

// 一个简单的事件订阅发布的实现,取代原始Event对象,提升IE下的兼容性
var LoadEvent = function () {
  function LoadEvent() {
    _classCallCheck(this, LoadEvent);

    this.listeners = {};
  }

  _createClass(LoadEvent, [{
    key: 'on',
    value: function on(eventName, callback) {
      this.listeners[eventName] === undefined ? this.listeners[eventName] = [] : '';
      this.listeners[eventName].push(callback);
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      this.listeners[eventName] && this.listeners[eventName].forEach(function (callback) {
        return callback();
      });
    }
  }]);

  return LoadEvent;
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueUeditorWrap',
  data: function data() {
    return {
      id: 'editor' + Math.random().toString().slice(-10),
      editor: null,
      status: 0,
      initValue: '',
      defaultConfig: {
        UEDITOR_HOME_URL: './static/UEditor/',
        enableAutoSave: false
      }
    };
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    init: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    destroy: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    mixedConfig: function mixedConfig() {
      return Object.assign({}, this.defaultConfig, this.config);
    }
  },
  methods: {
    // 添加自定义按钮
    registerButton: function registerButton(_ref) {
      var name = _ref.name,
          icon = _ref.icon,
          tip = _ref.tip,
          handler = _ref.handler,
          _ref$UE = _ref.UE,
          UE = _ref$UE === undefined ? window.UE : _ref$UE;

      UE.registerUI(name, function (editor, name) {
        editor.registerCommand(name, {
          execCommand: function execCommand() {
            handler(editor, name);
          }
        });
        var btn = new UE.ui.Button({
          name: name,
          title: tip,
          cssRules: 'background-image: url(' + icon + ') !important;background-size: cover;',
          onclick: function onclick() {
            editor.execCommand(name);
          }
        });
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(name);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });
        return btn;
      });
    },
    // 实例化编辑器
    _initEditor: function _initEditor() {
      var _this = this;

      this.$nextTick(function () {
        _this.init();
        _this.editor = window.UE.getEditor(_this.id, _this.mixedConfig);
        _this.editor.addListener('ready', function () {
          _this.status = 2;
          _this.editor.setContent(_this.initValue);
          _this.$emit('ready', _this.editor);
          _this.editor.addListener('contentChange', function () {
            _this.$emit('input', _this.editor.getContent());
          });
        });
      });
    },

    // 检测依赖,确保 UEditor 资源文件已加载完毕
    _checkDependencies: function _checkDependencies() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        // 判断ueditor.config.js和ueditor.all.js是否均已加载(仅加载完ueditor.config.js时UE对象和UEDITOR_CONFIG对象存在,仅加载完ueditor.all.js时UEDITOR_CONFIG对象存在,但为空对象)
        var scriptsLoaded = !!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor;
        if (scriptsLoaded) {
          resolve();
        } else if (window.loadEnv) {
          // 利用订阅发布，确保同时渲染多个组件时，不会重复创建script标签
          window.loadEnv.on('scriptsLoaded', function () {
            resolve();
          });
        } else {
          window.loadEnv = new LoadEvent();
          // 如果在其他地方只引用ueditor.all.min.js，在加载ueditor.config.js之后仍需要重新加载ueditor.all.min.js，所以必须确保ueditor.config.js已加载
          _this2._loadConfig().then(function () {
            return _this2._loadCore();
          }).then(function () {
            resolve();
            window.loadEnv.emit('scriptsLoaded');
          });
        }
      });
    },
    _loadConfig: function _loadConfig() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
          resolve();
          return;
        }
        var configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.src = _this3.mixedConfig.UEDITOR_HOME_URL + 'ueditor.config.js';
        document.getElementsByTagName('head')[0].appendChild(configScript);
        configScript.onload = function () {
          if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
            resolve();
          } else {
            console.error('加载ueditor.config.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', configScript.src);
          }
        };
      });
    },
    _loadCore: function _loadCore() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (window.UE && window.UE.getEditor) {
          resolve();
          return;
        }
        var coreScript = document.createElement('script');
        coreScript.type = 'text/javascript';
        coreScript.src = _this4.mixedConfig.UEDITOR_HOME_URL + 'ueditor.all.min.js';
        document.getElementsByTagName('head')[0].appendChild(coreScript);
        coreScript.onload = function () {
          if (window.UE && window.UE.getEditor) {
            resolve();
          } else {
            console.error('加载ueditor.all.min.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', coreScript.src);
          }
        };
      });
    },

    // 设置内容
    _setContent: function _setContent(value) {
      value === this.editor.getContent() || this.editor.setContent(value);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.destroy && this.editor && this.editor.destroy) this.editor.destroy();
  },

  // v-model语法糖实现
  watch: {
    value: {
      handler: function handler(value) {
        var _this5 = this;

        // 0: 尚未初始化 1: 开始初始化但尚未ready 2 初始化完成并已ready
        switch (this.status) {
          case 0:
            this.status = 1;
            this.initValue = value;
            this._checkDependencies().then(function () {
              return _this5._initEditor();
            });
            break;
          case 1:
            this.initValue = value;
            break;
          case 2:
            this._setContent(value);
            break;
          default:
            break;
        }
      },

      immediate: true
    }
  }
});

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("script", {
    attrs: { id: _vm.id, name: _vm.name, type: "text/plain" }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a64a0188", module.exports)
  }
}

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(481);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("460de6a5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-24355ef3\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit_goods.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-24355ef3\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit_goods.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.left {\n    float: left;\n    width: 55%;\n}\n.right {\n    width: 30%;\n    float: right;\n}\n.edui-editor {\n    width: 100% !important;\n}\n.edui-editor-iframeholder {\n    width: 100% !important;\n}\n.wheel_photo {\n    width: 200px;\n    height: 200px;\n}\n", ""]);

// exports


/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_ueditor_wrap__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_ueditor_wrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_ueditor_wrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_public_upload__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_public_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_public_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__set_meal_list__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__set_meal_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__set_meal_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goods_size_list__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goods_size_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__goods_size_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Extension__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_goods__ = __webpack_require__(242);
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
    components: {
        upload: __WEBPACK_IMPORTED_MODULE_2__components_public_upload___default.a, VueUeditorWrap: __WEBPACK_IMPORTED_MODULE_1_vue_ueditor_wrap___default.a, Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a, setMeal: __WEBPACK_IMPORTED_MODULE_3__set_meal_list___default.a, goodsSize: __WEBPACK_IMPORTED_MODULE_4__goods_size_list___default.a, Extension: __WEBPACK_IMPORTED_MODULE_5__Extension___default.a
    },
    data: function data() {
        return {
            lazy: true,
            activeName: 'first',
            goods: {
                goods_title: "",
                goods_desc: "",
                // params: "",
                goods_content: "",
                wheel_photo: [],
                photo: "",
                price: "",
                is_up: "1",
                template_id: ""
            },
            Ueconfig: {
                serverUrl: '/static/UEditor/php/controller.php'
            },
            template: []
        };
    },

    methods: {
        success: function success(value) {
            //封面图片上传成功回调
            this.goods.photo = value;
        },
        wheel_success: function wheel_success(value) {
            //轮播图片上传成功回调
            this.goods.wheel_photo.push(value);
        },
        goodsAdd: function goodsAdd() {
            var _this = this;

            Object(__WEBPACK_IMPORTED_MODULE_6__api_goods__["g" /* goodsIdUpdate */])(this.$route.params.id, this.goods).then(function (response) {
                _this.$message.success(response.data.msg);
                _this.$router.push('/goods_list');
            });
        },
        deleteWheel: function deleteWheel(index) {
            this.goods.wheel_photo.splice(index, 1);
        }
    },
    created: function created() {
        var _this2 = this;

        if (this.$route.params.sub != undefined) {
            //跳转到子页
            this.activeName = this.$route.params.sub;
        }
        Object(__WEBPACK_IMPORTED_MODULE_6__api_goods__["f" /* goodsIdGet */])(this.$route.params.id).then(function (response) {
            _this2.goods = response.data.data;
        });
        Object(__WEBPACK_IMPORTED_MODULE_6__api_goods__["m" /* goodsTemplate */])().then(function (response) {
            _this2.template = response.data.data;
        });
    },

    props: ['id']
});

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(484)
/* template */
var __vue_template__ = __webpack_require__(493)
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/set_meal/list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48641caa", Component.options)
  } else {
    hotAPI.reload("data-v-48641caa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__add__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__edit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_list_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_goods__ = __webpack_require__(242);
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
    components: { Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a, Add: __WEBPACK_IMPORTED_MODULE_1__add___default.a, Edit: __WEBPACK_IMPORTED_MODULE_2__edit___default.a },
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_list_page__["a" /* default */]],
    data: function data() {
        return {
            url: '/meal?goods_id=' + this.$route.params.id,
            addFormVisible: false,
            editFormVisible: false,
            columns: [{
                prop: 'id',
                label: 'ID',
                width: '80'
            }, {
                prop: 'meal_name',
                label: '套餐名称'
            }, {
                prop: 'meal_price',
                label: '套餐价格'
            }, {
                prop: 'meal_stock',
                label: '库存',
                sort: true
            }, {
                label: '操作',
                width: '200',
                tools: this.handleGetBtn()
            }]
        };
    },

    methods: {
        // 工具栏事件处理 type值为columns中tools的键值
        handleTools: function handleTools(type, index, row) {
            var _this = this;

            this.tools_id = row.id;
            if (type == 'edit') {
                this.editFormVisible = true;
            } else if (type == 'delete') {
                Object(__WEBPACK_IMPORTED_MODULE_4__api_goods__["t" /* setMealIdDelete */])(row.id).then(function (response) {
                    _this.handleDeleteRow(index);
                    _this.$message.success(response.data.msg);
                });
            }
        },
        handleAdd: function handleAdd() {
            this.addFormVisible = true;
        },


        //批量删除
        handleSelect: function handleSelect() {
            var _this2 = this;

            //禁用多选用户操作
            var ids = this.handleGetSelection('id');
            if (ids.length === 0) {
                this.$message.error('请选择一个选项后再进行进行操作');
                return false;
            }
            Object(__WEBPACK_IMPORTED_MODULE_4__api_goods__["s" /* setMealBatchIdDelete */])({ id: ids }).then(function (response) {
                //重载表格
                _this2.handleRenderTable();
                //响应消息
                _this2.$message.success(response.data.msg);
            });
        },

        //返回产品列表
        returnList: function returnList() {
            this.$router.push('/goods_list');
        },


        //tool栏按钮权限控制
        handleGetBtn: function handleGetBtn() {
            var conf = {
                edit: {
                    type: 'primary',
                    icon: 'el-icon-edit'
                },
                delete: {
                    type: 'danger',
                    icon: 'el-icon-delete'
                }
            };
            var result = {};
            this.$store.state.user.auth.role.forEach(function (item) {
                if (item in conf) {
                    result[item] = conf[item];
                }
            });
            return conf;
        }
    }
});

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(486)
/* template */
var __vue_template__ = __webpack_require__(487)
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/set_meal/add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a4ce2a4", Component.options)
  } else {
    hotAPI.reload("data-v-0a4ce2a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_goods__ = __webpack_require__(242);
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
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    data: function data() {
        return {
            form: {
                meal_name: '',
                meal_price: '',
                meal_stock: 99999,
                goods_id: this.$route.params.id
            },
            rules: {
                meal_name: [{ required: true, message: '套餐名称必须填写', trigger: 'blur' }],
                meal_price: [{ required: true, message: '套餐价格必须填写', trigger: 'blur'
                }],
                meal_stock: [{
                    type: 'number', required: true, message: '套餐库存必须填写', trigger: 'blur'
                }]
            }
        };
    },

    methods: {
        onSubmit: function onSubmit() {
            if (this.handleValid('meal_form')) {
                this.handleSubmit(Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["r" /* setMealAdd */])(this.form));
            }
        }
    }
});

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      ref: "meal_form",
      attrs: { rules: _vm.rules, model: _vm.form, "label-width": "80px" }
    },
    [
      _c(
        "el-form-item",
        { attrs: { label: "套餐名称", prop: "meal_name" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入套餐名称" },
            model: {
              value: _vm.form.meal_name,
              callback: function($$v) {
                _vm.$set(_vm.form, "meal_name", $$v)
              },
              expression: "form.meal_name"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "套餐价格", prop: "meal_price" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入套餐价格" },
            model: {
              value: _vm.form.meal_price,
              callback: function($$v) {
                _vm.$set(_vm.form, "meal_price", $$v)
              },
              expression: "form.meal_price"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "库存", prop: "meal_stock" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入套餐库存" },
            model: {
              value: _vm.form.meal_stock,
              callback: function($$v) {
                _vm.$set(_vm.form, "meal_stock", $$v)
              },
              expression: "form.meal_stock"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        [
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v("立即创建")]
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
    require("vue-hot-reload-api")      .rerender("data-v-0a4ce2a4", module.exports)
  }
}

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(489)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(491)
/* template */
var __vue_template__ = __webpack_require__(492)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-29d3cdd2"
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/set_meal/edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29d3cdd2", Component.options)
  } else {
    hotAPI.reload("data-v-29d3cdd2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(490);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("7a5887cb", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-29d3cdd2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-29d3cdd2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_goods__ = __webpack_require__(242);
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
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    data: function data() {
        return {
            form: {
                meal_name: '',
                meal_price: '',
                meal_stock: 99999
            },
            rules: {
                meal_name: [{ required: true, message: '套餐名称必须填写', trigger: 'blur' }],
                meal_price: [{
                    type: 'number', required: true, message: '套餐价格必须填写', trigger: 'blur'
                }],
                meal_stock: [{
                    type: 'number', required: true, message: '套餐库存必须填写', trigger: 'blur'
                }]
            }
        };
    },

    methods: {
        onSubmit: function onSubmit() {
            if (this.handleValid('meal_form')) {
                this.handleSubmit(Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["v" /* setMealIdUpdate */])(this.id, this.form));
            }
        }
    },
    created: function created() {
        var _this = this;

        Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["u" /* setMealIdGet */])(this.id).then(function (response) {
            _this.form = response.data.data;
        });
    },

    props: ['id']
});

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      ref: "meal_form",
      attrs: { rules: _vm.rules, model: _vm.form, "label-width": "80px" }
    },
    [
      _c(
        "el-form-item",
        { attrs: { label: "套餐名称", prop: "meal_name" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入套餐名称" },
            model: {
              value: _vm.form.meal_name,
              callback: function($$v) {
                _vm.$set(_vm.form, "meal_name", $$v)
              },
              expression: "form.meal_name"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "套餐价格", prop: "meal_price" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入套餐价格" },
            model: {
              value: _vm.form.meal_price,
              callback: function($$v) {
                _vm.$set(_vm.form, "meal_price", $$v)
              },
              expression: "form.meal_price"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "库存", prop: "meal_stock" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入套餐库存" },
            model: {
              value: _vm.form.meal_stock,
              callback: function($$v) {
                _vm.$set(_vm.form, "meal_stock", $$v)
              },
              expression: "form.meal_stock"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        [
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v("立即创建")]
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
    require("vue-hot-reload-api")      .rerender("data-v-29d3cdd2", module.exports)
  }
}

/***/ }),

/***/ 493:
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
        { staticStyle: { margin: "8px 0" } },
        [
          _c(
            "el-row",
            [
              _c(
                "el-col",
                { attrs: { span: 14 } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: { click: _vm.handleAdd }
                    },
                    [_vm._v("添加套餐")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "danger" },
                      on: { click: _vm.handleSelect }
                    },
                    [_vm._v("删除套餐")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "success" },
                      on: { click: _vm.returnList }
                    },
                    [_vm._v("返回产品列表")]
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
      _c("Table", {
        ref: "table",
        attrs: { url: _vm.url, columns: _vm.columns },
        on: { tools: _vm.handleTools }
      }),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "添加套餐", visible: _vm.addFormVisible },
          on: {
            "update:visible": function($event) {
              _vm.addFormVisible = $event
            }
          }
        },
        [
          _vm.addFormVisible
            ? _c("Add", {
                ref: "addForm",
                on: {
                  close: function($event) {
                    _vm.addFormVisible = false
                  },
                  render: this.handleRenderTable
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "编辑套餐", visible: _vm.editFormVisible },
          on: {
            "update:visible": function($event) {
              _vm.editFormVisible = $event
            }
          }
        },
        [
          _vm.editFormVisible
            ? _c("Edit", {
                ref: "editForm",
                attrs: { id: _vm.tools_id },
                on: {
                  close: function($event) {
                    _vm.editFormVisible = false
                  },
                  render: this.handleRenderTable
                }
              })
            : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-48641caa", module.exports)
  }
}

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(495)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(497)
/* template */
var __vue_template__ = __webpack_require__(506)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2e5c51a1"
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/goods_size/list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e5c51a1", Component.options)
  } else {
    hotAPI.reload("data-v-2e5c51a1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(496);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("2326dd8e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e5c51a1\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e5c51a1\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.chart-left[data-v-2e5c51a1]{\n    width: 720px;\n}\n.chart-left[data-v-2e5c51a1] .el-pagination {\n    float: left!important;\n}\n", ""]);

// exports


/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__add__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__edit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_list_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_goods__ = __webpack_require__(242);
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
    components: { Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a, Add: __WEBPACK_IMPORTED_MODULE_1__add___default.a, Edit: __WEBPACK_IMPORTED_MODULE_2__edit___default.a },
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_list_page__["a" /* default */]],
    data: function data() {
        return {
            url: '/size?goods_id=' + this.$route.params.id,
            addFormVisible: false,
            editFormVisible: false,
            columns: [{
                prop: 'id',
                label: 'ID',
                width: '80'
            }, {
                prop: 'size_name',
                label: '尺码名称',
                width: "380"
            }, {
                label: '操作',
                width: '200',
                tools: this.handleGetBtn()
            }]
        };
    },

    methods: {
        // 工具栏事件处理 type值为columns中tools的键值
        handleTools: function handleTools(type, index, row) {
            var _this = this;

            this.tools_id = row.id;
            if (type == 'edit') {
                this.editFormVisible = true;
            } else if (type == 'delete') {
                Object(__WEBPACK_IMPORTED_MODULE_4__api_goods__["y" /* sizeIdDelete */])(row.id).then(function (response) {
                    _this.handleDeleteRow(index);
                    _this.$message.success(response.data.msg);
                });
            }
        },
        handleAdd: function handleAdd() {
            this.addFormVisible = true;
        },


        //批量删除
        handleSelect: function handleSelect() {
            var _this2 = this;

            //禁用多选用户操作
            var ids = this.handleGetSelection('id');
            if (ids.length === 0) {
                this.$message.error('请选择一个选项后再进行进行操作');
                return false;
            }
            Object(__WEBPACK_IMPORTED_MODULE_4__api_goods__["x" /* sizeBatchIdDelete */])({ id: ids }).then(function (response) {
                //重载表格
                _this2.handleRenderTable();
                //响应消息
                _this2.$message.success(response.data.msg);
            });
        },

        //返回产品列表
        returnList: function returnList() {
            this.$router.push('/goods_list');
        },


        //tool栏按钮权限控制
        handleGetBtn: function handleGetBtn() {
            var conf = {
                edit: {
                    type: 'primary',
                    icon: 'el-icon-edit'
                },
                delete: {
                    type: 'danger',
                    icon: 'el-icon-delete'
                }
            };
            var result = {};
            this.$store.state.user.auth.role.forEach(function (item) {
                if (item in conf) {
                    result[item] = conf[item];
                }
            });
            return conf;
        }
    }
});

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(499)
/* template */
var __vue_template__ = __webpack_require__(500)
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/goods_size/add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ddd0a824", Component.options)
  } else {
    hotAPI.reload("data-v-ddd0a824", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_goods__ = __webpack_require__(242);
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
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    data: function data() {
        return {
            form: {
                size_name: '',
                goods_id: this.$route.params.id
            },
            rules: {
                size_name: [{ required: true, message: '尺码名称必须填写', trigger: 'blur' }]
            }
        };
    },

    methods: {
        onSubmit: function onSubmit() {
            if (this.handleValid('size_form')) {
                this.handleSubmit(Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["w" /* sizeAdd */])(this.form));
            }
        }
    }
});

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      ref: "size_form",
      attrs: { rules: _vm.rules, model: _vm.form, "label-width": "80px" }
    },
    [
      _c(
        "el-form-item",
        { attrs: { label: "尺码名称", prop: "size_name" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入尺码名称" },
            model: {
              value: _vm.form.size_name,
              callback: function($$v) {
                _vm.$set(_vm.form, "size_name", $$v)
              },
              expression: "form.size_name"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        [
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v("立即创建")]
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
    require("vue-hot-reload-api")      .rerender("data-v-ddd0a824", module.exports)
  }
}

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(502)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(504)
/* template */
var __vue_template__ = __webpack_require__(505)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3da4790d"
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/goods_size/edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3da4790d", Component.options)
  } else {
    hotAPI.reload("data-v-3da4790d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(503);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("06a7f6cc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3da4790d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3da4790d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_goods__ = __webpack_require__(242);
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
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    data: function data() {
        return {
            form: {
                size_name: ''
            },
            rules: {
                size_name: [{ required: true, message: '尺码名称必须填写', trigger: 'blur' }]
            }
        };
    },

    methods: {
        onSubmit: function onSubmit() {
            if (this.handleValid('size_form')) {
                this.handleSubmit(Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["A" /* sizeIdUpdate */])(this.id, this.form));
            }
        }
    },
    created: function created() {
        var _this = this;

        Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["z" /* sizeIdGet */])(this.id).then(function (response) {
            _this.form = response.data.data;
        });
    },

    props: ['id']
});

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      ref: "size_form",
      attrs: { rules: _vm.rules, model: _vm.form, "label-width": "80px" }
    },
    [
      _c(
        "el-form-item",
        { attrs: { label: "尺码名称", prop: "size_name" } },
        [
          _c("el-input", {
            attrs: { placeholder: "请输入尺码名称" },
            model: {
              value: _vm.form.size_name,
              callback: function($$v) {
                _vm.$set(_vm.form, "size_name", $$v)
              },
              expression: "form.size_name"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        [
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v("立即创建")]
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
    require("vue-hot-reload-api")      .rerender("data-v-3da4790d", module.exports)
  }
}

/***/ }),

/***/ 506:
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
        { staticStyle: { margin: "8px 0" } },
        [
          _c(
            "el-row",
            [
              _c(
                "el-col",
                { attrs: { span: 14 } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: { click: _vm.handleAdd }
                    },
                    [_vm._v("添加产品尺码")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "danger" },
                      on: { click: _vm.handleSelect }
                    },
                    [_vm._v("删除产品尺码")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "success" },
                      on: { click: _vm.returnList }
                    },
                    [_vm._v("返回产品列表")]
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
        "div",
        { staticClass: "chart-left" },
        [
          _c("Table", {
            ref: "table",
            attrs: { url: _vm.url, columns: _vm.columns },
            on: { tools: _vm.handleTools }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "添加产品尺码", visible: _vm.addFormVisible },
          on: {
            "update:visible": function($event) {
              _vm.addFormVisible = $event
            }
          }
        },
        [
          _vm.addFormVisible
            ? _c("Add", {
                ref: "addForm",
                on: {
                  close: function($event) {
                    _vm.addFormVisible = false
                  },
                  render: this.handleRenderTable
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "编辑产品尺码", visible: _vm.editFormVisible },
          on: {
            "update:visible": function($event) {
              _vm.editFormVisible = $event
            }
          }
        },
        [
          _vm.editFormVisible
            ? _c("Edit", {
                ref: "editForm",
                attrs: { id: _vm.tools_id },
                on: {
                  close: function($event) {
                    _vm.editFormVisible = false
                  },
                  render: this.handleRenderTable
                }
              })
            : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-2e5c51a1", module.exports)
  }
}

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(508)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(510)
/* template */
var __vue_template__ = __webpack_require__(511)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7c1d93fd"
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
Component.options.__file = "resources/assets/js/view/order/publish_goods/Extension.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c1d93fd", Component.options)
  } else {
    hotAPI.reload("data-v-7c1d93fd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(509);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("d26c07ac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7c1d93fd\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Extension.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7c1d93fd\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Extension.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_goods__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_list_page__ = __webpack_require__(241);
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
    components: { Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a },
    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_list_page__["a" /* default */]],
    name: "Extension",
    data: function data() {
        return {
            url: "source/extensionURL?goods_id=" + this.$route.params.id,
            columns: [{
                prop: 'id',
                label: 'ID',
                width: '80'
            }, {
                prop: 'source_name',
                label: '渠道名称',
                width: '220'
            }, {
                prop: 'source_url',
                label: '推广链接'
            }]
        };
    },

    methods: {
        returnList: function returnList() {
            this.$router.push('/goods_list');
        },
        Regenerate: function Regenerate() {
            var _this = this;

            Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["a" /* RegenerateAPI */])(this.$route.params.id).then(function (response) {
                _this.$message.success(response.data.msg);
                _this.handleRenderTable();
            });
        }
    }
});

/***/ }),

/***/ 511:
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
        { staticStyle: { margin: "8px 0" } },
        [
          _c(
            "el-row",
            [
              _c(
                "el-col",
                { attrs: { span: 14 } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "success" },
                      on: { click: _vm.returnList }
                    },
                    [_vm._v("返回产品列表")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: { click: _vm.Regenerate }
                    },
                    [_vm._v("重新生成推广链接")]
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
      _c("Table", {
        ref: "table",
        attrs: { url: _vm.url, columns: _vm.columns }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-7c1d93fd", module.exports)
  }
}

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-tabs",
    {
      model: {
        value: _vm.activeName,
        callback: function($$v) {
          _vm.activeName = $$v
        },
        expression: "activeName"
      }
    },
    [
      _c("el-tab-pane", { attrs: { label: "商品基本信息", name: "first" } }, [
        _c(
          "div",
          { staticClass: "left" },
          [
            _c(
              "el-form",
              { attrs: { "label-width": "80px", model: _vm.goods } },
              [
                _c(
                  "el-form-item",
                  { attrs: { label: "商品标题:" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "商品标题" },
                      model: {
                        value: _vm.goods.goods_title,
                        callback: function($$v) {
                          _vm.$set(_vm.goods, "goods_title", $$v)
                        },
                        expression: "goods.goods_title"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "商品简述:" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "商品简述" },
                      model: {
                        value: _vm.goods.goods_desc,
                        callback: function($$v) {
                          _vm.$set(_vm.goods, "goods_desc", $$v)
                        },
                        expression: "goods.goods_desc"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "详细描述:" } },
                  [
                    _c("vue-ueditor-wrap", {
                      attrs: { config: _vm.Ueconfig },
                      model: {
                        value: _vm.goods.goods_content,
                        callback: function($$v) {
                          _vm.$set(_vm.goods, "goods_content", $$v)
                        },
                        expression: "goods.goods_content"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "封面图片", prop: "photo" } },
                  [
                    _c("upload", {
                      attrs: { img: _vm.goods.photo },
                      on: { "img-success": _vm.success }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "轮播图片" } },
                  [
                    _c("upload", { on: { "img-success": _vm.wheel_success } }),
                    _vm._v(" "),
                    _vm._l(_vm.goods.wheel_photo, function(item, index) {
                      return [
                        _c("img", {
                          key: index,
                          staticClass: "wheel_photo",
                          staticStyle: { "margin-left": "4px" },
                          attrs: { src: item },
                          on: {
                            click: function($event) {
                              _vm.deleteWheel(index)
                            }
                          }
                        })
                      ]
                    })
                  ],
                  2
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "right" },
          [
            _c(
              "el-card",
              { staticClass: "box-card" },
              [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [_c("span", [_vm._v("其他选项")])]
                ),
                _vm._v(" "),
                _c(
                  "p",
                  [
                    _c("el-input", {
                      attrs: { placeholder: "商品单价" },
                      model: {
                        value: _vm.goods.price,
                        callback: function($$v) {
                          _vm.$set(_vm.goods, "price", $$v)
                        },
                        expression: "goods.price"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "p",
                  [
                    _c(
                      "el-select",
                      {
                        attrs: {
                          clearable: "",
                          placeholder: "请选择一个商品展示模板"
                        },
                        model: {
                          value: _vm.goods.template_id,
                          callback: function($$v) {
                            _vm.$set(_vm.goods, "template_id", $$v)
                          },
                          expression: "goods.template_id"
                        }
                      },
                      _vm._l(_vm.template, function(item) {
                        return _c("el-option", {
                          key: item.value,
                          attrs: { label: item.label, value: item.value }
                        })
                      })
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "p",
                  [
                    _c(
                      "el-checkbox",
                      {
                        attrs: { "true-label": "1", "false-label": "0" },
                        model: {
                          value: _vm.goods.is_up,
                          callback: function($$v) {
                            _vm.$set(_vm.goods, "is_up", $$v)
                          },
                          expression: "goods.is_up"
                        }
                      },
                      [_vm._v("是否上架")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-button",
                  { attrs: { type: "primary" }, on: { click: _vm.goodsAdd } },
                  [_vm._v("发布商品")]
                )
              ],
              1
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "el-tab-pane",
        { attrs: { label: "套餐设置", name: "second", lazy: _vm.lazy } },
        [_c("setMeal")],
        1
      ),
      _vm._v(" "),
      _c(
        "el-tab-pane",
        { attrs: { label: "产品尺码", name: "third", lazy: _vm.lazy } },
        [_c("goodsSize")],
        1
      ),
      _vm._v(" "),
      _c(
        "el-tab-pane",
        { attrs: { label: "推广链接", name: "fourth", lazy: _vm.lazy } },
        [_c("Extension")],
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
    require("vue-hot-reload-api")      .rerender("data-v-24355ef3", module.exports)
  }
}

/***/ })

});