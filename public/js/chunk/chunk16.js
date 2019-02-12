webpackJsonp([16],{

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(283)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(285)
/* template */
var __vue_template__ = __webpack_require__(286)
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
Component.options.__file = "resources/assets/js/view/article/edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cc46872a", Component.options)
  } else {
    hotAPI.reload("data-v-cc46872a", Component.options)
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

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return article_add; });
/* unused harmony export sitemap */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return clean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return article_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return article_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return article_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return urlDel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return urlAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return urlEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return urlBatchDel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var article_add = function article_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/add',
        data: data,
        method: 'post'
    });
};

var sitemap = function sitemap() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/sitemap',
        method: 'get'
    });
};
var clean = function clean() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/clean',
        method: 'get'
    });
};

var article_get = function article_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/' + id,
        method: 'get'
    });
};
var article_edit = function article_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/edit/' + id,
        data: data,
        method: 'post'
    });
};
var article_del = function article_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/del/' + id,
        method: 'get'
    });
};

var urlDel = function urlDel(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/url/' + id,
        method: 'delete'
    });
};
var urlAdd = function urlAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/url',
        data: data,
        method: 'post'
    });
};
var urlEdit = function urlEdit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/url/' + id,
        data: data,
        method: 'put'
    });
};
var urlBatchDel = function urlBatchDel(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/url/batchDel',
        data: data,
        method: 'post'
    });
};

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

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return template_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return template_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return template_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return template_edit; });
/* unused harmony export template_getList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var template_del = function template_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/del/' + id,
        method: 'get'
    });
};
var template_add = function template_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/add',
        data: data,
        method: 'post'
    });
};
var template_get = function template_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/' + id,
        method: 'get'
    });
};
var template_edit = function template_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/edit/' + id,
        data: data,
        method: 'post'
    });
};
var template_getList = function template_getList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/list',
        method: 'get'
    });
};

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

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getList */
/* unused harmony export category_del */
/* unused harmony export category_add */
/* unused harmony export category_edit */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var getList = function getList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/list',
        method: 'get'
    });
};
var category_del = function category_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/del/' + id,
        method: 'get'
    });
};
var category_add = function category_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/add',
        data: data,
        method: 'post'
    });
};
var category_edit = function category_edit(data, id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/edit/' + id,
        data: data,
        method: 'post'
    });
};

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(284);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(237)("0bdf0b41", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc46872a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc46872a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.left{\n    float: left;\n    width: 65%;\n}\n.right{\n    width: 30%;\n    float: right;\n}\n.edui-editor{\n    width: 100%!important;\n}\n.text {\n    font-size: 14px;\n}\n.item {\n    margin-bottom: 18px;\n}\n.clearfix:before,\n.clearfix:after {\n    display: table;\n    content: \"\";\n}\n.clearfix:after {\n    clear: both\n}\n.box-card {\n    width: 480px;\n}\n.edui-editor-iframeholder {\n    width: 100%!important;\n}\n", ""]);

// exports


/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_public_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_article__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_articleTemplate__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_category__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: "publish",
    data: function data() {
        return {
            articleForm: {
                is_jump: 1, //开启随机跳转
                is_wechat: 1, //是否是微信浏览器
                title: '', //文章标题
                description: '', //文章描述
                content: '', //文章内容
                arrow: '', //点击箭头返回
                physics: '', //物理按键点击返回
                photo: '', //文章封面
                music: "", //背景地址
                appid: "", //微信Id
                key: "", //微信密匙
                right_now: "", //网站立即跳转到指定地址
                cnzz: "", //文章流量统计
                is_encryption: "", //页面加密
                iframe: "0", //嵌套网页
                source_check: "1", //来源检测
                ajax: "" //异步加载文章
            },
            rules: {
                title: [{ required: true, message: '文章标题为必填项目', trigger: 'blur' }],
                content: [{ required: true, message: '文章内容为必填项目', trigger: 'blur' }]
            },
            options: [],
            Ueconfig: {
                serverUrl: '/static/UEditor/php/controller.php'
            }
        };
    },

    methods: {
        //提交数据
        onSubmit: function onSubmit(articleForm) {
            var _this = this;

            if (this.handleValid(articleForm)) {
                Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["c" /* article_edit */])(this.$route.params.id, this.articleForm).then(function (response) {
                    //响应成功消息
                    _this.$message.success(response.data.msg);
                    //跳转到文章列表页面
                    _this.$router.push('/article_list');
                });
            }
        },
        success: function success(value) {
            //图片上传成功 和form表单的元素做一个绑定 回显图片数据
            this.articleForm.photo = value;
        },
        clickitem: function clickitem(item) {
            item === this.articleForm.is_jump ? this.articleForm.is_jump = null : this.articleForm.is_jump = item;
        },
        isWechat: function isWechat(item) {
            item === this.articleForm.is_wechat ? this.articleForm.is_wechat = null : this.articleForm.is_wechat = item;
        },
        is_encryption: function is_encryption(item) {
            item === this.articleForm.is_encryption ? this.articleForm.is_encryption = null : this.articleForm.is_encryption = item;
        }
    },
    components: {
        upload: __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default.a, VueUeditorWrap: __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap___default.a
    },
    created: function created() {
        var _this2 = this;

        //文章数据
        Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["d" /* article_get */])(this.$route.params.id).then(function (response) {
            _this2.articleForm = response.data.data;
        });
    }

});

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "left", staticStyle: { width: "65%" } },
      [
        _c(
          "el-form",
          {
            ref: "articleForm",
            staticClass: "demo-ruleForm",
            attrs: {
              model: _vm.articleForm,
              rules: _vm.rules,
              "label-width": "100px"
            }
          },
          [
            _c(
              "el-form-item",
              { attrs: { label: "文章标题", prop: "title" } },
              [
                _c("el-input", {
                  model: {
                    value: _vm.articleForm.title,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "title", $$v)
                    },
                    expression: "articleForm.title"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章内容", prop: "content" } },
              [
                _c("vue-ueditor-wrap", {
                  attrs: { config: _vm.Ueconfig },
                  model: {
                    value: _vm.articleForm.content,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "content", $$v)
                    },
                    expression: "articleForm.content"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章描述", prop: "description" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "文章描述" },
                  model: {
                    value: _vm.articleForm.description,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "description", $$v)
                    },
                    expression: "articleForm.description"
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
                  attrs: { img: _vm.articleForm.photo },
                  on: { "img-success": _vm.success }
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
                  {
                    attrs: { type: "primary" },
                    on: {
                      click: function($event) {
                        _vm.onSubmit("articleForm")
                      }
                    }
                  },
                  [_vm._v("立即发表")]
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
      { staticClass: "right" },
      [
        _c("el-card", { staticClass: "box-card" }, [
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
                attrs: { placeholder: "微信appId" },
                model: {
                  value: _vm.articleForm.appid,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "appid", $$v)
                  },
                  expression: "articleForm.appid"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "微信密匙" },
                model: {
                  value: _vm.articleForm.key,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "key", $$v)
                  },
                  expression: "articleForm.key"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "第三方流量统计" },
                model: {
                  value: _vm.articleForm.cnzz,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "cnzz", $$v)
                  },
                  expression: "articleForm.cnzz"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "背景音乐" },
                model: {
                  value: _vm.articleForm.music,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "music", $$v)
                  },
                  expression: "articleForm.music"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "文章立即跳转到指定地址" },
                model: {
                  value: _vm.articleForm.right_now,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "right_now", $$v)
                  },
                  expression: "articleForm.right_now"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "点击文章箭头返回" },
                model: {
                  value: _vm.articleForm.arrow,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "arrow", $$v)
                  },
                  expression: "articleForm.arrow"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "物理按键点击返回" },
                model: {
                  value: _vm.articleForm.physics,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "physics", $$v)
                  },
                  expression: "articleForm.physics"
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
                "el-checkbox",
                {
                  attrs: { "true-label": "1", "false-label": "0" },
                  model: {
                    value: _vm.articleForm.is_wechat,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_wechat", $$v)
                    },
                    expression: "articleForm.is_wechat"
                  }
                },
                [_vm._v("开启微信检测")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c(
                "el-radio",
                {
                  attrs: { label: 1 },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.is_encryption(1)
                    }
                  },
                  model: {
                    value: _vm.articleForm.is_encryption,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_encryption", $$v)
                    },
                    expression: "articleForm.is_encryption"
                  }
                },
                [_vm._v("页面加密")]
              ),
              _vm._v(" "),
              _c(
                "el-radio",
                {
                  attrs: { label: 0 },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.is_encryption(0)
                    }
                  },
                  model: {
                    value: _vm.articleForm.is_encryption,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_encryption", $$v)
                    },
                    expression: "articleForm.is_encryption"
                  }
                },
                [_vm._v("使用前端框架")]
              ),
              _vm._v(" "),
              _c(
                "el-radio",
                {
                  attrs: { label: 2 },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.is_encryption(2)
                    }
                  },
                  model: {
                    value: _vm.articleForm.is_encryption,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_encryption", $$v)
                    },
                    expression: "articleForm.is_encryption"
                  }
                },
                [_vm._v("异步加载")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c(
                "el-radio",
                {
                  attrs: { label: 1 },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.clickitem(1)
                    }
                  },
                  model: {
                    value: _vm.articleForm.is_jump,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_jump", $$v)
                    },
                    expression: "articleForm.is_jump"
                  }
                },
                [_vm._v("开启主域名随机跳转")]
              ),
              _vm._v(" "),
              _c(
                "el-radio",
                {
                  attrs: { label: 0 },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.clickitem(0)
                    }
                  },
                  model: {
                    value: _vm.articleForm.is_jump,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_jump", $$v)
                    },
                    expression: "articleForm.is_jump"
                  }
                },
                [_vm._v("开启二级域名随机跳转")]
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
                    value: _vm.articleForm.iframe,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "iframe", $$v)
                    },
                    expression: "articleForm.iframe"
                  }
                },
                [_vm._v("嵌套网页")]
              ),
              _vm._v(" "),
              _c(
                "el-checkbox",
                {
                  attrs: { "true-label": "1", "false-label": "0" },
                  model: {
                    value: _vm.articleForm.source_check,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "source_check", $$v)
                    },
                    expression: "articleForm.source_check"
                  }
                },
                [_vm._v("来源检测")]
              )
            ],
            1
          )
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-cc46872a", module.exports)
  }
}

/***/ })

});