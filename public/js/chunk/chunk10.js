webpackJsonp([10],{

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(475)
}
var normalizeComponent = __webpack_require__(237)
/* script */
var __vue_script__ = __webpack_require__(477)
/* template */
var __vue_template__ = __webpack_require__(483)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-548cc380"
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
Component.options.__file = "resources/assets/js/view/order/goods/list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-548cc380", Component.options)
  } else {
    hotAPI.reload("data-v-548cc380", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 237:
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

/***/ 238:
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

var listToStyles = __webpack_require__(239)

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

/***/ 239:
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

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(243)
}
var normalizeComponent = __webpack_require__(237)
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

/***/ 242:
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

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(244);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(238)("ff2b3c24", content, false, {});
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
var normalizeComponent = __webpack_require__(237)
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
var update = __webpack_require__(238)("50b6e68c", content, false, {});
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
var normalizeComponent = __webpack_require__(237)
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
var update = __webpack_require__(238)("328aaa3a", content, false, {});
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

/***/ 257:
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

var goodsOrderDelete = function goodsOrderDelete(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: 'goodsOrder/' + id,
        data: data,
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

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getConfigArray; });
/* unused harmony export getConfigValue */
/* unused harmony export getConfigKey */
/**
 * 系统配置数据
 * @description
 */

var data = {
    /**
     * @description 性别
     */
    sex: [{ key: 1, value: '男' }, { key: 2, value: '女' }, { key: 0, value: '未填写' }],
    /**
     * @description 用户类型
     */
    user_type: [{ key: 0, value: '管理员' }, { key: 1, value: '普通用户' }],
    /**
     * @description 用户状态
     */
    user_state: [{ key: 0, value: '禁用' }, { key: 1, value: '正常' }],
    /**
     * @description 权限类型
     */
    auth_type: [{ key: 0, value: '接口' }, { key: 1, value: '前端路由' }],
    /**
     * @description 角色状态
     */
    role_state: [{ key: 0, value: '禁用' }, { key: 1, value: '正常' }],

    /**
     * @description 角色状态
     */
    config_type: [{ key: 0, value: 'TEXT' }, { key: 1, value: 'JSON' }]

};

/**
 * 通过Key获取配置数据
 * @param key,[key],[value]
 * @returns array
 *
 */
var getConfigArray = function getConfigArray(keyword) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';

    var res = data[keyword];
    if (key == 'key' && value == 'value') {
        return res;
    }
    var new_res = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var obj = _step.value;

            var item = {};
            item[key] = obj.key;

            item[value] = obj.value;
            new_res.push(item);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return new_res;
};

/**

 * 通过key获取value
 * @param key
 * @param name
 * @returns {*}
 */
var getConfigValue = function getConfigValue(keyword, key) {
    var value = void 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = data[keyword][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var obj = _step2.value;

            if (obj.key == key) {
                value = obj.value;
                break;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return value;
};
/**
 * 通过value获取key
 * @param key
 * @param value
 * @returns {*}
 */
var getConfigKey = function getConfigKey(keyword, value) {
    var key = void 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = data[keyword][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var obj = _step3.value;

            if (obj.value == value) {
                key = obj.key;
                break;
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return key;
};

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(476);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(238)("3fd9013b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-548cc380\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-548cc380\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.through[data-v-548cc380] .el-dialog__body {\n    padding: 45px 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extension__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_list_page__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_sys_config__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_goods__ = __webpack_require__(257);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: { Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a, extensionDlog: __WEBPACK_IMPORTED_MODULE_1__extension___default.a },
    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_list_page__["a" /* default */]],
    data: function data() {
        return {
            url: 'goods',
            extension: false,
            columns: [{
                prop: 'id',
                label: 'ID',
                sort: true,
                width: '80'
            }, {
                prop: 'goods_title',
                label: '商品标题(品名)',
                search: true
            }, {
                prop: 'is_up',
                label: '是否上架',
                render: {
                    props: {
                        row: Object // 接受当前行参数
                    },
                    render: function render(createElement) {
                        // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                        return createElement('span', {
                            style: {
                                color: this.row.is_up_name.color,
                                fontSize: '30px',
                                padding: '5px'
                            }
                        }, this.row.is_up_name.status);
                    }
                }
            }, {
                prop: 'price',
                label: '价格'
            }, {
                prop: 'template',
                label: '使用模板'
            }, {
                prop: 'created_at',
                label: '发布时间'
            }, {
                label: '操作',
                width: '200',
                tools: this.handleGetBtn()
            }],
            goodsListAuth: [{
                add: false,
                delete: false
            }]
        };
    },

    created: function created() {
        var _this = this;

        var goodsListAuth = this.$store.state.user.auth.goods_list;
        goodsListAuth.forEach(function (value) {
            if (value === 'delete') {
                _this.goodsListAuth.delete = true;
            }
            if (value === 'add') {
                _this.goodsListAuth.add = true;
            }
        });
    },
    methods: {
        // 工具栏事件处理 type值为columns中tools的键值
        handleTools: function handleTools(type, index, row) {
            var _this2 = this;

            if (type == 'edit') {
                this.$router.push({
                    path: '/edit_goods',
                    name: "edit_goods",
                    params: {
                        id: row.id
                    }
                });
            } else if (type == 'delete') {
                //删除数据
                Object(__WEBPACK_IMPORTED_MODULE_4__api_goods__["e" /* goodsIdDelete */])(row.id).then(function (response) {
                    //成功响应动态移除表格项
                    _this2.handleDeleteRow(index);
                    //提示信息
                    _this2.$message.success(response.data.msg);
                });
            } else if (type == 'extension') {
                // this.$router.push({
                //     path:'/edit_goods',
                //     name:"edit_goods",
                //     params: {
                //         id: row.id,
                //         sub:'fourth'
                //     }
                // });
                this.id = row.id;
                this.extension = true;
            } else {
                console.error('Tools Event:' + type + ' Not found');
            }
        },
        handleAdd: function handleAdd() {
            //弹出新增窗口
            this.$router.push('/publish_goods');
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
                },
                extension: {
                    type: 'success',
                    text: "推广链接",
                    icon: 'el-icon-share'
                }

            };
            var result = {};
            this.$store.state.user.auth.goods_list.forEach(function (item) {
                if (item in conf) {
                    result[item] = conf[item];
                }
            });
            return result;
        },


        //批量删除
        handleSelect: function handleSelect() {
            var _this3 = this;

            //禁用多选用户操作
            var ids = this.handleGetSelection('id');
            if (ids.length === 0) {
                this.$message.error('请选择一个选项后再进行进行操作');
                return false;
            }
            Object(__WEBPACK_IMPORTED_MODULE_4__api_goods__["d" /* goodsBatchDelete */])({ id: ids }).then(function (response) {
                //重载表格
                _this3.handleRenderTable();
                //响应消息
                _this3.$message.success(response.data.msg);
            });
        }
    }
});

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(479)
}
var normalizeComponent = __webpack_require__(237)
/* script */
var __vue_script__ = __webpack_require__(481)
/* template */
var __vue_template__ = __webpack_require__(482)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-32a29366"
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
Component.options.__file = "resources/assets/js/view/order/goods/extension.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32a29366", Component.options)
  } else {
    hotAPI.reload("data-v-32a29366", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(480);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(238)("647ec472", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32a29366\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./extension.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32a29366\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./extension.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_goods__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_list_page__ = __webpack_require__(242);
//
//
//
//
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
            url: "source/extensionURL?goods_id=" + this.id,
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
        Regenerate: function Regenerate() {
            var _this = this;

            Object(__WEBPACK_IMPORTED_MODULE_1__api_goods__["a" /* RegenerateAPI */])(this.id).then(function (response) {
                _this.$message.success(response.data.msg);
                _this.handleRenderTable();
            });
        }
    },
    props: ['id']
});

/***/ }),

/***/ 482:
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
    require("vue-hot-reload-api")      .rerender("data-v-32a29366", module.exports)
  }
}

/***/ }),

/***/ 483:
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
                  this.goodsListAuth.add
                    ? [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "primary",
                              size: "small",
                              icon: "el-icon-plus"
                            },
                            on: { click: _vm.handleAdd }
                          },
                          [_vm._v("添加商品信息")]
                        )
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  this.goodsListAuth.delete
                    ? [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "danger",
                              size: "small",
                              icon: "el-icon-delete"
                            },
                            on: { click: _vm.handleSelect }
                          },
                          [_vm._v("删除商品信息")]
                        )
                      ]
                    : _vm._e()
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { attrs: { span: 10 } },
                [
                  _c(
                    "el-input",
                    {
                      staticClass: "input-with-select",
                      attrs: {
                        placeholder: "请输入要搜索的内容...",
                        size: "small"
                      },
                      model: {
                        value: _vm.search.value,
                        callback: function($$v) {
                          _vm.$set(_vm.search, "value", $$v)
                        },
                        expression: "search.value"
                      }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            size: "small",
                            placeholder: "请选择"
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.search.field,
                            callback: function($$v) {
                              _vm.$set(_vm.search, "field", $$v)
                            },
                            expression: "search.field"
                          }
                        },
                        _vm._l(_vm.columns, function(item) {
                          return item.search
                            ? _c("el-option", {
                                key: item.prop,
                                attrs: { label: item.label, value: item.prop }
                              })
                            : _vm._e()
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: {
                          slot: "append",
                          size: "small",
                          icon: "el-icon-search"
                        },
                        on: { click: _vm.handleSearch },
                        slot: "append"
                      })
                    ],
                    1
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
          staticClass: "through",
          attrs: { title: "推广链接", visible: _vm.extension },
          on: {
            "update:visible": function($event) {
              _vm.extension = $event
            }
          }
        },
        [
          _vm.extension
            ? _c("extensionDlog", {
                ref: "editForm",
                attrs: { id: _vm.id },
                on: {
                  close: function($event) {
                    _vm.extension = false
                  }
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
    require("vue-hot-reload-api")      .rerender("data-v-548cc380", module.exports)
  }
}

/***/ })

});