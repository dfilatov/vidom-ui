/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vidom = __webpack_require__(1);

	var _App = __webpack_require__(3);

	var _App2 = _interopRequireDefault(_App);

	__webpack_require__(230);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _vidom.mount)(document.body, (0, _vidom.node)(_App2.default));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	var AMP_RE = /&/g;
	var QUOT_RE = /"/g;

	function escapeAttr(str) {
	    str = str + '';

	    var i = str.length,
	        escapes = 0; // 1 — escape '&', 2 — escape '"'

	    while (i--) {
	        switch (str[i]) {
	            case '&':
	                escapes |= 1;
	                break;

	            case '"':
	                escapes |= 2;
	                break;
	        }
	    }

	    if (escapes & 1) {
	        str = str.replace(AMP_RE, '&amp;');
	    }

	    if (escapes & 2) {
	        str = str.replace(QUOT_RE, '&quot;');
	    }

	    return str;
	}

	function isInArray(arr, item) {
	    var len = arr.length;
	    var i = 0;

	    while (i < len) {
	        if (arr[i++] == item) {
	            return true;
	        }
	    }

	    return false;
	}

	var DASHERIZE_RE = /([^A-Z]+)([A-Z])/g;

	function dasherize(str) {
	    return str.replace(DASHERIZE_RE, '$1-$2').toLowerCase();
	}

	/** @const */
	var IS_DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

	function setAttr(node, name, val) {
	    if (name === 'type' && node.tagName === 'INPUT') {
	        var value = node.value; // value will be lost in IE if type is changed

	        node.setAttribute(name, '' + val);
	        node.value = value;
	    } else {
	        node.setAttribute(ATTR_NAMES[name] || name, '' + val);
	    }
	}

	function setBooleanAttr(node, name, val) {
	    if (val) {
	        setAttr(node, name, val);
	    } else {
	        removeAttr$1(node, name);
	    }
	}

	function setProp(node, name, val) {
	    node[name] = val;
	}

	function setObjProp(node, name, val) {
	    if (IS_DEBUG) {
	        var typeOfVal = typeof val;

	        if (typeOfVal !== 'object') {
	            throw TypeError('vidom: "' + name + '" attribute value must be an object, not a ' + typeOfVal);
	        }
	    }

	    var prop = node[name];

	    for (var i in val) {
	        prop[i] = val[i] == null ? '' : val[i];
	    }
	}

	function setPropWithCheck(node, name, val) {
	    if (name === 'value' && node.tagName === 'SELECT') {
	        setSelectValue(node, val);
	    } else {
	        node[name] !== val && (node[name] = val);
	    }
	}

	function removeAttr$1(node, name) {
	    node.removeAttribute(ATTR_NAMES[name] || name);
	}

	function removeProp(node, name) {
	    if (name === 'style') {
	        node[name].cssText = '';
	    } else if (name === 'value' && node.tagName === 'SELECT') {
	        removeSelectValue(node);
	    } else {
	        node[name] = getDefaultPropVal(node.tagName, name);
	    }
	}

	function setSelectValue(node, value) {
	    var isMultiple = Array.isArray(value);

	    if (isMultiple) {
	        var options = node.options,
	            len = options.length;

	        var i = 0,
	            optionNode = void 0;

	        while (i < len) {
	            optionNode = options[i++];
	            optionNode.selected = value != null && isInArray(value, optionNode.value);
	        }
	    } else {
	        node.value = value;
	    }
	}

	function removeSelectValue(node) {
	    var options = node.options,
	        len = options.length;
	    var i = 0;

	    while (i < len) {
	        options[i++].selected = false;
	    }
	}

	function attrToString(name, value) {
	    return value === false ? '' : (ATTR_NAMES[name] || name) + (value === true ? '' : '="' + escapeAttr(value) + '"');
	}

	function booleanAttrToString(name, value) {
	    return value ? name : '';
	}

	function stylePropToString(name, value) {
	    var styles = '',
	        i = void 0;

	    for (i in value) {
	        if (value[i] != null) {
	            styles += dasherize(i) + ':' + value[i] + ';';
	        }
	    }

	    return styles ? name + '="' + styles + '"' : styles;
	}

	var defaultPropVals = {};

	function getDefaultPropVal(tag, attrName) {
	    var tagAttrs = defaultPropVals[tag] || (defaultPropVals[tag] = {});

	    return attrName in tagAttrs ? tagAttrs[attrName] : tagAttrs[attrName] = document.createElement(tag)[attrName];
	}

	var ATTR_NAMES = {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv',
	    autoCapitalize: 'autocapitalize',
	    autoComplete: 'autocomplete',
	    autoCorrect: 'autocorrect',
	    autoFocus: 'autofocus',
	    autoPlay: 'autoplay',
	    encType: 'encoding',
	    hrefLang: 'hreflang',
	    radioGroup: 'radiogroup',
	    spellCheck: 'spellcheck',
	    srcDoc: 'srcdoc',
	    srcSet: 'srcset',
	    tabIndex: 'tabindex'
	};
	var DEFAULT_ATTR_CFG = {
	    set: setAttr,
	    remove: removeAttr$1,
	    toString: attrToString
	};
	var BOOLEAN_ATTR_CFG = {
	    set: setBooleanAttr,
	    remove: removeAttr$1,
	    toString: booleanAttrToString
	};
	var DEFAULT_PROP_CFG = {
	    set: setProp,
	    remove: removeProp,
	    toString: attrToString
	};
	var BOOLEAN_PROP_CFG = {
	    set: setProp,
	    remove: removeProp,
	    toString: booleanAttrToString
	};
	var attrsCfg = {
	    checked: BOOLEAN_PROP_CFG,
	    controls: DEFAULT_PROP_CFG,
	    disabled: BOOLEAN_ATTR_CFG,
	    id: DEFAULT_PROP_CFG,
	    ismap: BOOLEAN_ATTR_CFG,
	    loop: DEFAULT_PROP_CFG,
	    multiple: BOOLEAN_PROP_CFG,
	    muted: DEFAULT_PROP_CFG,
	    open: BOOLEAN_ATTR_CFG,
	    readOnly: BOOLEAN_PROP_CFG,
	    selected: BOOLEAN_PROP_CFG,
	    srcDoc: DEFAULT_PROP_CFG,
	    style: {
	        set: setObjProp,
	        remove: removeProp,
	        toString: stylePropToString
	    },
	    value: {
	        set: setPropWithCheck,
	        remove: removeProp,
	        toString: attrToString
	    }
	};

	var domAttrs = function (attrName) {
	    return attrsCfg[attrName] || DEFAULT_ATTR_CFG;
	};

	function append(parent, child) {
	    if (Array.isArray(parent)) {
	        insertBefore(child, parent[1]);
	    } else if (Array.isArray(child)) {
	        var currentChild = child[0],
	            nextChild = void 0;
	        var lastChild = child[1];

	        while (currentChild !== lastChild) {
	            nextChild = currentChild.nextSibling;
	            parent.appendChild(currentChild);
	            currentChild = nextChild;
	        }

	        parent.appendChild(lastChild);
	    } else {
	        parent.appendChild(child);
	    }
	}

	function remove(child) {
	    if (Array.isArray(child)) {
	        var currentChild = child[0],
	            nextChild = void 0;
	        var lastChild = child[1],
	            parent = lastChild.parentNode;

	        while (currentChild !== lastChild) {
	            nextChild = currentChild.nextSibling;
	            parent.removeChild(currentChild);
	            currentChild = nextChild;
	        }

	        parent.removeChild(lastChild);
	    } else {
	        child.parentNode.removeChild(child);
	    }
	}

	function insertBefore(child, beforeChild) {
	    Array.isArray(beforeChild) && (beforeChild = beforeChild[0]);

	    if (Array.isArray(child)) {
	        var currentChild = child[0],
	            nextChild = void 0;
	        var lastChild = child[1],
	            parent = lastChild.parentNode;

	        while (currentChild !== lastChild) {
	            nextChild = currentChild.nextSibling;
	            parent.insertBefore(currentChild, beforeChild);
	            currentChild = nextChild;
	        }

	        parent.insertBefore(lastChild, beforeChild);
	    } else {
	        beforeChild.parentNode.insertBefore(child, beforeChild);
	    }
	}

	function move(child, toChild, after) {
	    if (after) {
	        Array.isArray(toChild) && (toChild = toChild[1]);
	        var nextSibling = toChild.nextSibling;

	        nextSibling ? insertBefore(child, nextSibling) : append(toChild.parentNode, child);
	    } else {
	        insertBefore(child, toChild);
	    }
	}

	function replace$1(old, replacement) {
	    if (Array.isArray(old)) {
	        insertBefore(replacement, old);
	        remove(old);
	    } else {
	        old.parentNode.replaceChild(replacement, old);
	    }
	}

	function removeChildren$1(from) {
	    if (Array.isArray(from)) {
	        var currentChild = from[0].nextSibling,
	            nextChild = void 0;
	        var lastChild = from[1],
	            parent = lastChild.parentNode;

	        while (currentChild !== lastChild) {
	            nextChild = currentChild.nextSibling;
	            parent.removeChild(currentChild);
	            currentChild = nextChild;
	        }
	    } else {
	        from.textContent = '';
	    }
	}

	function updateText$1(node, text, escape) {
	    if (Array.isArray(node)) {
	        var beforeChild = node[1],
	            previousChild = beforeChild.previousSibling;

	        if (previousChild === node[0]) {
	            beforeChild.parentNode.insertBefore(document.createTextNode(text), beforeChild);
	        } else {
	            previousChild.nodeValue = text;
	        }
	    } else if (escape) {
	        var firstChild = node.firstChild;

	        firstChild ? firstChild.nodeValue = text : node.textContent = text;
	    } else {
	        node.innerHTML = text;
	    }
	}

	function removeText$1(from) {
	    if (Array.isArray(from)) {
	        var child = from[0].nextSibling;

	        child.parentNode.removeChild(child);
	    } else {
	        from.textContent = '';
	    }
	}

	var domOps = {
	    append: append,
	    remove: remove,
	    insertBefore: insertBefore,
	    move: move,
	    replace: replace$1,
	    removeChildren: removeChildren$1,
	    updateText: updateText$1,
	    removeText: removeText$1
	};

	function isEventSupported(type) {
	    var eventProp = 'on' + type;

	    if (eventProp in document) {
	        return true;
	    }

	    var domNode = document.createElement('div');

	    domNode.setAttribute(eventProp, 'return;');
	    if (typeof domNode[eventProp] === 'function') {
	        return true;
	    }

	    return type === 'wheel' && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true && document.implementation.hasFeature('Events.wheel', '3.0');
	}

	function SyntheticEvent(type, nativeEvent) {
	    this.type = type;
	    this.target = nativeEvent.target;
	    this.nativeEvent = nativeEvent;

	    this._isPropagationStopped = false;
	    this._isDefaultPrevented = false;
	    this._isPersisted = false;
	}

	SyntheticEvent.prototype = {
	    stopPropagation: function () {
	        this._isPropagationStopped = true;

	        var nativeEvent = this.nativeEvent;

	        nativeEvent.stopPropagation ? nativeEvent.stopPropagation() : nativeEvent.cancelBubble = true;
	    },
	    isPropagationStopped: function () {
	        return this._isPropagationStopped;
	    },
	    preventDefault: function () {
	        this._isDefaultPrevented = true;

	        var nativeEvent = this.nativeEvent;

	        nativeEvent.preventDefault ? nativeEvent.preventDefault() : nativeEvent.returnValue = false;
	    },
	    isDefaultPrevented: function () {
	        return this._isDefaultPrevented;
	    },
	    persist: function () {
	        this._isPersisted = true;
	    }
	};

	var eventsPool = {};

	function createSyntheticEvent(type, nativeEvent) {
	    var pooledEvent = eventsPool[type];

	    if (pooledEvent && !pooledEvent._isPersisted) {
	        pooledEvent.target = nativeEvent.target;
	        pooledEvent.nativeEvent = nativeEvent;
	        pooledEvent._isPropagationStopped = false;
	        pooledEvent._isDefaultPrevented = false;

	        return pooledEvent;
	    }

	    return eventsPool[type] = new SyntheticEvent(type, nativeEvent);
	}

	var ID_PROP = '__vidom__id__';
	var counter = 1;

	function getDomNodeId(node, onlyGet) {
	    return node[ID_PROP] || (onlyGet ? null : node[ID_PROP] = counter++);
	}

	var SimpleMap = void 0;

	if (typeof Map === 'undefined') {
	    SimpleMap = function () {
	        this._storage = {};
	    };

	    SimpleMap.prototype = {
	        has: function (key) {
	            return key in this._storage;
	        },
	        get: function (key) {
	            return this._storage[key];
	        },
	        set: function (key, value) {
	            this._storage[key] = value;
	            return this;
	        },
	        delete: function (key) {
	            return delete this._storage[key];
	        },
	        forEach: function (callback, thisArg) {
	            var storage = this._storage;

	            for (var key in storage) {
	                callback.call(thisArg, storage[key], key, this);
	            }
	        }
	    };
	} else {
	    SimpleMap = Map;
	}

	var SimpleMap$1 = SimpleMap;

	var ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;

	var isTrident = ua.indexOf('Trident') > -1;
	var isEdge = ua.indexOf('Edge') > -1;
	var isIos = /iPad|iPhone|iPod/.test(ua) && typeof MSStream === 'undefined';

	var MOUSE_NATIVE_EVENTS = ['click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
	var BUBBLEABLE_NATIVE_EVENTS = ['blur', 'change', 'contextmenu', 'copy', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'focus', 'input', 'keydown', 'keypress', 'keyup', 'paste', 'submit', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'wheel'];
	var NON_BUBBLEABLE_NATIVE_EVENTS = ['canplay', 'canplaythrough', 'complete', 'durationchange', 'emptied', 'ended', 'error', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'progress', 'ratechange', 'scroll', 'seeked', 'seeking', 'select', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];

	if (isIos) {
	    NON_BUBBLEABLE_NATIVE_EVENTS = [].concat(NON_BUBBLEABLE_NATIVE_EVENTS, MOUSE_NATIVE_EVENTS);
	} else {
	    BUBBLEABLE_NATIVE_EVENTS = [].concat(BUBBLEABLE_NATIVE_EVENTS, MOUSE_NATIVE_EVENTS);
	}

	var listenersStorage = new SimpleMap$1();
	var eventsCfg = {};
	var areListenersEnabled = true;

	function globalEventListener(e) {
	    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e.type;

	    if (!areListenersEnabled) {
	        return;
	    }

	    var target = e.target,
	        listenersCount = eventsCfg[type].listenersCount,
	        listeners = void 0,
	        listener = void 0,
	        domNodeId = void 0,
	        syntheticEvent = void 0;

	    while (listenersCount && target && target !== document) {
	        // need to check target for detached dom
	        if (domNodeId = getDomNodeId(target, true)) {
	            listeners = listenersStorage.get(domNodeId);
	            if (listeners && (listener = listeners[type])) {
	                listener(syntheticEvent || (syntheticEvent = createSyntheticEvent(type, e)));
	                if (! --listenersCount || syntheticEvent.isPropagationStopped()) {
	                    return;
	                }
	            }
	        }

	        target = target.parentNode;
	    }
	}

	function eventListener(e) {
	    if (areListenersEnabled) {
	        listenersStorage.get(getDomNodeId(e.currentTarget))[e.type](createSyntheticEvent(e.type, e));
	    }
	}

	if (typeof document !== 'undefined') {
	    (function () {
	        var focusEvents = {
	            focus: 'focusin',
	            blur: 'focusout'
	        };

	        var i = 0,
	            type = void 0;

	        while (i < BUBBLEABLE_NATIVE_EVENTS.length) {
	            type = BUBBLEABLE_NATIVE_EVENTS[i++];
	            eventsCfg[type] = {
	                type: type,
	                bubbles: true,
	                listenersCount: 0,
	                set: false,
	                setup: focusEvents[type] ? isEventSupported(focusEvents[type]) ? function () {
	                    var type = this.type;
	                    document.addEventListener(focusEvents[type], function (e) {
	                        globalEventListener(e, type);
	                    });
	                } : function () {
	                    document.addEventListener(this.type, globalEventListener, true);
	                } : null
	            };
	        }

	        i = 0;
	        while (i < NON_BUBBLEABLE_NATIVE_EVENTS.length) {
	            eventsCfg[NON_BUBBLEABLE_NATIVE_EVENTS[i++]] = {
	                type: type,
	                bubbles: false,
	                set: false
	            };
	        }
	    })();
	}

	function addListener(domNode, type, listener) {
	    var cfg = eventsCfg[type];

	    if (cfg) {
	        if (!cfg.set) {
	            cfg.setup ? cfg.setup() : cfg.bubbles && document.addEventListener(type, globalEventListener, false);
	            cfg.set = true;
	        }

	        var domNodeId = getDomNodeId(domNode);
	        var listeners = listenersStorage.get(domNodeId);

	        if (!listeners) {
	            listenersStorage.set(domNodeId, listeners = {});
	        }

	        if (!listeners[type]) {
	            cfg.bubbles ? ++cfg.listenersCount : domNode.addEventListener(type, eventListener, false);
	        }

	        listeners[type] = listener;
	    }
	}

	function doRemoveListener(domNode, type) {
	    var cfg = eventsCfg[type];

	    if (cfg) {
	        if (cfg.bubbles) {
	            --cfg.listenersCount;
	        } else {
	            domNode.removeEventListener(type, eventListener);
	        }
	    }
	}

	function removeListener(domNode, type) {
	    var domNodeId = getDomNodeId(domNode, true);

	    if (domNodeId) {
	        var listeners = listenersStorage.get(domNodeId);

	        if (listeners && listeners[type]) {
	            listeners[type] = null;
	            doRemoveListener(domNode, type);
	        }
	    }
	}

	function removeListeners(domNode) {
	    var domNodeId = getDomNodeId(domNode, true);

	    if (domNodeId) {
	        var listeners = listenersStorage.get(domNodeId);

	        if (listeners) {
	            for (var type in listeners) {
	                if (listeners[type]) {
	                    doRemoveListener(domNode, type);
	                }
	            }

	            listenersStorage.delete(domNodeId);
	        }
	    }
	}

	function disableListeners() {
	    areListenersEnabled = false;
	}

	function enableListeners() {
	    areListenersEnabled = true;
	}

	var DEFAULT_NS_URI = 'http://www.w3.org/1999/xhtml';

	function getNs(domNode) {
	    return Array.isArray(domNode) ? getParentNs(domNode) : domNode.namespaceURI === DEFAULT_NS_URI ? null : domNode.namespaceURI;
	}

	function getParentNs(domNode) {
	    return getNs((Array.isArray(domNode) ? domNode[domNode.length - 1] : domNode).parentNode);
	}

	var ATTRS_TO_EVENTS = {
	    onBlur: 'blur',
	    onCanPlay: 'canplay',
	    onCanPlayThrough: 'canplaythrough',
	    onChange: 'change',
	    onClick: 'click',
	    onComplete: 'complete',
	    onContextMenu: 'contextmenu',
	    onCopy: 'copy',
	    onCut: 'cut',
	    onDblClick: 'dblclick',
	    onDrag: 'drag',
	    onDragEnd: 'dragend',
	    onDragEnter: 'dragenter',
	    onDragLeave: 'dragleave',
	    onDragOver: 'dragover',
	    onDragStart: 'dragstart',
	    onDrop: 'drop',
	    onDurationChange: 'durationchange',
	    onEmptied: 'emptied',
	    onEnded: 'ended',
	    onError: 'error',
	    onFocus: 'focus',
	    onInput: 'input',
	    onKeyDown: 'keydown',
	    onKeyPress: 'keypress',
	    onKeyUp: 'keyup',
	    onLoad: 'load',
	    onLoadedData: 'loadeddata',
	    onLoadedMetadata: 'loadedmetadata',
	    onLoadStart: 'loadstart',
	    onMouseDown: 'mousedown',
	    onMouseEnter: 'mouseenter',
	    onMouseLeave: 'mouseleave',
	    onMouseMove: 'mousemove',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onPaste: 'paste',
	    onPause: 'pause',
	    onPlay: 'play',
	    onPlaying: 'playing',
	    onProgress: 'progress',
	    onRateChange: 'ratechange',
	    onScroll: 'scroll',
	    onSeeked: 'seeked',
	    onSeeking: 'seeking',
	    onSelect: 'select',
	    onStalled: 'stalled',
	    onSubmit: 'submit',
	    onSuspend: 'suspend',
	    onTimeUpdate: 'timeupdate',
	    onTouchCancel: 'touchcancel',
	    onTouchEnd: 'touchend',
	    onTouchMove: 'touchmove',
	    onTouchStart: 'touchstart',
	    onVolumeChange: 'volumechange',
	    onWaiting: 'waiting',
	    onWheel: 'wheel'
	};

	function appendChild(parentNode, childNode) {
	    var parentDomNode = parentNode.getDomNode();

	    domOps.append(parentDomNode, childNode.renderToDom(getNs(parentDomNode)));
	    childNode.mount();
	}

	function insertChild(childNode, beforeChildNode) {
	    var beforeChildDomNode = beforeChildNode.getDomNode();

	    domOps.insertBefore(childNode.renderToDom(getParentNs(beforeChildDomNode)), beforeChildDomNode);
	    childNode.mount();
	}

	function removeChild(childNode) {
	    var childDomNode = childNode.getDomNode();

	    childNode.unmount();
	    domOps.remove(childDomNode);
	}

	function moveChild(childNode, toChildNode, after) {
	    var activeDomNode = document.activeElement;

	    disableListeners();

	    domOps.move(childNode.getDomNode(), toChildNode.getDomNode(), after);

	    if (document.activeElement !== activeDomNode) {
	        activeDomNode.focus();
	    }

	    enableListeners();
	}

	function removeChildren(parentNode) {
	    var parentDomNode = parentNode.getDomNode(),
	        childNodes = parentNode.children,
	        len = childNodes.length;

	    var j = 0;

	    while (j < len) {
	        childNodes[j++].unmount();
	    }

	    domOps.removeChildren(parentDomNode);
	}

	function replace(oldNode, newNode) {
	    var oldDomNode = oldNode.getDomNode();

	    oldNode.unmount();
	    domOps.replace(oldDomNode, newNode.renderToDom(getParentNs(oldDomNode)));
	    newNode.mount();
	}

	function updateAttr(node, attrName, attrVal) {
	    var domNode = node.getDomNode();

	    ATTRS_TO_EVENTS[attrName] ? addListener(domNode, ATTRS_TO_EVENTS[attrName], attrVal) : domAttrs(attrName).set(domNode, attrName, attrVal);
	}

	function removeAttr(node, attrName) {
	    var domNode = node.getDomNode();

	    ATTRS_TO_EVENTS[attrName] ? removeListener(domNode, ATTRS_TO_EVENTS[attrName]) : domAttrs(attrName).remove(domNode, attrName);
	}

	function updateText(node, text, escape) {
	    domOps.updateText(node.getDomNode(), text, escape);
	}

	function removeText(node) {
	    domOps.removeText(node.getDomNode());
	}

	var patchOps = {
	    appendChild: appendChild,
	    insertChild: insertChild,
	    removeChild: removeChild,
	    moveChild: moveChild,
	    removeChildren: removeChildren,
	    replace: replace,
	    updateAttr: updateAttr,
	    removeAttr: removeAttr,
	    updateText: updateText,
	    removeText: removeText
	};

	function checkReuse(node, name) {
	    if (node.getDomNode()) {
	        throw Error("vidom: Detected unexpected attempt to reuse the same node \"" + name + "\".");
	    }
	}

	var elementProtos = {};

	function createElement(tag, ns) {
	    var baseElement = void 0;

	    if (ns) {
	        var key = ns + ':' + tag;

	        baseElement = elementProtos[key] || (elementProtos[key] = document.createElementNS(ns, tag));
	    } else {
	        baseElement = elementProtos[tag] || (elementProtos[tag] = tag === '!' ? document.createComment('') : document.createElement(tag));
	    }

	    return baseElement.cloneNode();
	}

	function patchChildren(nodeA, nodeB) {
	    var childrenA = nodeA.children,
	        childrenB = nodeB.children,
	        childrenALen = childrenA.length,
	        childrenBLen = childrenB.length;

	    if (childrenALen === 1 && childrenBLen === 1) {
	        childrenA[0].patch(childrenB[0]);
	        return;
	    }

	    var leftIdxA = 0,
	        rightIdxA = childrenALen - 1,
	        leftChildA = childrenA[leftIdxA],
	        leftChildAKey = leftChildA.key,
	        rightChildA = childrenA[rightIdxA],
	        rightChildAKey = rightChildA.key,
	        leftIdxB = 0,
	        rightIdxB = childrenBLen - 1,
	        leftChildB = childrenB[leftIdxB],
	        leftChildBKey = leftChildB.key,
	        rightChildB = childrenB[rightIdxB],
	        rightChildBKey = rightChildB.key,
	        updateLeftIdxA = false,
	        updateRightIdxA = false,
	        updateLeftIdxB = false,
	        updateRightIdxB = false,
	        childrenAKeys = void 0,
	        foundAChildIdx = void 0,
	        foundAChild = void 0;
	    var childrenAIndicesToSkip = {};

	    while (leftIdxA <= rightIdxA && leftIdxB <= rightIdxB) {
	        if (childrenAIndicesToSkip[leftIdxA]) {
	            updateLeftIdxA = true;
	        } else if (childrenAIndicesToSkip[rightIdxA]) {
	            updateRightIdxA = true;
	        } else if (leftChildAKey === leftChildBKey) {
	            leftChildA.patch(leftChildB);
	            updateLeftIdxA = true;
	            updateLeftIdxB = true;
	        } else if (rightChildAKey === rightChildBKey) {
	            rightChildA.patch(rightChildB);
	            updateRightIdxA = true;
	            updateRightIdxB = true;
	        } else if (leftChildAKey != null && leftChildAKey === rightChildBKey) {
	            patchOps.moveChild(leftChildA, rightChildA, true);
	            leftChildA.patch(rightChildB);
	            updateLeftIdxA = true;
	            updateRightIdxB = true;
	        } else if (rightChildAKey != null && rightChildAKey === leftChildBKey) {
	            patchOps.moveChild(rightChildA, leftChildA, false);
	            rightChildA.patch(leftChildB);
	            updateRightIdxA = true;
	            updateLeftIdxB = true;
	        } else if (leftChildAKey != null && leftChildBKey == null) {
	            patchOps.insertChild(leftChildB, leftChildA);
	            updateLeftIdxB = true;
	        } else if (leftChildAKey == null && leftChildBKey != null) {
	            patchOps.removeChild(leftChildA);
	            updateLeftIdxA = true;
	        } else {
	            childrenAKeys || (childrenAKeys = buildKeys(childrenA, leftIdxA, rightIdxA));
	            if ((foundAChildIdx = childrenAKeys[leftChildBKey]) == null) {
	                patchOps.insertChild(leftChildB, leftChildA);
	            } else {
	                foundAChild = childrenA[foundAChildIdx];
	                childrenAIndicesToSkip[foundAChildIdx] = true;
	                patchOps.moveChild(foundAChild, leftChildA, false);
	                foundAChild.patch(leftChildB);
	            }
	            updateLeftIdxB = true;
	        }

	        if (updateLeftIdxA) {
	            updateLeftIdxA = false;
	            if (++leftIdxA <= rightIdxA) {
	                leftChildA = childrenA[leftIdxA];
	                leftChildAKey = leftChildA.key;
	            }
	        }

	        if (updateRightIdxA) {
	            updateRightIdxA = false;
	            if (--rightIdxA >= leftIdxA) {
	                rightChildA = childrenA[rightIdxA];
	                rightChildAKey = rightChildA.key;
	            }
	        }

	        if (updateLeftIdxB) {
	            updateLeftIdxB = false;
	            if (++leftIdxB <= rightIdxB) {
	                leftChildB = childrenB[leftIdxB];
	                leftChildBKey = leftChildB.key;
	            }
	        }

	        if (updateRightIdxB) {
	            updateRightIdxB = false;
	            if (--rightIdxB >= leftIdxB) {
	                rightChildB = childrenB[rightIdxB];
	                rightChildBKey = rightChildB.key;
	            }
	        }
	    }

	    while (leftIdxA <= rightIdxA) {
	        if (!childrenAIndicesToSkip[leftIdxA]) {
	            patchOps.removeChild(childrenA[leftIdxA]);
	        }
	        ++leftIdxA;
	    }

	    while (leftIdxB <= rightIdxB) {
	        rightIdxB < childrenBLen - 1 ? patchOps.insertChild(childrenB[leftIdxB], childrenB[rightIdxB + 1]) : patchOps.appendChild(nodeB, childrenB[leftIdxB]);
	        ++leftIdxB;
	    }
	}

	function buildKeys(children, idxFrom, idxTo) {
	    var res = {};
	    var child = void 0;

	    while (idxFrom < idxTo) {
	        child = children[idxFrom];
	        child.key != null && (res[child.key] = idxFrom);
	        ++idxFrom;
	    }

	    return res;
	}

	var obj = {};

	if (IS_DEBUG) {
	    Object.freeze(obj);
	}

	function noOp() {}

	var globalConsole = typeof console == 'undefined' ? null : console;
	var consoleWrapper = {};
	var PREFIXES = {
	    log: '',
	    info: '',
	    warn: 'Warning!',
	    error: 'Error!'
	};

	['log', 'info', 'warn', 'error'].forEach(function (name) {
	    consoleWrapper[name] = globalConsole ? globalConsole[name] ? function (arg1, arg2, arg3, arg4, arg5) {
	        // IE9: console methods aren't functions
	        var arg0 = PREFIXES[name];
	        switch (arguments.length) {
	            case 1:
	                globalConsole[name](arg0, arg1);
	                break;

	            case 2:
	                globalConsole[name](arg0, arg1, arg2);
	                break;

	            case 3:
	                globalConsole[name](arg0, arg1, arg2, arg3);
	                break;

	            case 4:
	                globalConsole[name](arg0, arg1, arg2, arg3, arg4);
	                break;

	            case 5:
	                globalConsole[name](arg0, arg1, arg2, arg3, arg4, arg5);
	                break;
	        }
	    } : function () {
	        globalConsole.log.apply(globalConsole, arguments);
	    } : noOp;
	});

	function restrictObjProp(obj, prop) {
	    var hiddenProp = "__" + prop + "__";

	    Object.defineProperty(obj, prop, {
	        get: function () {
	            return obj[hiddenProp];
	        },
	        set: function (value) {
	            if (obj.__isFrozen) {
	                throw TypeError("vidom: " + prop + " is readonly");
	            }

	            obj[hiddenProp] = value;
	        }
	    });
	}

	var NODE_TYPE_TOP = 1;
	var NODE_TYPE_TAG = 2;
	var NODE_TYPE_TEXT = 3;
	var NODE_TYPE_FRAGMENT = 4;
	var NODE_TYPE_COMPONENT = 5;
	var NODE_TYPE_FUNCTION_COMPONENT = 6;

	var KEY_SET = 1;
	var REF_SET = 2;

	function setKey(key) {
	    if (IS_DEBUG) {
	        if (this._sets & KEY_SET) {
	            console.warn('Key is already set and shouldn\'t be set again');
	        }

	        this.__isFrozen = false;
	    }

	    this.key = key;

	    if (IS_DEBUG) {
	        this._sets |= KEY_SET;
	        this.__isFrozen = true;
	    }

	    return this;
	}

	function setRef(ref) {
	    if (IS_DEBUG) {
	        if (this._sets & REF_SET) {
	            console.warn('Ref is already set and shouldn\'t be set again.');
	        }
	    }

	    this._ref = ref;

	    if (IS_DEBUG) {
	        this._sets |= REF_SET;
	    }

	    return this;
	}

	var CHILDREN_SET$1 = 8;

	function FragmentNode() {
	    if (IS_DEBUG) {
	        restrictObjProp(this, 'type');
	        restrictObjProp(this, 'key');
	        restrictObjProp(this, 'children');

	        this.__isFrozen = false;
	    }

	    this.type = NODE_TYPE_FRAGMENT;
	    this.key = null;
	    this.children = null;

	    if (IS_DEBUG) {
	        this.__isFrozen = true;
	        this._sets = 0;
	    }

	    this._domNode = null;
	    this._ctx = obj;
	}

	FragmentNode.prototype = {
	    getDomNode: function () {
	        return this._domNode;
	    },

	    setKey: setKey,

	    setChildren: function (children) {
	        if (IS_DEBUG) {
	            if (this._sets & CHILDREN_SET$1) {
	                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.children = processChildren$1(children);

	        if (IS_DEBUG) {
	            if (Array.isArray(this.children)) {
	                Object.freeze(this.children);
	            }

	            this._sets |= CHILDREN_SET$1;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setCtx: function (ctx) {
	        if (ctx !== obj) {
	            this._ctx = ctx;

	            var children = this.children;

	            if (children) {
	                var len = children.length;
	                var i = 0;

	                while (i < len) {
	                    children[i++].setCtx(ctx);
	                }
	            }
	        }

	        return this;
	    },
	    renderToDom: function (parentNs) {
	        if (IS_DEBUG) {
	            checkReuse(this, 'fragment');
	        }

	        var children = this.children,
	            domNode = [createElement('!'), createElement('!')],
	            domFragment = document.createDocumentFragment();

	        domFragment.appendChild(domNode[0]);

	        if (children) {
	            var len = children.length;
	            var i = 0;

	            while (i < len) {
	                domFragment.appendChild(children[i++].renderToDom(parentNs));
	            }
	        }

	        domFragment.appendChild(domNode[1]);

	        this._domNode = domNode;

	        return domFragment;
	    },
	    renderToString: function () {
	        var children = this.children;

	        var res = '<!---->';

	        if (children) {
	            var i = children.length - 1;

	            while (i >= 0) {
	                res = children[i--].renderToString() + res;
	            }
	        }

	        return '<!---->' + res;
	    },
	    adoptDom: function (domNodes, domIdx) {
	        if (IS_DEBUG) {
	            checkReuse(this, 'fragment');
	        }

	        var domNode = [domNodes[domIdx++]],
	            children = this.children;

	        if (children) {
	            var len = children.length;
	            var i = 0;

	            while (i < len) {
	                domIdx = children[i++].adoptDom(domNodes, domIdx);
	            }
	        }

	        domNode.push(domNodes[domIdx]);

	        this._domNode = domNode;

	        return domIdx + 1;
	    },
	    mount: function () {
	        var children = this.children;

	        if (children) {
	            var i = 0;
	            var len = children.length;

	            while (i < len) {
	                children[i++].mount();
	            }
	        }
	    },
	    unmount: function () {
	        var children = this.children;

	        if (children) {
	            var len = children.length;
	            var i = 0;

	            while (i < len) {
	                children[i++].unmount();
	            }
	        }
	    },
	    clone: function () {
	        var res = new FragmentNode();

	        if (IS_DEBUG) {
	            res.__isFrozen = false;
	        }

	        res.key = this.key;
	        res.children = this.children;

	        if (IS_DEBUG) {
	            res.__isFrozen = true;
	        }

	        res._ctx = this._ctx;

	        return res;
	    },
	    patch: function (node) {
	        if (this === node) {
	            this._patchChildren(node);
	        } else if (this.type === node.type) {
	            node._domNode = this._domNode;
	            this._patchChildren(node);
	        } else {
	            patchOps.replace(this, node);
	        }
	    },
	    _patchChildren: function (node) {
	        var childrenA = this.children,
	            childrenB = node.children;

	        if (!childrenA && !childrenB) {
	            return;
	        }

	        if (!childrenB || !childrenB.length) {
	            if (childrenA && childrenA.length) {
	                patchOps.removeChildren(this);
	            }

	            return;
	        }

	        if (!childrenA || !childrenA.length) {
	            var childrenBLen = childrenB.length;
	            var iB = 0;

	            while (iB < childrenBLen) {
	                patchOps.appendChild(node, childrenB[iB++]);
	            }

	            return;
	        }

	        patchChildren(this, node);
	    }
	};

	if (IS_DEBUG) {
	    FragmentNode.prototype.setRef = function () {
	        throw Error('vidom: Fragment nodes don\'t support refs.');
	    };
	}

	function processChildren$1(children) {
	    if (children == null) {
	        return null;
	    }

	    var res = Array.isArray(children) ? children : [children];

	    if (IS_DEBUG) {
	        checkChildren(res);
	    }

	    return res;
	}

	function merge(source1, source2) {
	    var res = {};

	    for (var key in source1) {
	        res[key] = source1[key];
	    }

	    for (var _key in source2) {
	        res[_key] = source2[_key];
	    }

	    return res;
	}

	var ATTRS_SET$1 = 4;
	var CHILDREN_SET$2 = 8;

	function FunctionComponentNode(component) {
	    if (IS_DEBUG) {
	        restrictObjProp(this, 'type');
	        restrictObjProp(this, 'key');
	        restrictObjProp(this, 'attrs');
	        restrictObjProp(this, 'children');

	        this.__isFrozen = false;
	    }

	    this.type = NODE_TYPE_FUNCTION_COMPONENT;
	    this.key = null;
	    this.attrs = obj;
	    this.children = null;

	    if (IS_DEBUG) {
	        this.__isFrozen = true;
	        this._sets = 0;
	    }

	    this._component = component;
	    this._rootNode = null;
	    this._ctx = obj;
	}

	FunctionComponentNode.prototype = {
	    getDomNode: function () {
	        return this._rootNode && this._rootNode.getDomNode();
	    },

	    setKey: setKey,

	    setAttrs: function (attrs) {
	        if (IS_DEBUG) {
	            if (this._sets & ATTRS_SET$1) {
	                consoleWrapper.warn('Attrs are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.attrs = this.attrs === obj ? attrs : merge(this.attrs, attrs);

	        if (IS_DEBUG) {
	            Object.freeze(this.attrs);
	            this._sets |= ATTRS_SET$1;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setChildren: function (children) {
	        if (IS_DEBUG) {
	            if (this._sets & CHILDREN_SET$2) {
	                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.children = children;

	        if (IS_DEBUG) {
	            this._sets |= CHILDREN_SET$2;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setCtx: function (ctx) {
	        this._ctx = ctx;
	        return this;
	    },
	    renderToDom: function (parentNs) {
	        if (IS_DEBUG) {
	            checkReuse(this, this._component.name || 'Anonymous');
	        }

	        return this._getRootNode().renderToDom(parentNs);
	    },
	    renderToString: function () {
	        return this._getRootNode().renderToString();
	    },
	    adoptDom: function (domNode, domIdx) {
	        if (IS_DEBUG) {
	            checkReuse(this, this._component.name || 'Anonymous');
	        }

	        return this._getRootNode().adoptDom(domNode, domIdx);
	    },
	    mount: function () {
	        this._getRootNode().mount();
	    },
	    unmount: function () {
	        if (this._rootNode) {
	            this._rootNode.unmount();
	            this._rootNode = null;
	        }
	    },
	    clone: function () {
	        var res = new FunctionComponentNode(this._component);

	        if (IS_DEBUG) {
	            res.__isFrozen = false;
	        }

	        res.key = this.key;
	        res.attrs = this.attrs;
	        res.children = this.children;

	        if (IS_DEBUG) {
	            res.__isFrozen = true;
	        }

	        res._ctx = this._ctx;

	        return res;
	    },
	    patch: function (node) {
	        if (this === node) {
	            var prevRootNode = this._getRootNode();

	            this._rootNode = null;
	            prevRootNode.patch(this._getRootNode());
	        } else if (this.type === node.type && this._component === node._component) {
	            this._getRootNode().patch(node._getRootNode());
	            this._rootNode = null;
	        } else {
	            patchOps.replace(this, node);
	            this._rootNode = null;
	        }
	    },
	    _getRootNode: function () {
	        if (this._rootNode) {
	            return this._rootNode;
	        }

	        var rootNode = this._component(this.attrs, this.children, this._ctx) || createNode('!');

	        if (IS_DEBUG) {
	            if (typeof rootNode !== 'object' || Array.isArray(rootNode)) {
	                throw Error('vidom: Function component must return a single node on the top level.');
	            }
	        }

	        rootNode.setCtx(this._ctx);

	        return this._rootNode = rootNode;
	    }
	};

	if (IS_DEBUG) {
	    FunctionComponentNode.prototype.setRef = function () {
	        throw Error('vidom: Function component nodes don\'t support refs.');
	    };
	}

	var CHILDREN_SET$3 = 8;

	function TextNode() {
	    if (IS_DEBUG) {
	        restrictObjProp(this, 'type');
	        restrictObjProp(this, 'key');
	        restrictObjProp(this, 'children');

	        this.__isFrozen = false;
	    }

	    this.type = NODE_TYPE_TEXT;
	    this.key = null;
	    this.children = null;

	    if (IS_DEBUG) {
	        this.__isFrozen = true;
	    }

	    this._domNode = null;
	}

	TextNode.prototype = {
	    getDomNode: function () {
	        return this._domNode;
	    },

	    setKey: setKey,

	    setChildren: function (children) {
	        if (IS_DEBUG) {
	            if (this._sets & CHILDREN_SET$3) {
	                console.warn('Children are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.children = processChildren$2(children);

	        if (IS_DEBUG) {
	            this._sets |= CHILDREN_SET$3;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setCtx: function () {
	        return this;
	    },
	    renderToDom: function () {
	        if (IS_DEBUG) {
	            checkReuse(this, 'text');
	        }

	        var domFragment = document.createDocumentFragment(),
	            domNode = [createElement('!'), createElement('!')],
	            children = this.children;

	        domFragment.appendChild(domNode[0]);

	        if (children) {
	            domFragment.appendChild(document.createTextNode(children));
	        }

	        domFragment.appendChild(domNode[1]);

	        this._domNode = domNode;

	        return domFragment;
	    },
	    renderToString: function () {
	        return '<!---->' + (this.children || '') + '<!---->';
	    },
	    adoptDom: function (domNodes, domIdx) {
	        if (IS_DEBUG) {
	            checkReuse(this, 'text');
	        }

	        var domNode = [domNodes[domIdx++]];

	        if (this.children) {
	            domIdx++;
	        }

	        domNode.push(domNodes[domIdx++]);

	        this._domNode = domNode;

	        return domIdx;
	    },

	    mount: noOp,

	    unmount: noOp,

	    clone: function () {
	        var res = new TextNode();

	        if (IS_DEBUG) {
	            res.__isFrozen = false;
	        }

	        res.key = this.key;
	        res.children = this.children;

	        if (IS_DEBUG) {
	            res.__isFrozen = true;
	        }

	        return res;
	    },
	    patch: function (node) {
	        if (this !== node) {
	            if (this.type === node.type) {
	                node._domNode = this._domNode;
	                this._patchChildren(node);
	            } else {
	                patchOps.replace(this, node);
	            }
	        }
	    },
	    _patchChildren: function (node) {
	        var childrenA = this.children,
	            childrenB = node.children;

	        if (childrenA !== childrenB) {
	            if (childrenB) {
	                patchOps.updateText(this, childrenB, false);
	            } else if (childrenA) {
	                patchOps.removeText(this);
	            }
	        }
	    }
	};

	if (IS_DEBUG) {
	    TextNode.prototype.setRef = function () {
	        throw Error('vidom: Text nodes don\'t support refs.');
	    };
	}

	function processChildren$2(children) {
	    return children == null || typeof children === 'string' ? children : children.toString();
	}

	var raf = typeof window !== 'undefined' && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) || function (callback) {
	    setTimeout(callback, 1000 / 60);
	};

	var batch = [];

	function applyBatch() {
	    var i = 0;

	    while (i < batch.length) {
	        batch[i++]();
	    }

	    batch = [];
	}

	function rafBatch(fn) {
	    batch.push(fn) === 1 && raf(applyBatch);
	}

	function Emitter() {
	    this._listeners = {};
	}

	Emitter.prototype = {
	    on: function (event, fn) {
	        var fnCtx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	        (this._listeners[event] || (this._listeners[event] = [])).push({ fn: fn, fnCtx: fnCtx });

	        return this;
	    },
	    off: function (event, fn) {
	        var fnCtx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	        var eventListeners = this._listeners[event];

	        if (eventListeners) {
	            var i = 0,
	                eventListener = void 0;

	            while (i < eventListeners.length) {
	                eventListener = eventListeners[i];
	                if (eventListener.fn === fn && eventListener.fnCtx === fnCtx) {
	                    eventListeners.splice(i, 1);
	                    break;
	                }

	                i++;
	            }
	        }

	        return this;
	    },
	    emit: function (event) {
	        var eventListeners = this._listeners[event];

	        if (eventListeners) {
	            var i = 0;

	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            while (i < eventListeners.length) {
	                var _eventListeners = eventListeners[i++],
	                    fn = _eventListeners.fn,
	                    fnCtx = _eventListeners.fnCtx;

	                fn.call.apply(fn, [fnCtx].concat(args));
	            }
	        }

	        return this;
	    }
	};

	function TopNode(childNode) {
	    this.type = NODE_TYPE_TOP;
	    this._childNode = childNode;
	    this._ns = null;
	}

	TopNode.prototype = {
	    getDomNode: function () {
	        return this._childNode.getDomNode();
	    },
	    setNs: function (ns) {
	        if (ns) {
	            this._ns = ns;
	        }

	        return this;
	    },
	    setCtx: function (ctx) {
	        if (ctx) {
	            this._childNode.setCtx(ctx);
	        }

	        return this;
	    },
	    renderToDom: function () {
	        return this._childNode.renderToDom(this._ns);
	    },
	    adoptDom: function (domNode) {
	        this._childNode.adoptDom(domNode, 0);
	    },
	    patch: function (node) {
	        this._childNode.patch(node._childNode);
	    },
	    mount: function () {
	        this._childNode.mount();
	    },
	    unmount: function () {
	        this._childNode.unmount();
	    }
	};

	var mountedNodes = new SimpleMap$1();
	var counter$1 = 0;

	function mountToDomNode(domNode, node, ctx, cb, syncMode) {
	    if (IS_DEBUG) {
	        if (!isNode(node)) {
	            throw TypeError('vidom: Unexpected type of node is passed to mount.');
	        }
	    }

	    var domNodeId = getDomNodeId(domNode);
	    var mounted = mountedNodes.get(domNodeId),
	        mountId = void 0;

	    if (mounted && mounted.tree) {
	        mountId = ++mounted.id;
	        var patchFn = function () {
	            mounted = mountedNodes.get(domNodeId);
	            if (mounted && mounted.id === mountId) {
	                var prevTree = mounted.tree,
	                    newTree = new TopNode(node);

	                newTree.setNs(prevTree._ns).setCtx(ctx);

	                prevTree.patch(newTree);
	                mounted.tree = newTree;

	                callCb(cb);
	                if (IS_DEBUG) {
	                    hook.emit('replace', prevTree, newTree);
	                }
	            }
	        };

	        syncMode ? patchFn() : rafBatch(patchFn);
	    } else {
	        mountedNodes.set(domNodeId, mounted = { tree: null, id: mountId = ++counter$1 });

	        if (domNode.childNodes.length) {
	            var topDomChildNodes = collectTopDomChildNodes(domNode);

	            if (topDomChildNodes) {
	                var tree = mounted.tree = new TopNode(node);

	                tree.setNs(getNs(domNode)).setCtx(ctx);

	                tree.adoptDom(topDomChildNodes);
	                tree.mount();
	                callCb(cb);

	                if (IS_DEBUG) {
	                    hook.emit('mount', tree);
	                }

	                return;
	            } else {
	                domNode.textContent = '';
	            }
	        }

	        var renderFn = function () {
	            var mounted = mountedNodes.get(domNodeId);

	            if (mounted && mounted.id === mountId) {
	                var _tree = mounted.tree = new TopNode(node);

	                _tree.setNs(getNs(domNode)).setCtx(ctx);

	                domOps.append(domNode, _tree.renderToDom());
	                _tree.mount();
	                callCb(cb);
	                if (IS_DEBUG) {
	                    hook.emit('mount', _tree);
	                }
	            }
	        };

	        syncMode ? renderFn() : rafBatch(renderFn);
	    }
	}

	function unmountFromDomNode(domNode, cb, syncMode) {
	    var domNodeId = getDomNodeId(domNode);
	    var mounted = mountedNodes.get(domNodeId);

	    if (mounted) {
	        (function () {
	            var mountId = ++mounted.id,
	                unmountFn = function () {
	                mounted = mountedNodes.get(domNodeId);
	                if (mounted && mounted.id === mountId) {
	                    mountedNodes.delete(domNodeId);
	                    var tree = mounted.tree;

	                    if (tree) {
	                        var treeDomNode = tree.getDomNode();

	                        tree.unmount();
	                        domOps.remove(treeDomNode);
	                    }

	                    callCb(cb);
	                    if (IS_DEBUG) {
	                        tree && hook.emit('unmount', tree);
	                    }
	                }
	            };

	            mounted.tree ? syncMode ? unmountFn() : rafBatch(unmountFn) : syncMode || callCb(cb);
	        })();
	    } else if (!syncMode) {
	        callCb(cb);
	    }
	}

	function callCb(cb) {
	    cb && cb();
	}

	function collectTopDomChildNodes(node) {
	    var childNodes = node.childNodes,
	        len = childNodes.length;
	    var i = 0,
	        res = void 0,
	        childNode = void 0;

	    while (i < len) {
	        childNode = childNodes[i++];

	        if (res) {
	            res.push(childNode);
	        } else if (childNode.nodeType === Node.COMMENT_NODE && childNode.textContent === 'vidom') {
	            res = [];
	        }
	    }

	    return res;
	}

	function mount(domNode, tree, ctx, cb) {
	    if (typeof ctx === 'function') {
	        cb = ctx;
	        ctx = this;
	    }

	    mountToDomNode(domNode, tree, ctx, cb, false);
	}

	function mountSync(domNode, tree, ctx) {
	    mountToDomNode(domNode, tree, ctx, null, true);
	}

	function unmount(domNode, cb) {
	    unmountFromDomNode(domNode, cb, false);
	}

	function unmountSync(domNode) {
	    unmountFromDomNode(domNode, null, true);
	}

	function getMountedRootNodes() {
	    var res = [];

	    mountedNodes.forEach(function (_ref) {
	        var tree = _ref.tree;

	        if (tree) {
	            res.push(tree);
	        }
	    });

	    return res;
	}

	var hook = new Emitter();

	hook.getRootNodes = getMountedRootNodes;

	if (IS_DEBUG) {
	    if (typeof window !== 'undefined') {
	        window['__vidom__hook__'] = hook;
	    }
	}

	function mountComponent() {
	    this.__isMounted = true;
	    this.onMount();
	}

	function unmountComponent() {
	    this.__isMounted = false;
	    this.onUnmount();
	}

	function patchComponent(nextAttrs, nextChildren, nextContext) {
	    if (!this.isMounted()) {
	        return;
	    }

	    nextAttrs = this.__buildAttrs(nextAttrs);

	    var prevAttrs = this.attrs,
	        prevChildren = this.children;

	    if (prevAttrs !== nextAttrs || prevChildren !== nextChildren) {
	        var isUpdating = this.__isUpdating;

	        this.__isUpdating = true;

	        if (prevAttrs !== nextAttrs) {
	            if (IS_DEBUG) {
	                this.__isFrozen = false;
	            }

	            this.attrs = nextAttrs;

	            if (IS_DEBUG) {
	                this.__isFrozen = true;
	            }

	            this.onAttrsChange(prevAttrs);
	        }

	        if (prevChildren !== nextChildren) {
	            if (IS_DEBUG) {
	                this.__isFrozen = false;
	            }

	            this.children = nextChildren;

	            if (IS_DEBUG) {
	                this.__isFrozen = true;
	            }

	            this.onChildrenChange(prevChildren);
	        }

	        this.__isUpdating = isUpdating;
	    }

	    if (this.context !== nextContext) {
	        if (IS_DEBUG) {
	            this.__isFrozen = false;
	        }

	        this.context = nextContext;

	        if (IS_DEBUG) {
	            Object.freeze(this.context);
	            this.__isFrozen = true;
	        }
	    }

	    if (this.__isUpdating) {
	        return;
	    }

	    var shouldUpdate = this.shouldUpdate(prevAttrs, prevChildren, this.__prevState);

	    if (IS_DEBUG) {
	        var shouldUpdateResType = typeof shouldUpdate;

	        if (shouldUpdateResType !== 'boolean') {
	            consoleWrapper.warn('Component#shouldUpdate() should return boolean instead of ' + shouldUpdateResType);
	        }
	    }

	    if (shouldUpdate) {
	        var prevRootNode = this.__rootNode;

	        this.__rootNode = this.render();
	        prevRootNode.patch(this.__rootNode);
	        this.onUpdate(prevAttrs, prevChildren, this.__prevState);
	    }
	}

	function shouldComponentUpdate() {
	    return true;
	}

	function renderComponentToDom(parentNs) {
	    return this.__rootNode.renderToDom(parentNs);
	}

	function renderComponentToString() {
	    return this.__rootNode.renderToString();
	}

	function adoptComponentDom(domNode, domIdx) {
	    return this.__rootNode.adoptDom(domNode, domIdx);
	}

	function getComponentDomNode() {
	    return this.__rootNode.getDomNode();
	}

	function requestChildContext() {
	    return obj;
	}

	function setComponentState(state) {
	    var nextState = void 0;

	    if (this.__rootNode) {
	        // was inited
	        this.update(this.state === this.__prevState ? updateComponentPrevState : null);
	        nextState = merge(this.state, state);
	    } else {
	        nextState = state === obj ? state : merge(this.state, state);
	    }

	    if (IS_DEBUG) {
	        this.__isFrozen = false;
	    }

	    this.state = nextState;

	    if (IS_DEBUG) {
	        Object.freeze(this.state);
	        this.__isFrozen = true;
	    }
	}

	function updateComponentPrevState() {
	    this.__prevState = this.state;
	}

	function renderComponent() {
	    var rootNode = this.onRender() || createNode('!');

	    if (IS_DEBUG) {
	        if (typeof rootNode !== 'object' || Array.isArray(rootNode)) {
	            throw TypeError('vidom: Component#onRender must return a single node on the top level.');
	        }
	    }

	    var childCtx = this.onChildContextRequest(),
	        rootNodeCtx = childCtx === obj ? this.context : this.context === obj ? childCtx : merge(this.context, childCtx);

	    if (IS_DEBUG) {
	        Object.freeze(rootNodeCtx);
	    }

	    rootNode.setCtx(rootNodeCtx);

	    return rootNode;
	}

	function updateComponent(cb) {
	    var _this = this;

	    if (this.__isUpdating) {
	        cb && rafBatch(function () {
	            return cb.call(_this);
	        });
	    } else {
	        this.__isUpdating = true;
	        rafBatch(function () {
	            if (_this.isMounted()) {
	                _this.__isUpdating = false;
	                var prevRootNode = _this.__rootNode;

	                _this.patch(_this.attrs, _this.children, _this.context);
	                cb && cb.call(_this);
	                if (IS_DEBUG) {
	                    hook.emit('replace', prevRootNode, _this.__rootNode);
	                }
	            }
	        });
	    }
	}

	function getComponentRootNode() {
	    return this.__rootNode;
	}

	function isComponentMounted() {
	    return this.__isMounted;
	}

	function onComponentRefRequest() {
	    return this;
	}

	function buildComponentAttrs(attrs) {
	    if (attrs === this.attrs) {
	        return attrs;
	    }

	    var defaultAttrs = this.constructor.defaultAttrs,
	        resAttrs = attrs === obj ? defaultAttrs || attrs : defaultAttrs ? merge(defaultAttrs, attrs) : attrs;

	    if (IS_DEBUG) {
	        Object.freeze(resAttrs);
	    }

	    return resAttrs;
	}

	function createComponent(props, staticProps) {
	    var res = function (attrs, children, ctx) {
	        if (IS_DEBUG) {
	            restrictObjProp(this, 'attrs');
	            restrictObjProp(this, 'children');
	            restrictObjProp(this, 'state');
	            restrictObjProp(this, 'context');

	            this.__isFrozen = false;
	        }

	        this.attrs = this.__buildAttrs(attrs);
	        this.children = children;
	        this.state = obj;
	        this.context = ctx;

	        if (IS_DEBUG) {
	            this.__isFrozen = true;
	        }

	        this.__isMounted = false;
	        this.__isUpdating = false;

	        this.onInit();

	        this.__prevState = this.state;
	        this.__rootNode = this.render();
	    },
	        ptp = {
	        constructor: res,
	        onInit: noOp,
	        mount: mountComponent,
	        unmount: unmountComponent,
	        onMount: noOp,
	        onUnmount: noOp,
	        onAttrsChange: noOp,
	        onChildrenChange: noOp,
	        shouldUpdate: shouldComponentUpdate,
	        onUpdate: noOp,
	        isMounted: isComponentMounted,
	        setState: setComponentState,
	        renderToDom: renderComponentToDom,
	        renderToString: renderComponentToString,
	        adoptDom: adoptComponentDom,
	        getDomNode: getComponentDomNode,
	        getRootNode: getComponentRootNode,
	        render: renderComponent,
	        onRender: noOp,
	        update: updateComponent,
	        patch: patchComponent,
	        onChildContextRequest: requestChildContext,
	        onRefRequest: onComponentRefRequest,
	        __buildAttrs: buildComponentAttrs
	    };

	    for (var i in props) {
	        ptp[i] = props[i];
	    }

	    res.prototype = ptp;

	    for (var _i in staticProps) {
	        res[_i] = staticProps[_i];
	    }

	    res['__vidom__component__'] = true;

	    return res;
	}

	var Input = createComponent({
	    onInit: function () {
	        var _this = this;

	        this._addAttrs = {
	            onChange: null,
	            onInput: function (e) {
	                _this.onInput(e);
	            }
	        };
	    },
	    onRender: function () {
	        return new TagNode('input').setAttrs(merge(this.attrs, this._addAttrs));
	    },
	    onInput: function (e) {
	        var onChange = this.attrs.onChange;

	        onChange && onChange(e);

	        applyBatch();

	        if (this.isMounted()) {
	            var control = this.getDomNode(),
	                value = this.attrs.value; // attrs could be changed during applyBatch()

	            if (typeof value !== 'undefined' && control.value !== value) {
	                control.value = value;
	            }
	        }
	    },
	    onRefRequest: function () {
	        return this.getDomNode();
	    }
	});

	var namedRadioInputs = new SimpleMap$1();

	var Radio = createComponent({
	    onInit: function () {
	        var _this = this;

	        this._addAttrs = {
	            onChange: function (e) {
	                _this.onChange(e);
	            }
	        };
	    },
	    onRender: function () {
	        return new TagNode('input').setAttrs(merge(this.attrs, this._addAttrs));
	    },
	    onMount: function () {
	        var name = this.attrs.name;

	        if (name) {
	            addToNamedRadioInputs(name, this);
	        }
	    },
	    onUpdate: function (_ref) {
	        var prevName = _ref.name;
	        var name = this.attrs.name;

	        if (name !== prevName) {
	            if (prevName) {
	                removeFromNamedRadioInputs(prevName, this);
	            }

	            if (name) {
	                addToNamedRadioInputs(name, this);
	            }
	        }
	    },
	    onUnmount: function () {
	        var name = this.attrs.name;

	        if (name) {
	            removeFromNamedRadioInputs(name, this);
	        }
	    },
	    onChange: function (e) {
	        var onChange = this.attrs.onChange;

	        onChange && onChange(e);

	        applyBatch();

	        if (this.isMounted()) {
	            var control = this.getDomNode(),
	                _attrs = this.attrs,
	                name = _attrs.name,
	                checked = _attrs.checked; // attrs could be changed during applyBatch()

	            if (typeof checked !== 'undefined' && control.checked !== checked) {
	                if (name) {
	                    var radioInputs = namedRadioInputs.get(name),
	                        len = radioInputs.length;
	                    var i = 0,
	                        radioInput = void 0,
	                        _checked = void 0;

	                    while (i < len) {
	                        radioInput = radioInputs[i++];
	                        _checked = radioInput.attrs.checked;

	                        if (typeof _checked !== 'undefined') {
	                            var radioControl = radioInput.getDomNode();

	                            if (_checked !== radioControl.checked) {
	                                radioControl.checked = _checked;
	                            }
	                        }
	                    }
	                } else {
	                    control.checked = checked;
	                }
	            }
	        }
	    },
	    onRefRequest: function () {
	        return this.getDomNode();
	    }
	});

	function addToNamedRadioInputs(name, input) {
	    var radioInputs = namedRadioInputs.get(name);

	    if (radioInputs) {
	        radioInputs.push(input);
	    } else {
	        namedRadioInputs.set(name, [input]);
	    }
	}

	function removeFromNamedRadioInputs(name, input) {
	    var radioInputs = namedRadioInputs.get(name),
	        len = radioInputs.length;
	    var i = 0;

	    while (i < len) {
	        if (radioInputs[i] === input) {
	            if (len === 1) {
	                namedRadioInputs.delete(name);
	            } else {
	                radioInputs.splice(i, 1);
	            }

	            return;
	        }

	        i++;
	    }
	}

	var CheckBox = createComponent({
	    onInit: function () {
	        var _this = this;

	        this._addAttrs = {
	            onChange: function (e) {
	                _this.onChange(e);
	            }
	        };
	    },
	    onRender: function () {
	        return new TagNode('input').setAttrs(merge(this.attrs, this._addAttrs));
	    },
	    onChange: function (e) {
	        var onChange = this.attrs.onChange;

	        onChange && onChange(e);

	        applyBatch();

	        if (this.isMounted()) {
	            var control = this.getDomNode(),
	                checked = this.attrs.checked; // attrs could be changed during applyBatch()

	            if (typeof checked !== 'undefined' && control.checked !== checked) {
	                control.checked = checked;
	            }
	        }
	    },
	    onRefRequest: function () {
	        return this.getDomNode();
	    }
	});

	var File = createComponent({
	    onRender: function () {
	        return new TagNode('input').setAttrs(this.attrs);
	    },
	    onRefRequest: function () {
	        return this.getDomNode();
	    }
	});

	var ATTRS_SET$2 = 4;
	var CHILDREN_SET$4 = 8;

	function ComponentNode(component) {
	    if (IS_DEBUG) {
	        restrictObjProp(this, 'type');
	        restrictObjProp(this, 'key');
	        restrictObjProp(this, 'attrs');
	        restrictObjProp(this, 'children');

	        this.__isFrozen = false;
	    }

	    this.type = NODE_TYPE_COMPONENT;
	    this.key = null;
	    this.attrs = obj;
	    this.children = null;

	    if (IS_DEBUG) {
	        this.__isFrozen = true;
	        this._sets = 0;
	    }

	    this._component = component;
	    this._instance = null;
	    this._ctx = obj;
	    this._ref = null;
	}

	ComponentNode.prototype = {
	    getDomNode: function () {
	        return this._instance && this._instance.getDomNode();
	    },

	    setKey: setKey,

	    setRef: setRef,

	    setAttrs: function (attrs) {
	        if (IS_DEBUG) {
	            if (this._sets & ATTRS_SET$2) {
	                console.warn('Attrs are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.attrs = this.attrs === obj ? attrs : merge(this.attrs, attrs);

	        if (IS_DEBUG) {
	            Object.freeze(this.attrs);
	            this._sets |= ATTRS_SET$2;
	            this.__isFrozen = true;
	        }

	        if (this._component === Input) {
	            switch (this.attrs.type) {
	                case 'radio':
	                    this._component = Radio;
	                    break;

	                case 'checkbox':
	                    this._component = CheckBox;
	                    break;

	                case 'file':
	                    this._component = File;
	                    break;
	            }
	        }

	        return this;
	    },
	    setChildren: function (children) {
	        if (IS_DEBUG) {
	            if (this._sets & CHILDREN_SET$4) {
	                console.warn('Children are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.children = children;

	        if (IS_DEBUG) {
	            this._sets |= CHILDREN_SET$4;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setCtx: function (ctx) {
	        this._ctx = ctx;
	        return this;
	    },
	    renderToDom: function (parentNs) {
	        if (IS_DEBUG) {
	            checkReuse(this, this._component.name || 'Anonymous');
	        }

	        return this._getInstance().renderToDom(parentNs);
	    },
	    renderToString: function () {
	        return this._getInstance().renderToString();
	    },
	    adoptDom: function (domNode, domIdx) {
	        if (IS_DEBUG) {
	            checkReuse(this, this._component.name || 'Anonymous');
	        }

	        return this._getInstance().adoptDom(domNode, domIdx);
	    },
	    mount: function () {
	        this._instance.getRootNode().mount();
	        this._instance.mount();
	        this._ref && this._ref(this._instance.onRefRequest());
	    },
	    unmount: function () {
	        if (this._instance) {
	            this._instance.getRootNode().unmount();
	            this._instance.unmount();
	            this._instance = null;
	            this._ref && this._ref(null);
	        }
	    },
	    clone: function () {
	        var res = new ComponentNode(this._component);

	        if (IS_DEBUG) {
	            res.__isFrozen = false;
	        }

	        res.key = this.key;
	        res.attrs = this.attrs;
	        res.children = this.children;

	        if (IS_DEBUG) {
	            res.__isFrozen = true;
	        }

	        res._ctx = this._ctx;
	        res._ref = this._ref;

	        return res;
	    },
	    patch: function (node) {
	        var instance = this._getInstance();

	        if (this === node) {
	            instance.patch(node.attrs, node.children, node._ctx);
	        } else if (this.type === node.type && this._component === node._component) {
	            instance.patch(node.attrs, node.children, node._ctx);
	            node._instance = instance;
	            this._patchRef(node);
	        } else {
	            patchOps.replace(this, node);
	            this._instance = null;
	        }
	    },
	    _patchRef: function (node) {
	        if (this._ref) {
	            if (this._ref !== node._ref) {
	                this._ref(null);

	                if (node._ref) {
	                    node._ref(node._instance.onRefRequest());
	                }
	            }
	        } else if (node._ref) {
	            node._ref(node._instance.onRefRequest());
	        }
	    },
	    _getInstance: function () {
	        return this._instance || (this._instance = new this._component(this.attrs, this.children, this._ctx));
	    }
	};

	function isNode(obj) {
	    return obj instanceof ComponentNode || obj instanceof FragmentNode || obj instanceof FunctionComponentNode || obj instanceof TagNode || obj instanceof TextNode;
	}

	function checkChildren(children) {
	    var keys = {},
	        len = children.length;

	    var i = 0,
	        child = void 0;

	    while (i < len) {
	        child = children[i++];

	        if (!isNode(child)) {
	            throw TypeError('vidom: Unexpected type of child. Only a node is expected to be here.');
	        }

	        if (child.key != null) {
	            if (child.key in keys) {
	                throw Error('vidom: Childrens\' keys must be unique across the children. ' + ('Found duplicate of "' + child._key + '" key.'));
	            } else {
	                keys[child.key] = true;
	            }
	        }
	    }
	}

	var AMP_RE$1 = /&/g;
	var LT_RE = /</g;
	var GT_RE = />/g;

	function escapeHtml(str) {
	    str = str + '';

	    var i = str.length,
	        escapes = 0; // 1 — escape '&', 2 — escape '<', 4 — escape '>'

	    while (i--) {
	        switch (str[i]) {
	            case '&':
	                escapes |= 1;
	                break;

	            case '<':
	                escapes |= 2;
	                break;

	            case '>':
	                escapes |= 4;
	                break;
	        }
	    }

	    if (escapes & 1) {
	        str = str.replace(AMP_RE$1, '&amp;');
	    }

	    if (escapes & 2) {
	        str = str.replace(LT_RE, '&lt;');
	    }

	    if (escapes & 4) {
	        str = str.replace(GT_RE, '&gt;');
	    }

	    return str;
	}

	var TOP_LEVEL_NS_TAGS = {
	    'http://www.w3.org/2000/svg': 'svg',
	    'http://www.w3.org/1998/Math/MathML': 'math'
	};
	var parentTags = {
	    thead: 'table',
	    tbody: 'table',
	    tfoot: 'table',
	    tr: 'tbody',
	    td: 'tr'
	};
	var helperDomNodes = {};

	function createElementByHtml(html, tag, ns) {
	    var parentTag = parentTags[tag] || 'div',
	        helperDomNode = helperDomNodes[parentTag] || (helperDomNodes[parentTag] = document.createElement(parentTag));

	    if (!ns || !TOP_LEVEL_NS_TAGS[ns] || TOP_LEVEL_NS_TAGS[ns] === tag) {
	        helperDomNode.innerHTML = html;
	        return helperDomNode.removeChild(helperDomNode.firstChild);
	    }

	    var topLevelTag = TOP_LEVEL_NS_TAGS[ns];
	    helperDomNode.innerHTML = '<' + topLevelTag + ' xmlns="' + ns + '">' + html + '</' + topLevelTag + '>';
	    return helperDomNode.removeChild(helperDomNode.firstChild).firstChild;
	}

	var SHORT_TAGS = {
	    area: true,
	    base: true,
	    br: true,
	    col: true,
	    command: true,
	    embed: true,
	    hr: true,
	    img: true,
	    input: true,
	    keygen: true,
	    link: true,
	    menuitem: true,
	    meta: true,
	    param: true,
	    source: true,
	    track: true,
	    wbr: true
	};
	var USE_DOM_STRINGS = isTrident || isEdge;
	var ATTRS_SET = 4;
	var CHILDREN_SET = 8;
	var NS_SET = 16;

	function TagNode(tag) {
	    if (IS_DEBUG) {
	        restrictObjProp(this, 'type');
	        restrictObjProp(this, 'tag');
	        restrictObjProp(this, 'key');
	        restrictObjProp(this, 'attrs');
	        restrictObjProp(this, 'children');

	        this.__isFrozen = false;
	    }

	    this.type = NODE_TYPE_TAG;
	    this.tag = tag;
	    this.key = null;
	    this.attrs = obj;
	    this.children = null;

	    if (IS_DEBUG) {
	        this.__isFrozen = true;
	        this._sets = 0;
	    }

	    this._domNode = null;
	    this._ns = null;
	    this._escapeChildren = true;
	    this._ctx = obj;
	    this._ref = null;
	}

	TagNode.prototype = {
	    getDomNode: function () {
	        return this._domNode;
	    },

	    setKey: setKey,

	    setRef: setRef,

	    setNs: function (ns) {
	        if (IS_DEBUG) {
	            if (this._sets & NS_SET) {
	                consoleWrapper.warn('Namespace is already set and shouldn\'t be set again.');
	            }
	        }

	        this._ns = ns;

	        if (IS_DEBUG) {
	            this._sets |= NS_SET;
	        }

	        return this;
	    },
	    setAttrs: function (attrs) {
	        if (IS_DEBUG) {
	            if (this._sets & ATTRS_SET) {
	                consoleWrapper.warn('Attrs are already set and shouldn\'t be set again.');
	            }

	            checkAttrs(attrs);
	            this.__isFrozen = false;
	        }

	        this.attrs = this.attrs === obj ? attrs : merge(this.attrs, attrs);

	        if (IS_DEBUG) {
	            Object.freeze(this.attrs);
	            this._sets |= ATTRS_SET;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setChildren: function (children) {
	        if (IS_DEBUG) {
	            if (this._sets & CHILDREN_SET) {
	                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.children = processChildren(children);

	        if (IS_DEBUG) {
	            if (Array.isArray(this.children)) {
	                Object.freeze(this.children);
	            }

	            this._sets |= CHILDREN_SET;
	            this.__isFrozen = true;
	        }

	        return this;
	    },
	    setHtml: function (html) {
	        if (IS_DEBUG) {
	            if (this._sets & CHILDREN_SET) {
	                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
	            }

	            this.__isFrozen = false;
	        }

	        this.children = html;

	        if (IS_DEBUG) {
	            this._sets |= CHILDREN_SET;
	            this.__isFrozen = true;
	        }

	        this._escapeChildren = false;
	        return this;
	    },
	    setCtx: function (ctx) {
	        if (ctx !== obj) {
	            this._ctx = ctx;

	            var children = this.children;

	            if (children && typeof children !== 'string') {
	                var len = children.length;
	                var i = 0;

	                while (i < len) {
	                    children[i++].setCtx(ctx);
	                }
	            }
	        }

	        return this;
	    },
	    renderToDom: function (parentNs) {
	        if (IS_DEBUG) {
	            checkReuse(this, this.tag);
	        }

	        var tag = this.tag,
	            children = this.children,
	            ns = this._ns || parentNs;

	        if (USE_DOM_STRINGS && children && typeof children !== 'string') {
	            var _domNode = createElementByHtml(this.renderToString(), tag, ns);
	            this.adoptDom([_domNode], 0);
	            return _domNode;
	        }

	        var domNode = this._domNode = createElement(tag, ns),
	            attrs = this.attrs;

	        if (children) {
	            if (typeof children === 'string') {
	                this._escapeChildren ? domNode.textContent = children : domNode.innerHTML = children;
	            } else {
	                var i = 0;
	                var len = children.length;

	                while (i < len) {
	                    domNode.appendChild(children[i++].renderToDom(ns));
	                }
	            }
	        }

	        if (attrs !== obj) {
	            var name = void 0,
	                value = void 0;
	            for (name in attrs) {
	                if ((value = attrs[name]) != null) {
	                    if (ATTRS_TO_EVENTS[name]) {
	                        addListener(domNode, ATTRS_TO_EVENTS[name], value);
	                    } else {
	                        domAttrs(name).set(domNode, name, value);
	                    }
	                }
	            }
	        }

	        return domNode;
	    },
	    renderToString: function () {
	        var tag = this.tag;

	        if (tag === '!') {
	            return '<!---->';
	        }

	        var ns = this._ns,
	            attrs = this.attrs;
	        var children = this.children,
	            res = '<' + tag;

	        if (ns) {
	            res += ' xmlns="' + ns + '"';
	        }

	        if (attrs !== obj) {
	            var name = void 0,
	                value = void 0,
	                attrHtml = void 0;
	            for (name in attrs) {
	                value = attrs[name];

	                if (value != null) {
	                    if (name === 'value') {
	                        switch (tag) {
	                            case 'textarea':
	                                children = value;
	                                continue;

	                            case 'select':
	                                this.setCtx({ value: value, multiple: attrs.multiple });
	                                continue;

	                            case 'option':
	                                var ctx = this._ctx;

	                                if (ctx.multiple ? isInArray(ctx.value, value) : ctx.value === value) {
	                                    res += ' ' + domAttrs('selected').toString('selected', true);
	                                }
	                        }
	                    }

	                    if (!ATTRS_TO_EVENTS[name] && (attrHtml = domAttrs(name).toString(name, value))) {
	                        res += ' ' + attrHtml;
	                    }
	                }
	            }
	        }

	        if (SHORT_TAGS[tag]) {
	            res += '/>';
	        } else {
	            res += '>';

	            if (children) {
	                if (typeof children === 'string') {
	                    res += this._escapeChildren ? escapeHtml(children) : children;
	                } else {
	                    var i = 0;
	                    var len = children.length;

	                    while (i < len) {
	                        res += children[i++].renderToString();
	                    }
	                }
	            }

	            res += '</' + tag + '>';
	        }

	        return res;
	    },
	    adoptDom: function (domNodes, domIdx) {
	        if (IS_DEBUG) {
	            checkReuse(this, this.tag);
	        }

	        var domNode = this._domNode = domNodes[domIdx],
	            attrs = this.attrs,
	            children = this.children;

	        if (attrs !== obj) {
	            var name = void 0,
	                value = void 0;
	            for (name in attrs) {
	                if ((value = attrs[name]) != null && ATTRS_TO_EVENTS[name]) {
	                    addListener(domNode, ATTRS_TO_EVENTS[name], value);
	                }
	            }
	        }

	        if (children && typeof children !== 'string') {
	            var i = 0;
	            var len = children.length;

	            if (len) {
	                var domChildren = domNode.childNodes;
	                var domChildIdx = 0;

	                while (i < len) {
	                    domChildIdx = children[i++].adoptDom(domChildren, domChildIdx);
	                }
	            }
	        }

	        return domIdx + 1;
	    },
	    mount: function () {
	        var children = this.children;

	        if (children && typeof children !== 'string') {
	            var i = 0;
	            var len = children.length;

	            while (i < len) {
	                children[i++].mount();
	            }
	        }

	        this._ref && this._ref(this._domNode);
	    },
	    unmount: function () {
	        var children = this.children;

	        if (children && typeof children !== 'string') {
	            var i = 0;
	            var len = children.length;

	            while (i < len) {
	                children[i++].unmount();
	            }
	        }

	        removeListeners(this._domNode);

	        this._domNode = null;

	        this._ref && this._ref(null);
	    },
	    clone: function () {
	        var res = new TagNode(this.tag);

	        if (IS_DEBUG) {
	            res.__isFrozen = false;
	        }

	        res.key = this.key;
	        res.attrs = this.attrs;
	        res.children = this.children;

	        if (IS_DEBUG) {
	            res.__isFrozen = true;
	        }

	        res._sets = NS_SET;
	        res._ns = this._ns;
	        res._escapeChildren = this._escapeChildren;
	        res._ctx = this._ctx;
	        res._ref = this._ref;

	        return res;
	    },
	    patch: function (node) {
	        if (this === node) {
	            this._patchChildren(node);
	        } else if (this.type === node.type && this.tag === node.tag && this._ns === node._ns) {
	            node._domNode = this._domNode;
	            this._patchAttrs(node);
	            this._patchChildren(node);
	            this._patchRef(node);
	        } else {
	            patchOps.replace(this, node);
	        }
	    },
	    _patchChildren: function (node) {
	        var childrenA = this.children,
	            childrenB = node.children;

	        if (!childrenA && !childrenB) {
	            return;
	        }

	        var isChildrenAText = typeof childrenA === 'string',
	            isChildrenBText = typeof childrenB === 'string';

	        if (isChildrenBText) {
	            if (isChildrenAText) {
	                if (childrenA !== childrenB) {
	                    patchOps.updateText(this, childrenB, node._escapeChildren);
	                }
	                return;
	            }

	            childrenA && childrenA.length && patchOps.removeChildren(this);
	            childrenB && patchOps.updateText(this, childrenB, node._escapeChildren);

	            return;
	        }

	        if (!childrenB || !childrenB.length) {
	            if (childrenA) {
	                isChildrenAText ? patchOps.removeText(this) : childrenA.length && patchOps.removeChildren(this);
	            }

	            return;
	        }

	        if (isChildrenAText && childrenA) {
	            patchOps.removeText(this);
	        }

	        if (isChildrenAText || !childrenA || !childrenA.length) {
	            var childrenBLen = childrenB.length;
	            var iB = 0;

	            while (iB < childrenBLen) {
	                patchOps.appendChild(node, childrenB[iB++]);
	            }

	            return;
	        }

	        patchChildren(this, node);
	    },
	    _patchAttrs: function (node) {
	        var attrsA = this.attrs,
	            attrsB = node.attrs;

	        if (attrsA === attrsB) {
	            return;
	        }

	        var attrName = void 0;

	        if (attrsB !== obj) {
	            var attrAVal = void 0,
	                attrBVal = void 0,
	                isAttrAValArray = void 0,
	                isAttrBValArray = void 0;

	            for (attrName in attrsB) {
	                attrBVal = attrsB[attrName];
	                if (attrsA === obj || (attrAVal = attrsA[attrName]) == null) {
	                    if (attrBVal != null) {
	                        patchOps.updateAttr(this, attrName, attrBVal);
	                    }
	                } else if (attrBVal == null) {
	                    patchOps.removeAttr(this, attrName);
	                } else if (typeof attrBVal === 'object' && typeof attrAVal === 'object') {
	                    isAttrBValArray = Array.isArray(attrBVal);
	                    isAttrAValArray = Array.isArray(attrAVal);
	                    if (isAttrBValArray || isAttrAValArray) {
	                        if (isAttrBValArray && isAttrAValArray) {
	                            this._patchAttrArr(attrName, attrAVal, attrBVal);
	                        } else {
	                            patchOps.updateAttr(this, attrName, attrBVal);
	                        }
	                    } else {
	                        this._patchAttrObj(attrName, attrAVal, attrBVal);
	                    }
	                } else if (attrAVal !== attrBVal) {
	                    patchOps.updateAttr(this, attrName, attrBVal);
	                }
	            }
	        }

	        if (attrsA !== obj) {
	            for (attrName in attrsA) {
	                if ((attrsB === obj || !(attrName in attrsB)) && attrsA[attrName] != null) {
	                    patchOps.removeAttr(this, attrName);
	                }
	            }
	        }
	    },
	    _patchAttrArr: function (attrName, arrA, arrB) {
	        if (arrA === arrB) {
	            return;
	        }

	        var lenA = arrA.length;
	        var hasDiff = false;

	        if (lenA === arrB.length) {
	            var i = 0;
	            while (!hasDiff && i < lenA) {
	                if (arrA[i] != arrB[i]) {
	                    hasDiff = true;
	                }
	                ++i;
	            }
	        } else {
	            hasDiff = true;
	        }

	        hasDiff && patchOps.updateAttr(this, attrName, arrB);
	    },
	    _patchAttrObj: function (attrName, objA, objB) {
	        if (objA === objB) {
	            return;
	        }

	        var diffObj = {};
	        var hasDiff = false;

	        for (var i in objB) {
	            if (objA[i] != objB[i]) {
	                hasDiff = true;
	                diffObj[i] = objB[i];
	            }
	        }

	        for (var _i in objA) {
	            if (objA[_i] != null && !(_i in objB)) {
	                hasDiff = true;
	                diffObj[_i] = null;
	            }
	        }

	        hasDiff && patchOps.updateAttr(this, attrName, diffObj);
	    },
	    _patchRef: function (node) {
	        if (this._ref) {
	            if (this._ref !== node._ref) {
	                this._ref(null);

	                if (node._ref) {
	                    node._ref(node._domNode);
	                }
	            }
	        } else if (node._ref) {
	            node._ref(node._domNode);
	        }
	    }
	};

	function processChildren(children) {
	    if (children == null) {
	        return null;
	    }

	    var typeOfChildren = typeof children;

	    if (typeOfChildren === 'object') {
	        var res = Array.isArray(children) ? children : [children];

	        if (IS_DEBUG) {
	            checkChildren(res);
	        }

	        return res;
	    }

	    return typeOfChildren === 'string' ? children : children.toString();
	}

	function checkAttrs(attrs) {
	    for (var name in attrs) {
	        if (name.substr(0, 2) === 'on' && !ATTRS_TO_EVENTS[name]) {
	            throw Error('vidom: Unsupported type of dom event listener "' + name + '".');
	        }
	    }
	}

	var TextArea = createComponent({
	    onInit: function () {
	        var _this = this;

	        this._addAttrs = {
	            onChange: null,
	            onInput: function (e) {
	                _this.onInput(e);
	            }
	        };
	    },
	    onRender: function () {
	        return new TagNode('textarea').setAttrs(merge(this.attrs, this._addAttrs));
	    },
	    onInput: function (e) {
	        var onChange = this.attrs.onChange;

	        onChange && onChange(e);

	        applyBatch();

	        if (this.isMounted()) {
	            var control = this.getDomNode(),
	                value = this.attrs.value; // attrs could be changed during applyBatch()

	            if (typeof value !== 'undefined' && control.value !== value) {
	                control.value = value;
	            }
	        }
	    },
	    onRefRequest: function () {
	        return this.getDomNode();
	    }
	});

	var Select = createComponent({
	    onInit: function () {
	        var _this = this;

	        this._addAttrs = {
	            onChange: function (e) {
	                _this.onChange(e);
	            }
	        };
	    },
	    onRender: function () {
	        return new TagNode('select').setAttrs(merge(this.attrs, this._addAttrs)).setChildren(this.children);
	    },
	    onChange: function (e) {
	        var target = e.target,
	            _attrs = this.attrs,
	            onChange = _attrs.onChange,
	            multiple = _attrs.multiple;

	        if (onChange) {
	            if (multiple) {
	                var newValue = [],
	                    options = target.options,
	                    len = options.length;

	                var i = 0,
	                    option = void 0;

	                while (i < len) {
	                    option = options[i++];
	                    if (option.selected) {
	                        newValue.push(option.value);
	                    }
	                }

	                onChange(e, newValue);
	            } else {
	                onChange(e);
	            }
	        }

	        applyBatch();

	        if (this.isMounted()) {
	            var _attrs2 = this.attrs,
	                value = _attrs2.value,
	                _multiple = _attrs2.multiple; // attrs could be changed during applyBatch()

	            if (typeof value !== 'undefined') {
	                if (_multiple) {
	                    var _options = target.options,
	                        _len = _options.length;

	                    var _i = 0,
	                        _option = void 0;

	                    while (_i < _len) {
	                        _option = _options[_i++];
	                        _option.selected = isInArray(value, _option.value);
	                    }
	                } else if (target.value != value) {
	                    target.value = value;
	                }
	            }
	        }
	    },
	    onRefRequest: function () {
	        return this.getDomNode();
	    }
	});

	function createNode(type) {
	    switch (typeof type) {
	        case 'string':
	            switch (type) {
	                case 'fragment':
	                    return new FragmentNode();

	                case 'text':
	                    return new TextNode();

	                case 'input':
	                    return new ComponentNode(Input);

	                case 'textarea':
	                    return new ComponentNode(TextArea);

	                case 'select':
	                    return new ComponentNode(Select);

	                default:
	                    return new TagNode(type);
	            }

	        case 'function':
	            return type.__vidom__component__ ? new ComponentNode(type) : new FunctionComponentNode(type);

	        default:
	            if (IS_DEBUG) {
	                throw TypeError('vidom: Unexpected type of node is passed to the node factory.');
	            }
	    }
	}

	function renderToString(tree) {
	    return '<!--vidom-->' + tree.renderToString();
	}

	function normalizeChildren(children) {
	    if (children == null) {
	        return null;
	    }

	    var typeOfChildren = typeof children;

	    if (typeOfChildren !== 'object') {
	        return typeOfChildren === 'string' ? children || null : '' + children;
	    }

	    if (!Array.isArray(children)) {
	        return children;
	    }

	    if (!children.length) {
	        return null;
	    }

	    var res = children,
	        i = 0,
	        hasContentBefore = false,
	        child = void 0;
	    var len = children.length,
	        alreadyNormalizeChildren = {};

	    while (i < len) {
	        child = i in alreadyNormalizeChildren ? alreadyNormalizeChildren[i] : normalizeChildren(children[i]);

	        if (child === null) {
	            if (res !== null) {
	                if (!hasContentBefore) {
	                    res = null;
	                } else if (res === children) {
	                    res = children.slice(0, i);
	                }
	            }
	        } else if (typeof child === 'object') {
	            if (Array.isArray(child)) {
	                res = hasContentBefore ? (res === children ? res.slice(0, i) : Array.isArray(res) ? res : [toNode(res)]).concat(child) : child;
	            } else if (res !== children) {
	                if (!hasContentBefore) {
	                    res = child;
	                } else if (Array.isArray(res)) {
	                    res.push(child);
	                } else {
	                    res = [toNode(res), child];
	                }
	            } else if (child !== children[i]) {
	                if (hasContentBefore) {
	                    res = res.slice(0, i);
	                    res.push(child);
	                } else {
	                    res = child;
	                }
	            }

	            hasContentBefore = true;
	        } else {
	            var nextChild = void 0,
	                j = i;

	            // join all next text nodes
	            while (++j < len) {
	                nextChild = alreadyNormalizeChildren[j] = normalizeChildren(children[j]);

	                if (typeof nextChild === 'string') {
	                    child += nextChild;
	                } else if (nextChild !== null) {
	                    break;
	                }
	            }

	            if (hasContentBefore) {
	                if (Array.isArray(res)) {
	                    if (res === children) {
	                        res = res.slice(0, i);
	                    }

	                    res.push(toNode(child));
	                } else {
	                    res = [res, toNode(child)];
	                }
	            } else {
	                res = '' + child;
	            }

	            i = j - 1;

	            hasContentBefore = true;
	        }

	        ++i;
	    }

	    return res;
	}

	function toNode(obj) {
	    return typeof obj === 'object' ? obj : createNode('text').setChildren(obj);
	}

	var Component = createComponent();

	exports.node = createNode;
	exports.createComponent = createComponent;
	exports.renderToString = renderToString;
	exports.normalizeChildren = normalizeChildren;
	exports.IS_DEBUG = IS_DEBUG;
	exports.console = consoleWrapper;
	exports.Component = Component;
	exports.mount = mount;
	exports.mountSync = mountSync;
	exports.unmount = unmount;
	exports.unmountSync = unmountSync;
	exports.getMountedRootNodes = getMountedRootNodes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _App = __webpack_require__(4);

	var _App2 = _interopRequireDefault(_App);

	__webpack_require__(228);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _App2.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _router = __webpack_require__(5);

	var _router2 = _interopRequireDefault(_router);

	var _Nav = __webpack_require__(222);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _Link = __webpack_require__(63);

	var _Link2 = _interopRequireDefault(_Link);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _package = __webpack_require__(227);

	var _package2 = _interopRequireDefault(_package);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('App'),
	    _JSON$parse = JSON.parse(_package2.default),
	    version = _JSON$parse.version;

	var App = function (_Component) {
	    _inherits(App, _Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    App.prototype.onInit = function onInit() {
	        var _this2 = this;

	        this._onTabChange = this._onTabChange.bind(this);

	        this.setState({ route: findRoute() });
	        (0, _router.onStateChange)(function () {
	            _this2.setState({ route: findRoute() });
	        });
	    };

	    App.prototype.onRender = function onRender() {
	        var _state$route = this.state.route,
	            route = _state$route[0],
	            tab = _state$route[1].tab,
	            RouteComponent = route.getData().Component,
	            introUrl = _router.routes.Intro.build();

	        return (0, _vidom.node)('div').setAttrs({
	            'class': b()
	        }).setChildren([(0, _vidom.node)('div').setAttrs({
	            'class': b('bar')
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'class': b('header')
	        }).setChildren((0, _vidom.normalizeChildren)([(0, _router.getCurrentUrl)() === introUrl ? 'Vidom UI' : (0, _vidom.node)(_Link2.default).setAttrs({
	            'url': introUrl
	        }).setChildren('Vidom UI'), '\xA0', (0, _vidom.node)('span').setAttrs({
	            'class': b('version')
	        }).setChildren((0, _vidom.normalizeChildren)(['v', version]))]))), (0, _vidom.node)('div').setAttrs({
	            'class': b('main')
	        }).setChildren([(0, _vidom.node)(_Nav2.default), (0, _vidom.node)('div').setAttrs({
	            'class': b('content')
	        }).setChildren((0, _vidom.node)(RouteComponent).setAttrs({
	            'tab': tab,
	            'onTabChange': this._onTabChange
	        }))]), (0, _vidom.node)('div').setAttrs({
	            'class': b('footer')
	        }).setChildren((0, _vidom.node)('a').setAttrs({
	            'href': 'https://github.com/dfilatov/vidom-ui',
	            'class': b('github-link')
	        }).setChildren([(0, _vidom.node)('svg').setNs('http://www.w3.org/2000/svg').setAttrs({
	            'height': '16',
	            'version': '1.1',
	            'viewBox': '0 0 16 16',
	            'width': '16'
	        }).setChildren((0, _vidom.node)('path').setAttrs({
	            'fill-rule': 'evenodd',
	            'd': 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'
	        })), (0, _vidom.node)('text').setChildren('\xA0 github')]))]);
	    };

	    App.prototype._onTabChange = function _onTabChange(tab) {
	        (0, _router.goTo)(this.state.route[0].build({ tab: tab }));
	    };

	    return App;
	}(_vidom.Component);

	exports.default = App;


	function findRoute() {
	    return _router2.default.findFirst((0, _router.getCurrentUrl)());
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.routes = undefined;
	exports.goTo = goTo;
	exports.onStateChange = onStateChange;
	exports.getCurrentUrl = getCurrentUrl;

	var _susanin = __webpack_require__(6);

	var _susanin2 = _interopRequireDefault(_susanin);

	var _Intro = __webpack_require__(9);

	var _Intro2 = _interopRequireDefault(_Intro);

	var _doc = __webpack_require__(66);

	var _doc2 = _interopRequireDefault(_doc);

	var _doc3 = __webpack_require__(139);

	var _doc4 = _interopRequireDefault(_doc3);

	var _doc5 = __webpack_require__(144);

	var _doc6 = _interopRequireDefault(_doc5);

	var _doc7 = __webpack_require__(149);

	var _doc8 = _interopRequireDefault(_doc7);

	var _doc9 = __webpack_require__(152);

	var _doc10 = _interopRequireDefault(_doc9);

	var _doc11 = __webpack_require__(161);

	var _doc12 = _interopRequireDefault(_doc11);

	var _doc13 = __webpack_require__(172);

	var _doc14 = _interopRequireDefault(_doc13);

	var _doc15 = __webpack_require__(175);

	var _doc16 = _interopRequireDefault(_doc15);

	var _doc17 = __webpack_require__(184);

	var _doc18 = _interopRequireDefault(_doc17);

	var _doc19 = __webpack_require__(189);

	var _doc20 = _interopRequireDefault(_doc19);

	var _doc21 = __webpack_require__(194);

	var _doc22 = _interopRequireDefault(_doc21);

	var _doc23 = __webpack_require__(203);

	var _doc24 = _interopRequireDefault(_doc23);

	var _doc25 = __webpack_require__(208);

	var _doc26 = _interopRequireDefault(_doc25);

	var _doc27 = __webpack_require__(215);

	var _doc28 = _interopRequireDefault(_doc27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = (0, _susanin2.default)();
	var url = document.location.pathname,
	    listener = void 0;

	window.addEventListener('popstate', function () {
	    url = document.location.pathname;
	    listener();
	});

	exports.default = router;
	var routes = exports.routes = {
	    Intro: router.addRoute({
	        pattern: '/',
	        data: { Component: _Intro2.default }
	    })
	};

	[_doc2.default, _doc4.default, _doc6.default, _doc8.default, _doc10.default, _doc12.default, _doc14.default, _doc16.default, _doc18.default, _doc20.default, _doc22.default, _doc24.default, _doc26.default, _doc28.default].reduce(function (res, Component) {
	    var name = Component.name.substr(0, Component.name.length - 3);

	    res[name] = router.addRoute({
	        pattern: '/' + name + '(/<tab>)',
	        data: { Component: Component },
	        defaults: { tab: 'Examples' }
	    });

	    return res;
	}, routes);

	function goTo(_url) {
	    url = _url;
	    window.history.pushState(null, null, url);
	    listener();
	}

	function onStateChange(_listener) {
	    listener = _listener;
	}

	function getCurrentUrl() {
	    return url;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Route = __webpack_require__(7);

	/**
	 * Creates new Router
	 * @constructor
	 */
	function Router() {
	    if (!(this instanceof Router)) {
	        return new Router();
	    }

	    this._routes = [];
	    this._routesByName = {};
	}

	/**
	 * Add route
	 * @param {RouteOptions} options
	 * @returns {Route}
	 */
	Router.prototype.addRoute = function (options) {
	    var route, name;

	    route = new Route(options);

	    this._routes.push(route);
	    name = route.getName();
	    name && (this._routesByName[name] = route);

	    return route;
	};

	/**
	 * Returns all successfully matched routes
	 * @returns {[ Route, Object ][]}
	 */
	Router.prototype.find = function () {
	    var ret = [],
	        parsed,
	        i,
	        size,
	        routes = this._routes;

	    for (i = 0, size = routes.length; i < size; ++i) {
	        parsed = routes[i].match.apply(routes[i], arguments);
	        if (parsed !== null) {
	            ret.push([routes[i], parsed]);
	        }
	    }

	    return ret;
	};

	/**
	 * Returns first successfully matched route
	 * @returns {[ Route, Object ]|null}
	 */
	Router.prototype.findFirst = function () {
	    var parsed,
	        i,
	        size,
	        routes = this._routes;

	    for (i = 0, size = routes.length; i < size; ++i) {
	        parsed = routes[i].match.apply(routes[i], arguments);
	        if (parsed !== null) {
	            return [routes[i], parsed];
	        }
	    }

	    return null;
	};

	/**
	 * Returns a route by its name
	 * @param {String} name
	 * @returns {Route}
	 */
	Router.prototype.getRouteByName = function (name) {
	    return this._routesByName[name] || null;
	};

	/**
	 * @static
	 * @type {Route}
	 */
	Router.Route = Route;

	module.exports = Router;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwnProp = Object.prototype.hasOwnProperty,


	/**
	 * @param {Object} ctx
	 * @param {String} name
	 * @returns {Boolean}
	 */
	has = function (ctx, name) {
	    return hasOwnProp.call(ctx, name);
	},
	    toString = Object.prototype.toString,


	/**
	 * @param {*} subject
	 * @returns {Boolean}
	 */
	isArray = function (subject) {
	    return toString.call(subject) === '[object Array]';
	};

	var querystring = __webpack_require__(8);

	/**
	 * @type {Function}
	 */
	var escape = function () {
	    var SPECIAL_CHARS = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'],
	        SPECIAL_CHARS_REGEXP = new RegExp('(\\' + SPECIAL_CHARS.join('|\\') + ')', 'g');

	    return function (text) {
	        return text.replace(SPECIAL_CHARS_REGEXP, '\\$1');
	    };
	}();

	/**
	 * @const
	 * @type {String}
	 */
	var EXPANDO = String(Math.random()).substr(2, 5);

	/**
	 * @const
	 * @type {String}
	 */
	var PARAM_OPENED_CHAR = '<';

	/**
	 * @const
	 * @type {String}
	 */
	var PARAM_CLOSED_CHAR = '>';

	/**
	 * @const
	 * @type {String}
	 */
	var GROUP_OPENED_CHAR = '(';

	/**
	 * @const
	 * @type {String}
	 */
	var GROUP_CLOSED_CHAR = ')';

	/**
	 * @const
	 * @type {String}
	 */
	var PARAM_NAME_REGEXP_SOURCE = '[a-zA-Z_][\\w\\-]*';

	/**
	 * @const
	 * @type {String}
	 */
	var PARAM_VALUE_REGEXP_SOURCE = '[\\w\\-\\.~]+';

	/**
	 * @const
	 * @type {RegExp}
	 */
	var PARSE_PARAMS_REGEXP = new RegExp('(' + escape(PARAM_OPENED_CHAR) + PARAM_NAME_REGEXP_SOURCE + escape(PARAM_CLOSED_CHAR) + '|' + '[^' + escape(PARAM_OPENED_CHAR) + escape(PARAM_CLOSED_CHAR) + ']+' + '|' + escape(PARAM_OPENED_CHAR) + '|' + escape(PARAM_CLOSED_CHAR) + ')', 'g');

	/**
	 * @const
	 * @type {String}
	 */
	var TRAILING_SLASH_PARAM_NAME = 'ts_' + EXPANDO;

	/**
	 * @const
	 * @type {String}
	 */
	var TRAILING_SLASH_PARAM_VALUE = '/';

	/**
	 * @const
	 * @type {String}
	 */
	var TRAILING_SLASH_PARAM_VALUE_ESCAPED = escape('/');

	/**
	 * @const
	 * @type {String}
	 */
	var QUERY_STRING_PARAM_NAME = 'qs_' + EXPANDO;

	/**
	 * @typedef {Object|String} RouteOptions If it's a string it means pattern for path match
	 * @property {String} [name] Name of the route
	 * @property {String} pattern Pattern for path match
	 * @property {Object} [conditions] Conditions for params in pattern
	 * @property {Object} [defaults] Defaults values for params in pattern
	 * @property {Object} [data] Data that will be bonded with route
	 * @property {Function} [postMatch] Function that will be applied after match method with its result
	 * @property {Function} [preBuild] Function that will be applied before build method with input params
	 * @property {Boolean} [isTrailingSlashOptional=true] If `true` trailing slash is optional
	 * @property {Boolean} [useQueryString=true] If `true` query string will be parsed and returned
	 */

	/**
	 * Creates new route
	 * @constructor
	 * @param {RouteOptions} options
	 */
	function Route(options) {
	    if (!(this instanceof Route)) {
	        return new Route(options);
	    }

	    typeof options === 'string' && (options = { pattern: options });

	    if (!options || typeof options !== 'object') {
	        throw new Error('You must specify options');
	    }

	    if (typeof options.pattern !== 'string') {
	        throw new Error('You must specify the pattern of the route');
	    }

	    /**
	     * @type {RouteOptions}
	     * @private
	     */
	    this._options = options;
	    this._conditions = options.conditions && typeof options.conditions === 'object' ? options.conditions : {};

	    if (options.isTrailingSlashOptional !== false) {
	        options.pattern += GROUP_OPENED_CHAR + PARAM_OPENED_CHAR + TRAILING_SLASH_PARAM_NAME + PARAM_CLOSED_CHAR + GROUP_CLOSED_CHAR;
	        this._conditions[TRAILING_SLASH_PARAM_NAME] = TRAILING_SLASH_PARAM_VALUE_ESCAPED;
	    }

	    options.pattern += GROUP_OPENED_CHAR + '?' + PARAM_OPENED_CHAR + QUERY_STRING_PARAM_NAME + PARAM_CLOSED_CHAR + GROUP_CLOSED_CHAR;
	    this._conditions[QUERY_STRING_PARAM_NAME] = '.*';

	    this._paramsMap = [];
	    this._mainParamsMap = {};
	    this._requiredParams = [];

	    /**
	     * @type {Array}
	     * @private
	     */
	    this._parts = this._parsePattern(options.pattern);

	    this._buildParseRegExp();
	    this._buildBuildFn();
	}

	/**
	 * @param {String} pattern
	 * @param {Boolean} [isOptional=false]
	 * @returns {Array}
	 * @private
	 */
	Route.prototype._parsePattern = function (pattern, isOptional) {
	    var parts = [],
	        part = '',
	        character,
	        i = 0,
	        j,
	        size,
	        countOpened = 0,
	        isFindingClosed = false,
	        length = pattern.length,
	        what;

	    while (i < length) {
	        character = pattern.charAt(i++);

	        if (character === GROUP_OPENED_CHAR) {
	            if (isFindingClosed) {
	                ++countOpened;
	                part += character;
	            } else {
	                this._parseParams(part, parts, isOptional);
	                part = '';
	                countOpened = 0;
	                isFindingClosed = true;
	            }
	        } else if (character === GROUP_CLOSED_CHAR) {
	            if (isFindingClosed) {
	                if (countOpened === 0) {
	                    part = {
	                        what: 'optional',
	                        dependOnParams: [],
	                        parts: this._parsePattern(part, true)
	                    };

	                    parts.push(part);

	                    for (j = 0, size = part.parts.length; j < size; ++j) {
	                        what = part.parts[j] && part.parts[j].what;

	                        if (what === 'param') {
	                            part.dependOnParams.push(part.parts[j].name);
	                        } else if (what === 'optional') {
	                            part.dependOnParams.push.apply(part.dependOnParams, part.parts[j].dependOnParams);
	                        }
	                    }

	                    part = '';
	                    isFindingClosed = false;
	                } else {
	                    --countOpened;
	                    part += character;
	                }
	            } else {
	                part += character;
	            }
	        } else {
	            part += character;
	        }
	    }

	    this._parseParams(part, parts, isOptional);

	    return parts;
	};

	/**
	 * @param {String} pattern
	 * @param {Array} parts
	 * @param {Boolean} isOptional
	 * @private
	 */
	Route.prototype._parseParams = function (pattern, parts, isOptional) {
	    var matches = pattern.match(PARSE_PARAMS_REGEXP),
	        i,
	        size,
	        part,
	        paramName;

	    if (matches) {
	        for (i = 0, size = matches.length; i < size; ++i) {
	            part = matches[i];

	            if (part.charAt(0) === PARAM_OPENED_CHAR && part.charAt(part.length - 1) === PARAM_CLOSED_CHAR) {
	                paramName = part.substr(1, part.length - 2);
	                this._paramsMap.push(paramName);
	                this._mainParamsMap[paramName] = true;
	                isOptional || this._requiredParams.push(paramName);

	                parts.push({
	                    what: 'param',
	                    name: paramName
	                });
	            } else {
	                parts.push(part);
	            }
	        }
	    }
	};

	/**
	 * @private
	 */
	Route.prototype._buildParseRegExp = function () {
	    this._parseRegExpSource = '^' + this._buildParseRegExpParts(this._parts) + '$';
	    this._parseRegExp = new RegExp(this._parseRegExpSource);
	};

	/**
	 * @param {Array} parts
	 * @returns {String}
	 * @private
	 */
	Route.prototype._buildParseRegExpParts = function (parts) {
	    var ret = '',
	        i,
	        size,
	        part;

	    for (i = 0, size = parts.length; i < size; ++i) {
	        part = parts[i];

	        if (typeof part === 'string') {
	            ret += escape(part);
	        } else if (part.what === 'param') {
	            ret += '(' + (this._getParamValueRegExpSource(part.name) || PARAM_VALUE_REGEXP_SOURCE) + ')';
	        } else {
	            ret += '(?:' + this._buildParseRegExpParts(part.parts) + ')?';
	        }
	    }

	    return ret;
	};

	/**
	 * @param {String} paramName
	 * @returns {?String}
	 * @private
	 */
	Route.prototype._getParamValueRegExpSource = function (paramName) {
	    var regExpSource,
	        regExpSources = this._conditionRegExpSources || (this._conditionRegExpSources = {}),
	        conditions = this._conditions,
	        condition;

	    if (!has(regExpSources, paramName)) {
	        if (has(conditions, paramName)) {
	            condition = conditions[paramName];
	            if (isArray(condition)) {
	                regExpSource = '(?:' + condition.join('|') + ')';
	            } else {
	                regExpSource = condition + '';
	            }
	        } else {
	            regExpSource = null;
	        }
	        regExpSources[paramName] = regExpSource;
	    }

	    return regExpSources[paramName];
	};

	/**
	 * @param {String} paramName
	 * @returns {?RegExp}
	 * @private
	 */
	Route.prototype._getParamValueRegExp = function (paramName) {
	    var regExpSource,
	        regExps = this._conditionRegExps || (this._conditionRegExps = {});

	    if (!has(regExps, paramName)) {
	        regExpSource = this._getParamValueRegExpSource(paramName);
	        regExps[paramName] = regExpSource ? new RegExp('^' + regExpSource + '$') : null;
	    }

	    return regExps[paramName];
	};

	/**
	 * @param {String} paramName
	 * @param {String} paramValue
	 * @private {Boolean}
	 */
	Route.prototype._checkParamValue = function (paramName, paramValue) {
	    var regExp = this._getParamValueRegExp(paramName);

	    return regExp ? regExp.test(paramValue) : true;
	};

	/**
	 * @private
	 */
	Route.prototype._buildBuildFn = function () {
	    this._buildFnSource = 'var h=({}).hasOwnProperty;return ' + this._buildBuildFnParts(this._parts) + ';';
	    /*jshint evil:true */
	    this._buildFn = new Function('p', this._buildFnSource);
	};

	/**
	 * @param {Array} parts
	 * @returns {String}
	 * @private
	 */
	Route.prototype._buildBuildFnParts = function (parts) {
	    var ret = '""',
	        i,
	        sizeI,
	        j,
	        sizeJ,
	        part,
	        name,
	        defaults = this._options.defaults;

	    for (i = 0, sizeI = parts.length; i < sizeI; ++i) {
	        part = parts[i];

	        if (typeof part === 'string') {
	            ret += '+"' + escape(part) + '"';
	        } else if (part.what === 'param') {
	            this._mainParamsMap[part.name] = true;
	            ret += '+(h.call(p,"' + escape(part.name) + '")?' + 'p["' + escape(part.name) + '"]:' + (defaults && has(defaults, part.name) ? '"' + escape(defaults[part.name]) + '"' : '""') + ')';
	        } else {
	            ret += '+((false';

	            for (j = 0, sizeJ = part.dependOnParams.length; j < sizeJ; ++j) {
	                name = part.dependOnParams[j];

	                ret += '||(h.call(p,"' + escape(name) + '")' + (defaults && has(defaults, name) ? '&&p["' + escape(name) + '"]!=="' + escape(defaults[name]) + '"' : '') + ')';
	            }

	            ret += ')?(' + this._buildBuildFnParts(part.parts) + '):"")';
	        }
	    }

	    return ret;
	};

	/**
	 * @param {Object|Function} data
	 * @returns {Boolean}
	 * @private
	 */
	Route.prototype._isDataMatched = function (data) {
	    var routeData = this._options.data,
	        key;

	    if (typeof data === 'function') {
	        return Boolean(data(routeData));
	    } else if (data && typeof data === 'object') {
	        for (key in data) {
	            if (has(data, key)) {
	                if (!routeData || typeof routeData !== 'object' || routeData[key] !== data[key]) {
	                    return false;
	                }
	            }
	        }
	    }

	    return true;
	};

	/**
	 * Matches path with route
	 * @param {String} path
	 * @param {Function|Object} [data]
	 * @returns {Object|null}
	 */
	Route.prototype.match = function (path, data) {
	    var ret = null,
	        matches,
	        i,
	        size,
	        paramName,
	        paramValue,
	        queryParams,
	        queryString,
	        options = this._options,
	        filter = options.postMatch,
	        defaults = options.defaults;

	    if (typeof path !== 'string' || data && !this._isDataMatched(data)) {
	        return ret;
	    }

	    matches = path.match(this._parseRegExp);

	    if (matches) {
	        ret = {};

	        for (i = 1, size = matches.length; i < size; ++i) {
	            if (typeof matches[i] !== 'undefined' && /* for IE lt 9*/matches[i] !== '') {
	                paramName = this._paramsMap[i - 1];
	                if (paramName === QUERY_STRING_PARAM_NAME) {
	                    queryString = matches[i];
	                } else if (paramName === TRAILING_SLASH_PARAM_NAME) {
	                    if (path.charAt(path.length - 2) === TRAILING_SLASH_PARAM_VALUE) {
	                        return null;
	                    }
	                } else {
	                    ret[paramName] = matches[i];
	                }
	            }
	        }

	        if (queryString && options.useQueryString !== false) {
	            queryParams = querystring.parse(queryString);
	            for (paramName in queryParams) {
	                if (has(queryParams, paramName) && !has(ret, paramName)) {
	                    paramValue = queryParams[paramName];
	                    if (this._mainParamsMap[paramName] && isArray(paramValue)) {
	                        paramValue = paramValue[0];
	                    }

	                    if (isArray(paramValue)) {
	                        ret[paramName] = [];
	                        for (i = 0, size = paramValue.length; i < size; ++i) {
	                            if (this._checkParamValue(paramName, paramValue[i])) {
	                                ret[paramName].push(paramValue[i]);
	                            }
	                        }
	                    } else if (this._checkParamValue(paramName, paramValue)) {
	                        ret[paramName] = paramValue;
	                    }
	                }
	            }
	        }

	        for (paramName in defaults) {
	            if (has(defaults, paramName) && !has(ret, paramName)) {
	                ret[paramName] = defaults[paramName];
	            }
	        }
	    }

	    if (ret && typeof filter === 'function') {
	        ret = filter(ret);
	        if (!(ret && typeof ret === 'object')) {
	            ret = null;
	        }
	    }

	    return ret;
	};

	/**
	 * Build path from params
	 * @param {Object} params
	 * @param {Boolean} [isStrict=false]
	 * @returns {?String}
	 */
	Route.prototype.build = function (params, isStrict) {
	    var options = this._options,
	        newParams = {},
	        useQueryString = options.useQueryString !== false,
	        queryParams = {},
	        queryString,
	        paramName,
	        paramValue,
	        filter = options.preBuild,
	        i,
	        size;

	    if (typeof filter === 'function') {
	        params = filter(params);
	    }

	    for (paramName in params) {
	        if (has(params, paramName) && params[paramName] !== null && typeof params[paramName] !== 'undefined' && (this._mainParamsMap[paramName] || useQueryString)) {
	            paramValue = params[paramName];
	            if (isStrict && !this._checkParamValue(paramName, paramValue)) {
	                return null;
	            }

	            (this._mainParamsMap[paramName] ? newParams : queryParams)[paramName] = paramValue;
	        }
	    }

	    if (isStrict) {
	        for (i = 0, size = this._requiredParams.length; i < size; ++i) {
	            if (!has(newParams, this._requiredParams[i])) {
	                return null;
	            }
	        }
	    }

	    if (useQueryString) {
	        queryString = querystring.stringify(queryParams);
	        queryString && (newParams[QUERY_STRING_PARAM_NAME] = queryString);
	    }

	    return this._buildFn(newParams);
	};

	/**
	 * Returns binded with route data
	 * @returns {*}
	 */
	Route.prototype.getData = function () {
	    return this._options.data;
	};

	/**
	 * Returns name of the route
	 * @returns {*}
	 */
	Route.prototype.getName = function () {
	    return this._options.name;
	};

	module.exports = Route;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var hasOwnProp = Object.prototype.hasOwnProperty,
	    toString = Object.prototype.toString,
	    isArray = function (subject) {
	    return toString.call(subject) === '[object Array]';
	};

	var querystring = {

	    /**
	     * @param {String} str
	     * @returns {String}
	     */
	    decode: function (str) {
	        var ret;

	        try {
	            ret = decodeURIComponent(str.replace(/\+/g, '%20'));
	        } catch (e) {
	            ret = str;
	        }

	        return ret;
	    },

	    /**
	     * Parse a string "param1=value1&param2=value2&param2&param3=value3"
	     * and return object:
	     * {
	     *     param1 : value1,
	     *     parma2 : [ value2, '' ],
	     *     param3 : value3
	     * }
	     * @link http://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq
	     * @param {String} query
	     * @param {String} [sep='&']
	     * @param {String} [eq='=']
	     * @returns {Object}
	     */
	    parse: function (query, sep, eq) {
	        var params = {},
	            queryParams,
	            value,
	            key,
	            i,
	            size,
	            pair,
	            idx;

	        if (typeof query !== 'string' || query === '') {
	            return params;
	        }

	        sep || (sep = '&');
	        eq || (eq = '=');

	        queryParams = query.split(sep);

	        for (i = 0, size = queryParams.length; i < size; ++i) {
	            pair = querystring.decode(queryParams[i]);
	            idx = pair.indexOf(eq);

	            if (idx >= 0) {
	                key = pair.substr(0, idx);
	                value = pair.substr(idx + 1);
	            } else {
	                key = pair;
	                value = '';
	            }

	            if (hasOwnProp.call(params, key)) {
	                if (!isArray(params[key])) {
	                    params[key] = [params[key], value];
	                } else {
	                    params[key].push(value);
	                }
	            } else {
	                params[key] = value;
	            }
	        }

	        return params;
	    },

	    /**
	     * Build querystring from object
	     * @link http://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq
	     * @param {Object} params
	     * @param {String} [sep='&']
	     * @param {String} [eq='=']
	     * @returns {String}
	     */
	    stringify: function (params, sep, eq) {
	        var query = '',
	            value,
	            typeOf,
	            tmpArray,
	            i,
	            size,
	            key;

	        if (!params) {
	            return query;
	        }

	        sep || (sep = '&');
	        eq || (eq = '=');

	        for (key in params) {
	            if (hasOwnProp.call(params, key)) {
	                tmpArray = [].concat(params[key]);
	                for (i = 0, size = tmpArray.length; i < size; ++i) {
	                    typeOf = typeof tmpArray[i];

	                    if (typeOf === 'object' || typeOf === 'undefined') {
	                        value = '';
	                    } else {
	                        value = encodeURIComponent(tmpArray[i]);
	                    }

	                    query += sep + encodeURIComponent(key) + eq + value;
	                }
	            }
	        }

	        return query.substr(sep.length);
	    }

	};

	module.exports = querystring;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Intro = __webpack_require__(10);

	var _Intro2 = _interopRequireDefault(_Intro);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Intro2.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = Intro;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _Link = __webpack_require__(63);

	var _Link2 = _interopRequireDefault(_Link);

	var _router = __webpack_require__(5);

	var _usage = __webpack_require__(65);

	var _usage2 = _interopRequireDefault(_usage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Intro() {
	    return (0, _vidom.node)(_Doc.DocPage).setChildren([(0, _vidom.node)(_Doc.DocHeader).setAttrs({
	        'level': '2'
	    }).setChildren('What is it?'), (0, _vidom.node)(_Doc.DocText).setChildren([(0, _vidom.node)('text').setChildren('A set of basic visual components are built with '), (0, _vidom.node)(_Link2.default).setAttrs({
	        'url': 'https://github.com/dfilatov/vidom'
	    }).setChildren('Vidom'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocHeader).setAttrs({
	        'level': '2'
	    }).setChildren('Which components are included?'), (0, _vidom.node)(_Doc.DocList).setChildren((0, _vidom.normalizeChildren)(Object.keys(_router.routes).filter(function (name) {
	        return name !== 'Intro';
	    }).sort().map(function (name) {
	        return (0, _vidom.node)(_Doc.DocListItem).setChildren((0, _vidom.node)(_Link2.default).setAttrs({
	            'url': _router.routes[name].build()
	        }).setChildren((0, _vidom.normalizeChildren)(name)));
	    }))), (0, _vidom.node)(_Doc.DocHeader).setAttrs({
	        'level': '2'
	    }).setChildren('How to install it?'), (0, _vidom.node)(_Doc.DocText).setChildren('Use npm:'), (0, _vidom.node)(_Doc.DocCode).setChildren('npm install --save vidom-ui'), (0, _vidom.node)(_Doc.DocHeader).setAttrs({
	        'level': '2'
	    }).setChildren('How to use it?'), (0, _vidom.node)(_Doc.DocCode).setAttrs({
	        'lang': 'jsx'
	    }).setChildren((0, _vidom.normalizeChildren)(_usage2.default)), (0, _vidom.node)(_Doc.DocText).setChildren('Also basic css should be included in your runtime:'), (0, _vidom.node)(_Doc.DocCode).setChildren('@import \'vidom/index.css\';'), (0, _vidom.node)(_Doc.DocText).setChildren('Vidom UI is bundled with "islands" theme. To use it include additional css:'), (0, _vidom.node)(_Doc.DocCode).setChildren('@import \'vidom/islands.css\';')]);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.DocLink = exports.DocListItem = exports.DocList = exports.DocText = exports.DocChildren = exports.DocHeader = exports.DocInlineCode = exports.DocCode = exports.DocExample = exports.DocAttr = exports.DocAttrs = exports.DocTab = exports.DocTabs = exports.DocComponent = exports.DocPage = undefined;

	var _DocPage = __webpack_require__(12);

	var _DocPage2 = _interopRequireDefault(_DocPage);

	var _DocComponent = __webpack_require__(14);

	var _DocComponent2 = _interopRequireDefault(_DocComponent);

	var _DocTabs = __webpack_require__(16);

	var _DocTabs2 = _interopRequireDefault(_DocTabs);

	var _DocTab = __webpack_require__(17);

	var _DocTab2 = _interopRequireDefault(_DocTab);

	var _DocAttrs = __webpack_require__(18);

	var _DocAttrs2 = _interopRequireDefault(_DocAttrs);

	var _DocAttr = __webpack_require__(19);

	var _DocAttr2 = _interopRequireDefault(_DocAttr);

	var _DocExample = __webpack_require__(22);

	var _DocExample2 = _interopRequireDefault(_DocExample);

	var _DocCode = __webpack_require__(23);

	var _DocCode2 = _interopRequireDefault(_DocCode);

	var _DocInlineCode = __webpack_require__(21);

	var _DocInlineCode2 = _interopRequireDefault(_DocInlineCode);

	var _DocHeader = __webpack_require__(15);

	var _DocHeader2 = _interopRequireDefault(_DocHeader);

	var _DocChildren = __webpack_require__(26);

	var _DocChildren2 = _interopRequireDefault(_DocChildren);

	var _DocText = __webpack_require__(20);

	var _DocText2 = _interopRequireDefault(_DocText);

	var _DocList = __webpack_require__(27);

	var _DocList2 = _interopRequireDefault(_DocList);

	var _DocListItem = __webpack_require__(28);

	var _DocListItem2 = _interopRequireDefault(_DocListItem);

	var _DocLink = __webpack_require__(29);

	var _DocLink2 = _interopRequireDefault(_DocLink);

	__webpack_require__(30);

	__webpack_require__(34);

	__webpack_require__(37);

	__webpack_require__(39);

	__webpack_require__(41);

	__webpack_require__(43);

	__webpack_require__(46);

	__webpack_require__(50);

	__webpack_require__(51);

	__webpack_require__(53);

	__webpack_require__(54);

	__webpack_require__(56);

	__webpack_require__(57);

	__webpack_require__(59);

	__webpack_require__(61);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.DocPage = _DocPage2.default;
	exports.DocComponent = _DocComponent2.default;
	exports.DocTabs = _DocTabs2.default;
	exports.DocTab = _DocTab2.default;
	exports.DocAttrs = _DocAttrs2.default;
	exports.DocAttr = _DocAttr2.default;
	exports.DocExample = _DocExample2.default;
	exports.DocCode = _DocCode2.default;
	exports.DocInlineCode = _DocInlineCode2.default;
	exports.DocHeader = _DocHeader2.default;
	exports.DocChildren = _DocChildren2.default;
	exports.DocText = _DocText2.default;
	exports.DocList = _DocList2.default;
	exports.DocListItem = _DocListItem2.default;
	exports.DocLink = _DocLink2.default;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocPage;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocPage');

	function DocPage(_, children) {
	    return (0, _vidom.node)('div').setAttrs({
	        'class': b()
	    }).setChildren((0, _vidom.node)('div').setAttrs({
	        'class': b('content')
	    }).setChildren((0, _vidom.normalizeChildren)(children)));
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = bem;
	var MOD_DELIM = '_',
	    ELEM_DELIM = '__';

	function bem(block) {
	    return function (elem, mods) {
	        if (typeof elem === 'object' && elem !== null) {
	            mods = elem;
	            elem = null;
	        }

	        var res = '',
	            entity = block;

	        if (elem) {
	            entity += ELEM_DELIM + elem;
	        }

	        res += entity;

	        if (mods) {
	            for (var modName in mods) {
	                var modVal = mods[modName];

	                if (modVal) {
	                    res += ' ' + entity + MOD_DELIM + modName;
	                    if (modVal !== true) {
	                        res += MOD_DELIM + modVal;
	                    }
	                }
	            }
	        }

	        return res;
	    };
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocComponent;

	var _vidom = __webpack_require__(1);

	var _DocHeader = __webpack_require__(15);

	var _DocHeader2 = _interopRequireDefault(_DocHeader);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocComponent');

	function DocComponent(_ref, children) {
	    var title = _ref.title;

	    return (0, _vidom.node)('div').setAttrs({
	        'class': b()
	    }).setChildren((0, _vidom.normalizeChildren)([(0, _vidom.node)(_DocHeader2.default).setAttrs({
	        'level': '2'
	    }).setChildren((0, _vidom.normalizeChildren)(title)), children]));
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocHeader;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocHeader');

	function DocHeader(_ref, children) {
	    var _ref$level = _ref.level,
	        level = _ref$level === undefined ? 1 : _ref$level;

	    var Tag = 'h' + level;

	    return (0, _vidom.node)(Tag).setAttrs({
	        'class': b({ level: level })
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocTabs;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocTabs');

	function DocTabs(_ref, children) {
	    var value = _ref.value,
	        onTabChange = _ref.onTabChange;

	    var tabs = [],
	        sheets = [];

	    children.forEach(function (tab) {
	        var tabValue = tab.attrs.value,
	            selected = value === tabValue;

	        tabs.push((0, _vidom.node)('h3').setAttrs({
	            'class': b('tab', { selected: selected }),
	            'onClick': selected ? null : function () {
	                onTabChange(tabValue);
	            }
	        }).setChildren((0, _vidom.normalizeChildren)(tab.attrs.title)));

	        sheets.push(tab.clone().setAttrs({ selected: selected }));
	    });

	    return (0, _vidom.node)('div').setAttrs({
	        'class': b()
	    }).setChildren([(0, _vidom.node)('div').setAttrs({
	        'class': b('tabs')
	    }).setChildren((0, _vidom.normalizeChildren)(tabs)), (0, _vidom.node)('div').setAttrs({
	        'class': b('sheets')
	    }).setChildren((0, _vidom.normalizeChildren)(sheets))]);
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocTab;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocTab');

	function DocTab(_ref, children) {
	    var selected = _ref.selected;

	    return (0, _vidom.node)('div').setAttrs({
	        'class': b({ selected: selected })
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocAttrs;

	var _vidom = __webpack_require__(1);

	var _DocHeader = __webpack_require__(15);

	var _DocHeader2 = _interopRequireDefault(_DocHeader);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocAttrs'),
	    thClass = b('th');

	function DocAttrs(_, children) {
	    return (0, _vidom.node)('fragment').setChildren([(0, _vidom.node)(_DocHeader2.default).setAttrs({
	        'level': '4'
	    }).setChildren('Attributes'), (0, _vidom.node)('table').setAttrs({
	        'class': b()
	    }).setChildren([(0, _vidom.node)('thead').setChildren([(0, _vidom.node)('th').setAttrs({
	        'class': thClass
	    }).setChildren('Name'), (0, _vidom.node)('th').setAttrs({
	        'class': thClass
	    }).setChildren('Type'), (0, _vidom.node)('th').setAttrs({
	        'class': thClass
	    }).setChildren('Required'), (0, _vidom.node)('th').setAttrs({
	        'class': thClass
	    }).setChildren('Default'), (0, _vidom.node)('th').setAttrs({
	        'class': thClass
	    }).setChildren('Description')]), (0, _vidom.node)('tbody').setChildren((0, _vidom.normalizeChildren)(children))])]);
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocAttr;

	var _vidom = __webpack_require__(1);

	var _DocText = __webpack_require__(20);

	var _DocText2 = _interopRequireDefault(_DocText);

	var _DocInlineCode = __webpack_require__(21);

	var _DocInlineCode2 = _interopRequireDefault(_DocInlineCode);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocAttr'),
	    nmClass = b('cell', { type: 'name' }),
	    typeClass = b('cell', { type: 'type' }),
	    requiredClass = b('cell', { type: 'required' }),
	    defClass = b('cell', { type: 'def' }),
	    descClass = b('cell', { type: 'desc' });

	function DocAttr(_ref, children) {
	    var name = _ref.name,
	        type = _ref.type,
	        required = _ref.required,
	        def = _ref.def;

	    return (0, _vidom.node)('tr').setAttrs({
	        'class': b()
	    }).setChildren([(0, _vidom.node)('td').setAttrs({
	        'class': nmClass
	    }).setChildren((0, _vidom.normalizeChildren)(name)), (0, _vidom.node)('td').setAttrs({
	        'class': typeClass
	    }).setChildren((0, _vidom.normalizeChildren)(type)), (0, _vidom.node)('td').setAttrs({
	        'class': requiredClass
	    }).setChildren((0, _vidom.normalizeChildren)(required ? '✓' : null)), (0, _vidom.node)('td').setAttrs({
	        'class': defClass
	    }).setChildren((0, _vidom.normalizeChildren)(def && (0, _vidom.node)(_DocInlineCode2.default).setChildren((0, _vidom.normalizeChildren)(def)))), (0, _vidom.node)('td').setAttrs({
	        'class': descClass
	    }).setChildren((0, _vidom.normalizeChildren)(children && (0, _vidom.node)(_DocText2.default).setChildren((0, _vidom.normalizeChildren)(children))))]);
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocText;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocText');

	function DocText(_, children) {
	    return (0, _vidom.node)('p').setAttrs({
	        'class': b()
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocInlineCode;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocInlineCode');

	function DocInlineCode(_, children) {
	    return (0, _vidom.node)('code').setAttrs({
	        'class': b()
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _DocCode = __webpack_require__(23);

	var _DocCode2 = _interopRequireDefault(_DocCode);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('DocExample');

	var DocExample = function (_Component) {
	    _inherits(DocExample, _Component);

	    function DocExample() {
	        _classCallCheck(this, DocExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    DocExample.prototype.onInit = function onInit() {
	        this._onCodeToggleClick = this._onCodeToggleClick.bind(this);

	        this.setState({ codeShown: false });
	    };

	    DocExample.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            title = _attrs.title,
	            code = _attrs.code,
	            codeShown = this.state.codeShown;


	        return (0, _vidom.node)('div').setAttrs({
	            'class': b()
	        }).setChildren([(0, _vidom.node)('h3').setAttrs({
	            'class': b('title')
	        }).setChildren((0, _vidom.normalizeChildren)([title, (0, _vidom.node)('span').setAttrs({
	            'class': b('code-toggle'),
	            'onClick': this._onCodeToggleClick,
	            'title': (codeShown ? 'hide' : 'show') + ' code'
	        }).setChildren('</>')])), (0, _vidom.node)('div').setAttrs({
	            'class': b('code', { shown: codeShown })
	        }).setChildren((0, _vidom.normalizeChildren)(codeShown ? (0, _vidom.node)(_DocCode2.default).setAttrs({
	            'lang': 'jsx'
	        }).setChildren((0, _vidom.normalizeChildren)(code)) : null)), (0, _vidom.node)('div').setAttrs({
	            'class': b('content')
	        }).setChildren((0, _vidom.normalizeChildren)(this.children))]);
	    };

	    DocExample.prototype._onCodeToggleClick = function _onCodeToggleClick() {
	        this.setState({ codeShown: !this.state.codeShown });
	    };

	    return DocExample;
	}(_vidom.Component);

	exports.default = DocExample;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocCode;

	var _vidom = __webpack_require__(1);

	var _prismjs = __webpack_require__(24);

	__webpack_require__(25);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocCode');

	function DocCode(_ref, children) {
	    var lang = _ref.lang;

	    return lang === 'jsx' ? (0, _vidom.node)('pre').setAttrs({
	        'class': b() + ' language-jsx'
	    }).setChildren((0, _vidom.node)('code').setHtml((0, _prismjs.highlight)(children, _prismjs.languages.jsx))) : (0, _vidom.node)('pre').setAttrs({
	        'class': b({ simple: true })
	    }).setChildren((0, _vidom.node)('code').setChildren((0, _vidom.normalizeChildren)(children)));
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	var _self = typeof window !== 'undefined' ? window // if in browser
	: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
	: {} // if in node js
	;

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 * MIT license http://www.opensource.org/licenses/mit-license.php/
	 * @author Lea Verou http://lea.verou.me
	 */

	var Prism = function () {

		// Private helper vars
		var lang = /\blang(?:uage)?-(\w+)\b/i;
		var uniqueId = 0;

		var _ = _self.Prism = {
			util: {
				encode: function (tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
					} else if (_.util.type(tokens) === 'Array') {
						return tokens.map(_.util.encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				type: function (o) {
					return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
				},

				objId: function (obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				// Deep clone a language definition (e.g. to extend it)
				clone: function (o) {
					var type = _.util.type(o);

					switch (type) {
						case 'Object':
							var clone = {};

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = _.util.clone(o[key]);
								}
							}

							return clone;

						case 'Array':
							// Check for existence for IE8
							return o.map && o.map(function (v) {
								return _.util.clone(v);
							});
					}

					return o;
				}
			},

			languages: {
				extend: function (id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
	    * Insert a token before another token in a language literal
	    * As this needs to recreate the object (we cannot actually insert before keys in object literals),
	    * we cannot just provide an object, we need anobject and a key.
	    * @param inside The key (or language id) of the parent
	    * @param before The key to insert before. If not provided, the function appends instead.
	    * @param insert Object with the key/value pairs to insert
	    * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
	    */
				insertBefore: function (inside, before, insert, root) {
					root = root || _.languages;
					var grammar = root[inside];

					if (arguments.length == 2) {
						insert = arguments[1];

						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								grammar[newToken] = insert[newToken];
							}
						}

						return grammar;
					}

					var ret = {};

					for (var token in grammar) {

						if (grammar.hasOwnProperty(token)) {

							if (token == before) {

								for (var newToken in insert) {

									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							ret[token] = grammar[token];
						}
					}

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === root[inside] && key != inside) {
							this[key] = ret;
						}
					});

					return root[inside] = ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function (o, callback, type, visited) {
					visited = visited || {};
					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, null, visited);
							} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, i, visited);
							}
						}
					}
				}
			},
			plugins: {},

			highlightAll: function (async, callback) {
				var env = {
					callback: callback,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run("before-highlightall", env);

				var elements = env.elements || document.querySelectorAll(env.selector);

				for (var i = 0, element; element = elements[i++];) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			highlightElement: function (element, async, callback) {
				// Find language
				var language,
				    grammar,
				    parent = element;

				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
					grammar = _.languages[language];
				}

				// Set language on the element, if not present
				element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

				// Set language on the parent, for styling
				parent = element.parentNode;

				if (/pre/i.test(parent.nodeName)) {
					parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				_.hooks.run('before-sanity-check', env);

				if (!env.code || !env.grammar) {
					if (env.code) {
						env.element.textContent = env.code;
					}
					_.hooks.run('complete', env);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						env.highlightedCode = evt.data;

						_.hooks.run('before-insert', env);

						env.element.innerHTML = env.highlightedCode;

						callback && callback.call(env.element);
						_.hooks.run('after-highlight', env);
						_.hooks.run('complete', env);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(element);

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				}
			},

			highlight: function (text, grammar, language) {
				var tokens = _.tokenize(text, grammar);
				return Token.stringify(_.util.encode(tokens), language);
			},

			tokenize: function (text, grammar, language) {
				var Token = _.Token;

				var strarr = [text];

				var rest = grammar.rest;

				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				tokenloop: for (var token in grammar) {
					if (!grammar.hasOwnProperty(token) || !grammar[token]) {
						continue;
					}

					var patterns = grammar[token];
					patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

					for (var j = 0; j < patterns.length; ++j) {
						var pattern = patterns[j],
						    inside = pattern.inside,
						    lookbehind = !!pattern.lookbehind,
						    greedy = !!pattern.greedy,
						    lookbehindLength = 0,
						    alias = pattern.alias;

						if (greedy && !pattern.pattern.global) {
							// Without the global flag, lastIndex won't work
							var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
							pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
						}

						pattern = pattern.pattern || pattern;

						// Don’t cache length as it changes during the loop
						for (var i = 0, pos = 0; i < strarr.length; pos += strarr[i].length, ++i) {

							var str = strarr[i];

							if (strarr.length > text.length) {
								// Something went terribly wrong, ABORT, ABORT!
								break tokenloop;
							}

							if (str instanceof Token) {
								continue;
							}

							pattern.lastIndex = 0;

							var match = pattern.exec(str),
							    delNum = 1;

							// Greedy patterns can override/remove up to two previously matched tokens
							if (!match && greedy && i != strarr.length - 1) {
								pattern.lastIndex = pos;
								match = pattern.exec(text);
								if (!match) {
									break;
								}

								var from = match.index + (lookbehind ? match[1].length : 0),
								    to = match.index + match[0].length,
								    k = i,
								    p = pos;

								for (var len = strarr.length; k < len && p < to; ++k) {
									p += strarr[k].length;
									// Move the index i to the element in strarr that is closest to from
									if (from >= p) {
										++i;
										pos = p;
									}
								}

								/*
	        * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
	        * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
	        */
								if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
									continue;
								}

								// Number of tokens to delete and replace with the new match
								delNum = k - i;
								str = text.slice(pos, p);
								match.index -= pos;
							}

							if (!match) {
								continue;
							}

							if (lookbehind) {
								lookbehindLength = match[1].length;
							}

							var from = match.index + lookbehindLength,
							    match = match[0].slice(lookbehindLength),
							    to = from + match.length,
							    before = str.slice(0, from),
							    after = str.slice(to);

							var args = [i, delNum];

							if (before) {
								args.push(before);
							}

							var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

							args.push(wrapped);

							if (after) {
								args.push(after);
							}

							Array.prototype.splice.apply(strarr, args);
						}
					}
				}

				return strarr;
			},

			hooks: {
				all: {},

				add: function (name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				run: function (name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; callback = callbacks[i++];) {
						callback(env);
					}
				}
			}
		};

		var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
			this.type = type;
			this.content = content;
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || "").length | 0;
			this.greedy = !!greedy;
		};

		Token.stringify = function (o, language, parent) {
			if (typeof o == 'string') {
				return o;
			}

			if (_.util.type(o) === 'Array') {
				return o.map(function (element) {
					return Token.stringify(element, language, o);
				}).join('');
			}

			var env = {
				type: o.type,
				content: Token.stringify(o.content, language, parent),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language,
				parent: parent
			};

			if (env.type == 'comment') {
				env.attributes['spellcheck'] = 'true';
			}

			if (o.alias) {
				var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
				Array.prototype.push.apply(env.classes, aliases);
			}

			_.hooks.run('wrap', env);

			var attributes = Object.keys(env.attributes).map(function (name) {
				return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}).join(' ');

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
		};

		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _self.Prism;
			}
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data),
				    lang = message.language,
				    code = message.code,
				    immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);

			return _self.Prism;
		}

		//Get current script and highlight
		var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

		if (script) {
			_.filename = script.src;

			if (document.addEventListener && !script.hasAttribute('data-manual')) {
				if (document.readyState !== "loading") {
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(_.highlightAll);
					} else {
						window.setTimeout(_.highlightAll, 16);
					}
				} else {
					document.addEventListener('DOMContentLoaded', _.highlightAll);
				}
			}
		}

		return _self.Prism;
	}();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof global !== 'undefined') {
		global.Prism = Prism;
	}

	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': /<!--[\w\W]*?-->/,
		'prolog': /<\?[\w\W]+?\?>/,
		'doctype': /<!DOCTYPE[\w\W]+?>/i,
		'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/i,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'attr-value': {
					pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
					inside: {
						'punctuation': /[=>"']/
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': /&#?[\da-z]{1,8};/i
	};

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function (env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Prism.languages.xml = Prism.languages.markup;
	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	Prism.languages.css = {
		'comment': /\/\*[\w\W]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
		'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
		'string': {
			pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'property': /(\b|\B)[\w-]+(?=\s*:)/i,
		'important': /\B!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'style': {
				pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
				lookbehind: true,
				inside: Prism.languages.css,
				alias: 'language-css'
			}
		});

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|').*?\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: Prism.languages.markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, Prism.languages.markup.tag);
	}

	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}],
		'string': {
			pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
			lookbehind: true,
			inside: {
				punctuation: /(\.|\\)/
			}
		},
		'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
		'boolean': /\b(true|false)\b/,
		'function': /[a-z0-9_]+(?=\()/i,
		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		'punctuation': /[{}[\];(),.:]/
	};

	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
		'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
	});

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
			lookbehind: true,
			greedy: true
		}
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\\\|\\?[^\\])*?`/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /\$\{[^}]+\}/,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		}
	});

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'script': {
				pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript,
				alias: 'language-javascript'
			}
		});
	}

	Prism.languages.js = Prism.languages.javascript;

	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {
		if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
			return;
		}

		self.Prism.fileHighlight = function () {

			var Extensions = {
				'js': 'javascript',
				'py': 'python',
				'rb': 'ruby',
				'ps1': 'powershell',
				'psm1': 'powershell',
				'sh': 'bash',
				'bat': 'batch',
				'h': 'c',
				'tex': 'latex'
			};

			if (Array.prototype.forEach) {
				// Check to prevent error in IE8
				Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
					var src = pre.getAttribute('data-src');

					var language,
					    parent = pre;
					var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
					while (parent && !lang.test(parent.className)) {
						parent = parent.parentNode;
					}

					if (parent) {
						language = (pre.className.match(lang) || [, ''])[1];
					}

					if (!language) {
						var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
						language = Extensions[extension] || extension;
					}

					var code = document.createElement('code');
					code.className = 'language-' + language;

					pre.textContent = '';

					code.textContent = 'Loading…';

					pre.appendChild(code);

					var xhr = new XMLHttpRequest();

					xhr.open('GET', src, true);

					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4) {

							if (xhr.status < 400 && xhr.responseText) {
								code.textContent = xhr.responseText;

								Prism.highlightElement(code);
							} else if (xhr.status >= 400) {
								code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
							} else {
								code.textContent = '✖ Error: File does not exist or is empty';
							}
						}
					};

					xhr.send(null);
				});
			}
		};

		document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	(function (Prism) {

		var javascript = Prism.util.clone(Prism.languages.javascript);

		Prism.languages.jsx = Prism.languages.extend('markup', javascript);
		Prism.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;

		Prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

		var jsxExpression = Prism.util.clone(Prism.languages.jsx);

		delete jsxExpression.punctuation;

		jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
			'punctuation': /=(?={)|[{}[\];(),.:]/
		}, { jsx: jsxExpression });

		Prism.languages.insertBefore('inside', 'attr-value', {
			'script': {
				// Allow for one level of nesting
				pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
				inside: jsxExpression,
				'alias': 'language-javascript'
			}
		}, Prism.languages.jsx.tag);
	})(Prism);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = DocChildren;

	var _vidom = __webpack_require__(1);

	var _DocHeader = __webpack_require__(15);

	var _DocHeader2 = _interopRequireDefault(_DocHeader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function DocChildren(_, children) {
	    return (0, _vidom.node)("fragment").setChildren((0, _vidom.normalizeChildren)([(0, _vidom.node)(_DocHeader2.default).setAttrs({
	        "level": "4"
	    }).setChildren("Children"), children]));
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocList;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocList');

	function DocList(_, children) {
	    return (0, _vidom.node)('ul').setAttrs({
	        'class': b()
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocList;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocListItem');

	function DocList(_, children) {
	    return (0, _vidom.node)('li').setAttrs({
	        'class': b()
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = DocLink;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('DocLink');

	function DocLink(_ref, children) {
	    var url = _ref.url,
	        onClick = _ref.onClick;

	    return (0, _vidom.node)('a').setAttrs({
	        'class': b(),
	        'href': url,
	        'onClick': onClick
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocPage.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocPage.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocPage {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background: #fff;\n}\n.DocPage:before,\n    .DocPage:after\n    {\n    position: absolute;\n    z-index: 2;\n    height: 10px;\n    left: 0;\n    right: 0;\n    content: '';\n    pointer-events: none;\n}\n.DocPage:before\n    {\n    top: 0;\n    background: -webkit-linear-gradient(#fff 2px, rgba(255, 255, 255, 0));\n    background: linear-gradient(#fff 2px, rgba(255, 255, 255, 0));\n}\n.DocPage:after\n    {\n    bottom: 0;\n    background: -webkit-linear-gradient(rgba(255, 255, 255, 0), #fff 8px);\n    background: linear-gradient(rgba(255, 255, 255, 0), #fff 8px);\n}\n.DocPage__content {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    padding: 15px 15px 0;\n    overflow: auto;\n}\n.DocPage__content>*:last-child {\n    /* for ff, it ignores bottom padding */\n    margin-bottom: 15px;\n}\n", ""]);

	// exports


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocComponent.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocComponent.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(36), "");

	// module
	exports.push([module.id, ".DocComponent {\n    position: absolute;\n    left: 0;\n    top: 15px;\n    right: 0;\n    bottom: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n\n.DocComponent .DocHeader_level_2 {\n    margin-left: 15px;\n}\n", ""]);

	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocHeader {\n    margin: 0;\n    padding: 0;\n}\n.DocHeader_level_2 {\n    margin: 25px 0 10px;\n    font-size: 20px;\n    line-height: 22px;\n}\n.DocHeader_level_4 {\n    margin: 20px 0 10px;\n    font-size: 15px;\n}\n.DocHeader:first-child {\n    margin-top: 0;\n}\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocTabs.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocTabs.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocTabs {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.DocTabs__tab {\n    display: inline-block;\n    position: relative;\n    margin: 0;\n    padding: 10px 15px;\n    font-size: 15px;\n    font-weight: normal;\n    cursor: pointer;\n    color: #666;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    -webkit-transition: background .2s, color .2s;\n    transition: background .2s, color .2s;\n}\n.DocTabs__tab:hover {\n    color: #000;\n}\n.DocTabs__tab_selected {\n    cursor: default;\n    color: inherit;\n    background: #fff;\n}\n.DocTabs__sheets {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.DocTabs__sheets:before,\n        .DocTabs__sheets:after\n        {\n    position: absolute;\n    z-index: 2;\n    height: 10px;\n    left: 0;\n    right: 0;\n    content: '';\n    pointer-events: none;\n}\n.DocTabs__sheets:before\n        {\n    top: 0;\n    background: -webkit-linear-gradient(#fff 2px, rgba(255, 255, 255, 0));\n    background: linear-gradient(#fff 2px, rgba(255, 255, 255, 0));\n}\n.DocTabs__sheets:after\n        {\n    bottom: 0;\n    background: -webkit-linear-gradient(rgba(255, 255, 255, 0), #fff 8px);\n    background: linear-gradient(rgba(255, 255, 255, 0), #fff 8px);\n}\n", ""]);

	// exports


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocTab.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocTab.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocTab {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    display: none;\n    padding: 15px 15px 0;\n    background: #fff;\n    overflow: auto;\n}\n.DocTab_selected {\n    display: block;\n}\n.DocTab>*:last-child /* for ff, it ignores bottom padding */\n    {\n    margin-bottom: 15px;\n}\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(42);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocAttrs.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocAttrs.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(36), "");

	// module
	exports.push([module.id, ".DocAttrs {\n    margin-left: -7px;\n    border-collapse: collapse;\n    border-spacing: 0;\n    font-size: 15px;\n}\n\n.DocAttrs__th {\n    font-weight: normal;\n    padding: 7px;\n    color: #666;\n    text-align: left;\n}\n", ""]);

	// exports


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(44);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocAttr.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocAttr.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(45), "");

	// module
	exports.push([module.id, ".DocAttr__cell {\n\n    padding: 6px 7px 8px;\n\n    vertical-align: baseline;\n\n    line-height: 20px;\n\n    -webkit-transition: background .1s;\n\n    transition: background .1s;\n}\n\n.DocAttr__cell_type_name {\n\n    color: #7da729;\n}\n\n.DocAttr__cell_type_type {\n\n    color: #6161af;\n}\n\n.DocAttr__cell_type_required {\n\n    color: #e85253;\n\n    text-align: center;\n}\n\n.DocAttr:hover .DocAttr__cell {\n\n    background: #f5f5f5;\n}\n", ""]);

	// exports


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocText {\n    margin: 0;\n    padding: 0;\n    font-size: 15px;\n    line-height: 20px;\n    max-width: 600px;\n}\n.DocText+.DocText {\n    margin-top: 10px;\n}\n", ""]);

	// exports


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocExample.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocExample.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(48), "");

	// module
	exports.push([module.id, ".DocExample+.DocExample {\n\n    margin-top: 20px;\n}\n\n.DocExample__title {\n\n    margin: 0;\n\n    font-size: 15px;\n}\n\n.DocExample__content {\n\n    margin: 10px 0 0;\n}\n\n.DocExample__code-toggle {\n\n    margin-left: 10px;\n\n    vertical-align: top;\n\n    color: #999;\n\n    cursor: pointer;\n\n    font-family: Verdana;\n\n    font-size: 10px;\n\n    font-weight: normal;\n}\n\n.DocExample__code-toggle:hover {\n\n    color: red;\n}\n", ""]);

	// exports


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(49), "");

	// module
	exports.push([module.id, ".DocCode {\n    border: 0 !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n    background: #212121 !important;\n}\n\n.DocCode_simple {\n    color: #fff;\n    padding: 15px;\n}\n", ""]);

	// exports


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, "/* http://prismjs.com/download.html?themes=prism-twilight&languages=markup+css+clike+javascript */\n/**\n * prism.js Twilight theme\n * Based (more or less) on the Twilight theme originally of Textmate fame.\n * @author Remy Bach\n */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: white;\n\tbackground: none;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\ttext-shadow: 0 -.1em .2em black;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"],\n:not(pre) > code[class*=\"language-\"] {\n\tbackground: hsl(0, 0%, 8%); /* #141414 */\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tborder-radius: .5em;\n\tborder: .3em solid hsl(0, 0%, 33%); /* #282A2B */\n\tbox-shadow: 1px 1px .5em black inset;\n\tmargin: .5em 0;\n\toverflow: auto;\n\tpadding: 1em;\n}\n\npre[class*=\"language-\"]::-moz-selection {\n\t/* Firefox */\n\tbackground: hsl(200, 4%, 16%); /* #282A2B */\n}\n\npre[class*=\"language-\"]::selection {\n\t/* Safari */\n\tbackground: hsl(200, 4%, 16%); /* #282A2B */\n}\n\n/* Text Selection colour */\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: hsla(0, 0%, 93%, 0.15); /* #EDEDED */\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: hsla(0, 0%, 93%, 0.15); /* #EDEDED */\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tborder-radius: .3em;\n\tborder: .13em solid hsl(0, 0%, 33%); /* #545454 */\n\tbox-shadow: 1px 1px .3em -.1em black inset;\n\tpadding: .15em .2em .05em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: hsl(0, 0%, 47%); /* #777777 */\n}\n\n.token.punctuation {\n\topacity: .7;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.tag,\n.token.boolean,\n.token.number,\n.token.deleted {\n\tcolor: hsl(14, 58%, 55%); /* #CF6A4C */\n}\n\n.token.keyword,\n.token.property,\n.token.selector,\n.token.constant,\n.token.symbol,\n.token.builtin {\n\tcolor: hsl(53, 89%, 79%); /* #F9EE98 */\n}\n\n.token.attr-name,\n.token.attr-value,\n.token.string,\n.token.char,\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable,\n.token.inserted {\n\tcolor: hsl(76, 21%, 52%); /* #8F9D6A */\n}\n\n.token.atrule {\n\tcolor: hsl(218, 22%, 55%); /* #7587A6 */\n}\n\n.token.regex,\n.token.important {\n\tcolor: hsl(42, 75%, 65%); /* #E9C062 */\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n\npre[data-line] {\n\tpadding: 1em 0 1em 3em;\n\tposition: relative;\n}\n\n/* Markup */\n.language-markup .token.tag,\n.language-markup .token.attr-name,\n.language-markup .token.punctuation {\n\tcolor: hsl(33, 33%, 52%); /* #AC885B */\n}\n\n/* Make the tokens sit above the line highlight so the colours don't look faded. */\n.token {\n\tposition: relative;\n\tz-index: 1;\n}\n\n.line-highlight {\n\tbackground: hsla(0, 0%, 33%, 0.25); /* #545454 */\n\tbackground: -webkit-linear-gradient(left, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0));\n\tbackground: linear-gradient(to right, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0)); /* #545454 */\n\tborder-bottom: 1px dashed hsl(0, 0%, 33%); /* #545454 */\n\tborder-top: 1px dashed hsl(0, 0%, 33%); /* #545454 */\n\tleft: 0;\n\tline-height: inherit;\n\tmargin-top: 0.75em; /* Same as .prism’s padding-top */\n\tpadding: inherit 0;\n\tpointer-events: none;\n\tposition: absolute;\n\tright: 0;\n\twhite-space: pre;\n\tz-index: 0;\n}\n\n.line-highlight:before,\n.line-highlight[data-end]:after {\n\tbackground-color: hsl(215, 15%, 59%); /* #8794A6 */\n\tborder-radius: 999px;\n\tbox-shadow: 0 1px white;\n\tcolor: hsl(24, 20%, 95%); /* #F5F2F0 */\n\tcontent: attr(data-start);\n\tfont: bold 65%/1.5 sans-serif;\n\tleft: .6em;\n\tmin-width: 1em;\n\tpadding: 0 .5em;\n\tposition: absolute;\n\ttext-align: center;\n\ttext-shadow: none;\n\ttop: .4em;\n\tvertical-align: .3em;\n}\n\n.line-highlight[data-end]:after {\n\tbottom: .4em;\n\tcontent: attr(data-end);\n\ttop: auto;\n}\n\n", ""]);

	// exports


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocCode.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocCode.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(52);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocInlineCode.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocInlineCode.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocInlineCode {\n    padding: 1px 2px;\n    font: 13px/16px Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n    color: #666;\n}\n", ""]);

	// exports


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocHeader.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocHeader.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocChildren.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocChildren.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(36), "");

	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocText.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocText.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocList.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocList.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocList {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    font-size: 15px;\n}\n", ""]);

	// exports


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocListItem.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocListItem.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocListItem {\n    position: relative;\n    margin: 0 0 0 15px;\n    padding: 0;\n}\n.DocListItem:before\n    {\n    position: absolute;\n    left: -13px;\n    content: '\\203A';\n    color: #a6a6a6;\n}\n.DocListItem+.DocListItem {\n    margin-top: 10px;\n}\n", ""]);

	// exports


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(62);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocLink.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./DocLink.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".DocLink {\n    text-decoration: none;\n    color: #04b;\n}\n", ""]);

	// exports


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Link = __webpack_require__(64);

	var _Link2 = _interopRequireDefault(_Link);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Link2.default;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _router = __webpack_require__(5);

	var _Doc = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Link = function (_Component) {
	    _inherits(Link, _Component);

	    function Link() {
	        _classCallCheck(this, Link);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Link.prototype.onInit = function onInit() {
	        this._onClick = this._onClick.bind(this);
	    };

	    Link.prototype.onRender = function onRender() {
	        return (0, _vidom.node)(_Doc.DocLink).setAttrs({
	            'url': this.attrs.url,
	            'onClick': this._onClick
	        }).setChildren((0, _vidom.normalizeChildren)(this.children));
	    };

	    Link.prototype._onClick = function _onClick(e) {
	        if (!e.nativeEvent.button) {
	            var url = this.attrs.url;


	            if (url[0] === '/') {
	                e.preventDefault();
	                (0, _router.goTo)(url);
	            }
	        }
	    };

	    return Link;
	}(_vidom.Component);

	exports.default = Link;

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "import { Button } from 'vidom-ui';\nimport { Component, mount } from 'vidom';\n\nclass App extends Component {\n    onRender() {\n        return (\n            <div class=\"App\">\n                <Button\n                    theme=\"islands\"\n                    size=\"m\"\n                    text=\"click me!\"\n                />\n            </div>\n        );\n    }\n}\n\nmount(document.body, <App/>);\n\n"

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = ButtonDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(67);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _ActionExample = __webpack_require__(130);

	var _ActionExample2 = _interopRequireDefault(_ActionExample);

	var _IconExample = __webpack_require__(131);

	var _IconExample2 = _interopRequireDefault(_IconExample);

	var _LinkExample = __webpack_require__(132);

	var _LinkExample2 = _interopRequireDefault(_LinkExample);

	var _DisabledExample = __webpack_require__(133);

	var _DisabledExample2 = _interopRequireDefault(_DisabledExample);

	var _SimpleExample3 = __webpack_require__(134);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _ActionExample3 = __webpack_require__(135);

	var _ActionExample4 = _interopRequireDefault(_ActionExample3);

	var _IconExample3 = __webpack_require__(136);

	var _IconExample4 = _interopRequireDefault(_IconExample3);

	var _LinkExample3 = __webpack_require__(137);

	var _LinkExample4 = _interopRequireDefault(_LinkExample3);

	var _DisabledExample3 = __webpack_require__(138);

	var _DisabledExample4 = _interopRequireDefault(_DisabledExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ButtonDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Button'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Action',
	        'code': _ActionExample4.default
	    }).setChildren((0, _vidom.node)(_ActionExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Icon',
	        'code': _IconExample4.default
	    }).setChildren((0, _vidom.node)(_IconExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Link',
	        'code': _LinkExample4.default
	    }).setChildren((0, _vidom.node)(_LinkExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Disabled',
	        'code': _DisabledExample4.default
	    }).setChildren((0, _vidom.node)(_DisabledExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'beforeIcon',
	        'type': 'VNode'
	    }).setChildren('Adds the icon before the text.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Disables the button if set to true.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Focuses the button if set to true.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mix',
	        'type': 'String'
	    }).setChildren('Additional css class.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onClick',
	        'type': 'Function'
	    }).setChildren('The callback to handle click event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the button size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'target',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the link target.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('It is used only if the '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren(' attribute is set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('link'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'text',
	        'type': 'String'
	    }).setChildren('The text to display inside the button.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the button theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'title',
	        'type': 'String'
	    }).setChildren('The title displayed as a tooltip.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'type',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables additional behaviour according to the passed value.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('submit'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('link'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'view',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables additional appearance to the button.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('action'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('plain'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'url',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('The URL to link to when the button is clicked.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('It is used only if the '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren(' attribute is set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('link'), (0, _vidom.node)('text').setChildren('.')])]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children are not allowed and ignored.'))])]));
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ text: 'Click me' });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var text = this.state.text;


	        return (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                return _this2.setState({ text: 'I\'m clicked' });
	            },
	            'text': text
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.TextInput = exports.TextArea = exports.Spinner = exports.SelectOptionGroup = exports.SelectOption = exports.Select = exports.RadioGroup = exports.Radio = exports.Popup = exports.Modal = exports.MenuItemGroup = exports.MenuItem = exports.Menu = exports.Link = exports.Icon = exports.CheckBoxGroup = exports.CheckBox = exports.Button = undefined;

	var _Button = __webpack_require__(69);

	var _Button2 = _interopRequireDefault(_Button);

	var _CheckBox = __webpack_require__(77);

	var _CheckBox2 = _interopRequireDefault(_CheckBox);

	var _CheckBoxGroup = __webpack_require__(81);

	var _CheckBoxGroup2 = _interopRequireDefault(_CheckBoxGroup);

	var _Icon = __webpack_require__(83);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _Link = __webpack_require__(87);

	var _Link2 = _interopRequireDefault(_Link);

	var _Menu = __webpack_require__(91);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Modal = __webpack_require__(97);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Popup = __webpack_require__(106);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _Radio = __webpack_require__(110);

	var _Radio2 = _interopRequireDefault(_Radio);

	var _RadioGroup = __webpack_require__(114);

	var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

	var _Select = __webpack_require__(116);

	var _Select2 = _interopRequireDefault(_Select);

	var _Spinner = __webpack_require__(120);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	var _TextArea = __webpack_require__(122);

	var _TextArea2 = _interopRequireDefault(_TextArea);

	var _TextInput = __webpack_require__(126);

	var _TextInput2 = _interopRequireDefault(_TextInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Button = _Button2.default;
	exports.CheckBox = _CheckBox2.default;
	exports.CheckBoxGroup = _CheckBoxGroup2.default;
	exports.Icon = _Icon2.default;
	exports.Link = _Link2.default;
	exports.Menu = _Menu2.default;
	exports.MenuItem = _Menu.MenuItem;
	exports.MenuItemGroup = _Menu.MenuItemGroup;
	exports.Modal = _Modal2.default;
	exports.Popup = _Popup2.default;
	exports.Radio = _Radio2.default;
	exports.RadioGroup = _RadioGroup2.default;
	exports.Select = _Select2.default;
	exports.SelectOption = _Select.SelectOption;
	exports.SelectOptionGroup = _Select.SelectOptionGroup;
	exports.Spinner = _Spinner2.default;
	exports.TextArea = _TextArea2.default;
	exports.TextInput = _TextInput2.default;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Button = __webpack_require__(70);

	var _Button2 = _interopRequireDefault(_Button);

	__webpack_require__(75);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Button2.default;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _keyCodes = __webpack_require__(73);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('Button'),
	    textClass = b('text');

	var Button = function (_Component) {
	    _inherits(Button, _Component);

	    function Button() {
	        _classCallCheck(this, Button);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Button.prototype.onInit = function onInit() {
	        this._enableClick = false;

	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onMouseEnter = this._onMouseEnter.bind(this);
	        this._onMouseLeave = this._onMouseLeave.bind(this);
	        this._onMouseDown = this._onMouseDown.bind(this);
	        this._onMouseUp = this._onMouseUp.bind(this);
	        this._onMouseClick = this._onMouseClick.bind(this);
	        this._onKeyDown = this._onKeyDown.bind(this);
	        this._onKeyUp = this._onKeyUp.bind(this);

	        this.setState({
	            focused: this.attrs.focused ? 'hard' : false,
	            hovered: false,
	            pressed: false
	        });
	    };

	    Button.prototype.onAttrsChange = function onAttrsChange() {
	        var _attrs = this.attrs,
	            focused = _attrs.focused,
	            disabled = _attrs.disabled;

	        var newState = void 0;

	        if (disabled) {
	            (newState = {}).hovered = newState.pressed = false;
	        }

	        if (typeof focused !== 'undefined') {
	            (newState || (newState = {})).focused = focused ? this.state.focused || 'hard' : false;

	            if (focused === false) {
	                newState.pressed = false;
	            }
	        }

	        if (newState) {
	            this.setState(newState);
	        }
	    };

	    Button.prototype.onRender = function onRender() {
	        var _attrs2 = this.attrs,
	            type = _attrs2.type,
	            theme = _attrs2.theme,
	            size = _attrs2.size,
	            view = _attrs2.view,
	            text = _attrs2.text,
	            title = _attrs2.title,
	            beforeIcon = _attrs2.beforeIcon,
	            afterIcon = _attrs2.afterIcon,
	            disabled = _attrs2.disabled,
	            togglable = _attrs2.togglable,
	            checked = _attrs2.checked,
	            role = _attrs2.role,
	            url = _attrs2.url,
	            target = _attrs2.target,
	            mix = _attrs2.mix,
	            _state = this.state,
	            focused = _state.focused,
	            hovered = _state.hovered,
	            pressed = _state.pressed,
	            focusableAttrs = {},
	            domAttrs = {
	            role: role,
	            'aria-disabled': disabled,
	            type: type === 'submit' ? type : null,
	            disabled: type === 'link' ? false : disabled,
	            title: title,
	            className: b({
	                theme: theme || this.context.theme,
	                size: size,
	                view: view,
	                disabled: disabled,
	                focused: focused,
	                hovered: hovered,
	                pressed: pressed,
	                checked: checked
	            })
	        };


	        if (mix) {
	            domAttrs.className += ' ' + mix;
	        }

	        if (!disabled) {
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;

	            domAttrs.onMouseEnter = this._onMouseEnter;
	            domAttrs.onMouseLeave = this._onMouseLeave;
	            domAttrs.onMouseDown = this._onMouseDown;
	            domAttrs.onMouseUp = this._onMouseUp;
	            domAttrs.onClick = this._onMouseClick;

	            if (focused) {
	                domAttrs.onKeyDown = this._onKeyDown;
	                domAttrs.onKeyUp = this._onKeyUp;
	            }
	        }

	        if (togglable) {
	            domAttrs['aria-' + (role === 'checkbox' ? 'checked' : 'pressed')] = String(!!checked);
	        }

	        var Tag = void 0;

	        if (type === 'link') {
	            Tag = 'a';
	            if (!disabled) {
	                domAttrs.href = url;
	            }
	            domAttrs.target = target;
	        } else {
	            Tag = 'button';
	        }

	        return (0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)(Tag).setAttrs(domAttrs).setChildren((0, _vidom.normalizeChildren)([beforeIcon, text && (0, _vidom.node)('span').setAttrs({
	            'class': textClass
	        }).setChildren((0, _vidom.normalizeChildren)(text)), afterIcon])));
	    };

	    Button.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this.setState({ focused: this.state.pressed || 'hard' });
	    };

	    Button.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({ focused: false });
	    };

	    Button.prototype._onMouseEnter = function _onMouseEnter() {
	        this.setState({ hovered: true });
	    };

	    Button.prototype._onMouseLeave = function _onMouseLeave() {
	        this.setState({ hovered: false, pressed: false });
	    };

	    Button.prototype._onMouseDown = function _onMouseDown(_ref) {
	        var nativeEvent = _ref.nativeEvent;

	        if (!nativeEvent.button) {
	            this.setState({ pressed: true });
	        }
	    };

	    Button.prototype._onMouseUp = function _onMouseUp() {
	        var _state2 = this.state,
	            pressed = _state2.pressed,
	            focused = _state2.focused;


	        if (pressed) {
	            if (!focused) {
	                // normalize focus among the browsers
	                this._onFocus();
	            }

	            this._enableClick = true;
	            this.setState({ pressed: false });
	        }
	    };

	    Button.prototype._onMouseClick = function _onMouseClick(e) {
	        if (!e.nativeEvent.button) {
	            this._onClick(e);
	        }
	    };

	    Button.prototype._onClick = function _onClick(e) {
	        if (this._enableClick) {
	            this._enableClick = false;

	            var _attrs3 = this.attrs,
	                onClick = _attrs3.onClick,
	                togglable = _attrs3.togglable;


	            if (togglable) {
	                this._onCheck();
	            }

	            onClick(e);
	        }
	    };

	    Button.prototype._onKeyDown = function _onKeyDown(_ref2) {
	        var keyCode = _ref2.nativeEvent.keyCode;

	        if ((keyCode === _keyCodes2.default.SPACE || keyCode === _keyCodes2.default.ENTER) && !this.state.pressed) {
	            this._enableClick = true;
	            this.setState({ pressed: true });
	        }
	    };

	    Button.prototype._onKeyUp = function _onKeyUp(e) {
	        if (this.state.pressed) {
	            this.setState({ pressed: false });

	            var _attrs4 = this.attrs,
	                type = _attrs4.type,
	                url = _attrs4.url;


	            if (type === 'link' && e.nativeEvent.keyCode === _keyCodes2.default.SPACE) {
	                this._onClick(e);
	                if (!e.isDefaultPrevented()) {
	                    document.location = url;
	                }
	            }
	        }
	    };

	    Button.prototype._onCheck = function _onCheck() {
	        var _attrs5 = this.attrs,
	            togglable = _attrs5.togglable,
	            checked = _attrs5.checked,
	            onCheckChange = _attrs5.onCheckChange;


	        if (togglable) {
	            if (togglable === 'radio') {
	                if (!checked) {
	                    onCheckChange(true);
	                }
	            } else {
	                onCheckChange(!checked);
	            }
	        }
	    };

	    return Button;
	}(_vidom.Component);

	exports.default = Button;


	Button.defaultAttrs = {
	    onClick: _noOp2.default,
	    onFocusChange: _noOp2.default,
	    onCheckChange: _noOp2.default
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Focusable = __webpack_require__(72);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Focusable2.default;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Focusable = function (_Component) {
	    _inherits(Focusable, _Component);

	    function Focusable() {
	        _classCallCheck(this, Focusable);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Focusable.prototype.onInit = function onInit() {
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	    };

	    Focusable.prototype.onRender = function onRender() {
	        return this.children.clone().setAttrs({ onFocus: this._onFocus, onBlur: this._onBlur });
	    };

	    Focusable.prototype.onMount = function onMount() {
	        this._updateFocus(this.attrs.focused);
	    };

	    Focusable.prototype.onUpdate = function onUpdate(_ref) {
	        var prevFocused = _ref.focused;
	        var focused = this.attrs.focused;


	        if (focused !== prevFocused) {
	            this._updateFocus(focused);
	        }
	    };

	    Focusable.prototype._updateFocus = function _updateFocus(focused) {
	        if (focused) {
	            this._focus();
	        } else {
	            this._blur();
	        }
	    };

	    Focusable.prototype._focus = function _focus() {
	        var domNode = this.getDomNode();

	        if (document.activeElement !== domNode) {
	            domNode.focus();
	        }
	    };

	    Focusable.prototype._blur = function _blur() {
	        var domNode = this.getDomNode();

	        if (document.activeElement === domNode) {
	            domNode.blur();
	        }
	    };

	    Focusable.prototype._onFocus = function _onFocus(e) {
	        var _attrs = this.attrs,
	            focused = _attrs.focused,
	            onFocus = _attrs.onFocus;


	        if (!focused) {
	            onFocus(e);
	        }
	    };

	    Focusable.prototype._onBlur = function _onBlur(e) {
	        var _attrs2 = this.attrs,
	            focused = _attrs2.focused,
	            onBlur = _attrs2.onBlur;


	        if (focused) {
	            onBlur(e);
	        }
	    };

	    return Focusable;
	}(_vidom.Component);

	exports.default = Focusable;

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = {
	    TAB: 9,
	    ENTER: 13,
	    ESC: 27,
	    SPACE: 32,
	    UP: 38,
	    DOWN: 40
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = noOp;
	function noOp() {};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Button.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Button.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Button\n{\n    -moz-user-focus: ignore;\n}\n", ""]);

	// exports


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _CheckBox = __webpack_require__(78);

	var _CheckBox2 = _interopRequireDefault(_CheckBox);

	__webpack_require__(79);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _CheckBox2.default;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _Button = __webpack_require__(69);

	var _Button2 = _interopRequireDefault(_Button);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('CheckBox');

	var CheckBox = function (_Component) {
	    _inherits(CheckBox, _Component);

	    function CheckBox() {
	        _classCallCheck(this, CheckBox);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    CheckBox.prototype.onInit = function onInit() {
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onChange = this._onChange.bind(this);
	        this._onButtonFocusChange = this._onButtonFocusChange.bind(this);
	        this._onButtonCheckChange = this._onButtonCheckChange.bind(this);

	        this.setState({ focused: this.attrs.focused });
	    };

	    CheckBox.prototype.onAttrsChange = function onAttrsChange() {
	        var focused = this.attrs.focused;


	        if (typeof focused !== 'undefined' && focused !== this.state.focused) {
	            this.setState({ focused: focused });
	        }
	    };

	    CheckBox.prototype.onRender = function onRender() {
	        return this.attrs.type === 'button' ? this._renderAsButton() : this._renderAsInput();
	    };

	    CheckBox.prototype._renderAsInput = function _renderAsInput() {
	        var _attrs = this.attrs,
	            type = _attrs.type,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            checked = _attrs.checked,
	            disabled = _attrs.disabled,
	            name = _attrs.name,
	            value = _attrs.value,
	            text = _attrs.text,
	            title = _attrs.title,
	            focused = this.state.focused,
	            mods = {
	            type: type,
	            theme: theme || this.context.theme,
	            size: size,
	            name: name,
	            checked: checked,
	            focused: focused,
	            disabled: disabled
	        },
	            focusableAttrs = {};


	        if (!disabled) {
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;
	        }

	        return (0, _vidom.node)('label').setAttrs({
	            'class': b(mods),
	            'title': title
	        }).setChildren([(0, _vidom.node)('span').setAttrs({
	            'class': b('box')
	        }).setChildren((0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)('input').setAttrs({
	            'name': name,
	            'type': 'checkbox',
	            'autoComplete': 'off',
	            'class': b('control'),
	            'checked': checked,
	            'disabled': disabled,
	            'value': value,
	            'onChange': this._onChange
	        }))), (0, _vidom.node)('span').setAttrs({
	            'class': b('text'),
	            'role': 'presentation'
	        }).setChildren((0, _vidom.normalizeChildren)(text))]);
	    };

	    CheckBox.prototype._renderAsButton = function _renderAsButton() {
	        var _attrs2 = this.attrs,
	            theme = _attrs2.theme,
	            size = _attrs2.size,
	            checked = _attrs2.checked,
	            disabled = _attrs2.disabled,
	            name = _attrs2.name,
	            value = _attrs2.value,
	            text = _attrs2.text,
	            title = _attrs2.title;


	        return (0, _vidom.node)('label').setAttrs({
	            'class': b({ checked: checked, disabled: disabled })
	        }).setChildren((0, _vidom.normalizeChildren)([checked ? (0, _vidom.node)('input').setKey('input').setAttrs({
	            'type': 'hidden',
	            'name': name,
	            'value': value
	        }) : null, (0, _vidom.node)(_Button2.default).setKey('button').setAttrs({
	            'theme': theme,
	            'size': size,
	            'togglable': 'check',
	            'checked': checked,
	            'disabled': disabled,
	            'focused': this.state.focused,
	            'onFocusChange': this._onButtonFocusChange,
	            'onCheckChange': this._onButtonCheckChange,
	            'text': text,
	            'title': title
	        })]));
	    };

	    CheckBox.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this.setState({ focused: true });
	    };

	    CheckBox.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({ focused: false });
	    };

	    CheckBox.prototype._onChange = function _onChange(_ref) {
	        var target = _ref.target;
	        var _attrs3 = this.attrs,
	            onCheckChange = _attrs3.onCheckChange,
	            value = _attrs3.value;


	        onCheckChange(target.checked, value);
	    };

	    CheckBox.prototype._onButtonFocusChange = function _onButtonFocusChange(focused) {
	        if (focused) {
	            this._onFocus();
	        } else {
	            this._onBlur();
	        }
	    };

	    CheckBox.prototype._onButtonCheckChange = function _onButtonCheckChange(checked) {
	        var _attrs4 = this.attrs,
	            onCheckChange = _attrs4.onCheckChange,
	            value = _attrs4.value;


	        onCheckChange(checked, value);
	    };

	    return CheckBox;
	}(_vidom.Component);

	exports.default = CheckBox;


	CheckBox.defaultAttrs = {
	    onFocusChange: _noOp2.default,
	    onCheckChange: _noOp2.default
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./CheckBox.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./CheckBox.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".CheckBox\n{\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n}\n", ""]);

	// exports


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _CheckBoxGroup = __webpack_require__(82);

	var _CheckBoxGroup2 = _interopRequireDefault(_CheckBoxGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _CheckBoxGroup2.default;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('CheckBoxGroup');

	var CheckBoxGroup = function (_Component) {
	    _inherits(CheckBoxGroup, _Component);

	    function CheckBoxGroup() {
	        _classCallCheck(this, CheckBoxGroup);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    CheckBoxGroup.prototype.onInit = function onInit() {
	        this._onCheckBoxChange = this._onCheckBoxChange.bind(this);
	    };

	    CheckBoxGroup.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var _attrs = this.attrs,
	            type = _attrs.type,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            name = _attrs.name,
	            value = _attrs.value,
	            disabled = _attrs.disabled,
	            children = this.children;


	        return (0, _vidom.node)('span').setAttrs({
	            'class': b({ type: type, theme: theme || this.context.theme, size: size }) + ' ControlGroup'
	        }).setChildren((0, _vidom.normalizeChildren)((Array.isArray(children) ? children : [children]).map(function (child) {
	            var attrs = {
	                type: type,
	                theme: theme,
	                size: size,
	                name: name,
	                checked: value.indexOf(child.attrs.value) > -1,
	                onCheckChange: _this2._onCheckBoxChange
	            };

	            if (disabled) {
	                attrs.disabled = disabled;
	            }

	            return child.clone().setAttrs(attrs);
	        })));
	    };

	    CheckBoxGroup.prototype._onCheckBoxChange = function _onCheckBoxChange(checkBoxChecked, checkBoxValue) {
	        var _attrs2 = this.attrs,
	            value = _attrs2.value,
	            onValueChange = _attrs2.onValueChange;


	        onValueChange(checkBoxChecked ? value.concat(checkBoxValue) : value.filter(function (value) {
	            return value !== checkBoxValue;
	        }));
	    };

	    return CheckBoxGroup;
	}(_vidom.Component);

	exports.default = CheckBoxGroup;


	CheckBoxGroup.defaultAttrs = {
	    type: 'line',
	    value: [],
	    onValueChange: _noOp2.default
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Icon = __webpack_require__(84);

	var _Icon2 = _interopRequireDefault(_Icon);

	__webpack_require__(85);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Icon2.default;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = Icon;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('Icon'),
	    iconClass = b();

	function Icon(_ref, children) {
	    var mix = _ref.mix;

	    var className = iconClass;

	    if (mix) {
	        className += ' ' + mix;
	    }

	    return (0, _vidom.node)('span').setAttrs({
	        'class': className
	    }).setChildren((0, _vidom.normalizeChildren)(children));
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Icon.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Icon.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Icon {\n    display: inline-block;\n\n    text-align: center;\n\n    background: 50% no-repeat;\n}\n.Icon:empty:after {\n    visibility: hidden;\n    content: '\\A0';\n}\n.Icon > img,\n    .Icon > svg {\n    margin: -5.15em 0 -5em;\n    /* 0.15 — magic number, empirically found */\n    vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Link = __webpack_require__(88);

	var _Link2 = _interopRequireDefault(_Link);

	__webpack_require__(89);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Link2.default;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _keyCodes = __webpack_require__(73);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('Link');

	var Link = function (_Component) {
	    _inherits(Link, _Component);

	    function Link() {
	        _classCallCheck(this, Link);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Link.prototype.onInit = function onInit() {
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onMouseClick = this._onMouseClick.bind(this);
	        this._onKeyDown = this._onKeyDown.bind(this);

	        this.setState({ focused: this.attrs.focused });
	    };

	    Link.prototype.onAttrsChange = function onAttrsChange() {
	        var focused = this.attrs.focused;


	        if (typeof focused !== 'undefined' && focused !== this.state.focused) {
	            this.setState({ focused: focused });
	        }
	    };

	    Link.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            view = _attrs.view,
	            title = _attrs.title,
	            disabled = _attrs.disabled,
	            url = _attrs.url,
	            target = _attrs.target,
	            mix = _attrs.mix,
	            focused = this.state.focused,
	            focusableAttrs = {},
	            domAttrs = {
	            role: 'link',
	            'aria-disabled': disabled,
	            title: title,
	            target: target,
	            className: b({
	                theme: theme || this.context.theme,
	                size: size,
	                view: view,
	                disabled: disabled,
	                focused: focused
	            })
	        };


	        if (mix) {
	            domAttrs.className += ' ' + mix;
	        }

	        if (!disabled) {
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;

	            domAttrs.href = url;
	            domAttrs.onClick = this._onMouseClick;

	            if (focused) {
	                domAttrs.onKeyDown = this._onKeyDown;
	            }
	        }

	        return (0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)('a').setAttrs(domAttrs).setChildren((0, _vidom.normalizeChildren)(this.children)));
	    };

	    Link.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this.setState({ focused: true });
	    };

	    Link.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({ focused: false });
	    };

	    Link.prototype._onMouseClick = function _onMouseClick(e) {
	        if (!e.nativeEvent.button) {
	            this._onClick(e);
	        }
	    };

	    Link.prototype._onClick = function _onClick(e) {
	        if (this.attrs.pseudo) {
	            e.preventDefault();
	        }

	        this.attrs.onClick(e);
	    };

	    Link.prototype._onKeyDown = function _onKeyDown(e) {
	        if (e.nativeEvent.keyCode === _keyCodes2.default.SPACE) {
	            var _attrs2 = this.attrs,
	                onClick = _attrs2.onClick,
	                pseudo = _attrs2.pseudo,
	                url = _attrs2.url;


	            onClick(e);

	            if (!pseudo) {
	                document.location = url;
	            }
	        }
	    };

	    return Link;
	}(_vidom.Component);

	exports.default = Link;


	Link.defaultAttrs = {
	    onClick: _noOp2.default,
	    onFocusChange: _noOp2.default
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Link.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Link.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Link {\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n}\n", ""]);

	// exports


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.MenuItemGroup = exports.MenuItem = undefined;

	var _Menu = __webpack_require__(92);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuItem = __webpack_require__(94);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _MenuItemGroup = __webpack_require__(93);

	var _MenuItemGroup2 = _interopRequireDefault(_MenuItemGroup);

	__webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Menu2.default;
	exports.MenuItem = _MenuItem2.default;
	exports.MenuItemGroup = _MenuItemGroup2.default;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _MenuItemGroup = __webpack_require__(93);

	var _MenuItemGroup2 = _interopRequireDefault(_MenuItemGroup);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _keyCodes = __webpack_require__(73);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('Menu');

	var Menu = function (_Component) {
	    _inherits(Menu, _Component);

	    function Menu() {
	        _classCallCheck(this, Menu);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Menu.prototype.onInit = function onInit() {
	        this._menuDomNode = null;
	        this._hoveredItemInstance = null;
	        this._scrollToHoveredItem = false;

	        this._onMenuRef = this._onMenuRef.bind(this);
	        this._onHoveredItemRef = this._onHoveredItemRef.bind(this);
	        this._onItemHoverChange = this._onItemHoverChange.bind(this);
	        this._onItemClick = this._onItemClick.bind(this);
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onKeyDown = this._onKeyDown.bind(this);

	        var focused = this.attrs.focused;


	        this.setState({
	            focused: focused,
	            hoveredIdx: focused ? 0 : null,
	            lastHoveredIdx: null
	        });
	    };

	    Menu.prototype.onAttrsChange = function onAttrsChange() {
	        var focused = this.attrs.focused;


	        if (typeof focused !== 'undefined' && focused !== this.state.focused) {
	            if (focused) {
	                this._hoverItemOnFocus();
	            }

	            this.setState({ focused: focused });
	        }
	    };

	    Menu.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var _attrs = this.attrs,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            mix = _attrs.mix,
	            mode = _attrs.mode,
	            disabled = _attrs.disabled,
	            resTheme = theme || this.context.theme,
	            focused = this.state.focused,
	            domAttrs = { className: b({ theme: resTheme, mode: mode, size: size, focused: focused, disabled: disabled }) },
	            focusableAttrs = {};


	        if (mix) {
	            domAttrs.className += ' ' + mix;
	        }

	        if (disabled) {
	            domAttrs['aria-disabled'] = 'true';
	        } else {
	            domAttrs.tabIndex = 0;
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;

	            if (focused) {
	                domAttrs.onKeyDown = this._onKeyDown;
	            }
	        }

	        var idx = 0;

	        return (0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)('div').setAttrs(domAttrs).setRef(this._onMenuRef).setChildren((0, _vidom.normalizeChildren)(childrenToItems(this.children).map(function (child) {
	            var res = void 0;

	            if (isItemGroup(child)) {
	                res = _this2._renderGroup(child, idx, resTheme);
	                idx += childrenToItems(child.children).length;
	            } else {
	                res = _this2._renderItem(child, idx++, resTheme);
	            }

	            return res;
	        }))));
	    };

	    Menu.prototype.onUpdate = function onUpdate() {
	        if (this._scrollToHoveredItem) {
	            this._scrollToHoveredItem = false;

	            var menuRect = this._menuDomNode.getBoundingClientRect(),
	                hoveredItemRect = this._hoveredItemInstance.getDomNode().getBoundingClientRect();

	            if (hoveredItemRect.top < menuRect.top) {
	                this._menuDomNode.scrollTop += hoveredItemRect.top - menuRect.top;
	            } else if (hoveredItemRect.bottom > menuRect.bottom) {
	                this._menuDomNode.scrollTop += hoveredItemRect.bottom - menuRect.bottom;
	            }
	        }
	    };

	    Menu.prototype._renderGroup = function _renderGroup(group, idx, theme) {
	        var _this3 = this;

	        return group.clone().setChildren(childrenToItems(group.children).map(function (item) {
	            return _this3._renderItem(item, idx++, theme);
	        }));
	    };

	    Menu.prototype._renderItem = function _renderItem(item, idx, theme) {
	        var _attrs2 = this.attrs,
	            size = _attrs2.size,
	            mode = _attrs2.mode,
	            disabled = _attrs2.disabled,
	            hoveredIdx = this.state.hoveredIdx,
	            hovered = hoveredIdx === idx,
	            itemAttrs = {
	            theme: theme,
	            size: size,
	            hovered: hovered,
	            idx: idx,
	            onHoverChange: this._onItemHoverChange,
	            onClick: this._onItemClick
	        };


	        if (mode) {
	            itemAttrs.checked = this._isItemChecked(item);
	        }

	        if (disabled) {
	            itemAttrs.disabled = true;
	        }

	        return item.clone().setAttrs(itemAttrs).setRef(hovered ? this._onHoveredItemRef : null);
	    };

	    Menu.prototype._onMenuRef = function _onMenuRef(domNode) {
	        this._menuDomNode = domNode;
	    };

	    Menu.prototype._onHoveredItemRef = function _onHoveredItemRef(item) {
	        if (item) {
	            this._hoveredItemInstance = item;
	        }
	    };

	    Menu.prototype._onItemHoverChange = function _onItemHoverChange(hovered, idx) {
	        this.setState({ hoveredIdx: hovered ? idx : null });
	    };

	    Menu.prototype._onItemClick = function _onItemClick(itemValue) {
	        var _attrs3 = this.attrs,
	            onItemClick = _attrs3.onItemClick,
	            onValueChange = _attrs3.onValueChange,
	            mode = _attrs3.mode,
	            value = _attrs3.value;


	        switch (mode) {
	            case 'radio':
	                if (value !== itemValue) {
	                    onValueChange(itemValue);
	                }
	                break;

	            case 'radioCheck':
	                onValueChange(value === itemValue ? null : itemValue);
	                break;

	            case 'check':
	                onValueChange(value.indexOf(itemValue) > -1 ? value.filter(function (value) {
	                    return value !== itemValue;
	                }) : value.concat(itemValue));
	                break;
	        }

	        onItemClick(itemValue);
	    };

	    Menu.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this._hoverItemOnFocus();
	        this.setState({ focused: true });
	    };

	    Menu.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({
	            focused: false,
	            hoveredIdx: null,
	            lastHoveredIdx: this.state.hoveredIdx
	        });
	    };

	    Menu.prototype._onKeyDown = function _onKeyDown(e) {
	        var hoveredIdx = this.state.hoveredIdx;


	        switch (e.nativeEvent.keyCode) {
	            case _keyCodes2.default.UP:
	                e.preventDefault();
	                if (hoveredIdx !== null) {
	                    this._hoverNextItem(-1);
	                }
	                break;

	            case _keyCodes2.default.DOWN:
	                e.preventDefault();
	                if (hoveredIdx !== null) {
	                    this._hoverNextItem(1);
	                }
	                break;

	            case _keyCodes2.default.SPACE:
	            case _keyCodes2.default.ENTER:
	                e.preventDefault();
	                if (hoveredIdx !== null) {
	                    this._onItemClick(this._getChildByIdx(hoveredIdx).attrs.value);
	                }
	                break;
	        }

	        this.attrs.onKeyDown(e);
	    };

	    Menu.prototype._getChildByIdx = function _getChildByIdx(idx) {
	        var items = childrenToItems(this.children);

	        for (var i = 0, childIdx = 0, item; i < items.length; i++) {
	            item = items[i];
	            if (isItemGroup(item)) {
	                var groupItems = childrenToItems(item.children);

	                if (idx < childIdx + groupItems.length) {
	                    return groupItems[idx - childIdx];
	                }

	                childIdx += groupItems.length;
	            } else if (idx === childIdx++) {
	                return item;
	            }
	        }
	    };

	    Menu.prototype._hoverNextItem = function _hoverNextItem(dir) {
	        var hoveredIdx = this.state.hoveredIdx,
	            itemsLen = this._calcItemsLen(),
	            nextHoveredIdx = hoveredIdx === null ? dir > 0 ? 0 : itemsLen - 1 : hoveredIdx + dir >= 0 && hoveredIdx + dir < itemsLen ? hoveredIdx + dir : hoveredIdx;


	        if (nextHoveredIdx !== hoveredIdx) {
	            var childAttrs = this._getChildByIdx(nextHoveredIdx).attrs;

	            if (childAttrs && childAttrs.disabled) {
	                this._hoverNextItem(dir > 0 ? dir + 1 : dir - 1);
	            } else {
	                this._scrollToHoveredItem = true;
	                this.setState({ hoveredIdx: nextHoveredIdx });
	            }
	        }
	    };

	    Menu.prototype._hoverItemOnFocus = function _hoverItemOnFocus() {
	        var _state = this.state,
	            hoveredIdx = _state.hoveredIdx,
	            lastHoveredIdx = _state.lastHoveredIdx;


	        this._scrollToHoveredItem = true;

	        if (hoveredIdx === null) {
	            this.setState({
	                hoveredIdx: lastHoveredIdx === null ? this.attrs.mode && this._calcFirstCheckedItemIdx() || 0 : lastHoveredIdx
	            });
	        }
	    };

	    Menu.prototype._calcItemsLen = function _calcItemsLen() {
	        return childrenToItems(this.children).reduce(function (res, child) {
	            return res + (isItemGroup(child) ? childrenToItems(child.children).length : 1);
	        }, 0);
	    };

	    Menu.prototype._calcFirstCheckedItemIdx = function _calcFirstCheckedItemIdx() {
	        var items = childrenToItems(this.children);

	        for (var i = 0, childIdx = 0, item; i < items.length; i++) {
	            item = items[i];
	            if (isItemGroup(item)) {
	                var groupItems = childrenToItems(item.children);

	                for (var j = 0; j < groupItems.length; j++) {
	                    if (this._isItemChecked(groupItems[j])) {
	                        return childIdx + j;
	                    }
	                }

	                childIdx += groupItems.length;
	            } else {
	                if (this._isItemChecked(item)) {
	                    return childIdx;
	                }

	                childIdx++;
	            }
	        }

	        return null;
	    };

	    Menu.prototype._isItemChecked = function _isItemChecked(item) {
	        var _attrs4 = this.attrs,
	            mode = _attrs4.mode,
	            value = _attrs4.value,
	            itemValue = item.attrs.value;


	        return mode === 'check' ? value.indexOf(itemValue) > -1 : value === itemValue;
	    };

	    return Menu;
	}(_vidom.Component);

	exports.default = Menu;


	function isItemGroup(item) {
	    return item._component === _MenuItemGroup2.default;
	}

	function childrenToItems(children) {
	    return children ? Array.isArray(children) ? children : [children] : [];
	}

	Menu.defaultAttrs = {
	    onItemClick: _noOp2.default,
	    onValueChange: _noOp2.default,
	    onFocusChange: _noOp2.default,
	    onKeyDown: _noOp2.default
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = MenuItemGroup;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('MenuItemGroup');

	function MenuItemGroup(attrs, children) {
	    return (0, _vidom.node)('div').setAttrs({
	        'class': b(),
	        'role': 'group'
	    }).setChildren((0, _vidom.normalizeChildren)([(0, _vidom.node)('div').setAttrs({
	        'class': b('title'),
	        'role': 'presentation'
	    }).setChildren((0, _vidom.normalizeChildren)(attrs.title)), children]));
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('MenuItem');

	var MenuItem = function (_Component) {
	    _inherits(MenuItem, _Component);

	    function MenuItem() {
	        _classCallCheck(this, MenuItem);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    MenuItem.prototype.onInit = function onInit() {
	        this._onClick = this._onClick.bind(this);
	        this._onMouseEnter = this._onMouseEnter.bind(this);
	        this._onMouseLeave = this._onMouseLeave.bind(this);
	    };

	    MenuItem.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            type = _attrs.type,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            hovered = _attrs.hovered,
	            disabled = _attrs.disabled,
	            checked = _attrs.checked,
	            domAttrs = { className: b({ type: type, theme: theme, size: size, hovered: hovered, disabled: disabled, checked: checked }) };


	        if (!disabled) {
	            domAttrs.onMouseEnter = this._onMouseEnter;
	            domAttrs.onMouseLeave = this._onMouseLeave;
	            domAttrs.onClick = this._onClick;
	        }

	        return (0, _vidom.node)('div').setAttrs(domAttrs).setChildren((0, _vidom.normalizeChildren)(this.children));
	    };

	    MenuItem.prototype._onMouseEnter = function _onMouseEnter() {
	        var _attrs2 = this.attrs,
	            onHoverChange = _attrs2.onHoverChange,
	            idx = _attrs2.idx;


	        onHoverChange(true, idx);
	    };

	    MenuItem.prototype._onMouseLeave = function _onMouseLeave() {
	        var _attrs3 = this.attrs,
	            onHoverChange = _attrs3.onHoverChange,
	            idx = _attrs3.idx;


	        onHoverChange(false, idx);
	    };

	    MenuItem.prototype._onClick = function _onClick() {
	        var _attrs4 = this.attrs,
	            onClick = _attrs4.onClick,
	            value = _attrs4.value;


	        onClick(value);
	    };

	    return MenuItem;
	}(_vidom.Component);

	exports.default = MenuItem;


	MenuItem.defaultAttrs = {
	    onHoverChange: _noOp2.default,
	    onClick: _noOp2.default
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(96);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Menu.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Menu.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Menu {\n    overflow-y: auto;\n}\n\n.MenuItem {\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n}\n", ""]);

	// exports


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Modal = __webpack_require__(98);

	var _Modal2 = _interopRequireDefault(_Modal);

	__webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Modal2.default;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Overlay = __webpack_require__(99);

	var _Overlay2 = _interopRequireDefault(_Overlay);

	var _dom = __webpack_require__(103);

	var _dom2 = _interopRequireDefault(_dom);

	var _keyCodes = __webpack_require__(73);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Z_INDEX_LEVEL = 10,
	    b = (0, _bem2.default)('Modal');

	var Modal = function (_Component) {
	    _inherits(Modal, _Component);

	    function Modal() {
	        _classCallCheck(this, Modal);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Modal.prototype.onInit = function onInit() {
	        this._contentDomNode = null;
	        this._domNodeToFocusAfterClosing = null;
	        this._focusedDomNode = null;

	        this._onContentRef = this._onContentRef.bind(this);
	        this._onFocus = this._onFocus.bind(this);
	        this._onKeyDown = this._onKeyDown.bind(this);
	        this._onOverlayClick = this._onOverlayClick.bind(this);
	    };

	    Modal.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            theme = _attrs.theme,
	            visible = _attrs.visible,
	            autoclosable = _attrs.autoclosable,
	            onHide = _attrs.onHide,
	            overlayAttrs = {
	            visible: visible,
	            autoclosable: autoclosable,
	            zIndexLevel: Z_INDEX_LEVEL,
	            onHide: onHide
	        },
	            domAttrs = {
	            'class': b({ visible: visible, theme: theme || this.context.theme }),
	            role: 'dialog',
	            'aria-hidden': !visible
	        };


	        if (visible) {
	            if (autoclosable) {
	                overlayAttrs.onClick = this._onOverlayClick;
	            }

	            domAttrs.onFocus = this._onFocus;
	            domAttrs.onKeyDown = this._onKeyDown;
	        }

	        return (0, _vidom.node)(_Overlay2.default).setAttrs(overlayAttrs).setChildren((0, _vidom.node)('div').setAttrs(domAttrs).setChildren((0, _vidom.node)('div').setAttrs({
	            'class': b('table')
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'class': b('cell')
	        }).setChildren((0, _vidom.node)(ModalContent).setAttrs({
	            'visible': visible
	        }).setRef(this._onContentRef).setChildren((0, _vidom.normalizeChildren)(this.children))))));
	    };

	    Modal.prototype.onUpdate = function onUpdate(_ref) {
	        var prevVisible = _ref.visible;
	        var visible = this.attrs.visible;


	        if (visible !== prevVisible) {
	            if (visible) {
	                this._domNodeToFocusAfterClosing = document.activeElement;
	                this._contentDomNode.focus();
	            } else {
	                this._domNodeToFocusAfterClosing.focus();
	            }
	        }
	    };

	    Modal.prototype._onContentRef = function _onContentRef(ref) {
	        this._contentDomNode = ref && ref.getDomNode();
	    };

	    Modal.prototype._onFocus = function _onFocus(_ref2) {
	        var target = _ref2.target;

	        this._focusedDomNode = target;
	    };

	    Modal.prototype._onKeyDown = function _onKeyDown(e) {
	        var _e$nativeEvent = e.nativeEvent,
	            keyCode = _e$nativeEvent.keyCode,
	            shiftKey = _e$nativeEvent.shiftKey;


	        if (keyCode === _keyCodes2.default.TAB) {
	            var dir = shiftKey ? 'backward' : 'forward',
	                contentDomNode = this._contentDomNode;

	            if (this._focusedDomNode !== contentDomNode) {
	                if (!_dom2.default.findFocusableChild(contentDomNode, dir, this._focusedDomNode)) {
	                    e.preventDefault();
	                    _dom2.default.findFocusableChild(contentDomNode, dir).focus();
	                }
	            } else if (!_dom2.default.findFocusableChild(contentDomNode, dir)) {
	                // no focusable child at all
	                e.preventDefault();
	            }
	        }
	    };

	    Modal.prototype._onOverlayClick = function _onOverlayClick(_ref3) {
	        var target = _ref3.target;

	        if (!this._contentDomNode.contains(target)) {
	            this.attrs.onHide({ reason: 'outside-click' });
	        }
	    };

	    return Modal;
	}(_vidom.Component);

	exports.default = Modal;


	Modal.defaultAttrs = {
	    visible: false,
	    autoclosable: false,
	    onHide: _noOp2.default
	};

	var ModalContent = function (_Component2) {
	    _inherits(ModalContent, _Component2);

	    function ModalContent() {
	        _classCallCheck(this, ModalContent);

	        return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
	    }

	    ModalContent.prototype.shouldUpdate = function shouldUpdate(_, prevChildren) {
	        return this.attrs.visible && this.children !== prevChildren;
	    };

	    ModalContent.prototype.onRender = function onRender() {
	        return (0, _vidom.node)('div').setAttrs({
	            'class': b('content'),
	            'tabIndex': '-1'
	        }).setChildren((0, _vidom.normalizeChildren)(this.children));
	    };

	    return ModalContent;
	}(_vidom.Component);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Overlay = __webpack_require__(100);

	var _Overlay2 = _interopRequireDefault(_Overlay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Overlay2.default;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _vidom = __webpack_require__(1);

	var _Portal = __webpack_require__(101);

	var _Portal2 = _interopRequireDefault(_Portal);

	var _keyCodes = __webpack_require__(73);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Z_INDEX_FACTOR = 1000,
	    instanceZIndexes = {},
	    visibleInstances = [];

	var Overlay = function (_Component) {
	    _inherits(Overlay, _Component);

	    function Overlay() {
	        _classCallCheck(this, Overlay);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Overlay.prototype.onInit = function onInit() {
	        this._popupDomNode = null;
	        this._isClickOutsidePrevented = false;
	        this._childOverlays = null;

	        this._preventClickOutside = this._preventClickOutside.bind(this);
	        this._onDocumentClick = this._onDocumentClick.bind(this);
	        this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
	        this._onOverlayClick = this._onOverlayClick.bind(this);
	        this._registerChildOverlay = this._registerChildOverlay.bind(this);
	        this._unregisterChildOverlay = this._unregisterChildOverlay.bind(this);

	        this.setState({
	            wasVisible: false,
	            zIndex: null
	        });
	    };

	    Overlay.prototype.onChildContextRequest = function onChildContextRequest() {
	        return {
	            zIndexLevel: this._calcZIndexLevel(),
	            preventParentOverlayClickOutside: this._preventClickOutside,
	            registerChildOverlay: this._registerChildOverlay,
	            unregisterChildOverlay: this._unregisterChildOverlay
	        };
	    };

	    Overlay.prototype.onRender = function onRender() {
	        var visible = this.attrs.visible,
	            _state = this.state,
	            zIndex = _state.zIndex,
	            wasVisible = _state.wasVisible,
	            children = this.children;


	        if (visible || wasVisible) {
	            var childAttrs = children.attrs;

	            return (0, _vidom.node)(_Portal2.default).setChildren((0, _vidom.normalizeChildren)(children.clone().setAttrs({
	                style: childAttrs && childAttrs.style ? _extends({}, childAttrs.style, { zIndex: zIndex }) : { zIndex: zIndex },
	                onClick: this._onOverlayClick
	            })));
	        }

	        return null;
	    };

	    Overlay.prototype.onMount = function onMount() {
	        if (this.context.registerChildOverlay) {
	            this.context.registerChildOverlay(this);
	        }

	        if (this.attrs.visible) {
	            this.update();
	        }
	    };

	    Overlay.prototype.onUpdate = function onUpdate(_ref) {
	        var prevVisible = _ref.visible,
	            prevAutoclosable = _ref.autoclosable;
	        var _attrs = this.attrs,
	            visible = _attrs.visible,
	            autoclosable = _attrs.autoclosable,
	            zIndex = this.state.zIndex;


	        if (!visible) {
	            if (prevVisible) {
	                visibleInstances.splice(visibleInstances.indexOf(this), 1);

	                if (prevAutoclosable) {
	                    document.removeEventListener('click', this._onDocumentClick);
	                    document.removeEventListener('keydown', this._onDocumentKeyDown);
	                }

	                this._releaseZIndex(zIndex);

	                if (this._childOverlays) {
	                    this._childOverlays.forEach(function (childOverlay) {
	                        childOverlay.attrs.onHide({ reason: 'parent' });
	                    });
	                }
	            }
	            return;
	        }

	        if (!prevVisible) {
	            visibleInstances.unshift(this);

	            if (autoclosable) {
	                document.addEventListener('click', this._onDocumentClick);
	                document.addEventListener('keydown', this._onDocumentKeyDown);
	            }

	            this.setState({
	                zIndex: this._acquireZIndex(),
	                wasVisible: true
	            });
	        }
	    };

	    Overlay.prototype.onUnmount = function onUnmount() {
	        if (this.attrs.visible) {
	            this._releaseZIndex(this.state.zIndex);
	        }

	        if (this.context.unregisterChildOverlay) {
	            this.context.unregisterChildOverlay(this);
	        }
	    };

	    Overlay.prototype._preventClickOutside = function _preventClickOutside() {
	        this._isClickOutsidePrevented = true;

	        var preventParentOverlayClickOutside = this.context.preventParentOverlayClickOutside;


	        if (preventParentOverlayClickOutside) {
	            preventParentOverlayClickOutside();
	        }
	    };

	    Overlay.prototype._onOverlayClick = function _onOverlayClick(e) {
	        this._preventClickOutside();
	        this.attrs.onClick(e);
	    };

	    Overlay.prototype._onDocumentClick = function _onDocumentClick() {
	        if (this._isClickOutsidePrevented) {
	            this._isClickOutsidePrevented = false;
	        } else {
	            this.attrs.onHide({ reason: 'outside-click' });
	        }
	    };

	    Overlay.prototype._onDocumentKeyDown = function _onDocumentKeyDown(e) {
	        if (e.keyCode === _keyCodes2.default.ESC && visibleInstances[0] === this) {
	            e.preventDefault(); // to prevent desktop Safari from exiting the full screen mode
	            this.attrs.onHide({ reason: 'escape' });
	        }
	    };

	    Overlay.prototype._acquireZIndex = function _acquireZIndex() {
	        var zIndexLevel = this._calcZIndexLevel(),
	            levelZIndexes = instanceZIndexes[zIndexLevel];

	        var res = void 0;

	        if (levelZIndexes) {
	            levelZIndexes.push(res = levelZIndexes[levelZIndexes.length - 1] + 1);
	        } else {
	            instanceZIndexes[zIndexLevel] = [res = zIndexLevel * Z_INDEX_FACTOR + 1];
	        }

	        return res;
	    };

	    Overlay.prototype._releaseZIndex = function _releaseZIndex(zIndex) {
	        var zIndexLevel = this._calcZIndexLevel(),
	            levelZIndexes = instanceZIndexes[zIndexLevel];

	        levelZIndexes.splice(levelZIndexes.indexOf(zIndex), 1);

	        if (!levelZIndexes.length) {
	            delete instanceZIndexes[zIndexLevel];
	        }
	    };

	    Overlay.prototype._calcZIndexLevel = function _calcZIndexLevel() {
	        return (this.context.zIndexLevel || 0) + this.attrs.zIndexLevel;
	    };

	    Overlay.prototype._registerChildOverlay = function _registerChildOverlay(childOverlay) {
	        (this._childOverlays || (this._childOverlays = [])).push(childOverlay);
	    };

	    Overlay.prototype._unregisterChildOverlay = function _unregisterChildOverlay(childOverlay) {
	        this._childOverlays.splice(this._childOverlays.indexOf(childOverlay), 1);
	    };

	    return Overlay;
	}(_vidom.Component);

	exports.default = Overlay;


	Overlay.defaultAttrs = {
	    zIndexLevel: 0,
	    visible: false,
	    onClick: _noOp2.default,
	    onHide: _noOp2.default
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Portal = __webpack_require__(102);

	var _Portal2 = _interopRequireDefault(_Portal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Portal2.default;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Portal = function (_Component) {
	    _inherits(Portal, _Component);

	    function Portal() {
	        _classCallCheck(this, Portal);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Portal.prototype.onInit = function onInit() {
	        this._rootNode = null;
	    };

	    Portal.prototype.onMount = function onMount() {
	        document.body.appendChild(this._rootNode = document.createElement('div'));
	        (0, _vidom.mountSync)(this._rootNode, this.children, this.context);
	    };

	    Portal.prototype.onUpdate = function onUpdate() {
	        (0, _vidom.mountSync)(this._rootNode, this.children, this.context);
	    };

	    Portal.prototype.onUnmount = function onUnmount() {
	        (0, _vidom.unmountSync)(this._rootNode);
	        document.body.removeChild(this._rootNode);
	    };

	    return Portal;
	}(_vidom.Component);

	exports.default = Portal;

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function findScrollableParents(domElem) {
	    var res = [];
	    var parentDomElem = domElem;

	    while ((parentDomElem = parentDomElem.parentNode) && parentDomElem.nodeType === 1) {
	        var _window$getComputedSt = window.getComputedStyle(parentDomElem),
	            overflowX = _window$getComputedSt.overflowX,
	            overflowY = _window$getComputedSt.overflowY;

	        if (overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'auto' || overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'auto') {
	            res.push(parentDomElem);
	        }
	    }

	    return res;
	}

	function findFocusableChild(containerElem, dir, startDomElem) {
	    var curElem = startDomElem ? dir === 'forward' ? startDomElem.nextElementSibling : startDomElem.previousElementSibling : dir === 'forward' ? containerElem.firstElementChild : containerElem.lastElementChild;

	    while (curElem) {
	        if (isFocusable(curElem)) {
	            return curElem;
	        }

	        var focusableChildElem = findFocusableChild(curElem, dir);

	        if (focusableChildElem) {
	            return focusableChildElem;
	        }

	        curElem = dir === 'forward' ? curElem.nextElementSibling : curElem.previousElementSibling;
	    }

	    return startDomElem && startDomElem.parentNode !== containerElem ? findFocusableChild(containerElem, dir, startDomElem.parentNode) : null;
	}

	function isFocusable(domElem) {
	    if (domElem.hasAttribute('tabindex')) {
	        return isVisible(domElem);
	    }

	    switch (domElem.tagName.toLowerCase()) {
	        case 'iframe':
	            return isVisible(domElem);

	        case 'button':
	        case 'textarea':
	        case 'select':
	            return !domElem.disabled && isVisible(domElem);

	        case 'input':
	            return !domElem.disabled && domElem.type !== 'hidden' && isVisible(domElem);

	        case 'a':
	            return domElem.hasAttribute('href') && isVisible(domElem);
	    }

	    return false;
	}

	function isVisible(domElem) {
	    if (!domElem.offsetParent) {
	        var _window$getComputedSt2 = window.getComputedStyle(domElem),
	            position = _window$getComputedSt2.position,
	            display = _window$getComputedSt2.display,
	            visibility = _window$getComputedSt2.visibility;

	        return position === 'fixed' && display !== 'none' && visibility !== 'hidden';
	    }

	    return true;
	}

	exports.default = {
	    findScrollableParents: findScrollableParents,
	    findFocusableChild: findFocusableChild,
	    isFocusable: isFocusable,
	    isVisible: isVisible
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(105);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Modal.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Modal.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Modal {\n    position: fixed;\n    top: 0;\n    left: 0;\n\n    height: 100%;\n    width: 100%;\n\n    overflow-y: auto;\n\n    -webkit-overflow-scrolling: touch;\n}\n.Modal__table {\n    display: table;\n    width: 100%;\n    height: 100%;\n    text-align: center;\n}\n.Modal__cell {\n    display: table-cell;\n    vertical-align: middle;\n}\n.Modal__content {\n    display: inline-block;\n    text-align: left;\n}\n.Modal__content:focus {\n    outline: none;\n}\n", ""]);

	// exports


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Popup = __webpack_require__(107);

	var _Popup2 = _interopRequireDefault(_Popup);

	__webpack_require__(108);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Popup2.default;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Overlay = __webpack_require__(99);

	var _Overlay2 = _interopRequireDefault(_Overlay);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	var _dom = __webpack_require__(103);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VIEWPORT_ACCURACY_FACTOR = .99,
	    DEFAULT_DIRECTIONS = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'left-top', 'left-center', 'left-bottom'],
	    b = (0, _bem2.default)('Popup');

	var Popup = function (_Component) {
	    _inherits(Popup, _Component);

	    function Popup() {
	        _classCallCheck(this, Popup);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Popup.prototype.onInit = function onInit() {
	        this._popupDomNode = null;
	        this._scrollableAnchorParentDomNodes = null;

	        this._onPopupRef = this._onPopupRef.bind(this);
	        this._onVisibilityConstraintsChange = this._onVisibilityConstraintsChange.bind(this);

	        this.setState({
	            direction: null,
	            left: null,
	            top: null,
	            height: null,
	            hidden: false
	        });
	    };

	    Popup.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            theme = _attrs.theme,
	            visible = _attrs.visible,
	            autoclosable = _attrs.autoclosable,
	            zIndexLevel = _attrs.zIndexLevel,
	            onHide = _attrs.onHide,
	            _state = this.state,
	            direction = _state.direction,
	            left = _state.left,
	            top = _state.top,
	            height = _state.height,
	            hidden = _state.hidden,
	            domAttrs = {
	            'class': b({
	                visible: visible && !hidden,
	                direction: hidden ? false : direction,
	                theme: theme || this.context.theme
	            }),
	            style: {
	                left: left === null ? null : left + 'px',
	                top: top === null ? null : top + 'px',
	                height: height ? height + 'px' : null
	            }
	        };


	        return (0, _vidom.node)(_Overlay2.default).setAttrs({ visible: visible, autoclosable: autoclosable, zIndexLevel: zIndexLevel, onHide: onHide }).setChildren((0, _vidom.node)('div').setAttrs(domAttrs).setRef(this._onPopupRef).setChildren((0, _vidom.node)(PopupContent).setAttrs({
	            'visible': visible && !hidden
	        }).setChildren((0, _vidom.normalizeChildren)(this.children))));
	    };

	    Popup.prototype.onUpdate = function onUpdate(_ref) {
	        var prevVisible = _ref.visible;
	        var visible = this.attrs.visible;


	        if (visible !== prevVisible) {
	            if (visible) {
	                this._enableVisibilityConstraints();
	                this._reposition();
	            } else {
	                this._disableVisibilityConstraints();
	            }
	        } else if (visible && !this.state.hidden && !_dom2.default.isVisible(this._getAnchor())) {
	            this.setState({ hidden: true });
	        }
	    };

	    Popup.prototype.onUnmount = function onUnmount() {
	        if (this.attrs.visible) {
	            this._disableVisibilityConstraints();
	        }
	    };

	    Popup.prototype._enableVisibilityConstraints = function _enableVisibilityConstraints() {
	        window.addEventListener('resize', this._onVisibilityConstraintsChange);

	        var anchor = this._getAnchor();

	        if (anchor instanceof Node) {
	            this._scrollableAnchorParentDomNodes = _dom2.default.findScrollableParents(anchor);

	            var i = 0;

	            while (i < this._scrollableAnchorParentDomNodes.length) {
	                this._scrollableAnchorParentDomNodes[i++].addEventListener('scroll', this._onVisibilityConstraintsChange);
	            }
	        }
	    };

	    Popup.prototype._disableVisibilityConstraints = function _disableVisibilityConstraints() {
	        window.removeEventListener('resize', this._onVisibilityConstraintsChange);

	        if (this._scrollableAnchorParentDomNodes) {
	            var i = 0;

	            while (i < this._scrollableAnchorParentDomNodes.length) {
	                this._scrollableAnchorParentDomNodes[i++].removeEventListener('scroll', this._onVisibilityConstraintsChange);
	            }

	            this._scrollableAnchorParentDomNodes = null;
	        }
	    };

	    Popup.prototype._onPopupRef = function _onPopupRef(domNode) {
	        this._popupDomNode = domNode;
	    };

	    Popup.prototype._onVisibilityConstraintsChange = function _onVisibilityConstraintsChange() {
	        this._reposition();
	    };

	    Popup.prototype._reposition = function _reposition() {
	        var _calcBestLayoutParams2 = this._calcBestLayoutParams(),
	            direction = _calcBestLayoutParams2.direction,
	            position = _calcBestLayoutParams2.position,
	            height = _calcBestLayoutParams2.height,
	            curState = this.state,
	            hidden = curState.hidden,
	            nextState = {
	            direction: direction,
	            left: position.left,
	            top: position.top,
	            height: height
	        };

	        if (nextState.left !== curState.left || nextState.top !== curState.top || nextState.direction !== curState.direction) {
	            this.setState(nextState);
	        }

	        if (hidden === this._calcIsAnchorVisible()) {
	            this.setState({ hidden: !hidden });
	        }
	    };

	    Popup.prototype._getAnchor = function _getAnchor() {
	        var anchor = this.attrs.anchor();

	        return 'left' in anchor && 'top' in anchor || anchor instanceof Node ? anchor : anchor.getDomNode();
	    };

	    Popup.prototype._calcBestLayoutParams = function _calcBestLayoutParams() {
	        var viewport = this._calcViewportDimensions(),
	            popup = this._calcPopupDimensions(),
	            anchor = this._calcAnchorDimensions(),
	            _attrs2 = this.attrs,
	            directions = _attrs2.directions,
	            restrictHeight = _attrs2.restrictHeight,
	            curDirection = this.state.direction;


	        var i = 0,
	            bestViewportFactor = 0,
	            bestDirection = void 0,
	            bestPosition = void 0,
	            direction = void 0,
	            position = void 0,
	            viewportFactor = void 0,
	            height = void 0;

	        while (direction = directions[i++]) {
	            position = this._calcPopupPosition(direction, anchor, popup);
	            viewportFactor = this._calcViewportFactor(position, viewport, popup);

	            if (i === 1 || viewportFactor > bestViewportFactor || !bestViewportFactor && curDirection === direction) {
	                bestDirection = direction;
	                bestViewportFactor = viewportFactor;
	                bestPosition = position;
	            }

	            if (bestViewportFactor > VIEWPORT_ACCURACY_FACTOR) {
	                break;
	            }
	        }

	        if (restrictHeight && bestViewportFactor <= VIEWPORT_ACCURACY_FACTOR) {
	            var viewportOffset = this.attrs.viewportOffset;


	            if (bestPosition.top + popup.height > viewport.bottom - viewportOffset) {
	                height = viewport.bottom - viewportOffset - bestPosition.top;
	            } else if (bestPosition.top < viewport.top + viewportOffset) {
	                var top = bestPosition.top;

	                bestPosition.top = viewport.top + viewportOffset;
	                height = popup.height + top - bestPosition.top;
	            }
	        }

	        return {
	            direction: bestDirection,
	            position: bestPosition,
	            height: height || null
	        };
	    };

	    Popup.prototype._calcAnchorDimensions = function _calcAnchorDimensions() {
	        var anchor = this._getAnchor();

	        if (!(anchor instanceof Node)) {
	            return {
	                left: anchor.left,
	                top: anchor.top,
	                width: 0,
	                height: 0
	            };
	        }

	        var anchorRect = anchor.getBoundingClientRect(),
	            viewportRect = document.documentElement.getBoundingClientRect();

	        return {
	            left: anchorRect.left - viewportRect.left,
	            top: anchorRect.top - viewportRect.top,
	            width: anchorRect.width,
	            height: anchorRect.height
	        };
	    };

	    Popup.prototype._calcViewportDimensions = function _calcViewportDimensions() {
	        var _window = window,
	            pageYOffset = _window.pageYOffset,
	            pageXOffset = _window.pageXOffset,
	            innerHeight = _window.innerHeight,
	            innerWidth = _window.innerWidth;


	        return {
	            left: pageXOffset,
	            top: pageYOffset,
	            right: pageXOffset + innerWidth,
	            bottom: pageYOffset + innerHeight
	        };
	    };

	    Popup.prototype._calcViewportFactor = function _calcViewportFactor(pos, viewport, popup) {
	        var viewportOffset = this.attrs.viewportOffset,
	            intersectionLeft = Math.max(pos.left, viewport.left + viewportOffset),
	            intersectionRight = Math.min(pos.left + popup.width, viewport.right - viewportOffset),
	            intersectionTop = Math.max(pos.top, viewport.top + viewportOffset),
	            intersectionBottom = Math.min(pos.top + popup.height, viewport.bottom - viewportOffset);


	        return intersectionLeft < intersectionRight && intersectionTop < intersectionBottom ?
	        // has intersection
	        (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop) / popup.area : 0;
	    };

	    Popup.prototype._calcPopupDimensions = function _calcPopupDimensions() {
	        var heightStyle = this._popupDomNode.style.height;

	        this._popupDomNode.style.height = 'auto';

	        var width = this._popupDomNode.offsetWidth,
	            height = this._popupDomNode.offsetHeight;

	        this._popupDomNode.style.height = heightStyle;

	        return {
	            width: width,
	            height: height,
	            area: width * height
	        };
	    };

	    Popup.prototype._calcPopupPosition = function _calcPopupPosition(direction, anchor, popup) {
	        var _attrs3 = this.attrs,
	            mainOffset = _attrs3.mainOffset,
	            secondaryOffset = _attrs3.secondaryOffset;

	        var left = void 0,
	            top = void 0;

	        if (checkMainDirection(direction, 'bottom')) {
	            top = anchor.top + anchor.height + mainOffset;
	        } else if (checkMainDirection(direction, 'top')) {
	            top = anchor.top - popup.height - mainOffset;
	        } else if (checkMainDirection(direction, 'left')) {
	            left = anchor.left - popup.width - mainOffset;
	        } else if (checkMainDirection(direction, 'right')) {
	            left = anchor.left + anchor.width + mainOffset;
	        }

	        if (checkSecondaryDirection(direction, 'right')) {
	            left = anchor.left + anchor.width - popup.width - secondaryOffset;
	        } else if (checkSecondaryDirection(direction, 'left')) {
	            left = anchor.left + secondaryOffset;
	        } else if (checkSecondaryDirection(direction, 'bottom')) {
	            top = anchor.top + anchor.height - popup.height - secondaryOffset;
	        } else if (checkSecondaryDirection(direction, 'top')) {
	            top = anchor.top + secondaryOffset;
	        } else if (checkSecondaryDirection(direction, 'center')) {
	            if (checkMainDirection(direction, 'top', 'bottom')) {
	                left = anchor.left + anchor.width / 2 - popup.width / 2;
	            } else if (checkMainDirection(direction, 'left', 'right')) {
	                top = anchor.top + anchor.height / 2 - popup.height / 2;
	            }
	        }

	        return {
	            left: left,
	            top: top,
	            right: left + popup.width,
	            bottom: top + popup.height
	        };
	    };

	    Popup.prototype._calcIsAnchorVisible = function _calcIsAnchorVisible() {
	        var anchor = this._getAnchor();

	        if (!(anchor instanceof Node)) {
	            return true;
	        }

	        var len = this._scrollableAnchorParentDomNodes.length;

	        if (len) {
	            var direction = this.state.direction,
	                anchorDim = this._calcAnchorDimensions(),
	                vertBorder = Math.floor(checkMainDirection(direction, 'top') || checkSecondaryDirection(direction, 'top') ? anchorDim.top : anchorDim.top + anchorDim.height),
	                horizBorder = Math.floor(checkMainDirection(direction, 'left') || checkSecondaryDirection(direction, 'left') ? anchorDim.left : anchorDim.left + anchorDim.width),
	                viewportRect = document.documentElement.getBoundingClientRect();

	            var i = 0;

	            while (i < len) {
	                var scrollableRect = this._scrollableAnchorParentDomNodes[i++].getBoundingClientRect(),
	                    left = Math.floor(scrollableRect.left - viewportRect.left),
	                    top = Math.floor(scrollableRect.top - viewportRect.top),
	                    width = scrollableRect.width,
	                    height = scrollableRect.height;


	                if (vertBorder < top || top + height < vertBorder || horizBorder < left || left + width < horizBorder) {
	                    return false;
	                }
	            }
	        }

	        return true;
	    };

	    return Popup;
	}(_vidom.Component);

	exports.default = Popup;


	Popup.defaultAttrs = {
	    directions: DEFAULT_DIRECTIONS,
	    mainOffset: 5,
	    onHide: _noOp2.default,
	    secondaryOffset: 0,
	    viewportOffset: 10,
	    visible: false,
	    zIndexLevel: 0
	};

	var PopupContent = function (_Component2) {
	    _inherits(PopupContent, _Component2);

	    function PopupContent() {
	        _classCallCheck(this, PopupContent);

	        return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
	    }

	    PopupContent.prototype.shouldUpdate = function shouldUpdate(_, prevChildren) {
	        return this.attrs.visible && this.children !== prevChildren;
	    };

	    PopupContent.prototype.onRender = function onRender() {
	        return (0, _vidom.node)('fragment').setChildren((0, _vidom.normalizeChildren)(this.children));
	    };

	    return PopupContent;
	}(_vidom.Component);

	function checkMainDirection(direction, mainDirection1, mainDirection2) {
	    return !direction.indexOf(mainDirection1) || mainDirection2 && !direction.indexOf(mainDirection2);
	}

	function checkSecondaryDirection(direction, secondaryDirection) {
	    return ~direction.indexOf('-' + secondaryDirection);
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(109);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Popup.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Popup.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Popup\n{\n    position: absolute;\n}\n", ""]);

	// exports


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Radio = __webpack_require__(111);

	var _Radio2 = _interopRequireDefault(_Radio);

	__webpack_require__(112);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Radio2.default;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _Button = __webpack_require__(69);

	var _Button2 = _interopRequireDefault(_Button);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('Radio');

	var Radio = function (_Component) {
	    _inherits(Radio, _Component);

	    function Radio() {
	        _classCallCheck(this, Radio);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Radio.prototype.onInit = function onInit() {
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onChange = this._onChange.bind(this);
	        this._onButtonFocusChange = this._onButtonFocusChange.bind(this);
	        this._onButtonCheckChange = this._onButtonCheckChange.bind(this);

	        this.setState({ focused: this.attrs.focused });
	    };

	    Radio.prototype.onAttrsChange = function onAttrsChange() {
	        var focused = this.attrs.focused;


	        if (typeof focused !== 'undefined' && focused !== this.state.focused) {
	            this.setState({ focused: focused });
	        }
	    };

	    Radio.prototype.onRender = function onRender() {
	        return this.attrs.type === 'button' ? this._renderAsButton() : this._renderAsInput();
	    };

	    Radio.prototype._renderAsInput = function _renderAsInput() {
	        var _attrs = this.attrs,
	            type = _attrs.type,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            checked = _attrs.checked,
	            disabled = _attrs.disabled,
	            name = _attrs.name,
	            value = _attrs.value,
	            text = _attrs.text,
	            title = _attrs.title,
	            focused = this.state.focused,
	            mods = {
	            type: type,
	            theme: theme || this.context.theme,
	            size: size,
	            name: name,
	            checked: checked,
	            focused: focused,
	            disabled: disabled
	        },
	            focusableAttrs = {};


	        if (!disabled) {
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;
	        }

	        return (0, _vidom.node)('label').setAttrs({
	            'class': b(mods),
	            'title': title
	        }).setChildren([(0, _vidom.node)('span').setAttrs({
	            'class': b('box')
	        }).setChildren((0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)('input').setAttrs({
	            'name': name,
	            'type': 'radio',
	            'autoComplete': 'off',
	            'class': b('control'),
	            'checked': checked,
	            'disabled': disabled,
	            'value': value,
	            'onChange': this._onChange
	        }))), (0, _vidom.node)('span').setAttrs({
	            'class': b('text'),
	            'role': 'presentation'
	        }).setChildren((0, _vidom.normalizeChildren)(text))]);
	    };

	    Radio.prototype._renderAsButton = function _renderAsButton() {
	        var _attrs2 = this.attrs,
	            mode = _attrs2.mode,
	            theme = _attrs2.theme,
	            size = _attrs2.size,
	            checked = _attrs2.checked,
	            disabled = _attrs2.disabled,
	            name = _attrs2.name,
	            value = _attrs2.value,
	            text = _attrs2.text,
	            title = _attrs2.title;


	        return (0, _vidom.node)('label').setAttrs({
	            'class': b({ checked: checked, disabled: disabled })
	        }).setChildren((0, _vidom.normalizeChildren)([checked ? (0, _vidom.node)('input').setKey('input').setAttrs({
	            'type': 'hidden',
	            'name': name,
	            'value': value
	        }) : null, (0, _vidom.node)(_Button2.default).setKey('button').setAttrs({
	            'theme': theme,
	            'size': size,
	            'togglable': mode === 'radioCheck' ? 'check' : 'radio',
	            'checked': checked,
	            'disabled': disabled,
	            'focused': this.state.focused,
	            'onFocusChange': this._onButtonFocusChange,
	            'onCheckChange': this._onButtonCheckChange,
	            'text': text,
	            'title': title
	        })]));
	    };

	    Radio.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this.setState({ focused: true });
	    };

	    Radio.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({ focused: false });
	    };

	    Radio.prototype._onChange = function _onChange(_ref) {
	        var target = _ref.target;
	        var _attrs3 = this.attrs,
	            onCheckChange = _attrs3.onCheckChange,
	            value = _attrs3.value;


	        onCheckChange(target.checked, value);
	    };

	    Radio.prototype._onButtonFocusChange = function _onButtonFocusChange(focused) {
	        if (focused) {
	            this._onFocus();
	        } else {
	            this._onBlur();
	        }
	    };

	    Radio.prototype._onButtonCheckChange = function _onButtonCheckChange(checked) {
	        var _attrs4 = this.attrs,
	            onCheckChange = _attrs4.onCheckChange,
	            value = _attrs4.value;


	        onCheckChange(checked, value);
	    };

	    return Radio;
	}(_vidom.Component);

	exports.default = Radio;


	Radio.defaultAttrs = {
	    onFocusChange: _noOp2.default,
	    onCheckChange: _noOp2.default
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(113);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Radio.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Radio.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Radio\n{\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n}\n", ""]);

	// exports


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _RadioGroup = __webpack_require__(115);

	var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _RadioGroup2.default;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Radio = __webpack_require__(110);

	var _Radio2 = _interopRequireDefault(_Radio);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('RadioGroup');

	var RadioGroup = function (_Component) {
	    _inherits(RadioGroup, _Component);

	    function RadioGroup() {
	        _classCallCheck(this, RadioGroup);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    RadioGroup.prototype.onInit = function onInit() {
	        this._onRadioChange = this._onRadioChange.bind(this);
	    };

	    RadioGroup.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var _attrs = this.attrs,
	            mode = _attrs.mode,
	            type = _attrs.type,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            name = _attrs.name,
	            value = _attrs.value,
	            disabled = _attrs.disabled,
	            children = this.children;


	        return (0, _vidom.node)('span').setAttrs({
	            'class': b({ type: type, theme: theme || this.context.theme, size: size }) + ' ControlGroup'
	        }).setChildren((0, _vidom.normalizeChildren)((Array.isArray(children) ? children : [children]).map(function (child) {
	            var attrs = {
	                type: type,
	                mode: mode,
	                theme: theme,
	                size: size,
	                name: name,
	                checked: value === child.attrs.value,
	                onCheckChange: _this2._onRadioChange
	            };

	            if (disabled) {
	                attrs.disabled = disabled;
	            }

	            return child.clone().setAttrs(attrs);
	        })));
	    };

	    RadioGroup.prototype._onRadioChange = function _onRadioChange(radioChecked, radioValue) {
	        this.attrs.onValueChange(radioChecked ? radioValue : null);
	    };

	    return RadioGroup;
	}(_vidom.Component);

	exports.default = RadioGroup;


	RadioGroup.defaultAttrs = {
	    type: 'line',
	    onValueChange: _noOp2.default
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.SelectOptionGroup = exports.SelectOption = undefined;

	var _Select = __webpack_require__(117);

	var _Select2 = _interopRequireDefault(_Select);

	__webpack_require__(118);

	var _Menu = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Select2.default;
	exports.SelectOption = _Menu.MenuItem;
	exports.SelectOptionGroup = _Menu.MenuItemGroup;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Button = __webpack_require__(69);

	var _Button2 = _interopRequireDefault(_Button);

	var _Popup = __webpack_require__(106);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _Menu = __webpack_require__(91);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Icon = __webpack_require__(83);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _keyCodes = __webpack_require__(73);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('Select'),
	    POPUP_DIRECTIONS = ['bottom-left', 'top-left'];

	var Select = function (_Component) {
	    _inherits(Select, _Component);

	    function Select() {
	        _classCallCheck(this, Select);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Select.prototype.onInit = function onInit() {
	        this._buttonRef = null;

	        this._onKeyDown = this._onKeyDown.bind(this);
	        this._onButtonRef = this._onButtonRef.bind(this);
	        this._onButtonClick = this._onButtonClick.bind(this);
	        this._onButtonFocusChange = this._onButtonFocusChange.bind(this);
	        this._onPopupHide = this._onPopupHide.bind(this);
	        this._onMenuValueChange = this._onMenuValueChange.bind(this);
	        this._onMenuItemClick = this._onMenuItemClick.bind(this);

	        this.setState({
	            buttonFocused: !!this.attrs.focused,
	            menuFocused: false,
	            opened: false
	        });
	    };

	    Select.prototype.onAttrsChange = function onAttrsChange() {
	        var _attrs = this.attrs,
	            focused = _attrs.focused,
	            disabled = _attrs.disabled,
	            _state = this.state,
	            buttonFocused = _state.buttonFocused,
	            menuFocused = _state.menuFocused,
	            opened = _state.opened;


	        if (typeof focused !== 'undefined') {
	            if (focused) {
	                if (!buttonFocused && !menuFocused) {
	                    this.setState({ buttonFocused: true });
	                }
	            } else if (buttonFocused) {
	                this.setState({ buttonFocused: false });
	            } else if (menuFocused) {
	                this.setState({ menuFocused: false });
	            }
	        }

	        if (disabled && opened) {
	            this.setState({ opened: false, menuFocused: false });
	        }
	    };

	    Select.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var _attrs2 = this.attrs,
	            theme = _attrs2.theme,
	            size = _attrs2.size,
	            mode = _attrs2.mode,
	            disabled = _attrs2.disabled,
	            width = _attrs2.width,
	            value = _attrs2.value,
	            renderText = _attrs2.renderText,
	            placeholder = _attrs2.placeholder,
	            _state2 = this.state,
	            menuFocused = _state2.menuFocused,
	            buttonFocused = _state2.buttonFocused,
	            opened = _state2.opened,
	            resTheme = theme || this.context.theme,
	            domAttrs = {
	            className: b({ theme: resTheme, mode: mode, size: size, opened: opened, disabled: disabled, width: width })
	        };


	        if (buttonFocused) {
	            domAttrs.onKeyDown = this._onKeyDown;
	        }

	        return (0, _vidom.node)('div').setAttrs(domAttrs).setChildren([(0, _vidom.node)(_Button2.default).setAttrs({
	            'theme': theme,
	            'size': size,
	            'text': renderText(this._getCheckedItem(), placeholder),
	            'afterIcon': (0, _vidom.node)(_Icon2.default).setAttrs({
	                'mix': b('tick')
	            }),
	            'focused': buttonFocused,
	            'disabled': disabled,
	            'width': width,
	            'mix': b('button'),
	            'onClick': this._onButtonClick,
	            'onFocusChange': this._onButtonFocusChange
	        }).setRef(this._onButtonRef), (0, _vidom.node)(_Popup2.default).setAttrs({
	            'theme': theme,
	            'visible': opened,
	            'autoclosable': true,
	            'onHide': this._onPopupHide,
	            'anchor': function () {
	                return _this2._buttonRef;
	            },
	            'directions': POPUP_DIRECTIONS,
	            'restrictHeight': true
	        }).setChildren((0, _vidom.node)(_Menu2.default).setAttrs({
	            'mode': mode,
	            'theme': theme,
	            'size': size,
	            'mix': b('menu'),
	            'focused': menuFocused,
	            'disabled': disabled,
	            'value': value,
	            'onValueChange': this._onMenuValueChange,
	            'onItemClick': this._onMenuItemClick,
	            'onKeyDown': this._onMenuKeyDown
	        }).setChildren((0, _vidom.normalizeChildren)(this.children)))]);
	    };

	    Select.prototype.onUpdate = function onUpdate(prevAttrs, prevChildren, prevState) {
	        var _state3 = this.state,
	            opened = _state3.opened,
	            buttonFocused = _state3.buttonFocused,
	            menuFocused = _state3.menuFocused;


	        if (opened && !prevState.opened) {
	            if (buttonFocused || !menuFocused) {
	                this.setState({ buttonFocused: false, menuFocused: true });
	            }
	        }
	    };

	    Select.prototype._onButtonRef = function _onButtonRef(ref) {
	        this._buttonRef = ref;
	    };

	    Select.prototype._onKeyDown = function _onKeyDown(_ref) {
	        var keyCode = _ref.nativeEvent.keyCode;

	        if (keyCode === _keyCodes2.default.UP || keyCode === _keyCodes2.default.DOWN) {
	            this.setState({ opened: true });
	        }
	    };

	    Select.prototype._onButtonClick = function _onButtonClick() {
	        this.setState({ opened: !this.state.opened });
	    };

	    Select.prototype._onButtonFocusChange = function _onButtonFocusChange(buttonFocused) {
	        this.setState({ buttonFocused: buttonFocused });
	    };

	    Select.prototype._onPopupHide = function _onPopupHide(_ref2) {
	        var reason = _ref2.reason;

	        this.setState({
	            opened: false,
	            buttonFocused: reason !== 'outside-click',
	            menuFocused: false
	        });
	    };

	    Select.prototype._onMenuValueChange = function _onMenuValueChange(value) {
	        this.attrs.onValueChange(value);
	    };

	    Select.prototype._onMenuItemClick = function _onMenuItemClick() {
	        this.setState({
	            opened: false,
	            buttonFocused: true,
	            menuFocused: false
	        });
	    };

	    Select.prototype._onMenuKeyDown = function _onMenuKeyDown(e) {
	        if (e.nativeEvent.keyCode === _keyCodes2.default.TAB) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    };

	    Select.prototype._getCheckedItem = function _getCheckedItem() {
	        var value = this.attrs.value,
	            children = this.children,
	            options = childrenToOptions(children);


	        for (var i = 0, option; i < options.length; i++) {
	            option = options[i];
	            if (option._component === _Menu.MenuItemGroup) {
	                for (var j = 0, groupOptions = childrenToOptions(option.children); j < groupOptions.length; j++) {
	                    if (groupOptions[j].attrs.value === value) {
	                        return groupOptions[j];
	                    }
	                }
	            } else if (option.attrs.value === value) {
	                return option;
	            }
	        }

	        return null;
	    };

	    return Select;
	}(_vidom.Component);

	exports.default = Select;


	function childrenToOptions(children) {
	    return children ? Array.isArray(children) ? children : [children] : [];
	}

	Select.defaultAttrs = {
	    mode: 'radio',
	    onFocusChange: _noOp2.default,
	    onValueChange: _noOp2.default,
	    placeholder: '—',
	    renderText: function (item, placeholder) {
	        return item ? item.children : placeholder;
	    }
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(119);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Select.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Select.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Select {\n    display: inline-block;\n}\n\n.Select__menu {\n    height: 100%;\n}\n", ""]);

	// exports


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Spinner = __webpack_require__(121);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Spinner2.default;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = Spinner;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = (0, _bem2.default)('Spinner');

	function Spinner(_ref) {
	    var theme = _ref.theme,
	        size = _ref.size,
	        mix = _ref.mix;

	    var className = b({
	        theme: theme || this.context.theme,
	        size: size
	    });

	    if (mix) {
	        className += ' ' + mix;
	    }

	    return (0, _vidom.node)('span').setAttrs({
	        'class': className
	    });
	}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _TextArea = __webpack_require__(123);

	var _TextArea2 = _interopRequireDefault(_TextArea);

	__webpack_require__(124);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _TextArea2.default;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('TextArea');

	var TextArea = function (_Component) {
	    _inherits(TextArea, _Component);

	    function TextArea() {
	        _classCallCheck(this, TextArea);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    TextArea.prototype.onInit = function onInit() {
	        var focused = this.attrs.focused;


	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onValueChange = this._onValueChange.bind(this);

	        this.setState({ focused: focused });
	    };

	    TextArea.prototype.onAttrsChange = function onAttrsChange() {
	        var focused = this.attrs.focused;


	        if (typeof focused !== 'undefined' && focused !== this.state.focused) {
	            this.setState({ focused: focused });
	        }
	    };

	    TextArea.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            disabled = _attrs.disabled,
	            name = _attrs.name,
	            value = _attrs.value,
	            placeholder = _attrs.placeholder,
	            width = _attrs.width,
	            focused = this.state.focused,
	            mods = {
	            theme: theme || this.context.theme,
	            size: size,
	            name: name,
	            focused: focused,
	            disabled: disabled,
	            width: width
	        },
	            focusableAttrs = {};


	        if (!disabled) {
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;
	        }

	        return (0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)('textarea').setAttrs({
	            'class': b(mods),
	            'name': name,
	            'value': value,
	            'placeholder': placeholder,
	            'disabled': disabled,
	            'onChange': this._onValueChange
	        }));
	    };

	    TextArea.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this.setState({ focused: true });
	    };

	    TextArea.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({ focused: false });
	    };

	    TextArea.prototype._onValueChange = function _onValueChange(_ref) {
	        var target = _ref.target;

	        this.getAttrs().onValueChange(target.value);
	    };

	    return TextArea;
	}(_vidom.Component);

	exports.default = TextArea;


	TextArea.defaultAttrs = {
	    onFocusChange: _noOp2.default,
	    onValueChange: _noOp2.default
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(125);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./TextArea.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./TextArea.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".TextArea {\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n}\n", ""]);

	// exports


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _TextInput = __webpack_require__(127);

	var _TextInput2 = _interopRequireDefault(_TextInput);

	__webpack_require__(128);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _TextInput2.default;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _Focusable = __webpack_require__(71);

	var _Focusable2 = _interopRequireDefault(_Focusable);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _noOp = __webpack_require__(74);

	var _noOp2 = _interopRequireDefault(_noOp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('TextInput');

	var TextInput = function (_Component) {
	    _inherits(TextInput, _Component);

	    function TextInput() {
	        _classCallCheck(this, TextInput);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    TextInput.prototype.onInit = function onInit() {
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onValueChange = this._onValueChange.bind(this);
	        this._onClearClick = this._onClearClick.bind(this);

	        this.setState({ focused: this.attrs.focused });
	    };

	    TextInput.prototype.onAttrsChange = function onAttrsChange() {
	        var focused = this.attrs.focused;


	        if (typeof focused !== 'undefined' && focused !== this.state.focused) {
	            this.setState({ focused: focused });
	        }
	    };

	    TextInput.prototype.onRender = function onRender() {
	        var _attrs = this.attrs,
	            type = _attrs.type,
	            theme = _attrs.theme,
	            size = _attrs.size,
	            disabled = _attrs.disabled,
	            name = _attrs.name,
	            value = _attrs.value,
	            maxLength = _attrs.maxLength,
	            placeholder = _attrs.placeholder,
	            hasClear = _attrs.hasClear,
	            width = _attrs.width,
	            focused = this.state.focused,
	            mods = {
	            theme: theme || this.context.theme,
	            size: size,
	            name: name,
	            focused: focused,
	            disabled: disabled,
	            hasClear: hasClear,
	            width: width
	        },
	            focusableAttrs = {};


	        if (!disabled) {
	            focusableAttrs.focused = focused;
	            focusableAttrs.onFocus = this._onFocus;
	            focusableAttrs.onBlur = this._onBlur;
	        }

	        return (0, _vidom.node)('span').setAttrs({
	            'class': b(mods)
	        }).setChildren((0, _vidom.node)('span').setAttrs({
	            'class': b('box')
	        }).setChildren((0, _vidom.normalizeChildren)([(0, _vidom.node)(_Focusable2.default).setAttrs(focusableAttrs).setChildren((0, _vidom.node)('input').setAttrs({
	            'class': b('control'),
	            'type': type,
	            'name': name,
	            'value': value,
	            'maxlength': maxLength,
	            'placeholder': placeholder,
	            'disabled': disabled,
	            'onChange': this._onValueChange
	        })), hasClear ? (0, _vidom.node)('span').setAttrs({
	            'class': b('clear', { visible: !!value }),
	            'onClick': this._onClearClick
	        }) : null])));
	    };

	    TextInput.prototype._onFocus = function _onFocus() {
	        this.attrs.onFocusChange(true);
	        this.setState({ focused: true });
	    };

	    TextInput.prototype._onBlur = function _onBlur() {
	        this.attrs.onFocusChange(false);
	        this.setState({ focused: false });
	    };

	    TextInput.prototype._onValueChange = function _onValueChange(_ref) {
	        var target = _ref.target;

	        this.attrs.onValueChange(target.value);
	    };

	    TextInput.prototype._onClearClick = function _onClearClick() {
	        this.attrs.onValueChange('');
	        this._onFocus();
	    };

	    return TextInput;
	}(_vidom.Component);

	exports.default = TextInput;


	TextInput.defaultAttrs = {
	    onFocusChange: _noOp2.default,
	    onValueChange: _noOp2.default
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(129);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./TextInput.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./TextInput.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".TextInput {\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n}\n", ""]);

	// exports


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ text: 'Click me' });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var text = this.state.text;


	        return (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'view': 'action',
	            'onClick': function () {
	                return _this2.setState({ text: 'I\'m clicked' });
	            },
	            'text': text
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IconExample = function (_Component) {
	    _inherits(IconExample, _Component);

	    function IconExample() {
	        _classCallCheck(this, IconExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    IconExample.prototype.onInit = function onInit() {
	        this.setState({ text: 'Click me' });
	    };

	    IconExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var text = this.state.text,
	            icon = (0, _vidom.node)(_vidomComponents.Icon).setChildren((0, _vidom.node)('svg').setNs('http://www.w3.org/2000/svg').setAttrs({
	            'width': '16',
	            'height': '16'
	        }).setChildren((0, _vidom.node)('path').setAttrs({
	            'd': 'M1 13v2h14v-2H1zm13-7h-3V1H5v5.03L2 6l6 6 6-6z'
	        })));


	        return (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                return _this2.setState({ text: 'I\'m clicked' });
	            },
	            'beforeIcon': icon,
	            'text': text
	        });
	    };

	    return IconExample;
	}(_vidom.Component);

	exports.default = IconExample;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = LinkExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function LinkExample() {
	    return (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	        "type": "link",
	        "theme": "islands",
	        "size": "m",
	        "url": "",
	        "text": "Click me"
	    });
	}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DisabledExample = function (_Component) {
	    _inherits(DisabledExample, _Component);

	    function DisabledExample() {
	        _classCallCheck(this, DisabledExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    DisabledExample.prototype.onRender = function onRender() {
	        return (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'disabled': true,
	            'text': 'I\'m disabled'
	        });
	    };

	    return DisabledExample;
	}(_vidom.Component);

	exports.default = DisabledExample;

/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Button } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ text : 'Click me' });\n    }\n\n    onRender() {\n        const { text } = this.state;\n\n        return (\n            <Button\n                theme=\"islands\"\n                size=\"m\"\n                onClick={ () => this.setState({ text : 'I\\'m clicked' }) }\n                text={ text }\n            />\n        );\n    }\n}\n"

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Button } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ text : 'Click me' });\n    }\n\n    onRender() {\n        const { text } = this.state;\n\n        return (\n            <Button\n                theme=\"islands\"\n                size=\"m\"\n                view=\"action\"\n                onClick={ () => this.setState({ text : 'I\\'m clicked' }) }\n                text={ text }\n            />\n        );\n    }\n}\n"

/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Button, Icon } from 'vidom-components';\n\nexport default class IconExample extends Component {\n    onInit() {\n        this.setState({ text : 'Click me' });\n    }\n\n    onRender() {\n        const { text } = this.state,\n            icon = (\n                <Icon>\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                        <path d=\"M1 13v2h14v-2H1zm13-7h-3V1H5v5.03L2 6l6 6 6-6z\"/>\n                    </svg>\n                </Icon>\n            );\n\n        return (\n            <Button\n                theme=\"islands\"\n                size=\"m\"\n                onClick={ () => this.setState({ text : 'I\\'m clicked' }) }\n                beforeIcon={ icon }\n                text={ text }\n            />\n        );\n    }\n}\n"

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = "import { Button } from 'vidom-components';\n\nexport default function LinkExample() {\n    return (\n        <Button\n            type=\"link\"\n            theme=\"islands\"\n            size=\"m\"\n            url=\"\"\n            text=\"Click me\"\n        />\n    );\n}\n"

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Button } from 'vidom-components';\n\nexport default class DisabledExample extends Component {\n    onRender() {\n        return (\n            <Button\n                theme=\"islands\"\n                size=\"m\"\n                disabled\n                text=\"I'm disabled\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = CheckBoxDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(140);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _ButtonExample = __webpack_require__(141);

	var _ButtonExample2 = _interopRequireDefault(_ButtonExample);

	var _SimpleExample3 = __webpack_require__(142);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _ButtonExample3 = __webpack_require__(143);

	var _ButtonExample4 = _interopRequireDefault(_ButtonExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function CheckBoxDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'CheckBox'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Button',
	        'code': _ButtonExample4.default
	    }).setChildren((0, _vidom.node)(_ButtonExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'checked',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Checks the checkbox if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables the checkbox if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Focuses the checkbox if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'name',
	        'type': 'String'
	    }).setChildren('Sets the same html attribute of the checkbox.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onCheckChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle checked change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the checkbox size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren(' if '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren(' attribute is set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren(' and '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' for other ones.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'text',
	        'type': 'String'
	    }).setChildren('The text to display for the checkbox.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the checkbox theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'title',
	        'type': 'String'
	    }).setChildren('The title displayed as a tooltip.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'type',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables additional behaviour if passed.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('The only supported value is '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren('The value of the checkbox.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children are not allowed and ignored.'))])]));
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ checked: false });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var checked = this.state.checked;


	        return (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'checked': checked,
	            'onCheckChange': function (checked) {
	                return _this2.setState({ checked: checked });
	            },
	            'text': 'check me'
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ checked: false });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var checked = this.state.checked;


	        return (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'type': 'button',
	            'theme': 'islands',
	            'size': 'm',
	            'checked': checked,
	            'onCheckChange': function (checked) {
	                return _this2.setState({ checked: checked });
	            },
	            'text': 'check me'
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { CheckBox } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ checked : false });\n    }\n\n    onRender() {\n        const { checked } = this.state;\n\n        return (\n            <CheckBox\n                theme=\"islands\"\n                size=\"m\"\n                checked={ checked }\n                onCheckChange={ checked => this.setState({ checked }) }\n                text=\"check me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 143 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { CheckBox } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ checked : false });\n    }\n\n    onRender() {\n        const { checked } = this.state;\n\n        return (\n            <CheckBox\n                type=\"button\"\n                theme=\"islands\"\n                size=\"m\"\n                checked={ checked }\n                onCheckChange={ checked => this.setState({ checked }) }\n                text=\"check me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = CheckBoxGroupDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(145);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _ButtonExample = __webpack_require__(146);

	var _ButtonExample2 = _interopRequireDefault(_ButtonExample);

	var _SimpleExample3 = __webpack_require__(147);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _ButtonExample3 = __webpack_require__(148);

	var _ButtonExample4 = _interopRequireDefault(_ButtonExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function CheckBoxGroupDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'CheckBoxGroup'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Button',
	        'code': _ButtonExample4.default
	    }).setChildren((0, _vidom.node)(_ButtonExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables all the items if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'name',
	        'type': 'String'
	    }).setChildren('Sets the same attribute for the child checkboxes.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onValueChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle value change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the size for the child checkboxes.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren(' if '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren(' attribute is set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren(' and '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' for other ones.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the theme for the child checkboxes.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'type',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the same attribute for the child checkboxes.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('The only supported value is '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String[ ]'
	    }).setChildren('Current value.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren([(0, _vidom.node)('text').setChildren('Each child is expected to be a '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<CheckBox/>'), (0, _vidom.node)('text').setChildren('. Following attributes of '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<CheckBox/>'), (0, _vidom.node)('text').setChildren(' are filled automatically by '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<CheckBoxGroup/>'), (0, _vidom.node)('text').setChildren(': '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('checked'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('name'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('size'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('theme'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren('.')]))])]));
	}

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ value: [1, 3] });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.CheckBoxGroup).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-1',
	            'value': 1
	        }), (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-2',
	            'value': 2
	        }), (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-3',
	            'value': 3
	        }), (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-4',
	            'value': 4,
	            'disabled': true
	        })]);
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ value: [1, 3] });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.CheckBoxGroup).setAttrs({
	            'type': 'button',
	            'theme': 'islands',
	            'size': 'm',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-1',
	            'value': 1
	        }), (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-2',
	            'value': 2
	        }), (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-3',
	            'value': 3
	        }), (0, _vidom.node)(_vidomComponents.CheckBox).setAttrs({
	            'text': 'item-4',
	            'value': 4,
	            'disabled': true
	        })]);
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { CheckBoxGroup, CheckBox } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ value : [1, 3] });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <CheckBoxGroup\n                theme=\"islands\"\n                size=\"m\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n            >\n                <CheckBox text=\"item-1\" value={ 1 }/>\n                <CheckBox text=\"item-2\" value={ 2 }/>\n                <CheckBox text=\"item-3\" value={ 3 }/>\n                <CheckBox text=\"item-4\" value={ 4 } disabled/>\n            </CheckBoxGroup>\n        );\n    }\n}\n"

/***/ },
/* 148 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { CheckBoxGroup, CheckBox } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ value : [1, 3] });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <CheckBoxGroup\n                type=\"button\"\n                theme=\"islands\"\n                size=\"m\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n            >\n                <CheckBox text=\"item-1\" value={ 1 }/>\n                <CheckBox text=\"item-2\" value={ 2 }/>\n                <CheckBox text=\"item-3\" value={ 3 }/>\n                <CheckBox text=\"item-4\" value={ 4 } disabled/>\n            </CheckBoxGroup>\n        );\n    }\n}\n"

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = IconDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(150);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _SimpleExample3 = __webpack_require__(151);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function IconDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Icon'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren((0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default))), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren((0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mix',
	        'type': 'String'
	    }).setChildren('Additional css class.')), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children with any valid type are allowed.'))])]));
	}

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SimpleExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SimpleExample() {
	    return (0, _vidom.node)(_vidomComponents.Icon).setChildren((0, _vidom.node)("svg").setNs("http://www.w3.org/2000/svg").setAttrs({
	        "width": "16",
	        "height": "16"
	    }).setChildren((0, _vidom.node)("path").setAttrs({
	        "d": "M1 13v2h14v-2H1zm13-7h-3V1H5v5.03L2 6l6 6 6-6z"
	    })));
	}

/***/ },
/* 151 */
/***/ function(module, exports) {

	module.exports = "import { Icon } from 'vidom-components';\n\nexport default function SimpleExample() {\n    return (\n        <Icon>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                <path d=\"M1 13v2h14v-2H1zm13-7h-3V1H5v5.03L2 6l6 6 6-6z\"/>\n            </svg>\n        </Icon>\n    );\n}\n"

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = LinkDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(153);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _PseudoExample = __webpack_require__(154);

	var _PseudoExample2 = _interopRequireDefault(_PseudoExample);

	var _ExternalExample = __webpack_require__(155);

	var _ExternalExample2 = _interopRequireDefault(_ExternalExample);

	var _DisabledExample = __webpack_require__(156);

	var _DisabledExample2 = _interopRequireDefault(_DisabledExample);

	var _SimpleExample3 = __webpack_require__(157);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _ExternalExample3 = __webpack_require__(158);

	var _ExternalExample4 = _interopRequireDefault(_ExternalExample3);

	var _PseudoExample3 = __webpack_require__(159);

	var _PseudoExample4 = _interopRequireDefault(_PseudoExample3);

	var _DisabledExample3 = __webpack_require__(160);

	var _DisabledExample4 = _interopRequireDefault(_DisabledExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function LinkDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Link'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'External',
	        'code': _ExternalExample4.default
	    }).setChildren((0, _vidom.node)(_ExternalExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Pseudo',
	        'code': _PseudoExample4.default
	    }).setChildren((0, _vidom.node)(_PseudoExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Disabled',
	        'code': _DisabledExample4.default
	    }).setChildren((0, _vidom.node)(_DisabledExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Disables the link if set to true.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Focuses the link if set to true.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mix',
	        'type': 'String'
	    }).setChildren('Additional css class.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onClick',
	        'type': 'Function'
	    }).setChildren('The callback to handle click event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the link size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'target',
	        'type': 'String'
	    }).setChildren('Sets the link target.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the link theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'title',
	        'type': 'String'
	    }).setChildren('The title displayed as a tooltip.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'view',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables additional appearance to the link.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('action'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('plain'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'url',
	        'type': 'String'
	    }).setChildren('The URL to link to when the link is clicked.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children with any valid type are allowed.'))])]));
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SimpleExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SimpleExample() {
	    return (0, _vidom.node)(_vidomComponents.Link).setAttrs({
	        "theme": "islands",
	        "size": "m",
	        "url": ""
	    }).setChildren("click me");
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = PseudoExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function PseudoExample() {
	    return (0, _vidom.node)(_vidomComponents.Link).setAttrs({
	        "theme": "islands",
	        "size": "m",
	        "pseudo": true,
	        "url": ""
	    }).setChildren("click me");
	}

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = ExternalExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function ExternalExample() {
	    return (0, _vidom.node)(_vidomComponents.Link).setAttrs({
	        "theme": "islands",
	        "size": "m",
	        "view": "external",
	        "url": ""
	    }).setChildren("click me");
	}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SimpleExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SimpleExample() {
	    return (0, _vidom.node)(_vidomComponents.Link).setAttrs({
	        "theme": "islands",
	        "size": "m",
	        "url": "",
	        "disabled": true
	    }).setChildren("I'm disabled");
	}

/***/ },
/* 157 */
/***/ function(module, exports) {

	module.exports = "import { Link } from 'vidom-components';\n\nexport default function SimpleExample() {\n    return (\n        <Link\n            theme=\"islands\"\n            size=\"m\"\n            url=\"\"\n        >\n            click me\n        </Link>\n    );\n}\n"

/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = "import { Link } from 'vidom-components';\n\nexport default function ExternalExample() {\n    return (\n        <Link\n            theme=\"islands\"\n            size=\"m\"\n            view=\"external\"\n            url=\"\"\n        >\n            click me\n        </Link>\n    );\n}\n"

/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = "import { Link } from 'vidom-components';\n\nexport default function PseudoExample() {\n    return (\n        <Link\n            theme=\"islands\"\n            size=\"m\"\n            pseudo\n            url=\"\"\n        >\n            click me\n        </Link>\n    );\n}\n"

/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = "import { Link } from 'vidom-components';\n\nexport default function SimpleExample() {\n    return (\n        <Link\n            theme=\"islands\"\n            size=\"m\"\n            url=\"\"\n            disabled\n        >\n            I'm disabled\n        </Link>\n    );\n}\n"

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = MenuDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(162);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _GroupExample = __webpack_require__(163);

	var _GroupExample2 = _interopRequireDefault(_GroupExample);

	var _RadioModeExample = __webpack_require__(164);

	var _RadioModeExample2 = _interopRequireDefault(_RadioModeExample);

	var _CheckModeExample = __webpack_require__(165);

	var _CheckModeExample2 = _interopRequireDefault(_CheckModeExample);

	var _RadioCheckModeExample = __webpack_require__(166);

	var _RadioCheckModeExample2 = _interopRequireDefault(_RadioCheckModeExample);

	var _SimpleExample3 = __webpack_require__(167);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _GroupExample3 = __webpack_require__(168);

	var _GroupExample4 = _interopRequireDefault(_GroupExample3);

	var _RadioModeExample3 = __webpack_require__(169);

	var _RadioModeExample4 = _interopRequireDefault(_RadioModeExample3);

	var _CheckModeExample3 = __webpack_require__(170);

	var _CheckModeExample4 = _interopRequireDefault(_CheckModeExample3);

	var _radioCheckModeExample = __webpack_require__(171);

	var _radioCheckModeExample2 = _interopRequireDefault(_radioCheckModeExample);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function MenuDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Menu'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Group',
	        'code': _GroupExample4.default
	    }).setChildren((0, _vidom.node)(_GroupExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'RadioMode',
	        'code': _RadioModeExample4.default
	    }).setChildren((0, _vidom.node)(_RadioModeExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'CheckMode',
	        'code': _CheckModeExample4.default
	    }).setChildren((0, _vidom.node)(_CheckModeExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'RadioCheckMode',
	        'code': _radioCheckModeExample2.default
	    }).setChildren((0, _vidom.node)(_RadioCheckModeExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables all the menu items if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mode',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables the menu to have a value and menu items to be selected.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('radio'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('radioCheck'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('check'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onItemClick',
	        'type': 'Function'
	    }).setChildren('The callback to handle click event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onValueChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle value change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the menu size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xs'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the menu theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Current value. Makes sense with specified '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('mode'), (0, _vidom.node)('text').setChildren(' attribute.')])]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren([(0, _vidom.node)('text').setChildren('Each child is expected to be either a '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<MenuItem/>'), (0, _vidom.node)('text').setChildren(' or a '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<MenuItemGroup/>'), (0, _vidom.node)('text').setChildren('.')]))])]));
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SimpleExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SimpleExample() {
	    return (0, _vidom.node)(_vidomComponents.Menu).setAttrs({
	        "theme": "islands",
	        "size": "m"
	    }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-1"), (0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-2"), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	        "disabled": true
	    }).setChildren("item-3"), (0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-4"), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	        "disabled": true
	    }).setChildren("item-5")]);
	}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SimpleExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SimpleExample() {
	    return (0, _vidom.node)(_vidomComponents.Menu).setAttrs({
	        "theme": "islands",
	        "size": "m"
	    }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItemGroup).setAttrs({
	        "title": "group-1"
	    }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-1"), (0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-2"), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	        "disabled": true
	    }).setChildren("item-3"), (0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-4"), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	        "disabled": true
	    }).setChildren("item-5")]), (0, _vidom.node)(_vidomComponents.MenuItemGroup).setAttrs({
	        "title": "group-2"
	    }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-6"), (0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-7"), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	        "disabled": true
	    }).setChildren("item-8"), (0, _vidom.node)(_vidomComponents.MenuItem).setChildren("item-9"), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	        "disabled": true
	    }).setChildren("item-10")])]);
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioModeExample = function (_Component) {
	    _inherits(RadioModeExample, _Component);

	    function RadioModeExample() {
	        _classCallCheck(this, RadioModeExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    RadioModeExample.prototype.onInit = function onInit() {
	        this.setState({ value: '2' });
	    };

	    RadioModeExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        return (0, _vidom.node)(_vidomComponents.Menu).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'mode': 'radio',
	            'value': this.state.value,
	            'onValueChange': function (value) {
	                _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '1'
	        }).setChildren('item-1'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '2'
	        }).setChildren('item-2'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '3'
	        }).setChildren('item-3'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '4'
	        }).setChildren('item-4')]);
	    };

	    return RadioModeExample;
	}(_vidom.Component);

	exports.default = RadioModeExample;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CheckModeExample = function (_Component) {
	    _inherits(CheckModeExample, _Component);

	    function CheckModeExample() {
	        _classCallCheck(this, CheckModeExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    CheckModeExample.prototype.onInit = function onInit() {
	        this.setState({ value: ['2', '4'] });
	    };

	    CheckModeExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        return (0, _vidom.node)(_vidomComponents.Menu).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'mode': 'check',
	            'value': this.state.value,
	            'onValueChange': function (value) {
	                _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '1'
	        }).setChildren('item-1'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '2'
	        }).setChildren('item-2'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '3'
	        }).setChildren('item-3'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '4'
	        }).setChildren('item-4')]);
	    };

	    return CheckModeExample;
	}(_vidom.Component);

	exports.default = CheckModeExample;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioCheckModeExample = function (_Component) {
	    _inherits(RadioCheckModeExample, _Component);

	    function RadioCheckModeExample() {
	        _classCallCheck(this, RadioCheckModeExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    RadioCheckModeExample.prototype.onInit = function onInit() {
	        this.setState({ value: '2' });
	    };

	    RadioCheckModeExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        return (0, _vidom.node)(_vidomComponents.Menu).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'mode': 'radioCheck',
	            'value': this.state.value,
	            'onValueChange': function (value) {
	                _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '1'
	        }).setChildren('item-1'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '2'
	        }).setChildren('item-2'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '3'
	        }).setChildren('item-3'), (0, _vidom.node)(_vidomComponents.MenuItem).setAttrs({
	            'value': '4'
	        }).setChildren('item-4')]);
	    };

	    return RadioCheckModeExample;
	}(_vidom.Component);

	exports.default = RadioCheckModeExample;

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "import { Menu, MenuItem } from 'vidom-components';\n\nexport default function SimpleExample() {\n    return (\n        <Menu theme=\"islands\" size=\"m\">\n            <MenuItem>item-1</MenuItem>\n            <MenuItem>item-2</MenuItem>\n            <MenuItem disabled>item-3</MenuItem>\n            <MenuItem>item-4</MenuItem>\n            <MenuItem disabled>item-5</MenuItem>\n        </Menu>\n    );\n}\n"

/***/ },
/* 168 */
/***/ function(module, exports) {

	module.exports = "import { Menu, MenuItem, MenuItemGroup } from 'vidom-components';\n\nexport default function SimpleExample() {\n    return (\n        <Menu theme=\"islands\" size=\"m\">\n            <MenuItemGroup title=\"group-1\">\n                <MenuItem>item-1</MenuItem>\n                <MenuItem>item-2</MenuItem>\n                <MenuItem disabled>item-3</MenuItem>\n                <MenuItem>item-4</MenuItem>\n                <MenuItem disabled>item-5</MenuItem>\n            </MenuItemGroup>\n            <MenuItemGroup title=\"group-2\">\n                <MenuItem>item-6</MenuItem>\n                <MenuItem>item-7</MenuItem>\n                <MenuItem disabled>item-8</MenuItem>\n                <MenuItem>item-9</MenuItem>\n                <MenuItem disabled>item-10</MenuItem>\n            </MenuItemGroup>\n        </Menu>\n    );\n}\n"

/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Menu, MenuItem } from 'vidom-components';\n\nexport default class RadioModeExample extends Component {\n    onInit() {\n        this.setState({ value : '2' });\n    }\n\n    onRender() {\n        return (\n            <Menu\n                theme=\"islands\"\n                size=\"m\"\n                mode=\"radio\"\n                value={ this.state.value }\n                onValueChange={ value => { this.setState({ value }) } }\n            >\n                <MenuItem value=\"1\">item-1</MenuItem>\n                <MenuItem value=\"2\">item-2</MenuItem>\n                <MenuItem value=\"3\">item-3</MenuItem>\n                <MenuItem value=\"4\">item-4</MenuItem>\n            </Menu>\n        );\n    }\n}\n"

/***/ },
/* 170 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Menu, MenuItem } from 'vidom-components';\n\nexport default class CheckModeExample extends Component {\n    onInit() {\n        this.setState({ value : ['2', '4'] });\n    }\n\n    onRender() {\n        return (\n            <Menu\n                theme=\"islands\"\n                size=\"m\"\n                mode=\"check\"\n                value={ this.state.value }\n                onValueChange={ value => { this.setState({ value }) } }\n            >\n                <MenuItem value=\"1\">item-1</MenuItem>\n                <MenuItem value=\"2\">item-2</MenuItem>\n                <MenuItem value=\"3\">item-3</MenuItem>\n                <MenuItem value=\"4\">item-4</MenuItem>\n            </Menu>\n        );\n    }\n}\n"

/***/ },
/* 171 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Menu, MenuItem } from 'vidom-components';\n\nexport default class RadioCheckModeExample extends Component {\n    onInit() {\n        this.setState({ value : '2' });\n    }\n\n    onRender() {\n        return (\n            <Menu\n                theme=\"islands\"\n                size=\"m\"\n                mode=\"radioCheck\"\n                value={ this.state.value }\n                onValueChange={ value => { this.setState({ value }) } }\n            >\n                <MenuItem value=\"1\">item-1</MenuItem>\n                <MenuItem value=\"2\">item-2</MenuItem>\n                <MenuItem value=\"3\">item-3</MenuItem>\n                <MenuItem value=\"4\">item-4</MenuItem>\n            </Menu>\n        );\n    }\n}\n"

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = ModalDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(173);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _SimpleExample3 = __webpack_require__(174);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ModalDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Modal'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren((0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default))), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'autoclosable',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Enables the modal to be hidden on pressing "Esc" or clicking somewhere outside its content.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onHide',
	        'type': 'Function'
	    }).setChildren('The callback to handle hide event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the modal theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'visible',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Sets the visibility of the modal.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children with any valid type are allowed.'))])]));
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import Button from '../../../Button';
	// import Select from '../../Select';

	// <Select
	//     size="m"
	//     mode="radio"
	//     options={ [1, 2, 3, 4].map(i => ({ value : i, content : 'item-' + i })) }
	//     value={ 2 }
	// />

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ visible: false });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var visible = this.state.visible;


	        return (0, _vidom.node)('fragment').setChildren([(0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                _this2.setState({ visible: !_this2.state.visible });
	            },
	            'text': (visible ? 'Close' : 'Open') + ' modal'
	        }), (0, _vidom.node)(_vidomComponents.Modal).setAttrs({
	            'theme': 'islands',
	            'visible': visible,
	            'autoclosable': true,
	            'onHide': function () {
	                _this2.setState({ visible: false });
	            }
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'style': { padding: '50px' }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'text': 'test1'
	        }), (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'text': 'test2'
	        }), (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'text': 'test3'
	        })]))]);
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 174 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Modal, Button } from 'vidom-components';\n// import Button from '../../../Button';\n// import Select from '../../Select';\n\n// <Select\n//     size=\"m\"\n//     mode=\"radio\"\n//     options={ [1, 2, 3, 4].map(i => ({ value : i, content : 'item-' + i })) }\n//     value={ 2 }\n// />\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ visible : false });\n    }\n\n    onRender() {\n        const { visible } = this.state;\n\n        return (\n            <fragment>\n                <Button\n                    theme=\"islands\"\n                    size=\"m\"\n                    onClick={ () => { this.setState({ visible : !this.state.visible }); } }\n                    text={ (visible? 'Close' : 'Open') + ' modal' }\n                />\n                <Modal\n                    theme=\"islands\"\n                    visible={ visible }\n                    autoclosable\n                    onHide={ () => { this.setState({ visible : false }) } }\n                >\n                    <div style={ { padding : '50px' } }>\n                        <Button theme=\"islands\" size=\"m\" text=\"test1\"/>\n                        <Button theme=\"islands\" size=\"m\" text=\"test2\"/>\n                        <Button theme=\"islands\" size=\"m\" text=\"test3\"/>\n                    </div>\n                </Modal>\n            </fragment>\n        );\n    }\n}\n"

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = PopupDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(176);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _NestedExample = __webpack_require__(177);

	var _NestedExample2 = _interopRequireDefault(_NestedExample);

	var _AutoclosableExample = __webpack_require__(178);

	var _AutoclosableExample2 = _interopRequireDefault(_AutoclosableExample);

	var _InsideScrollableExample = __webpack_require__(179);

	var _InsideScrollableExample2 = _interopRequireDefault(_InsideScrollableExample);

	var _SimpleExample3 = __webpack_require__(180);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _NestedExample3 = __webpack_require__(181);

	var _NestedExample4 = _interopRequireDefault(_NestedExample3);

	var _AutoclosableExample3 = __webpack_require__(182);

	var _AutoclosableExample4 = _interopRequireDefault(_AutoclosableExample3);

	var _InsideScrollableExample3 = __webpack_require__(183);

	var _InsideScrollableExample4 = _interopRequireDefault(_InsideScrollableExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function PopupDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Popup'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Nested',
	        'code': _NestedExample4.default
	    }).setChildren((0, _vidom.node)(_NestedExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Autoclosable',
	        'code': _AutoclosableExample4.default
	    }).setChildren((0, _vidom.node)(_AutoclosableExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'InsideScrollable',
	        'code': _InsideScrollableExample4.default
	    }).setChildren((0, _vidom.node)(_InsideScrollableExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'anchor',
	        'type': 'Function',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the anchor for the popup.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('This function must return the value with one of the following types:'), (0, _vidom.node)('br'), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('Component'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('DomNode'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren((0, _vidom.normalizeChildren)(['Object', '{left, top}'])), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'autoclosable',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Enables the popup to be hidden on pressing "Esc" or clicking somewhere outside its content.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'directions',
	        'type': 'String[ ]'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets allowed directions to open popup.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible options are: '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('bottom-left'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('bottom-center'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('bottom-right'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('top-left'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('top-center'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('top-right'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('right-top'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('right-center'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('right-bottom'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('left-top'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('left-center'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('left-bottom'), (0, _vidom.node)('text').setChildren('.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('By default any directions are allowed.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mainOffset',
	        'type': 'Number',
	        'def': '5'
	    }).setChildren('Sets the offset to the main axis.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onHide',
	        'type': 'Function'
	    }).setChildren('The callback to handle hide event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'secondaryOffset',
	        'type': 'Number',
	        'def': '0'
	    }).setChildren('Sets the offset to the secondary axis.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the popup theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'viewportOffset',
	        'type': 'Number',
	        'def': '10'
	    }).setChildren('Sets the offset to the viewport.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'visible',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren('Sets the visibility of the popup.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'zIndexLevel',
	        'type': 'Number',
	        'def': '0'
	    }).setChildren('Sets the level of zIndex group.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children with any valid type are allowed.'))])]));
	}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this._buttonRef = null;

	        this.setState({ visible: false });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var visible = this.state.visible;


	        return (0, _vidom.node)('fragment').setChildren([(0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                _this2.setState({ visible: !visible });
	            },
	            'text': (visible ? 'Close' : 'Open') + ' popup'
	        }).setRef(function (ref) {
	            _this2._buttonRef = ref;
	        }), (0, _vidom.node)(_vidomComponents.Popup).setAttrs({
	            'theme': 'islands',
	            'anchor': function () {
	                return _this2._buttonRef;
	            },
	            'visible': visible
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'style': { padding: '50px' }
	        }).setChildren('Popup content'))]);
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = NestedExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function NestedExample() {
	    return (0, _vidom.node)(NestedPopup).setChildren((0, _vidom.node)(NestedPopup).setChildren((0, _vidom.node)(NestedPopup).setChildren('popup content')));
	}

	var NestedPopup = function (_Component) {
	    _inherits(NestedPopup, _Component);

	    function NestedPopup() {
	        _classCallCheck(this, NestedPopup);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    NestedPopup.prototype.onInit = function onInit() {
	        this.setState({ visible: false });
	    };

	    NestedPopup.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var visible = this.state.visible;


	        return (0, _vidom.node)('fragment').setChildren([(0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                _this2.setState({ visible: !visible });
	            },
	            'text': (visible ? 'Close' : 'Open') + ' popup'
	        }).setRef(function (ref) {
	            _this2._buttonRef = ref;
	        }), (0, _vidom.node)(_vidomComponents.Popup).setAttrs({
	            'theme': 'islands',
	            'anchor': function () {
	                return _this2._buttonRef;
	            },
	            'visible': visible,
	            'onHide': function () {
	                _this2.setState({ visible: false });
	            }
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'style': { padding: '50px' }
	        }).setChildren((0, _vidom.normalizeChildren)(this.children)))]);
	    };

	    return NestedPopup;
	}(_vidom.Component);

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = AutoclosableExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function AutoclosableExample() {
	    return (0, _vidom.node)(AutoclosablePopup).setChildren((0, _vidom.node)(AutoclosablePopup).setChildren((0, _vidom.node)(AutoclosablePopup).setChildren('popup content')));
	}

	var AutoclosablePopup = function (_Component) {
	    _inherits(AutoclosablePopup, _Component);

	    function AutoclosablePopup() {
	        _classCallCheck(this, AutoclosablePopup);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    AutoclosablePopup.prototype.onInit = function onInit() {
	        this.setState({ visible: false });
	    };

	    AutoclosablePopup.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var visible = this.state.visible;


	        return (0, _vidom.node)('fragment').setChildren([(0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                _this2.setState({ visible: !visible });
	            },
	            'text': (visible ? 'Close' : 'Open') + ' popup'
	        }).setRef(function (ref) {
	            _this2._buttonRef = ref;
	        }), (0, _vidom.node)(_vidomComponents.Popup).setAttrs({
	            'theme': 'islands',
	            'anchor': function () {
	                return _this2._buttonRef;
	            },
	            'visible': visible,
	            'autoclosable': true,
	            'onHide': function () {
	                _this2.setState({ visible: false });
	            }
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'style': { padding: '50px' }
	        }).setChildren((0, _vidom.normalizeChildren)(this.children)))]);
	    };

	    return AutoclosablePopup;
	}(_vidom.Component);

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InsideScrollableExample = function (_Component) {
	    _inherits(InsideScrollableExample, _Component);

	    function InsideScrollableExample() {
	        _classCallCheck(this, InsideScrollableExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    InsideScrollableExample.prototype.onInit = function onInit() {
	        this._buttonRef = null;
	        this._scrollableRef = null;

	        this.setState({ visible: false });
	    };

	    InsideScrollableExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var visible = this.state.visible;


	        return (0, _vidom.node)('div').setAttrs({
	            'style': { height: '200px', width: '300px', overflow: 'scroll', border: '1px solid #000' }
	        }).setRef(function (ref) {
	            _this2._scrollableRef = ref;
	        }).setChildren([(0, _vidom.node)('div').setChildren('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'), (0, _vidom.node)('div').setChildren('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'), (0, _vidom.node)(_vidomComponents.Button).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'onClick': function () {
	                _this2.setState({ visible: !_this2.state.visible });
	            },
	            'text': (visible ? 'Close' : 'Open') + ' popup'
	        }).setRef(function (ref) {
	            _this2._buttonRef = ref;
	        }), (0, _vidom.node)(_vidomComponents.Popup).setAttrs({
	            'theme': 'islands',
	            'anchor': function () {
	                return _this2._buttonRef;
	            },
	            'visible': visible
	        }).setChildren((0, _vidom.node)('div').setAttrs({
	            'style': { padding: '50px' }
	        }).setChildren('Popup content')), (0, _vidom.node)('div').setChildren('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'), (0, _vidom.node)('div').setChildren('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')]);
	    };

	    InsideScrollableExample.prototype.onMount = function onMount() {
	        this._scrollableRef.scrollTop = 150;
	    };

	    return InsideScrollableExample;
	}(_vidom.Component);

	exports.default = InsideScrollableExample;

/***/ },
/* 180 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Popup, Button } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this._buttonRef = null;\n\n        this.setState({ visible : false });\n    }\n\n    onRender() {\n        const { visible } = this.state;\n\n        return (\n            <fragment>\n                <Button\n                    theme=\"islands\"\n                    size=\"m\"\n                    onClick={ () => { this.setState({ visible : !visible }); } }\n                    ref={ ref => { this._buttonRef = ref; } }\n                    text={ (visible? 'Close' : 'Open') + ' popup' }\n                />\n                <Popup\n                    theme=\"islands\"\n                    anchor={ () => this._buttonRef }\n                    visible={ visible }\n                >\n                    <div style={ { padding : '50px' } }>\n                        Popup content\n                    </div>\n                </Popup>\n            </fragment>\n        );\n    }\n}\n"

/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Popup, Button } from 'vidom-components';\n\nexport default function NestedExample() {\n    return (\n        <NestedPopup>\n            <NestedPopup>\n                <NestedPopup>popup content</NestedPopup>\n            </NestedPopup>\n        </NestedPopup>\n    );\n}\n\nclass NestedPopup extends Component {\n    onInit() {\n        this.setState({ visible : false });\n    }\n\n    onRender() {\n        const { visible } = this.state;\n\n        return (\n            <fragment>\n                <Button\n                    theme=\"islands\"\n                    size=\"m\"\n                    onClick={ () => { this.setState({ visible : !visible }); } }\n                    ref={ ref => { this._buttonRef = ref; } }\n                    text={ (visible? 'Close' : 'Open') + ' popup' }\n                />\n                <Popup\n                    theme=\"islands\"\n                    anchor={ () => this._buttonRef }\n                    visible={ visible }\n                    onHide={ () => { this.setState({ visible : false }); } }\n                >\n                    <div style={ { padding : '50px' } }>\n                        { this.children }\n                    </div>\n                </Popup>\n            </fragment>\n        );\n    }\n}\n"

/***/ },
/* 182 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Popup, Button } from 'vidom-components';\n\nexport default function AutoclosableExample() {\n    return (\n        <AutoclosablePopup>\n            <AutoclosablePopup>\n                <AutoclosablePopup>popup content</AutoclosablePopup>\n            </AutoclosablePopup>\n        </AutoclosablePopup>\n    );\n}\n\nclass AutoclosablePopup extends Component {\n    onInit() {\n        this.setState({ visible : false });\n    }\n\n    onRender() {\n        const { visible } = this.state;\n\n        return (\n            <fragment>\n                <Button\n                    theme=\"islands\"\n                    size=\"m\"\n                    onClick={ () => { this.setState({ visible : !visible }); } }\n                    ref={ ref => { this._buttonRef = ref; } }\n                    text={ (visible? 'Close' : 'Open') + ' popup' }\n                />\n                <Popup\n                    theme=\"islands\"\n                    anchor={ () => this._buttonRef }\n                    visible={ visible }\n                    autoclosable\n                    onHide={ () => { this.setState({ visible : false }); } }\n                >\n                    <div style={ { padding : '50px' } }>\n                        { this.children }\n                    </div>\n                </Popup>\n            </fragment>\n        );\n    }\n}\n"

/***/ },
/* 183 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Popup, Button } from 'vidom-components';\n\nexport default class InsideScrollableExample extends Component {\n    onInit() {\n        this._buttonRef = null;\n        this._scrollableRef = null;\n\n        this.setState({ visible : false });\n    }\n\n    onRender() {\n        const { visible } = this.state;\n\n        return (\n            <div\n                style={ { height : '200px', width: '300px', overflow : 'scroll', border : '1px solid #000' } }\n                ref={ ref => { this._scrollableRef = ref; } }\n            >\n                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>\n                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>\n                <Button\n                    theme=\"islands\"\n                    size=\"m\"\n                    onClick={ () => { this.setState({ visible : !this.state.visible }); } }\n                    ref={ ref => { this._buttonRef = ref; } }\n                    text={ (visible? 'Close' : 'Open') + ' popup' }\n                />\n                <Popup\n                    theme=\"islands\"\n                    anchor={ () => this._buttonRef }\n                    visible={ visible }\n                >\n                    <div style={ { padding : '50px' } }>\n                        Popup content\n                    </div>\n                </Popup>\n                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>\n                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>\n            </div>\n        );\n    }\n\n    onMount() {\n         this._scrollableRef.scrollTop = 150;\n    }\n}\n"

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = RadioDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(185);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _ButtonExample = __webpack_require__(186);

	var _ButtonExample2 = _interopRequireDefault(_ButtonExample);

	var _SimpleExample3 = __webpack_require__(187);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _ButtonExample3 = __webpack_require__(188);

	var _ButtonExample4 = _interopRequireDefault(_ButtonExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function RadioDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Radio'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Button',
	        'code': _ButtonExample4.default
	    }).setChildren((0, _vidom.node)(_ButtonExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'checked',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Checks the radio if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables the radio if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Focuses the radio if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'name',
	        'type': 'String'
	    }).setChildren('Sets the same html attribute of the checkbox.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onCheckChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle checked change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the radio size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren(' if '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren(' attribute is set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren(' and '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' for other ones.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'text',
	        'type': 'String'
	    }).setChildren('The text to display for the radio.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the radio theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'title',
	        'type': 'String'
	    }).setChildren('The title displayed as a tooltip.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'type',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables additional behaviour if passed.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('The only supported value is '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren('The value of the radio.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children are not allowed and ignored.'))])]));
	}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ checked: false });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var checked = this.state.checked;


	        return (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'checked': checked,
	            'onCheckChange': function (checked) {
	                return _this2.setState({ checked: checked });
	            },
	            'text': 'check me'
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ checked: false });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var checked = this.state.checked;


	        return (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'type': 'button',
	            'theme': 'islands',
	            'size': 'm',
	            'checked': checked,
	            'onCheckChange': function (checked) {
	                return _this2.setState({ checked: checked });
	            },
	            'text': 'check me'
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Radio } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ checked : false });\n    }\n\n    onRender() {\n        const { checked } = this.state;\n\n        return (\n            <Radio\n                theme=\"islands\"\n                size=\"m\"\n                checked={ checked }\n                onCheckChange={ checked => this.setState({ checked }) }\n                text=\"check me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 188 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Radio } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ checked : false });\n    }\n\n    onRender() {\n        const { checked } = this.state;\n\n        return (\n            <Radio\n                type=\"button\"\n                theme=\"islands\"\n                size=\"m\"\n                checked={ checked }\n                onCheckChange={ checked => this.setState({ checked }) }\n                text=\"check me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = RadioGroupDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(190);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _ButtonExample = __webpack_require__(191);

	var _ButtonExample2 = _interopRequireDefault(_ButtonExample);

	var _SimpleExample3 = __webpack_require__(192);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _ButtonExample3 = __webpack_require__(193);

	var _ButtonExample4 = _interopRequireDefault(_ButtonExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function RadioGroupDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'RadioGroup'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Button',
	        'code': _ButtonExample4.default
	    }).setChildren((0, _vidom.node)(_ButtonExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables all the items if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'name',
	        'type': 'String'
	    }).setChildren('Sets the same attribute for the child checkboxes.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onValueChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle value change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the size for the child checkboxes.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren(' if '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren(' attribute is set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren(' and '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' for other ones.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the theme for the child radios.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'type',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the same attribute for the child radios.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('The only supported value is '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('button'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren('Current value.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren([(0, _vidom.node)('text').setChildren('Each child is expected to be a '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<Radio/>'), (0, _vidom.node)('text').setChildren('. Following attributes of '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<Radio/>'), (0, _vidom.node)('text').setChildren(' are filled automatically by '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<RadioGroup/>'), (0, _vidom.node)('text').setChildren(': '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('checked'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('name'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('size'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('theme'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('type'), (0, _vidom.node)('text').setChildren('.')]))])]));
	}

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ value: 1 });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.RadioGroup).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-1',
	            'value': 1
	        }), (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-2',
	            'value': 2
	        }), (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-3',
	            'value': 3
	        }), (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-4',
	            'value': 4,
	            'disabled': true
	        })]);
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ value: 1 });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.RadioGroup).setAttrs({
	            'type': 'button',
	            'theme': 'islands',
	            'size': 'm',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-1',
	            'value': 1
	        }), (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-2',
	            'value': 2
	        }), (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-3',
	            'value': 3
	        }), (0, _vidom.node)(_vidomComponents.Radio).setAttrs({
	            'text': 'item-4',
	            'value': 4,
	            'disabled': true
	        })]);
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { RadioGroup, Radio } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ value : 1 });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <RadioGroup\n                theme=\"islands\"\n                size=\"m\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n            >\n                <Radio text=\"item-1\" value={ 1 }/>\n                <Radio text=\"item-2\" value={ 2 }/>\n                <Radio text=\"item-3\" value={ 3 }/>\n                <Radio text=\"item-4\" value={ 4 } disabled/>\n            </RadioGroup>\n        );\n    }\n}\n"

/***/ },
/* 193 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { RadioGroup, Radio } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ value : 1 });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <RadioGroup\n                type=\"button\"\n                theme=\"islands\"\n                size=\"m\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n            >\n                <Radio text=\"item-1\" value={ 1 }/>\n                <Radio text=\"item-2\" value={ 2 }/>\n                <Radio text=\"item-3\" value={ 3 }/>\n                <Radio text=\"item-4\" value={ 4 } disabled/>\n            </RadioGroup>\n        );\n    }\n}\n"

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = SelectDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _RadioModeExample = __webpack_require__(195);

	var _RadioModeExample2 = _interopRequireDefault(_RadioModeExample);

	var _RadioCheckModeExample = __webpack_require__(196);

	var _RadioCheckModeExample2 = _interopRequireDefault(_RadioCheckModeExample);

	var _GroupExample = __webpack_require__(197);

	var _GroupExample2 = _interopRequireDefault(_GroupExample);

	var _DisabledExample = __webpack_require__(198);

	var _DisabledExample2 = _interopRequireDefault(_DisabledExample);

	var _RadioModeExample3 = __webpack_require__(199);

	var _RadioModeExample4 = _interopRequireDefault(_RadioModeExample3);

	var _radioCheckModeExample = __webpack_require__(200);

	var _radioCheckModeExample2 = _interopRequireDefault(_radioCheckModeExample);

	var _GroupExample3 = __webpack_require__(201);

	var _GroupExample4 = _interopRequireDefault(_GroupExample3);

	var _DisabledExample3 = __webpack_require__(202);

	var _DisabledExample4 = _interopRequireDefault(_DisabledExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SelectDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Select'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'RadioMode',
	        'code': _RadioModeExample4.default
	    }).setChildren((0, _vidom.node)(_RadioModeExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'RadioCheckMode',
	        'code': _radioCheckModeExample2.default
	    }).setChildren((0, _vidom.node)(_RadioCheckModeExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Group',
	        'code': _GroupExample4.default
	    }).setChildren((0, _vidom.node)(_GroupExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Disabled',
	        'code': _DisabledExample4.default
	    }).setChildren((0, _vidom.node)(_DisabledExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables all the select options if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Focuses the select if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mode',
	        'type': 'String',
	        'def': 'radio'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('radio'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('radioCheck'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onValueChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle value change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'placeholder',
	        'type': 'String',
	        'def': '\u2014'
	    }).setChildren('The displayed text if no any option is selected.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'renderText',
	        'type': 'Function'
	    }).setChildren([(0, _vidom.node)('text').setChildren('The callback to render text for inner button.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('By default the children of the selected option or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('placeholder'), (0, _vidom.node)('text').setChildren(' (if there is no selected option) is rendered')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the select size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the select theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren('Current value.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren([(0, _vidom.node)('text').setChildren('Each child is expected to be either a '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<SelectOption/>'), (0, _vidom.node)('text').setChildren(' or a '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('<SelectOptionGroup/>'), (0, _vidom.node)('text').setChildren('.')]))])]));
	}

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioModeExample = function (_Component) {
	    _inherits(RadioModeExample, _Component);

	    function RadioModeExample() {
	        _classCallCheck(this, RadioModeExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    RadioModeExample.prototype.onInit = function onInit() {
	        this.setState({ value: '2' });
	    };

	    RadioModeExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        return (0, _vidom.node)(_vidomComponents.Select).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': this.state.value,
	            'onValueChange': function (value) {
	                _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '1'
	        }).setChildren('option-1'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '2'
	        }).setChildren('option-2'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '3'
	        }).setChildren('option-3'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '4'
	        }).setChildren('option-4')]);
	    };

	    return RadioModeExample;
	}(_vidom.Component);

	exports.default = RadioModeExample;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioModeExample = function (_Component) {
	    _inherits(RadioModeExample, _Component);

	    function RadioModeExample() {
	        _classCallCheck(this, RadioModeExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    RadioModeExample.prototype.onInit = function onInit() {
	        this.setState({ value: '2' });
	    };

	    RadioModeExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        return (0, _vidom.node)(_vidomComponents.Select).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'mode': 'radioCheck',
	            'value': this.state.value,
	            'onValueChange': function (value) {
	                _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '1'
	        }).setChildren('option-1'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '2'
	        }).setChildren('option-2'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '3'
	        }).setChildren('option-3'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '4'
	        }).setChildren('option-4')]);
	    };

	    return RadioModeExample;
	}(_vidom.Component);

	exports.default = RadioModeExample;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupExample = function (_Component) {
	    _inherits(GroupExample, _Component);

	    function GroupExample() {
	        _classCallCheck(this, GroupExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    GroupExample.prototype.onInit = function onInit() {
	        this.setState({ value: '2' });
	    };

	    GroupExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        return (0, _vidom.node)(_vidomComponents.Select).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': this.state.value,
	            'onValueChange': function (value) {
	                _this2.setState({ value: value });
	            }
	        }).setChildren([(0, _vidom.node)(_vidomComponents.SelectOptionGroup).setAttrs({
	            'title': 'group-1'
	        }).setChildren([(0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '1'
	        }).setChildren('option-1'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '2'
	        }).setChildren('option-2'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '3'
	        }).setChildren('option-3'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '4'
	        }).setChildren('option-4')]), (0, _vidom.node)(_vidomComponents.SelectOptionGroup).setAttrs({
	            'title': 'group-2'
	        }).setChildren([(0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '5'
	        }).setChildren('option-5'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '6'
	        }).setChildren('option-6'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '7'
	        }).setChildren('option-7'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '8'
	        }).setChildren('option-8')])]);
	    };

	    return GroupExample;
	}(_vidom.Component);

	exports.default = GroupExample;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DisabledExample = function (_Component) {
	    _inherits(DisabledExample, _Component);

	    function DisabledExample() {
	        _classCallCheck(this, DisabledExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    DisabledExample.prototype.onRender = function onRender() {
	        return (0, _vidom.node)(_vidomComponents.Select).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': '2',
	            'disabled': true
	        }).setChildren([(0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '1'
	        }).setChildren('option-1'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '2'
	        }).setChildren('option-2'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '3'
	        }).setChildren('option-3'), (0, _vidom.node)(_vidomComponents.SelectOption).setAttrs({
	            'value': '4'
	        }).setChildren('option-4')]);
	    };

	    return DisabledExample;
	}(_vidom.Component);

	exports.default = DisabledExample;

/***/ },
/* 199 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Select, SelectOption } from 'vidom-components';\n\nexport default class RadioModeExample extends Component {\n    onInit() {\n        this.setState({ value : '2' });\n    }\n\n    onRender() {\n        return (\n            <Select\n                theme=\"islands\"\n                size=\"m\"\n                value={ this.state.value }\n                onValueChange={ value => { this.setState({ value }) } }\n            >\n                <SelectOption value=\"1\">option-1</SelectOption>\n                <SelectOption value=\"2\">option-2</SelectOption>\n                <SelectOption value=\"3\">option-3</SelectOption>\n                <SelectOption value=\"4\">option-4</SelectOption>\n            </Select>\n        );\n    }\n}\n"

/***/ },
/* 200 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Select, SelectOption } from 'vidom-components';\n\nexport default class RadioModeExample extends Component {\n    onInit() {\n        this.setState({ value : '2' });\n    }\n\n    onRender() {\n        return (\n            <Select\n                theme=\"islands\"\n                size=\"m\"\n                mode=\"radioCheck\"\n                value={ this.state.value }\n                onValueChange={ value => { this.setState({ value }) } }\n            >\n                <SelectOption value=\"1\">option-1</SelectOption>\n                <SelectOption value=\"2\">option-2</SelectOption>\n                <SelectOption value=\"3\">option-3</SelectOption>\n                <SelectOption value=\"4\">option-4</SelectOption>\n            </Select>\n        );\n    }\n}\n"

/***/ },
/* 201 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Select, SelectOptionGroup, SelectOption } from 'vidom-components';\n\nexport default class GroupExample extends Component {\n    onInit() {\n        this.setState({ value : '2' });\n    }\n\n    onRender() {\n        return (\n            <Select\n                theme=\"islands\"\n                size=\"m\"\n                value={ this.state.value }\n                onValueChange={ value => { this.setState({ value }) } }\n            >\n                <SelectOptionGroup title=\"group-1\">\n                    <SelectOption value=\"1\">option-1</SelectOption>\n                    <SelectOption value=\"2\">option-2</SelectOption>\n                    <SelectOption value=\"3\">option-3</SelectOption>\n                    <SelectOption value=\"4\">option-4</SelectOption>\n                </SelectOptionGroup>\n                <SelectOptionGroup title=\"group-2\">\n                    <SelectOption value=\"5\">option-5</SelectOption>\n                    <SelectOption value=\"6\">option-6</SelectOption>\n                    <SelectOption value=\"7\">option-7</SelectOption>\n                    <SelectOption value=\"8\">option-8</SelectOption>\n                </SelectOptionGroup>\n            </Select>\n        );\n    }\n}\n"

/***/ },
/* 202 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { Select, SelectOption } from 'vidom-components';\n\nexport default class DisabledExample extends Component {\n    onRender() {\n        return (\n            <Select\n                theme=\"islands\"\n                size=\"m\"\n                value=\"2\"\n                disabled\n            >\n                <SelectOption value=\"1\">option-1</SelectOption>\n                <SelectOption value=\"2\">option-2</SelectOption>\n                <SelectOption value=\"3\">option-3</SelectOption>\n                <SelectOption value=\"4\">option-4</SelectOption>\n            </Select>\n        );\n    }\n}\n"

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = SpinnerDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(204);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _SizeExample = __webpack_require__(205);

	var _SizeExample2 = _interopRequireDefault(_SizeExample);

	var _SimpleExample3 = __webpack_require__(206);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _SizeExample3 = __webpack_require__(207);

	var _SizeExample4 = _interopRequireDefault(_SizeExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SpinnerDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'Spinner'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Size',
	        'code': _SizeExample4.default
	    }).setChildren((0, _vidom.node)(_SizeExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'mix',
	        'type': 'String'
	    }).setChildren('Additional css class.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the spinner size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xs'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the spinner theme.')]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children are not allowed and ignored.'))])]));
	}

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SimpleExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SimpleExample() {
	    return (0, _vidom.node)(_vidomComponents.Spinner).setAttrs({
	        "theme": "islands",
	        "size": "m"
	    });
	}

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.default = SizeExample;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function SizeExample() {
	    return (0, _vidom.node)(_vidomComponents.Spinner).setAttrs({
	        "theme": "islands",
	        "size": "xl"
	    });
	}

/***/ },
/* 206 */
/***/ function(module, exports) {

	module.exports = "import { Spinner } from 'vidom-components';\n\nexport default function SimpleExample() {\n    return <Spinner theme=\"islands\" size=\"m\"/>;\n}\n"

/***/ },
/* 207 */
/***/ function(module, exports) {

	module.exports = "import { Spinner } from 'vidom-components';\n\nexport default function SizeExample() {\n    return <Spinner theme=\"islands\" size=\"xl\"/>;\n}\n"

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = TextAreaDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(209);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _DisabledExample = __webpack_require__(210);

	var _DisabledExample2 = _interopRequireDefault(_DisabledExample);

	var _WidthAvailableExample = __webpack_require__(211);

	var _WidthAvailableExample2 = _interopRequireDefault(_WidthAvailableExample);

	var _SimpleExample3 = __webpack_require__(212);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _DisabledExample3 = __webpack_require__(213);

	var _DisabledExample4 = _interopRequireDefault(_DisabledExample3);

	var _WidthAvailableExample3 = __webpack_require__(214);

	var _WidthAvailableExample4 = _interopRequireDefault(_WidthAvailableExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function TextAreaDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'TextArea'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Disabled',
	        'code': _DisabledExample4.default
	    }).setChildren((0, _vidom.node)(_DisabledExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'WidthAvailable',
	        'code': _WidthAvailableExample4.default
	    }).setChildren((0, _vidom.node)(_WidthAvailableExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables the textarea if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Focuses the textarea if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'name',
	        'type': 'String'
	    }).setChildren('Sets the same html attribute of the textarea.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onValueChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle value change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'placeholder',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('The placeholder displayed if the '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('value'), (0, _vidom.node)('text').setChildren(' is empty.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the textarea size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the textarea theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren('Current value.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'width',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Fits the textarea width to its container if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('available'), (0, _vidom.node)('text').setChildren('.')])]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children are not allowed and ignored.'))])]));
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ value: '' });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.TextArea).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': value,
	            'onChange': function (value) {
	                return _this2.setState({ value: value });
	            },
	            'placeholder': 'Fill me'
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DisabledExample = function (_Component) {
	    _inherits(DisabledExample, _Component);

	    function DisabledExample() {
	        _classCallCheck(this, DisabledExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    DisabledExample.prototype.onRender = function onRender() {
	        return (0, _vidom.node)(_vidomComponents.TextArea).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'disabled': true,
	            'value': 'I\'m disabled'
	        });
	    };

	    return DisabledExample;
	}(_vidom.Component);

	exports.default = DisabledExample;

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WidthAvailableExample = function (_Component) {
	    _inherits(WidthAvailableExample, _Component);

	    function WidthAvailableExample() {
	        _classCallCheck(this, WidthAvailableExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    WidthAvailableExample.prototype.onInit = function onInit() {
	        this.setState({ value: '' });
	    };

	    WidthAvailableExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.TextArea).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'width': 'available',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            },
	            'placeholder': 'Fill me'
	        });
	    };

	    return WidthAvailableExample;
	}(_vidom.Component);

	exports.default = WidthAvailableExample;

/***/ },
/* 212 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { TextArea } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ value : '' });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <TextArea\n                theme=\"islands\"\n                size=\"m\"\n                value={ value }\n                onChange={ value => this.setState({ value }) }\n                placeholder=\"Fill me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 213 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { TextArea } from 'vidom-components';\n\nexport default class DisabledExample extends Component {\n    onRender() {\n        return (\n            <TextArea\n                theme=\"islands\"\n                size=\"m\"\n                disabled\n                value=\"I'm disabled\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 214 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { TextArea } from 'vidom-components';\n\nexport default class WidthAvailableExample extends Component {\n    onInit() {\n        this.setState({ value : '' });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <TextArea\n                theme=\"islands\"\n                size=\"m\"\n                width=\"available\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n                placeholder=\"Fill me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = TextInputDoc;

	var _vidom = __webpack_require__(1);

	var _Doc = __webpack_require__(11);

	var _SimpleExample = __webpack_require__(216);

	var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

	var _DisabledExample = __webpack_require__(217);

	var _DisabledExample2 = _interopRequireDefault(_DisabledExample);

	var _WidthAvailableExample = __webpack_require__(218);

	var _WidthAvailableExample2 = _interopRequireDefault(_WidthAvailableExample);

	var _SimpleExample3 = __webpack_require__(219);

	var _SimpleExample4 = _interopRequireDefault(_SimpleExample3);

	var _DisabledExample3 = __webpack_require__(220);

	var _DisabledExample4 = _interopRequireDefault(_DisabledExample3);

	var _WidthAvailableExample3 = __webpack_require__(221);

	var _WidthAvailableExample4 = _interopRequireDefault(_WidthAvailableExample3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function TextInputDoc(_ref) {
	    var tab = _ref.tab,
	        onTabChange = _ref.onTabChange;

	    return (0, _vidom.node)(_Doc.DocComponent).setAttrs({
	        'title': 'TextInput'
	    }).setChildren((0, _vidom.node)(_Doc.DocTabs).setAttrs({
	        'value': tab,
	        'onTabChange': onTabChange
	    }).setChildren([(0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'Examples',
	        'value': 'Examples'
	    }).setChildren([(0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Simple',
	        'code': _SimpleExample4.default
	    }).setChildren((0, _vidom.node)(_SimpleExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'Disabled',
	        'code': _DisabledExample4.default
	    }).setChildren((0, _vidom.node)(_DisabledExample2.default)), (0, _vidom.node)(_Doc.DocExample).setAttrs({
	        'title': 'WidthAvailable',
	        'code': _WidthAvailableExample4.default
	    }).setChildren((0, _vidom.node)(_WidthAvailableExample2.default))]), (0, _vidom.node)(_Doc.DocTab).setAttrs({
	        'title': 'API',
	        'value': 'api'
	    }).setChildren([(0, _vidom.node)(_Doc.DocAttrs).setChildren([(0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'disabled',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Disables the input if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'focused',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Focuses the input if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'hasClear',
	        'type': 'Boolean',
	        'def': 'false'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Adds the clear button if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('true'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'maxLength',
	        'type': 'Number'
	    }).setChildren('Limits the maximum length of the value.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'name',
	        'type': 'String'
	    }).setChildren('Sets the same html attribute of the input.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onFocusChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle focus and blur events.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'onValueChange',
	        'type': 'Function'
	    }).setChildren('The callback to handle value change event.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'placeholder',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('The placeholder displayed if the '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('value'), (0, _vidom.node)('text').setChildren(' is empty.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'size',
	        'type': 'String',
	        'required': true
	    }).setChildren([(0, _vidom.node)('text').setChildren('Sets the input size.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('s'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('m'), (0, _vidom.node)('text').setChildren(', '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('l'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('xl'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'theme',
	        'type': 'String',
	        'required': true
	    }).setChildren('Sets the input theme.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'type',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Enables additional behaviour according to the passed value.'), (0, _vidom.node)('br'), (0, _vidom.node)('text').setChildren('Possible values are '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('password'), (0, _vidom.node)('text').setChildren(' or '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('search'), (0, _vidom.node)('text').setChildren('.')]), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'value',
	        'type': 'String'
	    }).setChildren('Current value.'), (0, _vidom.node)(_Doc.DocAttr).setAttrs({
	        'name': 'width',
	        'type': 'String'
	    }).setChildren([(0, _vidom.node)('text').setChildren('Fits the input width to its container if set to '), (0, _vidom.node)(_Doc.DocInlineCode).setChildren('available'), (0, _vidom.node)('text').setChildren('.')])]), (0, _vidom.node)(_Doc.DocChildren).setChildren((0, _vidom.node)(_Doc.DocText).setChildren('Children are not allowed and ignored.'))])]));
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleExample = function (_Component) {
	    _inherits(SimpleExample, _Component);

	    function SimpleExample() {
	        _classCallCheck(this, SimpleExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    SimpleExample.prototype.onInit = function onInit() {
	        this.setState({ value: '' });
	    };

	    SimpleExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.TextInput).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            },
	            'placeholder': 'Text me'
	        });
	    };

	    return SimpleExample;
	}(_vidom.Component);

	exports.default = SimpleExample;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DisabledExample = function (_Component) {
	    _inherits(DisabledExample, _Component);

	    function DisabledExample() {
	        _classCallCheck(this, DisabledExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    DisabledExample.prototype.onRender = function onRender() {
	        return (0, _vidom.node)(_vidomComponents.TextInput).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'value': 'I\'m disabled',
	            'disabled': true
	        });
	    };

	    return DisabledExample;
	}(_vidom.Component);

	exports.default = DisabledExample;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _vidomComponents = __webpack_require__(68);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WidthAvailableExample = function (_Component) {
	    _inherits(WidthAvailableExample, _Component);

	    function WidthAvailableExample() {
	        _classCallCheck(this, WidthAvailableExample);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    WidthAvailableExample.prototype.onInit = function onInit() {
	        this.setState({ value: '' });
	    };

	    WidthAvailableExample.prototype.onRender = function onRender() {
	        var _this2 = this;

	        var value = this.state.value;


	        return (0, _vidom.node)(_vidomComponents.TextInput).setAttrs({
	            'theme': 'islands',
	            'size': 'm',
	            'width': 'available',
	            'value': value,
	            'onValueChange': function (value) {
	                return _this2.setState({ value: value });
	            },
	            'placeholder': 'Text me'
	        });
	    };

	    return WidthAvailableExample;
	}(_vidom.Component);

	exports.default = WidthAvailableExample;

/***/ },
/* 219 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { TextInput } from 'vidom-components';\n\nexport default class SimpleExample extends Component {\n    onInit() {\n        this.setState({ value : '' });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <TextInput\n                theme=\"islands\"\n                size=\"m\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n                placeholder=\"Text me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 220 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { TextInput } from 'vidom-components';\n\nexport default class DisabledExample extends Component {\n    onRender() {\n        return (\n            <TextInput\n                theme=\"islands\"\n                size=\"m\"\n                value=\"I'm disabled\"\n                disabled\n            />\n        );\n    }\n}\n"

/***/ },
/* 221 */
/***/ function(module, exports) {

	module.exports = "import { Component } from 'vidom';\nimport { TextInput } from 'vidom-components';\n\nexport default class WidthAvailableExample extends Component {\n    onInit() {\n        this.setState({ value : '' });\n    }\n\n    onRender() {\n        const { value } = this.state;\n\n        return (\n            <TextInput\n                theme=\"islands\"\n                size=\"m\"\n                width=\"available\"\n                value={ value }\n                onValueChange={ value => this.setState({ value }) }\n                placeholder=\"Text me\"\n            />\n        );\n    }\n}\n"

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Nav = __webpack_require__(223);

	var _Nav2 = _interopRequireDefault(_Nav);

	__webpack_require__(224);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Nav2.default;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vidom = __webpack_require__(1);

	var _bem = __webpack_require__(13);

	var _bem2 = _interopRequireDefault(_bem);

	var _router = __webpack_require__(5);

	var _Link = __webpack_require__(63);

	var _Link2 = _interopRequireDefault(_Link);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var b = (0, _bem2.default)('Nav'),
	    names = Object.keys(_router.routes).filter(function (name) {
	    return name !== 'Intro';
	}).sort();

	var Nav = function (_Component) {
	    _inherits(Nav, _Component);

	    function Nav() {
	        _classCallCheck(this, Nav);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Nav.prototype.onInit = function onInit() {
	        this._onToggleClick = this._onToggleClick.bind(this);
	        this.setState({
	            visibleOnSmallScreen: false
	        });
	    };

	    Nav.prototype.onRender = function onRender() {
	        return (0, _vidom.node)('nav').setAttrs({
	            'class': b({ visibleOnSmallScreen: this.state.visibleOnSmallScreen }),
	            'onClick': this._onToggleClick
	        }).setChildren([(0, _vidom.node)('span').setAttrs({
	            'class': b('toggle')
	        }), (0, _vidom.node)('ul').setAttrs({
	            'class': b('list')
	        }).setChildren((0, _vidom.normalizeChildren)(names.map(function (name) {
	            var route = _router.routes[name],
	                selected = !!route.match((0, _router.getCurrentUrl)());

	            return (0, _vidom.node)('li').setAttrs({
	                'class': b('item', { selected: selected })
	            }).setChildren((0, _vidom.normalizeChildren)(selected ? name : (0, _vidom.node)(_Link2.default).setAttrs({
	                'url': route.build()
	            }).setChildren((0, _vidom.normalizeChildren)(name))));
	        })))]);
	    };

	    Nav.prototype._onToggleClick = function _onToggleClick() {
	        this.setState({ visibleOnSmallScreen: !this.state.visibleOnSmallScreen });
	    };

	    return Nav;
	}(_vidom.Component);

	exports.default = Nav;

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(225);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Nav.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./Nav.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Nav {\n    position: fixed;\n    z-index: 3;\n    right: 0;\n    top: 0;\n    width: 50px;\n    height: 50px;\n    -webkit-transition: background .1s, width .1s, height .1s;\n    transition: background .1s, width .1s, height .1s;\n}\n\n.Nav__toggle {\n    position: absolute;\n    right: 0;\n    top: 0;\n    width: 50px;\n    height: 46px;\n    background: url(" + __webpack_require__(226) + ") center center no-repeat;\n}\n\n.Nav__list {\n    float: right;\n    height: 100%;\n    overflow: auto;\n    background: #212121;\n    list-style: none;\n    margin: 0;\n    padding: 0 0 5px 0;\n    box-sizing: border-box;\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    -webkit-transition: -webkit-transform .1s;\n    transition: -webkit-transform .1s;\n    transition: transform .1s;\n    transition: transform .1s, -webkit-transform .1s;\n}\n\n.Nav_visibleOnSmallScreen {\n    height: 100%;\n    width: 100%;\n    background: rgba(0, 0, 0, .2);\n}\n\n.Nav_visibleOnSmallScreen .Nav__list {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n\n.Nav_visibleOnSmallScreen .Nav__toggle {\n    display: none;\n}\n\n.Nav__item {\n    font-size: 16px;\n    color: #fff;\n    -webkit-transition: background .1s;\n    transition: background .1s;\n}\n\n.Nav__item_selected {\n    padding: 10px 15px;\n    background: #484646;\n}\n\n.Nav .DocLink {\n    display: block;\n    padding: 10px 15px;\n    color: #a6a6a6;\n    text-decoration: none;\n    outline: none;\n    -webkit-transition: color .2s;\n    transition: color .2s;\n}\n\n.Nav .DocLink:hover\n        {\n    color: #fff;\n}\n\n@media(min-width: 700px) {\n    .Nav {\n        position: relative;\n        height: auto;\n        width: 150px;\n        background: none;\n    }\n    .Nav__toggle {\n        display: none;\n    }\n    .Nav__list {\n        position: absolute;\n        float: none;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n    }\n}\n", ""]);

	// exports


/***/ },
/* 226 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='14' fill='%23fff'%3E %3Crect x='0' y='0' width='25' height='2'/%3E %3Crect x='0' y='6' width='25' height='2'/%3E %3Crect x='0' y='12' width='25' height='2'/%3E %3C/svg%3E\""

/***/ },
/* 227 */
/***/ function(module, exports) {

	module.exports = "{\n  \"name\": \"vidom-ui\",\n  \"version\": \"0.1.2\",\n  \"description\": \"UI library\",\n  \"keywords\": [\n    \"vidom\",\n    \"ui\",\n    \"components\"\n  ],\n  \"author\": \"Dmitry Filatov <dfilatov@yandex-team.ru>\",\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git://github.com/dfilatov/vidom-ui\"\n  },\n  \"devDependencies\": {\n    \"autoprefixer\": \"6.5.3\",\n    \"babel-cli\": \"6.22.2\",\n    \"babel-core\": \"6.22.1\",\n    \"babel-loader\": \"6.2.10\",\n    \"babel-plugin-transform-object-rest-spread\": \"6.16.0\",\n    \"babel-plugin-vidom-jsx\": \"0.5.0\",\n    \"babel-preset-es2015\": \"6.18.0\",\n    \"babel-preset-es2015-loose-rollup\": \"7.0.0\",\n    \"babel-preset-es2015-minimal\": \"2.1.0\",\n    \"css-loader\": \"0.25.0\",\n    \"expect.js\": \"0.3.1\",\n    \"mocha\": \"3.2.0\",\n    \"mocha-phantomjs-core\": \"2.1.1\",\n    \"phantomjs-prebuilt\": \"2.1.14\",\n    \"postcss-each\": \"0.9.3\",\n    \"postcss-import\": \"9.1.0\",\n    \"postcss-loader\": \"1.1.1\",\n    \"postcss-nested\": \"1.0.0\",\n    \"postcss-url\": \"5.1.2\",\n    \"prismjs\": \"1.6.0\",\n    \"raw-loader\": \"0.5.1\",\n    \"rebem-css\": \"0.2.0\",\n    \"rollup\": \"0.41.4\",\n    \"rollup-plugin-babel\": \"2.7.1\",\n    \"rollup-plugin-commonjs\": \"7.0.0\",\n    \"rollup-plugin-node-resolve\": \"2.0.0\",\n    \"rollup-plugin-postcss\": \"0.2.0\",\n    \"rollup-plugin-postcss-export\": \"0.3.2\",\n    \"rollup-plugin-replace\": \"1.1.1\",\n    \"simulate\": \"git://github.com/dfilatov/simulate.js#v0.0.6\",\n    \"style-loader\": \"0.13.1\",\n    \"susanin\": \"^1.0.3\",\n    \"svg-url-loader\": \"1.1.0\",\n    \"url-loader\": \"0.5.7\",\n    \"webpack\": \"1.14.0\",\n    \"webpack-dev-server\": \"1.16.2\"\n  },\n  \"files\": [\n    \"index.js\",\n    \"index.css\",\n    \"islands.css\"\n  ],\n  \"license\": \"MIT\",\n  \"scripts\": {\n    \"test\": \"node tools/run-specs && phantomjs ./node_modules/mocha-phantomjs-core/mocha-phantomjs-core.js tools/specs.html spec \\\"{\\\\\\\"useColors\\\\\\\":true}\\\"\",\n    \"build:lib\": \"node tools/build-lib\",\n    \"start\": \"webpack-dev-server --config site/webpack.config.js --progress --colors --port 3000\"\n  },\n  \"dependencies\": {\n    \"vidom\": \"^0.8.5\"\n  }\n}\n"

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(229);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./App.post.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!postcss!./App.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, "body\n{\n    margin: 0;\n    padding: 0;\n    background: #f5f5f5;\n}\n\n.App {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    font: 13px/15px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    min-height: 100vh;\n    color: #000;\n}\n\n.App__main {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n\n.App__bar {\n    padding: 15px;\n    background: #60a413;\n}\n\n.App__header {\n    margin: 0;\n    padding: 0;\n    font-size: 22px;\n    color: #fff;\n}\n\n.App__header .DocLink\n        {\n    color: #fff;\n    text-decoration: none;\n}\n\n.App__version,\n    .App__footer {\n    font-size: 10px;\n    font-family: Verdana, sans-serif;\n}\n\n.App__version {\n    padding: 5px 7px;\n    color: #fff;\n    background: #447a08;\n    border-radius: 2px;\n    vertical-align: middle;\n}\n\n.App__content {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n\n.App__footer {\n    padding: 7px 10px;\n    text-align: right;\n}\n\n.App__github-link {\n    text-decoration: none;\n    color: #484646;\n}\n\n.App__github-link:hover\n        {\n    color: #212121;\n}\n\n.App__github-link svg {\n    vertical-align: middle;\n    margin-top: -3px;\n    fill: #484646;\n}\n\n.App__github-link:hover svg\n        {\n    fill: #212121;\n}\n", ""]);

	// exports


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(231);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js?importLoaders=1!postcss!./islands.post.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js?importLoaders=1!postcss!./islands.post.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	exports.i(__webpack_require__(232), "");
	exports.i(__webpack_require__(233), "");
	exports.i(__webpack_require__(235), "");
	exports.i(__webpack_require__(236), "");
	exports.i(__webpack_require__(237), "");
	exports.i(__webpack_require__(238), "");
	exports.i(__webpack_require__(239), "");
	exports.i(__webpack_require__(240), "");
	exports.i(__webpack_require__(241), "");
	exports.i(__webpack_require__(242), "");
	exports.i(__webpack_require__(245), "");
	exports.i(__webpack_require__(246), "");
	exports.i(__webpack_require__(247), "");

	// module
	exports.push([module.id, "\n", ""]);

	// exports


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Button_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    position: relative;\n\n    display: inline-block;\n\n    margin: 0;\n    padding: 0;\n\n    -webkit-user-select: none;\n\n       -moz-user-select: none;\n\n        -ms-user-select: none;\n\n            user-select: none;\n\n    color: #000;\n    border: 0;\n    border-radius: 3px;\n    outline: 0;\n    background: rgba(0, 0, 0, 0.2);\n\n    text-align: center;\n    white-space: nowrap;\n\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n.Button_theme_islands::-moz-focus-inner {\n    padding: 0;\n    border: 0;\n}\n\n.Button_theme_islands .Button__text {\n    position: relative;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    vertical-align: top;\n}\n\n.Button_theme_islands .Icon {\n    position: relative;\n}\n\n.Button_theme_islands.Button_type_link {\n    text-decoration: none;\n}\n/* Decorative element (inner background) */\n\n.Button_theme_islands:before {\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    bottom: 1px;\n    left: 1px;\n    content: '';\n    border-radius: 2px;\n    background: #fff;\n}\n\n.Button_theme_islands.Button_hovered {\n    cursor: pointer;\n    background: rgba(0, 0, 0, 0.3);\n}\n\n.Button_theme_islands.Button_focused_hard {\n    z-index: 1;\n    background: rgba(178, 142, 0, 0.6);\n}\n\n.Button_theme_islands.Button_focused_hard.Button:before {\n    box-shadow: 0 0 0 1px #ffcc00, inset 0 0 0 1px #ffcc00;\n}\n\n.Button_theme_islands.Button_pressed:before, .Button_theme_islands.Button:active:before {\n    background: #f6f5f3;\n}\n\n.Button_theme_islands.Button_checked {\n    background: rgba(153, 122, 0, 0.5);\n}\n\n.Button_theme_islands.Button_checked:before {\n    background: #ffeba0;\n}\n\n.Button_theme_islands.Button_checked.Button_pressed,\n        .Button_theme_islands.Button_checked.Button:active {\n    background: rgba(129, 103, 0, 0.6);\n}\n\n.Button_theme_islands.Button_checked.Button_pressed:before, .Button_theme_islands.Button_checked.Button:active:before {\n    background: #fee481;\n}\n\n.Button_theme_islands.Button_checked.Button_hovered {\n    background: rgba(129, 103, 0, 0.6);\n}\n\n.Button_theme_islands.Button_view_plain {\n    background: none;\n}\n\n.Button_theme_islands.Button_view_plain.Button_pressed,\n        .Button_theme_islands.Button_view_plain.Button:active {\n    background: #f6f5f3;\n}\n\n.Button_theme_islands.Button_view_plain.Button_checked {\n    background: #ffeba0;\n}\n\n.Button_theme_islands.Button_view_plain.Button_checked.Button_pressed,\n            .Button_theme_islands.Button_view_plain.Button_checked.Button:active {\n    background: #fee481;\n}\n\n.Button_theme_islands.Button_view_plain.Button_disabled {\n    background: none;\n}\n\n.Button_theme_islands.Button_view_action {\n    background: #ffdb4d;\n}\n\n.Button_theme_islands.Button_view_action:before {\n    display: none;\n}\n\n.Button_theme_islands.Button_view_action.Button_hovered {\n    background: #ffd633;\n}\n\n.Button_theme_islands.Button_view_action.Button_pressed,\n        .Button_theme_islands.Button_view_action.Button:active {\n    background: #ffcc00;\n}\n\n.Button_theme_islands.Button_view_action.Button_focused_hard {\n    -webkit-animation: Button-action-focus 0.5s infinite linear alternate;\n            animation: Button-action-focus 0.5s infinite linear alternate;\n    box-shadow: none;\n}\n\n.Button_theme_islands.Button_view_pseudo {\n    overflow: hidden;\n    background: none;\n}\n\n.Button_theme_islands.Button_view_pseudo:before {\n    background: none;\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);\n}\n\n.Button_theme_islands.Button_view_pseudo.Button_hovered:before {\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);\n}\n\n.Button_theme_islands.Button_view_pseudo.Button_pressed:before, .Button_theme_islands.Button_view_pseudo.Button:active:before {\n    background: rgba(0, 0, 0, 0.05);\n}\n\n.Button_theme_islands.Button_view_pseudo.Button_checked:before {\n    background: #ffeba0;\n    box-shadow: 0 0 0 1px rgba(153, 122, 0, 0.5);\n}\n\n.Button_theme_islands.Button_view_pseudo.Button_checked.Button_hovered:before {\n    box-shadow: 0 0 0 1px rgba(129, 103, 0, 0.6);\n}\n\n.Button_theme_islands.Button_view_pseudo.Button_checked.Button_pressed:before, .Button_theme_islands.Button_view_pseudo.Button_checked.Button:active:before {\n    background: #fee481;\n    box-shadow: 0 0 0 1px rgba(129, 103, 0, 0.6);\n}\n\n.Button_theme_islands.Button_disabled {\n    background: rgba(0, 0, 0, 0.08);\n}\n\n.Button_theme_islands.Button_disabled:before {\n    display: none;\n}\n\n.Button_theme_islands.Button_disabled.Button_checked {\n    background: rgba(0, 0, 0, 0.15);\n}\n\n.Button_theme_islands.Button_disabled .Button__text {\n    color: #767676;\n}\n\n.Button_theme_islands.Button_disabled .Icon {\n    opacity: 0.3;\n}\n\n.Button_theme_islands.Button_size_s {\n    font-size: 13px;\n    line-height: 24px;\n}\n\n.Button_theme_islands.Button_size_s .Icon {\n    width: 24px;\n}\n\n.Button_theme_islands.Button_size_s .Button__text {\n    margin: 0 10px;\n}\n\n.Button_theme_islands.Button_size_m {\n    font-size: 13px;\n    line-height: 28px;\n}\n\n.Button_theme_islands.Button_size_m .Icon {\n    width: 28px;\n}\n\n.Button_theme_islands.Button_size_m .Button__text {\n    margin: 0 13px;\n}\n\n.Button_theme_islands.Button_size_l {\n    font-size: 15px;\n    line-height: 32px;\n}\n\n.Button_theme_islands.Button_size_l .Icon {\n    width: 32px;\n}\n\n.Button_theme_islands.Button_size_l .Button__text {\n    margin: 0 15px;\n}\n\n.Button_theme_islands.Button_size_xl {\n    font-size: 18px;\n    line-height: 38px;\n}\n\n.Button_theme_islands.Button_size_xl .Icon {\n    width: 38px;\n}\n\n.Button_theme_islands.Button_size_xl .Button__text {\n    margin: 0 18px;\n}\n\n.Button_theme_islands .Icon + .Button__text {\n    margin-left: 0;\n}\n\n.Button_theme_islands .Button__text:not(:last-child) {\n    margin-right: 0;\n}\n\n@-webkit-keyframes Button-action-focus {\n    from {\n        background-color: #ffdb4d;\n    }\n\n    to {\n        background-color: #fc0;\n    }\n}\n\n@keyframes Button-action-focus {\n    from {\n        background-color: #ffdb4d;\n    }\n\n    to {\n        background-color: #fc0;\n    }\n}\n\n.ControlGroup .Button_checked + .Button_theme_islands:before,\n    .ControlGroup .Radio_checked + .Radio .Button_theme_islands:before,\n    .ControlGroup .CheckBox_checked + .CheckBox .Button_theme_islands:before {\n    left: 0;\n}\n\n.ControlGroup .Button_theme_islands {\n    border-radius: 0;\n}\n\n.ControlGroup .Button_theme_islands:before {\n    right: 0;\n    border-radius: 0;\n}\n\n.ControlGroup .Button_theme_islands.Button_checked:before {\n    right: 1px;\n}\n\n.ControlGroup .Button_theme_islands.Button_focused_hard.Button:before {\n    left: 0;\n}\n\n.ControlGroup > .Button_theme_islands:first-child,\n    .ControlGroup > :first-child .Button_theme_islands,\n    .ControlGroup > :first-child.Popup + .Button_theme_islands {\n    border-radius: 3px 0 0 3px;\n}\n\n.ControlGroup > .Button_theme_islands:first-child:before, .ControlGroup > :first-child .Button_theme_islands:before, .ControlGroup > :first-child.Popup + .Button_theme_islands:before {\n    border-radius: 2px 0 0 2px;\n}\n\n.ControlGroup > .Button_theme_islands:first-child.Button_focused_hard.Button:before, .ControlGroup > :first-child .Button_theme_islands.Button_focused_hard.Button:before, .ControlGroup > :first-child.Popup + .Button_theme_islands.Button_focused_hard.Button:before {\n    left: 1px;\n}\n\n.ControlGroup > .Button_theme_islands:last-child,\n    .ControlGroup > :last-child .Button_theme_islands {\n    border-radius: 0 3px 3px 0;\n}\n\n.ControlGroup > .Button_theme_islands:last-child:before, .ControlGroup > :last-child .Button_theme_islands:before {\n    border-radius: 0 2px 2px 0;\n    right: 1px;\n}\n\n.ControlGroup > :only-child .Button_theme_islands {\n    border-radius: 3px;\n}\n\n.ControlGroup > :only-child .Button_theme_islands:before {\n    border-radius: 2px;\n}\n", ""]);

	// exports


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".CheckBox_theme_islands {\n    position: relative; /* fix #1538 */\n\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.CheckBox_theme_islands:hover {\n    cursor: pointer;\n}\n.CheckBox_theme_islands .CheckBox__control {\n    position: absolute;\n    z-index: -1;\n    margin: 0;\n    opacity: 0;\n}\n.CheckBox_theme_islands .CheckBox__box {\n    position: relative;\n    display: inline-block;\n    border-radius: 3px;\n    background: rgba(0, 0, 0, 0.2);\n}\n.CheckBox_theme_islands .CheckBox__box:before {\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    bottom: 1px;\n    left: 1px;\n    content: '';\n    border-radius: 2px;\n    background: #fff;\n}\n.CheckBox_theme_islands .CheckBox__box:after {\n    position: absolute;\n    top: -5px;\n    left: 2px;\n    content: '';\n    background-image: url(" + __webpack_require__(234) + ");\n    background-size: 100%;\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transition: opacity .05s ease-out, visibility 0s linear .05s, -webkit-transform .05s ease-out;\n    transition: opacity .05s ease-out, visibility 0s linear .05s, -webkit-transform .05s ease-out;\n    transition: transform .05s ease-out, opacity .05s ease-out, visibility 0s linear .05s;\n    transition: transform .05s ease-out, opacity .05s ease-out, visibility 0s linear .05s, -webkit-transform .05s ease-out;\n}\n.CheckBox_theme_islands.CheckBox_size_m {\n    font-size: 13px;\n}\n.CheckBox_theme_islands.CheckBox_size_m .CheckBox__box {\n    line-height: 14px;\n    top: 2px;\n    width: 14px;\n    height: 14px;\n    margin-right: 5px;\n}\n.CheckBox_theme_islands.CheckBox_size_m .CheckBox__box:after {\n    width: 15px;\n    height: 15px;\n    -webkit-transform: translateY(-5px);\n            transform: translateY(-5px);\n}\n.CheckBox_theme_islands.CheckBox_size_l {\n    font-size: 15px;\n}\n.CheckBox_theme_islands.CheckBox_size_l .CheckBox__box {\n    line-height: 17px;\n    top: 3px;\n    width: 17px;\n    height: 17px;\n    margin-right: 7px;\n}\n.CheckBox_theme_islands.CheckBox_size_l .CheckBox__box:after {\n    width: 18px;\n    height: 18px;\n    -webkit-transform: translateY(-7px);\n            transform: translateY(-7px);\n}\n.CheckBox_theme_islands.CheckBox_checked .CheckBox__box {\n    background: rgba(153, 122, 0, 0.5);\n}\n.CheckBox_theme_islands.CheckBox_checked .CheckBox__box:before {\n    background: #ffeba0;\n}\n.CheckBox_theme_islands.CheckBox_checked .CheckBox__box:after {\n    visibility: visible;\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n}\n.CheckBox_theme_islands.CheckBox_focused .CheckBox__box:before {\n    box-shadow: 0 0 0 1px #ffcc00, inset 0 0 0 1px #ffcc00;\n}\n.CheckBox_theme_islands.CheckBox_hovered .CheckBox__box {\n    background: rgba(0, 0, 0, 0.3);\n}\n.CheckBox_theme_islands.CheckBox_hovered.CheckBox_checked .CheckBox__box {\n    background: rgba(129, 103, 0, 0.6);\n}\n.CheckBox_theme_islands.CheckBox_disabled {\n    cursor: default;\n    color: #999;\n}\n.CheckBox_theme_islands.CheckBox_disabled .CheckBox__box {\n    background: rgba(0, 0, 0, 0.08);\n}\n.CheckBox_theme_islands.CheckBox_disabled .CheckBox__box:before {\n    display: none;\n}\n.CheckBox_theme_islands.CheckBox_disabled.CheckBox_checked .CheckBox__box {\n    background: rgba(0, 0, 0, 0.15);\n}\n.CheckBox_theme_islands.CheckBox_disabled.CheckBox_checked .CheckBox__box:after {\n    opacity: 0.4;\n}\n.CheckBox_theme_islands.CheckBox_type_button {\n    display: inline-block;\n}\n.CheckBox_theme_islands.CheckBox_type_line.CheckBox_size_m {\n    margin-right: 13px;\n}\n.CheckBox_theme_islands.CheckBox_type_line.CheckBox_size_l {\n    margin-right: 15px;\n}\n.CheckBox_theme_islands.CheckBox_type_line:last-child\n        {\n    margin-right: 0;\n}\n\n/* hack for Safari only */\n_::-webkit-full-page-media,\n_:future,\n:root .CheckBox_theme_islands .CheckBox__box {\n    pointer-events: none; /* NOTE: Fix #1472 and #1590 */\n}\n", ""]);

	// exports


/***/ },
/* 234 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='16'%3E%3Cpath d='M13.5.5l-8 12L1.7 8l-1 1.6L5.6 15l9.1-13.4z'/%3E%3C/svg%3E\""

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".CheckboxGroup_theme_islands {\n    display: inline-block;\n}\n.CheckboxGroup_theme_islands.CheckboxGroup_size_m {\n    line-height: 24px;\n}\n.CheckboxGroup_theme_islands.CheckboxGroup_size_l {\n    line-height: 30px;\n}\n.CheckboxGroup_theme_islands.CheckboxGroup_type_button {\n    display: inline-block;\n    white-space: nowrap;\n}\n", ""]);

	// exports


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Link_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    color: #04b;\n    cursor: pointer;\n    -webkit-transition: color 0.15s ease-out;\n    transition: color 0.15s ease-out;\n    text-decoration: none;\n\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);\n}\n.Link_theme_islands.Link_view_minor {\n    color: #669;\n}\n.Link_theme_islands.Link_view_external {\n    color: #070;\n}\n.Link_theme_islands.Link_view_ghost {\n    color: #999;\n}\n.Link_theme_islands.Link_view_ghost:hover {\n    color: #000;\n}\n.Link_theme_islands.Link_view_text {\n    color: #000;\n}\n.Link_theme_islands.Link_view_strong {\n    font-weight: bold;\n}\n.Link_theme_islands:hover {\n    color: #e00;\n}\n.Link_theme_islands.Link_size_s {\n    font-size: 13px;\n}\n.Link_theme_islands.Link_size_m {\n    font-size: 13px;\n}\n.Link_theme_islands.Link_size_l {\n    font-size: 15px;\n}\n.Link_theme_islands.Link_size_xl {\n    font-size: 18px;\n}\n.Link_theme_islands.Link_disabled {\n    cursor: inherit;\n    color: #ddd;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n", ""]);

	// exports


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".MenuItem_theme_islands {\n    position: relative;\n\n    white-space: nowrap;\n}\n\n.MenuItem_theme_islands.MenuItem_disabled {\n    opacity: 0.3;\n}\n\n.MenuItem_theme_islands .link_disabled {\n    cursor: text;\n}\n\n.MenuItem_theme_islands.MenuItem_checked {\n    background: 0 50% no-repeat url(" + __webpack_require__(234) + ");\n}\n\n.MenuItem_theme_islands.MenuItem_hovered {\n    cursor: pointer;\n    background-color: #ffeba0;\n}\n\n.MenuItem_theme_islands.MenuItem_type_link .link {\n    text-decoration: none;\n    color: inherit;\n    outline: none;\n}\n\n/* Fit clickable area to `MenuItem` size */\n\n.MenuItem_theme_islands.MenuItem_type_link .link:after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    content: '';\n}\n\n.Menu_size_s .MenuItem_theme_islands {\n    padding: 0 10px;\n    background-size: 14px 14px;\n    background-position: 10px 50%;\n}\n\n.Menu_size_s .MenuItemGroup + .MenuItem_theme_islands {\n    margin-top: 3px;\n}\n\n.Menu_size_s[class*='Menu_mode'] .MenuItem_theme_islands,\n        .Menu_size_s .MenuItemGroup__title ~ .MenuItem_theme_islands {\n    padding: 0 30px;\n}\n\n.Menu_size_m .MenuItem_theme_islands {\n    padding: 0 13px;\n    background-size: 14px 14px;\n    background-position: 13px 50%;\n}\n\n.Menu_size_m .MenuItemGroup + .MenuItem_theme_islands {\n    margin-top: 4px;\n}\n\n.Menu_size_m[class*='Menu_mode'] .MenuItem_theme_islands,\n        .Menu_size_m .MenuItemGroup__title ~ .MenuItem_theme_islands {\n    padding: 0 30px;\n}\n\n.Menu_size_l .MenuItem_theme_islands {\n    padding: 0 15px;\n    background-size: 15px 15px;\n    background-position: 15px 50%;\n}\n\n.Menu_size_l .MenuItemGroup + .MenuItem_theme_islands {\n    margin-top: 5px;\n}\n\n.Menu_size_l[class*='Menu_mode'] .MenuItem_theme_islands,\n        .Menu_size_l .MenuItemGroup__title ~ .MenuItem_theme_islands {\n    padding: 0 34px;\n}\n\n.Menu_size_xl .MenuItem_theme_islands {\n    padding: 0 20px;\n    background-size: 15px 15px;\n    background-position: 20px 50%;\n}\n\n.Menu_size_xl .MenuItemGroup + .MenuItem_theme_islands {\n    margin-top: 6px;\n}\n\n.Menu_size_xl[class*='Menu_mode'] .MenuItem_theme_islands,\n        .Menu_size_xl .MenuItemGroup__title ~ .MenuItem_theme_islands {\n    padding: 0 40px;\n}\n\n.Menu_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    box-sizing: border-box;\n\n    -webkit-user-select: none;\n\n       -moz-user-select: none;\n\n        -ms-user-select: none;\n\n            user-select: none;\n\n    outline: 0;\n    background: #fff;\n\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n/* Using pseudo-elements intead of paddings because of Firefox bug with bottom padding (#1158):\n     * https://bugzilla.mozilla.org/show_bug.cgi?id=748518 */\n\n.Menu_theme_islands:before,\n    .Menu_theme_islands:after {\n    display: block;\n    content: '';\n}\n\n.Menu_theme_islands.Menu_size_s {\n    font-size: 13px;\n    line-height: 24px;\n}\n\n.Menu_theme_islands.Menu_size_s:before,\n            .Menu_theme_islands.Menu_size_s:after {\n    height: 3px;\n}\n\n.Menu_theme_islands.Menu_size_s .MenuItem + .MenuItemGroup {\n    margin-top: 3px;\n}\n\n.Menu_theme_islands.Menu_size_s .MenuItemGroup {\n    padding: 3px 0;\n}\n\n.Menu_theme_islands.Menu_size_s .MenuItemGroup__title {\n    padding: 0 10px;\n}\n\n.Menu_theme_islands.Menu_size_m {\n    font-size: 13px;\n    line-height: 24px;\n}\n\n.Menu_theme_islands.Menu_size_m:before,\n            .Menu_theme_islands.Menu_size_m:after {\n    height: 4px;\n}\n\n.Menu_theme_islands.Menu_size_m .MenuItem + .MenuItemGroup {\n    margin-top: 4px;\n}\n\n.Menu_theme_islands.Menu_size_m .MenuItemGroup {\n    padding: 4px 0;\n}\n\n.Menu_theme_islands.Menu_size_m .MenuItemGroup__title {\n    padding: 0 13px;\n}\n\n.Menu_theme_islands.Menu_size_l {\n    font-size: 15px;\n    line-height: 28px;\n}\n\n.Menu_theme_islands.Menu_size_l:before,\n            .Menu_theme_islands.Menu_size_l:after {\n    height: 5px;\n}\n\n.Menu_theme_islands.Menu_size_l .MenuItem + .MenuItemGroup {\n    margin-top: 5px;\n}\n\n.Menu_theme_islands.Menu_size_l .MenuItemGroup {\n    padding: 5px 0;\n}\n\n.Menu_theme_islands.Menu_size_l .MenuItemGroup__title {\n    padding: 0 15px;\n}\n\n.Menu_theme_islands.Menu_size_xl {\n    font-size: 15px;\n    line-height: 32px;\n}\n\n.Menu_theme_islands.Menu_size_xl:before,\n            .Menu_theme_islands.Menu_size_xl:after {\n    height: 6px;\n}\n\n.Menu_theme_islands.Menu_size_xl .MenuItem + .MenuItemGroup {\n    margin-top: 6px;\n}\n\n.Menu_theme_islands.Menu_size_xl .MenuItemGroup {\n    padding: 6px 0;\n}\n\n.Menu_theme_islands.Menu_size_xl .MenuItemGroup__title {\n    padding: 0 20px;\n}\n\n.Menu_theme_islands .MenuItemGroup {\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    border-width: 1px 0;\n}\n\n.Menu_theme_islands .MenuItemGroup__title {\n    color: #999;\n}\n\n.Menu_theme_islands .MenuItemGroup + .MenuItemGroup {\n    border-top: 0;\n}\n\n.Menu_theme_islands .MenuItemGroup:last-child {\n    padding-bottom: 0;\n    border-bottom: 0;\n}\n\n.Menu_theme_islands .MenuItemGroup:first-child {\n    padding-top: 0;\n    border-top: 0;\n}\n", ""]);

	// exports


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Modal_theme_islands {\n    visibility: hidden;\n\n    margin: -9999px 0 0 -9999px; /* to prevent clickability and visiblity of internal elements with visiblity: visible */\n\n    background: rgba(50, 50, 50, 0.2);\n\n    -webkit-animation-name: Modal_theme_islands;\n\n            animation-name: Modal_theme_islands;\n}\n.Modal_theme_islands,\n    .Modal_theme_islands .Modal__content {\n    -webkit-animation-duration: 0.2s;\n            animation-duration: 0.2s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-timing-function: ease-in-out;\n            animation-timing-function: ease-in-out;\n}\n.Modal_theme_islands .Modal__content {\n    margin: 5px;\n    border: 1px solid #bfbfbf;\n    background-color: #fff;\n    -webkit-animation-name: Modal_theme_islands__content;\n            animation-name: Modal_theme_islands__content;\n}\n.Modal_theme_islands.Modal_visible {\n    visibility: visible;\n    margin: 0;\n    -webkit-animation-name: Modal_theme_islands_visible;\n            animation-name: Modal_theme_islands_visible;\n}\n.Modal_theme_islands.Modal_visible .Modal__content {\n    -webkit-animation-name: Modal_theme_islands_visible__content;\n            animation-name: Modal_theme_islands_visible__content;\n}\n\n/* closing Modal */\n@-webkit-keyframes Modal_theme_islands {\n    0% {\n        visibility: visible;\n\n        margin: 0;\n\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n    }\n\n    100% {\n        visibility: hidden;\n\n        margin: -9999px 0 0 -9999px;\n\n        opacity: 0;\n    }\n}\n@keyframes Modal_theme_islands {\n    0% {\n        visibility: visible;\n\n        margin: 0;\n\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n    }\n\n    100% {\n        visibility: hidden;\n\n        margin: -9999px 0 0 -9999px;\n\n        opacity: 0;\n    }\n}\n\n/* opening Modal */\n@-webkit-keyframes Modal_theme_islands_visible {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n@keyframes Modal_theme_islands_visible {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n\n/* closing Modal__content */\n@-webkit-keyframes Modal_theme_islands__content {\n    0% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n\n    100% {\n        -webkit-transform: scale(1.5);\n                transform: scale(1.5);\n    }\n}\n@keyframes Modal_theme_islands__content {\n    0% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n\n    100% {\n        -webkit-transform: scale(1.5);\n                transform: scale(1.5);\n    }\n}\n\n/* opening Modal__content */\n@-webkit-keyframes Modal_theme_islands_visible__content {\n    0% {\n        -webkit-transform: scale(.75);\n                transform: scale(.75);\n    }\n\n    100% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n}\n@keyframes Modal_theme_islands_visible__content {\n    0% {\n        -webkit-transform: scale(.75);\n                transform: scale(.75);\n    }\n\n    100% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n}\n", ""]);

	// exports


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Popup_theme_islands {\n    visibility: hidden;\n\n    margin: -9999px 0 0 -9999px;\n\n    -webkit-animation-duration: .1s;\n\n            animation-duration: .1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n\n    background: #fff;\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1),\n                0 10px 20px -5px rgba(0, 0, 0, .4);\n}\n\n.Popup_theme_islands.Popup_visible {\n    visibility: visible;\n    margin: 0;\n}\n\n.Popup_theme_islands.Popup_direction_bottom-left {\n    -webkit-animation-name: Popup_theme_islands_bottom;\n            animation-name: Popup_theme_islands_bottom;\n}\n\n.Popup_theme_islands.Popup_direction_bottom-left.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_bottom_visible;\n            animation-name: Popup_theme_islands_bottom_visible;\n}\n\n.Popup_theme_islands.Popup_direction_bottom-center {\n    -webkit-animation-name: Popup_theme_islands_bottom;\n            animation-name: Popup_theme_islands_bottom;\n}\n\n.Popup_theme_islands.Popup_direction_bottom-center.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_bottom_visible;\n            animation-name: Popup_theme_islands_bottom_visible;\n}\n\n.Popup_theme_islands.Popup_direction_bottom-right {\n    -webkit-animation-name: Popup_theme_islands_bottom;\n            animation-name: Popup_theme_islands_bottom;\n}\n\n.Popup_theme_islands.Popup_direction_bottom-right.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_bottom_visible;\n            animation-name: Popup_theme_islands_bottom_visible;\n}\n\n.Popup_theme_islands.Popup_direction_top-left {\n    -webkit-animation-name: Popup_theme_islands_top;\n            animation-name: Popup_theme_islands_top;\n}\n\n.Popup_theme_islands.Popup_direction_top-left.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_top_visible;\n            animation-name: Popup_theme_islands_top_visible;\n}\n\n.Popup_theme_islands.Popup_direction_top-center {\n    -webkit-animation-name: Popup_theme_islands_top;\n            animation-name: Popup_theme_islands_top;\n}\n\n.Popup_theme_islands.Popup_direction_top-center.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_top_visible;\n            animation-name: Popup_theme_islands_top_visible;\n}\n\n.Popup_theme_islands.Popup_direction_top-right {\n    -webkit-animation-name: Popup_theme_islands_top;\n            animation-name: Popup_theme_islands_top;\n}\n\n.Popup_theme_islands.Popup_direction_top-right.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_top_visible;\n            animation-name: Popup_theme_islands_top_visible;\n}\n\n.Popup_theme_islands.Popup_direction_right-top {\n    -webkit-animation-name: Popup_theme_islands_right;\n            animation-name: Popup_theme_islands_right;\n}\n\n.Popup_theme_islands.Popup_direction_right-top.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_right_visible;\n            animation-name: Popup_theme_islands_right_visible;\n}\n\n.Popup_theme_islands.Popup_direction_right-center {\n    -webkit-animation-name: Popup_theme_islands_right;\n            animation-name: Popup_theme_islands_right;\n}\n\n.Popup_theme_islands.Popup_direction_right-center.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_right_visible;\n            animation-name: Popup_theme_islands_right_visible;\n}\n\n.Popup_theme_islands.Popup_direction_right-bottom {\n    -webkit-animation-name: Popup_theme_islands_right;\n            animation-name: Popup_theme_islands_right;\n}\n\n.Popup_theme_islands.Popup_direction_right-bottom.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_right_visible;\n            animation-name: Popup_theme_islands_right_visible;\n}\n\n.Popup_theme_islands.Popup_direction_left-top {\n    -webkit-animation-name: Popup_theme_islands_left;\n            animation-name: Popup_theme_islands_left;\n}\n\n.Popup_theme_islands.Popup_direction_left-top.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_left_visible;\n            animation-name: Popup_theme_islands_left_visible;\n}\n\n.Popup_theme_islands.Popup_direction_left-center {\n    -webkit-animation-name: Popup_theme_islands_left;\n            animation-name: Popup_theme_islands_left;\n}\n\n.Popup_theme_islands.Popup_direction_left-center.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_left_visible;\n            animation-name: Popup_theme_islands_left_visible;\n}\n\n.Popup_theme_islands.Popup_direction_left-bottom {\n    -webkit-animation-name: Popup_theme_islands_left;\n            animation-name: Popup_theme_islands_left;\n}\n\n.Popup_theme_islands.Popup_direction_left-bottom.Popup_visible {\n    -webkit-animation-name: Popup_theme_islands_left_visible;\n            animation-name: Popup_theme_islands_left_visible;\n}\n\n@-webkit-keyframes Popup_theme_islands_bottom {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateY(10px);\n                transform: translateY(10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@keyframes Popup_theme_islands_bottom {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateY(10px);\n                transform: translateY(10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_bottom_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateY(10px);\n                transform: translateY(10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n    }\n}\n\n@keyframes Popup_theme_islands_bottom_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateY(10px);\n                transform: translateY(10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_top {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateY(-10px);\n                transform: translateY(-10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@keyframes Popup_theme_islands_top {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateY(-10px);\n                transform: translateY(-10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_top_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateY(-10px);\n                transform: translateY(-10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n    }\n}\n\n@keyframes Popup_theme_islands_top_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateY(-10px);\n                transform: translateY(-10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateY(0);\n                transform: translateY(0);\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_right {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateX(10px);\n                transform: translateX(10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@keyframes Popup_theme_islands_right {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateX(10px);\n                transform: translateX(10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_right_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateX(10px);\n                transform: translateX(10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n    }\n}\n\n@keyframes Popup_theme_islands_right_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateX(10px);\n                transform: translateX(10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_left {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateX(-10px);\n                transform: translateX(-10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@keyframes Popup_theme_islands_left {\n\n    0% {\n        visibility: visible;\n        margin: 0;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n        opacity: 1;\n    }\n\n    99% {\n        margin: 0;\n        -webkit-transform: translateX(-10px);\n                transform: translateX(-10px);\n    }\n\n    100% {\n        visibility: hidden;\n        margin: -9999px 0 0 -9999px;\n        opacity: 0;\n    }\n}\n\n@-webkit-keyframes Popup_theme_islands_left_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateX(-10px);\n                transform: translateX(-10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n    }\n}\n\n@keyframes Popup_theme_islands_left_visible {\n\n    0% {\n        opacity: 0;\n        -webkit-transform: translateX(-10px);\n                transform: translateX(-10px);\n    }\n\n    100% {\n        opacity: 1;\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n    }\n}\n", ""]);

	// exports


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Radio_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.Radio_theme_islands:hover {\n    cursor: pointer;\n}\n.Radio_theme_islands .Radio__control {\n    position: absolute;\n    z-index: -1;\n    margin: 0;\n    opacity: 0;\n}\n.Radio_theme_islands .Radio__box {\n    position: relative;\n    display: inline-block;\n    border-radius: 50%;\n    background: rgba(0, 0, 0, 0.2);\n}\n.Radio_theme_islands .Radio__box:before {\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    bottom: 1px;\n    left: 1px;\n    content: '';\n    border-radius: 50%;\n    background: #fff;\n}\n.Radio_theme_islands.Radio_size_m {\n    font-size: 13px;\n}\n.Radio_theme_islands.Radio_size_m .Radio__box {\n    line-height: 14px;\n    top: 2px;\n    width: 14px;\n    height: 14px;\n    margin-right: 5px;\n}\n.Radio_theme_islands.Radio_size_m .Radio__box:after {\n    top: 4px;\n    left: 4px;\n    width: 6px;\n    height: 6px;\n}\n.Radio_theme_islands.Radio_size_l {\n    font-size: 15px;\n}\n.Radio_theme_islands.Radio_size_l .Radio__box {\n    line-height: 17px;\n    top: 3px;\n    width: 17px;\n    height: 17px;\n    margin-right: 7px;\n}\n.Radio_theme_islands.Radio_size_l .Radio__box:after {\n    top: 5px;\n    left: 5px;\n    width: 7px;\n    height: 7px;\n}\n.Radio_theme_islands.Radio_checked .Radio__box {\n    background: rgba(153, 122, 0, 0.5);\n}\n.Radio_theme_islands.Radio_checked .Radio__box:before {\n    background: #ffeba0;\n}\n.Radio_theme_islands.Radio_checked .Radio__box:after {\n    position: absolute;\n    border-radius: 50%;\n    background: #000;\n    content: '';\n}\n.Radio_theme_islands.Radio_focused .Radio__box:before {\n    box-shadow: 0 0 0 1px #ffcc00, inset 0 0 0 1px #ffcc00;\n}\n.Radio_theme_islands.Radio_hovered .Radio__box {\n    background: rgba(0, 0, 0, 0.3);\n}\n.Radio_theme_islands.Radio_hovered.Radio_checked .Radio__box {\n    background: rgba(129, 103, 0, 0.6);\n}\n.Radio_theme_islands.Radio_disabled {\n    cursor: default;\n    color: #999;\n}\n.Radio_theme_islands.Radio_disabled .Radio__box {\n    background: rgba(0, 0, 0, 0.08);\n}\n.Radio_checked.Radio_theme_islands.Radio_disabled .Radio__box {\n    background: rgba(0, 0, 0, 0.15);\n}\n.Radio_theme_islands.Radio_disabled .Radio__box:before {\n    display: none;\n}\n.Radio_theme_islands.Radio_disabled .Radio__box:after {\n    background: rgba(0, 0, 0, 0.4);\n}\n.Radio_theme_islands.Radio_type_button {\n    display: inline-block;\n}\n.Radio_theme_islands.Radio_type_line.Radio_size_m {\n    margin-right: 13px;\n}\n.Radio_theme_islands.Radio_type_line.Radio_size_l {\n    margin-right: 15px;\n}\n.Radio_theme_islands.Radio_type_line:last-child {\n    margin-right: 0;\n}\n", ""]);

	// exports


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".RadioGroup_theme_islands {\n    display: inline-block;\n}\n.RadioGroup_theme_islands.RadioGroup_size_m {\n    line-height: 24px;\n}\n.RadioGroup_theme_islands.RadioGroup_size_l {\n    line-height: 30px;\n}\n.RadioGroup_theme_islands.RadioGroup_type_button {\n    display: inline-block;\n    white-space: nowrap;\n}\n", ""]);

	// exports


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Select_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    max-width: 100%;\n\n    vertical-align: bottom;\n}\n.Select_theme_islands .Select__button {\n    width: 100%;\n    text-align: left;\n    vertical-align: top;\n}\n.Select_theme_islands .Select__button .Button__text {\n    display: block;\n}\n.Select_theme_islands .Select__button .Button__text:empty:before {\n    content: '\\A0';\n}\n.Select_theme_islands .Select__button.Button_size_s .Button__text {\n    padding-right: 22px;\n}\n.Select_theme_islands .Select__button.Button_size_s .icon {\n    width: 25px;\n}\n.Select_theme_islands .Select__button.Button_size_m .Button__text {\n    padding-right: 25px;\n}\n.Select_theme_islands .Select__button.Button_size_m .icon {\n    width: 31px;\n}\n.Select_theme_islands .Select__button.Button_size_l .Button__text {\n    padding-right: 29px;\n}\n.Select_theme_islands .Select__button.Button_size_l .icon {\n    width: 35px;\n}\n.Select_theme_islands .Select__button.Button_size_xl .Button__text {\n    padding-right: 33px;\n}\n.Select_theme_islands .Select__button.Button_size_xl .icon\n            {\n    width: 39px;\n}\n.Select_theme_islands .Select__tick {\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-image: url(" + __webpack_require__(243) + ");\n    -webkit-transition: -webkit-transform 0.1s ease-out;\n    transition: -webkit-transform 0.1s ease-out;\n    transition: transform 0.1s ease-out;\n    transition: transform 0.1s ease-out, -webkit-transform 0.1s ease-out;\n}\n.Select_theme_islands.Select_size_s .Select__tick {\n    background-image: url(" + __webpack_require__(244) + ");\n}\n.Select_theme_islands.Select_opened .Select__tick {\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg);\n}\n.Select_theme_islands.Select_width_available {\n    width: 100%;\n}\n", ""]);

	// exports


/***/ },
/* 243 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='6'%3E%3Cpath d='M10.3 0L5.5 4.7.7 0 0 .7 5.5 6 11 .7z'/%3E%3C/svg%3E\""

/***/ },
/* 244 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='5'%3E%3Cpath d='M8.2 0l-3.7 3.6-3.8-3.6-.7.7 3.7 3.6.8.7 4.5-4.3z'/%3E%3C/svg%3E\""

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".Spinner_theme_islands {\n    position: relative;\n\n    display: inline-block;\n\n    -webkit-animation: Spinner_theme_islands 1s infinite linear;\n\n            animation: Spinner_theme_islands 1s infinite linear;\n\n    -webkit-backface-visibility: hidden;\n\n            backface-visibility: hidden; /* Accelerate animation */\n\n    box-sizing: border-box;\n\n    border: 2px solid transparent;\n    border-radius: 50%;\n    border-top-color: #fc0;\n    border-left-color: #fc0;\n}\n\n.Spinner_theme_islands:after {\n    content: '\\A0';\n}\n\n.Spinner_theme_islands.Spinner_size_xs {\n    line-height: 16px;\n    width: 16px;\n    height: 16px;\n}\n\n.Spinner_theme_islands.Spinner_size_s {\n    line-height: 24px;\n    width: 24px;\n    height: 24px;\n}\n\n.Spinner_theme_islands.Spinner_size_m {\n    line-height: 28px;\n    width: 28px;\n    height: 28px;\n}\n\n.Spinner_theme_islands.Spinner_size_l {\n    line-height: 32px;\n    width: 32px;\n    height: 32px;\n}\n\n.Spinner_theme_islands.Spinner_size_xl {\n    line-height: 38px;\n    width: 38px;\n    height: 38px;\n}\n\n@-webkit-keyframes Spinner_theme_islands {\n    from {\n        -webkit-transform: rotate(0);\n                transform: rotate(0);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n    }\n}\n\n@keyframes Spinner_theme_islands {\n    from {\n        -webkit-transform: rotate(0);\n                transform: rotate(0);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n    }\n}\n", ""]);

	// exports


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".TextArea_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    display: inline-block;\n\n    background: #fff;\n\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    min-height: 2em;\n\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    outline: none;\n\n    -webkit-appearance: none;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.TextArea_theme_islands::-webkit-input-placeholder {\n    color: #999;\n    text-indent: 0;\n}\n.TextArea_theme_islands::-moz-placeholder {\n    opacity: 1;\n    color: #999;\n}\n.TextArea_theme_islands.TextArea_focused {\n    border-color: #ffcc00;\n    box-shadow: 0 0 0 1px #ffcc00;\n}\n.TextArea_theme_islands.TextArea_width_available {\n    width: 100%;\n    resize: vertical;\n}\n.TextArea_theme_islands.TextArea_disabled {\n    resize: none;\n    cursor: default;\n    color: rgba(0, 0, 0, .4);\n    border-color: transparent;\n    background: rgba(0, 0, 0, .08);\n}\n.TextArea_theme_islands.TextArea_size_s {\n    font-size: 13px;\n    line-height: 16px;\n    padding-left: 6px;\n}\n.TextArea_theme_islands.TextArea_size_m {\n    font-size: 13px;\n    line-height: 18px;\n    padding: 3px 5px;\n}\n.TextArea_theme_islands.TextArea_size_l {\n    font-size: 15px;\n    line-height: 20px;\n    padding: 5px 7px;\n}\n.TextArea_theme_islands.TextArea_size_xl {\n    font-size: 18px;\n    line-height: 22px;\n    padding-left: 11px;\n}\n", ""]);

	// exports


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".TextInput_theme_islands {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\n    position: relative;\n\n    display: inline-block;\n\n    background: rgba(0, 0, 0, 0.2);\n\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n/* Decorative element (inner background) */\n\n.TextInput_theme_islands:before {\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    bottom: 1px;\n    left: 1px;\n    content: '';\n    background: #fff;\n}\n\n.TextInput_theme_islands .TextInput__box {\n    position: relative;\n    display: block;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n\n.TextInput_theme_islands .TextInput__control {\n    font: inherit;\n    line-height: inherit;\n    position: relative;\n    display: inline-block;\n    box-sizing: border-box;\n    padding: 0;\n    width: 100%;\n    border: 0;\n    outline: none;\n    background: none;\n    -webkit-appearance: none;\n}\n/*лишние отступы у текста*/\n\n.TextInput_theme_islands .TextInput__control::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n/*нативный крестик*/\n\n.TextInput_theme_islands .TextInput__control::-webkit-search-cancel-button {\n    display: none;\n}\n\n.TextInput_theme_islands .TextInput__control::-webkit-TextInput-placeholder {\n    color: #999;\n    text-indent: 0;\n}\n\n.TextInput_theme_islands .TextInput__control::-moz-placeholder {\n    opacity: 1;\n    color: #999;\n}\n\n.TextInput_theme_islands .TextInput__control::-ms-clear {\n    display: none;\n}\n\n.TextInput_theme_islands .TextInput__control::-webkit-autofill {\n    border: 1px solid transparent;\n    background-clip: padding-box;\n}\n\n.TextInput_theme_islands.TextInput_hasClear .TextInput__control {\n    text-overflow: ellipsis;\n}\n\n.TextInput_theme_islands .TextInput__clear {\n    position: absolute;\n    top: 0;\n    right: 0;\n    cursor: text;\n    -webkit-transition: opacity 0.1s ease-out;\n    transition: opacity 0.1s ease-out;\n    opacity: 0;\n    background: 50% 50% no-repeat;\n}\n\n.TextInput_theme_islands .TextInput__clear_visible {\n    opacity: 0.3;\n}\n\n.TextInput_theme_islands .TextInput__clear_visible:hover {\n    cursor: pointer;\n    opacity: 1;\n}\n\n.TextInput_theme_islands.TextInput_focused {\n    z-index: 1;\n}\n\n.TextInput_theme_islands.TextInput_focused:before {\n    box-shadow: 0 0 0 1px #ffcc00, inset 0 0 0 1px #ffcc00;\n}\n\n.TextInput_theme_islands.TextInput_focused .TextInput__control {\n    text-overflow: clip;\n    /* fix ellipsis bug in Chrome */\n}\n\n.TextInput_theme_islands.TextInput_disabled {\n    background: rgba(0, 0, 0, 0.08);\n}\n\n.TextInput_theme_islands.TextInput_disabled:before,\n        .TextInput_theme_islands.TextInput_disabled .TextInput__clear {\n    display: none;\n}\n\n.TextInput_theme_islands.TextInput_disabled .TextInput__box,\n        .TextInput_theme_islands.TextInput_disabled .TextInput__control {\n    color: rgba(0, 0, 0, 0.4);\n    cursor: default;\n}\n\n.TextInput_theme_islands.TextInput_size_s .TextInput__clear,\n    .TextInput_theme_islands.TextInput_size_m .TextInput__clear {\n    width: 24px;\n    height: 24px;\n    background-image: url(" + __webpack_require__(248) + ");\n    background-position: 7px 50%;\n}\n\n.TextInput_theme_islands.TextInput_size_s {\n    font-size: 13px;\n    line-height: 16px;\n}\n\n.TextInput_theme_islands.TextInput_size_s .TextInput__control {\n    height: 24px;\n    padding: 0 7px;\n}\n\n.TextInput_theme_islands.TextInput_size_s.TextInput_hasClear .TextInput__control {\n    padding-right: 24px;\n}\n\n.TextInput_theme_islands.TextInput_size_m {\n    font-size: 13px;\n    line-height: 16px;\n}\n\n.TextInput_theme_islands.TextInput_size_m .TextInput__control {\n    height: 28px;\n    padding: 0 8px;\n}\n\n.TextInput_theme_islands.TextInput_size_m.TextInput_hasClear .TextInput__control {\n    padding-right: 28px;\n}\n\n.TextInput_theme_islands.TextInput_size_m .TextInput__clear {\n    width: 28px;\n    height: 28px;\n    background-position: 9px 50%;\n}\n\n.TextInput_theme_islands.TextInput_size_l .TextInput__clear,\n    .TextInput_theme_islands.TextInput_size_xl .TextInput__clear {\n    width: 32px;\n    height: 32px;\n    background-image: url(" + __webpack_require__(249) + ");\n    background-position: 9px 50%;\n}\n\n.TextInput_theme_islands.TextInput_size_l {\n    font-size: 15px;\n    line-height: 18px;\n}\n\n.TextInput_theme_islands.TextInput_size_l .TextInput__control {\n    height: 32px;\n    padding: 0 10px;\n}\n\n.TextInput_theme_islands.TextInput_size_l.TextInput_hasClear .TextInput__control {\n    padding-right: 32px;\n}\n\n.TextInput_theme_islands.TextInput_size_xl {\n    font-size: 18px;\n    line-height: 22px;\n}\n\n.TextInput_theme_islands.TextInput_size_xl .TextInput__control {\n    height: 38px;\n    padding: 0 12px;\n}\n\n.TextInput_theme_islands.TextInput_size_xl.TextInput_hasClear .TextInput__control {\n    padding-right: 38px;\n}\n\n.TextInput_theme_islands.TextInput_size_xl .TextInput__clear {\n    width: 38px;\n    height: 38px;\n    background-position: 12px 50%;\n}\n\n.TextInput_theme_islands.TextInput_hasClear .TextInput__control {\n    padding-right: 0;\n}\n\n.TextInput_theme_islands.TextInput_width_available {\n    width: 100%;\n}\n\n.TextInput_theme_islands.TextInput_type_password .TextInput__control {\n    text-overflow: clip;\n}\n\n.control-group .TextInput_theme_islands:before {\n    right: 0;\n}\n\n.control-group > .TextInput_theme_islands:last-child:before, .control-group > :last-child .TextInput_theme_islands:before {\n    right: 1px;\n}\n", ""]);

	// exports


/***/ },
/* 248 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath d='M10 .7L9.3 0 5 4.3.7 0 0 .7 4.3 5 0 9.3l.7.7L5 5.7 9.3 10l.7-.7L5.7 5z'/%3E%3C/svg%3E\""

/***/ },
/* 249 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Cpath d='M14 .7l-.7-.7L7 6.3.7 0 0 .7 6.3 7 0 13.3l.7.7L7 7.7l6.3 6.3.7-.7L7.7 7z'/%3E%3C/svg%3E\""

/***/ }
/******/ ]);