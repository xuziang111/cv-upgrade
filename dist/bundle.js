/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(4);

var _autoOffset = __webpack_require__(7);

var _autoOffset2 = _interopRequireDefault(_autoOffset);

var _inintSwiper = __webpack_require__(8);

var _inintSwiper2 = _interopRequireDefault(_inintSwiper);

var _message = __webpack_require__(9);

var _message2 = _interopRequireDefault(_message);

var _smoothlyNav = __webpack_require__(10);

var _smoothlyNav2 = _interopRequireDefault(_smoothlyNav);

var _topbarSticky = __webpack_require__(11);

var _topbarSticky2 = _interopRequireDefault(_topbarSticky);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

!function () {
  window.scrollTo(0, 1);
  loading.classList.remove('loading');
  (0, _autoOffset2.default)();
  (0, _inintSwiper2.default)();
  (0, _message2.default)();
  (0, _smoothlyNav2.default)();
  (0, _topbarSticky2.default)();
}.call();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <title>xxx的个人简历</title>\r\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/css/swiper.min.css\">\r\n    <script src=\"//at.alicdn.com/t/font_457274_lij6unjshn2ep14i.js\"></script>\r\n  </head>\r\n  <body>\r\n      <div id='loading' class='loading'>\r\n      </div>\r\n    <div class=\"topNavBar clearfix\">\r\n\t    <div id='topNavBarIn'class=\"topNavBarIn clearfix\">\r\n        <a class=\"logo\" href=\"#\" alt=\"logo\">\r\n          <span class=\"rs\">RS</span><span class=\"card\">card</span>\r\n        </a>\r\n        <nav class=\"menu\">\r\n          <ul class=\"clearfix\">\r\n            <li><a href=\"#user\">关于</a></li>\r\n            <li><a href=\"#skill\">技能</a></li>\r\n            <li class='menuDown'>\r\n              <a href=\"#works\">作品</a>\r\n                <ul class='submenu'>\r\n                  <li><a href='#'></a>作品1</a></li>\r\n                  <li><a href='#'></a>作品2</a></li>\r\n                  <li><a href='#'></a>作品3</a></li>\r\n                </ul>\r\n            </li>\r\n            <li class='menuDown'>\r\n              <a href=\"#blog\">博客</a>\r\n              <ul class='submenu'>\r\n                <li><a href='#'></a>博客1</a></li>\r\n                <li><a href='#'></a>博客2</a></li>\r\n                <li><a href='#'></a>博客3</a></li>\r\n              </ul>\r\n            </li>\r\n            <li><a href=\"#leaveMessage\">留言</a></li>\r\n            <li><a href=\"#\">联系方式</a></li>\r\n            <li><a href=\"#\">其他</a></li>\r\n          </ul>\r\n        </nav>\r\n      </div>\r\n\t</div>\r\n    <div class=\"banner\">\r\n\t\t  <div class=\"picTop\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n    <main>\r\n      <div data-y id='user' class=\"user active\">\r\n        <div class=\"pictureAndText\">\r\n\t\t\t\t\t<div class=\"picCrad clearfix\">\r\n          <div class=\"picture\">\t\t\t\t\t\t\t\r\n            <img src=\"./img/avatar.jpg\" alt=\"头像\">\t\t\t\t\t\r\n          </div>\r\n          <div class=\"text\">           \r\n              <span class=\"welcome\">Hello\r\n                <span class=\"triangle\"></span>\r\n              </span>\r\n              <h1>xxx</h1>\r\n              <p>前端开发工程师</p>\r\n              <hr>\r\n              <dl class=\"clearfix\">\r\n                <dt>年龄</dt>\r\n                <dd>22</dd>\r\n                <dt>所在城市</dt>\r\n                <dd>郑州</dd>\r\n                <dt>邮箱</dt>\r\n                <dd>123456789@qq.com</dd>\r\n                <dt>手机</dt>\r\n                <dd>13812345678</dd>\r\n              </dl>\r\n\t\t\t\t\t</div>\r\n          </div>\r\n        </div>\r\n        <footer class=\"media\">\r\n          <a href=\"#\"><svg class=\"icon\" aria-hidden=\"true\">\r\n             <use xlink:href=\"#icon-github\"></use>\r\n          </svg></a>\r\n          <a href=\"#\"><svg class=\"icon\" aria-hidden=\"true\">\r\n            <use xlink:href=\"#icon-twitter\"></use>\r\n          </svg></a>\r\n          <a href=\"#\"><svg class=\"icon\" aria-hidden=\"true\">\r\n             <use xlink:href=\"#icon-weibo\"></use>\r\n          </svg></a>\r\n\t\t\t\t\t<a href=\"#\"><svg class=\"icon\" aria-hidden=\"true\">\r\n             <use xlink:href=\"#icon-daorujianshu\"></use>\r\n          </svg></a>\r\n        </footer>\r\n      </div>\r\n        <div class=\"dow\">\r\n        <a class=\"button\" href=\"#\" target=\"_blank\" dowload>下载 PDF 简历</a>\r\n      </div>\r\n      <div class=\"selfIntroduction\">\r\n      <p>\r\n        xxx， 资深前端工程师，现就职于yyy。<br>\r\n        技能：前端开发，Rails 开发，Node.js 开发\r\n      </p>\r\n      </div>\r\n    </main>\r\n    <section data-y id='skill' class=\"skill\">\r\n      <h2>技能</h2>\r\n      <ol class=\"clearfix\">\r\n        <li><h3>HTML 5 &amp; CSS 3</h3>\r\n        <div class=\"progressBar\">\r\n          <div class=\"progress\">\r\n          </div>\r\n          </div>\r\n          </li>\r\n        <li><h3>JavaScript</h3><div class=\"progressBar\">\r\n          <div class=\"progress\">\r\n          </div>\r\n          </div></li>\r\n        <li><h3>jQuery</h3><div class=\"progressBar\">\r\n          <div class=\"progress\">\r\n          </div>\r\n          </div></li>\r\n        <li><h3>Vue</h3><div class=\"progressBar\">\r\n          <div class=\"progress\">\r\n          </div>\r\n          </div></li>\r\n        <li><h3>React</h3><div class=\"progressBar\">\r\n          <div class=\"progress\">\r\n          </div>\r\n          </div></li>\r\n        <li><h3>HTTP</h3><div class=\"progressBar\">\r\n          <div class=\"progress\">\r\n          </div>\r\n          </div></li>\r\n      </ol>\r\n    </section>\r\n\r\n    <section data-y id='works' class=\"works\">\r\n      <h2>作品集</h2>\r\n      <div id=\"myWorks\">\r\n      <div class=\"swiper-container\">\r\n        <div class=\"swiper-wrapper\">\r\n            <div class=\"swiper-slide\"><a href=\"https://lolimy.club/start\"><img src=\"./img/works/nav-page.jpg\" width=\"600\" alt=\"nav-page\"></a></div>\r\n            <div class=\"swiper-slide\"><a href=\"https://lolimy.club/canvas\"><img src=\"./img/works/canvas.jpg\" width=\"600\" alt=\"canvas\"></a></div>\r\n            <div class=\"swiper-slide\"><a href=\"https://lolimy.club/simple-slideshow/slides-demo-3/\"><img src=\"./img/works/apple-like.jpg\" width=\"600\" alt=\"apple-like\"></a></div>\r\n        </div>\r\n        <div class=\"swiper-pagination\"></div>\r\n    </div>\r\n      <div class=\"swiper-button-prev\"></div>\r\n      <div class=\"swiper-button-next\"></div>\r\n    </div>\r\n    </section>\r\n\r\n    <section data-y id='blog' class=\"blog\">\r\n      <h2>博客</h2> \r\n    </section>\r\n\r\n    <section id=\"leaveMessage\" class=\"leaveMessage\" data-y>   \r\n      <h2>留言</h2> \r\n      <div id=\"messageList\"><ol></ol></div>\r\n      <form id=\"postMessageForm\">\r\n        <label>姓名：<input type=\"text\" name=\"name\"></label>\r\n        <label>留言：<input type=\"text\" name=\"content\"></label>\r\n        <input type=\"submit\">\r\n      </form>\r\n    </section>\r\n    <script src=\"https://cdn.bootcss.com/tween.js/r14/Tween.min.js\"></script>\r\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js\"></script>\r\n    <script src=\"//cdn1.lncld.net/static/js/3.6.0/av-min.js\"></script>\r\n    <script src=\"./bundle.js\"></script>\r\n  </body>\r\n</html>\r\n\r\n\r\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(5);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./loading.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./loading.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".loading {\n  background-color: grey;\n  height: 100vh;\n  width: 100%;\n  position: relative;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.loading::before, .loading::after {\n  content: '';\n  position: absolute;\n  background: black;\n  width: 0px;\n  height: 0px;\n  border-radius: 50%;\n  -webkit-animation: loadings 1.5s infinite linear;\n          animation: loadings 1.5s infinite linear; }\n\n.loading::after {\n  -webkit-animation: loadings 1.5s infinite linear 0.7s;\n          animation: loadings 1.5s infinite linear 0.7s; }\n\n@-webkit-keyframes loadings {\n  0% {\n    width: 0px;\n    height: 0px;\n    opacity: 1; }\n  100% {\n    width: 100px;\n    height: 100px;\n    opacity: 0; } }\n\n@keyframes loadings {\n  0% {\n    width: 0px;\n    height: 0px;\n    opacity: 1; }\n  100% {\n    width: 100px;\n    height: 100px;\n    opacity: 0; } }\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function fn() {
  window.addEventListener('scroll', function () {
    findClosest();
  });

  function findClosest() {
    var specialTags = document.querySelectorAll('[data-y]');
    var minIndex = 0;
    for (var i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i;
      }
    }
    // minIndex 就是里窗口顶部最近的元素
    specialTags[minIndex].classList.add('offset');
    var id = specialTags[minIndex].id;
    var a = document.querySelector('a[href="#' + id + '"]');
    var li = a.parentNode;
    var brothersAndMe = li.parentNode.children;
    for (var _i = 0; _i < brothersAndMe.length; _i++) {
      brothersAndMe[_i].classList.remove('highlight');
    }
    li.classList.add('highlight');
  }
  var liTags = document.querySelectorAll('nav > ul > li');
  for (var i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
      x.currentTarget.classList.add('active');
    };
    liTags[i].onmouseleave = function (x) {
      x.currentTarget.classList.remove('active');
    };
  }
}

exports.default = fn;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function fn() {
  var view = document.querySelector('#myWorks');
  var controller = {
    view: null,
    swiper: null,
    init: function init(view) {
      this.view = view;
      this.initSwiper();
    },
    swiperOptions: {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    initSwiper: function initSwiper() {
      this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions);
    }
  };
  controller.init(view);
}
exports.default = fn;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function fn() {
	var view = document.querySelector("#leaveMessage");
	var model = {
		init: function init() {
			var APP_ID = 'orldLePcUlN3v9H2DehyMz5V-gzGzoHsz';
			var APP_KEY = 'DyCcYr2vF8Du4kR5mhmvFjsG';
			AV.init({
				appId: APP_ID,
				appKey: APP_KEY
			});
		},
		fetch: function fetch() {
			var query = new AV.Query('Message');
			return query.find(); //promise对象
		},
		save: function save(name, content) {
			var Message = AV.Object.extend('Message');
			var message = new Message();
			return message.save({ //promise对象
				'name': name,
				'content': content
			});
		}
	};

	var controller = {
		view: null,
		model: null,
		messageList: null,
		init: function init(view, model) {
			this.view = view;
			this.model = model;
			this.model.init();
			this.messageList = view.querySelector('#messageList > ol');
			this.form = view.querySelector('form');
			this.loadMessages();
			this.bindEvents();
		},
		loadMessages: function loadMessages() {
			var _this = this;

			this.model.fetch().then(function (message) {
				var array = message.map(function (item) {
					return item.attributes;
				});
				array.forEach(function (item) {
					var li = document.createElement('li');
					li.innerText = item.name + ':' + item.content;
					_this.messageList.appendChild(li);
				});
			}, function (error) {
				alert('error');
			});
		},
		bindEvents: function bindEvents() {
			var _this2 = this;

			var myForm = this.form;
			myForm.addEventListener('submit', function (e) {
				e.preventDefault();
				var name = myForm.querySelector('input[name=name]').value;
				var content = myForm.querySelector('input[name=content]').value;
				_this2.model.save(name, content).then(function (object) {
					var li = document.createElement('li');
					li.innerText = object.attributes.name + ':' + object.attributes.content;
					this.messageList.appendChild(li);
				}).then('', function () {
					alert("留言暂不可用 请稍后再试");
				});
			});
		}
	};
	controller.init(view, model);
}
exports.default = fn;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function fn() {
  var view = document.querySelector('nav.menu');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.initAnimation();
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var aTags = view.querySelectorAll('nav.menu>ul>li>a');
      for (var i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (x) {
          x.preventDefault();
          var a = x.currentTarget;
          var href = a.getAttribute('href');
          var element = document.querySelector(href);
          _this.scrollToElement(element);
        };
      }
    },
    scrollToElement: function scrollToElement(element) {
      var top = element.offsetTop; //获取元素到页面顶部的距离
      var currentTop = window.scrollY;
      var t = Math.abs((top - 60 - currentTop) / 100);
      if (t > 5) {
        t = 5;
      } else if (t < 1) {
        t = 1;
      };
      var coords = { y: currentTop };
      var tween = new TWEEN.Tween(coords).to({ y: top - 60 }, t * 200).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        window.scrollTo(0, coords.y);
      }).start();
    },
    initAnimation: function initAnimation() {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    }
  };
  controller.init();
}
exports.default = fn;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function fn() {
  var view = document.querySelector('#topNavBarIn');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.bindEvents();
    },
    active: function active() {
      view.classList.add('sticky');
    },
    deactive: function deactive() {
      view.classList.remove('sticky');
    },
    bindEvents: function bindEvents() {
      var _this = this;

      window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
          _this.active();
        } else {
          _this.deactive();
        }
      });
    }
  };
  controller.init();
}
exports.default = fn;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(13);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  padding: 0; }\n\nol, li {\n  list-style: none; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: normal; }\n\nbody {\n  background-color: #efefef; }\n\na {\n  text-decoration: none;\n  color: black; }\n\n.clearfix::after {\n  content: \"\";\n  display: block;\n  clear: both; }\n\n.topNavBar {\n  position: fixed;\n  width: 100%;\n  z-index: 2; }\n\n.topNavBar .logo {\n  float: left;\n  font-size: 22px;\n  padding: 5px 0 6px 0;\n  font-family: \"Hiragino Kaku Gothic Std\"; }\n\n.topNavBarIn {\n  padding: 20px 20px;\n  -webkit-transition: all .3s;\n  transition: all .3s; }\n\n.sticky {\n  background-color: #fff;\n  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .5);\n          box-shadow: 0 0 8px rgba(0, 0, 0, .5);\n  padding: 10px 20px; }\n\n.rs {\n  color: #E6686A;\n  padding-right: 2px; }\n\n.topNavBar .topNavBarIn .card {\n  color: #9A9DA2; }\n\nnav > ul {\n  list-style: none;\n  float: right; }\n  nav > ul > li {\n    float: left;\n    color: grey;\n    margin: 9px 17px 10px 17px;\n    display: block;\n    position: relative; }\n    nav > ul > li > a {\n      text-decoration: none;\n      color: #B7B7B7;\n      font-size: 14px;\n      display: block;\n      position: relative; }\n\nnav > ul > li.active > a::after {\n  content: '';\n  display: block;\n  background: #E06567;\n  height: 3px;\n  width: 100%;\n  -webkit-animation: heng .3s linear;\n          animation: heng .3s linear;\n  border-radius: 1.5px; }\n\n.highlight > a::after {\n  content: '';\n  display: block;\n  background: #E06567;\n  height: 3px;\n  width: 100%;\n  -webkit-animation: heng .3s linear;\n          animation: heng .3s linear;\n  border-radius: 1.5px; }\n\n@-webkit-keyframes heng {\n  0% {\n    width: 0; }\n  100% {\n    width: 100%; } }\n\n@keyframes heng {\n  0% {\n    width: 0; }\n  100% {\n    width: 100%; } }\n\n.submenu {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  white-space: nowrap;\n  display: none;\n  background: white;\n  border-radius: 2px;\n  color: #3d4451;\n  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .5);\n          box-shadow: 0 0 5px rgba(0, 0, 0, .5);\n  -webkit-animation: submenuSlide .3s;\n          animation: submenuSlide .3s; }\n\n.submenu li {\n  padding: 5px 10px; }\n\nli.active .submenu {\n  display: block; }\n\n@-webkit-keyframes submenuSlide {\n  0% {\n    margin-right: 100%; }\n  100% {\n    margin-right: 0%; } }\n\n@keyframes submenuSlide {\n  0% {\n    margin-right: 100%; }\n  100% {\n    margin-right: 0%; } }\n\n.banner {\n  height: 515px;\n  background-image: url(https://github.com/xuziang111/cv/blob/master/rs-cover.jpg?raw=true);\n  background-position: center center;\n  background-size: cover; }\n\n.welcome {\n  background-color: #e6686a;\n  display: inline-block;\n  line-height: 22px;\n  color: white;\n  padding: 4px 16px;\n  position: relative;\n  margin-bottom: 25px; }\n\n.triangle {\n  border: 10px solid transparent;\n  width: 0px;\n  border-top: 0;\n  border-left: 10px solid #e6686a;\n  position: absolute;\n  top: 100%;\n  left: 5px; }\n\n.user {\n  max-width: 940px;\n  margin: 0 auto;\n  background-color: white; }\n\n.picture {\n  float: left; }\n\n.picTop {\n  height: 515px;\n  background-color: rgba(0, 0, 0, .8); }\n\n.text {\n  float: right;\n  margin-left: 65px;\n  width: 450px; }\n\n.picCrad {\n  padding: 50px;\n  margin-top: -300px; }\n\nhr {\n  margin: 20px 0;\n  height: 0px;\n  border-top: 1px solid #DEDEDE; }\n\ndt {\n  float: left;\n  width: 30%;\n  padding: 5px 0;\n  font-weight: bold;\n  display: inline-block; }\n\ndd {\n  float: left;\n  padding: 5px 0;\n  width: 70%;\n  color: #9da0a7;\n  display: inline-block; }\n\n.media {\n  background-color: #E6686A;\n  text-align: center; }\n\n.media svg {\n  width: 30px;\n  height: 30px;\n  fill: white;\n  vertical-align: top; }\n\n.media a {\n  width: 40px;\n  line-height: 30px;\n  padding: 5px 0;\n  border-radius: 50%;\n  margin: 16px;\n  display: inline-block; }\n\n.media > a:hover {\n  background-color: #CF5D5F; }\n\n.dow {\n  text-align: center; }\n\n.button {\n  background-color: #efefef;\n  border: 1px solid #cdcfd1;\n  font-size: 16px;\n  padding: 21px 55px;\n  line-height: 16px;\n  margin: 32px;\n  display: inline-block;\n  border-radius: 2px;\n  -webkit-transition: -webkit-box-shadow 0.2s;\n  transition: -webkit-box-shadow 0.2s;\n  transition: box-shadow 0.2s;\n  transition: box-shadow 0.2s, -webkit-box-shadow 0.2s; }\n\n.button:hover {\n  -webkit-box-shadow: 0px 4px 13px 0px black;\n          box-shadow: 0px 4px 13px 0px black; }\n\n.selfIntroduction {\n  text-align: center;\n  margin: 0 auto; }\n\n.skill {\n  margin: 60px auto;\n  max-width: 940px; }\n\n.skill h2 {\n  color: #3d4451;\n  font-size: 34px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 30px; }\n\n.skill ol {\n  display: block;\n  list-style: none;\n  padding: 42px 50px 10px;\n  background-color: white;\n  -webkit-box-shadow: rgba(0, 0, 0, .5) 0px 1px 5px 0px;\n          box-shadow: rgba(0, 0, 0, .5) 0px 1px 5px 0px; }\n\n.skill ol li {\n  float: left;\n  width: 48%; }\n\n.skill ol > li:nth-child(even) {\n  float: right; }\n\n.progressBar {\n  height: 5px;\n  background-color: #FAE1E1;\n  border-radius: 2px;\n  margin-bottom: 40px;\n  overflow: hidden; }\n\n.progressBar .progress {\n  height: 5px;\n  background-color: #E6686A;\n  border-radius: 2px;\n  width: 70%;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  -webkit-transition: all 1s;\n  transition: all 1s; }\n\n.offset .progress {\n  -webkit-transition: all 1s;\n  transition: all 1s;\n  -webkit-transform: translateX(0);\n          transform: translateX(0); }\n\n.skill > ol > li > h3 {\n  font-size: 14px;\n  line-height: 1.1;\n  padding-bottom: 3px; }\n\n.works {\n  position: relative;\n  text-align: center;\n  max-width: 800px;\n  margin: 0 auto; }\n\n.works h2 {\n  color: #3d4451;\n  font-size: 34px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.works .swiper-button-prev, .works .swiper-button-next {\n  background-color: #EFEFEF;\n  width: 47px;\n  height: 47px;\n  border-radius: 50%; }\n\n.works .swiper-button-prev:hover, .works .swiper-button-next:hover {\n  background-color: grey; }\n\n[data-y].offset {\n  -webkit-animation: slidup .7s;\n          animation: slidup .7s; }\n\n@-webkit-keyframes slidup {\n  0% {\n    -webkit-transform: translateY(200px);\n            transform: translateY(200px); }\n  100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px); } }\n\n@keyframes slidup {\n  0% {\n    -webkit-transform: translateY(200px);\n            transform: translateY(200px); }\n  100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px); } }\n\n.blog h2 {\n  color: #3d4451;\n  font-size: 34px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.swiper-container {\n  width: 600px;\n  height: 400px; }\n\n.leaveMessage {\n  margin: 0 auto;\n  text-align: center; }\n\n.leaveMessage h2 {\n  color: #3d4451;\n  font-size: 34px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 20px; }\n\n#messageList > ol {\n  max-width: 700px;\n  margin: 0 auto;\n  border-top: 1px solid #DDD; }\n\n#messageList > ol > li {\n  padding: 16px;\n  border-bottom: 1px solid #DDD; }\n", ""]);

// exports


/***/ })
/******/ ]);