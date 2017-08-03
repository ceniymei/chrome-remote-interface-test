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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
function defaultClearTimeout () {
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
} ())
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
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
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
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(37)
var ieee754 = __webpack_require__(38)
var isArray = __webpack_require__(15)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(3);
/*</replacement>*/

var Readable = __webpack_require__(18);
var Writable = __webpack_require__(21);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(4)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(42);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(12);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(59);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(60);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(2)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(62)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(21);
exports.Duplex = __webpack_require__(5);
exports.Transform = __webpack_require__(23);
exports.PassThrough = __webpack_require__(44);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(15);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(8).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(19);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(9).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(40);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(41);
var destroyImpl = __webpack_require__(20);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(5);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(22).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(5);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(22).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8).EventEmitter;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(43)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(9).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(20);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(5);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(5);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(10).setImmediate, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(4).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(5);

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
var rp = __webpack_require__(25)
var minimatch = __webpack_require__(13)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(65)
var EE = __webpack_require__(8).EventEmitter
var path = __webpack_require__(2)
var assert = __webpack_require__(11)
var isAbsolute = __webpack_require__(14)
var globSync = __webpack_require__(66)
var common = __webpack_require__(26)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(67)
var util = __webpack_require__(12)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(28)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(61)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(2)
var minimatch = __webpack_require__(13)
var isAbsolute = __webpack_require__(14)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(27)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const chromeLauncher = __webpack_require__(30);
const CDP = __webpack_require__(72);

// Optional: set logging level of launcher to see its output.
// Install it using: yarn add lighthouse-logger
// const log = require('lighthouse-logger');
// log.setLevel('info');

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless = true) {
  return chromeLauncher.launch({
    // port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: ['--window-size=412,732', '--disable-gpu', headless ? '--headless' : '']
  });
}

var callback = (() => {
  var _ref = _asyncToGenerator(function* (chrome) {
    console.log(`Chrome debuggable on port: ${chrome.port}`);

    const version = yield CDP.version({ port: chrome.port });
    console.log(version['User-Agent']);
  });

  return function callback(_x) {
    return _ref.apply(this, arguments);
  };
})();

launchChrome().then(callback);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(31));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFrQyJ9

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"child_process\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const chromeFinder = __webpack_require__(32);
const random_port_1 = __webpack_require__(34);
const flags_1 = __webpack_require__(55);
const utils_1 = __webpack_require__(56);
const net = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"net\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const rimraf = __webpack_require__(58);
const log = __webpack_require__(68);
const spawn = childProcess.spawn;
const execSync = childProcess.execSync;
const isWindows = process.platform === 'win32';
const _SIGINT = 'SIGINT';
const _SIGINT_EXIT_CODE = 130;
const _SUPPORTED_PLATFORMS = new Set(['darwin', 'linux', 'win32']);
function launch(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        opts.handleSIGINT = utils_1.defaults(opts.handleSIGINT, true);
        const instance = new Launcher(opts);
        // Kill spawned Chrome process in case of ctrl-C.
        if (opts.handleSIGINT) {
            process.on(_SIGINT, () => __awaiter(this, void 0, void 0, function* () {
                yield instance.kill();
                process.exit(_SIGINT_EXIT_CODE);
            }));
        }
        yield instance.launch();
        return { pid: instance.pid, port: instance.port, kill: () => __awaiter(this, void 0, void 0, function* () { return instance.kill(); }) };
    });
}
exports.launch = launch;
class Launcher {
    constructor(opts = {}, moduleOverrides = {}) {
        this.opts = opts;
        this.tmpDirandPidFileReady = false;
        this.pollInterval = 500;
        this.fs = moduleOverrides.fs || fs;
        this.rimraf = moduleOverrides.rimraf || rimraf;
        this.spawn = moduleOverrides.spawn || spawn;
        log.setLevel(utils_1.defaults(this.opts.logLevel, 'info'));
        // choose the first one (default)
        this.startingUrl = utils_1.defaults(this.opts.startingUrl, 'about:blank');
        this.chromeFlags = utils_1.defaults(this.opts.chromeFlags, []);
        this.requestedPort = utils_1.defaults(this.opts.port, 0);
        this.chromePath = this.opts.chromePath;
    }
    get flags() {
        const flags = flags_1.DEFAULT_FLAGS.concat([
            `--remote-debugging-port=${this.port}`,
            // Place Chrome profile in a custom location we'll rm -rf later
            `--user-data-dir=${this.userDataDir}`
        ]);
        if (process.platform === 'linux') {
            flags.push('--disable-setuid-sandbox');
        }
        flags.push(...this.chromeFlags);
        flags.push(this.startingUrl);
        return flags;
    }
    // Wrapper function to enable easy testing.
    makeTmpDir() {
        return utils_1.makeTmpDir();
    }
    prepare() {
        const platform = process.platform;
        if (!_SUPPORTED_PLATFORMS.has(platform)) {
            throw new Error(`Platform ${platform} is not supported`);
        }
        this.userDataDir = this.opts.userDataDir || this.makeTmpDir();
        this.outFile = this.fs.openSync(`${this.userDataDir}/chrome-out.log`, 'a');
        this.errFile = this.fs.openSync(`${this.userDataDir}/chrome-err.log`, 'a');
        // fix for Node4
        // you can't pass a fd to fs.writeFileSync
        this.pidFile = `${this.userDataDir}/chrome.pid`;
        log.verbose('ChromeLauncher', `created ${this.userDataDir}`);
        this.tmpDirandPidFileReady = true;
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.requestedPort !== 0) {
                this.port = this.requestedPort;
                // If an explict port is passed first look for an open connection...
                try {
                    return yield this.isDebuggerReady();
                }
                catch (err) {
                    log.log('ChromeLauncher', `No debugging port found on port ${this.port}, launching a new Chrome.`);
                }
            }
            if (!this.tmpDirandPidFileReady) {
                this.prepare();
            }
            if (this.chromePath === undefined) {
                const installations = yield chromeFinder[process.platform]();
                if (installations.length === 0) {
                    throw new Error('No Chrome Installations Found');
                }
                this.chromePath = installations[0];
            }
            this.pid = yield this.spawnProcess(this.chromePath);
            return Promise.resolve();
        });
    }
    spawnProcess(execPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Typescript is losing track of the return type without the explict typing.
            const spawnPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (this.chrome) {
                    log.log('ChromeLauncher', `Chrome already running with pid ${this.chrome.pid}.`);
                    return resolve(this.chrome.pid);
                }
                // If a zero value port is set, it means the launcher
                // is responsible for generating the port number.
                // We do this here so that we can know the port before
                // we pass it into chrome.
                if (this.requestedPort === 0) {
                    this.port = yield random_port_1.getRandomPort();
                }
                const chrome = this.spawn(execPath, this.flags, { detached: true, stdio: ['ignore', this.outFile, this.errFile] });
                this.chrome = chrome;
                this.fs.writeFileSync(this.pidFile, chrome.pid.toString());
                log.verbose('ChromeLauncher', `Chrome running with pid ${chrome.pid} on port ${this.port}.`);
                resolve(chrome.pid);
            }));
            const pid = yield spawnPromise;
            yield this.waitUntilReady();
            return pid;
        });
    }
    cleanup(client) {
        if (client) {
            client.removeAllListeners();
            client.end();
            client.destroy();
            client.unref();
        }
    }
    // resolves if ready, rejects otherwise
    isDebuggerReady() {
        return new Promise((resolve, reject) => {
            const client = net.createConnection(this.port);
            client.once('error', err => {
                this.cleanup(client);
                reject(err);
            });
            client.once('connect', () => {
                this.cleanup(client);
                resolve();
            });
        });
    }
    // resolves when debugger is ready, rejects after 10 polls
    waitUntilReady() {
        const launcher = this;
        return new Promise((resolve, reject) => {
            let retries = 0;
            let waitStatus = 'Waiting for browser.';
            const poll = () => {
                if (retries === 0) {
                    log.log('ChromeLauncher', waitStatus);
                }
                retries++;
                waitStatus += '..';
                log.log('ChromeLauncher', waitStatus);
                launcher.isDebuggerReady()
                    .then(() => {
                    log.log('ChromeLauncher', waitStatus + `${log.greenify(log.tick)}`);
                    resolve();
                })
                    .catch(err => {
                    if (retries > 10) {
                        log.error('ChromeLauncher', err.message);
                        const stderr = this.fs.readFileSync(`${this.userDataDir}/chrome-err.log`, { encoding: 'utf-8' });
                        log.error('ChromeLauncher', `Logging contents of ${this.userDataDir}/chrome-err.log`);
                        log.error('ChromeLauncher', stderr);
                        return reject(err);
                    }
                    utils_1.delay(launcher.pollInterval).then(poll);
                });
            };
            poll();
        });
    }
    kill() {
        return new Promise(resolve => {
            if (this.chrome) {
                this.chrome.on('close', () => {
                    this.destroyTmp().then(resolve);
                });
                log.log('ChromeLauncher', 'Killing all Chrome Instances');
                try {
                    if (isWindows) {
                        execSync(`taskkill /pid ${this.chrome.pid} /T /F`);
                    }
                    else {
                        process.kill(-this.chrome.pid);
                    }
                }
                catch (err) {
                    log.warn('ChromeLauncher', `Chrome could not be killed ${err.message}`);
                }
                delete this.chrome;
            }
            else {
                // fail silently as we did not start chrome
                resolve();
            }
        });
    }
    destroyTmp() {
        return new Promise(resolve => {
            // Only clean up the tmp dir if we created it.
            if (this.userDataDir === undefined || this.opts.userDataDir !== undefined) {
                return resolve();
            }
            if (this.outFile) {
                this.fs.closeSync(this.outFile);
                delete this.outFile;
            }
            if (this.errFile) {
                this.fs.closeSync(this.errFile);
                delete this.errFile;
            }
            this.rimraf(this.userDataDir, () => resolve());
        });
    }
}
exports.Launcher = Launcher;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb21lLWxhdW5jaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hyb21lLWxhdW5jaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxZQUFZLENBQUM7Ozs7Ozs7Ozs7QUFFYiw4Q0FBOEM7QUFDOUMseUJBQXlCO0FBQ3pCLGdEQUFnRDtBQUNoRCwrQ0FBNEM7QUFDNUMsbUNBQXNDO0FBQ3RDLG1DQUFvRDtBQUNwRCwyQkFBMkI7QUFDM0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDakMsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztBQUN2QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztBQUMvQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDekIsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDOUIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQTBCbkUsZ0JBQTZCLE9BQWdCLEVBQUU7O1FBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXRELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLGlEQUFpRDtRQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxFQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSyxFQUFFLElBQUksRUFBRSxxREFBWSxNQUFNLENBQU4sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBLEdBQUEsRUFBQyxDQUFDO0lBQ3ZGLENBQUM7Q0FBQTtBQWhCRCx3QkFnQkM7QUFFRDtJQW1CRSxZQUFvQixPQUFnQixFQUFFLEVBQUUsa0JBQW1DLEVBQUU7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBYztRQWxCOUIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBa0JqQyxJQUFJLENBQUMsRUFBRSxHQUFHLGVBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUU1QyxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVuRCxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBWSxLQUFLO1FBQ2YsTUFBTSxLQUFLLEdBQUcscUJBQWEsQ0FBQyxNQUFNLENBQUM7WUFDakMsMkJBQTJCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdEMsK0RBQStEO1lBQy9ELG1CQUFtQixJQUFJLENBQUMsV0FBVyxFQUFFO1NBQ3RDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0IsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsVUFBVTtRQUNSLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBOEIsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLFFBQVEsbUJBQW1CLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUzRSxnQkFBZ0I7UUFDaEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxhQUFhLENBQUM7UUFFaEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVLLE1BQU07O1lBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBRS9CLG9FQUFvRTtnQkFDcEUsSUFBSSxDQUFDO29CQUNILE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEMsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNiLEdBQUcsQ0FBQyxHQUFHLENBQ0gsZ0JBQWdCLEVBQ2hCLG1DQUFtQyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxDQUFDO2dCQUMvRSxDQUFDO1lBQ0gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sYUFBYSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUE4QixDQUFDLEVBQUUsQ0FBQztnQkFDbkYsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVhLFlBQVksQ0FBQyxRQUFnQjs7WUFDekMsNEVBQTRFO1lBQzVFLE1BQU0sWUFBWSxHQUFvQixJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU87Z0JBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLG1DQUFtQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ2pGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFHRCxxREFBcUQ7Z0JBQ3JELGlEQUFpRDtnQkFDakQsc0RBQXNEO2dCQUN0RCwwQkFBMEI7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLDJCQUFhLEVBQUUsQ0FBQztnQkFDcEMsQ0FBQztnQkFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBRXJCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUUzRCxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLDJCQUEyQixNQUFNLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFFSCxNQUFNLEdBQUcsR0FBRyxNQUFNLFlBQVksQ0FBQztZQUMvQixNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztLQUFBO0lBRU8sT0FBTyxDQUFDLE1BQW1CO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDYixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQXVDO0lBQy9CLGVBQWU7UUFDckIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFLLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMERBQTBEO0lBQ2xELGNBQWM7UUFDcEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQztZQUV4QyxNQUFNLElBQUksR0FBRztnQkFDWCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDVixVQUFVLElBQUksSUFBSSxDQUFDO2dCQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUV0QyxRQUFRLENBQUMsZUFBZSxFQUFFO3FCQUNyQixJQUFJLENBQUM7b0JBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BFLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsR0FBRztvQkFDUixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pDLE1BQU0sTUFBTSxHQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsaUJBQWlCLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQzt3QkFDcEYsR0FBRyxDQUFDLEtBQUssQ0FDTCxnQkFBZ0IsRUFBRSx1QkFBdUIsSUFBSSxDQUFDLFdBQVcsaUJBQWlCLENBQUMsQ0FBQzt3QkFDaEYsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckIsQ0FBQztvQkFDRCxhQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUM7WUFDRixJQUFJLEVBQUUsQ0FBQztRQUVULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTztZQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLDhCQUE4QixDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQztvQkFDSCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNkLFFBQVEsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO29CQUNyRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxDQUFDO2dCQUNILENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLDhCQUE4QixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLDJDQUEyQztnQkFDM0MsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLDhDQUE4QztZQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN0QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdFBELDRCQXNQQztBQUFBLENBQUMifQ==
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const path = __webpack_require__(2);
const execSync = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"child_process\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).execSync;
const execFileSync = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"child_process\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).execFileSync;
const newLineRegex = /\r?\n/;
function darwin() {
    const suffixes = ['/Contents/MacOS/Google Chrome Canary', '/Contents/MacOS/Google Chrome'];
    const LSREGISTER = '/System/Library/Frameworks/CoreServices.framework' +
        '/Versions/A/Frameworks/LaunchServices.framework' +
        '/Versions/A/Support/lsregister';
    const installations = [];
    execSync(`${LSREGISTER} -dump` +
        ' | grep -i \'google chrome\\( canary\\)\\?.app$\'' +
        ' | awk \'{$1=""; print $0}\'')
        .toString()
        .split(newLineRegex)
        .forEach((inst) => {
        suffixes.forEach(suffix => {
            const execPath = path.join(inst.trim(), suffix);
            if (canAccess(execPath)) {
                installations.push(execPath);
            }
        });
    });
    // Retains one per line to maintain readability.
    // clang-format off
    const priorities = [
        { regex: new RegExp(`^${process.env.HOME}/Applications/.*Chrome.app`), weight: 50 },
        { regex: new RegExp(`^${process.env.HOME}/Applications/.*Chrome Canary.app`), weight: 51 },
        { regex: /^\/Applications\/.*Chrome.app/, weight: 100 },
        { regex: /^\/Applications\/.*Chrome Canary.app/, weight: 101 },
        { regex: /^\/Volumes\/.*Chrome.app/, weight: -2 },
        { regex: /^\/Volumes\/.*Chrome Canary.app/, weight: -1 }
    ];
    // clang-format on
    return sort(installations, priorities);
}
exports.darwin = darwin;
/**
 * Look for linux executables in 3 ways
 * 1. Look into LIGHTHOUSE_CHROMIUM_PATH env variable
 * 2. Look into the directories where .desktop are saved on gnome based distro's
 * 3. Look for google-chrome-stable & google-chrome executables by using the which command
 */
function linux() {
    let installations = [];
    // 1. Look into LIGHTHOUSE_CHROMIUM_PATH env variable
    if (canAccess(process.env.LIGHTHOUSE_CHROMIUM_PATH)) {
        installations.push(process.env.LIGHTHOUSE_CHROMIUM_PATH);
    }
    // 2. Look into the directories where .desktop are saved on gnome based distro's
    const desktopInstallationFolders = [
        path.join(__webpack_require__(33).homedir(), '.local/share/applications/'),
        '/usr/share/applications/',
    ];
    desktopInstallationFolders.forEach(folder => {
        installations = installations.concat(findChromeExecutables(folder));
    });
    // Look for google-chrome-stable & google-chrome executables by using the which command
    const executables = [
        'google-chrome-stable',
        'google-chrome',
    ];
    executables.forEach((executable) => {
        try {
            const chromePath = execFileSync('which', [executable]).toString().split(newLineRegex)[0];
            if (canAccess(chromePath)) {
                installations.push(chromePath);
            }
        }
        catch (e) {
            // Not installed.
        }
    });
    if (!installations.length) {
        throw new Error('The environment variable LIGHTHOUSE_CHROMIUM_PATH must be set to ' +
            'executable of a build of Chromium version 54.0 or later.');
    }
    const priorities = [
        { regex: /chrome-wrapper$/, weight: 51 }, { regex: /google-chrome-stable$/, weight: 50 },
        { regex: /google-chrome$/, weight: 49 },
        { regex: new RegExp(process.env.LIGHTHOUSE_CHROMIUM_PATH), weight: 100 }
    ];
    return sort(uniq(installations.filter(Boolean)), priorities);
}
exports.linux = linux;
function win32() {
    const installations = [];
    const suffixes = [
        '\\Google\\Chrome SxS\\Application\\chrome.exe', '\\Google\\Chrome\\Application\\chrome.exe'
    ];
    const prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)']];
    if (canAccess(process.env.LIGHTHOUSE_CHROMIUM_PATH)) {
        installations.push(process.env.LIGHTHOUSE_CHROMIUM_PATH);
    }
    prefixes.forEach(prefix => suffixes.forEach(suffix => {
        const chromePath = path.join(prefix, suffix);
        if (canAccess(chromePath)) {
            installations.push(chromePath);
        }
    }));
    return installations;
}
exports.win32 = win32;
function sort(installations, priorities) {
    const defaultPriority = 10;
    return installations
        .map((inst) => {
        for (const pair of priorities) {
            if (pair.regex.test(inst)) {
                return { path: inst, weight: pair.weight };
            }
        }
        return { path: inst, weight: defaultPriority };
    })
        .sort((a, b) => (b.weight - a.weight))
        .map(pair => pair.path);
}
function canAccess(file) {
    if (!file) {
        return false;
    }
    try {
        fs.accessSync(file);
        return true;
    }
    catch (e) {
        return false;
    }
}
function uniq(arr) {
    return Array.from(new Set(arr));
}
function findChromeExecutables(folder) {
    const argumentsRegex = /(^[^ ]+).*/; // Take everything up to the first space
    const chromeExecRegex = '^Exec=\/.*\/(google|chrome|chromium)-.*';
    let installations = [];
    if (canAccess(folder)) {
        // Output of the grep & print looks like:
        //    /opt/google/chrome/google-chrome --profile-directory
        //    /home/user/Downloads/chrome-linux/chrome-wrapper %U
        let execPaths = execSync(`grep -ER "${chromeExecRegex}" ${folder} | awk -F '=' '{print $2}'`)
            .toString()
            .split(newLineRegex)
            .map((execPath) => execPath.replace(argumentsRegex, '$1'));
        execPaths.forEach((execPath) => canAccess(execPath) && installations.push(execPath));
    }
    return installations;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb21lLWZpbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNocm9tZS1maW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILFlBQVksQ0FBQzs7QUFFYixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbkQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUUzRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7QUFJN0I7SUFDRSxNQUFNLFFBQVEsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLCtCQUErQixDQUFDLENBQUM7SUFFM0YsTUFBTSxVQUFVLEdBQUcsbURBQW1EO1FBQ2xFLGlEQUFpRDtRQUNqRCxnQ0FBZ0MsQ0FBQztJQUVyQyxNQUFNLGFBQWEsR0FBa0IsRUFBRSxDQUFDO0lBRXhDLFFBQVEsQ0FDSixHQUFHLFVBQVUsUUFBUTtRQUNyQixtREFBbUQ7UUFDbkQsOEJBQThCLENBQUM7U0FDOUIsUUFBUSxFQUFFO1NBQ1YsS0FBSyxDQUFDLFlBQVksQ0FBQztTQUNuQixPQUFPLENBQUMsQ0FBQyxJQUFZO1FBQ3BCLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsZ0RBQWdEO0lBQ2hELG1CQUFtQjtJQUNuQixNQUFNLFVBQVUsR0FBZTtRQUM3QixFQUFDLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSw0QkFBNEIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUM7UUFDakYsRUFBQyxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQW1DLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDO1FBQ3hGLEVBQUMsS0FBSyxFQUFFLCtCQUErQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQztRQUM1RCxFQUFDLEtBQUssRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUM7UUFDL0MsRUFBQyxLQUFLLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFDO0tBQ3ZELENBQUM7SUFDRixrQkFBa0I7SUFFbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQXJDRCx3QkFxQ0M7QUFFRDs7Ozs7R0FLRztBQUNIO0lBQ0UsSUFBSSxhQUFhLEdBQWEsRUFBRSxDQUFDO0lBRWpDLHFEQUFxRDtJQUNyRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQWtDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ2hGLE1BQU0sMEJBQTBCLEdBQUc7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsNEJBQTRCLENBQUM7UUFDaEUsMEJBQTBCO0tBQzNCLENBQUM7SUFDRiwwQkFBMEIsQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUN2QyxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBRUgsdUZBQXVGO0lBQ3ZGLE1BQU0sV0FBVyxHQUFHO1FBQ2xCLHNCQUFzQjtRQUN0QixlQUFlO0tBQ2hCLENBQUM7SUFDRixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBa0I7UUFDckMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxVQUFVLEdBQ1osWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBVyxDQUFDO1lBRXBGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsaUJBQWlCO1FBQ25CLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FDWCxtRUFBbUU7WUFDbkUsMERBQTBELENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQWU7UUFDN0IsRUFBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUM7UUFDcEYsRUFBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQztRQUNyQyxFQUFDLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQztLQUN2RSxDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFoREQsc0JBZ0RDO0FBRUQ7SUFDRSxNQUFNLGFBQWEsR0FBa0IsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sUUFBUSxHQUFHO1FBQ2YsK0NBQStDLEVBQUUsMkNBQTJDO0tBQzdGLENBQUM7SUFDRixNQUFNLFFBQVEsR0FDVixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBRTNGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU07UUFDaEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUN2QixDQUFDO0FBbkJELHNCQW1CQztBQUVELGNBQWMsYUFBdUIsRUFBRSxVQUFzQjtJQUMzRCxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDM0IsTUFBTSxDQUFDLGFBQWE7U0FFZixHQUFHLENBQUMsQ0FBQyxJQUFZO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUM7U0FFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7U0FFckMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELG1CQUFtQixJQUFZO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0gsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNILENBQUM7QUFFRCxjQUFjLEdBQWU7SUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQsK0JBQStCLE1BQWM7SUFDM0MsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUMsd0NBQXdDO0lBQzdFLE1BQU0sZUFBZSxHQUFHLHlDQUF5QyxDQUFDO0lBRWxFLElBQUksYUFBYSxHQUFrQixFQUFFLENBQUM7SUFDdEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0Qix5Q0FBeUM7UUFDekMsMERBQTBEO1FBQzFELHlEQUF5RDtRQUN6RCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxlQUFlLEtBQUssTUFBTSw0QkFBNEIsQ0FBQzthQUN4RSxRQUFRLEVBQUU7YUFDVixLQUFLLENBQUMsWUFBWSxDQUFDO2FBQ25CLEdBQUcsQ0FBQyxDQUFDLFFBQWdCLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV2RixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBZ0IsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDO0FBQ3ZCLENBQUMifQ==
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __webpack_require__(35);
/**
 * Return a random, unused port.
 */
function getRandomPort() {
    return new Promise((resolve, reject) => {
        const server = http_1.createServer();
        server.listen(0);
        server.once('listening', () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.once('error', reject);
    });
}
exports.getRandomPort = getRandomPort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYW5kb20tcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsWUFBWSxDQUFDOztBQUViLCtCQUFrQztBQUVsQzs7R0FFRztBQUNIO0lBQ0UsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsTUFBTSxNQUFNLEdBQUcsbUJBQVksRUFBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFWRCxzQ0FVQyJ9

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(36)
var extend = __webpack_require__(46)
var statusCodes = __webpack_require__(47)
var url = __webpack_require__(48)

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(16)
var inherits = __webpack_require__(3)
var response = __webpack_require__(39)
var stream = __webpack_require__(17)
var toArrayBuffer = __webpack_require__(45)

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || 'timeout' in opts) {
		// If the use of XHR should be preferred and includes preserving the 'content-type' header.
		// Force XHR to be used since the Fetch API does not yet support timeouts.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin'
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('timeout' in opts) {
			xhr.timeout = opts.timeout
			xhr.ontimeout = function () {
				self.emit('timeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	// Currently, there isn't a way to truly abort a fetch.
	// If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'user-agent',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(16)
var inherits = __webpack_require__(3)
var stream = __webpack_require__(17)

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function(header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})


		// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function(err) {
				self.emit('error', err)
			})
		}
		read()

	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(4).Buffer, __webpack_require__(1)))

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(9).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(23);

/*<replacement>*/
var util = __webpack_require__(6);
util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(4).Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(49);
var util = __webpack_require__(51);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(52);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module), __webpack_require__(1)))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(53);
exports.encode = exports.stringify = __webpack_require__(54);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FLAGS = [
    // Disable built-in Google Translate service
    '--disable-translate',
    // Disable all chrome extensions entirely
    '--disable-extensions',
    // Disable various background network services, including extension updating,
    //   safe browsing service, upgrade detector, translate, UMA
    '--disable-background-networking',
    // Disable fetching safebrowsing lists, likely redundant due to disable-background-networking
    '--safebrowsing-disable-auto-update',
    // Disable syncing to a Google account
    '--disable-sync',
    // Disable reporting to UMA, but allows for collection
    '--metrics-recording-only',
    // Disable installation of default apps on first run
    '--disable-default-apps',
    // Skip first run wizards
    '--no-first-run',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsWUFBWSxDQUFDOztBQUVBLFFBQUEsYUFBYSxHQUFHO0lBQzNCLDRDQUE0QztJQUM1QyxxQkFBcUI7SUFDckIseUNBQXlDO0lBQ3pDLHNCQUFzQjtJQUN0Qiw2RUFBNkU7SUFDN0UsNERBQTREO0lBQzVELGlDQUFpQztJQUNqQyw2RkFBNkY7SUFDN0Ysb0NBQW9DO0lBQ3BDLHNDQUFzQztJQUN0QyxnQkFBZ0I7SUFDaEIsc0RBQXNEO0lBQ3RELDBCQUEwQjtJQUMxQixvREFBb0Q7SUFDcEQsd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6QixnQkFBZ0I7Q0FDakIsQ0FBQyJ9

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(2);
const child_process_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"child_process\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const mkdirp = __webpack_require__(57);
function defaults(val, def) {
    return typeof val === 'undefined' ? def : val;
}
exports.defaults = defaults;
function delay(time) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, time));
    });
}
exports.delay = delay;
function makeTmpDir() {
    switch (process.platform) {
        case 'darwin':
        case 'linux':
            return makeUnixTmpDir();
        case 'win32':
            return makeWin32TmpDir();
        default:
            throw new Error(`Platform ${process.platform} is not supported`);
    }
}
exports.makeTmpDir = makeTmpDir;
function makeUnixTmpDir() {
    return child_process_1.execSync('mktemp -d -t lighthouse.XXXXXXX').toString().trim();
}
function makeWin32TmpDir() {
    const winTmpPath = process.env.TEMP || process.env.TMP ||
        (process.env.SystemRoot || process.env.windir) + '\\temp';
    const randomNumber = Math.floor(Math.random() * 9e7 + 1e7);
    const tmpdir = path_1.join(winTmpPath, 'lighthouse.' + randomNumber);
    mkdirp.sync(tmpdir);
    return tmpdir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsK0JBQTBCO0FBQzFCLGlEQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMsa0JBQTRCLEdBQWtCLEVBQUUsR0FBTTtJQUNwRCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDaEQsQ0FBQztBQUZELDRCQUVDO0FBRUQsZUFBNEIsSUFBWTs7UUFDdEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUFBO0FBRkQsc0JBRUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxPQUFPO1lBQ1YsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLEtBQUssT0FBTztZQUNWLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxPQUFPLENBQUMsUUFBUSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDSCxDQUFDO0FBVkQsZ0NBVUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyx3QkFBUSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkUsQ0FBQztBQUVEO0lBQ0UsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHO1FBQ2xELENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDOUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzNELE1BQU0sTUFBTSxHQUFHLFdBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxHQUFHLFlBQVksQ0FBQyxDQUFDO0lBRTlELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDIn0=
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var path = __webpack_require__(2);
var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var _0777 = parseInt('0777', 8);

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

function mkdirP (p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    }
    else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;
    
    var cb = f || function () {};
    p = path.resolve(p);
    
    xfs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), opts, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, opts, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                xfs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, opts, made) {
    if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;

    p = path.resolve(p);

    try {
        xfs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), opts, made);
                sync(p, opts, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = xfs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = rimraf
rimraf.sync = rimrafSync

var assert = __webpack_require__(11)
var path = __webpack_require__(2)
var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
var glob = __webpack_require__(24)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
var timeout = 0

var isWindows = (process.platform === "win32")

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function(m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, function (er, stat) {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  function afterGlob (er, results) {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            var time = busyTries * 100
            // try again, with the same exact callback as this one.
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, time)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      })
    })
  }
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, 666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, options, er) {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, 666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  try {
    var stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  var results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (var i = 0; i < results.length; i++) {
    var p = results[i]

    try {
      var st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options)
  })

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  var retries = isWindows ? 100 : 1
  var i = 0
  do {
    var threw = true
    try {
      var ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 60 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(2);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(63);
var balanced = __webpack_require__(64);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),
/* 65 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
var rp = __webpack_require__(25)
var minimatch = __webpack_require__(13)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(24).Glob
var util = __webpack_require__(12)
var path = __webpack_require__(2)
var assert = __webpack_require__(11)
var isAbsolute = __webpack_require__(14)
var common = __webpack_require__(26)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var wrappy = __webpack_require__(27)
var reqs = Object.create(null)
var once = __webpack_require__(28)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */


const debug = __webpack_require__(69);
const EventEmitter = __webpack_require__(8).EventEmitter;
const isWindows = process.platform === 'win32';

// process.browser is set when browserify'd via the `process` npm module
const isBrowser = process.browser;

const colors = {
  red: isBrowser ? 'crimson' : 1,
  yellow: isBrowser ? 'gold' : 3,
  cyan: isBrowser ? 'darkturquoise' : 6,
  green: isBrowser ? 'forestgreen' : 2,
  blue: isBrowser ? 'steelblue' : 4,
  magenta: isBrowser ? 'palevioletred' : 5
};

// whitelist non-red/yellow colors for debug()
debug.colors = [colors.cyan, colors.green, colors.blue, colors.magenta];

class Emitter extends EventEmitter {
  /**
   * Fires off all status updates. Listen with
   * `require('lib/log').events.addListener('status', callback)`
   * @param {string} title
   * @param {!Array<*>} argsArray
   */
  issueStatus(title, argsArray) {
    if (title === 'status' || title === 'statusEnd') {
      this.emit(title, [title, ...argsArray]);
    }
  }

  /**
   * Fires off all warnings. Listen with
   * `require('lib/log').events.addListener('warning', callback)`
   * @param {string} title
   * @param {!Array<*>} argsArray
   */
  issueWarning(title, argsArray) {
    this.emit('warning', [title, ...argsArray]);
  }
}

const loggersByTitle = {};
const loggingBufferColumns = 25;

class Log {

  static _logToStdErr(title, argsArray) {
    const log = Log.loggerfn(title);
    log(...argsArray);
  }

  static loggerfn(title) {
    let log = loggersByTitle[title];
    if (!log) {
      log = debug(title);
      loggersByTitle[title] = log;
      // errors with red, warnings with yellow.
      if (title.endsWith('error')) {
        log.color = colors.red;
      } else if (title.endsWith('warn')) {
        log.color = colors.yellow;
      }
    }
    return log;
  }

  static setLevel(level) {
    switch (level) {
      case 'silent':
        debug.enable('-*');
        break;
      case 'verbose':
        debug.enable('*');
        break;
      case 'error':
        debug.enable('-*, *:error');
        break;
      default:
        debug.enable('*, -*:verbose');
    }
  }

  /**
   * A simple formatting utility for event logging.
   * @param {string} prefix
   * @param {!Object} data A JSON-serializable object of event data to log.
   * @param {string=} level Optional logging level. Defaults to 'log'.
   */
  static formatProtocol(prefix, data, level) {
    const columns = (!process || process.browser) ? Infinity : process.stdout.columns;
    const method = data.method || '?????';
    const maxLength = columns - method.length - prefix.length - loggingBufferColumns;
    // IO.read blacklisted here to avoid logging megabytes of trace data
    const snippet = (data.params && method !== 'IO.read') ?
      JSON.stringify(data.params).substr(0, maxLength) : '';
    Log._logToStdErr(`${prefix}:${level || ''}`, [method, snippet]);
  }

  static log(title, ...args) {
    Log.events.issueStatus(title, args);
    return Log._logToStdErr(title, args);
  }

  static warn(title, ...args) {
    Log.events.issueWarning(title, args);
    return Log._logToStdErr(`${title}:warn`, args);
  }

  static error(title, ...args) {
    return Log._logToStdErr(`${title}:error`, args);
  }

  static verbose(title, ...args) {
    Log.events.issueStatus(title, args);
    return Log._logToStdErr(`${title}:verbose`, args);
  }

  /**
   * Add surrounding escape sequences to turn a string green when logged.
   * @param {string} str
   * @return {string}
   */
  static greenify(str) {
    return `${Log.green}${str}${Log.reset}`;
  }

  /**
   * Add surrounding escape sequences to turn a string red when logged.
   * @param {string} str
   * @return {string}
   */
  static redify(str) {
    return `${Log.red}${str}${Log.reset}`;
  }

  static get green() {
    return '\x1B[32m';
  }

  static get red() {
    return '\x1B[31m';
  }

  static get yellow() {
    return '\x1b[33m';
  }

  static get purple() {
    return '\x1b[95m';
  }

  static get reset() {
    return '\x1B[0m';
  }

  static get bold() {
    return '\x1b[1m';
  }

  static get dim() {
    return '\x1b[2m';
  }

  static get tick() {
    return isWindows ? '\u221A' : '✓';
  }

  static get cross() {
    return isWindows ? '\u00D7' : '✘';
  }

  static get whiteSmallSquare() {
    return isWindows ? '\u0387' : '▫';
  }

  static get heavyHorizontal() {
    return isWindows ? '\u2500' : '━';
  }

  static get heavyVertical() {
    return isWindows ? '\u2502 ' : '┃ ';
  }

  static get heavyUpAndRight() {
    return isWindows ? '\u2514' : '┗';
  }

  static get heavyVerticalAndRight() {
    return isWindows ? '\u251C' : '┣';
  }

  static get heavyDownAndHorizontal() {
    return isWindows ? '\u252C' : '┳';
  }

  static get doubleLightHorizontal() {
    return '──';
  }
}

Log.events = new Emitter();

module.exports = Log;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(70);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(71);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 71 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {module.exports=function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){(function(t){"use strict";var i=n(2),r=n(3),o=n(43);e.exports=function(e,n){"function"==typeof e&&(n=e,e=void 0);var r=new i;return"function"==typeof n?(t.nextTick(function(){new o(e,r)}),r.once("connect",n)):new Promise(function(t,n){r.once("connect",t),r.once("error",n),new o(e,r)})},e.exports.listTabs=r.List,e.exports.spawnTab=r.New,e.exports.closeTab=r.Close,e.exports.Protocol=r.Protocol,e.exports.List=r.List,e.exports.New=r.New,e.exports.Activate=r.Activate,e.exports.Close=r.Close,e.exports.Version=r.Version}).call(t,n(1))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function r(e){if(d===setTimeout)return setTimeout(e,0);if((d===n||!d)&&setTimeout)return d=setTimeout,setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}function o(e){if(l===clearTimeout)return clearTimeout(e);if((l===i||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{return l(e)}catch(t){try{return l.call(null,e)}catch(t){return l.call(this,e)}}}function a(){f&&u&&(f=!1,u.length?h=u.concat(h):y=-1,h.length&&s())}function s(){if(!f){var e=r(a);f=!0;for(var t=h.length;t;){for(u=h,h=[];++y<t;)u&&u[y].run();y=-1,t=h.length}u=null,f=!1,o(e)}}function p(e,t){this.fun=e,this.array=t}function c(){}var d,l,m=e.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:n}catch(e){d=n}try{l="function"==typeof clearTimeout?clearTimeout:i}catch(e){l=i}}();var u,h=[],f=!1,y=-1;m.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new p(e,t)),1!==h.length||f||r(s)},p.prototype.run=function(){this.fun.apply(null,this.array)},m.title="browser",m.browser=!0,m.env={},m.argv=[],m.version="",m.versions={},m.on=c,m.addListener=c,m.once=c,m.off=c,m.removeListener=c,m.removeAllListeners=c,m.emit=c,m.prependListener=c,m.prependOnceListener=c,m.listeners=function(e){return[]},m.binding=function(e){throw new Error("process.binding is not supported")},m.cwd=function(){return"/"},m.chdir=function(e){throw new Error("process.chdir is not supported")},m.umask=function(){return 0}},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function r(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!r(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,r,s,p,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var d=new Error('Uncaught, unspecified "error" event. ('+t+")");throw d.context=t,d}if(n=this._events[e],a(n))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),n.apply(this,s)}else if(o(n))for(s=Array.prototype.slice.call(arguments,1),c=n.slice(),r=c.length,p=0;p<r;p++)c[p].apply(this,s);return!0},n.prototype.addListener=function(e,t){var r;if(!i(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(r=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,r,a,s;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],a=n.length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(s=a;s-- >0;)if(n[s]===t||n[s].listener&&n[s].listener===t){r=s;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],i(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t,n){(function(t){"use strict";function i(e,t){e.host=e.host||d.HOST,e.port=e.port||d.PORT,e.secure=!!e.secure,l(e.secure?c:p,e,t)}function r(e){return function(t,n){return"function"==typeof t&&(n=t,t=void 0),t=t||{},"function"!=typeof n?new Promise(function(n,i){e(t,function(e,t){e?i(e):n(t)})}):void e(t,n)}}function o(e){return e.split(".").map(function(e){return parseInt(e)})}function a(e,n,i){var r=n["WebKit-Version"],a=n["V8-Version"],s=r.match(/\s\(@(\b[0-9a-f]{5,40}\b)/),p=s[1],d=p<=202666,m=void 0;if(d)m=["https://src.chromium.org/blink/trunk/Source/devtools/protocol.json?p="+p];else{var u="53.0.2758.1",h="55.0.2854.3",f=o(n.Browser.split("/")[1]),y=f[2]<=o(u)[2],g=f[2]<=o(h)[2];y?m=["https://chromium.googlesource.com/chromium/src/+/"+p+"/third_party/WebKit/Source/devtools/protocol.json?format=TEXT"]:g?m=["https://chromium.googlesource.com/chromium/src/+/"+p+"/third_party/WebKit/Source/core/inspector/browser_protocol.json?format=TEXT","https://chromium.googlesource.com/chromium/src/+/"+p+"/third_party/WebKit/Source/platform/v8_inspector/js_protocol.json?format=TEXT"]:a?m=["https://chromium.googlesource.com/chromium/src/+/"+p+"/third_party/WebKit/Source/core/inspector/browser_protocol.json?format=TEXT","https://chromium.googlesource.com/v8/v8/+/"+a+"/src/inspector/js_protocol.json?format=TEXT"]:(console.error("Warning: the protocol might be outdated, see: https://groups.google.com/d/topic/chrome-debugging-protocol/HjyOKainKus/discussion"),m=["https://chromium.googlesource.com/chromium/src/+/"+p+"/third_party/WebKit/Source/core/inspector/browser_protocol.json?format=TEXT","https://chromium.googlesource.com/chromium/src/+/"+h+"/third_party/WebKit/Source/platform/v8_inspector/js_protocol.json?format=TEXT"])}var b=[];m.forEach(function(e){l(c,e,function(e,n){var r=void 0;if(!e)try{d||(n=new t(n,"base64").toString()),r=JSON.parse(n)}catch(e){}if(b.push(r),b.length===m.length){if(b.indexOf(void 0)!==-1)return void i(new Error("Cannot fetch from Chromium repo"));b.forEach(function(e,t){0!==t&&Array.prototype.push.apply(b[0].domains,e.domains)}),i(null,b[0])}})})}function s(e,t,n){e.path="/json/protocol",i(e,function(e,t){e?n(e):n(null,JSON.parse(t))})}var p=n(8),c=n(39),d=n(40),l=n(41);e.exports.Protocol=r(function(t,i){if(!t.remote){var r=n(42);return void i(null,{remote:!1,descriptor:r})}e.exports.Version(t,function(e,n){if(e)return void i(e);var r=(n[0]||n).Browser,p=void 0;if(r.match(/^(Headless)?Chrome\//)){var c="60.0.3097.0",d=o(c)[2],l=o(n.Browser.split("/")[1])[2];p=l<d?a:s}else if(r.match(/^Microsoft Edge /))p=s;else{if(!r.match(/^node.js\//))return void i(new Error("Unknown implementation"));p=s}p(t,n,function(e,t){return e?void i(e):void i(null,{remote:!0,descriptor:t})})})}),e.exports.List=r(function(e,t){e.path="/json/list",i(e,function(e,n){e?t(e):t(null,JSON.parse(n))})}),e.exports.New=r(function(e,t){e.path="/json/new",Object.prototype.hasOwnProperty.call(e,"url")&&(e.path+="?"+e.url),i(e,function(e,n){e?t(e):t(null,JSON.parse(n))})}),e.exports.Activate=r(function(e,t){e.path="/json/activate/"+e.id,i(e,function(e){t(e?e:null)})}),e.exports.Close=r(function(e,t){e.path="/json/close/"+e.id,i(e,function(e){t(e?e:null)})}),e.exports.Version=r(function(e,t){e.path="/json/version",i(e,function(e,n){e?t(e):t(null,JSON.parse(n))})})}).call(t,n(4).Buffer)},function(e,t,n){(function(e){"use strict";function i(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}function r(){return a.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function o(e,t){if(r()<t)throw new RangeError("Invalid typed array length");return a.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t),e.__proto__=a.prototype):(null===e&&(e=new a(t)),e.length=t),e}function a(e,t,n){if(!(a.TYPED_ARRAY_SUPPORT||this instanceof a))return new a(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return d(this,e)}return s(this,e,t,n)}function s(e,t,n,i){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?u(e,t,n,i):"string"==typeof t?l(e,t,n):h(e,t)}function p(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function c(e,t,n,i){return p(t),t<=0?o(e,t):void 0!==n?"string"==typeof i?o(e,t).fill(n,i):o(e,t).fill(n):o(e,t)}function d(e,t){if(p(t),e=o(e,t<0?0:0|f(t)),!a.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function l(e,t,n){if("string"==typeof n&&""!==n||(n="utf8"),!a.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var i=0|g(t,n);e=o(e,i);var r=e.write(t,n);return r!==i&&(e=e.slice(0,r)),e}function m(e,t){var n=t.length<0?0:0|f(t.length);e=o(e,n);for(var i=0;i<n;i+=1)e[i]=255&t[i];return e}function u(e,t,n,i){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(i||0))throw new RangeError("'length' is out of bounds");return t=void 0===n&&void 0===i?new Uint8Array(t):void 0===i?new Uint8Array(t,n):new Uint8Array(t,n,i),a.TYPED_ARRAY_SUPPORT?(e=t,e.__proto__=a.prototype):e=m(e,t),e}function h(e,t){if(a.isBuffer(t)){var n=0|f(t.length);return e=o(e,n),0===e.length?e:(t.copy(e,0,0,n),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||J(t.length)?o(e,0):m(e,t);if("Buffer"===t.type&&Z(t.data))return m(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function f(e){if(e>=r())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+r().toString(16)+" bytes");return 0|e}function y(e){return+e!=e&&(e=0),a.alloc(+e)}function g(e,t){if(a.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return z(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return G(e).length;default:if(i)return z(e).length;t=(""+t).toLowerCase(),i=!0}}function b(e,t,n){var i=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,t>>>=0,n<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return N(this,t,n);case"utf8":case"utf-8":return O(this,t,n);case"ascii":return D(this,t,n);case"latin1":case"binary":return j(this,t,n);case"base64":return $(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,n);default:if(i)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),i=!0}}function v(e,t,n){var i=e[t];e[t]=e[n],e[n]=i}function w(e,t,n,i,r){if(0===e.length)return-1;if("string"==typeof n?(i=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=r?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(r)return-1;n=e.length-1}else if(n<0){if(!r)return-1;n=0}if("string"==typeof t&&(t=a.from(t,i)),a.isBuffer(t))return 0===t.length?-1:S(e,t,n,i,r);if("number"==typeof t)return t&=255,a.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?r?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):S(e,[t],n,i,r);throw new TypeError("val must be string, number or Buffer")}function S(e,t,n,i,r){function o(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}var a=1,s=e.length,p=t.length;if(void 0!==i&&(i=String(i).toLowerCase(),"ucs2"===i||"ucs-2"===i||"utf16le"===i||"utf-16le"===i)){if(e.length<2||t.length<2)return-1;a=2,s/=2,p/=2,n/=2}var c;if(r){var d=-1;for(c=n;c<s;c++)if(o(e,c)===o(t,d===-1?0:c-d)){if(d===-1&&(d=c),c-d+1===p)return d*a}else d!==-1&&(c-=c-d),d=-1}else for(n+p>s&&(n=s-p),c=n;c>=0;c--){for(var l=!0,m=0;m<p;m++)if(o(e,c+m)!==o(t,m)){l=!1;break}if(l)return c}return-1}function x(e,t,n,i){n=Number(n)||0;var r=e.length-n;i?(i=Number(i),i>r&&(i=r)):i=r;var o=t.length;if(o%2!==0)throw new TypeError("Invalid hex string");i>o/2&&(i=o/2);for(var a=0;a<i;++a){var s=parseInt(t.substr(2*a,2),16);if(isNaN(s))return a;e[n+a]=s}return a}function I(e,t,n,i){return Y(z(t,e.length-n),e,n,i)}function T(e,t,n,i){return Y(V(t),e,n,i)}function R(e,t,n,i){return T(e,t,n,i)}function k(e,t,n,i){return Y(G(t),e,n,i)}function C(e,t,n,i){return Y(X(t,e.length-n),e,n,i)}function $(e,t,n){return 0===t&&n===e.length?K.fromByteArray(e):K.fromByteArray(e.slice(t,n))}function O(e,t,n){n=Math.min(e.length,n);for(var i=[],r=t;r<n;){var o=e[r],a=null,s=o>239?4:o>223?3:o>191?2:1;if(r+s<=n){var p,c,d,l;switch(s){case 1:o<128&&(a=o);break;case 2:p=e[r+1],128===(192&p)&&(l=(31&o)<<6|63&p,l>127&&(a=l));break;case 3:p=e[r+1],c=e[r+2],128===(192&p)&&128===(192&c)&&(l=(15&o)<<12|(63&p)<<6|63&c,l>2047&&(l<55296||l>57343)&&(a=l));break;case 4:p=e[r+1],c=e[r+2],d=e[r+3],128===(192&p)&&128===(192&c)&&128===(192&d)&&(l=(15&o)<<18|(63&p)<<12|(63&c)<<6|63&d,l>65535&&l<1114112&&(a=l))}}null===a?(a=65533,s=1):a>65535&&(a-=65536,i.push(a>>>10&1023|55296),a=56320|1023&a),i.push(a),r+=s}return E(i)}function E(e){var t=e.length;if(t<=ee)return String.fromCharCode.apply(String,e);for(var n="",i=0;i<t;)n+=String.fromCharCode.apply(String,e.slice(i,i+=ee));return n}function D(e,t,n){var i="";n=Math.min(e.length,n);for(var r=t;r<n;++r)i+=String.fromCharCode(127&e[r]);return i}function j(e,t,n){var i="";n=Math.min(e.length,n);for(var r=t;r<n;++r)i+=String.fromCharCode(e[r]);return i}function N(e,t,n){var i=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>i)&&(n=i);for(var r="",o=t;o<n;++o)r+=H(e[o]);return r}function A(e,t,n){for(var i=e.slice(t,n),r="",o=0;o<i.length;o+=2)r+=String.fromCharCode(i[o]+256*i[o+1]);return r}function P(e,t,n){if(e%1!==0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function M(e,t,n,i,r,o){if(!a.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>r||t<o)throw new RangeError('"value" argument is out of bounds');if(n+i>e.length)throw new RangeError("Index out of range")}function L(e,t,n,i){t<0&&(t=65535+t+1);for(var r=0,o=Math.min(e.length-n,2);r<o;++r)e[n+r]=(t&255<<8*(i?r:1-r))>>>8*(i?r:1-r)}function _(e,t,n,i){t<0&&(t=4294967295+t+1);for(var r=0,o=Math.min(e.length-n,4);r<o;++r)e[n+r]=t>>>8*(i?r:3-r)&255}function q(e,t,n,i,r,o){if(n+i>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function U(e,t,n,i,r){return r||q(e,t,n,4,3.4028234663852886e38,-3.4028234663852886e38),Q.write(e,t,n,i,23,4),n+4}function F(e,t,n,i,r){return r||q(e,t,n,8,1.7976931348623157e308,-1.7976931348623157e308),Q.write(e,t,n,i,52,8),n+8}function B(e){if(e=W(e).replace(te,""),e.length<2)return"";for(;e.length%4!==0;)e+="=";return e}function W(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function z(e,t){t=t||1/0;for(var n,i=e.length,r=null,o=[],a=0;a<i;++a){if(n=e.charCodeAt(a),n>55295&&n<57344){if(!r){if(n>56319){(t-=3)>-1&&o.push(239,191,189);continue}if(a+1===i){(t-=3)>-1&&o.push(239,191,189);continue}r=n;continue}if(n<56320){(t-=3)>-1&&o.push(239,191,189),r=n;continue}n=(r-55296<<10|n-56320)+65536}else r&&(t-=3)>-1&&o.push(239,191,189);if(r=null,n<128){if((t-=1)<0)break;o.push(n)}else if(n<2048){if((t-=2)<0)break;o.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function V(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}function X(e,t){for(var n,i,r,o=[],a=0;a<e.length&&!((t-=2)<0);++a)n=e.charCodeAt(a),i=n>>8,r=n%256,o.push(r),o.push(i);return o}function G(e){return K.toByteArray(B(e))}function Y(e,t,n,i){for(var r=0;r<i&&!(r+n>=t.length||r>=e.length);++r)t[r+n]=e[r];return r}function J(e){return e!==e}var K=n(5),Q=n(6),Z=n(7);t.Buffer=a,t.SlowBuffer=y,t.INSPECT_MAX_BYTES=50,a.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:i(),t.kMaxLength=r(),a.poolSize=8192,a._augment=function(e){return e.__proto__=a.prototype,e},a.from=function(e,t,n){return s(null,e,t,n)},a.TYPED_ARRAY_SUPPORT&&(a.prototype.__proto__=Uint8Array.prototype,a.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&a[Symbol.species]===a&&Object.defineProperty(a,Symbol.species,{value:null,configurable:!0})),a.alloc=function(e,t,n){return c(null,e,t,n)},a.allocUnsafe=function(e){return d(null,e)},a.allocUnsafeSlow=function(e){return d(null,e)},a.isBuffer=function(e){return!(null==e||!e._isBuffer)},a.compare=function(e,t){if(!a.isBuffer(e)||!a.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,i=t.length,r=0,o=Math.min(n,i);r<o;++r)if(e[r]!==t[r]){n=e[r],i=t[r];break}return n<i?-1:i<n?1:0},a.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(e,t){if(!Z(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return a.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var i=a.allocUnsafe(t),r=0;for(n=0;n<e.length;++n){var o=e[n];if(!a.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(i,r),r+=o.length}return i},a.byteLength=g,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)v(this,t,t+1);return this},a.prototype.swap32=function(){var e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)v(this,t,t+3),v(this,t+1,t+2);return this},a.prototype.swap64=function(){var e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)v(this,t,t+7),v(this,t+1,t+6),v(this,t+2,t+5),v(this,t+3,t+4);return this},a.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?O(this,0,e):b.apply(this,arguments)},a.prototype.equals=function(e){if(!a.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===a.compare(this,e)},a.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},a.prototype.compare=function(e,t,n,i,r){if(!a.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===i&&(i=0),void 0===r&&(r=this.length),t<0||n>e.length||i<0||r>this.length)throw new RangeError("out of range index");if(i>=r&&t>=n)return 0;if(i>=r)return-1;if(t>=n)return 1;if(t>>>=0,n>>>=0,i>>>=0,r>>>=0,this===e)return 0;for(var o=r-i,s=n-t,p=Math.min(o,s),c=this.slice(i,r),d=e.slice(t,n),l=0;l<p;++l)if(c[l]!==d[l]){o=c[l],s=d[l];break}return o<s?-1:s<o?1:0},a.prototype.includes=function(e,t,n){return this.indexOf(e,t,n)!==-1},a.prototype.indexOf=function(e,t,n){return w(this,e,t,n,!0)},a.prototype.lastIndexOf=function(e,t,n){return w(this,e,t,n,!1)},a.prototype.write=function(e,t,n,i){if(void 0===t)i="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)i=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===i&&(i="utf8")):(i=n,n=void 0)}var r=this.length-t;if((void 0===n||n>r)&&(n=r),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");for(var o=!1;;)switch(i){case"hex":return x(this,e,t,n);case"utf8":case"utf-8":return I(this,e,t,n);case"ascii":return T(this,e,t,n);case"latin1":case"binary":return R(this,e,t,n);case"base64":return k(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return C(this,e,t,n);default:if(o)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),o=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var ee=4096;a.prototype.slice=function(e,t){var n=this.length;e=~~e,t=void 0===t?n:~~t,e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),t<e&&(t=e);var i;if(a.TYPED_ARRAY_SUPPORT)i=this.subarray(e,t),i.__proto__=a.prototype;else{var r=t-e;i=new a(r,void 0);for(var o=0;o<r;++o)i[o]=this[o+e]}return i},a.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||P(e,t,this.length);for(var i=this[e],r=1,o=0;++o<t&&(r*=256);)i+=this[e+o]*r;return i},a.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||P(e,t,this.length);for(var i=this[e+--t],r=1;t>0&&(r*=256);)i+=this[e+--t]*r;return i},a.prototype.readUInt8=function(e,t){return t||P(e,1,this.length),this[e]},a.prototype.readUInt16LE=function(e,t){return t||P(e,2,this.length),this[e]|this[e+1]<<8},a.prototype.readUInt16BE=function(e,t){return t||P(e,2,this.length),this[e]<<8|this[e+1]},a.prototype.readUInt32LE=function(e,t){return t||P(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},a.prototype.readUInt32BE=function(e,t){return t||P(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},a.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||P(e,t,this.length);for(var i=this[e],r=1,o=0;++o<t&&(r*=256);)i+=this[e+o]*r;return r*=128,i>=r&&(i-=Math.pow(2,8*t)),i},a.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||P(e,t,this.length);for(var i=t,r=1,o=this[e+--i];i>0&&(r*=256);)o+=this[e+--i]*r;return r*=128,o>=r&&(o-=Math.pow(2,8*t)),o},a.prototype.readInt8=function(e,t){return t||P(e,1,this.length),128&this[e]?(255-this[e]+1)*-1:this[e]},a.prototype.readInt16LE=function(e,t){t||P(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},a.prototype.readInt16BE=function(e,t){t||P(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},a.prototype.readInt32LE=function(e,t){return t||P(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},a.prototype.readInt32BE=function(e,t){return t||P(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},a.prototype.readFloatLE=function(e,t){return t||P(e,4,this.length),Q.read(this,e,!0,23,4)},a.prototype.readFloatBE=function(e,t){return t||P(e,4,this.length),Q.read(this,e,!1,23,4)},a.prototype.readDoubleLE=function(e,t){return t||P(e,8,this.length),Q.read(this,e,!0,52,8)},a.prototype.readDoubleBE=function(e,t){return t||P(e,8,this.length),Q.read(this,e,!1,52,8)},a.prototype.writeUIntLE=function(e,t,n,i){if(e=+e,t|=0,n|=0,!i){var r=Math.pow(2,8*n)-1;M(this,e,t,n,r,0)}var o=1,a=0;for(this[t]=255&e;++a<n&&(o*=256);)this[t+a]=e/o&255;return t+n},a.prototype.writeUIntBE=function(e,t,n,i){if(e=+e,t|=0,n|=0,!i){var r=Math.pow(2,8*n)-1;M(this,e,t,n,r,0)}var o=n-1,a=1;for(this[t+o]=255&e;--o>=0&&(a*=256);)this[t+o]=e/a&255;return t+n},a.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,1,255,0),a.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},a.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):L(this,e,t,!0),t+2},a.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):L(this,e,t,!1),t+2},a.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):_(this,e,t,!0),t+4},a.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):_(this,e,t,!1),t+4},a.prototype.writeIntLE=function(e,t,n,i){if(e=+e,t|=0,!i){var r=Math.pow(2,8*n-1);M(this,e,t,n,r-1,-r)}var o=0,a=1,s=0;for(this[t]=255&e;++o<n&&(a*=256);)e<0&&0===s&&0!==this[t+o-1]&&(s=1),this[t+o]=(e/a>>0)-s&255;return t+n},a.prototype.writeIntBE=function(e,t,n,i){if(e=+e,t|=0,!i){var r=Math.pow(2,8*n-1);M(this,e,t,n,r-1,-r)}var o=n-1,a=1,s=0;for(this[t+o]=255&e;--o>=0&&(a*=256);)e<0&&0===s&&0!==this[t+o+1]&&(s=1),this[t+o]=(e/a>>0)-s&255;return t+n},a.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,1,127,-128),a.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},a.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):L(this,e,t,!0),t+2},a.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):L(this,e,t,!1),t+2},a.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,4,2147483647,-2147483648),a.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):_(this,e,t,!0),t+4},a.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||M(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),a.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):_(this,e,t,!1),t+4},a.prototype.writeFloatLE=function(e,t,n){return U(this,e,t,!0,n)},a.prototype.writeFloatBE=function(e,t,n){return U(this,e,t,!1,n)},a.prototype.writeDoubleLE=function(e,t,n){return F(this,e,t,!0,n)},a.prototype.writeDoubleBE=function(e,t,n){return F(this,e,t,!1,n)},a.prototype.copy=function(e,t,n,i){if(n||(n=0),i||0===i||(i=this.length),t>=e.length&&(t=e.length),t||(t=0),i>0&&i<n&&(i=n),i===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-t<i-n&&(i=e.length-t+n);var r,o=i-n;if(this===e&&n<t&&t<i)for(r=o-1;r>=0;--r)e[r+t]=this[r+n];else if(o<1e3||!a.TYPED_ARRAY_SUPPORT)for(r=0;r<o;++r)e[r+t]=this[r+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+o),t);return o},a.prototype.fill=function(e,t,n,i){if("string"==typeof e){if("string"==typeof t?(i=t,t=0,n=this.length):"string"==typeof n&&(i=n,n=this.length),1===e.length){var r=e.charCodeAt(0);r<256&&(e=r)}if(void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!a.isEncoding(i))throw new TypeError("Unknown encoding: "+i)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0);var o;if("number"==typeof e)for(o=t;o<n;++o)this[o]=e;else{var s=a.isBuffer(e)?e:z(new a(e,i).toString()),p=s.length;for(o=0;o<n-t;++o)this[o+t]=s[o%p]}return this};var te=/[^+\/0-9A-Za-z-_]/g}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===e[t-2]?2:"="===e[t-1]?1:0}function i(e){return 3*e.length/4-n(e)}function r(e){var t,i,r,o,a,s,p=e.length;a=n(e),s=new d(3*p/4-a),r=a>0?p-4:p;var l=0;for(t=0,i=0;t<r;t+=4,i+=3)o=c[e.charCodeAt(t)]<<18|c[e.charCodeAt(t+1)]<<12|c[e.charCodeAt(t+2)]<<6|c[e.charCodeAt(t+3)],s[l++]=o>>16&255,s[l++]=o>>8&255,s[l++]=255&o;return 2===a?(o=c[e.charCodeAt(t)]<<2|c[e.charCodeAt(t+1)]>>4,s[l++]=255&o):1===a&&(o=c[e.charCodeAt(t)]<<10|c[e.charCodeAt(t+1)]<<4|c[e.charCodeAt(t+2)]>>2,s[l++]=o>>8&255,s[l++]=255&o),s}function o(e){return p[e>>18&63]+p[e>>12&63]+p[e>>6&63]+p[63&e]}function a(e,t,n){for(var i,r=[],a=t;a<n;a+=3)i=(e[a]<<16)+(e[a+1]<<8)+e[a+2],r.push(o(i));return r.join("")}function s(e){for(var t,n=e.length,i=n%3,r="",o=[],s=16383,c=0,d=n-i;c<d;c+=s)o.push(a(e,c,c+s>d?d:c+s));return 1===i?(t=e[n-1],r+=p[t>>2],r+=p[t<<4&63],r+="=="):2===i&&(t=(e[n-2]<<8)+e[n-1],r+=p[t>>10],r+=p[t>>4&63],r+=p[t<<2&63],r+="="),o.push(r),o.join("")}t.byteLength=i,t.toByteArray=r,t.fromByteArray=s;for(var p=[],c=[],d="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",m=0,u=l.length;m<u;++m)p[m]=l[m],c[l.charCodeAt(m)]=m;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},function(e,t){t.read=function(e,t,n,i,r){var o,a,s=8*r-i-1,p=(1<<s)-1,c=p>>1,d=-7,l=n?r-1:0,m=n?-1:1,u=e[t+l];for(l+=m,o=u&(1<<-d)-1,u>>=-d,d+=s;d>0;o=256*o+e[t+l],l+=m,d-=8);for(a=o&(1<<-d)-1,o>>=-d,d+=i;d>0;a=256*a+e[t+l],l+=m,d-=8);if(0===o)o=1-c;else{if(o===p)return a?NaN:(u?-1:1)*(1/0);a+=Math.pow(2,i),o-=c}return(u?-1:1)*a*Math.pow(2,o-i)},t.write=function(e,t,n,i,r,o){var a,s,p,c=8*o-r-1,d=(1<<c)-1,l=d>>1,m=23===r?Math.pow(2,-24)-Math.pow(2,-77):0,u=i?0:o-1,h=i?1:-1,f=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(s=isNaN(t)?1:0,a=d):(a=Math.floor(Math.log(t)/Math.LN2),t*(p=Math.pow(2,-a))<1&&(a--,p*=2),t+=a+l>=1?m/p:m*Math.pow(2,1-l),t*p>=2&&(a++,p/=2),a+l>=d?(s=0,a=d):a+l>=1?(s=(t*p-1)*Math.pow(2,r),a+=l):(s=t*Math.pow(2,l-1)*Math.pow(2,r),a=0));r>=8;e[n+u]=255&s,u+=h,s/=256,r-=8);for(a=a<<r|s,c+=r;c>0;e[n+u]=255&a,u+=h,a/=256,c-=8);e[n+u-h]|=128*f}},function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},function(e,t,n){(function(e){var i=n(9),r=n(30),o=n(31),a=n(32),s=t;s.request=function(t,n){t="string"==typeof t?a.parse(t):r(t);var o=e.location.protocol.search(/^https?:$/)===-1?"http:":"",s=t.protocol||o,p=t.hostname||t.host,c=t.port,d=t.path||"/";p&&p.indexOf(":")!==-1&&(p="["+p+"]"),t.url=(p?s+"//"+p:"")+(c?":"+c:"")+d,t.method=(t.method||"GET").toUpperCase(),
t.headers=t.headers||{};var l=new i(t);return n&&l.on("response",n),l},s.get=function(e,t){var n=s.request(e,t);return n.end(),n},s.Agent=function(){},s.Agent.defaultMaxSockets=4,s.STATUS_CODES=o,s.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"]}).call(t,function(){return this}())},function(e,t,n){(function(t,i,r){function o(e,t){return s.fetch&&t?"fetch":s.mozchunkedarraybuffer?"moz-chunked-arraybuffer":s.msstream?"ms-stream":s.arraybuffer&&e?"arraybuffer":s.vbArray&&e?"text:vbarray":"text"}function a(e){try{var t=e.status;return null!==t&&0!==t}catch(e){return!1}}var s=n(10),p=n(11),c=n(12),d=n(13),l=n(29),m=c.IncomingMessage,u=c.readyStates,h=e.exports=function(e){var n=this;d.Writable.call(n),n._opts=e,n._body=[],n._headers={},e.auth&&n.setHeader("Authorization","Basic "+new t(e.auth).toString("base64")),Object.keys(e.headers).forEach(function(t){n.setHeader(t,e.headers[t])});var i,r=!0;if("disable-fetch"===e.mode||"timeout"in e)r=!1,i=!0;else if("prefer-streaming"===e.mode)i=!1;else if("allow-wrong-content-type"===e.mode)i=!s.overrideMimeType;else{if(e.mode&&"default"!==e.mode&&"prefer-fast"!==e.mode)throw new Error("Invalid value for opts.mode");i=!0}n._mode=o(i,r),n.on("finish",function(){n._onFinish()})};p(h,d.Writable),h.prototype.setHeader=function(e,t){var n=this,i=e.toLowerCase();f.indexOf(i)===-1&&(n._headers[i]={name:e,value:t})},h.prototype.getHeader=function(e){var t=this._headers[e.toLowerCase()];return t?t.value:null},h.prototype.removeHeader=function(e){var t=this;delete t._headers[e.toLowerCase()]},h.prototype._onFinish=function(){var e=this;if(!e._destroyed){var n=e._opts,o=e._headers,a=null;"GET"!==n.method&&"HEAD"!==n.method&&(a=s.blobConstructor?new i.Blob(e._body.map(function(e){return l(e)}),{type:(o["content-type"]||{}).value||""}):t.concat(e._body).toString());var p=[];if(Object.keys(o).forEach(function(e){var t=o[e].name,n=o[e].value;Array.isArray(n)?n.forEach(function(e){p.push([t,e])}):p.push([t,n])}),"fetch"===e._mode)i.fetch(e._opts.url,{method:e._opts.method,headers:p,body:a||void 0,mode:"cors",credentials:n.withCredentials?"include":"same-origin"}).then(function(t){e._fetchResponse=t,e._connect()},function(t){e.emit("error",t)});else{var c=e._xhr=new i.XMLHttpRequest;try{c.open(e._opts.method,e._opts.url,!0)}catch(t){return void r.nextTick(function(){e.emit("error",t)})}"responseType"in c&&(c.responseType=e._mode.split(":")[0]),"withCredentials"in c&&(c.withCredentials=!!n.withCredentials),"text"===e._mode&&"overrideMimeType"in c&&c.overrideMimeType("text/plain; charset=x-user-defined"),"timeout"in n&&(c.timeout=n.timeout,c.ontimeout=function(){e.emit("timeout")}),p.forEach(function(e){c.setRequestHeader(e[0],e[1])}),e._response=null,c.onreadystatechange=function(){switch(c.readyState){case u.LOADING:case u.DONE:e._onXHRProgress()}},"moz-chunked-arraybuffer"===e._mode&&(c.onprogress=function(){e._onXHRProgress()}),c.onerror=function(){e._destroyed||e.emit("error",new Error("XHR error"))};try{c.send(a)}catch(t){return void r.nextTick(function(){e.emit("error",t)})}}}},h.prototype._onXHRProgress=function(){var e=this;a(e._xhr)&&!e._destroyed&&(e._response||e._connect(),e._response._onXHRProgress())},h.prototype._connect=function(){var e=this;e._destroyed||(e._response=new m(e._xhr,e._fetchResponse,e._mode),e._response.on("error",function(t){e.emit("error",t)}),e.emit("response",e._response))},h.prototype._write=function(e,t,n){var i=this;i._body.push(e),n()},h.prototype.abort=h.prototype.destroy=function(){var e=this;e._destroyed=!0,e._response&&(e._response._destroyed=!0),e._xhr&&e._xhr.abort()},h.prototype.end=function(e,t,n){var i=this;"function"==typeof e&&(n=e,e=void 0),d.Writable.prototype.end.call(i,e,t,n)},h.prototype.flushHeaders=function(){},h.prototype.setTimeout=function(){},h.prototype.setNoDelay=function(){},h.prototype.setSocketKeepAlive=function(){};var f=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"]}).call(t,n(4).Buffer,function(){return this}(),n(1))},function(e,t){(function(e){function n(){if(void 0!==o)return o;if(e.XMLHttpRequest){o=new e.XMLHttpRequest;try{o.open("GET",e.XDomainRequest?"/":"https://example.com")}catch(e){o=null}}else o=null;return o}function i(e){var t=n();if(!t)return!1;try{return t.responseType=e,t.responseType===e}catch(e){}return!1}function r(e){return"function"==typeof e}t.fetch=r(e.fetch)&&r(e.ReadableStream),t.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),t.blobConstructor=!0}catch(e){}var o,a="undefined"!=typeof e.ArrayBuffer,s=a&&r(e.ArrayBuffer.prototype.slice);t.arraybuffer=t.fetch||a&&i("arraybuffer"),t.msstream=!t.fetch&&s&&i("ms-stream"),t.mozchunkedarraybuffer=!t.fetch&&a&&i("moz-chunked-arraybuffer"),t.overrideMimeType=t.fetch||!!n()&&r(n().overrideMimeType),t.vbArray=r(e.VBArray),o=null}).call(t,function(){return this}())},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t,n){(function(e,i,r){var o=n(10),a=n(11),s=n(13),p=t.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},c=t.IncomingMessage=function(t,n,r){function a(){c.read().then(function(e){if(!p._destroyed){if(e.done)return void p.push(null);p.push(new i(e.value)),a()}}).catch(function(e){p.emit("error",e)})}var p=this;if(s.Readable.call(p),p._mode=r,p.headers={},p.rawHeaders=[],p.trailers={},p.rawTrailers=[],p.on("end",function(){e.nextTick(function(){p.emit("close")})}),"fetch"===r){p._fetchResponse=n,p.url=n.url,p.statusCode=n.status,p.statusMessage=n.statusText,n.headers.forEach(function(e,t){p.headers[t.toLowerCase()]=e,p.rawHeaders.push(t,e)});var c=n.body.getReader();a()}else{p._xhr=t,p._pos=0,p.url=t.responseURL,p.statusCode=t.status,p.statusMessage=t.statusText;var d=t.getAllResponseHeaders().split(/\r?\n/);if(d.forEach(function(e){var t=e.match(/^([^:]+):\s*(.*)/);if(t){var n=t[1].toLowerCase();"set-cookie"===n?(void 0===p.headers[n]&&(p.headers[n]=[]),p.headers[n].push(t[2])):void 0!==p.headers[n]?p.headers[n]+=", "+t[2]:p.headers[n]=t[2],p.rawHeaders.push(t[1],t[2])}}),p._charset="x-user-defined",!o.overrideMimeType){var l=p.rawHeaders["mime-type"];if(l){var m=l.match(/;\s*charset=([^;])(;|$)/);m&&(p._charset=m[1].toLowerCase())}p._charset||(p._charset="utf-8")}}};a(c,s.Readable),c.prototype._read=function(){},c.prototype._onXHRProgress=function(){var e=this,t=e._xhr,n=null;switch(e._mode){case"text:vbarray":if(t.readyState!==p.DONE)break;try{n=new r.VBArray(t.responseBody).toArray()}catch(e){}if(null!==n){e.push(new i(n));break}case"text":try{n=t.responseText}catch(t){e._mode="text:vbarray";break}if(n.length>e._pos){var o=n.substr(e._pos);if("x-user-defined"===e._charset){for(var a=new i(o.length),s=0;s<o.length;s++)a[s]=255&o.charCodeAt(s);e.push(a)}else e.push(o,e._charset);e._pos=n.length}break;case"arraybuffer":if(t.readyState!==p.DONE||!t.response)break;n=t.response,e.push(new i(new Uint8Array(n)));break;case"moz-chunked-arraybuffer":if(n=t.response,t.readyState!==p.LOADING||!n)break;e.push(new i(new Uint8Array(n)));break;case"ms-stream":if(n=t.response,t.readyState!==p.LOADING)break;var c=new r.MSStreamReader;c.onprogress=function(){c.result.byteLength>e._pos&&(e.push(new i(new Uint8Array(c.result.slice(e._pos)))),e._pos=c.result.byteLength)},c.onload=function(){e.push(null)},c.readAsArrayBuffer(n)}e._xhr.readyState===p.DONE&&"ms-stream"!==e._mode&&e.push(null)}}).call(t,n(1),n(4).Buffer,function(){return this}())},function(e,t,n){t=e.exports=n(14),t.Stream=t,t.Readable=t,t.Writable=n(22),t.Duplex=n(21),t.Transform=n(27),t.PassThrough=n(28)},function(e,t,n){(function(t){"use strict";function i(e,t,n){return"function"==typeof e.prependListener?e.prependListener(t,n):void(e._events&&e._events[t]?E(e._events[t])?e._events[t].unshift(n):e._events[t]=[n,e._events[t]]:e.on(t,n))}function r(e,t){$=$||n(21),e=e||{},this.objectMode=!!e.objectMode,t instanceof $&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var i=e.highWaterMark,r=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:r,this.highWaterMark=~~this.highWaterMark,this.buffer=new _,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(L||(L=n(26).StringDecoder),this.decoder=new L(e.encoding),this.encoding=e.encoding)}function o(e){return $=$||n(21),this instanceof o?(this._readableState=new r(e,this),this.readable=!0,e&&"function"==typeof e.read&&(this._read=e.read),void j.call(this)):new o(e)}function a(e,t,n,i,r){var o=d(t,n);if(o)e.emit("error",o);else if(null===n)t.reading=!1,l(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!r){var a=new Error("stream.push() after EOF");e.emit("error",a)}else if(t.endEmitted&&r){var p=new Error("stream.unshift() after end event");e.emit("error",p)}else{var c;!t.decoder||r||i||(n=t.decoder.write(n),c=!t.objectMode&&0===n.length),r||(t.reading=!1),c||(t.flowing&&0===t.length&&!t.sync?(e.emit("data",n),e.read(0)):(t.length+=t.objectMode?1:n.length,r?t.buffer.unshift(n):t.buffer.push(n),t.needReadable&&m(e))),h(e,t)}else r||(t.reading=!1);return s(t)}function s(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function p(e){return e>=U?e=U:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function c(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!==e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=p(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function d(e,t){var n=null;return N.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function l(e,t){if(!t.ended){if(t.decoder){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,m(e)}}function m(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(M("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?O(u,e):u(e))}function u(e){M("emit readable"),e.emit("readable"),w(e)}function h(e,t){t.readingMore||(t.readingMore=!0,O(f,e,t))}function f(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(M("maybeReadMore read 0"),e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function y(e){return function(){var t=e._readableState;M("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&D(e,"data")&&(t.flowing=!0,w(e))}}function g(e){M("readable nexttick read 0"),e.read(0)}function b(e,t){t.resumeScheduled||(t.resumeScheduled=!0,O(v,e,t))}function v(e,t){t.reading||(M("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),w(e),t.flowing&&!t.reading&&e.read(0)}function w(e){var t=e._readableState;for(M("flow",t.flowing);t.flowing&&null!==e.read(););}function S(e,t){if(0===t.length)return null;var n;return t.objectMode?n=t.buffer.shift():!e||e>=t.length?(n=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):n=x(e,t.buffer,t.decoder),n}function x(e,t,n){var i;return e<t.head.data.length?(i=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):i=e===t.head.data.length?t.shift():n?I(e,t):T(e,t),i}function I(e,t){var n=t.head,i=1,r=n.data;for(e-=r.length;n=n.next;){var o=n.data,a=e>o.length?o.length:e;if(r+=a===o.length?o:o.slice(0,e),e-=a,0===e){a===o.length?(++i,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=o.slice(a));break}++i}return t.length-=i,r}function T(e,t){var n=N.allocUnsafe(e),i=t.head,r=1;for(i.data.copy(n),e-=i.data.length;i=i.next;){var o=i.data,a=e>o.length?o.length:e;if(o.copy(n,n.length-e,0,a),e-=a,0===e){a===o.length?(++r,i.next?t.head=i.next:t.head=t.tail=null):(t.head=i,i.data=o.slice(a));break}++r}return t.length-=r,n}function R(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,O(k,t,e))}function k(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function C(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1}e.exports=o;var $,O=n(15),E=n(7);o.ReadableState=r;var D=(n(2).EventEmitter,function(e,t){return e.listeners(t).length}),j=n(16),N=n(17).Buffer,A=n(18);A.inherits=n(11);var P=n(19),M=void 0;M=P&&P.debuglog?P.debuglog("stream"):function(){};var L,_=n(20);A.inherits(o,j);var q=["error","close","destroy","pause","resume"];o.prototype.push=function(e,t){var n=this._readableState;return n.objectMode||"string"!=typeof e||(t=t||n.defaultEncoding,t!==n.encoding&&(e=N.from(e,t),t="")),a(this,n,e,t,!1)},o.prototype.unshift=function(e){var t=this._readableState;return a(this,t,e,"",!0)},o.prototype.isPaused=function(){return this._readableState.flowing===!1},o.prototype.setEncoding=function(e){return L||(L=n(26).StringDecoder),this._readableState.decoder=new L(e),this._readableState.encoding=e,this};var U=8388608;o.prototype.read=function(e){M("read",e),e=parseInt(e,10);var t=this._readableState,n=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return M("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?R(this):m(this),null;if(e=c(e,t),0===e&&t.ended)return 0===t.length&&R(this),null;var i=t.needReadable;M("need readable",i),(0===t.length||t.length-e<t.highWaterMark)&&(i=!0,M("length less than watermark",i)),t.ended||t.reading?(i=!1,M("reading or ended",i)):i&&(M("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=c(n,t)));var r;return r=e>0?S(e,t):null,null===r?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),n!==e&&t.ended&&R(this)),null!==r&&this.emit("data",r),r},o.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))},o.prototype.pipe=function(e,n){function r(e){M("onunpipe"),e===m&&a()}function o(){M("onend"),e.end()}function a(){M("cleanup"),e.removeListener("close",c),e.removeListener("finish",d),e.removeListener("drain",g),e.removeListener("error",p),e.removeListener("unpipe",r),m.removeListener("end",o),m.removeListener("end",l),m.removeListener("data",s),b=!0,!u.awaitDrain||e._writableState&&!e._writableState.needDrain||g()}function s(t){M("ondata"),v=!1;var n=e.write(t);!1!==n||v||((1===u.pipesCount&&u.pipes===e||u.pipesCount>1&&C(u.pipes,e)!==-1)&&!b&&(M("false write response, pause",m._readableState.awaitDrain),m._readableState.awaitDrain++,v=!0),m.pause())}function p(t){M("onerror",t),l(),e.removeListener("error",p),0===D(e,"error")&&e.emit("error",t)}function c(){e.removeListener("finish",d),l()}function d(){M("onfinish"),e.removeListener("close",c),l()}function l(){M("unpipe"),m.unpipe(e)}var m=this,u=this._readableState;switch(u.pipesCount){case 0:u.pipes=e;break;case 1:u.pipes=[u.pipes,e];break;default:u.pipes.push(e)}u.pipesCount+=1,M("pipe count=%d opts=%j",u.pipesCount,n);var h=(!n||n.end!==!1)&&e!==t.stdout&&e!==t.stderr,f=h?o:l;u.endEmitted?O(f):m.once("end",f),e.on("unpipe",r);var g=y(m);e.on("drain",g);var b=!1,v=!1;return m.on("data",s),i(e,"error",p),e.once("close",c),e.once("finish",d),e.emit("pipe",m),u.flowing||(M("pipe resume"),m.resume()),e},o.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var n=t.pipes,i=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var r=0;r<i;r++)n[r].emit("unpipe",this);return this}var o=C(t.pipes,e);return o===-1?this:(t.pipes.splice(o,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},o.prototype.on=function(e,t){var n=j.prototype.on.call(this,e,t);if("data"===e)this._readableState.flowing!==!1&&this.resume();else if("readable"===e){var i=this._readableState;i.endEmitted||i.readableListening||(i.readableListening=i.needReadable=!0,i.emittedReadable=!1,i.reading?i.length&&m(this,i):O(g,this))}return n},o.prototype.addListener=o.prototype.on,o.prototype.resume=function(){var e=this._readableState;return e.flowing||(M("resume"),e.flowing=!0,b(this,e)),this},o.prototype.pause=function(){return M("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(M("pause"),this._readableState.flowing=!1,this.emit("pause")),this},o.prototype.wrap=function(e){var t=this._readableState,n=!1,i=this;e.on("end",function(){if(M("wrapped end"),t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&i.push(e)}i.push(null)}),e.on("data",function(r){if(M("wrapped data"),t.decoder&&(r=t.decoder.write(r)),(!t.objectMode||null!==r&&void 0!==r)&&(t.objectMode||r&&r.length)){var o=i.push(r);o||(n=!0,e.pause())}});for(var r in e)void 0===this[r]&&"function"==typeof e[r]&&(this[r]=function(t){return function(){return e[t].apply(e,arguments)}}(r));for(var o=0;o<q.length;o++)e.on(q[o],i.emit.bind(i,q[o]));return i._read=function(t){M("wrapped _read",t),n&&(n=!1,e.resume())},i},o._fromList=S}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function n(e,n,i,r){if("function"!=typeof e)throw new TypeError('"callback" argument must be a function');var o,a,s=arguments.length;switch(s){case 0:case 1:return t.nextTick(e);case 2:return t.nextTick(function(){e.call(null,n)});case 3:return t.nextTick(function(){e.call(null,n,i)});case 4:return t.nextTick(function(){e.call(null,n,i,r)});default:for(o=new Array(s-1),a=0;a<o.length;)o[a++]=arguments[a];return t.nextTick(function(){e.apply(null,o)})}}!t.version||0===t.version.indexOf("v0.")||0===t.version.indexOf("v1.")&&0!==t.version.indexOf("v1.8.")?e.exports=n:e.exports=t.nextTick}).call(t,n(1))},function(e,t,n){e.exports=n(2).EventEmitter},function(e,t,n){function i(e,t,n){return o(e,t,n)}var r=n(4),o=r.Buffer;o.from&&o.alloc&&o.allocUnsafe&&o.allocUnsafeSlow?e.exports=r:(Object.keys(r).forEach(function(e){t[e]=r[e]}),t.Buffer=i),Object.keys(o).forEach(function(e){i[e]=o[e]}),i.from=function(e,t,n){if("number"==typeof e)throw new TypeError("Argument must not be a number");return o(e,t,n)},i.alloc=function(e,t,n){if("number"!=typeof e)throw new TypeError("Argument must be a number");var i=o(e);return void 0!==t?"string"==typeof n?i.fill(t,n):i.fill(t):i.fill(0),i},i.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return o(e)},i.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return r.SlowBuffer(e)}},function(e,t,n){(function(e){function n(e){return Array.isArray?Array.isArray(e):"[object Array]"===y(e)}function i(e){return"boolean"==typeof e}function r(e){return null===e}function o(e){return null==e}function a(e){return"number"==typeof e}function s(e){return"string"==typeof e}function p(e){return"symbol"==typeof e}function c(e){return void 0===e}function d(e){return"[object RegExp]"===y(e)}function l(e){return"object"==typeof e&&null!==e}function m(e){return"[object Date]"===y(e)}function u(e){return"[object Error]"===y(e)||e instanceof Error}function h(e){return"function"==typeof e}function f(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function y(e){return Object.prototype.toString.call(e)}t.isArray=n,t.isBoolean=i,t.isNull=r,t.isNullOrUndefined=o,t.isNumber=a,t.isString=s,t.isSymbol=p,t.isUndefined=c,t.isRegExp=d,t.isObject=l,t.isDate=m,t.isError=u,t.isFunction=h,t.isPrimitive=f,t.isBuffer=e.isBuffer}).call(t,n(4).Buffer)},function(e,t){},function(e,t,n){"use strict";function i(){this.head=null,this.tail=null,this.length=0}var r=n(17).Buffer;e.exports=i,i.prototype.push=function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t,this.tail=t,++this.length},i.prototype.unshift=function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length},i.prototype.shift=function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,e}},i.prototype.clear=function(){this.head=this.tail=null,this.length=0},i.prototype.join=function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n},i.prototype.concat=function(e){if(0===this.length)return r.alloc(0);if(1===this.length)return this.head.data;for(var t=r.allocUnsafe(e>>>0),n=this.head,i=0;n;)n.data.copy(t,i),i+=n.data.length,n=n.next;return t}},function(e,t,n){"use strict";function i(e){return this instanceof i?(c.call(this,e),d.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",r)):new i(e)}function r(){this.allowHalfOpen||this._writableState.ended||s(o,this)}function o(e){e.end()}var a=Object.keys||function(e){var t=[];for(var n in e)t.push(n);return t};e.exports=i;var s=n(15),p=n(18);p.inherits=n(11);var c=n(14),d=n(22);p.inherits(i,c);for(var l=a(d.prototype),m=0;m<l.length;m++){var u=l[m];i.prototype[u]||(i.prototype[u]=d.prototype[u])}},function(e,t,n){(function(t,i){"use strict";function r(){}function o(e,t,n){this.chunk=e,this.encoding=t,this.callback=n,this.next=null}function a(e,t){T=T||n(21),e=e||{},this.objectMode=!!e.objectMode,t instanceof T&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var i=e.highWaterMark,r=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:r,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var o=e.decodeStrings===!1;this.decodeStrings=!o,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){f(t,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new I(this)}function s(e){return T=T||n(21),D.call(s,this)||this instanceof T?(this._writableState=new a(e,this),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev)),void O.call(this)):new s(e)}function p(e,t){var n=new Error("write after end");e.emit("error",n),R(t,n)}function c(e,t,n,i){var r=!0,o=!1;return null===n?o=new TypeError("May not write null values to stream"):"string"==typeof n||void 0===n||t.objectMode||(o=new TypeError("Invalid non-string/buffer chunk")),o&&(e.emit("error",o),R(i,o),r=!1),r}function d(e,t,n){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=E.from(t,n)),t}function l(e,t,n,i,r,a){n||(i=d(t,i,r),E.isBuffer(i)&&(r="buffer"));var s=t.objectMode?1:i.length;t.length+=s;var p=t.length<t.highWaterMark;if(p||(t.needDrain=!0),t.writing||t.corked){var c=t.lastBufferedRequest;t.lastBufferedRequest=new o(i,r,a),c?c.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else m(e,t,!1,s,i,r,a);return p}function m(e,t,n,i,r,o,a){t.writelen=i,t.writecb=a,t.writing=!0,t.sync=!0,n?e._writev(r,t.onwrite):e._write(r,o,t.onwrite),t.sync=!1}function u(e,t,n,i,r){--t.pendingcb,n?R(r,i):r(i),e._writableState.errorEmitted=!0,e.emit("error",i)}function h(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function f(e,t){var n=e._writableState,i=n.sync,r=n.writecb;if(h(n),t)u(e,n,i,t,r);else{var o=v(n);o||n.corked||n.bufferProcessing||!n.bufferedRequest||b(e,n),i?k(y,e,n,o,r):y(e,n,o,r)}}function y(e,t,n,i){n||g(e,t),t.pendingcb--,i(),S(e,t)}function g(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function b(e,t){t.bufferProcessing=!0;var n=t.bufferedRequest;if(e._writev&&n&&n.next){var i=t.bufferedRequestCount,r=new Array(i),o=t.corkedRequestsFree;o.entry=n;for(var a=0;n;)r[a]=n,n=n.next,a+=1;m(e,t,!0,t.length,r,"",o.finish),t.pendingcb++,t.lastBufferedRequest=null,o.next?(t.corkedRequestsFree=o.next,o.next=null):t.corkedRequestsFree=new I(t)}else{for(;n;){var s=n.chunk,p=n.encoding,c=n.callback,d=t.objectMode?1:s.length;if(m(e,t,!1,d,s,p,c),n=n.next,t.writing)break}null===n&&(t.lastBufferedRequest=null)}t.bufferedRequestCount=0,t.bufferedRequest=n,t.bufferProcessing=!1}function v(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function w(e,t){t.prefinished||(t.prefinished=!0,e.emit("prefinish"))}function S(e,t){var n=v(t);return n&&(0===t.pendingcb?(w(e,t),t.finished=!0,e.emit("finish")):w(e,t)),n}function x(e,t,n){t.ending=!0,S(e,t),n&&(t.finished?R(n):e.once("finish",n)),t.ended=!0,e.writable=!1}function I(e){var t=this;this.next=null,this.entry=null,this.finish=function(n){var i=t.entry;for(t.entry=null;i;){var r=i.callback;e.pendingcb--,r(n),i=i.next}e.corkedRequestsFree?e.corkedRequestsFree.next=t:e.corkedRequestsFree=t}}e.exports=s;var T,R=n(15),k=!t.browser&&["v0.10","v0.9."].indexOf(t.version.slice(0,5))>-1?i:R;s.WritableState=a;var C=n(18);C.inherits=n(11);var $={deprecate:n(25)},O=n(16),E=n(17).Buffer;C.inherits(s,O),a.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(a.prototype,"buffer",{get:$.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(e){}}();var D;"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(D=Function.prototype[Symbol.hasInstance],Object.defineProperty(s,Symbol.hasInstance,{value:function(e){return!!D.call(this,e)||e&&e._writableState instanceof a}})):D=function(e){return e instanceof this},s.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},s.prototype.write=function(e,t,n){var i=this._writableState,o=!1,a=E.isBuffer(e);return"function"==typeof t&&(n=t,t=null),a?t="buffer":t||(t=i.defaultEncoding),"function"!=typeof n&&(n=r),i.ended?p(this,n):(a||c(this,i,e,n))&&(i.pendingcb++,o=l(this,i,a,e,t,n)),o},s.prototype.cork=function(){var e=this._writableState;e.corked++},s.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||b(this,e))},s.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},s.prototype._write=function(e,t,n){n(new Error("_write() is not implemented"))},s.prototype._writev=null,s.prototype.end=function(e,t,n){var i=this._writableState;"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),null!==e&&void 0!==e&&this.write(e,t),i.corked&&(i.corked=1,this.uncork()),i.ending||i.finished||x(this,i,n)}}).call(t,n(1),n(23).setImmediate)},function(e,t,n){function i(e,t){this._id=e,this._clearFn=t}var r=Function.prototype.apply;t.setTimeout=function(){return new i(r.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new i(r.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(24),t.setImmediate=setImmediate,t.clearImmediate=clearImmediate},function(e,t,n){(function(e,t){!function(e,n){"use strict";function i(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return f[h]=i,u(h),h++}function r(e){delete f[e]}function o(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i)}}function a(e){if(y)setTimeout(a,0,e);else{var t=f[e];if(t){y=!0;try{o(t)}finally{r(e),y=!1}}}}function s(){u=function(e){t.nextTick(function(){a(e)})}}function p(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function c(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&a(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),u=function(n){e.postMessage(t+n,"*")}}function d(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;a(t)},u=function(t){e.port2.postMessage(t)}}function l(){var e=g.documentElement;u=function(t){var n=g.createElement("script");n.onreadystatechange=function(){a(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function m(){u=function(e){setTimeout(a,0,e)}}if(!e.setImmediate){var u,h=1,f={},y=!1,g=e.document,b=Object.getPrototypeOf&&Object.getPrototypeOf(e);b=b&&b.setTimeout?b:e,"[object process]"==={}.toString.call(e.process)?s():p()?c():e.MessageChannel?d():g&&"onreadystatechange"in g.createElement("script")?l():m(),b.setImmediate=i,b.clearImmediate=r}}("undefined"==typeof self?"undefined"==typeof e?this:e:self)}).call(t,function(){return this}(),n(1))},function(e,t){(function(t){function n(e,t){function n(){if(!r){if(i("throwDeprecation"))throw new Error(t);i("traceDeprecation")?console.trace(t):console.warn(t),r=!0}return e.apply(this,arguments)}if(i("noDeprecation"))return e;var r=!1;return n}function i(e){try{if(!t.localStorage)return!1}catch(e){return!1}var n=t.localStorage[e];return null!=n&&"true"===String(n).toLowerCase()}e.exports=n}).call(t,function(){return this}())},function(e,t,n){"use strict";function i(e){if(!e)return"utf8";for(var t;;)switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(t)return;e=(""+e).toLowerCase(),t=!0}}function r(e){var t=i(e);if("string"!=typeof t&&(b.isEncoding===v||!v(e)))throw new Error("Unknown encoding: "+e);return t||e}function o(e){this.encoding=r(e);var t;switch(this.encoding){case"utf16le":this.text=m,this.end=u,t=4;break;case"utf8":this.fillLast=c,t=4;break;case"base64":this.text=h,this.end=f,t=3;break;default:return this.write=y,void(this.end=g)}this.lastNeed=0,this.lastTotal=0,this.lastChar=b.allocUnsafe(t)}function a(e){return e<=127?0:e>>5===6?2:e>>4===14?3:e>>3===30?4:-1}function s(e,t,n){var i=t.length-1;if(i<n)return 0;var r=a(t[i]);return r>=0?(r>0&&(e.lastNeed=r-1),r):--i<n?0:(r=a(t[i]),r>=0?(r>0&&(e.lastNeed=r-2),r):--i<n?0:(r=a(t[i]),r>=0?(r>0&&(2===r?r=0:e.lastNeed=r-3),r):0))}function p(e,t,n){if(128!==(192&t[0]))return e.lastNeed=0,"�".repeat(n);if(e.lastNeed>1&&t.length>1){if(128!==(192&t[1]))return e.lastNeed=1,"�".repeat(n+1);if(e.lastNeed>2&&t.length>2&&128!==(192&t[2]))return e.lastNeed=2,
"�".repeat(n+2)}}function c(e){var t=this.lastTotal-this.lastNeed,n=p(this,e,t);return void 0!==n?n:this.lastNeed<=e.length?(e.copy(this.lastChar,t,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(e.copy(this.lastChar,t,0,e.length),void(this.lastNeed-=e.length))}function d(e,t){var n=s(this,e,t);if(!this.lastNeed)return e.toString("utf8",t);this.lastTotal=n;var i=e.length-(n-this.lastNeed);return e.copy(this.lastChar,0,i),e.toString("utf8",t,i)}function l(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+"�".repeat(this.lastTotal-this.lastNeed):t}function m(e,t){if((e.length-t)%2===0){var n=e.toString("utf16le",t);if(n){var i=n.charCodeAt(n.length-1);if(i>=55296&&i<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1],n.slice(0,-1)}return n}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=e[e.length-1],e.toString("utf16le",t,e.length-1)}function u(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed){var n=this.lastTotal-this.lastNeed;return t+this.lastChar.toString("utf16le",0,n)}return t}function h(e,t){var n=(e.length-t)%3;return 0===n?e.toString("base64",t):(this.lastNeed=3-n,this.lastTotal=3,1===n?this.lastChar[0]=e[e.length-1]:(this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1]),e.toString("base64",t,e.length-n))}function f(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+this.lastChar.toString("base64",0,3-this.lastNeed):t}function y(e){return e.toString(this.encoding)}function g(e){return e&&e.length?this.write(e):""}var b=n(17).Buffer,v=b.isEncoding||function(e){switch(e=""+e,e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};t.StringDecoder=o,o.prototype.write=function(e){if(0===e.length)return"";var t,n;if(this.lastNeed){if(t=this.fillLast(e),void 0===t)return"";n=this.lastNeed,this.lastNeed=0}else n=0;return n<e.length?t?t+this.text(e,n):this.text(e,n):t||""},o.prototype.end=l,o.prototype.text=d,o.prototype.fillLast=function(e){return this.lastNeed<=e.length?(e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length),void(this.lastNeed-=e.length))}},function(e,t,n){"use strict";function i(e){this.afterTransform=function(t,n){return r(e,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function r(e,t,n){var i=e._transformState;i.transforming=!1;var r=i.writecb;if(!r)return e.emit("error",new Error("no writecb in Transform class"));i.writechunk=null,i.writecb=null,null!==n&&void 0!==n&&e.push(n),r(t);var o=e._readableState;o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&e._read(o.highWaterMark)}function o(e){if(!(this instanceof o))return new o(e);s.call(this,e),this._transformState=new i(this);var t=this;this._readableState.needReadable=!0,this._readableState.sync=!1,e&&("function"==typeof e.transform&&(this._transform=e.transform),"function"==typeof e.flush&&(this._flush=e.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(e,n){a(t,e,n)}):a(t)})}function a(e,t,n){if(t)return e.emit("error",t);null!==n&&void 0!==n&&e.push(n);var i=e._writableState,r=e._transformState;if(i.length)throw new Error("Calling transform done when ws.length != 0");if(r.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}e.exports=o;var s=n(21),p=n(18);p.inherits=n(11),p.inherits(o,s),o.prototype.push=function(e,t){return this._transformState.needTransform=!1,s.prototype.push.call(this,e,t)},o.prototype._transform=function(e,t,n){throw new Error("_transform() is not implemented")},o.prototype._write=function(e,t,n){var i=this._transformState;if(i.writecb=n,i.writechunk=e,i.writeencoding=t,!i.transforming){var r=this._readableState;(i.needTransform||r.needReadable||r.length<r.highWaterMark)&&this._read(r.highWaterMark)}},o.prototype._read=function(e){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0}},function(e,t,n){"use strict";function i(e){return this instanceof i?void r.call(this,e):new i(e)}e.exports=i;var r=n(27),o=n(18);o.inherits=n(11),o.inherits(i,r),i.prototype._transform=function(e,t,n){n(null,e)}},function(e,t,n){var i=n(4).Buffer;e.exports=function(e){if(e instanceof Uint8Array){if(0===e.byteOffset&&e.byteLength===e.buffer.byteLength)return e.buffer;if("function"==typeof e.buffer.slice)return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(i.isBuffer(e)){for(var t=new Uint8Array(e.length),n=e.length,r=0;r<n;r++)t[r]=e[r];return t.buffer}throw new Error("Argument must be a Buffer")}},function(e,t){function n(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var r in n)i.call(n,r)&&(e[r]=n[r])}return e}e.exports=n;var i=Object.prototype.hasOwnProperty},function(e,t){e.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},function(e,t,n){"use strict";function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function r(e,t,n){if(e&&c.isObject(e)&&e instanceof i)return e;var r=new i;return r.parse(e,t,n),r}function o(e){return c.isString(e)&&(e=r(e)),e instanceof i?e.format():i.prototype.format.call(e)}function a(e,t){return r(e,!1,!0).resolve(t)}function s(e,t){return e?r(e,!1,!0).resolveObject(t):t}var p=n(33),c=n(35);t.parse=r,t.resolve=a,t.resolveObject=s,t.format=o,t.Url=i;var d=/^([a-z0-9.+-]+:)/i,l=/:[0-9]*$/,m=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,u=["<",">",'"',"`"," ","\r","\n","\t"],h=["{","}","|","\\","^","`"].concat(u),f=["'"].concat(h),y=["%","/","?",";","#"].concat(f),g=["/","?","#"],b=255,v=/^[+a-z0-9A-Z_-]{0,63}$/,w=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,S={javascript:!0,"javascript:":!0},x={javascript:!0,"javascript:":!0},I={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},T=n(36);i.prototype.parse=function(e,t,n){if(!c.isString(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var i=e.indexOf("?"),r=i!==-1&&i<e.indexOf("#")?"?":"#",o=e.split(r),a=/\\/g;o[0]=o[0].replace(a,"/"),e=o.join(r);var s=e;if(s=s.trim(),!n&&1===e.split("#").length){var l=m.exec(s);if(l)return this.path=s,this.href=s,this.pathname=l[1],l[2]?(this.search=l[2],t?this.query=T.parse(this.search.substr(1)):this.query=this.search.substr(1)):t&&(this.search="",this.query={}),this}var u=d.exec(s);if(u){u=u[0];var h=u.toLowerCase();this.protocol=h,s=s.substr(u.length)}if(n||u||s.match(/^\/\/[^@\/]+@[^@\/]+/)){var R="//"===s.substr(0,2);!R||u&&x[u]||(s=s.substr(2),this.slashes=!0)}if(!x[u]&&(R||u&&!I[u])){for(var k=-1,C=0;C<g.length;C++){var $=s.indexOf(g[C]);$!==-1&&(k===-1||$<k)&&(k=$)}var O,E;E=k===-1?s.lastIndexOf("@"):s.lastIndexOf("@",k),E!==-1&&(O=s.slice(0,E),s=s.slice(E+1),this.auth=decodeURIComponent(O)),k=-1;for(var C=0;C<y.length;C++){var $=s.indexOf(y[C]);$!==-1&&(k===-1||$<k)&&(k=$)}k===-1&&(k=s.length),this.host=s.slice(0,k),s=s.slice(k),this.parseHost(),this.hostname=this.hostname||"";var D="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!D)for(var j=this.hostname.split(/\./),C=0,N=j.length;C<N;C++){var A=j[C];if(A&&!A.match(v)){for(var P="",M=0,L=A.length;M<L;M++)P+=A.charCodeAt(M)>127?"x":A[M];if(!P.match(v)){var _=j.slice(0,C),q=j.slice(C+1),U=A.match(w);U&&(_.push(U[1]),q.unshift(U[2])),q.length&&(s="/"+q.join(".")+s),this.hostname=_.join(".");break}}}this.hostname.length>b?this.hostname="":this.hostname=this.hostname.toLowerCase(),D||(this.hostname=p.toASCII(this.hostname));var F=this.port?":"+this.port:"",B=this.hostname||"";this.host=B+F,this.href+=this.host,D&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==s[0]&&(s="/"+s))}if(!S[h])for(var C=0,N=f.length;C<N;C++){var W=f[C];if(s.indexOf(W)!==-1){var H=encodeURIComponent(W);H===W&&(H=escape(W)),s=s.split(W).join(H)}}var z=s.indexOf("#");z!==-1&&(this.hash=s.substr(z),s=s.slice(0,z));var V=s.indexOf("?");if(V!==-1?(this.search=s.substr(V),this.query=s.substr(V+1),t&&(this.query=T.parse(this.query)),s=s.slice(0,V)):t&&(this.search="",this.query={}),s&&(this.pathname=s),I[h]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var F=this.pathname||"",X=this.search||"";this.path=F+X}return this.href=this.format(),this},i.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",i=this.hash||"",r=!1,o="";this.host?r=e+this.host:this.hostname&&(r=e+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(r+=":"+this.port)),this.query&&c.isObject(this.query)&&Object.keys(this.query).length&&(o=T.stringify(this.query));var a=this.search||o&&"?"+o||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||I[t])&&r!==!1?(r="//"+(r||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):r||(r=""),i&&"#"!==i.charAt(0)&&(i="#"+i),a&&"?"!==a.charAt(0)&&(a="?"+a),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),a=a.replace("#","%23"),t+r+n+a+i},i.prototype.resolve=function(e){return this.resolveObject(r(e,!1,!0)).format()},i.prototype.resolveObject=function(e){if(c.isString(e)){var t=new i;t.parse(e,!1,!0),e=t}for(var n=new i,r=Object.keys(this),o=0;o<r.length;o++){var a=r[o];n[a]=this[a]}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var s=Object.keys(e),p=0;p<s.length;p++){var d=s[p];"protocol"!==d&&(n[d]=e[d])}return I[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!I[e.protocol]){for(var l=Object.keys(e),m=0;m<l.length;m++){var u=l[m];n[u]=e[u]}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||x[e.protocol])n.pathname=e.pathname;else{for(var h=(e.pathname||"").split("/");h.length&&!(e.host=h.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==h[0]&&h.unshift(""),h.length<2&&h.unshift(""),n.pathname=h.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var f=n.pathname||"",y=n.search||"";n.path=f+y}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var g=n.pathname&&"/"===n.pathname.charAt(0),b=e.host||e.pathname&&"/"===e.pathname.charAt(0),v=b||g||n.host&&e.pathname,w=v,S=n.pathname&&n.pathname.split("/")||[],h=e.pathname&&e.pathname.split("/")||[],T=n.protocol&&!I[n.protocol];if(T&&(n.hostname="",n.port=null,n.host&&(""===S[0]?S[0]=n.host:S.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===h[0]?h[0]=e.host:h.unshift(e.host)),e.host=null),v=v&&(""===h[0]||""===S[0])),b)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,S=h;else if(h.length)S||(S=[]),S.pop(),S=S.concat(h),n.search=e.search,n.query=e.query;else if(!c.isNullOrUndefined(e.search)){if(T){n.hostname=n.host=S.shift();var R=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");R&&(n.auth=R.shift(),n.host=n.hostname=R.shift())}return n.search=e.search,n.query=e.query,c.isNull(n.pathname)&&c.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!S.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var k=S.slice(-1)[0],C=(n.host||e.host||S.length>1)&&("."===k||".."===k)||""===k,$=0,O=S.length;O>=0;O--)k=S[O],"."===k?S.splice(O,1):".."===k?(S.splice(O,1),$++):$&&(S.splice(O,1),$--);if(!v&&!w)for(;$--;$)S.unshift("..");!v||""===S[0]||S[0]&&"/"===S[0].charAt(0)||S.unshift(""),C&&"/"!==S.join("/").substr(-1)&&S.push("");var E=""===S[0]||S[0]&&"/"===S[0].charAt(0);if(T){n.hostname=n.host=E?"":S.length?S.shift():"";var R=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");R&&(n.auth=R.shift(),n.host=n.hostname=R.shift())}return v=v||n.host&&S.length,v&&!E&&S.unshift(""),S.length?n.pathname=S.join("/"):(n.pathname=null,n.path=null),c.isNull(n.pathname)&&c.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},i.prototype.parseHost=function(){var e=this.host,t=l.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},function(e,t,n){var i;(function(e,r){!function(o){function a(e){throw RangeError(j[e])}function s(e,t){for(var n=e.length,i=[];n--;)i[n]=t(e[n]);return i}function p(e,t){var n=e.split("@"),i="";n.length>1&&(i=n[0]+"@",e=n[1]),e=e.replace(D,".");var r=e.split("."),o=s(r,t).join(".");return i+o}function c(e){for(var t,n,i=[],r=0,o=e.length;r<o;)t=e.charCodeAt(r++),t>=55296&&t<=56319&&r<o?(n=e.charCodeAt(r++),56320==(64512&n)?i.push(((1023&t)<<10)+(1023&n)+65536):(i.push(t),r--)):i.push(t);return i}function d(e){return s(e,function(e){var t="";return e>65535&&(e-=65536,t+=P(e>>>10&1023|55296),e=56320|1023&e),t+=P(e)}).join("")}function l(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:S}function m(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function u(e,t,n){var i=0;for(e=n?A(e/R):e>>1,e+=A(e/t);e>N*I>>1;i+=S)e=A(e/N);return A(i+(N+1)*e/(e+T))}function h(e){var t,n,i,r,o,s,p,c,m,h,f=[],y=e.length,g=0,b=C,v=k;for(n=e.lastIndexOf($),n<0&&(n=0),i=0;i<n;++i)e.charCodeAt(i)>=128&&a("not-basic"),f.push(e.charCodeAt(i));for(r=n>0?n+1:0;r<y;){for(o=g,s=1,p=S;r>=y&&a("invalid-input"),c=l(e.charCodeAt(r++)),(c>=S||c>A((w-g)/s))&&a("overflow"),g+=c*s,m=p<=v?x:p>=v+I?I:p-v,!(c<m);p+=S)h=S-m,s>A(w/h)&&a("overflow"),s*=h;t=f.length+1,v=u(g-o,t,0==o),A(g/t)>w-b&&a("overflow"),b+=A(g/t),g%=t,f.splice(g++,0,b)}return d(f)}function f(e){var t,n,i,r,o,s,p,d,l,h,f,y,g,b,v,T=[];for(e=c(e),y=e.length,t=C,n=0,o=k,s=0;s<y;++s)f=e[s],f<128&&T.push(P(f));for(i=r=T.length,r&&T.push($);i<y;){for(p=w,s=0;s<y;++s)f=e[s],f>=t&&f<p&&(p=f);for(g=i+1,p-t>A((w-n)/g)&&a("overflow"),n+=(p-t)*g,t=p,s=0;s<y;++s)if(f=e[s],f<t&&++n>w&&a("overflow"),f==t){for(d=n,l=S;h=l<=o?x:l>=o+I?I:l-o,!(d<h);l+=S)v=d-h,b=S-h,T.push(P(m(h+v%b,0))),d=A(v/b);T.push(P(m(d,0))),o=u(n,g,i==r),n=0,++i}++n,++t}return T.join("")}function y(e){return p(e,function(e){return O.test(e)?h(e.slice(4).toLowerCase()):e})}function g(e){return p(e,function(e){return E.test(e)?"xn--"+f(e):e})}var b=("object"==typeof t&&t&&!t.nodeType&&t,"object"==typeof e&&e&&!e.nodeType&&e,"object"==typeof r&&r);b.global!==b&&b.window!==b&&b.self!==b||(o=b);var v,w=2147483647,S=36,x=1,I=26,T=38,R=700,k=72,C=128,$="-",O=/^xn--/,E=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,j={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},N=S-x,A=Math.floor,P=String.fromCharCode;v={version:"1.3.2",ucs2:{decode:c,encode:d},decode:h,encode:f,toASCII:g,toUnicode:y},i=function(){return v}.call(t,n,t,e),!(void 0!==i&&(e.exports=i))}(this)}).call(t,n(34)(e),function(){return this}())},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){"use strict";e.exports={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}}},function(e,t,n){"use strict";t.decode=t.parse=n(37),t.encode=t.stringify=n(38)},function(e,t){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,i,r){t=t||"&",i=i||"=";var o={};if("string"!=typeof e||0===e.length)return o;var a=/\+/g;e=e.split(t);var s=1e3;r&&"number"==typeof r.maxKeys&&(s=r.maxKeys);var p=e.length;s>0&&p>s&&(p=s);for(var c=0;c<p;++c){var d,l,m,u,h=e[c].replace(a,"%20"),f=h.indexOf(i);f>=0?(d=h.substr(0,f),l=h.substr(f+1)):(d=h,l=""),m=decodeURIComponent(d),u=decodeURIComponent(l),n(o,m)?Array.isArray(o[m])?o[m].push(u):o[m]=[o[m],u]:o[m]=u}return o}},function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,i,r){return t=t||"&",i=i||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(r){var o=encodeURIComponent(n(r))+i;return Array.isArray(e[r])?e[r].map(function(e){return o+encodeURIComponent(n(e))}).join(t):o+encodeURIComponent(n(e[r]))}).join(t):r?encodeURIComponent(n(r))+i+encodeURIComponent(n(e)):""}},function(e,t,n){var i=n(8),r=e.exports;for(var o in i)i.hasOwnProperty(o)&&(r[o]=i[o]);r.request=function(e,t){return e||(e={}),e.scheme="https",e.protocol="https:",i.request.call(this,e,t)}},function(e,t){"use strict";e.exports.HOST="localhost",e.exports.PORT=9222},function(e,t){"use strict";function n(e,t,n){var r=e.get(t,function(e){var t="";e.on("data",function(e){t+=e}),e.on("end",function(){200===e.statusCode?n(null,t):n(new Error(t))})});r.setTimeout(i,function(){this.abort()}),r.on("error",function(e){n(e)})}var i=1e4;e.exports=n},function(e,t){e.exports={version:{major:"1",minor:"2"},domains:[{domain:"Inspector",experimental:!0,types:[],commands:[{name:"enable",description:"Enables inspector domain notifications."},{name:"disable",description:"Disables inspector domain notifications."}],events:[{name:"detached",description:"Fired when remote debugging connection is about to be terminated. Contains detach reason.",parameters:[{name:"reason",type:"string",description:"The reason why connection has been terminated."}]},{name:"targetCrashed",description:"Fired when debugging target has crashed"}]},{domain:"Memory",experimental:!0,types:[{id:"PressureLevel",type:"string",enum:["moderate","critical"],description:"Memory pressure level."}],commands:[{name:"getDOMCounters",returns:[{name:"documents",type:"integer"},{name:"nodes",type:"integer"},{name:"jsEventListeners",type:"integer"}]},{name:"setPressureNotificationsSuppressed",description:"Enable/disable suppressing memory pressure notifications in all processes.",parameters:[{name:"suppressed",type:"boolean",description:"If true, memory pressure notifications will be suppressed."}]},{name:"simulatePressureNotification",description:"Simulate a memory pressure notification in all processes.",parameters:[{name:"level",$ref:"PressureLevel",description:"Memory pressure level of the notification."}]}]},{domain:"Page",description:"Actions and events related to the inspected page belong to the page domain.",dependencies:["Debugger","DOM","Network"],types:[{id:"ResourceType",type:"string",enum:["Document","Stylesheet","Image","Media","Font","Script","TextTrack","XHR","Fetch","EventSource","WebSocket","Manifest","Other"],description:"Resource type as it was perceived by the rendering engine."},{id:"FrameId",type:"string",description:"Unique frame identifier."},{id:"Frame",type:"object",description:"Information about the Frame on the page.",properties:[{name:"id",type:"string",description:"Frame unique identifier."},{name:"parentId",type:"string",optional:!0,description:"Parent frame identifier."},{name:"loaderId",$ref:"Network.LoaderId",description:"Identifier of the loader associated with this frame."},{name:"name",type:"string",optional:!0,description:"Frame's name as specified in the tag."},{name:"url",type:"string",description:"Frame document's URL."},{name:"securityOrigin",type:"string",description:"Frame document's security origin."},{name:"mimeType",type:"string",description:"Frame document's mimeType as determined by the browser."}]},{id:"FrameResource",type:"object",description:"Information about the Resource on the page.",properties:[{name:"url",type:"string",description:"Resource URL."},{name:"type",$ref:"ResourceType",description:"Type of this resource."},{name:"mimeType",type:"string",description:"Resource mimeType as determined by the browser."},{name:"lastModified",$ref:"Network.TimeSinceEpoch",description:"last-modified timestamp as reported by server.",optional:!0},{name:"contentSize",type:"number",description:"Resource content size.",optional:!0},{name:"failed",type:"boolean",optional:!0,description:"True if the resource failed to load."},{name:"canceled",type:"boolean",optional:!0,description:"True if the resource was canceled during loading."}],experimental:!0},{id:"FrameResourceTree",type:"object",description:"Information about the Frame hierarchy along with their cached resources.",properties:[{name:"frame",$ref:"Frame",description:"Frame information for this tree item."},{name:"childFrames",type:"array",optional:!0,items:{$ref:"FrameResourceTree"},description:"Child frames."},{name:"resources",type:"array",items:{$ref:"FrameResource"},description:"Information about frame resources."}],experimental:!0},{id:"ScriptIdentifier",type:"string",description:"Unique script identifier.",experimental:!0},{id:"TransitionType",type:"string",description:"Transition type.",experimental:!0,enum:["link","typed","auto_bookmark","auto_subframe","manual_subframe","generated","auto_toplevel","form_submit","reload","keyword","keyword_generated","other"]},{id:"NavigationEntry",type:"object",description:"Navigation history entry.",properties:[{name:"id",type:"integer",description:"Unique id of the navigation history entry."},{name:"url",type:"string",description:"URL of the navigation history entry."},{name:"userTypedURL",type:"string",description:"URL that the user typed in the url bar."},{name:"title",type:"string",description:"Title of the navigation history entry."},{name:"transitionType",$ref:"TransitionType",description:"Transition type."}],experimental:!0},{id:"ScreencastFrameMetadata",type:"object",description:"Screencast frame metadata.",properties:[{name:"offsetTop",type:"number",experimental:!0,description:"Top offset in DIP."},{name:"pageScaleFactor",type:"number",experimental:!0,description:"Page scale factor."},{name:"deviceWidth",type:"number",experimental:!0,description:"Device screen width in DIP."},{name:"deviceHeight",type:"number",experimental:!0,description:"Device screen height in DIP."},{name:"scrollOffsetX",type:"number",experimental:!0,description:"Position of horizontal scroll in CSS pixels."},{name:"scrollOffsetY",type:"number",experimental:!0,description:"Position of vertical scroll in CSS pixels."},{name:"timestamp",$ref:"Network.TimeSinceEpoch",optional:!0,experimental:!0,description:"Frame swap timestamp."}],experimental:!0},{id:"DialogType",description:"Javascript dialog type.",type:"string",enum:["alert","confirm","prompt","beforeunload"],experimental:!0},{id:"AppManifestError",description:"Error while paring app manifest.",type:"object",properties:[{name:"message",type:"string",description:"Error message."},{name:"critical",type:"integer",description:"If criticial, this is a non-recoverable parse error."},{name:"line",type:"integer",description:"Error line."},{name:"column",type:"integer",description:"Error column."}],experimental:!0},{id:"NavigationResponse",description:"Proceed: allow the navigation; Cancel: cancel the navigation; CancelAndIgnore: cancels the navigation and makes the requester of the navigation acts like the request was never made.",type:"string",enum:["Proceed","Cancel","CancelAndIgnore"],experimental:!0},{id:"LayoutViewport",type:"object",description:"Layout viewport position and dimensions.",experimental:!0,properties:[{name:"pageX",type:"integer",description:"Horizontal offset relative to the document (CSS pixels)."},{name:"pageY",type:"integer",description:"Vertical offset relative to the document (CSS pixels)."},{name:"clientWidth",type:"integer",description:"Width (CSS pixels), excludes scrollbar if present."},{name:"clientHeight",type:"integer",description:"Height (CSS pixels), excludes scrollbar if present."}]},{id:"VisualViewport",type:"object",description:"Visual viewport position, dimensions, and scale.",experimental:!0,properties:[{name:"offsetX",type:"number",description:"Horizontal offset relative to the layout viewport (CSS pixels)."},{name:"offsetY",type:"number",description:"Vertical offset relative to the layout viewport (CSS pixels)."},{name:"pageX",type:"number",description:"Horizontal offset relative to the document (CSS pixels)."},{name:"pageY",type:"number",description:"Vertical offset relative to the document (CSS pixels)."},{name:"clientWidth",type:"number",description:"Width (CSS pixels), excludes scrollbar if present."},{name:"clientHeight",type:"number",description:"Height (CSS pixels), excludes scrollbar if present."},{name:"scale",type:"number",description:"Scale relative to the ideal viewport (size at width=device-width)."}]},{id:"Viewport",type:"object",description:"Viewport for capturing screenshot.",experimental:!0,properties:[{name:"x",type:"number",description:"X offset in CSS pixels."},{name:"y",type:"number",description:"Y offset in CSS pixels"},{name:"width",type:"number",description:"Rectangle width in CSS pixels"},{name:"height",type:"number",description:"Rectangle height in CSS pixels"},{name:"scale",type:"number",description:"Page scale factor."}]}],commands:[{name:"enable",description:"Enables page domain notifications."},{name:"disable",description:"Disables page domain notifications."},{name:"addScriptToEvaluateOnLoad",parameters:[{name:"scriptSource",type:"string"}],returns:[{name:"identifier",$ref:"ScriptIdentifier",description:"Identifier of the added script."}],deprecated:!0,description:"Deprecated, please use addScriptToEvaluateOnNewDocument instead.",experimental:!0},{name:"removeScriptToEvaluateOnLoad",parameters:[{name:"identifier",$ref:"ScriptIdentifier"}],deprecated:!0,description:"Deprecated, please use removeScriptToEvaluateOnNewDocument instead.",experimental:!0},{name:"addScriptToEvaluateOnNewDocument",parameters:[{name:"source",type:"string"}],returns:[{name:"identifier",$ref:"ScriptIdentifier",description:"Identifier of the added script."}],description:"Evaluates given script in every frame upon creation (before loading frame's scripts).",experimental:!0},{name:"removeScriptToEvaluateOnNewDocument",parameters:[{name:"identifier",$ref:"ScriptIdentifier"}],description:"Removes given script from the list.",experimental:!0},{name:"setAutoAttachToCreatedPages",parameters:[{name:"autoAttach",type:"boolean",description:"If true, browser will open a new inspector window for every page created from this one."}],description:"Controls whether browser will open a new inspector window for connected pages.",experimental:!0},{name:"reload",parameters:[{name:"ignoreCache",type:"boolean",optional:!0,description:"If true, browser cache is ignored (as if the user pressed Shift+refresh)."},{name:"scriptToEvaluateOnLoad",type:"string",optional:!0,description:"If set, the script will be injected into all frames of the inspected page after reload."}],description:"Reloads given page optionally ignoring the cache."},{name:"navigate",parameters:[{name:"url",type:"string",description:"URL to navigate the page to."},{name:"referrer",type:"string",optional:!0,experimental:!0,description:"Referrer URL."},{name:"transitionType",$ref:"TransitionType",optional:!0,experimental:!0,description:"Intended transition type."}],returns:[{name:"frameId",$ref:"FrameId",experimental:!0,description:"Frame id that will be navigated."}],description:"Navigates current page to the given URL."},{name:"stopLoading",description:"Force the page stop all navigations and pending resource fetches.",experimental:!0},{name:"getNavigationHistory",returns:[{name:"currentIndex",type:"integer",description:"Index of the current navigation history entry."},{name:"entries",type:"array",items:{$ref:"NavigationEntry"},description:"Array of navigation history entries."}],description:"Returns navigation history for the current page.",experimental:!0},{name:"navigateToHistoryEntry",parameters:[{name:"entryId",type:"integer",description:"Unique id of the entry to navigate to."}],description:"Navigates current page to the given history entry.",experimental:!0},{name:"getCookies",returns:[{name:"cookies",type:"array",items:{$ref:"Network.Cookie"},description:"Array of cookie objects."}],description:"Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",experimental:!0,redirect:"Network"},{name:"deleteCookie",parameters:[{name:"cookieName",type:"string",description:"Name of the cookie to remove."},{name:"url",type:"string",description:"URL to match cooke domain and path."}],description:"Deletes browser cookie with given name, domain and path.",experimental:!0,redirect:"Network"},{name:"getResourceTree",description:"Returns present frame / resource tree structure.",returns:[{name:"frameTree",$ref:"FrameResourceTree",description:"Present frame / resource tree structure."}],experimental:!0},{name:"getResourceContent",description:"Returns content of the given resource.",parameters:[{name:"frameId",$ref:"FrameId",description:"Frame id to get resource for."},{name:"url",type:"string",description:"URL of the resource to get content for."}],returns:[{name:"content",type:"string",description:"Resource content."},{name:"base64Encoded",type:"boolean",description:"True, if content was served as base64."}],experimental:!0},{name:"searchInResource",description:"Searches for given string in resource content.",parameters:[{name:"frameId",$ref:"FrameId",description:"Frame id for resource to search in."},{name:"url",type:"string",description:"URL of the resource to search in."},{name:"query",type:"string",description:"String to search for."},{name:"caseSensitive",type:"boolean",optional:!0,description:"If true, search is case sensitive."},{name:"isRegex",type:"boolean",optional:!0,description:"If true, treats string parameter as regex."}],returns:[{name:"result",type:"array",items:{$ref:"Debugger.SearchMatch"},description:"List of search matches."}],experimental:!0},{name:"setDocumentContent",description:"Sets given markup as the document's HTML.",parameters:[{name:"frameId",$ref:"FrameId",description:"Frame id to set HTML for."},{name:"html",type:"string",description:"HTML content to set."}],experimental:!0},{name:"setDeviceMetricsOverride",description:'Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).',
parameters:[{name:"width",type:"integer",description:"Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override."},{name:"height",type:"integer",description:"Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override."},{name:"deviceScaleFactor",type:"number",description:"Overriding device scale factor value. 0 disables the override."},{name:"mobile",type:"boolean",description:"Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more."},{name:"fitWindow",type:"boolean",optional:!0,description:"Whether a view that exceeds the available browser window area should be scaled down to fit."},{name:"scale",type:"number",optional:!0,description:"Scale to apply to resulting view image. Ignored in |fitWindow| mode."},{name:"offsetX",type:"number",optional:!0,description:"X offset to shift resulting view image by. Ignored in |fitWindow| mode."},{name:"offsetY",type:"number",optional:!0,description:"Y offset to shift resulting view image by. Ignored in |fitWindow| mode."},{name:"screenWidth",type:"integer",optional:!0,description:"Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"screenHeight",type:"integer",optional:!0,description:"Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"positionX",type:"integer",optional:!0,description:"Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"positionY",type:"integer",optional:!0,description:"Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"screenOrientation",$ref:"Emulation.ScreenOrientation",optional:!0,description:"Screen orientation override."}],redirect:"Emulation",experimental:!0},{name:"clearDeviceMetricsOverride",description:"Clears the overriden device metrics.",redirect:"Emulation",experimental:!0},{name:"setGeolocationOverride",description:"Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.",parameters:[{name:"latitude",type:"number",optional:!0,description:"Mock latitude"},{name:"longitude",type:"number",optional:!0,description:"Mock longitude"},{name:"accuracy",type:"number",optional:!0,description:"Mock accuracy"}],redirect:"Emulation"},{name:"clearGeolocationOverride",description:"Clears the overriden Geolocation Position and Error.",redirect:"Emulation"},{name:"setDeviceOrientationOverride",description:"Overrides the Device Orientation.",parameters:[{name:"alpha",type:"number",description:"Mock alpha"},{name:"beta",type:"number",description:"Mock beta"},{name:"gamma",type:"number",description:"Mock gamma"}],redirect:"DeviceOrientation",experimental:!0},{name:"clearDeviceOrientationOverride",description:"Clears the overridden Device Orientation.",redirect:"DeviceOrientation",experimental:!0},{name:"setTouchEmulationEnabled",parameters:[{name:"enabled",type:"boolean",description:"Whether the touch event emulation should be enabled."},{name:"configuration",type:"string",enum:["mobile","desktop"],optional:!0,description:"Touch/gesture events configuration. Default: current platform."}],description:"Toggles mouse event-based touch event emulation.",experimental:!0,redirect:"Emulation"},{name:"captureScreenshot",description:"Capture page screenshot.",parameters:[{name:"format",type:"string",optional:!0,enum:["jpeg","png"],description:"Image compression format (defaults to png)."},{name:"quality",type:"integer",optional:!0,description:"Compression quality from range [0..100] (jpeg only)."},{name:"clip",$ref:"Viewport",optional:!0,description:"Capture the screenshot of a given region only.",experimental:!0},{name:"fromSurface",type:"boolean",optional:!0,description:"Capture the screenshot from the surface, rather than the view. Defaults to true.",experimental:!0}],returns:[{name:"data",type:"string",description:"Base64-encoded image data."}],experimental:!0},{name:"printToPDF",description:"Print page as PDF.",parameters:[{name:"landscape",type:"boolean",optional:!0,description:"Paper orientation. Defaults to false."},{name:"displayHeaderFooter",type:"boolean",optional:!0,description:"Display header and footer. Defaults to false."},{name:"printBackground",type:"boolean",optional:!0,description:"Print background graphics. Defaults to false."},{name:"scale",type:"number",optional:!0,description:"Scale of the webpage rendering. Defaults to 1."},{name:"paperWidth",type:"number",optional:!0,description:"Paper width in inches. Defaults to 8.5 inches."},{name:"paperHeight",type:"number",optional:!0,description:"Paper height in inches. Defaults to 11 inches."},{name:"marginTop",type:"number",optional:!0,description:"Top margin in inches. Defaults to 1cm (~0.4 inches)."},{name:"marginBottom",type:"number",optional:!0,description:"Bottom margin in inches. Defaults to 1cm (~0.4 inches)."},{name:"marginLeft",type:"number",optional:!0,description:"Left margin in inches. Defaults to 1cm (~0.4 inches)."},{name:"marginRight",type:"number",optional:!0,description:"Right margin in inches. Defaults to 1cm (~0.4 inches)."},{name:"pageRanges",type:"string",optional:!0,description:"Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages."}],returns:[{name:"data",type:"string",description:"Base64-encoded pdf data."}],experimental:!0},{name:"startScreencast",description:"Starts sending each frame using the <code>screencastFrame</code> event.",parameters:[{name:"format",type:"string",optional:!0,enum:["jpeg","png"],description:"Image compression format."},{name:"quality",type:"integer",optional:!0,description:"Compression quality from range [0..100]."},{name:"maxWidth",type:"integer",optional:!0,description:"Maximum screenshot width."},{name:"maxHeight",type:"integer",optional:!0,description:"Maximum screenshot height."},{name:"everyNthFrame",type:"integer",optional:!0,description:"Send every n-th frame."}],experimental:!0},{name:"stopScreencast",description:"Stops sending each frame in the <code>screencastFrame</code>.",experimental:!0},{name:"screencastFrameAck",description:"Acknowledges that a screencast frame has been received by the frontend.",parameters:[{name:"sessionId",type:"integer",description:"Frame number."}],experimental:!0},{name:"handleJavaScriptDialog",description:"Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).",parameters:[{name:"accept",type:"boolean",description:"Whether to accept or dismiss the dialog."},{name:"promptText",type:"string",optional:!0,description:"The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog."}]},{name:"getAppManifest",experimental:!0,returns:[{name:"url",type:"string",description:"Manifest location."},{name:"errors",type:"array",items:{$ref:"AppManifestError"}},{name:"data",type:"string",optional:!0,description:"Manifest content."}]},{name:"requestAppBanner",experimental:!0},{name:"setControlNavigations",parameters:[{name:"enabled",type:"boolean"}],description:"Toggles navigation throttling which allows programatic control over navigation and redirect response.",experimental:!0},{name:"processNavigation",parameters:[{name:"response",$ref:"NavigationResponse"},{name:"navigationId",type:"integer"}],description:"Should be sent in response to a navigationRequested or a redirectRequested event, telling the browser how to handle the navigation.",experimental:!0},{name:"getLayoutMetrics",description:"Returns metrics relating to the layouting of the page, such as viewport bounds/scale.",experimental:!0,returns:[{name:"layoutViewport",$ref:"LayoutViewport",description:"Metrics relating to the layout viewport."},{name:"visualViewport",$ref:"VisualViewport",description:"Metrics relating to the visual viewport."},{name:"contentSize",$ref:"DOM.Rect",description:"Size of scrollable area."}]},{name:"createIsolatedWorld",description:"Creates an isolated world for the given frame.",experimental:!0,parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame in which the isolated world should be created."},{name:"worldName",type:"string",optional:!0,description:"An optional name which is reported in the Execution Context."},{name:"grantUniveralAccess",type:"boolean",optional:!0,description:"Whether or not universal access should be granted to the isolated world. This is a powerful option, use with caution."}],returns:[{name:"executionContextId",$ref:"Runtime.ExecutionContextId",description:"Execution context of the isolated world."}]}],events:[{name:"domContentEventFired",parameters:[{name:"timestamp",$ref:"Network.MonotonicTime"}]},{name:"loadEventFired",parameters:[{name:"timestamp",$ref:"Network.MonotonicTime"}]},{name:"frameAttached",description:"Fired when frame has been attached to its parent.",parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame that has been attached."},{name:"parentFrameId",$ref:"FrameId",description:"Parent frame identifier."},{name:"stack",$ref:"Runtime.StackTrace",optional:!0,description:"JavaScript stack trace of when frame was attached, only set if frame initiated from script.",experimental:!0}]},{name:"frameNavigated",description:"Fired once navigation of the frame has completed. Frame is now associated with the new loader.",parameters:[{name:"frame",$ref:"Frame",description:"Frame object."}]},{name:"frameDetached",description:"Fired when frame has been detached from its parent.",parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame that has been detached."}]},{name:"frameStartedLoading",description:"Fired when frame has started loading.",parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame that has started loading."}],experimental:!0},{name:"frameStoppedLoading",description:"Fired when frame has stopped loading.",parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame that has stopped loading."}],experimental:!0},{name:"frameScheduledNavigation",description:"Fired when frame schedules a potential navigation.",parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame that has scheduled a navigation."},{name:"delay",type:"number",description:"Delay (in seconds) until the navigation is scheduled to begin. The navigation is not guaranteed to start."}],experimental:!0},{name:"frameClearedScheduledNavigation",description:"Fired when frame no longer has a scheduled navigation.",parameters:[{name:"frameId",$ref:"FrameId",description:"Id of the frame that has cleared its scheduled navigation."}],experimental:!0},{name:"frameResized",experimental:!0},{name:"javascriptDialogOpening",description:"Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open.",parameters:[{name:"message",type:"string",description:"Message that will be displayed by the dialog."},{name:"type",$ref:"DialogType",description:"Dialog type."}]},{name:"javascriptDialogClosed",description:"Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed.",parameters:[{name:"result",type:"boolean",description:"Whether dialog was confirmed."}]},{name:"screencastFrame",description:"Compressed image data requested by the <code>startScreencast</code>.",parameters:[{name:"data",type:"string",description:"Base64-encoded compressed image."},{name:"metadata",$ref:"ScreencastFrameMetadata",description:"Screencast frame metadata."},{name:"sessionId",type:"integer",description:"Frame number."}],experimental:!0},{name:"screencastVisibilityChanged",description:"Fired when the page with currently enabled screencast was shown or hidden </code>.",parameters:[{name:"visible",type:"boolean",description:"True if the page is visible."}],experimental:!0},{name:"interstitialShown",description:"Fired when interstitial page was shown"},{name:"interstitialHidden",description:"Fired when interstitial page was hidden"},{name:"navigationRequested",description:"Fired when a navigation is started if navigation throttles are enabled.  The navigation will be deferred until processNavigation is called.",parameters:[{name:"isInMainFrame",type:"boolean",description:"Whether the navigation is taking place in the main frame or in a subframe."},{name:"isRedirect",type:"boolean",description:"Whether the navigation has encountered a server redirect or not."},{name:"navigationId",type:"integer"},{name:"url",type:"string",description:"URL of requested navigation."}]}]},{domain:"Overlay",description:"This domain provides various functionality related to drawing atop the inspected page.",dependencies:["DOM","Page","Runtime"],experimental:!0,types:[{id:"HighlightConfig",type:"object",properties:[{name:"showInfo",type:"boolean",optional:!0,description:"Whether the node info tooltip should be shown (default: false)."},{name:"showRulers",type:"boolean",optional:!0,description:"Whether the rulers should be shown (default: false)."},{name:"showExtensionLines",type:"boolean",optional:!0,description:"Whether the extension lines from node to the rulers should be shown (default: false)."},{name:"displayAsMaterial",type:"boolean",optional:!0},{name:"contentColor",$ref:"DOM.RGBA",optional:!0,description:"The content box highlight fill color (default: transparent)."},{name:"paddingColor",$ref:"DOM.RGBA",optional:!0,description:"The padding highlight fill color (default: transparent)."},{name:"borderColor",$ref:"DOM.RGBA",optional:!0,description:"The border highlight fill color (default: transparent)."},{name:"marginColor",$ref:"DOM.RGBA",optional:!0,description:"The margin highlight fill color (default: transparent)."},{name:"eventTargetColor",$ref:"DOM.RGBA",optional:!0,description:"The event target element highlight fill color (default: transparent)."},{name:"shapeColor",$ref:"DOM.RGBA",optional:!0,description:"The shape outside fill color (default: transparent)."},{name:"shapeMarginColor",$ref:"DOM.RGBA",optional:!0,description:"The shape margin fill color (default: transparent)."},{name:"selectorList",type:"string",optional:!0,description:"Selectors to highlight relevant nodes."}],description:"Configuration data for the highlighting of page elements."},{id:"InspectMode",type:"string",enum:["searchForNode","searchForUAShadowDOM","none"]}],commands:[{name:"enable",description:"Enables domain notifications."},{name:"disable",description:"Disables domain notifications."},{name:"setShowPaintRects",description:"Requests that backend shows paint rectangles",parameters:[{name:"result",type:"boolean",description:"True for showing paint rectangles"}]},{name:"setShowDebugBorders",description:"Requests that backend shows debug borders on layers",parameters:[{name:"show",type:"boolean",description:"True for showing debug borders"}]},{name:"setShowFPSCounter",description:"Requests that backend shows the FPS counter",parameters:[{name:"show",type:"boolean",description:"True for showing the FPS counter"}]},{name:"setShowScrollBottleneckRects",description:"Requests that backend shows scroll bottleneck rects",parameters:[{name:"show",type:"boolean",description:"True for showing scroll bottleneck rects"}]},{name:"setShowViewportSizeOnResize",description:"Paints viewport size upon main frame resize.",parameters:[{name:"show",type:"boolean",description:"Whether to paint size or not."}]},{name:"setPausedInDebuggerMessage",parameters:[{name:"message",type:"string",optional:!0,description:"The message to display, also triggers resume and step over controls."}]},{name:"setSuspended",parameters:[{name:"suspended",type:"boolean",description:"Whether overlay should be suspended and not consume any resources until resumed."}]},{name:"setInspectMode",description:"Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection.",parameters:[{name:"mode",$ref:"InspectMode",description:"Set an inspection mode."},{name:"highlightConfig",$ref:"HighlightConfig",optional:!0,description:"A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>."}]},{name:"highlightRect",description:"Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.",parameters:[{name:"x",type:"integer",description:"X coordinate"},{name:"y",type:"integer",description:"Y coordinate"},{name:"width",type:"integer",description:"Rectangle width"},{name:"height",type:"integer",description:"Rectangle height"},{name:"color",$ref:"DOM.RGBA",optional:!0,description:"The highlight fill color (default: transparent)."},{name:"outlineColor",$ref:"DOM.RGBA",optional:!0,description:"The highlight outline color (default: transparent)."}]},{name:"highlightQuad",description:"Highlights given quad. Coordinates are absolute with respect to the main frame viewport.",parameters:[{name:"quad",$ref:"DOM.Quad",description:"Quad to highlight"},{name:"color",$ref:"DOM.RGBA",optional:!0,description:"The highlight fill color (default: transparent)."},{name:"outlineColor",$ref:"DOM.RGBA",optional:!0,description:"The highlight outline color (default: transparent)."}]},{name:"highlightNode",description:"Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.",parameters:[{name:"highlightConfig",$ref:"HighlightConfig",description:"A descriptor for the highlight appearance."},{name:"nodeId",$ref:"DOM.NodeId",optional:!0,description:"Identifier of the node to highlight."},{name:"backendNodeId",$ref:"DOM.BackendNodeId",optional:!0,description:"Identifier of the backend node to highlight."},{name:"objectId",$ref:"Runtime.RemoteObjectId",optional:!0,description:"JavaScript object id of the node to be highlighted."}]},{name:"highlightFrame",description:"Highlights owner element of the frame with given id.",parameters:[{name:"frameId",$ref:"Page.FrameId",description:"Identifier of the frame to highlight."},{name:"contentColor",$ref:"DOM.RGBA",optional:!0,description:"The content box highlight fill color (default: transparent)."},{name:"contentOutlineColor",$ref:"DOM.RGBA",optional:!0,description:"The content box highlight outline color (default: transparent)."}]},{name:"hideHighlight",description:"Hides any highlight."},{name:"getHighlightObjectForTest",description:"For testing.",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"Id of the node to get highlight object for."}],returns:[{name:"highlight",type:"object",description:"Highlight data for the node."}]}],events:[{name:"nodeHighlightRequested",description:"Fired when the node should be highlighted. This happens after call to <code>setInspectMode</code>.",parameters:[{name:"nodeId",$ref:"DOM.NodeId"}]},{name:"inspectNodeRequested",description:"Fired when the node should be inspected. This happens after call to <code>setInspectMode</code> or when user manually inspects an element.",parameters:[{name:"backendNodeId",$ref:"DOM.BackendNodeId",description:"Id of the node to inspect."}]}]},{domain:"Emulation",description:"This domain emulates different environments for the page.",dependencies:["DOM"],types:[{id:"ScreenOrientation",type:"object",description:"Screen orientation.",properties:[{name:"type",type:"string",enum:["portraitPrimary","portraitSecondary","landscapePrimary","landscapeSecondary"],description:"Orientation type."},{name:"angle",type:"integer",description:"Orientation angle."}]},{id:"VirtualTimePolicy",type:"string",enum:["advance","pause","pauseIfNetworkFetchesPending"],experimental:!0,description:"advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to allow the next delayed task (if any) to run; pause: The virtual time base may not advance; pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending resource fetches."}],commands:[{name:"setDeviceMetricsOverride",description:'Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).',parameters:[{name:"width",type:"integer",description:"Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override."},{name:"height",type:"integer",description:"Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override."},{name:"deviceScaleFactor",type:"number",description:"Overriding device scale factor value. 0 disables the override."},{name:"mobile",type:"boolean",description:"Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more."},{name:"fitWindow",type:"boolean",optional:!0,description:"Whether a view that exceeds the available browser window area should be scaled down to fit."},{name:"scale",type:"number",optional:!0,experimental:!0,description:"Scale to apply to resulting view image. Ignored in |fitWindow| mode."},{name:"offsetX",type:"number",optional:!0,deprecated:!0,experimental:!0,description:"Not used."},{name:"offsetY",type:"number",optional:!0,deprecated:!0,experimental:!0,description:"Not used."},{name:"screenWidth",type:"integer",optional:!0,experimental:!0,description:"Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"screenHeight",type:"integer",optional:!0,experimental:!0,description:"Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"positionX",type:"integer",optional:!0,experimental:!0,description:"Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"positionY",type:"integer",optional:!0,experimental:!0,description:"Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|."},{name:"screenOrientation",$ref:"ScreenOrientation",optional:!0,description:"Screen orientation override."}]},{name:"clearDeviceMetricsOverride",description:"Clears the overriden device metrics."},{name:"resetPageScaleFactor",experimental:!0,description:"Requests that page scale factor is reset to initial values."},{name:"setPageScaleFactor",description:"Sets a specified page scale factor.",experimental:!0,parameters:[{name:"pageScaleFactor",type:"number",description:"Page scale factor."}]},{name:"setVisibleSize",description:"Deprecated, does nothing. Please use setDeviceMetricsOverride instead.",experimental:!0,deprecated:!0,parameters:[{name:"width",type:"integer",description:"Frame width (DIP)."},{name:"height",type:"integer",description:"Frame height (DIP)."}]},{name:"setScriptExecutionDisabled",description:"Switches script execution in the page.",experimental:!0,parameters:[{name:"value",type:"boolean",description:"Whether script execution should be disabled in the page."}]},{name:"setGeolocationOverride",description:"Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.",experimental:!0,parameters:[{name:"latitude",type:"number",optional:!0,description:"Mock latitude"},{name:"longitude",type:"number",optional:!0,description:"Mock longitude"},{name:"accuracy",type:"number",optional:!0,description:"Mock accuracy"}]},{name:"clearGeolocationOverride",description:"Clears the overriden Geolocation Position and Error.",experimental:!0},{name:"setTouchEmulationEnabled",parameters:[{name:"enabled",type:"boolean",description:"Whether the touch event emulation should be enabled."},{name:"configuration",type:"string",enum:["mobile","desktop"],optional:!0,description:"Touch/gesture events configuration. Default: current platform."}],description:"Toggles mouse event-based touch event emulation."},{name:"setEmulatedMedia",parameters:[{name:"media",type:"string",description:"Media type to emulate. Empty string disables the override."}],description:"Emulates the given media for CSS media queries."},{name:"setCPUThrottlingRate",parameters:[{name:"rate",type:"number",description:"Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc)."}],experimental:!0,description:"Enables CPU throttling to emulate slow CPUs."},{name:"canEmulate",description:"Tells whether emulation is supported.",returns:[{name:"result",type:"boolean",description:"True if emulation is supported."}],experimental:!0},{name:"setVirtualTimePolicy",description:"Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets the current virtual time policy.  Note this supersedes any previous time budget.",parameters:[{name:"policy",$ref:"VirtualTimePolicy"},{name:"budget",type:"integer",optional:!0,description:"If set, after this many virtual milliseconds have elapsed virtual time will be paused and a virtualTimeBudgetExpired event is sent."}],experimental:!0},{name:"setDefaultBackgroundColorOverride",description:"Sets or clears an override of the default background color of the frame. This override is used if the content does not specify one.",parameters:[{name:"color",$ref:"DOM.RGBA",optional:!0,description:"RGBA of the default background color. If not specified, any existing override will be cleared."}],experimental:!0}],events:[{name:"virtualTimeBudgetExpired",experimental:!0,description:"Notification sent after the virual time budget for the current VirtualTimePolicy has run out."}]},{domain:"Security",description:"Security",experimental:!0,types:[{id:"CertificateId",type:"integer",description:"An internal certificate ID value."},{id:"MixedContentType",type:"string",enum:["blockable","optionally-blockable","none"],description:"A description of mixed content (HTTP resources on HTTPS pages), as defined by https://www.w3.org/TR/mixed-content/#categories"},{id:"SecurityState",type:"string",enum:["unknown","neutral","insecure","warning","secure","info"],description:"The security level of a page or resource."},{id:"SecurityStateExplanation",type:"object",properties:[{name:"securityState",$ref:"SecurityState",description:"Security state representing the severity of the factor being explained."},{name:"summary",type:"string",description:"Short phrase describing the type of factor."},{name:"description",type:"string",description:"Full text explanation of the factor."},{name:"hasCertificate",type:"boolean",description:"True if the page has a certificate."},{name:"mixedContentType",$ref:"MixedContentType",description:"The type of mixed content described by the explanation."}],description:"An explanation of an factor contributing to the security state."},{id:"InsecureContentStatus",type:"object",properties:[{name:"ranMixedContent",type:"boolean",description:"True if the page was loaded over HTTPS and ran mixed (HTTP) content such as scripts."},{name:"displayedMixedContent",type:"boolean",description:"True if the page was loaded over HTTPS and displayed mixed (HTTP) content such as images."},{name:"containedMixedForm",type:"boolean",description:"True if the page was loaded over HTTPS and contained a form targeting an insecure url."},{name:"ranContentWithCertErrors",type:"boolean",description:"True if the page was loaded over HTTPS without certificate errors, and ran content such as scripts that were loaded with certificate errors."},{name:"displayedContentWithCertErrors",type:"boolean",description:"True if the page was loaded over HTTPS without certificate errors, and displayed content such as images that were loaded with certificate errors."},{name:"ranInsecureContentStyle",$ref:"SecurityState",description:"Security state representing a page that ran insecure content."},{name:"displayedInsecureContentStyle",$ref:"SecurityState",description:"Security state representing a page that displayed insecure content."}],description:"Information about insecure content on the page."},{id:"CertificateErrorAction",type:"string",enum:["continue","cancel"],description:"The action to take when a certificate error occurs. continue will continue processing the request and cancel will cancel the request."}],commands:[{name:"enable",description:"Enables tracking security state changes."},{name:"disable",description:"Disables tracking security state changes."},{name:"showCertificateViewer",description:"Displays native dialog with the certificate details."},{name:"handleCertificateError",description:"Handles a certificate error that fired a certificateError event.",parameters:[{name:"eventId",type:"integer",description:"The ID of the event."},{name:"action",$ref:"CertificateErrorAction",description:"The action to take on the certificate error."}]},{name:"setOverrideCertificateErrors",description:"Enable/disable overriding certificate errors. If enabled, all certificate error events need to be handled by the DevTools client and should be answered with handleCertificateError commands.",parameters:[{name:"override",type:"boolean",description:"If true, certificate errors will be overridden."}]}],events:[{name:"securityStateChanged",description:"The security state of the page changed.",parameters:[{name:"securityState",$ref:"SecurityState",description:"Security state."},{name:"schemeIsCryptographic",type:"boolean",description:"True if the page was loaded over cryptographic transport such as HTTPS."},{name:"explanations",type:"array",items:{$ref:"SecurityStateExplanation"},description:"List of explanations for the security state. If the overall security state is `insecure` or `warning`, at least one corresponding explanation should be included."},{name:"insecureContentStatus",$ref:"InsecureContentStatus",description:"Information about insecure content on the page."},{name:"summary",type:"string",description:"Overrides user-visible description of the state.",optional:!0}]},{name:"certificateError",description:"There is a certificate error. If overriding certificate errors is enabled, then it should be handled with the handleCertificateError command. Note: this event does not fire if the certificate error has been allowed internally.",parameters:[{name:"eventId",type:"integer",description:"The ID of the event."},{name:"errorType",type:"string",description:"The type of the error."},{name:"requestURL",type:"string",description:"The url that was requested."}]}]},{domain:"Network",description:"Network domain allows tracking network activities of the page. It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.",dependencies:["Runtime","Security"],types:[{id:"LoaderId",type:"string",description:"Unique loader identifier."},{id:"RequestId",type:"string",description:"Unique request identifier."},{id:"InterceptionId",type:"string",description:"Unique intercepted request identifier."},{id:"ErrorReason",type:"string",enum:["Failed","Aborted","TimedOut","AccessDenied","ConnectionClosed","ConnectionReset","ConnectionRefused","ConnectionAborted","ConnectionFailed","NameNotResolved","InternetDisconnected","AddressUnreachable"],description:"Network level fetch failure reason."},{id:"TimeSinceEpoch",type:"number",description:"UTC time in seconds, counted from January 1, 1970."},{id:"MonotonicTime",type:"number",description:"Monotonically increasing time in seconds since an arbitrary point in the past."},{id:"Headers",type:"object",description:"Request / response headers as keys / values of JSON object."},{id:"ConnectionType",type:"string",enum:["none","cellular2g","cellular3g","cellular4g","bluetooth","ethernet","wifi","wimax","other"],description:"Loading priority of a resource request."},{id:"CookieSameSite",type:"string",enum:["Strict","Lax"],description:"Represents the cookie's 'SameSite' status: https://tools.ietf.org/html/draft-west-first-party-cookies"},{id:"ResourceTiming",type:"object",description:"Timing information for the request.",properties:[{name:"requestTime",type:"number",description:"Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime."
},{name:"proxyStart",type:"number",description:"Started resolving proxy."},{name:"proxyEnd",type:"number",description:"Finished resolving proxy."},{name:"dnsStart",type:"number",description:"Started DNS address resolve."},{name:"dnsEnd",type:"number",description:"Finished DNS address resolve."},{name:"connectStart",type:"number",description:"Started connecting to the remote host."},{name:"connectEnd",type:"number",description:"Connected to the remote host."},{name:"sslStart",type:"number",description:"Started SSL handshake."},{name:"sslEnd",type:"number",description:"Finished SSL handshake."},{name:"workerStart",type:"number",description:"Started running ServiceWorker.",experimental:!0},{name:"workerReady",type:"number",description:"Finished Starting ServiceWorker.",experimental:!0},{name:"sendStart",type:"number",description:"Started sending request."},{name:"sendEnd",type:"number",description:"Finished sending request."},{name:"pushStart",type:"number",description:"Time the server started pushing request.",experimental:!0},{name:"pushEnd",type:"number",description:"Time the server finished pushing request.",experimental:!0},{name:"receiveHeadersEnd",type:"number",description:"Finished receiving response headers."}]},{id:"ResourcePriority",type:"string",enum:["VeryLow","Low","Medium","High","VeryHigh"],description:"Loading priority of a resource request."},{id:"Request",type:"object",description:"HTTP request data.",properties:[{name:"url",type:"string",description:"Request URL."},{name:"method",type:"string",description:"HTTP request method."},{name:"headers",$ref:"Headers",description:"HTTP request headers."},{name:"postData",type:"string",optional:!0,description:"HTTP POST request data."},{name:"mixedContentType",$ref:"Security.MixedContentType",optional:!0,description:"The mixed content type of the request."},{name:"initialPriority",$ref:"ResourcePriority",description:"Priority of the resource request at the time request is sent."},{name:"referrerPolicy",type:"string",enum:["unsafe-url","no-referrer-when-downgrade","no-referrer","origin","origin-when-cross-origin","same-origin","strict-origin","strict-origin-when-cross-origin"],description:"The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/"},{name:"isLinkPreload",type:"boolean",optional:!0,description:"Whether is loaded via link preload."}]},{id:"SignedCertificateTimestamp",type:"object",description:"Details of a signed certificate timestamp (SCT).",properties:[{name:"status",type:"string",description:"Validation status."},{name:"origin",type:"string",description:"Origin."},{name:"logDescription",type:"string",description:"Log name / description."},{name:"logId",type:"string",description:"Log ID."},{name:"timestamp",$ref:"TimeSinceEpoch",description:"Issuance date."},{name:"hashAlgorithm",type:"string",description:"Hash algorithm."},{name:"signatureAlgorithm",type:"string",description:"Signature algorithm."},{name:"signatureData",type:"string",description:"Signature data."}]},{id:"SecurityDetails",type:"object",description:"Security details about a request.",properties:[{name:"protocol",type:"string",description:'Protocol name (e.g. "TLS 1.2" or "QUIC").'},{name:"keyExchange",type:"string",description:"Key Exchange used by the connection, or the empty string if not applicable."},{name:"keyExchangeGroup",type:"string",optional:!0,description:"(EC)DH group used by the connection, if applicable."},{name:"cipher",type:"string",description:"Cipher name."},{name:"mac",type:"string",optional:!0,description:"TLS MAC. Note that AEAD ciphers do not have separate MACs."},{name:"certificateId",$ref:"Security.CertificateId",description:"Certificate ID value."},{name:"subjectName",type:"string",description:"Certificate subject name."},{name:"sanList",type:"array",items:{type:"string"},description:"Subject Alternative Name (SAN) DNS names and IP addresses."},{name:"issuer",type:"string",description:"Name of the issuing CA."},{name:"validFrom",$ref:"TimeSinceEpoch",description:"Certificate valid from date."},{name:"validTo",$ref:"TimeSinceEpoch",description:"Certificate valid to (expiration) date"},{name:"signedCertificateTimestampList",type:"array",items:{$ref:"SignedCertificateTimestamp"},description:"List of signed certificate timestamps (SCTs)."}]},{id:"BlockedReason",type:"string",description:"The reason why request was blocked.",enum:["csp","mixed-content","origin","inspector","subresource-filter","other"],experimental:!0},{id:"Response",type:"object",description:"HTTP response data.",properties:[{name:"url",type:"string",description:"Response URL. This URL can be different from CachedResource.url in case of redirect."},{name:"status",type:"number",description:"HTTP response status code."},{name:"statusText",type:"string",description:"HTTP response status text."},{name:"headers",$ref:"Headers",description:"HTTP response headers."},{name:"headersText",type:"string",optional:!0,description:"HTTP response headers text."},{name:"mimeType",type:"string",description:"Resource mimeType as determined by the browser."},{name:"requestHeaders",$ref:"Headers",optional:!0,description:"Refined HTTP request headers that were actually transmitted over the network."},{name:"requestHeadersText",type:"string",optional:!0,description:"HTTP request headers text."},{name:"connectionReused",type:"boolean",description:"Specifies whether physical connection was actually reused for this request."},{name:"connectionId",type:"number",description:"Physical connection id that was actually used for this request."},{name:"remoteIPAddress",type:"string",optional:!0,experimental:!0,description:"Remote IP address."},{name:"remotePort",type:"integer",optional:!0,experimental:!0,description:"Remote port."},{name:"fromDiskCache",type:"boolean",optional:!0,description:"Specifies that the request was served from the disk cache."},{name:"fromServiceWorker",type:"boolean",optional:!0,description:"Specifies that the request was served from the ServiceWorker."},{name:"encodedDataLength",type:"number",optional:!1,description:"Total number of bytes received for this request so far."},{name:"timing",$ref:"ResourceTiming",optional:!0,description:"Timing information for the given request."},{name:"protocol",type:"string",optional:!0,description:"Protocol used to fetch this request."},{name:"securityState",$ref:"Security.SecurityState",description:"Security state of the request resource."},{name:"securityDetails",$ref:"SecurityDetails",optional:!0,description:"Security details for the request."}]},{id:"WebSocketRequest",type:"object",description:"WebSocket request data.",experimental:!0,properties:[{name:"headers",$ref:"Headers",description:"HTTP request headers."}]},{id:"WebSocketResponse",type:"object",description:"WebSocket response data.",experimental:!0,properties:[{name:"status",type:"number",description:"HTTP response status code."},{name:"statusText",type:"string",description:"HTTP response status text."},{name:"headers",$ref:"Headers",description:"HTTP response headers."},{name:"headersText",type:"string",optional:!0,description:"HTTP response headers text."},{name:"requestHeaders",$ref:"Headers",optional:!0,description:"HTTP request headers."},{name:"requestHeadersText",type:"string",optional:!0,description:"HTTP request headers text."}]},{id:"WebSocketFrame",type:"object",description:"WebSocket frame data.",experimental:!0,properties:[{name:"opcode",type:"number",description:"WebSocket frame opcode."},{name:"mask",type:"boolean",description:"WebSocke frame mask."},{name:"payloadData",type:"string",description:"WebSocke frame payload data."}]},{id:"CachedResource",type:"object",description:"Information about the cached resource.",properties:[{name:"url",type:"string",description:"Resource URL. This is the url of the original network request."},{name:"type",$ref:"Page.ResourceType",description:"Type of this resource."},{name:"response",$ref:"Response",optional:!0,description:"Cached response data."},{name:"bodySize",type:"number",description:"Cached response body size."}]},{id:"Initiator",type:"object",description:"Information about the request initiator.",properties:[{name:"type",type:"string",enum:["parser","script","preload","other"],description:"Type of this initiator."},{name:"stack",$ref:"Runtime.StackTrace",optional:!0,description:"Initiator JavaScript stack trace, set for Script only."},{name:"url",type:"string",optional:!0,description:"Initiator URL, set for Parser type or for Script type (when script is importing module)."},{name:"lineNumber",type:"number",optional:!0,description:"Initiator line number, set for Parser type or for Script type (when script is importing module) (0-based)."}]},{id:"Cookie",type:"object",description:"Cookie object",properties:[{name:"name",type:"string",description:"Cookie name."},{name:"value",type:"string",description:"Cookie value."},{name:"domain",type:"string",description:"Cookie domain."},{name:"path",type:"string",description:"Cookie path."},{name:"expires",type:"number",description:"Cookie expiration date as the number of seconds since the UNIX epoch."},{name:"size",type:"integer",description:"Cookie size."},{name:"httpOnly",type:"boolean",description:"True if cookie is http-only."},{name:"secure",type:"boolean",description:"True if cookie is secure."},{name:"session",type:"boolean",description:"True in case of session cookie."},{name:"sameSite",$ref:"CookieSameSite",optional:!0,description:"Cookie SameSite type."}],experimental:!0},{id:"AuthChallenge",type:"object",description:"Authorization challenge for HTTP status code 401 or 407.",properties:[{name:"source",type:"string",optional:!0,enum:["Server","Proxy"],description:"Source of the authentication challenge."},{name:"origin",type:"string",description:"Origin of the challenger."},{name:"scheme",type:"string",description:"The authentication scheme used, such as basic or digest"},{name:"realm",type:"string",description:"The realm of the challenge. May be empty."}],experimental:!0},{id:"AuthChallengeResponse",type:"object",description:"Response to an AuthChallenge.",properties:[{name:"response",type:"string",enum:["Default","CancelAuth","ProvideCredentials"],description:"The decision on what to do in response to the authorization challenge.  Default means deferring to the default behavior of the net stack, which will likely either the Cancel authentication or display a popup dialog box."},{name:"username",type:"string",optional:!0,description:"The username to provide, possibly empty. Should only be set if response is ProvideCredentials."},{name:"password",type:"string",optional:!0,description:"The password to provide, possibly empty. Should only be set if response is ProvideCredentials."}],experimental:!0}],commands:[{name:"enable",description:"Enables network tracking, network events will now be delivered to the client.",parameters:[{name:"maxTotalBufferSize",type:"integer",optional:!0,experimental:!0,description:"Buffer size in bytes to use when preserving network payloads (XHRs, etc)."},{name:"maxResourceBufferSize",type:"integer",optional:!0,experimental:!0,description:"Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc)."}]},{name:"disable",description:"Disables network tracking, prevents network events from being sent to the client."},{name:"setUserAgentOverride",description:"Allows overriding user agent with the given string.",parameters:[{name:"userAgent",type:"string",description:"User agent to use."}]},{name:"setExtraHTTPHeaders",description:"Specifies whether to always send extra HTTP headers with the requests from this page.",parameters:[{name:"headers",$ref:"Headers",description:"Map with extra HTTP headers."}]},{name:"getResponseBody",description:"Returns content served for the given request.",parameters:[{name:"requestId",$ref:"RequestId",description:"Identifier of the network request to get content for."}],returns:[{name:"body",type:"string",description:"Response body."},{name:"base64Encoded",type:"boolean",description:"True, if content was sent as base64."}]},{name:"setBlockedURLs",description:"Blocks URLs from loading.",parameters:[{name:"urls",type:"array",items:{type:"string"},description:"URL patterns to block. Wildcards ('*') are allowed."}],experimental:!0},{name:"replayXHR",description:"This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.",parameters:[{name:"requestId",$ref:"RequestId",description:"Identifier of XHR to replay."}],experimental:!0},{name:"canClearBrowserCache",description:"Tells whether clearing browser cache is supported.",returns:[{name:"result",type:"boolean",description:"True if browser cache can be cleared."}]},{name:"clearBrowserCache",description:"Clears browser cache."},{name:"canClearBrowserCookies",description:"Tells whether clearing browser cookies is supported.",returns:[{name:"result",type:"boolean",description:"True if browser cookies can be cleared."}]},{name:"clearBrowserCookies",description:"Clears browser cookies."},{name:"getCookies",parameters:[{name:"urls",type:"array",items:{type:"string"},optional:!0,description:"The list of URLs for which applicable cookies will be fetched"}],returns:[{name:"cookies",type:"array",items:{$ref:"Cookie"},description:"Array of cookie objects."}],description:"Returns all browser cookies for the current URL. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",experimental:!0},{name:"getAllCookies",returns:[{name:"cookies",type:"array",items:{$ref:"Cookie"},description:"Array of cookie objects."}],description:"Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",experimental:!0},{name:"deleteCookie",parameters:[{name:"cookieName",type:"string",description:"Name of the cookie to remove."},{name:"url",type:"string",description:"URL to match cooke domain and path."}],description:"Deletes browser cookie with given name, domain and path.",experimental:!0},{name:"setCookie",parameters:[{name:"url",type:"string",description:"The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie."},{name:"name",type:"string",description:"The name of the cookie."},{name:"value",type:"string",description:"The value of the cookie."},{name:"domain",type:"string",optional:!0,description:"If omitted, the cookie becomes a host-only cookie."},{name:"path",type:"string",optional:!0,description:"Defaults to the path portion of the url parameter."},{name:"secure",type:"boolean",optional:!0,description:"Defaults ot false."},{name:"httpOnly",type:"boolean",optional:!0,description:"Defaults to false."},{name:"sameSite",$ref:"CookieSameSite",optional:!0,description:"Defaults to browser default behavior."},{name:"expirationDate",$ref:"TimeSinceEpoch",optional:!0,description:"If omitted, the cookie becomes a session cookie."}],returns:[{name:"success",type:"boolean",description:"True if successfully set cookie."}],description:"Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.",experimental:!0},{name:"canEmulateNetworkConditions",description:"Tells whether emulation of network conditions is supported.",returns:[{name:"result",type:"boolean",description:"True if emulation of network conditions is supported."}],experimental:!0},{name:"emulateNetworkConditions",description:"Activates emulation of network conditions.",parameters:[{name:"offline",type:"boolean",description:"True to emulate internet disconnection."},{name:"latency",type:"number",description:"Additional latency (ms)."},{name:"downloadThroughput",type:"number",description:"Maximal aggregated download throughput."},{name:"uploadThroughput",type:"number",description:"Maximal aggregated upload throughput."},{name:"connectionType",$ref:"ConnectionType",optional:!0,description:"Connection type if known."}]},{name:"setCacheDisabled",parameters:[{name:"cacheDisabled",type:"boolean",description:"Cache disabled state."}],description:"Toggles ignoring cache for each request. If <code>true</code>, cache will not be used."},{name:"setBypassServiceWorker",parameters:[{name:"bypass",type:"boolean",description:"Bypass service worker and load from network."}],experimental:!0,description:"Toggles ignoring of service worker for each request."},{name:"setDataSizeLimitsForTest",parameters:[{name:"maxTotalSize",type:"integer",description:"Maximum total buffer size."},{name:"maxResourceSize",type:"integer",description:"Maximum per-resource size."}],description:"For testing.",experimental:!0},{name:"getCertificate",description:"Returns the DER-encoded certificate.",parameters:[{name:"origin",type:"string",description:"Origin to get certificate for."}],returns:[{name:"tableNames",type:"array",items:{type:"string"}}],experimental:!0},{name:"setRequestInterceptionEnabled",parameters:[{name:"enabled",type:"boolean",description:"Whether or not HTTP requests should be intercepted and Network.requestIntercepted events sent."}],experimental:!0},{name:"continueInterceptedRequest",description:"Response to Network.requestIntercepted which either modifies the request to continue with any modifications, or blocks it, or completes it with the provided response bytes. If a network fetch occurs as a result which encounters a redirect an additional Network.requestIntercepted event will be sent with the same InterceptionId.",parameters:[{name:"interceptionId",$ref:"InterceptionId"},{name:"errorReason",$ref:"ErrorReason",optional:!0,description:"If set this causes the request to fail with the given reason. Must not be set in response to an authChallenge."},{name:"rawResponse",type:"string",optional:!0,description:"If set the requests completes using with the provided base64 encoded raw response, including HTTP status line and headers etc... Must not be set in response to an authChallenge."},{name:"url",type:"string",optional:!0,description:"If set the request url will be modified in a way that's not observable by page. Must not be set in response to an authChallenge."},{name:"method",type:"string",optional:!0,description:"If set this allows the request method to be overridden. Must not be set in response to an authChallenge."},{name:"postData",type:"string",optional:!0,description:"If set this allows postData to be set. Must not be set in response to an authChallenge."},{name:"headers",$ref:"Headers",optional:!0,description:"If set this allows the request headers to be changed. Must not be set in response to an authChallenge."},{name:"authChallengeResponse",$ref:"AuthChallengeResponse",optional:!0,description:"Response to a requestIntercepted with an authChallenge. Must not be set otherwise."}],experimental:!0}],events:[{name:"resourceChangedPriority",description:"Fired when resource loading priority is changed",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"newPriority",$ref:"ResourcePriority",description:"New priority"},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."}],experimental:!0},{name:"requestWillBeSent",description:"Fired when page is about to send HTTP request.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"loaderId",$ref:"LoaderId",description:"Loader identifier. Empty string if the request is fetched form worker."},{name:"documentURL",type:"string",description:"URL of the document this request is loaded for."},{name:"request",$ref:"Request",description:"Request data."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"wallTime",$ref:"TimeSinceEpoch",experimental:!0,description:"Timestamp."},{name:"initiator",$ref:"Initiator",description:"Request initiator."},{name:"redirectResponse",optional:!0,$ref:"Response",description:"Redirect response data."},{name:"type",$ref:"Page.ResourceType",optional:!0,experimental:!0,description:"Type of this resource."},{name:"frameId",optional:!0,$ref:"Page.FrameId",description:"Frame identifier.",experimental:!0}]},{name:"requestServedFromCache",description:"Fired if request ended up loading from cache.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."}]},{name:"responseReceived",description:"Fired when HTTP response is available.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"loaderId",$ref:"LoaderId",description:"Loader identifier. Empty string if the request is fetched form worker."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"type",$ref:"Page.ResourceType",description:"Resource type."},{name:"response",$ref:"Response",description:"Response data."},{name:"frameId",optional:!0,$ref:"Page.FrameId",description:"Frame identifier.",experimental:!0}]},{name:"dataReceived",description:"Fired when data chunk was received over the network.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"dataLength",type:"integer",description:"Data chunk length."},{name:"encodedDataLength",type:"integer",description:"Actual bytes received (might be less than dataLength for compressed encodings)."}]},{name:"loadingFinished",description:"Fired when HTTP request has finished loading.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"encodedDataLength",type:"number",description:"Total number of bytes received for this request."}]},{name:"loadingFailed",description:"Fired when HTTP request has failed to load.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"type",$ref:"Page.ResourceType",description:"Resource type."},{name:"errorText",type:"string",description:"User friendly error message."},{name:"canceled",type:"boolean",optional:!0,description:"True if loading was canceled."},{name:"blockedReason",$ref:"BlockedReason",optional:!0,description:"The reason why loading was blocked, if any.",experimental:!0}]},{name:"webSocketWillSendHandshakeRequest",description:"Fired when WebSocket is about to initiate handshake.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"wallTime",$ref:"TimeSinceEpoch",experimental:!0,description:"UTC Timestamp."},{name:"request",$ref:"WebSocketRequest",description:"WebSocket request data."}],experimental:!0},{name:"webSocketHandshakeResponseReceived",description:"Fired when WebSocket handshake response becomes available.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"response",$ref:"WebSocketResponse",description:"WebSocket response data."}],experimental:!0},{name:"webSocketCreated",description:"Fired upon WebSocket creation.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"url",type:"string",description:"WebSocket request URL."},{name:"initiator",$ref:"Initiator",optional:!0,description:"Request initiator."}],experimental:!0},{name:"webSocketClosed",description:"Fired when WebSocket is closed.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."}],experimental:!0},{name:"webSocketFrameReceived",description:"Fired when WebSocket frame is received.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"response",$ref:"WebSocketFrame",description:"WebSocket response data."}],experimental:!0},{name:"webSocketFrameError",description:"Fired when WebSocket frame error occurs.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"errorMessage",type:"string",description:"WebSocket frame error message."}],experimental:!0},{name:"webSocketFrameSent",description:"Fired when WebSocket frame is sent.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"response",$ref:"WebSocketFrame",description:"WebSocket response data."}],experimental:!0},{name:"eventSourceMessageReceived",description:"Fired when EventSource message is received.",parameters:[{name:"requestId",$ref:"RequestId",description:"Request identifier."},{name:"timestamp",$ref:"MonotonicTime",description:"Timestamp."},{name:"eventName",type:"string",description:"Message type."},{name:"eventId",type:"string",description:"Message identifier."},{name:"data",type:"string",description:"Message content."}],experimental:!0},{name:"requestIntercepted",description:"Details of an intercepted HTTP request, which must be either allowed, blocked, modified or mocked.",parameters:[{name:"interceptionId",$ref:"InterceptionId",description:"Each request the page makes will have a unique id, however if any redirects are encountered while processing that fetch, they will be reported with the same id as the original fetch. Likewise if HTTP authentication is needed then the same fetch id will be used."},{name:"request",$ref:"Request"},{name:"resourceType",$ref:"Page.ResourceType",description:"How the requested resource will be used."},{name:"redirectHeaders",$ref:"Headers",optional:!0,description:"HTTP response headers, only sent if a redirect was intercepted."},{name:"redirectStatusCode",type:"integer",optional:!0,description:"HTTP response code, only sent if a redirect was intercepted."},{name:"redirectUrl",optional:!0,type:"string",description:"Redirect location, only sent if a redirect was intercepted."},{name:"authChallenge",$ref:"AuthChallenge",optional:!0,description:"Details of the Authorization Challenge encountered. If this is set then continueInterceptedRequest must contain an authChallengeResponse."}],experimental:!0}]},{domain:"Database",experimental:!0,types:[{id:"DatabaseId",type:"string",description:"Unique identifier of Database object.",experimental:!0},{id:"Database",type:"object",description:"Database object.",experimental:!0,properties:[{name:"id",$ref:"DatabaseId",description:"Database ID."},{name:"domain",type:"string",description:"Database domain."},{name:"name",type:"string",description:"Database name."},{name:"version",type:"string",description:"Database version."}]},{id:"Error",type:"object",description:"Database error.",properties:[{name:"message",type:"string",description:"Error message."},{name:"code",type:"integer",description:"Error code."}]}],commands:[{name:"enable",description:"Enables database tracking, database events will now be delivered to the client."},{name:"disable",description:"Disables database tracking, prevents database events from being sent to the client."},{name:"getDatabaseTableNames",parameters:[{name:"databaseId",$ref:"DatabaseId"}],returns:[{name:"tableNames",type:"array",items:{type:"string"}}]},{name:"executeSQL",parameters:[{name:"databaseId",$ref:"DatabaseId"},{name:"query",type:"string"}],returns:[{name:"columnNames",type:"array",optional:!0,items:{type:"string"}},{name:"values",type:"array",optional:!0,items:{type:"any"}},{name:"sqlError",$ref:"Error",optional:!0}]}],events:[{name:"addDatabase",parameters:[{name:"database",$ref:"Database"}]}]},{domain:"IndexedDB",dependencies:["Runtime"],experimental:!0,types:[{id:"DatabaseWithObjectStores",type:"object",description:"Database with an array of object stores.",properties:[{name:"name",type:"string",description:"Database name."},{name:"version",type:"integer",description:"Database version."},{name:"objectStores",type:"array",items:{$ref:"ObjectStore"},description:"Object stores in this database."}]},{id:"ObjectStore",type:"object",description:"Object store.",properties:[{name:"name",type:"string",description:"Object store name."},{name:"keyPath",$ref:"KeyPath",description:"Object store key path."},{name:"autoIncrement",type:"boolean",description:"If true, object store has auto increment flag set."},{name:"indexes",type:"array",items:{$ref:"ObjectStoreIndex"},description:"Indexes in this object store."}]},{id:"ObjectStoreIndex",type:"object",description:"Object store index.",properties:[{name:"name",type:"string",description:"Index name."},{name:"keyPath",$ref:"KeyPath",description:"Index key path."},{name:"unique",type:"boolean",description:"If true, index is unique."},{name:"multiEntry",type:"boolean",description:"If true, index allows multiple entries for a key."}]},{id:"Key",type:"object",description:"Key.",properties:[{name:"type",type:"string",enum:["number","string","date","array"],description:"Key type."},{name:"number",type:"number",optional:!0,description:"Number value."},{name:"string",type:"string",optional:!0,description:"String value."},{name:"date",type:"number",optional:!0,description:"Date value."},{name:"array",type:"array",optional:!0,items:{$ref:"Key"},description:"Array value."}]},{id:"KeyRange",type:"object",description:"Key range.",properties:[{name:"lower",$ref:"Key",optional:!0,description:"Lower bound."},{name:"upper",$ref:"Key",optional:!0,description:"Upper bound."},{name:"lowerOpen",type:"boolean",description:"If true lower bound is open."},{name:"upperOpen",type:"boolean",description:"If true upper bound is open."}]},{id:"DataEntry",type:"object",description:"Data entry.",properties:[{name:"key",$ref:"Runtime.RemoteObject",description:"Key object."},{name:"primaryKey",$ref:"Runtime.RemoteObject",description:"Primary key object."},{name:"value",$ref:"Runtime.RemoteObject",description:"Value object."}]},{id:"KeyPath",type:"object",description:"Key path.",properties:[{name:"type",type:"string",enum:["null","string","array"],description:"Key path type."},{name:"string",type:"string",optional:!0,description:"String value."},{name:"array",type:"array",optional:!0,items:{type:"string"},description:"Array value."}]}],commands:[{name:"enable",description:"Enables events from backend."},{name:"disable",description:"Disables events from backend."},{name:"requestDatabaseNames",parameters:[{name:"securityOrigin",type:"string",description:"Security origin."}],returns:[{name:"databaseNames",type:"array",items:{type:"string"},description:"Database names for origin."}],description:"Requests database names for given security origin."},{name:"requestDatabase",parameters:[{name:"securityOrigin",type:"string",description:"Security origin."},{name:"databaseName",type:"string",description:"Database name."}],returns:[{name:"databaseWithObjectStores",$ref:"DatabaseWithObjectStores",description:"Database with an array of object stores."}],description:"Requests database with given name in given frame."},{name:"requestData",parameters:[{name:"securityOrigin",type:"string",description:"Security origin."},{name:"databaseName",type:"string",description:"Database name."},{name:"objectStoreName",type:"string",description:"Object store name."},{name:"indexName",type:"string",description:"Index name, empty string for object store data requests."},{name:"skipCount",type:"integer",description:"Number of records to skip."},{name:"pageSize",type:"integer",description:"Number of records to fetch."},{name:"keyRange",$ref:"KeyRange",optional:!0,description:"Key range."}],returns:[{name:"objectStoreDataEntries",type:"array",items:{$ref:"DataEntry"},description:"Array of object store data entries."},{name:"hasMore",type:"boolean",description:"If true, there are more entries to fetch in the given range."}],description:"Requests data from object store or index."},{name:"clearObjectStore",
parameters:[{name:"securityOrigin",type:"string",description:"Security origin."},{name:"databaseName",type:"string",description:"Database name."},{name:"objectStoreName",type:"string",description:"Object store name."}],returns:[],description:"Clears all entries from an object store."},{name:"deleteDatabase",parameters:[{name:"securityOrigin",type:"string",description:"Security origin."},{name:"databaseName",type:"string",description:"Database name."}],returns:[],description:"Deletes a database."}]},{domain:"CacheStorage",experimental:!0,types:[{id:"CacheId",type:"string",description:"Unique identifier of the Cache object."},{id:"DataEntry",type:"object",description:"Data entry.",properties:[{name:"request",type:"string",description:"Request url spec."},{name:"response",type:"string",description:"Response status text."},{name:"responseTime",type:"number",description:"Number of seconds since epoch."}]},{id:"Cache",type:"object",description:"Cache identifier.",properties:[{name:"cacheId",$ref:"CacheId",description:"An opaque unique id of the cache."},{name:"securityOrigin",type:"string",description:"Security origin of the cache."},{name:"cacheName",type:"string",description:"The name of the cache."}]}],commands:[{name:"requestCacheNames",parameters:[{name:"securityOrigin",type:"string",description:"Security origin."}],returns:[{name:"caches",type:"array",items:{$ref:"Cache"},description:"Caches for the security origin."}],description:"Requests cache names."},{name:"requestEntries",parameters:[{name:"cacheId",$ref:"CacheId",description:"ID of cache to get entries from."},{name:"skipCount",type:"integer",description:"Number of records to skip."},{name:"pageSize",type:"integer",description:"Number of records to fetch."}],returns:[{name:"cacheDataEntries",type:"array",items:{$ref:"DataEntry"},description:"Array of object store data entries."},{name:"hasMore",type:"boolean",description:"If true, there are more entries to fetch in the given range."}],description:"Requests data from cache."},{name:"deleteCache",parameters:[{name:"cacheId",$ref:"CacheId",description:"Id of cache for deletion."}],description:"Deletes a cache."},{name:"deleteEntry",parameters:[{name:"cacheId",$ref:"CacheId",description:"Id of cache where the entry will be deleted."},{name:"request",type:"string",description:"URL spec of the request."}],description:"Deletes a cache entry."}]},{domain:"DOMStorage",experimental:!0,description:"Query and modify DOM storage.",types:[{id:"StorageId",type:"object",description:"DOM Storage identifier.",experimental:!0,properties:[{name:"securityOrigin",type:"string",description:"Security origin for the storage."},{name:"isLocalStorage",type:"boolean",description:"Whether the storage is local storage (not session storage)."}]},{id:"Item",type:"array",description:"DOM Storage item.",experimental:!0,items:{type:"string"}}],commands:[{name:"enable",description:"Enables storage tracking, storage events will now be delivered to the client."},{name:"disable",description:"Disables storage tracking, prevents storage events from being sent to the client."},{name:"clear",parameters:[{name:"storageId",$ref:"StorageId"}]},{name:"getDOMStorageItems",parameters:[{name:"storageId",$ref:"StorageId"}],returns:[{name:"entries",type:"array",items:{$ref:"Item"}}]},{name:"setDOMStorageItem",parameters:[{name:"storageId",$ref:"StorageId"},{name:"key",type:"string"},{name:"value",type:"string"}]},{name:"removeDOMStorageItem",parameters:[{name:"storageId",$ref:"StorageId"},{name:"key",type:"string"}]}],events:[{name:"domStorageItemsCleared",parameters:[{name:"storageId",$ref:"StorageId"}]},{name:"domStorageItemRemoved",parameters:[{name:"storageId",$ref:"StorageId"},{name:"key",type:"string"}]},{name:"domStorageItemAdded",parameters:[{name:"storageId",$ref:"StorageId"},{name:"key",type:"string"},{name:"newValue",type:"string"}]},{name:"domStorageItemUpdated",parameters:[{name:"storageId",$ref:"StorageId"},{name:"key",type:"string"},{name:"oldValue",type:"string"},{name:"newValue",type:"string"}]}]},{domain:"ApplicationCache",experimental:!0,types:[{id:"ApplicationCacheResource",type:"object",description:"Detailed application cache resource information.",properties:[{name:"url",type:"string",description:"Resource url."},{name:"size",type:"integer",description:"Resource size."},{name:"type",type:"string",description:"Resource type."}]},{id:"ApplicationCache",type:"object",description:"Detailed application cache information.",properties:[{name:"manifestURL",type:"string",description:"Manifest URL."},{name:"size",type:"number",description:"Application cache size."},{name:"creationTime",type:"number",description:"Application cache creation time."},{name:"updateTime",type:"number",description:"Application cache update time."},{name:"resources",type:"array",items:{$ref:"ApplicationCacheResource"},description:"Application cache resources."}]},{id:"FrameWithManifest",type:"object",description:"Frame identifier - manifest URL pair.",properties:[{name:"frameId",$ref:"Page.FrameId",description:"Frame identifier."},{name:"manifestURL",type:"string",description:"Manifest URL."},{name:"status",type:"integer",description:"Application cache status."}]}],commands:[{name:"getFramesWithManifests",returns:[{name:"frameIds",type:"array",items:{$ref:"FrameWithManifest"},description:"Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache."}],description:"Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache."},{name:"enable",description:"Enables application cache domain notifications."},{name:"getManifestForFrame",parameters:[{name:"frameId",$ref:"Page.FrameId",description:"Identifier of the frame containing document whose manifest is retrieved."}],returns:[{name:"manifestURL",type:"string",description:"Manifest URL for document in the given frame."}],description:"Returns manifest URL for document in the given frame."},{name:"getApplicationCacheForFrame",parameters:[{name:"frameId",$ref:"Page.FrameId",description:"Identifier of the frame containing document whose application cache is retrieved."}],returns:[{name:"applicationCache",$ref:"ApplicationCache",description:"Relevant application cache data for the document in given frame."}],description:"Returns relevant application cache data for the document in given frame."}],events:[{name:"applicationCacheStatusUpdated",parameters:[{name:"frameId",$ref:"Page.FrameId",description:"Identifier of the frame containing document whose application cache updated status."},{name:"manifestURL",type:"string",description:"Manifest URL."},{name:"status",type:"integer",description:"Updated application cache status."}]},{name:"networkStateUpdated",parameters:[{name:"isNowOnline",type:"boolean"}]}]},{domain:"DOM",description:"This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object that has an <code>id</code>. This <code>id</code> can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc. It is important that client receives DOM events only for the nodes that are known to the client. Backend keeps track of the nodes that were sent to the client and never sends the same node twice. It is client's responsibility to collect information about the nodes that were sent to the client.<p>Note that <code>iframe</code> owner elements will return corresponding document elements as their child nodes.</p>",dependencies:["Runtime"],types:[{id:"NodeId",type:"integer",description:"Unique DOM node identifier."},{id:"BackendNodeId",type:"integer",description:"Unique DOM node identifier used to reference a node that may not have been pushed to the front-end.",experimental:!0},{id:"BackendNode",type:"object",properties:[{name:"nodeType",type:"integer",description:"<code>Node</code>'s nodeType."},{name:"nodeName",type:"string",description:"<code>Node</code>'s nodeName."},{name:"backendNodeId",$ref:"BackendNodeId"}],experimental:!0,description:"Backend node with a friendly name."},{id:"PseudoType",type:"string",enum:["first-line","first-letter","before","after","backdrop","selection","first-line-inherited","scrollbar","scrollbar-thumb","scrollbar-button","scrollbar-track","scrollbar-track-piece","scrollbar-corner","resizer","input-list-button"],description:"Pseudo element type."},{id:"ShadowRootType",type:"string",enum:["user-agent","open","closed"],description:"Shadow root type."},{id:"Node",type:"object",properties:[{name:"nodeId",$ref:"NodeId",description:"Node identifier that is passed into the rest of the DOM messages as the <code>nodeId</code>. Backend will only push node with given <code>id</code> once. It is aware of all requested nodes and will only fire DOM events for nodes known to the client."},{name:"parentId",$ref:"NodeId",optional:!0,description:"The id of the parent node if any.",experimental:!0},{name:"backendNodeId",$ref:"BackendNodeId",description:"The BackendNodeId for this node.",experimental:!0},{name:"nodeType",type:"integer",description:"<code>Node</code>'s nodeType."},{name:"nodeName",type:"string",description:"<code>Node</code>'s nodeName."},{name:"localName",type:"string",description:"<code>Node</code>'s localName."},{name:"nodeValue",type:"string",description:"<code>Node</code>'s nodeValue."},{name:"childNodeCount",type:"integer",optional:!0,description:"Child count for <code>Container</code> nodes."},{name:"children",type:"array",optional:!0,items:{$ref:"Node"},description:"Child nodes of this node when requested with children."},{name:"attributes",type:"array",optional:!0,items:{type:"string"},description:"Attributes of the <code>Element</code> node in the form of flat array <code>[name1, value1, name2, value2]</code>."},{name:"documentURL",type:"string",optional:!0,description:"Document URL that <code>Document</code> or <code>FrameOwner</code> node points to."},{name:"baseURL",type:"string",optional:!0,description:"Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion.",experimental:!0},{name:"publicId",type:"string",optional:!0,description:"<code>DocumentType</code>'s publicId."},{name:"systemId",type:"string",optional:!0,description:"<code>DocumentType</code>'s systemId."},{name:"internalSubset",type:"string",optional:!0,description:"<code>DocumentType</code>'s internalSubset."},{name:"xmlVersion",type:"string",optional:!0,description:"<code>Document</code>'s XML version in case of XML documents."},{name:"name",type:"string",optional:!0,description:"<code>Attr</code>'s name."},{name:"value",type:"string",optional:!0,description:"<code>Attr</code>'s value."},{name:"pseudoType",$ref:"PseudoType",optional:!0,description:"Pseudo element type for this node."},{name:"shadowRootType",$ref:"ShadowRootType",optional:!0,description:"Shadow root type."},{name:"frameId",$ref:"Page.FrameId",optional:!0,description:"Frame ID for frame owner elements.",experimental:!0},{name:"contentDocument",$ref:"Node",optional:!0,description:"Content document for frame owner elements."},{name:"shadowRoots",type:"array",optional:!0,items:{$ref:"Node"},description:"Shadow root list for given element host.",experimental:!0},{name:"templateContent",$ref:"Node",optional:!0,description:"Content document fragment for template elements.",experimental:!0},{name:"pseudoElements",type:"array",items:{$ref:"Node"},optional:!0,description:"Pseudo elements associated with this node.",experimental:!0},{name:"importedDocument",$ref:"Node",optional:!0,description:"Import document for the HTMLImport links."},{name:"distributedNodes",type:"array",items:{$ref:"BackendNode"},optional:!0,description:"Distributed nodes for given insertion point.",experimental:!0},{name:"isSVG",type:"boolean",optional:!0,description:"Whether the node is SVG.",experimental:!0}],description:"DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type."},{id:"RGBA",type:"object",properties:[{name:"r",type:"integer",description:"The red component, in the [0-255] range."},{name:"g",type:"integer",description:"The green component, in the [0-255] range."},{name:"b",type:"integer",description:"The blue component, in the [0-255] range."},{name:"a",type:"number",optional:!0,description:"The alpha component, in the [0-1] range (default: 1)."}],description:"A structure holding an RGBA color."},{id:"Quad",type:"array",items:{type:"number"},minItems:8,maxItems:8,description:"An array of quad vertices, x immediately followed by y for each point, points clock-wise.",experimental:!0},{id:"BoxModel",type:"object",experimental:!0,properties:[{name:"content",$ref:"Quad",description:"Content box"},{name:"padding",$ref:"Quad",description:"Padding box"},{name:"border",$ref:"Quad",description:"Border box"},{name:"margin",$ref:"Quad",description:"Margin box"},{name:"width",type:"integer",description:"Node width"},{name:"height",type:"integer",description:"Node height"},{name:"shapeOutside",$ref:"ShapeOutsideInfo",optional:!0,description:"Shape outside coordinates"}],description:"Box model."},{id:"ShapeOutsideInfo",type:"object",experimental:!0,properties:[{name:"bounds",$ref:"Quad",description:"Shape bounds"},{name:"shape",type:"array",items:{type:"any"},description:"Shape coordinate details"},{name:"marginShape",type:"array",items:{type:"any"},description:"Margin shape bounds"}],description:"CSS Shape Outside details."},{id:"Rect",type:"object",experimental:!0,properties:[{name:"x",type:"number",description:"X coordinate"},{name:"y",type:"number",description:"Y coordinate"},{name:"width",type:"number",description:"Rectangle width"},{name:"height",type:"number",description:"Rectangle height"}],description:"Rectangle."}],commands:[{name:"enable",description:"Enables DOM agent for the given page."},{name:"disable",description:"Disables DOM agent for the given page."},{name:"getDocument",parameters:[{name:"depth",type:"integer",optional:!0,description:"The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.",experimental:!0},{name:"pierce",type:"boolean",optional:!0,description:"Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).",experimental:!0}],returns:[{name:"root",$ref:"Node",description:"Resulting node."}],description:"Returns the root DOM node (and optionally the subtree) to the caller."},{name:"getFlattenedDocument",parameters:[{name:"depth",type:"integer",optional:!0,description:"The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.",experimental:!0},{name:"pierce",type:"boolean",optional:!0,description:"Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false).",experimental:!0}],returns:[{name:"nodes",type:"array",items:{$ref:"Node"},description:"Resulting node."}],description:"Returns the root DOM node (and optionally the subtree) to the caller."},{name:"collectClassNamesFromSubtree",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to collect class names."}],returns:[{name:"classNames",type:"array",items:{type:"string"},description:"Class name list."}],description:"Collects class names for the node with given id and all of it's child nodes.",experimental:!0},{name:"requestChildNodes",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to get children for."},{name:"depth",type:"integer",optional:!0,description:"The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.",experimental:!0},{name:"pierce",type:"boolean",optional:!0,description:"Whether or not iframes and shadow roots should be traversed when returning the sub-tree (default is false).",experimental:!0}],description:"Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth."},{name:"querySelector",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to query upon."},{name:"selector",type:"string",description:"Selector string."}],returns:[{name:"nodeId",$ref:"NodeId",description:"Query selector result."}],description:"Executes <code>querySelector</code> on a given node."},{name:"querySelectorAll",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to query upon."},{name:"selector",type:"string",description:"Selector string."}],returns:[{name:"nodeIds",type:"array",items:{$ref:"NodeId"},description:"Query selector result."}],description:"Executes <code>querySelectorAll</code> on a given node."},{name:"setNodeName",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to set name for."},{name:"name",type:"string",description:"New node's name."}],returns:[{name:"nodeId",$ref:"NodeId",description:"New node's id."}],description:"Sets node name for a node with given id."},{name:"setNodeValue",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to set value for."},{name:"value",type:"string",description:"New node's value."}],description:"Sets node value for a node with given id."},{name:"removeNode",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to remove."}],description:"Removes node with given id."},{name:"setAttributeValue",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the element to set attribute for."},{name:"name",type:"string",description:"Attribute name."},{name:"value",type:"string",description:"Attribute value."}],description:"Sets attribute for an element with given id."},{name:"setAttributesAsText",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the element to set attributes for."},{name:"text",type:"string",description:"Text with a number of attributes. Will parse this text using HTML parser."},{name:"name",type:"string",optional:!0,description:"Attribute name to replace with new attributes derived from text in case text parsed successfully."}],description:"Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs."},{name:"removeAttribute",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the element to remove attribute from."},{name:"name",type:"string",description:"Name of the attribute to remove."}],description:"Removes attribute with given name from an element with given id."},{name:"getOuterHTML",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to get markup for."}],returns:[{name:"outerHTML",type:"string",description:"Outer HTML markup."}],description:"Returns node's HTML markup."},{name:"setOuterHTML",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to set markup for."},{name:"outerHTML",type:"string",description:"Outer HTML markup to set."}],description:"Sets node HTML markup, returns new node id."},{name:"performSearch",parameters:[{name:"query",type:"string",description:"Plain text or query selector or XPath search query."},{name:"includeUserAgentShadowDOM",type:"boolean",optional:!0,description:"True to search in user agent shadow DOM.",experimental:!0}],returns:[{name:"searchId",type:"string",description:"Unique search session identifier."},{name:"resultCount",type:"integer",description:"Number of search results."}],description:"Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.",experimental:!0},{name:"getSearchResults",parameters:[{name:"searchId",type:"string",description:"Unique search session identifier."},{name:"fromIndex",type:"integer",description:"Start index of the search result to be returned."},{name:"toIndex",type:"integer",description:"End index of the search result to be returned."}],returns:[{name:"nodeIds",type:"array",items:{$ref:"NodeId"},description:"Ids of the search result nodes."}],description:"Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.",experimental:!0},{name:"discardSearchResults",parameters:[{name:"searchId",type:"string",description:"Unique search session identifier."}],description:"Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.",experimental:!0},{name:"requestNode",parameters:[{name:"objectId",$ref:"Runtime.RemoteObjectId",description:"JavaScript object id to convert into node."}],returns:[{name:"nodeId",$ref:"NodeId",description:"Node id for given object."}],description:"Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications."},{name:"highlightRect",description:"Highlights given rectangle.",redirect:"Overlay"},{name:"highlightNode",description:"Highlights DOM node.",redirect:"Overlay"},{name:"hideHighlight",description:"Hides any highlight.",redirect:"Overlay"},{name:"pushNodeByPathToFrontend",parameters:[{name:"path",type:"string",description:"Path to node in the proprietary format."}],returns:[{name:"nodeId",$ref:"NodeId",description:"Id of the node for given path."}],description:"Requests that the node is sent to the caller given its path. // FIXME, use XPath",experimental:!0},{name:"pushNodesByBackendIdsToFrontend",parameters:[{name:"backendNodeIds",type:"array",items:{$ref:"BackendNodeId"},description:"The array of backend node ids."}],returns:[{name:"nodeIds",type:"array",items:{$ref:"NodeId"},description:"The array of ids of pushed nodes that correspond to the backend ids specified in backendNodeIds."}],description:"Requests that a batch of nodes is sent to the caller given their backend node ids.",experimental:!0},{name:"setInspectedNode",parameters:[{name:"nodeId",$ref:"NodeId",description:"DOM node id to be accessible by means of $x command line API."}],description:"Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).",experimental:!0},{name:"resolveNode",parameters:[{name:"nodeId",$ref:"NodeId",optional:!0,description:"Id of the node to resolve."},{name:"backendNodeId",$ref:"DOM.BackendNodeId",optional:!0,description:"Backend identifier of the node to resolve."},{name:"objectGroup",type:"string",optional:!0,description:"Symbolic group name that can be used to release multiple objects."}],returns:[{name:"object",$ref:"Runtime.RemoteObject",description:"JavaScript object wrapper for given node."}],description:"Resolves the JavaScript node object for a given NodeId or BackendNodeId."},{name:"getAttributes",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to retrieve attibutes for."}],returns:[{name:"attributes",type:"array",items:{type:"string"},description:"An interleaved array of node attribute names and values."}],description:"Returns attributes for the specified node."},{name:"copyTo",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to copy."},{name:"targetNodeId",$ref:"NodeId",description:"Id of the element to drop the copy into."},{name:"insertBeforeNodeId",$ref:"NodeId",optional:!0,description:"Drop the copy before this node (if absent, the copy becomes the last child of <code>targetNodeId</code>)."}],returns:[{name:"nodeId",$ref:"NodeId",description:"Id of the node clone."}],description:"Creates a deep copy of the specified node and places it into the target container before the given anchor.",experimental:!0},{name:"moveTo",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node to move."},{name:"targetNodeId",$ref:"NodeId",description:"Id of the element to drop the moved node into."},{name:"insertBeforeNodeId",$ref:"NodeId",optional:!0,description:"Drop node before this one (if absent, the moved node becomes the last child of <code>targetNodeId</code>)."}],returns:[{name:"nodeId",$ref:"NodeId",description:"New id of the moved node."}],description:"Moves node into the new container, places it before the given anchor."},{name:"undo",description:"Undoes the last performed action.",experimental:!0},{name:"redo",description:"Re-does the last undone action.",experimental:!0},{name:"markUndoableState",description:"Marks last undoable state.",experimental:!0},{name:"focus",parameters:[{name:"nodeId",$ref:"NodeId",optional:!0,description:"Identifier of the node."},{name:"backendNodeId",$ref:"BackendNodeId",optional:!0,description:"Identifier of the backend node."},{name:"objectId",$ref:"Runtime.RemoteObjectId",optional:!0,description:"JavaScript object id of the node wrapper."}],description:"Focuses the given element.",experimental:!0},{name:"setFileInputFiles",parameters:[{name:"files",type:"array",items:{type:"string"},description:"Array of file paths to set."},{name:"nodeId",$ref:"NodeId",optional:!0,description:"Identifier of the node."},{name:"backendNodeId",$ref:"BackendNodeId",optional:!0,description:"Identifier of the backend node."},{name:"objectId",$ref:"Runtime.RemoteObjectId",optional:!0,description:"JavaScript object id of the node wrapper."}],description:"Sets files for the given file input element.",experimental:!0},{name:"getBoxModel",parameters:[{name:"nodeId",$ref:"NodeId",optional:!0,description:"Identifier of the node."},{name:"backendNodeId",$ref:"BackendNodeId",optional:!0,description:"Identifier of the backend node."},{name:"objectId",$ref:"Runtime.RemoteObjectId",optional:!0,description:"JavaScript object id of the node wrapper."}],returns:[{name:"model",$ref:"BoxModel",description:"Box model for the node."}],description:"Returns boxes for the currently selected nodes.",experimental:!0},{name:"getNodeForLocation",parameters:[{name:"x",type:"integer",description:"X coordinate."},{name:"y",type:"integer",description:"Y coordinate."},{name:"includeUserAgentShadowDOM",type:"boolean",optional:!0,description:"False to skip to the nearest non-UA shadow root ancestor (default: false)."}],returns:[{name:"nodeId",$ref:"NodeId",description:"Id of the node at given coordinates."}],description:"Returns node id at given location.",experimental:!0},{name:"getRelayoutBoundary",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node."}],returns:[{name:"nodeId",$ref:"NodeId",description:"Relayout boundary node id for the given node."}],description:"Returns the id of the nearest ancestor that is a relayout boundary.",experimental:!0}],events:[{name:"documentUpdated",description:"Fired when <code>Document</code> has been totally updated. Node ids are no longer valid."},{name:"setChildNodes",parameters:[{name:"parentId",$ref:"NodeId",description:"Parent node id to populate with children."},{name:"nodes",type:"array",items:{$ref:"Node"},description:"Child nodes array."}],description:"Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids."},{name:"attributeModified",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node that has changed."},{name:"name",type:"string",description:"Attribute name."},{name:"value",type:"string",description:"Attribute value."}],description:"Fired when <code>Element</code>'s attribute is modified."},{name:"attributeRemoved",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node that has changed."},{name:"name",type:"string",description:"A ttribute name."}],description:"Fired when <code>Element</code>'s attribute is removed."},{name:"inlineStyleInvalidated",parameters:[{name:"nodeIds",type:"array",items:{$ref:"NodeId"},description:"Ids of the nodes for which the inline styles have been invalidated."}],description:"Fired when <code>Element</code>'s inline style is modified via a CSS property modification.",experimental:!0},{name:"characterDataModified",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node that has changed."},{name:"characterData",type:"string",description:"New text value."}],description:"Mirrors <code>DOMCharacterDataModified</code> event."},{name:"childNodeCountUpdated",parameters:[{name:"nodeId",$ref:"NodeId",description:"Id of the node that has changed."},{name:"childNodeCount",type:"integer",description:"New node count."}],description:"Fired when <code>Container</code>'s child node count has changed."},{name:"childNodeInserted",parameters:[{name:"parentNodeId",$ref:"NodeId",description:"Id of the node that has changed."},{name:"previousNodeId",$ref:"NodeId",description:"If of the previous siblint."},{name:"node",$ref:"Node",description:"Inserted node data."}],description:"Mirrors <code>DOMNodeInserted</code> event."},{name:"childNodeRemoved",parameters:[{name:"parentNodeId",$ref:"NodeId",description:"Parent id."},{name:"nodeId",$ref:"NodeId",description:"Id of the node that has been removed."}],description:"Mirrors <code>DOMNodeRemoved</code> event."},{name:"shadowRootPushed",parameters:[{name:"hostId",$ref:"NodeId",description:"Host element id."},{name:"root",$ref:"Node",description:"Shadow root."}],description:"Called when shadow root is pushed into the element.",experimental:!0},{name:"shadowRootPopped",parameters:[{name:"hostId",$ref:"NodeId",description:"Host element id."},{name:"rootId",$ref:"NodeId",description:"Shadow root id."}],description:"Called when shadow root is popped from the element.",experimental:!0},{name:"pseudoElementAdded",parameters:[{name:"parentId",$ref:"NodeId",description:"Pseudo element's parent element id."},{name:"pseudoElement",$ref:"Node",description:"The added pseudo element."}],description:"Called when a pseudo element is added to an element.",experimental:!0},{name:"pseudoElementRemoved",parameters:[{name:"parentId",$ref:"NodeId",description:"Pseudo element's parent element id."},{name:"pseudoElementId",$ref:"NodeId",description:"The removed pseudo element id."}],description:"Called when a pseudo element is removed from an element.",experimental:!0},{name:"distributedNodesUpdated",parameters:[{name:"insertionPointId",$ref:"NodeId",description:"Insertion point where distrubuted nodes were updated."},{name:"distributedNodes",type:"array",items:{$ref:"BackendNode"},description:"Distributed nodes for given insertion point."}],description:"Called when distrubution is changed.",experimental:!0}]},{domain:"CSS",experimental:!0,description:"This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles) have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). A client can also keep track of stylesheets via the <code>styleSheetAdded</code>/<code>styleSheetRemoved</code> events and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.",dependencies:["DOM"],types:[{id:"StyleSheetId",type:"string"},{id:"StyleSheetOrigin",type:"string",enum:["injected","user-agent","inspector","regular"],description:'Stylesheet type: "injected" for stylesheets injected via extension, "user-agent" for user-agent stylesheets, "inspector" for stylesheets created by the inspector (i.e. those holding the "via inspector" rules), "regular" for regular stylesheets.'},{id:"PseudoElementMatches",type:"object",properties:[{name:"pseudoType",$ref:"DOM.PseudoType",description:"Pseudo element type."},{name:"matches",type:"array",items:{$ref:"RuleMatch"},description:"Matches of CSS rules applicable to the pseudo style."}],description:"CSS rule collection for a single pseudo style."
},{id:"InheritedStyleEntry",type:"object",properties:[{name:"inlineStyle",$ref:"CSSStyle",optional:!0,description:"The ancestor node's inline style, if any, in the style inheritance chain."},{name:"matchedCSSRules",type:"array",items:{$ref:"RuleMatch"},description:"Matches of CSS rules matching the ancestor node in the style inheritance chain."}],description:"Inherited CSS rule collection from ancestor node."},{id:"RuleMatch",type:"object",properties:[{name:"rule",$ref:"CSSRule",description:"CSS rule in the match."},{name:"matchingSelectors",type:"array",items:{type:"integer"},description:"Matching selector indices in the rule's selectorList selectors (0-based)."}],description:"Match data for a CSS rule."},{id:"Value",type:"object",properties:[{name:"text",type:"string",description:"Value text."},{name:"range",$ref:"SourceRange",optional:!0,description:"Value range in the underlying resource (if available)."}],description:"Data for a simple selector (these are delimited by commas in a selector list)."},{id:"SelectorList",type:"object",properties:[{name:"selectors",type:"array",items:{$ref:"Value"},description:"Selectors in the list."},{name:"text",type:"string",description:"Rule selector text."}],description:"Selector list data."},{id:"CSSStyleSheetHeader",type:"object",properties:[{name:"styleSheetId",$ref:"StyleSheetId",description:"The stylesheet identifier."},{name:"frameId",$ref:"Page.FrameId",description:"Owner frame identifier."},{name:"sourceURL",type:"string",description:"Stylesheet resource URL."},{name:"sourceMapURL",type:"string",optional:!0,description:"URL of source map associated with the stylesheet (if any)."},{name:"origin",$ref:"StyleSheetOrigin",description:"Stylesheet origin."},{name:"title",type:"string",description:"Stylesheet title."},{name:"ownerNode",$ref:"DOM.BackendNodeId",optional:!0,description:"The backend id for the owner node of the stylesheet."},{name:"disabled",type:"boolean",description:"Denotes whether the stylesheet is disabled."},{name:"hasSourceURL",type:"boolean",optional:!0,description:"Whether the sourceURL field value comes from the sourceURL comment."},{name:"isInline",type:"boolean",description:"Whether this stylesheet is created for STYLE tag by parser. This flag is not set for document.written STYLE tags."},{name:"startLine",type:"number",description:"Line offset of the stylesheet within the resource (zero based)."},{name:"startColumn",type:"number",description:"Column offset of the stylesheet within the resource (zero based)."},{name:"length",type:"number",description:"Size of the content (in characters).",experimental:!0}],description:"CSS stylesheet metainformation."},{id:"CSSRule",type:"object",properties:[{name:"styleSheetId",$ref:"StyleSheetId",optional:!0,description:"The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from."},{name:"selectorList",$ref:"SelectorList",description:"Rule selector data."},{name:"origin",$ref:"StyleSheetOrigin",description:"Parent stylesheet's origin."},{name:"style",$ref:"CSSStyle",description:"Associated style declaration."},{name:"media",type:"array",items:{$ref:"CSSMedia"},optional:!0,description:"Media list array (for rules involving media queries). The array enumerates media queries starting with the innermost one, going outwards."}],description:"CSS rule representation."},{id:"RuleUsage",type:"object",properties:[{name:"styleSheetId",$ref:"StyleSheetId",description:"The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from."},{name:"startOffset",type:"number",description:"Offset of the start of the rule (including selector) from the beginning of the stylesheet."},{name:"endOffset",type:"number",description:"Offset of the end of the rule body from the beginning of the stylesheet."},{name:"used",type:"boolean",description:"Indicates whether the rule was actually used by some element in the page."}],description:"CSS coverage information.",experimental:!0},{id:"SourceRange",type:"object",properties:[{name:"startLine",type:"integer",description:"Start line of range."},{name:"startColumn",type:"integer",description:"Start column of range (inclusive)."},{name:"endLine",type:"integer",description:"End line of range"},{name:"endColumn",type:"integer",description:"End column of range (exclusive)."}],description:"Text range within a resource. All numbers are zero-based."},{id:"ShorthandEntry",type:"object",properties:[{name:"name",type:"string",description:"Shorthand name."},{name:"value",type:"string",description:"Shorthand value."},{name:"important",type:"boolean",optional:!0,description:'Whether the property has "!important" annotation (implies <code>false</code> if absent).'}]},{id:"CSSComputedStyleProperty",type:"object",properties:[{name:"name",type:"string",description:"Computed style property name."},{name:"value",type:"string",description:"Computed style property value."}]},{id:"CSSStyle",type:"object",properties:[{name:"styleSheetId",$ref:"StyleSheetId",optional:!0,description:"The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from."},{name:"cssProperties",type:"array",items:{$ref:"CSSProperty"},description:"CSS properties in the style."},{name:"shorthandEntries",type:"array",items:{$ref:"ShorthandEntry"},description:"Computed values for all shorthands found in the style."},{name:"cssText",type:"string",optional:!0,description:"Style declaration text (if available)."},{name:"range",$ref:"SourceRange",optional:!0,description:"Style declaration range in the enclosing stylesheet (if available)."}],description:"CSS style representation."},{id:"CSSProperty",type:"object",properties:[{name:"name",type:"string",description:"The property name."},{name:"value",type:"string",description:"The property value."},{name:"important",type:"boolean",optional:!0,description:'Whether the property has "!important" annotation (implies <code>false</code> if absent).'},{name:"implicit",type:"boolean",optional:!0,description:"Whether the property is implicit (implies <code>false</code> if absent)."},{name:"text",type:"string",optional:!0,description:"The full property text as specified in the style."},{name:"parsedOk",type:"boolean",optional:!0,description:"Whether the property is understood by the browser (implies <code>true</code> if absent)."},{name:"disabled",type:"boolean",optional:!0,description:"Whether the property is disabled by the user (present for source-based properties only)."},{name:"range",$ref:"SourceRange",optional:!0,description:"The entire property range in the enclosing style declaration (if available)."}],description:"CSS property declaration data."},{id:"CSSMedia",type:"object",properties:[{name:"text",type:"string",description:"Media query text."},{name:"source",type:"string",enum:["mediaRule","importRule","linkedSheet","inlineSheet"],description:'Source of the media query: "mediaRule" if specified by a @media rule, "importRule" if specified by an @import rule, "linkedSheet" if specified by a "media" attribute in a linked stylesheet\'s LINK tag, "inlineSheet" if specified by a "media" attribute in an inline stylesheet\'s STYLE tag.'},{name:"sourceURL",type:"string",optional:!0,description:"URL of the document containing the media query description."},{name:"range",$ref:"SourceRange",optional:!0,description:"The associated rule (@media or @import) header range in the enclosing stylesheet (if available)."},{name:"styleSheetId",$ref:"StyleSheetId",optional:!0,description:"Identifier of the stylesheet containing this object (if exists)."},{name:"mediaList",type:"array",items:{$ref:"MediaQuery"},optional:!0,experimental:!0,description:"Array of media queries."}],description:"CSS media rule descriptor."},{id:"MediaQuery",type:"object",properties:[{name:"expressions",type:"array",items:{$ref:"MediaQueryExpression"},description:"Array of media query expressions."},{name:"active",type:"boolean",description:"Whether the media query condition is satisfied."}],description:"Media query descriptor.",experimental:!0},{id:"MediaQueryExpression",type:"object",properties:[{name:"value",type:"number",description:"Media query expression value."},{name:"unit",type:"string",description:"Media query expression units."},{name:"feature",type:"string",description:"Media query expression feature."},{name:"valueRange",$ref:"SourceRange",optional:!0,description:"The associated range of the value text in the enclosing stylesheet (if available)."},{name:"computedLength",type:"number",optional:!0,description:"Computed length of media query expression (if applicable)."}],description:"Media query expression descriptor.",experimental:!0},{id:"PlatformFontUsage",type:"object",properties:[{name:"familyName",type:"string",description:"Font's family name reported by platform."},{name:"isCustomFont",type:"boolean",description:"Indicates if the font was downloaded or resolved locally."},{name:"glyphCount",type:"number",description:"Amount of glyphs that were rendered with this font."}],description:"Information about amount of glyphs that were rendered with given font.",experimental:!0},{id:"CSSKeyframesRule",type:"object",properties:[{name:"animationName",$ref:"Value",description:"Animation name."},{name:"keyframes",type:"array",items:{$ref:"CSSKeyframeRule"},description:"List of keyframes."}],description:"CSS keyframes rule representation."},{id:"CSSKeyframeRule",type:"object",properties:[{name:"styleSheetId",$ref:"StyleSheetId",optional:!0,description:"The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from."},{name:"origin",$ref:"StyleSheetOrigin",description:"Parent stylesheet's origin."},{name:"keyText",$ref:"Value",description:"Associated key text."},{name:"style",$ref:"CSSStyle",description:"Associated style declaration."}],description:"CSS keyframe rule representation."},{id:"StyleDeclarationEdit",type:"object",properties:[{name:"styleSheetId",$ref:"StyleSheetId",description:"The css style sheet identifier."},{name:"range",$ref:"SourceRange",description:"The range of the style text in the enclosing stylesheet."},{name:"text",type:"string",description:"New style text."}],description:"A descriptor of operation to mutate style declaration text."},{id:"InlineTextBox",type:"object",properties:[{name:"boundingBox",$ref:"DOM.Rect",description:"The absolute position bounding box."},{name:"startCharacterIndex",type:"integer",description:"The starting index in characters, for this post layout textbox substring."},{name:"numCharacters",type:"integer",description:"The number of characters in this post layout textbox substring."}],description:"Details of post layout rendered text positions. The exact layout should not be regarded as stable and may change between versions.",experimental:!0}],commands:[{name:"enable",description:"Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received."},{name:"disable",description:"Disables the CSS agent for the given page."},{name:"getMatchedStylesForNode",parameters:[{name:"nodeId",$ref:"DOM.NodeId"}],returns:[{name:"inlineStyle",$ref:"CSSStyle",optional:!0,description:"Inline style for the specified DOM node."},{name:"attributesStyle",$ref:"CSSStyle",optional:!0,description:'Attribute-defined element style (e.g. resulting from "width=20 height=100%").'},{name:"matchedCSSRules",type:"array",items:{$ref:"RuleMatch"},optional:!0,description:"CSS rules matching this node, from all applicable stylesheets."},{name:"pseudoElements",type:"array",items:{$ref:"PseudoElementMatches"},optional:!0,description:"Pseudo style matches for this node."},{name:"inherited",type:"array",items:{$ref:"InheritedStyleEntry"},optional:!0,description:"A chain of inherited styles (from the immediate node parent up to the DOM tree root)."},{name:"cssKeyframesRules",type:"array",items:{$ref:"CSSKeyframesRule"},optional:!0,description:"A list of CSS keyframed animations matching this node."}],description:"Returns requested styles for a DOM node identified by <code>nodeId</code>."},{name:"getInlineStylesForNode",parameters:[{name:"nodeId",$ref:"DOM.NodeId"}],returns:[{name:"inlineStyle",$ref:"CSSStyle",optional:!0,description:"Inline style for the specified DOM node."},{name:"attributesStyle",$ref:"CSSStyle",optional:!0,description:'Attribute-defined element style (e.g. resulting from "width=20 height=100%").'}],description:'Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.'},{name:"getComputedStyleForNode",parameters:[{name:"nodeId",$ref:"DOM.NodeId"}],returns:[{name:"computedStyle",type:"array",items:{$ref:"CSSComputedStyleProperty"},description:"Computed style for the specified DOM node."}],description:"Returns the computed style for a DOM node identified by <code>nodeId</code>."},{name:"getPlatformFontsForNode",parameters:[{name:"nodeId",$ref:"DOM.NodeId"}],returns:[{name:"fonts",type:"array",items:{$ref:"PlatformFontUsage"},description:"Usage statistics for every employed platform font."}],description:"Requests information about platform fonts which we used to render child TextNodes in the given node.",experimental:!0},{name:"getStyleSheetText",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"}],returns:[{name:"text",type:"string",description:"The stylesheet text."}],description:"Returns the current textual content and the URL for a stylesheet."},{name:"collectClassNames",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"}],returns:[{name:"classNames",type:"array",items:{type:"string"},description:"Class name list."}],description:"Returns all class names from specified stylesheet.",experimental:!0},{name:"setStyleSheetText",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"},{name:"text",type:"string"}],returns:[{name:"sourceMapURL",type:"string",optional:!0,description:"URL of source map associated with script (if any)."}],description:"Sets the new stylesheet text."},{name:"setRuleSelector",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"},{name:"range",$ref:"SourceRange"},{name:"selector",type:"string"}],returns:[{name:"selectorList",$ref:"SelectorList",description:"The resulting selector list after modification."}],description:"Modifies the rule selector."},{name:"setKeyframeKey",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"},{name:"range",$ref:"SourceRange"},{name:"keyText",type:"string"}],returns:[{name:"keyText",$ref:"Value",description:"The resulting key text after modification."}],description:"Modifies the keyframe rule key text."},{name:"setStyleTexts",parameters:[{name:"edits",type:"array",items:{$ref:"StyleDeclarationEdit"}}],returns:[{name:"styles",type:"array",items:{$ref:"CSSStyle"},description:"The resulting styles after modification."}],description:"Applies specified style edits one after another in the given order."},{name:"setMediaText",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"},{name:"range",$ref:"SourceRange"},{name:"text",type:"string"}],returns:[{name:"media",$ref:"CSSMedia",description:"The resulting CSS media rule after modification."}],description:"Modifies the rule selector."},{name:"createStyleSheet",parameters:[{name:"frameId",$ref:"Page.FrameId",description:'Identifier of the frame where "via-inspector" stylesheet should be created.'}],returns:[{name:"styleSheetId",$ref:"StyleSheetId",description:'Identifier of the created "via-inspector" stylesheet.'}],description:'Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>.'},{name:"addRule",parameters:[{name:"styleSheetId",$ref:"StyleSheetId",description:"The css style sheet identifier where a new rule should be inserted."},{name:"ruleText",type:"string",description:"The text of a new rule."},{name:"location",$ref:"SourceRange",description:"Text position of a new rule in the target style sheet."}],returns:[{name:"rule",$ref:"CSSRule",description:"The newly created rule."}],description:"Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>."},{name:"forcePseudoState",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"The element id for which to force the pseudo state."},{name:"forcedPseudoClasses",type:"array",items:{type:"string",enum:["active","focus","hover","visited"]},description:"Element pseudo classes to force when computing the element's style."}],description:"Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser."},{name:"getMediaQueries",returns:[{name:"medias",type:"array",items:{$ref:"CSSMedia"}}],description:"Returns all media queries parsed by the rendering engine.",experimental:!0},{name:"setEffectivePropertyValueForNode",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"The element id for which to set property."},{name:"propertyName",type:"string"},{name:"value",type:"string"}],description:"Find a rule with the given active property for the given node and set the new value for this property",experimental:!0},{name:"getBackgroundColors",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"Id of the node to get background colors for."}],returns:[{name:"backgroundColors",type:"array",items:{type:"string"},description:"The range of background colors behind this element, if it contains any visible text. If no visible text is present, this will be undefined. In the case of a flat background color, this will consist of simply that color. In the case of a gradient, this will consist of each of the color stops. For anything more complicated, this will be an empty array. Images will be ignored (as if the image had failed to load).",optional:!0}],experimental:!0},{name:"startRuleUsageTracking",description:"Enables the selector recording.",experimental:!0},{name:"takeCoverageDelta",description:"Obtain list of rules that became used since last call to this method (or since start of coverage instrumentation)",returns:[{name:"coverage",type:"array",items:{$ref:"RuleUsage"}}],experimental:!0},{name:"stopRuleUsageTracking",returns:[{name:"ruleUsage",type:"array",items:{$ref:"RuleUsage"}}],description:"The list of rules with an indication of whether these were used",experimental:!0}],events:[{name:"mediaQueryResultChanged",description:"Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features."},{name:"fontsUpdated",description:"Fires whenever a web font gets loaded."},{name:"styleSheetChanged",parameters:[{name:"styleSheetId",$ref:"StyleSheetId"}],description:"Fired whenever a stylesheet is changed as a result of the client operation."},{name:"styleSheetAdded",parameters:[{name:"header",$ref:"CSSStyleSheetHeader",description:"Added stylesheet metainfo."}],description:"Fired whenever an active document stylesheet is added."},{name:"styleSheetRemoved",parameters:[{name:"styleSheetId",$ref:"StyleSheetId",description:"Identifier of the removed stylesheet."}],description:"Fired whenever an active document stylesheet is removed."}]},{domain:"DOMSnapshot",experimental:!0,description:"This domain facilitates obtaining document snapshots with DOM, layout, and style information.",dependencies:["CSS","DOM","Page"],types:[{id:"DOMNode",type:"object",properties:[{name:"nodeType",type:"integer",description:"<code>Node</code>'s nodeType."},{name:"nodeName",type:"string",description:"<code>Node</code>'s nodeName."},{name:"nodeValue",type:"string",description:"<code>Node</code>'s nodeValue."},{name:"textValue",type:"string",optional:!0,description:"Only set for textarea elements, contains the text value."},{name:"inputValue",type:"string",optional:!0,description:"Only set for input elements, contains the input's associated text value."},{name:"inputChecked",type:"boolean",optional:!0,description:"Only set for radio and checkbox input elements, indicates if the element has been checked"},{name:"optionSelected",type:"boolean",optional:!0,description:"Only set for option elements, indicates if the element has been selected"},{name:"backendNodeId",$ref:"DOM.BackendNodeId",description:"<code>Node</code>'s id, corresponds to DOM.Node.backendNodeId."},{name:"childNodeIndexes",type:"array",items:{type:"integer"},optional:!0,description:"The indexes of the node's child nodes in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any."},{name:"attributes",type:"array",items:{$ref:"NameValue"},optional:!0,description:"Attributes of an <code>Element</code> node."},{name:"pseudoElementIndexes",type:"array",items:{type:"integer"},optional:!0,description:"Indexes of pseudo elements associated with this node in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any."},{name:"layoutNodeIndex",type:"integer",optional:!0,description:"The index of the node's related layout tree node in the <code>layoutTreeNodes</code> array returned by <code>getSnapshot</code>, if any."},{name:"documentURL",type:"string",optional:!0,description:"Document URL that <code>Document</code> or <code>FrameOwner</code> node points to."},{name:"baseURL",type:"string",optional:!0,description:"Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion."},{name:"contentLanguage",type:"string",optional:!0,description:"Only set for documents, contains the document's content language."},{name:"publicId",type:"string",optional:!0,description:"<code>DocumentType</code> node's publicId."},{name:"systemId",type:"string",optional:!0,description:"<code>DocumentType</code> node's systemId."},{name:"frameId",$ref:"Page.FrameId",optional:!0,description:"Frame ID for frame owner elements."},{name:"contentDocumentIndex",type:"integer",optional:!0,description:"The index of a frame owner element's content document in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any."},{name:"importedDocumentIndex",type:"integer",optional:!0,description:"Index of the imported document's node of a link element in the <code>domNodes</code> array returned by <code>getSnapshot</code>, if any."},{name:"templateContentIndex",type:"integer",optional:!0,description:"Index of the content node of a template element in the <code>domNodes</code> array returned by <code>getSnapshot</code>."},{name:"pseudoType",$ref:"DOM.PseudoType",optional:!0,description:"Type of a pseudo element node."},{name:"isClickable",type:"boolean",optional:!0,description:"Whether this DOM node responds to mouse clicks. This includes nodes that have had click event listeners attached via JavaScript as well as anchor tags that naturally navigate when clicked."}],description:"A Node in the DOM tree."},{id:"LayoutTreeNode",type:"object",properties:[{name:"domNodeIndex",type:"integer",description:"The index of the related DOM node in the <code>domNodes</code> array returned by <code>getSnapshot</code>."},{name:"boundingBox",$ref:"DOM.Rect",description:"The absolute position bounding box."},{name:"layoutText",type:"string",optional:!0,description:"Contents of the LayoutText, if any."},{name:"inlineTextNodes",type:"array",optional:!0,items:{$ref:"CSS.InlineTextBox"},description:"The post-layout inline text nodes, if any."},{name:"styleIndex",type:"integer",optional:!0,description:"Index into the <code>computedStyles</code> array returned by <code>getSnapshot</code>."}],description:"Details of an element in the DOM tree with a LayoutObject."},{id:"ComputedStyle",type:"object",properties:[{name:"properties",type:"array",items:{$ref:"NameValue"},description:"Name/value pairs of computed style properties."}],description:"A subset of the full ComputedStyle as defined by the request whitelist."},{id:"NameValue",type:"object",properties:[{name:"name",type:"string",description:"Attribute/property name."},{name:"value",type:"string",description:"Attribute/property value."}],description:"A name/value pair."}],commands:[{name:"getSnapshot",parameters:[{name:"computedStyleWhitelist",type:"array",items:{type:"string"},description:"Whitelist of computed styles to return."}],returns:[{name:"domNodes",type:"array",items:{$ref:"DOMNode"},description:"The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document."},{name:"layoutTreeNodes",type:"array",items:{$ref:"LayoutTreeNode"},description:"The nodes in the layout tree."},{name:"computedStyles",type:"array",items:{$ref:"ComputedStyle"},description:"Whitelisted ComputedStyle properties for each node in the layout tree."}],description:"Returns a document snapshot, including the full DOM tree of the root node (including iframes, template contents, and imported documents) in a flattened array, as well as layout and white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is flattened. "}]},{domain:"IO",description:"Input/Output operations for streams produced by DevTools.",experimental:!0,types:[{id:"StreamHandle",type:"string"}],commands:[{name:"read",description:"Read a chunk of the stream",parameters:[{name:"handle",$ref:"StreamHandle",description:"Handle of the stream to read."},{name:"offset",type:"integer",optional:!0,description:"Seek to the specified offset before reading (if not specificed, proceed with offset following the last read)."},{name:"size",type:"integer",optional:!0,description:"Maximum number of bytes to read (left upon the agent discretion if not specified)."}],returns:[{name:"data",type:"string",description:"Data that were read."},{name:"eof",type:"boolean",description:"Set if the end-of-file condition occured while reading."}]},{name:"close",description:"Close the stream, discard any temporary backing storage.",parameters:[{name:"handle",$ref:"StreamHandle",description:"Handle of the stream to close."}]}]},{domain:"DOMDebugger",description:"DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.",dependencies:["DOM","Debugger"],types:[{id:"DOMBreakpointType",type:"string",enum:["subtree-modified","attribute-modified","node-removed"],description:"DOM breakpoint type."},{id:"EventListener",type:"object",description:"Object event listener.",properties:[{name:"type",type:"string",description:"<code>EventListener</code>'s type."},{name:"useCapture",type:"boolean",description:"<code>EventListener</code>'s useCapture."},{name:"passive",type:"boolean",description:"<code>EventListener</code>'s passive flag."},{name:"once",type:"boolean",description:"<code>EventListener</code>'s once flag."},{name:"scriptId",$ref:"Runtime.ScriptId",description:"Script id of the handler code."},{name:"lineNumber",type:"integer",description:"Line number in the script (0-based)."},{name:"columnNumber",type:"integer",description:"Column number in the script (0-based)."},{name:"handler",$ref:"Runtime.RemoteObject",optional:!0,description:"Event handler function value."},{name:"originalHandler",$ref:"Runtime.RemoteObject",optional:!0,description:"Event original handler function value."},{name:"backendNodeId",$ref:"DOM.BackendNodeId",optional:!0,description:"Node the listener is added to (if any)."}],experimental:!0}],commands:[{name:"setDOMBreakpoint",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"Identifier of the node to set breakpoint on."},{name:"type",$ref:"DOMBreakpointType",description:"Type of the operation to stop upon."}],description:"Sets breakpoint on particular operation with DOM."},{name:"removeDOMBreakpoint",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"Identifier of the node to remove breakpoint from."},{name:"type",$ref:"DOMBreakpointType",description:"Type of the breakpoint to remove."}],description:"Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>."},{name:"setEventListenerBreakpoint",parameters:[{name:"eventName",type:"string",description:"DOM Event name to stop on (any DOM event will do)."},{name:"targetName",type:"string",optional:!0,description:'EventTarget interface name to stop on. If equal to <code>"*"</code> or not provided, will stop on any EventTarget.',experimental:!0}],description:"Sets breakpoint on particular DOM event."},{name:"removeEventListenerBreakpoint",parameters:[{name:"eventName",type:"string",description:"Event name."},{name:"targetName",type:"string",optional:!0,description:"EventTarget interface name.",experimental:!0}],description:"Removes breakpoint on particular DOM event."},{name:"setInstrumentationBreakpoint",parameters:[{name:"eventName",type:"string",description:"Instrumentation name to stop on."}],description:"Sets breakpoint on particular native event.",experimental:!0},{name:"removeInstrumentationBreakpoint",parameters:[{name:"eventName",type:"string",description:"Instrumentation name to stop on."}],description:"Removes breakpoint on particular native event.",experimental:!0},{name:"setXHRBreakpoint",parameters:[{name:"url",type:"string",description:"Resource URL substring. All XHRs having this substring in the URL will get stopped upon."}],description:"Sets breakpoint on XMLHttpRequest."},{name:"removeXHRBreakpoint",parameters:[{name:"url",type:"string",description:"Resource URL substring."}],description:"Removes breakpoint from XMLHttpRequest."},{name:"getEventListeners",experimental:!0,parameters:[{name:"objectId",$ref:"Runtime.RemoteObjectId",description:"Identifier of the object to return listeners for."},{name:"depth",type:"integer",optional:!0,description:"The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.",experimental:!0},{name:"pierce",type:"boolean",optional:!0,description:"Whether or not iframes and shadow roots should be traversed when returning the subtree (default is false). Reports listeners for all contexts if pierce is enabled.",experimental:!0}],returns:[{name:"listeners",type:"array",items:{$ref:"EventListener"},description:"Array of relevant listeners."}],description:"Returns event listeners of the given object."}]},{domain:"Target",description:"Supports additional targets discovery and allows to attach to them.",experimental:!0,types:[{id:"TargetID",type:"string"},{id:"BrowserContextID",type:"string"},{id:"TargetInfo",type:"object",properties:[{name:"targetId",$ref:"TargetID"},{name:"type",type:"string"},{name:"title",type:"string"},{name:"url",type:"string"},{name:"attached",type:"boolean",description:"Whether the target has an attached client."}]},{id:"RemoteLocation",type:"object",properties:[{name:"host",type:"string"},{name:"port",type:"integer"}]}],commands:[{name:"setDiscoverTargets",description:"Controls whether to discover available targets and notify via <code>targetCreated/targetInfoChanged/targetDestroyed</code> events.",parameters:[{name:"discover",type:"boolean",description:"Whether to discover available targets."}]},{name:"setAutoAttach",description:"Controls whether to automatically attach to new targets which are considered to be related to this one. When turned on, attaches to all existing related targets as well. When turned off, automatically detaches from all currently attached targets.",parameters:[{name:"autoAttach",type:"boolean",description:"Whether to auto-attach to related targets."},{name:"waitForDebuggerOnStart",type:"boolean",description:"Whether to pause new targets when attaching to them. Use <code>Runtime.runIfWaitingForDebugger</code> to run paused targets."}]},{name:"setAttachToFrames",parameters:[{name:"value",type:"boolean",description:"Whether to attach to frames."}]},{name:"setRemoteLocations",description:"Enables target discovery for the specified locations, when <code>setDiscoverTargets</code> was set to <code>true</code>.",parameters:[{
name:"locations",type:"array",items:{$ref:"RemoteLocation"},description:"List of remote locations."}]},{name:"sendMessageToTarget",description:"Sends protocol message to the target with given id.",parameters:[{name:"targetId",$ref:"TargetID"},{name:"message",type:"string"}]},{name:"getTargetInfo",description:"Returns information about a target.",parameters:[{name:"targetId",$ref:"TargetID"}],returns:[{name:"targetInfo",$ref:"TargetInfo"}]},{name:"activateTarget",description:"Activates (focuses) the target.",parameters:[{name:"targetId",$ref:"TargetID"}]},{name:"closeTarget",description:"Closes the target. If the target is a page that gets closed too.",parameters:[{name:"targetId",$ref:"TargetID"}],returns:[{name:"success",type:"boolean"}]},{name:"attachToTarget",description:"Attaches to the target with given id.",parameters:[{name:"targetId",$ref:"TargetID"}],returns:[{name:"success",type:"boolean",description:"Whether attach succeeded."}]},{name:"detachFromTarget",description:"Detaches from the target with given id.",parameters:[{name:"targetId",$ref:"TargetID"}]},{name:"createBrowserContext",description:"Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than one.",returns:[{name:"browserContextId",$ref:"BrowserContextID",description:"The id of the context created."}]},{name:"disposeBrowserContext",description:"Deletes a BrowserContext, will fail of any open page uses it.",parameters:[{name:"browserContextId",$ref:"BrowserContextID"}],returns:[{name:"success",type:"boolean"}]},{name:"createTarget",description:"Creates a new page.",parameters:[{name:"url",type:"string",description:"The initial URL the page will be navigated to."},{name:"width",type:"integer",description:"Frame width in DIP (headless chrome only).",optional:!0},{name:"height",type:"integer",description:"Frame height in DIP (headless chrome only).",optional:!0},{name:"browserContextId",$ref:"BrowserContextID",description:"The browser context to create the page in (headless chrome only).",optional:!0}],returns:[{name:"targetId",$ref:"TargetID",description:"The id of the page opened."}]},{name:"getTargets",description:"Retrieves a list of available targets.",returns:[{name:"targetInfos",type:"array",items:{$ref:"TargetInfo"},description:"The list of targets."}]}],events:[{name:"targetCreated",description:"Issued when a possible inspection target is created.",parameters:[{name:"targetInfo",$ref:"TargetInfo"}]},{name:"targetInfoChanged",description:"Issued when some information about a target has changed. This only happens between <code>targetCreated</code> and <code>targetDestroyed</code>.",parameters:[{name:"targetInfo",$ref:"TargetInfo"}]},{name:"targetDestroyed",description:"Issued when a target is destroyed.",parameters:[{name:"targetId",$ref:"TargetID"}]},{name:"attachedToTarget",description:"Issued when attached to target because of auto-attach or <code>attachToTarget</code> command.",parameters:[{name:"targetInfo",$ref:"TargetInfo"},{name:"waitingForDebugger",type:"boolean"}]},{name:"detachedFromTarget",description:"Issued when detached from target for any reason (including <code>detachFromTarget</code> command).",parameters:[{name:"targetId",$ref:"TargetID"}]},{name:"receivedMessageFromTarget",description:"Notifies about new protocol message from attached target.",parameters:[{name:"targetId",$ref:"TargetID"},{name:"message",type:"string"}]}]},{domain:"ServiceWorker",experimental:!0,types:[{id:"ServiceWorkerRegistration",type:"object",description:"ServiceWorker registration.",properties:[{name:"registrationId",type:"string"},{name:"scopeURL",type:"string"},{name:"isDeleted",type:"boolean"}]},{id:"ServiceWorkerVersionRunningStatus",type:"string",enum:["stopped","starting","running","stopping"]},{id:"ServiceWorkerVersionStatus",type:"string",enum:["new","installing","installed","activating","activated","redundant"]},{id:"ServiceWorkerVersion",type:"object",description:"ServiceWorker version.",properties:[{name:"versionId",type:"string"},{name:"registrationId",type:"string"},{name:"scriptURL",type:"string"},{name:"runningStatus",$ref:"ServiceWorkerVersionRunningStatus"},{name:"status",$ref:"ServiceWorkerVersionStatus"},{name:"scriptLastModified",type:"number",optional:!0,description:"The Last-Modified header value of the main script."},{name:"scriptResponseTime",type:"number",optional:!0,description:"The time at which the response headers of the main script were received from the server.  For cached script it is the last time the cache entry was validated."},{name:"controlledClients",type:"array",optional:!0,items:{$ref:"Target.TargetID"}},{name:"targetId",$ref:"Target.TargetID",optional:!0}]},{id:"ServiceWorkerErrorMessage",type:"object",description:"ServiceWorker error message.",properties:[{name:"errorMessage",type:"string"},{name:"registrationId",type:"string"},{name:"versionId",type:"string"},{name:"sourceURL",type:"string"},{name:"lineNumber",type:"integer"},{name:"columnNumber",type:"integer"}]}],commands:[{name:"enable"},{name:"disable"},{name:"unregister",parameters:[{name:"scopeURL",type:"string"}]},{name:"updateRegistration",parameters:[{name:"scopeURL",type:"string"}]},{name:"startWorker",parameters:[{name:"scopeURL",type:"string"}]},{name:"skipWaiting",parameters:[{name:"scopeURL",type:"string"}]},{name:"stopWorker",parameters:[{name:"versionId",type:"string"}]},{name:"inspectWorker",parameters:[{name:"versionId",type:"string"}]},{name:"setForceUpdateOnPageLoad",parameters:[{name:"forceUpdateOnPageLoad",type:"boolean"}]},{name:"deliverPushMessage",parameters:[{name:"origin",type:"string"},{name:"registrationId",type:"string"},{name:"data",type:"string"}]},{name:"dispatchSyncEvent",parameters:[{name:"origin",type:"string"},{name:"registrationId",type:"string"},{name:"tag",type:"string"},{name:"lastChance",type:"boolean"}]}],events:[{name:"workerRegistrationUpdated",parameters:[{name:"registrations",type:"array",items:{$ref:"ServiceWorkerRegistration"}}]},{name:"workerVersionUpdated",parameters:[{name:"versions",type:"array",items:{$ref:"ServiceWorkerVersion"}}]},{name:"workerErrorReported",parameters:[{name:"errorMessage",$ref:"ServiceWorkerErrorMessage"}]}]},{domain:"Input",types:[{id:"TouchPoint",type:"object",experimental:!0,properties:[{name:"state",type:"string",enum:["touchPressed","touchReleased","touchMoved","touchStationary","touchCancelled"],description:"State of the touch point."},{name:"x",type:"integer",description:"X coordinate of the event relative to the main frame's viewport."},{name:"y",type:"integer",description:"Y coordinate of the event relative to the main frame's viewport. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport."},{name:"radiusX",type:"integer",optional:!0,description:"X radius of the touch area (default: 1)."},{name:"radiusY",type:"integer",optional:!0,description:"Y radius of the touch area (default: 1)."},{name:"rotationAngle",type:"number",optional:!0,description:"Rotation angle (default: 0.0)."},{name:"force",type:"number",optional:!0,description:"Force (default: 1.0)."},{name:"id",type:"number",optional:!0,description:"Identifier used to track touch sources between events, must be unique within an event."}]},{id:"GestureSourceType",type:"string",experimental:!0,enum:["default","touch","mouse"]},{id:"TimeSinceEpoch",type:"number",description:"UTC time in seconds, counted from January 1, 1970."}],commands:[{name:"setIgnoreInputEvents",parameters:[{name:"ignore",type:"boolean",description:"Ignores input events processing when set to true."}],description:"Ignores input events (useful while auditing page)."},{name:"dispatchKeyEvent",parameters:[{name:"type",type:"string",enum:["keyDown","keyUp","rawKeyDown","char"],description:"Type of the key event."},{name:"modifiers",type:"integer",optional:!0,description:"Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)."},{name:"timestamp",$ref:"TimeSinceEpoch",optional:!0,description:"Time at which the event occurred."},{name:"text",type:"string",optional:!0,description:'Text as generated by processing a virtual key code with a keyboard layout. Not needed for for <code>keyUp</code> and <code>rawKeyDown</code> events (default: "")'},{name:"unmodifiedText",type:"string",optional:!0,description:'Text that would have been generated by the keyboard if no modifiers were pressed (except for shift). Useful for shortcut (accelerator) key handling (default: "").'},{name:"keyIdentifier",type:"string",optional:!0,description:"Unique key identifier (e.g., 'U+0041') (default: \"\")."},{name:"code",type:"string",optional:!0,description:"Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: \"\")."},{name:"key",type:"string",optional:!0,description:"Unique DOM defined string value describing the meaning of the key in the context of active modifiers, keyboard layout, etc (e.g., 'AltGr') (default: \"\")."},{name:"windowsVirtualKeyCode",type:"integer",optional:!0,description:"Windows virtual key code (default: 0)."},{name:"nativeVirtualKeyCode",type:"integer",optional:!0,description:"Native virtual key code (default: 0)."},{name:"autoRepeat",type:"boolean",optional:!0,description:"Whether the event was generated from auto repeat (default: false)."},{name:"isKeypad",type:"boolean",optional:!0,description:"Whether the event was generated from the keypad (default: false)."},{name:"isSystemKey",type:"boolean",optional:!0,description:"Whether the event was a system key event (default: false)."}],description:"Dispatches a key event to the page."},{name:"dispatchMouseEvent",parameters:[{name:"type",type:"string",enum:["mousePressed","mouseReleased","mouseMoved"],description:"Type of the mouse event."},{name:"x",type:"number",description:"X coordinate of the event relative to the main frame's viewport in CSS pixels."},{name:"y",type:"number",description:"Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport."},{name:"modifiers",type:"integer",optional:!0,description:"Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)."},{name:"timestamp",$ref:"TimeSinceEpoch",optional:!0,description:"Time at which the event occurred."},{name:"button",type:"string",enum:["none","left","middle","right"],optional:!0,description:'Mouse button (default: "none").'},{name:"clickCount",type:"integer",optional:!0,description:"Number of times the mouse button was clicked (default: 0)."}],description:"Dispatches a mouse event to the page."},{name:"dispatchTouchEvent",experimental:!0,parameters:[{name:"type",type:"string",enum:["touchStart","touchEnd","touchMove"],description:"Type of the touch event."},{name:"touchPoints",type:"array",items:{$ref:"TouchPoint"},description:"Touch points."},{name:"modifiers",type:"integer",optional:!0,description:"Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)."},{name:"timestamp",$ref:"TimeSinceEpoch",optional:!0,description:"Time at which the event occurred."}],description:"Dispatches a touch event to the page."},{name:"emulateTouchFromMouseEvent",experimental:!0,parameters:[{name:"type",type:"string",enum:["mousePressed","mouseReleased","mouseMoved","mouseWheel"],description:"Type of the mouse event."},{name:"x",type:"integer",description:"X coordinate of the mouse pointer in DIP."},{name:"y",type:"integer",description:"Y coordinate of the mouse pointer in DIP."},{name:"timestamp",$ref:"TimeSinceEpoch",description:"Time at which the event occurred."},{name:"button",type:"string",enum:["none","left","middle","right"],description:"Mouse button."},{name:"deltaX",type:"number",optional:!0,description:"X delta in DIP for mouse wheel event (default: 0)."},{name:"deltaY",type:"number",optional:!0,description:"Y delta in DIP for mouse wheel event (default: 0)."},{name:"modifiers",type:"integer",optional:!0,description:"Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)."},{name:"clickCount",type:"integer",optional:!0,description:"Number of times the mouse button was clicked (default: 0)."}],description:"Emulates touch event from the mouse event parameters."},{name:"synthesizePinchGesture",parameters:[{name:"x",type:"number",description:"X coordinate of the start of the gesture in CSS pixels."},{name:"y",type:"number",description:"Y coordinate of the start of the gesture in CSS pixels."},{name:"scaleFactor",type:"number",description:"Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out)."},{name:"relativeSpeed",type:"integer",optional:!0,description:"Relative pointer speed in pixels per second (default: 800)."},{name:"gestureSourceType",$ref:"GestureSourceType",optional:!0,description:"Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)."}],description:"Synthesizes a pinch gesture over a time period by issuing appropriate touch events.",experimental:!0},{name:"synthesizeScrollGesture",parameters:[{name:"x",type:"number",description:"X coordinate of the start of the gesture in CSS pixels."},{name:"y",type:"number",description:"Y coordinate of the start of the gesture in CSS pixels."},{name:"xDistance",type:"number",optional:!0,description:"The distance to scroll along the X axis (positive to scroll left)."},{name:"yDistance",type:"number",optional:!0,description:"The distance to scroll along the Y axis (positive to scroll up)."},{name:"xOverscroll",type:"number",optional:!0,description:"The number of additional pixels to scroll back along the X axis, in addition to the given distance."},{name:"yOverscroll",type:"number",optional:!0,description:"The number of additional pixels to scroll back along the Y axis, in addition to the given distance."},{name:"preventFling",type:"boolean",optional:!0,description:"Prevent fling (default: true)."},{name:"speed",type:"integer",optional:!0,description:"Swipe speed in pixels per second (default: 800)."},{name:"gestureSourceType",$ref:"GestureSourceType",optional:!0,description:"Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)."},{name:"repeatCount",type:"integer",optional:!0,description:"The number of times to repeat the gesture (default: 0)."},{name:"repeatDelayMs",type:"integer",optional:!0,description:"The number of milliseconds delay between each repeat. (default: 250)."},{name:"interactionMarkerName",type:"string",optional:!0,description:'The name of the interaction markers to generate, if not empty (default: "").'}],description:"Synthesizes a scroll gesture over a time period by issuing appropriate touch events.",experimental:!0},{name:"synthesizeTapGesture",parameters:[{name:"x",type:"number",description:"X coordinate of the start of the gesture in CSS pixels."},{name:"y",type:"number",description:"Y coordinate of the start of the gesture in CSS pixels."},{name:"duration",type:"integer",optional:!0,description:"Duration between touchdown and touchup events in ms (default: 50)."},{name:"tapCount",type:"integer",optional:!0,description:"Number of times to perform the tap (e.g. 2 for double tap, default: 1)."},{name:"gestureSourceType",$ref:"GestureSourceType",optional:!0,description:"Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)."}],description:"Synthesizes a tap gesture over a time period by issuing appropriate touch events.",experimental:!0}],events:[]},{domain:"LayerTree",experimental:!0,dependencies:["DOM"],types:[{id:"LayerId",type:"string",description:"Unique Layer identifier."},{id:"SnapshotId",type:"string",description:"Unique snapshot identifier."},{id:"ScrollRect",type:"object",description:"Rectangle where scrolling happens on the main thread.",properties:[{name:"rect",$ref:"DOM.Rect",description:"Rectangle itself."},{name:"type",type:"string",enum:["RepaintsOnScroll","TouchEventHandler","WheelEventHandler"],description:"Reason for rectangle to force scrolling on the main thread"}]},{id:"PictureTile",type:"object",description:"Serialized fragment of layer picture along with its offset within the layer.",properties:[{name:"x",type:"number",description:"Offset from owning layer left boundary"},{name:"y",type:"number",description:"Offset from owning layer top boundary"},{name:"picture",type:"string",description:"Base64-encoded snapshot data."}]},{id:"Layer",type:"object",description:"Information about a compositing layer.",properties:[{name:"layerId",$ref:"LayerId",description:"The unique id for this layer."},{name:"parentLayerId",$ref:"LayerId",optional:!0,description:"The id of parent (not present for root)."},{name:"backendNodeId",$ref:"DOM.BackendNodeId",optional:!0,description:"The backend id for the node associated with this layer."},{name:"offsetX",type:"number",description:"Offset from parent layer, X coordinate."},{name:"offsetY",type:"number",description:"Offset from parent layer, Y coordinate."},{name:"width",type:"number",description:"Layer width."},{name:"height",type:"number",description:"Layer height."},{name:"transform",type:"array",items:{type:"number"},minItems:16,maxItems:16,optional:!0,description:"Transformation matrix for layer, default is identity matrix"},{name:"anchorX",type:"number",optional:!0,description:"Transform anchor point X, absent if no transform specified"},{name:"anchorY",type:"number",optional:!0,description:"Transform anchor point Y, absent if no transform specified"},{name:"anchorZ",type:"number",optional:!0,description:"Transform anchor point Z, absent if no transform specified"},{name:"paintCount",type:"integer",description:"Indicates how many time this layer has painted."},{name:"drawsContent",type:"boolean",description:"Indicates whether this layer hosts any content, rather than being used for transform/scrolling purposes only."},{name:"invisible",type:"boolean",optional:!0,description:"Set if layer is not visible."},{name:"scrollRects",type:"array",items:{$ref:"ScrollRect"},optional:!0,description:"Rectangles scrolling on main thread only."}]},{id:"PaintProfile",type:"array",description:"Array of timings, one per paint step.",items:{type:"number",description:"A time in seconds since the end of previous step (for the first step, time since painting started)"}}],commands:[{name:"enable",description:"Enables compositing tree inspection."},{name:"disable",description:"Disables compositing tree inspection."},{name:"compositingReasons",parameters:[{name:"layerId",$ref:"LayerId",description:"The id of the layer for which we want to get the reasons it was composited."}],description:"Provides the reasons why the given layer was composited.",returns:[{name:"compositingReasons",type:"array",items:{type:"string"},description:"A list of strings specifying reasons for the given layer to become composited."}]},{name:"makeSnapshot",parameters:[{name:"layerId",$ref:"LayerId",description:"The id of the layer."}],description:"Returns the layer snapshot identifier.",returns:[{name:"snapshotId",$ref:"SnapshotId",description:"The id of the layer snapshot."}]},{name:"loadSnapshot",parameters:[{name:"tiles",type:"array",items:{$ref:"PictureTile"},minItems:1,description:"An array of tiles composing the snapshot."}],description:"Returns the snapshot identifier.",returns:[{name:"snapshotId",$ref:"SnapshotId",description:"The id of the snapshot."}]},{name:"releaseSnapshot",parameters:[{name:"snapshotId",$ref:"SnapshotId",description:"The id of the layer snapshot."}],description:"Releases layer snapshot captured by the back-end."},{name:"profileSnapshot",parameters:[{name:"snapshotId",$ref:"SnapshotId",description:"The id of the layer snapshot."},{name:"minRepeatCount",type:"integer",optional:!0,description:"The maximum number of times to replay the snapshot (1, if not specified)."},{name:"minDuration",type:"number",optional:!0,description:"The minimum duration (in seconds) to replay the snapshot."},{name:"clipRect",$ref:"DOM.Rect",optional:!0,description:"The clip rectangle to apply when replaying the snapshot."}],returns:[{name:"timings",type:"array",items:{$ref:"PaintProfile"},description:"The array of paint profiles, one per run."}]},{name:"replaySnapshot",parameters:[{name:"snapshotId",$ref:"SnapshotId",description:"The id of the layer snapshot."},{name:"fromStep",type:"integer",optional:!0,description:"The first step to replay from (replay from the very start if not specified)."},{name:"toStep",type:"integer",optional:!0,description:"The last step to replay to (replay till the end if not specified)."},{name:"scale",type:"number",optional:!0,description:"The scale to apply while replaying (defaults to 1)."}],description:"Replays the layer snapshot and returns the resulting bitmap.",returns:[{name:"dataURL",type:"string",description:"A data: URL for resulting image."}]},{name:"snapshotCommandLog",parameters:[{name:"snapshotId",$ref:"SnapshotId",description:"The id of the layer snapshot."}],description:"Replays the layer snapshot and returns canvas log.",returns:[{name:"commandLog",type:"array",items:{type:"object"},description:"The array of canvas function calls."}]}],events:[{name:"layerTreeDidChange",parameters:[{name:"layers",type:"array",items:{$ref:"Layer"},optional:!0,description:"Layer tree, absent if not in the comspositing mode."}]},{name:"layerPainted",parameters:[{name:"layerId",$ref:"LayerId",description:"The id of the painted layer."},{name:"clip",$ref:"DOM.Rect",description:"Clip rectangle."}]}]},{domain:"DeviceOrientation",experimental:!0,commands:[{name:"setDeviceOrientationOverride",description:"Overrides the Device Orientation.",parameters:[{name:"alpha",type:"number",description:"Mock alpha"},{name:"beta",type:"number",description:"Mock beta"},{name:"gamma",type:"number",description:"Mock gamma"}]},{name:"clearDeviceOrientationOverride",description:"Clears the overridden Device Orientation."}]},{domain:"Tracing",dependencies:["IO"],experimental:!0,types:[{id:"MemoryDumpConfig",type:"object",description:'Configuration for memory dump. Used only when "memory-infra" category is enabled.'},{id:"TraceConfig",type:"object",properties:[{name:"recordMode",type:"string",optional:!0,enum:["recordUntilFull","recordContinuously","recordAsMuchAsPossible","echoToConsole"],description:"Controls how the trace buffer stores data."},{name:"enableSampling",type:"boolean",optional:!0,description:"Turns on JavaScript stack sampling."},{name:"enableSystrace",type:"boolean",optional:!0,description:"Turns on system tracing."},{name:"enableArgumentFilter",type:"boolean",optional:!0,description:"Turns on argument filter."},{name:"includedCategories",type:"array",items:{type:"string"},optional:!0,description:"Included category filters."},{name:"excludedCategories",type:"array",items:{type:"string"},optional:!0,description:"Excluded category filters."},{name:"syntheticDelays",type:"array",items:{type:"string"},optional:!0,description:"Configuration to synthesize the delays in tracing."},{name:"memoryDumpConfig",$ref:"MemoryDumpConfig",optional:!0,description:'Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.'}]}],commands:[{name:"start",description:"Start trace events collection.",parameters:[{name:"categories",type:"string",optional:!0,deprecated:!0,description:"Category/tag filter"},{name:"options",type:"string",optional:!0,deprecated:!0,description:"Tracing options"},{name:"bufferUsageReportingInterval",type:"number",optional:!0,description:"If set, the agent will issue bufferUsage events at this interval, specified in milliseconds"},{name:"transferMode",type:"string",enum:["ReportEvents","ReturnAsStream"],optional:!0,description:"Whether to report trace events as series of dataCollected events or to save trace to a stream (defaults to <code>ReportEvents</code>)."},{name:"traceConfig",$ref:"TraceConfig",optional:!0,description:""}]},{name:"end",description:"Stop trace events collection."},{name:"getCategories",description:"Gets supported tracing categories.",returns:[{name:"categories",type:"array",items:{type:"string"},description:"A list of supported tracing categories."}]},{name:"requestMemoryDump",description:"Request a global memory dump.",returns:[{name:"dumpGuid",type:"string",description:"GUID of the resulting global memory dump."},{name:"success",type:"boolean",description:"True iff the global memory dump succeeded."}]},{name:"recordClockSyncMarker",description:"Record a clock sync marker in the trace.",parameters:[{name:"syncId",type:"string",description:"The ID of this clock sync marker"}]}],events:[{name:"dataCollected",parameters:[{name:"value",type:"array",items:{type:"object"}}],description:"Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event."},{name:"tracingComplete",description:"Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events.",parameters:[{name:"stream",$ref:"IO.StreamHandle",optional:!0,description:"A handle of the stream that holds resulting trace data."}]},{name:"bufferUsage",parameters:[{name:"percentFull",type:"number",optional:!0,description:"A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size."},{name:"eventCount",type:"number",optional:!0,description:"An approximate number of events in the trace log."},{name:"value",type:"number",optional:!0,description:"A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size."}]}]},{domain:"Animation",experimental:!0,dependencies:["Runtime","DOM"],types:[{id:"Animation",type:"object",experimental:!0,properties:[{name:"id",type:"string",description:"<code>Animation</code>'s id."},{name:"name",type:"string",description:"<code>Animation</code>'s name."},{name:"pausedState",type:"boolean",experimental:!0,description:"<code>Animation</code>'s internal paused state."},{name:"playState",type:"string",description:"<code>Animation</code>'s play state."},{name:"playbackRate",type:"number",description:"<code>Animation</code>'s playback rate."},{name:"startTime",type:"number",description:"<code>Animation</code>'s start time."},{name:"currentTime",type:"number",description:"<code>Animation</code>'s current time."},{name:"source",$ref:"AnimationEffect",description:"<code>Animation</code>'s source animation node."},{name:"type",type:"string",enum:["CSSTransition","CSSAnimation","WebAnimation"],description:"Animation type of <code>Animation</code>."},{name:"cssId",type:"string",optional:!0,description:"A unique ID for <code>Animation</code> representing the sources that triggered this CSS animation/transition."}],description:"Animation instance."},{id:"AnimationEffect",type:"object",experimental:!0,properties:[{name:"delay",type:"number",description:"<code>AnimationEffect</code>'s delay."},{name:"endDelay",type:"number",description:"<code>AnimationEffect</code>'s end delay."},{name:"iterationStart",type:"number",description:"<code>AnimationEffect</code>'s iteration start."},{name:"iterations",type:"number",description:"<code>AnimationEffect</code>'s iterations."},{name:"duration",type:"number",description:"<code>AnimationEffect</code>'s iteration duration."},{name:"direction",type:"string",description:"<code>AnimationEffect</code>'s playback direction."},{name:"fill",type:"string",description:"<code>AnimationEffect</code>'s fill mode."},{name:"backendNodeId",$ref:"DOM.BackendNodeId",description:"<code>AnimationEffect</code>'s target node."},{name:"keyframesRule",$ref:"KeyframesRule",optional:!0,description:"<code>AnimationEffect</code>'s keyframes."},{name:"easing",type:"string",description:"<code>AnimationEffect</code>'s timing function."}],description:"AnimationEffect instance"},{id:"KeyframesRule",type:"object",properties:[{name:"name",type:"string",optional:!0,description:"CSS keyframed animation's name."},{name:"keyframes",type:"array",items:{$ref:"KeyframeStyle"},description:"List of animation keyframes."}],description:"Keyframes Rule"},{id:"KeyframeStyle",type:"object",properties:[{name:"offset",type:"string",description:"Keyframe's time offset."},{name:"easing",type:"string",description:"<code>AnimationEffect</code>'s timing function."}],description:"Keyframe Style"}],commands:[{name:"enable",description:"Enables animation domain notifications."},{name:"disable",description:"Disables animation domain notifications."},{name:"getPlaybackRate",returns:[{name:"playbackRate",type:"number",description:"Playback rate for animations on page."}],description:"Gets the playback rate of the document timeline."},{name:"setPlaybackRate",parameters:[{name:"playbackRate",type:"number",description:"Playback rate for animations on page"}],description:"Sets the playback rate of the document timeline."},{name:"getCurrentTime",parameters:[{name:"id",type:"string",description:"Id of animation."}],returns:[{name:"currentTime",type:"number",description:"Current time of the page."}],description:"Returns the current time of the an animation."},{name:"setPaused",parameters:[{name:"animations",type:"array",items:{type:"string"},description:"Animations to set the pause state of."},{name:"paused",type:"boolean",description:"Paused state to set to."}],description:"Sets the paused state of a set of animations."},{name:"setTiming",parameters:[{name:"animationId",type:"string",description:"Animation id."},{name:"duration",type:"number",description:"Duration of the animation."},{name:"delay",type:"number",description:"Delay of the animation."}],description:"Sets the timing of an animation node."},{name:"seekAnimations",parameters:[{name:"animations",type:"array",items:{type:"string"},description:"List of animation ids to seek."},{name:"currentTime",type:"number",description:"Set the current time of each animation."}],description:"Seek a set of animations to a particular time within each animation."},{name:"releaseAnimations",parameters:[{name:"animations",type:"array",items:{type:"string"},description:"List of animation ids to seek."}],description:"Releases a set of animations to no longer be manipulated."},{name:"resolveAnimation",parameters:[{name:"animationId",type:"string",description:"Animation id."}],returns:[{name:"remoteObject",$ref:"Runtime.RemoteObject",description:"Corresponding remote object."}],description:"Gets the remote object of the Animation."}],events:[{name:"animationCreated",parameters:[{name:"id",type:"string",description:"Id of the animation that was created."}],description:"Event for each animation that has been created."},{name:"animationStarted",parameters:[{name:"animation",$ref:"Animation",description:"Animation that was started."}],description:"Event for animation that has been started."},{name:"animationCanceled",parameters:[{name:"id",type:"string",description:"Id of the animation that was cancelled."}],description:"Event for when an animation has been cancelled."}]},{domain:"Accessibility",experimental:!0,dependencies:["DOM"],types:[{id:"AXNodeId",type:"string",description:"Unique accessibility node identifier."},{id:"AXValueType",type:"string",enum:["boolean","tristate","booleanOrUndefined","idref","idrefList","integer","node","nodeList","number","string","computedString","token","tokenList","domRelation","role","internalRole","valueUndefined"],description:"Enum of possible property types."},{id:"AXValueSourceType",type:"string",enum:["attribute","implicit","style","contents","placeholder","relatedElement"],description:"Enum of possible property sources."},{id:"AXValueNativeSourceType",type:"string",enum:["figcaption","label","labelfor","labelwrapped","legend","tablecaption","title","other"],description:"Enum of possible native property sources (as a subtype of a particular AXValueSourceType)."
},{id:"AXValueSource",type:"object",properties:[{name:"type",$ref:"AXValueSourceType",description:"What type of source this is."},{name:"value",$ref:"AXValue",description:"The value of this property source.",optional:!0},{name:"attribute",type:"string",description:"The name of the relevant attribute, if any.",optional:!0},{name:"attributeValue",$ref:"AXValue",description:"The value of the relevant attribute, if any.",optional:!0},{name:"superseded",type:"boolean",description:"Whether this source is superseded by a higher priority source.",optional:!0},{name:"nativeSource",$ref:"AXValueNativeSourceType",description:"The native markup source for this value, e.g. a <label> element.",optional:!0},{name:"nativeSourceValue",$ref:"AXValue",description:"The value, such as a node or node list, of the native source.",optional:!0},{name:"invalid",type:"boolean",description:"Whether the value for this property is invalid.",optional:!0},{name:"invalidReason",type:"string",description:"Reason for the value being invalid, if it is.",optional:!0}],description:"A single source for a computed AX property."},{id:"AXRelatedNode",type:"object",properties:[{name:"backendDOMNodeId",$ref:"DOM.BackendNodeId",description:"The BackendNodeId of the related DOM node."},{name:"idref",type:"string",description:"The IDRef value provided, if any.",optional:!0},{name:"text",type:"string",description:"The text alternative of this node in the current context.",optional:!0}]},{id:"AXProperty",type:"object",properties:[{name:"name",type:"string",description:"The name of this property."},{name:"value",$ref:"AXValue",description:"The value of this property."}]},{id:"AXValue",type:"object",properties:[{name:"type",$ref:"AXValueType",description:"The type of this value."},{name:"value",type:"any",description:"The computed value of this property.",optional:!0},{name:"relatedNodes",type:"array",items:{$ref:"AXRelatedNode"},description:"One or more related nodes, if applicable.",optional:!0},{name:"sources",type:"array",items:{$ref:"AXValueSource"},description:"The sources which contributed to the computation of this property.",optional:!0}],description:"A single computed AX property."},{id:"AXGlobalStates",type:"string",enum:["disabled","hidden","hiddenRoot","invalid","keyshortcuts","roledescription"],description:"States which apply to every AX node."},{id:"AXLiveRegionAttributes",type:"string",enum:["live","atomic","relevant","busy","root"],description:"Attributes which apply to nodes in live regions."},{id:"AXWidgetAttributes",type:"string",enum:["autocomplete","haspopup","level","multiselectable","orientation","multiline","readonly","required","valuemin","valuemax","valuetext"],description:"Attributes which apply to widgets."},{id:"AXWidgetStates",type:"string",enum:["checked","expanded","modal","pressed","selected"],description:"States which apply to widgets."},{id:"AXRelationshipAttributes",type:"string",enum:["activedescendant","controls","describedby","details","errormessage","flowto","labelledby","owns"],description:"Relationships between elements other than parent/child/sibling."},{id:"AXNode",type:"object",properties:[{name:"nodeId",$ref:"AXNodeId",description:"Unique identifier for this node."},{name:"ignored",type:"boolean",description:"Whether this node is ignored for accessibility"},{name:"ignoredReasons",type:"array",items:{$ref:"AXProperty"},description:"Collection of reasons why this node is hidden.",optional:!0},{name:"role",$ref:"AXValue",description:"This <code>Node</code>'s role, whether explicit or implicit.",optional:!0},{name:"name",$ref:"AXValue",description:"The accessible name for this <code>Node</code>.",optional:!0},{name:"description",$ref:"AXValue",description:"The accessible description for this <code>Node</code>.",optional:!0},{name:"value",$ref:"AXValue",description:"The value for this <code>Node</code>.",optional:!0},{name:"properties",type:"array",items:{$ref:"AXProperty"},description:"All other properties",optional:!0},{name:"childIds",type:"array",items:{$ref:"AXNodeId"},description:"IDs for each of this node's child nodes.",optional:!0},{name:"backendDOMNodeId",$ref:"DOM.BackendNodeId",description:"The backend ID for the associated DOM node, if any.",optional:!0}],description:"A node in the accessibility tree."}],commands:[{name:"getPartialAXTree",parameters:[{name:"nodeId",$ref:"DOM.NodeId",description:"ID of node to get the partial accessibility tree for."},{name:"fetchRelatives",type:"boolean",description:"Whether to fetch this nodes ancestors, siblings and children. Defaults to true.",optional:!0}],returns:[{name:"nodes",type:"array",items:{$ref:"AXNode"},description:"The <code>Accessibility.AXNode</code> for this DOM node, if it exists, plus its ancestors, siblings and children, if requested."}],description:"Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.",experimental:!0}]},{domain:"Storage",experimental:!0,types:[{id:"StorageType",type:"string",enum:["appcache","cookies","file_systems","indexeddb","local_storage","shader_cache","websql","service_workers","cache_storage","all","other"],description:"Enum of possible storage types."},{id:"UsageForType",type:"object",description:"Usage for a storage type.",properties:[{name:"storageType",$ref:"StorageType",description:"Name of storage type."},{name:"usage",type:"number",description:"Storage usage (bytes)."}]}],commands:[{name:"clearDataForOrigin",parameters:[{name:"origin",type:"string",description:"Security origin."},{name:"storageTypes",type:"string",description:"Comma separated origin names."}],description:"Clears storage for origin."},{name:"getUsageAndQuota",parameters:[{name:"origin",type:"string",description:"Security origin."}],returns:[{name:"usage",type:"number",description:"Storage usage (bytes)."},{name:"quota",type:"number",description:"Storage quota (bytes)."},{name:"usageBreakdown",type:"array",items:{$ref:"UsageForType"},description:"Storage usage per type (bytes)."}],description:"Returns usage and quota in bytes."}]},{domain:"Log",description:"Provides access to log entries.",dependencies:["Runtime","Network"],experimental:!0,types:[{id:"LogEntry",type:"object",description:"Log entry.",properties:[{name:"source",type:"string",enum:["xml","javascript","network","storage","appcache","rendering","security","deprecation","worker","violation","intervention","other"],description:"Log entry source."},{name:"level",type:"string",enum:["verbose","info","warning","error"],description:"Log entry severity."},{name:"text",type:"string",description:"Logged text."},{name:"timestamp",$ref:"Runtime.Timestamp",description:"Timestamp when this entry was added."},{name:"url",type:"string",optional:!0,description:"URL of the resource if known."},{name:"lineNumber",type:"integer",optional:!0,description:"Line number in the resource."},{name:"stackTrace",$ref:"Runtime.StackTrace",optional:!0,description:"JavaScript stack trace."},{name:"networkRequestId",$ref:"Network.RequestId",optional:!0,description:"Identifier of the network request associated with this entry."},{name:"workerId",type:"string",optional:!0,description:"Identifier of the worker associated with this entry."}]},{id:"ViolationSetting",type:"object",description:"Violation configuration setting.",properties:[{name:"name",type:"string",enum:["longTask","longLayout","blockedEvent","blockedParser","discouragedAPIUse","handler","recurringHandler"],description:"Violation type."},{name:"threshold",type:"number",description:"Time threshold to trigger upon."}]}],commands:[{name:"enable",description:"Enables log domain, sends the entries collected so far to the client by means of the <code>entryAdded</code> notification."},{name:"disable",description:"Disables log domain, prevents further log entries from being reported to the client."},{name:"clear",description:"Clears the log."},{name:"startViolationsReport",parameters:[{name:"config",type:"array",items:{$ref:"ViolationSetting"},description:"Configuration for violations."}],description:"start violation reporting."},{name:"stopViolationsReport",description:"Stop violation reporting."}],events:[{name:"entryAdded",parameters:[{name:"entry",$ref:"LogEntry",description:"The entry."}],description:"Issued when new message was logged."}]},{domain:"SystemInfo",description:"The SystemInfo domain defines methods and events for querying low-level system information.",experimental:!0,types:[{id:"GPUDevice",type:"object",properties:[{name:"vendorId",type:"number",description:"PCI ID of the GPU vendor, if available; 0 otherwise."},{name:"deviceId",type:"number",description:"PCI ID of the GPU device, if available; 0 otherwise."},{name:"vendorString",type:"string",description:"String description of the GPU vendor, if the PCI ID is not available."},{name:"deviceString",type:"string",description:"String description of the GPU device, if the PCI ID is not available."}],description:"Describes a single graphics processor (GPU)."},{id:"GPUInfo",type:"object",properties:[{name:"devices",type:"array",items:{$ref:"GPUDevice"},description:"The graphics devices on the system. Element 0 is the primary GPU."},{name:"auxAttributes",type:"object",optional:!0,description:"An optional dictionary of additional GPU related attributes."},{name:"featureStatus",type:"object",optional:!0,description:"An optional dictionary of graphics features and their status."},{name:"driverBugWorkarounds",type:"array",items:{type:"string"},description:"An optional array of GPU driver bug workarounds."}],description:"Provides information about the GPU(s) on the system."}],commands:[{name:"getInfo",description:"Returns information about the system.",returns:[{name:"gpu",$ref:"GPUInfo",description:"Information about the GPUs on the system."},{name:"modelName",type:"string",description:"A platform-dependent description of the model of the machine. On Mac OS, this is, for example, 'MacBookPro'. Will be the empty string if not supported."},{name:"modelVersion",type:"string",description:"A platform-dependent description of the version of the machine. On Mac OS, this is, for example, '10.1'. Will be the empty string if not supported."},{name:"commandLine",type:"string",description:"The command line string used to launch the browser. Will be the empty string if not supported."}]}]},{domain:"Tethering",description:"The Tethering domain defines methods and events for browser port binding.",experimental:!0,commands:[{name:"bind",description:"Request browser port binding.",parameters:[{name:"port",type:"integer",description:"Port number to bind."}]},{name:"unbind",description:"Request browser port unbinding.",parameters:[{name:"port",type:"integer",description:"Port number to unbind."}]}],events:[{name:"accepted",description:"Informs that port was successfully bound and got a specified connection id.",parameters:[{name:"port",type:"integer",description:"Port number that was successfully bound."},{name:"connectionId",type:"string",description:"Connection id to be used."}]}]},{domain:"Browser",description:"The Browser domain defines methods and events for browser managing.",experimental:!0,types:[{id:"WindowID",type:"integer"},{id:"WindowState",type:"string",enum:["normal","minimized","maximized","fullscreen"],description:"The state of the browser window."},{id:"Bounds",type:"object",description:"Browser window bounds information",properties:[{name:"left",type:"integer",optional:!0,description:"The offset from the left edge of the screen to the window in pixels."},{name:"top",type:"integer",optional:!0,description:"The offset from the top edge of the screen to the window in pixels."},{name:"width",type:"integer",optional:!0,description:"The window width in pixels."},{name:"height",type:"integer",optional:!0,description:"The window height in pixels."},{name:"windowState",$ref:"WindowState",optional:!0,description:"The window state. Default to normal."}]}],commands:[{name:"getWindowForTarget",description:"Get the browser window that contains the devtools target.",parameters:[{name:"targetId",$ref:"Target.TargetID",description:"Devtools agent host id."}],returns:[{name:"windowId",$ref:"WindowID",description:"Browser window id."},{name:"bounds",$ref:"Bounds",description:"Bounds information of the window. When window state is 'minimized', the restored window position and size are returned."}]},{name:"setWindowBounds",description:"Set position and/or size of the browser window.",parameters:[{name:"windowId",$ref:"WindowID",description:"Browser window id."},{name:"bounds",$ref:"Bounds",description:"New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged."}]},{name:"getWindowBounds",description:"Get position and size of the browser window.",parameters:[{name:"windowId",$ref:"WindowID",description:"Browser window id."}],returns:[{name:"bounds",$ref:"Bounds",description:"Bounds information of the window. When window state is 'minimized', the restored window position and size are returned."}]}]},{domain:"Schema",description:"Provides information about the protocol schema.",types:[{id:"Domain",type:"object",description:"Description of the protocol domain.",properties:[{name:"name",type:"string",description:"Domain name."},{name:"version",type:"string",description:"Domain version."}]}],commands:[{name:"getDomains",description:"Returns supported domains.",handlers:["browser","renderer"],returns:[{name:"domains",type:"array",items:{$ref:"Domain"},description:"List of supported domains."}]}]},{domain:"Runtime",description:"Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.",types:[{id:"ScriptId",type:"string",description:"Unique script identifier."},{id:"RemoteObjectId",type:"string",description:"Unique object identifier."},{id:"UnserializableValue",type:"string",enum:["Infinity","NaN","-Infinity","-0"],description:"Primitive value which cannot be JSON-stringified."},{id:"RemoteObject",type:"object",description:"Mirror object referencing original JavaScript object.",properties:[{name:"type",type:"string",enum:["object","function","undefined","string","number","boolean","symbol"],description:"Object type."},{name:"subtype",type:"string",optional:!0,enum:["array","null","node","regexp","date","map","set","weakmap","weakset","iterator","generator","error","proxy","promise","typedarray"],description:"Object subtype hint. Specified for <code>object</code> type values only."},{name:"className",type:"string",optional:!0,description:"Object class (constructor) name. Specified for <code>object</code> type values only."},{name:"value",type:"any",optional:!0,description:"Remote object value in case of primitive values or JSON values (if it was requested)."},{name:"unserializableValue",$ref:"UnserializableValue",optional:!0,description:"Primitive value which can not be JSON-stringified does not have <code>value</code>, but gets this property."},{name:"description",type:"string",optional:!0,description:"String representation of the object."},{name:"objectId",$ref:"RemoteObjectId",optional:!0,description:"Unique object identifier (for non-primitive values)."},{name:"preview",$ref:"ObjectPreview",optional:!0,description:"Preview containing abbreviated property values. Specified for <code>object</code> type values only.",experimental:!0},{name:"customPreview",$ref:"CustomPreview",optional:!0,experimental:!0}]},{id:"CustomPreview",type:"object",experimental:!0,properties:[{name:"header",type:"string"},{name:"hasBody",type:"boolean"},{name:"formatterObjectId",$ref:"RemoteObjectId"},{name:"bindRemoteObjectFunctionId",$ref:"RemoteObjectId"},{name:"configObjectId",$ref:"RemoteObjectId",optional:!0}]},{id:"ObjectPreview",type:"object",experimental:!0,description:"Object containing abbreviated remote object value.",properties:[{name:"type",type:"string",enum:["object","function","undefined","string","number","boolean","symbol"],description:"Object type."},{name:"subtype",type:"string",optional:!0,enum:["array","null","node","regexp","date","map","set","weakmap","weakset","iterator","generator","error"],description:"Object subtype hint. Specified for <code>object</code> type values only."},{name:"description",type:"string",optional:!0,description:"String representation of the object."},{name:"overflow",type:"boolean",description:"True iff some of the properties or entries of the original object did not fit."},{name:"properties",type:"array",items:{$ref:"PropertyPreview"},description:"List of the properties."},{name:"entries",type:"array",items:{$ref:"EntryPreview"},optional:!0,description:"List of the entries. Specified for <code>map</code> and <code>set</code> subtype values only."}]},{id:"PropertyPreview",type:"object",experimental:!0,properties:[{name:"name",type:"string",description:"Property name."},{name:"type",type:"string",enum:["object","function","undefined","string","number","boolean","symbol","accessor"],description:"Object type. Accessor means that the property itself is an accessor property."},{name:"value",type:"string",optional:!0,description:"User-friendly property value string."},{name:"valuePreview",$ref:"ObjectPreview",optional:!0,description:"Nested value preview."},{name:"subtype",type:"string",optional:!0,enum:["array","null","node","regexp","date","map","set","weakmap","weakset","iterator","generator","error"],description:"Object subtype hint. Specified for <code>object</code> type values only."}]},{id:"EntryPreview",type:"object",experimental:!0,properties:[{name:"key",$ref:"ObjectPreview",optional:!0,description:"Preview of the key. Specified for map-like collection entries."},{name:"value",$ref:"ObjectPreview",description:"Preview of the value."}]},{id:"PropertyDescriptor",type:"object",description:"Object property descriptor.",properties:[{name:"name",type:"string",description:"Property name or symbol description."},{name:"value",$ref:"RemoteObject",optional:!0,description:"The value associated with the property."},{name:"writable",type:"boolean",optional:!0,description:"True if the value associated with the property may be changed (data descriptors only)."},{name:"get",$ref:"RemoteObject",optional:!0,description:"A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only)."},{name:"set",$ref:"RemoteObject",optional:!0,description:"A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only)."},{name:"configurable",type:"boolean",description:"True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object."},{name:"enumerable",type:"boolean",description:"True if this property shows up during enumeration of the properties on the corresponding object."},{name:"wasThrown",type:"boolean",optional:!0,description:"True if the result was thrown during the evaluation."},{name:"isOwn",optional:!0,type:"boolean",description:"True if the property is owned for the object."},{name:"symbol",$ref:"RemoteObject",optional:!0,description:"Property symbol object, if the property is of the <code>symbol</code> type."}]},{id:"InternalPropertyDescriptor",type:"object",description:"Object internal property descriptor. This property isn't normally visible in JavaScript code.",properties:[{name:"name",type:"string",description:"Conventional property name."},{name:"value",$ref:"RemoteObject",optional:!0,description:"The value associated with the property."}]},{id:"CallArgument",type:"object",description:"Represents function call argument. Either remote object id <code>objectId</code>, primitive <code>value</code>, unserializable primitive value or neither of (for undefined) them should be specified.",properties:[{name:"value",type:"any",optional:!0,description:"Primitive value."},{name:"unserializableValue",$ref:"UnserializableValue",optional:!0,description:"Primitive value which can not be JSON-stringified."},{name:"objectId",$ref:"RemoteObjectId",optional:!0,description:"Remote object handle."}]},{id:"ExecutionContextId",type:"integer",description:"Id of an execution context."},{id:"ExecutionContextDescription",type:"object",description:"Description of an isolated world.",properties:[{name:"id",$ref:"ExecutionContextId",description:"Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed."},{name:"origin",type:"string",description:"Execution context origin."},{name:"name",type:"string",description:"Human readable name describing given context."},{name:"auxData",type:"object",optional:!0,description:"Embedder-specific auxiliary data."}]},{id:"ExceptionDetails",type:"object",description:"Detailed information about exception (or error) that was thrown during script compilation or execution.",properties:[{name:"exceptionId",type:"integer",description:"Exception id."},{name:"text",type:"string",description:"Exception text, which should be used together with exception object when available."},{name:"lineNumber",type:"integer",description:"Line number of the exception location (0-based)."},{name:"columnNumber",type:"integer",description:"Column number of the exception location (0-based)."},{name:"scriptId",$ref:"ScriptId",optional:!0,description:"Script ID of the exception location."},{name:"url",type:"string",optional:!0,description:"URL of the exception location, to be used when the script was not reported."},{name:"stackTrace",$ref:"StackTrace",optional:!0,description:"JavaScript stack trace if available."},{name:"exception",$ref:"RemoteObject",optional:!0,description:"Exception object if available."},{name:"executionContextId",$ref:"ExecutionContextId",optional:!0,description:"Identifier of the context where exception happened."}]},{id:"Timestamp",type:"number",description:"Number of milliseconds since epoch."},{id:"CallFrame",type:"object",description:"Stack entry for runtime errors and assertions.",properties:[{name:"functionName",type:"string",description:"JavaScript function name."},{name:"scriptId",$ref:"ScriptId",description:"JavaScript script id."},{name:"url",type:"string",description:"JavaScript script name or url."},{name:"lineNumber",type:"integer",description:"JavaScript script line number (0-based)."},{name:"columnNumber",type:"integer",description:"JavaScript script column number (0-based)."}]},{id:"StackTrace",type:"object",description:"Call frames for assertions or error messages.",properties:[{name:"description",type:"string",optional:!0,description:"String label of this stack trace. For async traces this may be a name of the function that initiated the async call."},{name:"callFrames",type:"array",items:{$ref:"CallFrame"},description:"JavaScript function name."},{name:"parent",$ref:"StackTrace",optional:!0,description:"Asynchronous JavaScript stack trace that preceded this stack, if available."},{name:"promiseCreationFrame",$ref:"CallFrame",optional:!0,experimental:!0,description:"Creation frame of the Promise which produced the next synchronous trace when resolved, if available."}]}],commands:[{name:"evaluate",parameters:[{name:"expression",type:"string",description:"Expression to evaluate."},{name:"objectGroup",type:"string",optional:!0,description:"Symbolic group name that can be used to release multiple objects."},{name:"includeCommandLineAPI",type:"boolean",optional:!0,description:"Determines whether Command Line API should be available during the evaluation."},{name:"silent",type:"boolean",optional:!0,description:"In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state."},{name:"contextId",$ref:"ExecutionContextId",optional:!0,description:"Specifies in which execution context to perform evaluation. If the parameter is omitted the evaluation will be performed in the context of the inspected page."},{name:"returnByValue",type:"boolean",optional:!0,description:"Whether the result is expected to be a JSON object that should be sent by value."},{name:"generatePreview",type:"boolean",optional:!0,experimental:!0,description:"Whether preview should be generated for the result."},{name:"userGesture",type:"boolean",optional:!0,experimental:!0,description:"Whether execution should be treated as initiated by user in the UI."},{name:"awaitPromise",type:"boolean",optional:!0,description:"Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error."}],returns:[{name:"result",$ref:"RemoteObject",description:"Evaluation result."},{name:"exceptionDetails",$ref:"ExceptionDetails",optional:!0,description:"Exception details."}],description:"Evaluates expression on global object."},{name:"awaitPromise",parameters:[{name:"promiseObjectId",$ref:"RemoteObjectId",description:"Identifier of the promise."},{name:"returnByValue",type:"boolean",optional:!0,description:"Whether the result is expected to be a JSON object that should be sent by value."},{name:"generatePreview",type:"boolean",optional:!0,description:"Whether preview should be generated for the result."}],returns:[{name:"result",$ref:"RemoteObject",description:"Promise result. Will contain rejected value if promise was rejected."},{name:"exceptionDetails",$ref:"ExceptionDetails",optional:!0,description:"Exception details if stack strace is available."}],description:"Add handler to promise with given promise object id."},{name:"callFunctionOn",parameters:[{name:"objectId",$ref:"RemoteObjectId",description:"Identifier of the object to call function on."},{name:"functionDeclaration",type:"string",description:"Declaration of the function to call."},{name:"arguments",type:"array",items:{$ref:"CallArgument",description:"Call argument."},optional:!0,description:"Call arguments. All call arguments must belong to the same JavaScript world as the target object."},{name:"silent",type:"boolean",optional:!0,description:"In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state."},{name:"returnByValue",type:"boolean",optional:!0,description:"Whether the result is expected to be a JSON object which should be sent by value."},{name:"generatePreview",type:"boolean",optional:!0,experimental:!0,description:"Whether preview should be generated for the result."},{name:"userGesture",type:"boolean",optional:!0,experimental:!0,description:"Whether execution should be treated as initiated by user in the UI."},{name:"awaitPromise",type:"boolean",optional:!0,description:"Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error."}],returns:[{name:"result",$ref:"RemoteObject",description:"Call result."},{name:"exceptionDetails",$ref:"ExceptionDetails",optional:!0,description:"Exception details."}],description:"Calls function with given declaration on the given object. Object group of the result is inherited from the target object."},{name:"getProperties",parameters:[{name:"objectId",$ref:"RemoteObjectId",description:"Identifier of the object to return properties for."},{name:"ownProperties",optional:!0,type:"boolean",description:"If true, returns properties belonging only to the element itself, not to its prototype chain."},{name:"accessorPropertiesOnly",optional:!0,type:"boolean",description:"If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.",experimental:!0},{name:"generatePreview",type:"boolean",optional:!0,experimental:!0,description:"Whether preview should be generated for the results."}],returns:[{name:"result",type:"array",items:{$ref:"PropertyDescriptor"},description:"Object properties."},{name:"internalProperties",optional:!0,type:"array",items:{$ref:"InternalPropertyDescriptor"},description:"Internal object properties (only of the element itself)."},{name:"exceptionDetails",$ref:"ExceptionDetails",optional:!0,description:"Exception details."}],description:"Returns properties of a given object. Object group of the result is inherited from the target object."},{name:"releaseObject",parameters:[{name:"objectId",$ref:"RemoteObjectId",description:"Identifier of the object to release."}],description:"Releases remote object with given id."},{name:"releaseObjectGroup",parameters:[{name:"objectGroup",type:"string",description:"Symbolic object group name."}],description:"Releases all remote objects that belong to a given group."},{name:"runIfWaitingForDebugger",description:"Tells inspected instance to run if it was waiting for debugger to attach."},{name:"enable",description:"Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context."},{name:"disable",description:"Disables reporting of execution contexts creation."},{name:"discardConsoleEntries",description:"Discards collected exceptions and console API calls."},{name:"setCustomObjectFormatterEnabled",parameters:[{name:"enabled",type:"boolean"}],experimental:!0},{name:"compileScript",parameters:[{name:"expression",type:"string",description:"Expression to compile."},{name:"sourceURL",type:"string",description:"Source url to be set for the script."},{name:"persistScript",type:"boolean",description:"Specifies whether the compiled script should be persisted."},{name:"executionContextId",$ref:"ExecutionContextId",optional:!0,description:"Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page."}],returns:[{name:"scriptId",$ref:"ScriptId",optional:!0,description:"Id of the script."},{name:"exceptionDetails",$ref:"ExceptionDetails",optional:!0,description:"Exception details."}],description:"Compiles expression."},{name:"runScript",parameters:[{name:"scriptId",$ref:"ScriptId",description:"Id of the script to run."},{name:"executionContextId",$ref:"ExecutionContextId",optional:!0,description:"Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page."},{name:"objectGroup",type:"string",optional:!0,description:"Symbolic group name that can be used to release multiple objects."},{name:"silent",type:"boolean",optional:!0,description:"In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state."},{name:"includeCommandLineAPI",type:"boolean",optional:!0,description:"Determines whether Command Line API should be available during the evaluation."},{name:"returnByValue",type:"boolean",optional:!0,description:"Whether the result is expected to be a JSON object which should be sent by value."},{name:"generatePreview",type:"boolean",optional:!0,description:"Whether preview should be generated for the result."},{name:"awaitPromise",type:"boolean",optional:!0,description:"Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error."}],returns:[{name:"result",$ref:"RemoteObject",description:"Run result."},{name:"exceptionDetails",$ref:"ExceptionDetails",optional:!0,description:"Exception details."}],description:"Runs script with given id in a given context."}],events:[{name:"executionContextCreated",parameters:[{name:"context",$ref:"ExecutionContextDescription",description:"A newly created execution context."}],description:"Issued when new execution context is created."
},{name:"executionContextDestroyed",parameters:[{name:"executionContextId",$ref:"ExecutionContextId",description:"Id of the destroyed context"}],description:"Issued when execution context is destroyed."},{name:"executionContextsCleared",description:"Issued when all executionContexts were cleared in browser"},{name:"exceptionThrown",description:"Issued when exception was thrown and unhandled.",parameters:[{name:"timestamp",$ref:"Timestamp",description:"Timestamp of the exception."},{name:"exceptionDetails",$ref:"ExceptionDetails"}]},{name:"exceptionRevoked",description:"Issued when unhandled exception was revoked.",parameters:[{name:"reason",type:"string",description:"Reason describing why exception was revoked."},{name:"exceptionId",type:"integer",description:"The id of revoked exception, as reported in <code>exceptionUnhandled</code>."}]},{name:"consoleAPICalled",description:"Issued when console API was called.",parameters:[{name:"type",type:"string",enum:["log","debug","info","error","warning","dir","dirxml","table","trace","clear","startGroup","startGroupCollapsed","endGroup","assert","profile","profileEnd","count","timeEnd"],description:"Type of the call."},{name:"args",type:"array",items:{$ref:"RemoteObject"},description:"Call arguments."},{name:"executionContextId",$ref:"ExecutionContextId",description:"Identifier of the context where the call was made."},{name:"timestamp",$ref:"Timestamp",description:"Call timestamp."},{name:"stackTrace",$ref:"StackTrace",optional:!0,description:"Stack trace captured when the call was made."},{name:"context",type:"string",optional:!0,experimental:!0,description:"Console context descriptor for calls on non-default console context (not console.*): 'anonymous#unique-logger-id' for call on unnamed context, 'name#unique-logger-id' for call on named context."}]},{name:"inspectRequested",description:"Issued when object should be inspected (for example, as a result of inspect() command line API call).",parameters:[{name:"object",$ref:"RemoteObject"},{name:"hints",type:"object"}]}]},{domain:"Debugger",description:"Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.",dependencies:["Runtime"],types:[{id:"BreakpointId",type:"string",description:"Breakpoint identifier."},{id:"CallFrameId",type:"string",description:"Call frame identifier."},{id:"Location",type:"object",properties:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Script identifier as reported in the <code>Debugger.scriptParsed</code>."},{name:"lineNumber",type:"integer",description:"Line number in the script (0-based)."},{name:"columnNumber",type:"integer",optional:!0,description:"Column number in the script (0-based)."}],description:"Location in the source code."},{id:"ScriptPosition",experimental:!0,type:"object",properties:[{name:"lineNumber",type:"integer"},{name:"columnNumber",type:"integer"}],description:"Location in the source code."},{id:"CallFrame",type:"object",properties:[{name:"callFrameId",$ref:"CallFrameId",description:"Call frame identifier. This identifier is only valid while the virtual machine is paused."},{name:"functionName",type:"string",description:"Name of the JavaScript function called on this call frame."},{name:"functionLocation",$ref:"Location",optional:!0,experimental:!0,description:"Location in the source code."},{name:"location",$ref:"Location",description:"Location in the source code."},{name:"scopeChain",type:"array",items:{$ref:"Scope"},description:"Scope chain for this call frame."},{name:"this",$ref:"Runtime.RemoteObject",description:"<code>this</code> object for this call frame."},{name:"returnValue",$ref:"Runtime.RemoteObject",optional:!0,description:"The value being returned, if the function is at return point."}],description:"JavaScript call frame. Array of call frames form the call stack."},{id:"Scope",type:"object",properties:[{name:"type",type:"string",enum:["global","local","with","closure","catch","block","script","eval","module"],description:"Scope type."},{name:"object",$ref:"Runtime.RemoteObject",description:"Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties."},{name:"name",type:"string",optional:!0},{name:"startLocation",$ref:"Location",optional:!0,description:"Location in the source code where scope starts"},{name:"endLocation",$ref:"Location",optional:!0,description:"Location in the source code where scope ends"}],description:"Scope description."},{id:"SearchMatch",type:"object",description:"Search match for resource.",properties:[{name:"lineNumber",type:"number",description:"Line number in resource content."},{name:"lineContent",type:"string",description:"Line with match content."}],experimental:!0},{id:"BreakLocation",type:"object",properties:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Script identifier as reported in the <code>Debugger.scriptParsed</code>."},{name:"lineNumber",type:"integer",description:"Line number in the script (0-based)."},{name:"columnNumber",type:"integer",optional:!0,description:"Column number in the script (0-based)."},{name:"type",type:"string",enum:["debuggerStatement","call","return"],optional:!0}],experimental:!0}],commands:[{name:"enable",description:"Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received."},{name:"disable",description:"Disables debugger for given page."},{name:"setBreakpointsActive",parameters:[{name:"active",type:"boolean",description:"New value for breakpoints active state."}],description:"Activates / deactivates all breakpoints on the page."},{name:"setSkipAllPauses",parameters:[{name:"skip",type:"boolean",description:"New value for skip pauses state."}],description:"Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc)."},{name:"setBreakpointByUrl",parameters:[{name:"lineNumber",type:"integer",description:"Line number to set breakpoint at."},{name:"url",type:"string",optional:!0,description:"URL of the resources to set breakpoint on."},{name:"urlRegex",type:"string",optional:!0,description:"Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified."},{name:"columnNumber",type:"integer",optional:!0,description:"Offset in the line to set breakpoint at."},{name:"condition",type:"string",optional:!0,description:"Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true."}],returns:[{name:"breakpointId",$ref:"BreakpointId",description:"Id of the created breakpoint for further reference."},{name:"locations",type:"array",items:{$ref:"Location"},description:"List of the locations this breakpoint resolved into upon addition."}],description:"Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads."},{name:"setBreakpoint",parameters:[{name:"location",$ref:"Location",description:"Location to set breakpoint in."},{name:"condition",type:"string",optional:!0,description:"Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true."}],returns:[{name:"breakpointId",$ref:"BreakpointId",description:"Id of the created breakpoint for further reference."},{name:"actualLocation",$ref:"Location",description:"Location this breakpoint resolved into."}],description:"Sets JavaScript breakpoint at a given location."},{name:"removeBreakpoint",parameters:[{name:"breakpointId",$ref:"BreakpointId"}],description:"Removes JavaScript breakpoint."},{name:"getPossibleBreakpoints",parameters:[{name:"start",$ref:"Location",description:"Start of range to search possible breakpoint locations in."},{name:"end",$ref:"Location",optional:!0,description:"End of range to search possible breakpoint locations in (excluding). When not specified, end of scripts is used as end of range."},{name:"restrictToFunction",type:"boolean",optional:!0,description:"Only consider locations which are in the same (non-nested) function as start."}],returns:[{name:"locations",type:"array",items:{$ref:"BreakLocation"},description:"List of the possible breakpoint locations."}],description:"Returns possible locations for breakpoint. scriptId in start and end range locations should be the same.",experimental:!0},{name:"continueToLocation",parameters:[{name:"location",$ref:"Location",description:"Location to continue to."},{name:"targetCallFrames",type:"string",enum:["any","current"],optional:!0,experimental:!0}],description:"Continues execution until specific location is reached."},{name:"stepOver",description:"Steps over the statement."},{name:"stepInto",description:"Steps into the function call."},{name:"stepOut",description:"Steps out of the function call."},{name:"pause",description:"Stops on the next JavaScript statement."},{name:"scheduleStepIntoAsync",description:"Steps into next scheduled async task if any is scheduled before next pause. Returns success when async task is actually scheduled, returns error if no task were scheduled or another scheduleStepIntoAsync was called.",experimental:!0},{name:"resume",description:"Resumes JavaScript execution."},{name:"searchInContent",parameters:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Id of the script to search in."},{name:"query",type:"string",description:"String to search for."},{name:"caseSensitive",type:"boolean",optional:!0,description:"If true, search is case sensitive."},{name:"isRegex",type:"boolean",optional:!0,description:"If true, treats string parameter as regex."}],returns:[{name:"result",type:"array",items:{$ref:"SearchMatch"},description:"List of search matches."}],experimental:!0,description:"Searches for given string in script content."},{name:"setScriptSource",parameters:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Id of the script to edit."},{name:"scriptSource",type:"string",description:"New content of the script."},{name:"dryRun",type:"boolean",optional:!0,description:" If true the change will not actually be applied. Dry run may be used to get result description without actually modifying the code."}],returns:[{name:"callFrames",type:"array",optional:!0,items:{$ref:"CallFrame"},description:"New stack trace in case editing has happened while VM was stopped."},{name:"stackChanged",type:"boolean",optional:!0,description:"Whether current call stack  was modified after applying the changes."},{name:"asyncStackTrace",$ref:"Runtime.StackTrace",optional:!0,description:"Async stack trace, if any."},{name:"exceptionDetails",optional:!0,$ref:"Runtime.ExceptionDetails",description:"Exception details if any."}],description:"Edits JavaScript source live."},{name:"restartFrame",parameters:[{name:"callFrameId",$ref:"CallFrameId",description:"Call frame identifier to evaluate on."}],returns:[{name:"callFrames",type:"array",items:{$ref:"CallFrame"},description:"New stack trace."},{name:"asyncStackTrace",$ref:"Runtime.StackTrace",optional:!0,description:"Async stack trace, if any."}],description:"Restarts particular call frame from the beginning."},{name:"getScriptSource",parameters:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Id of the script to get source for."}],returns:[{name:"scriptSource",type:"string",description:"Script source."}],description:"Returns source for the script with given id."},{name:"setPauseOnExceptions",parameters:[{name:"state",type:"string",enum:["none","uncaught","all"],description:"Pause on exceptions mode."}],description:"Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>."},{name:"evaluateOnCallFrame",parameters:[{name:"callFrameId",$ref:"CallFrameId",description:"Call frame identifier to evaluate on."},{name:"expression",type:"string",description:"Expression to evaluate."},{name:"objectGroup",type:"string",optional:!0,description:"String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>)."},{name:"includeCommandLineAPI",type:"boolean",optional:!0,description:"Specifies whether command line API should be available to the evaluated expression, defaults to false."},{name:"silent",type:"boolean",optional:!0,description:"In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state."},{name:"returnByValue",type:"boolean",optional:!0,description:"Whether the result is expected to be a JSON object that should be sent by value."},{name:"generatePreview",type:"boolean",optional:!0,experimental:!0,description:"Whether preview should be generated for the result."},{name:"throwOnSideEffect",type:"boolean",optional:!0,experimental:!0,description:"Whether to throw an exception if side effect cannot be ruled out during evaluation."}],returns:[{name:"result",$ref:"Runtime.RemoteObject",description:"Object wrapper for the evaluation result."},{name:"exceptionDetails",$ref:"Runtime.ExceptionDetails",optional:!0,description:"Exception details."}],description:"Evaluates expression on a given call frame."},{name:"setVariableValue",parameters:[{name:"scopeNumber",type:"integer",description:"0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually."},{name:"variableName",type:"string",description:"Variable name."},{name:"newValue",$ref:"Runtime.CallArgument",description:"New variable value."},{name:"callFrameId",$ref:"CallFrameId",description:"Id of callframe that holds variable."}],description:"Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually."},{name:"setAsyncCallStackDepth",parameters:[{name:"maxDepth",type:"integer",description:"Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default)."}],description:"Enables or disables async call stacks tracking."},{name:"setBlackboxPatterns",parameters:[{name:"patterns",type:"array",items:{type:"string"},description:"Array of regexps that will be used to check script url for blackbox state."}],experimental:!0,description:"Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful."},{name:"setBlackboxedRanges",parameters:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Id of the script."},{name:"positions",type:"array",items:{$ref:"ScriptPosition"}}],experimental:!0,description:"Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted."}],events:[{name:"scriptParsed",parameters:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Identifier of the script parsed."},{name:"url",type:"string",description:"URL or name of the script parsed (if any)."},{name:"startLine",type:"integer",description:"Line offset of the script within the resource with given URL (for script tags)."},{name:"startColumn",type:"integer",description:"Column offset of the script within the resource with given URL."},{name:"endLine",type:"integer",description:"Last line of the script."},{name:"endColumn",type:"integer",description:"Length of the last line of the script."},{name:"executionContextId",$ref:"Runtime.ExecutionContextId",description:"Specifies script creation context."},{name:"hash",type:"string",description:"Content hash of the script."},{name:"executionContextAuxData",type:"object",optional:!0,description:"Embedder-specific auxiliary data."},{name:"isLiveEdit",type:"boolean",optional:!0,description:"True, if this script is generated as a result of the live edit operation.",experimental:!0},{name:"sourceMapURL",type:"string",optional:!0,description:"URL of source map associated with script (if any)."},{name:"hasSourceURL",type:"boolean",optional:!0,description:"True, if this script has sourceURL.",experimental:!0},{name:"isModule",type:"boolean",optional:!0,description:"True, if this script is ES6 module.",experimental:!0},{name:"length",type:"integer",optional:!0,description:"This script length.",experimental:!0},{name:"stackTrace",$ref:"Runtime.StackTrace",optional:!0,description:"JavaScript top stack frame of where the script parsed event was triggered if available.",experimental:!0}],description:"Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger."},{name:"scriptFailedToParse",parameters:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"Identifier of the script parsed."},{name:"url",type:"string",description:"URL or name of the script parsed (if any)."},{name:"startLine",type:"integer",description:"Line offset of the script within the resource with given URL (for script tags)."},{name:"startColumn",type:"integer",description:"Column offset of the script within the resource with given URL."},{name:"endLine",type:"integer",description:"Last line of the script."},{name:"endColumn",type:"integer",description:"Length of the last line of the script."},{name:"executionContextId",$ref:"Runtime.ExecutionContextId",description:"Specifies script creation context."},{name:"hash",type:"string",description:"Content hash of the script."},{name:"executionContextAuxData",type:"object",optional:!0,description:"Embedder-specific auxiliary data."},{name:"sourceMapURL",type:"string",optional:!0,description:"URL of source map associated with script (if any)."},{name:"hasSourceURL",type:"boolean",optional:!0,description:"True, if this script has sourceURL.",experimental:!0},{name:"isModule",type:"boolean",optional:!0,description:"True, if this script is ES6 module.",experimental:!0},{name:"length",type:"integer",optional:!0,description:"This script length.",experimental:!0},{name:"stackTrace",$ref:"Runtime.StackTrace",optional:!0,description:"JavaScript top stack frame of where the script parsed event was triggered if available.",experimental:!0}],description:"Fired when virtual machine fails to parse the script."},{name:"breakpointResolved",parameters:[{name:"breakpointId",$ref:"BreakpointId",description:"Breakpoint unique identifier."},{name:"location",$ref:"Location",description:"Actual breakpoint location."}],description:"Fired when breakpoint is resolved to an actual script and location."},{name:"paused",parameters:[{name:"callFrames",type:"array",items:{$ref:"CallFrame"},description:"Call stack the virtual machine stopped on."},{name:"reason",type:"string",enum:["XHR","DOM","EventListener","exception","assert","debugCommand","promiseRejection","OOM","other","ambiguous"],description:"Pause reason."},{name:"data",type:"object",optional:!0,description:"Object containing break-specific auxiliary properties."},{name:"hitBreakpoints",type:"array",optional:!0,items:{type:"string"},description:"Hit breakpoints IDs"},{name:"asyncStackTrace",$ref:"Runtime.StackTrace",optional:!0,description:"Async stack trace, if any."}],description:"Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria."},{name:"resumed",description:"Fired when the virtual machine resumed execution."}]},{domain:"Console",description:"This domain is deprecated - use Runtime or Log instead.",dependencies:["Runtime"],deprecated:!0,types:[{id:"ConsoleMessage",type:"object",description:"Console message.",properties:[{name:"source",type:"string",enum:["xml","javascript","network","console-api","storage","appcache","rendering","security","other","deprecation","worker"],description:"Message source."},{name:"level",type:"string",enum:["log","warning","error","debug","info"],description:"Message severity."},{name:"text",type:"string",description:"Message text."},{name:"url",type:"string",optional:!0,description:"URL of the message origin."},{name:"line",type:"integer",optional:!0,description:"Line number in the resource that generated this message (1-based)."},{name:"column",type:"integer",optional:!0,description:"Column number in the resource that generated this message (1-based)."}]}],commands:[{name:"enable",description:"Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification."},{name:"disable",description:"Disables console domain, prevents further console messages from being reported to the client."},{name:"clearMessages",description:"Does nothing."}],events:[{name:"messageAdded",parameters:[{name:"message",$ref:"ConsoleMessage",description:"Console message that has been added."}],description:"Issued when new console message is added."}]},{domain:"Profiler",dependencies:["Runtime","Debugger"],types:[{id:"ProfileNode",type:"object",description:"Profile node. Holds callsite information, execution statistics and child nodes.",properties:[{name:"id",type:"integer",description:"Unique id of the node."},{name:"callFrame",$ref:"Runtime.CallFrame",description:"Function location."},{name:"hitCount",type:"integer",optional:!0,experimental:!0,description:"Number of samples where this node was on top of the call stack."},{name:"children",type:"array",items:{type:"integer"},optional:!0,description:"Child node ids."},{name:"deoptReason",type:"string",optional:!0,description:"The reason of being not optimized. The function may be deoptimized or marked as don't optimize."},{name:"positionTicks",type:"array",items:{$ref:"PositionTickInfo"},optional:!0,experimental:!0,description:"An array of source position ticks."}]},{id:"Profile",type:"object",description:"Profile.",properties:[{name:"nodes",type:"array",items:{$ref:"ProfileNode"},description:"The list of profile nodes. First item is the root node."},{name:"startTime",type:"number",description:"Profiling start timestamp in microseconds."},{name:"endTime",type:"number",description:"Profiling end timestamp in microseconds."},{name:"samples",optional:!0,type:"array",items:{type:"integer"},description:"Ids of samples top nodes."},{name:"timeDeltas",optional:!0,type:"array",items:{type:"integer"},description:"Time intervals between adjacent samples in microseconds. The first delta is relative to the profile startTime."}]},{id:"PositionTickInfo",type:"object",experimental:!0,description:"Specifies a number of samples attributed to a certain source position.",properties:[{name:"line",type:"integer",description:"Source line number (1-based)."},{name:"ticks",type:"integer",description:"Number of samples attributed to the source line."}]},{id:"CoverageRange",type:"object",description:"Coverage data for a source range.",properties:[{name:"startOffset",type:"integer",description:"JavaScript script source offset for the range start."},{name:"endOffset",type:"integer",description:"JavaScript script source offset for the range end."},{name:"count",type:"integer",description:"Collected execution count of the source range."}],experimental:!0},{id:"FunctionCoverage",type:"object",description:"Coverage data for a JavaScript function.",properties:[{name:"functionName",type:"string",description:"JavaScript function name."},{name:"ranges",type:"array",items:{$ref:"CoverageRange"},description:"Source ranges inside the function with coverage data."},{name:"isBlockCoverage",type:"boolean",description:"Whether coverage data for this function has block granularity."}],experimental:!0},{id:"ScriptCoverage",type:"object",description:"Coverage data for a JavaScript script.",properties:[{name:"scriptId",$ref:"Runtime.ScriptId",description:"JavaScript script id."},{name:"url",type:"string",description:"JavaScript script name or url."},{name:"functions",type:"array",items:{$ref:"FunctionCoverage"},description:"Functions contained in the script that has coverage data."}],experimental:!0}],commands:[{name:"enable"},{name:"disable"},{name:"setSamplingInterval",parameters:[{name:"interval",type:"integer",description:"New sampling interval in microseconds."}],description:"Changes CPU profiler sampling interval. Must be called before CPU profiles recording started."},{name:"start"},{name:"stop",returns:[{name:"profile",$ref:"Profile",description:"Recorded profile."}]},{name:"startPreciseCoverage",parameters:[{name:"callCount",type:"boolean",optional:!0,description:"Collect accurate call counts beyond simple 'covered' or 'not covered'."}],description:"Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code coverage may be incomplete. Enabling prevents running optimized code and resets execution counters.",experimental:!0},{name:"stopPreciseCoverage",description:"Disable precise code coverage. Disabling releases unnecessary execution count records and allows executing optimized code.",experimental:!0},{name:"takePreciseCoverage",returns:[{name:"result",type:"array",items:{$ref:"ScriptCoverage"},description:"Coverage data for the current isolate."}],description:"Collect coverage data for the current isolate, and resets execution counters. Precise code coverage needs to have started.",experimental:!0},{name:"getBestEffortCoverage",returns:[{name:"result",type:"array",items:{$ref:"ScriptCoverage"},description:"Coverage data for the current isolate."}],description:"Collect coverage data for the current isolate. The coverage data may be incomplete due to garbage collection.",experimental:!0}],events:[{name:"consoleProfileStarted",parameters:[{name:"id",type:"string"},{name:"location",$ref:"Debugger.Location",description:"Location of console.profile()."},{name:"title",type:"string",optional:!0,description:"Profile title passed as an argument to console.profile()."}],description:"Sent when new profile recording is started using console.profile() call."},{name:"consoleProfileFinished",parameters:[{name:"id",type:"string"},{name:"location",$ref:"Debugger.Location",description:"Location of console.profileEnd()."},{name:"profile",$ref:"Profile"},{name:"title",type:"string",optional:!0,description:"Profile title passed as an argument to console.profile()."}]}]},{domain:"HeapProfiler",dependencies:["Runtime"],experimental:!0,types:[{id:"HeapSnapshotObjectId",type:"string",description:"Heap snapshot object id."},{id:"SamplingHeapProfileNode",type:"object",description:"Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.",properties:[{name:"callFrame",$ref:"Runtime.CallFrame",description:"Function location."},{name:"selfSize",type:"number",description:"Allocations size in bytes for the node excluding children."},{name:"children",type:"array",items:{$ref:"SamplingHeapProfileNode"},description:"Child nodes."}]},{id:"SamplingHeapProfile",type:"object",description:"Profile.",properties:[{name:"head",$ref:"SamplingHeapProfileNode"}]}],commands:[{name:"enable"},{name:"disable"},{name:"startTrackingHeapObjects",parameters:[{name:"trackAllocations",type:"boolean",optional:!0}]},{name:"stopTrackingHeapObjects",parameters:[{name:"reportProgress",type:"boolean",optional:!0,description:"If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped."}]},{name:"takeHeapSnapshot",parameters:[{name:"reportProgress",type:"boolean",optional:!0,description:"If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken."}]},{name:"collectGarbage"},{name:"getObjectByHeapObjectId",parameters:[{name:"objectId",$ref:"HeapSnapshotObjectId"},{name:"objectGroup",type:"string",optional:!0,description:"Symbolic group name that can be used to release multiple objects."}],returns:[{name:"result",$ref:"Runtime.RemoteObject",description:"Evaluation result."}]},{name:"addInspectedHeapObject",parameters:[{name:"heapObjectId",$ref:"HeapSnapshotObjectId",description:"Heap snapshot object id to be accessible by means of $x command line API."}],description:"Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions)."},{name:"getHeapObjectId",parameters:[{name:"objectId",$ref:"Runtime.RemoteObjectId",description:"Identifier of the object to get heap object id for."}],returns:[{name:"heapSnapshotObjectId",$ref:"HeapSnapshotObjectId",description:"Id of the heap snapshot object corresponding to the passed remote object id."}]},{name:"startSampling",parameters:[{name:"samplingInterval",type:"number",optional:!0,description:"Average sample interval in bytes. Poisson distribution is used for the intervals. The default value is 32768 bytes."}]},{name:"stopSampling",returns:[{name:"profile",$ref:"SamplingHeapProfile",description:"Recorded sampling heap profile."}]}],events:[{name:"addHeapSnapshotChunk",parameters:[{name:"chunk",type:"string"}]},{name:"resetProfiles"},{name:"reportHeapSnapshotProgress",parameters:[{name:"done",type:"integer"},{name:"total",type:"integer"},{name:"finished",type:"boolean",optional:!0}]},{name:"lastSeenObjectId",description:"If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.",parameters:[{name:"lastSeenObjectId",type:"integer"},{name:"timestamp",type:"number"}]},{name:"heapStatsUpdate",description:"If heap objects tracking has been started then backend may send update for one or more fragments",parameters:[{name:"statsUpdate",type:"array",items:{type:"integer"},description:"An array of triplets. Each triplet describes a fragment. The first integer is the fragment index, the second integer is a total count of objects for the fragment, the third integer is a total size of the objects for the fragment."}]}]}]}},function(e,t,n){(function(t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t,n){var i=this,r=i._nextCommandId++,o={id:r,method:e,params:t||{}};i._ws.send(JSON.stringify(o),function(e){e?"function"==typeof n&&n(e):i._callbacks[r]=n})}function s(){var e=this,n={host:e.host,port:e.port,secure:e.secure};Promise.all([p.call(e,n).then(g.prepare.bind(e)),d.call(e,n)]).then(function(t){var n=t[1];return l.call(e,n)}).then(function(){t.nextTick(function(){e._notifier.emit("connect",e)})}).catch(function(t){e._notifier.emit("error",t)})}function p(e){var t=this;return new Promise(function(n,i){t.protocol?n(t.protocol):(e.remote=t.remote,v.Protocol(e).then(function(e){n(e.descriptor)}).catch(i))})}function c(e,t,n){var i=(n||{}).webSocketDebuggerUrl;if(i)e(i);else{var r=JSON.stringify(n,null,4),o=new Error("Invalid target "+r);t(o)}}function d(e){var t=this;return new Promise(function(n,i){
var r=t.target;switch("undefined"==typeof r?"undefined":u(r)){case"string":if(r.startsWith("/")){var o="ws://"+t.host+":"+t.port;r=o+r}r.match(/^wss?:/i)?n(r):v.List(e).then(function(e){return e.find(function(e){return e.id===r})}).then(function(e){c(n,i,e)}).catch(i);break;case"object":c(n,i,r);break;case"function":v.List(e).then(function(e){var t=r(e);return"number"==typeof t?e[t]:t}).then(function(e){c(n,i,e)}).catch(i);break;default:i(new Error('Invalid target argument "'+t.target+'"'))}})}function l(e){var t=this;return new Promise(function(n,i){try{t.secure&&(e=e.replace(/^ws:/i,"wss:")),t.webSocketUrl=e,t._ws=new y(e)}catch(e){return void i(e)}t._ws.on("open",function(){n()}),t._ws.on("message",function(e){var n=JSON.parse(e);m.call(t,n)}),t._ws.on("close",function(e){t.emit("disconnect")}),t._ws.on("error",function(e){i(e)})})}function m(e){var t=this;if(e.id){var n=t._callbacks[e.id];if(!n)return;e.error?n(!0,e.error):n(!1,e.result||{}),delete t._callbacks[e.id],0===Object.keys(t._callbacks).length&&t.emit("ready")}else e.method&&(t.emit("event",e),t.emit(e.method,e.params))}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=n(2),f=n(44),y=n(47),g=n(48),b=n(40),v=n(3),w=function(e){function t(e){i(this,t);var n=e.message;e.data&&(n+=" ("+e.data+")");var o=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n));return o.response=e,o}return o(t,e),t}(Error),S=function(e){function t(e,n){i(this,t);var o=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),a=function(e){var t=void 0,n=e.find(function(e){return!!e.webSocketDebuggerUrl&&(t=t||e,"page"===e.type)});if(n=n||t)return n;throw new Error("No inspectable targets")};return e=e||{},o.host=e.host||b.HOST,o.port=e.port||b.PORT,o.secure=!!e.secure,o.protocol=e.protocol,o.remote=!!e.remote,o.target=e.target||e.tab||e.chooseTab||a,h.call(o),o._notifier=n,o._callbacks={},o._nextCommandId=1,o.webSocketUrl=void 0,s.call(o),o}return o(t,e),t}(h);S.prototype.inspect=function(e,t){return t.customInspect=!1,f.inspect(this,t)},S.prototype.send=function(e,t,n){var i=this;return"function"==typeof t&&(n=t,t=void 0),"function"!=typeof n?new Promise(function(n,r){a.call(i,e,t,function(e,t){e?r(e instanceof Error?e:new w(t)):n(t)})}):void a.call(i,e,t,n)},S.prototype.close=function(e){function t(e){n._ws.removeAllListeners("close"),n._ws.close(),n._ws.once("close",function(){n._ws.removeAllListeners(),e()})}var n=this;return"function"!=typeof e?new Promise(function(e,n){t(e)}):void t(e)},e.exports=S}).call(t,n(1))},function(e,t,n){(function(e,i){function r(e,n){var i={seen:[],stylize:a};return arguments.length>=3&&(i.depth=arguments[2]),arguments.length>=4&&(i.colors=arguments[3]),f(n)?i.showHidden=n:n&&t._extend(i,n),S(i.showHidden)&&(i.showHidden=!1),S(i.depth)&&(i.depth=2),S(i.colors)&&(i.colors=!1),S(i.customInspect)&&(i.customInspect=!0),i.colors&&(i.stylize=o),p(i,e,i.depth)}function o(e,t){var n=r.styles[t];return n?"["+r.colors[n][0]+"m"+e+"["+r.colors[n][1]+"m":e}function a(e,t){return e}function s(e){var t={};return e.forEach(function(e,n){t[e]=!0}),t}function p(e,n,i){if(e.customInspect&&n&&k(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var r=n.inspect(i,e);return v(r)||(r=p(e,r,i)),r}var o=c(e,n);if(o)return o;var a=Object.keys(n),f=s(a);if(e.showHidden&&(a=Object.getOwnPropertyNames(n)),R(n)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return d(n);if(0===a.length){if(k(n)){var y=n.name?": "+n.name:"";return e.stylize("[Function"+y+"]","special")}if(x(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(T(n))return e.stylize(Date.prototype.toString.call(n),"date");if(R(n))return d(n)}var g="",b=!1,w=["{","}"];if(h(n)&&(b=!0,w=["[","]"]),k(n)){var S=n.name?": "+n.name:"";g=" [Function"+S+"]"}if(x(n)&&(g=" "+RegExp.prototype.toString.call(n)),T(n)&&(g=" "+Date.prototype.toUTCString.call(n)),R(n)&&(g=" "+d(n)),0===a.length&&(!b||0==n.length))return w[0]+g+w[1];if(i<0)return x(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special");e.seen.push(n);var I;return I=b?l(e,n,i,f,a):a.map(function(t){return m(e,n,i,f,t,b)}),e.seen.pop(),u(I,g,w)}function c(e,t){if(S(t))return e.stylize("undefined","undefined");if(v(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return b(t)?e.stylize(""+t,"number"):f(t)?e.stylize(""+t,"boolean"):y(t)?e.stylize("null","null"):void 0}function d(e){return"["+Error.prototype.toString.call(e)+"]"}function l(e,t,n,i,r){for(var o=[],a=0,s=t.length;a<s;++a)D(t,String(a))?o.push(m(e,t,n,i,String(a),!0)):o.push("");return r.forEach(function(r){r.match(/^\d+$/)||o.push(m(e,t,n,i,r,!0))}),o}function m(e,t,n,i,r,o){var a,s,c;if(c=Object.getOwnPropertyDescriptor(t,r)||{value:t[r]},c.get?s=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(s=e.stylize("[Setter]","special")),D(i,r)||(a="["+r+"]"),s||(e.seen.indexOf(c.value)<0?(s=y(n)?p(e,c.value,null):p(e,c.value,n-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n"))):s=e.stylize("[Circular]","special")),S(a)){if(o&&r.match(/^\d+$/))return s;a=JSON.stringify(""+r),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=e.stylize(a,"string"))}return a+": "+s}function u(e,t,n){var i=0,r=e.reduce(function(e,t){return i++,t.indexOf("\n")>=0&&i++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return r>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function h(e){return Array.isArray(e)}function f(e){return"boolean"==typeof e}function y(e){return null===e}function g(e){return null==e}function b(e){return"number"==typeof e}function v(e){return"string"==typeof e}function w(e){return"symbol"==typeof e}function S(e){return void 0===e}function x(e){return I(e)&&"[object RegExp]"===$(e)}function I(e){return"object"==typeof e&&null!==e}function T(e){return I(e)&&"[object Date]"===$(e)}function R(e){return I(e)&&("[object Error]"===$(e)||e instanceof Error)}function k(e){return"function"==typeof e}function C(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function $(e){return Object.prototype.toString.call(e)}function O(e){return e<10?"0"+e.toString(10):e.toString(10)}function E(){var e=new Date,t=[O(e.getHours()),O(e.getMinutes()),O(e.getSeconds())].join(":");return[e.getDate(),P[e.getMonth()],t].join(" ")}function D(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var j=/%[sdj%]/g;t.format=function(e){if(!v(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(r(arguments[n]));return t.join(" ")}for(var n=1,i=arguments,o=i.length,a=String(e).replace(j,function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(i[n++]);case"%d":return Number(i[n++]);case"%j":try{return JSON.stringify(i[n++])}catch(e){return"[Circular]"}default:return e}}),s=i[n];n<o;s=i[++n])a+=y(s)||!I(s)?" "+s:" "+r(s);return a},t.deprecate=function(n,r){function o(){if(!a){if(i.throwDeprecation)throw new Error(r);i.traceDeprecation?console.trace(r):console.error(r),a=!0}return n.apply(this,arguments)}if(S(e.process))return function(){return t.deprecate(n,r).apply(this,arguments)};if(i.noDeprecation===!0)return n;var a=!1;return o};var N,A={};t.debuglog=function(e){if(S(N)&&(N=i.env.NODE_DEBUG||""),e=e.toUpperCase(),!A[e])if(new RegExp("\\b"+e+"\\b","i").test(N)){var n=i.pid;A[e]=function(){var i=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,i)}}else A[e]=function(){};return A[e]},t.inspect=r,r.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},r.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=h,t.isBoolean=f,t.isNull=y,t.isNullOrUndefined=g,t.isNumber=b,t.isString=v,t.isSymbol=w,t.isUndefined=S,t.isRegExp=x,t.isObject=I,t.isDate=T,t.isError=R,t.isFunction=k,t.isPrimitive=C,t.isBuffer=n(45);var P=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];t.log=function(){console.log("%s - %s",E(),t.format.apply(t,arguments))},t.inherits=n(46),t._extend=function(e,t){if(!t||!I(t))return e;for(var n=Object.keys(t),i=n.length;i--;)e[n[i]]=t[n[i]];return e}}).call(t,function(){return this}(),n(1))},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(2),p=function(e){function t(e){i(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n._ws=new WebSocket(e),n._ws.onopen=function(){n.emit("open")},n._ws.onclose=function(){n.emit("close")},n._ws.onmessage=function(e){n.emit("message",e.data)},n._ws.onerror=function(){n.emit("error",new Error("WebSocket error"))},n}return o(t,e),a(t,[{key:"close",value:function(){this._ws.close()}},{key:"send",value:function(e){this._ws.send(e)}}]),t}(s);e.exports=p},function(e,t){"use strict";function n(e){var t={};return e.forEach(function(e){var n=e.name;delete e.name,t[n]=e}),t}function i(e,t,i){e.category=t,Object.keys(i).forEach(function(r){"name"!==r&&("type"===t&&"properties"===r||"parameters"===r?e[r]=n(i[r]):e[r]=i[r])})}function r(e,t,n){var r=function(i,r){return e.send(t+"."+n.name,i,r)};i(r,"command",n),e[t][n.name]=r}function o(e,t,n){var r=t+"."+n.name,o=function(t){return"function"!=typeof t?new Promise(function(t,n){e.once(r,t)}):void e.on(r,t)};i(o,"event",n),e[t][n.name]=o}function a(e,t,n){var r={};i(r,"type",n),e[t][n.id]=r}function s(e){var t=this;return new Promise(function(n,i){t.protocol=e,e.domains.forEach(function(e){var n=e.domain;t[n]={},(e.commands||[]).forEach(function(e){r(t,n,e)}),(e.events||[]).forEach(function(e){o(t,n,e)}),(e.types||[]).forEach(function(e){a(t,n,e)})}),n()})}e.exports.prepare=s}]);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate, __webpack_require__(10).clearImmediate))

/***/ })
/******/ ]);