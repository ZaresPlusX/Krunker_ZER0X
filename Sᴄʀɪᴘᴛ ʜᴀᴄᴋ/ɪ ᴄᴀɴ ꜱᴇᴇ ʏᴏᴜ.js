'use strict';
/** @type {function(boolean): ?} */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(type) {
  return typeof type;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var _slicedToArray = function() {
  /**
   * @param {?} arr
   * @param {string} i
   * @return {?}
   */
  function sliceIterator(arr, i) {
    /** @type {!Array} */
    var _arr = [];
    /** @type {boolean} */
    var _n = true;
    /** @type {boolean} */
    var _d = false;
    var _e = undefined;
    try {
      var _i = arr[Symbol.iterator]();
      var _s;
      for (; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) {
          break;
        }
      }
    } catch (err) {
      /** @type {boolean} */
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) {
          _i["return"]();
        }
      } finally {
        if (_d) {
          throw _e;
        }
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else {
      if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    }
  };
}();
/**
 * @param {!NodeList} arr
 * @return {?}
 */
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var arr2 = Array(arr.length);
    for (; i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
/**
 * @param {!AudioNode} instance
 * @param {!Function} Constructor
 * @return {undefined}
 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/** @type {!Array} */
var _0x438c = ["ZXhjZXB0aW9u", "dGFibGU=", "dHJhY2U=", "d2Fybg==", "c2V0", "cHJvY0lucHV0cw==", "Y2FuU2Vl", "cGNoT2JqYw==", "cmVjb2lsQW5pbVk=", "bW91c2VEb3duTA==", "bW91c2VEb3duUg==", "Z2V0V29ybGRQb3NpdGlvbg==", "ZGlkU2hvb3Q=", "YW1tb3M=", "bkF1dG8=", "d2VhcG9uSW5kZXg=", "ZXhlYw==", "IC0g", "aG9vaw==", "YXBwbHk=", "dW5kZWZpbmVk", "dGVzdA==", "bmFtZQ==", "IElzIA==", "IE5vdCA=", "cHJvdG90eXBl", "ZW5jb2RlSW50bw==", "cmVwbGFjZQ==", "cmVzdG9yZQ==", "YUhvbGRlcg==", "c2V0QXR0cmlidXRl", "c3R5bGU=", "cG9zaXRpb246IGFic29sdXRlOyB0b3A6LTMwMHB4", 
"X2NsZWFyUmVjdA==", "Y2xlYXJSZWN0", "Y2FudmFz", "Y2FsbGVy", "YXJndW1lbnRz", "b2Zmc2V0UGFyZW50", "c2tpZA==", "Y3JlYXRlRWxlbWVudA==", "aW5uZXJIVE1M", "PHAgc3R5bGU9ImZvbnQtc2l6ZTogMS41ZW07IHRleHQtYWxpZ246IGNlbnRlcjsiPjxhIGhyZWY9Imh0dHBzOi8vc2tpZGxhbWVyLmdpdGh1Yi5pby8iPjxzdHJvbmc+PHNwYW4gc3R5bGU9ImNvbG9yOiM2MDkxY2IiPlBvd2VyZWQgYnkgU2tpZCBMYW1lcjwvc3Bhbj48L3N0cm9uZz48L2E+PC9wPg==", "YXBwZW5kQ2hpbGQ=", "d2lkdGg6IDUwMHB4OyBoZWlnaHQ6IDEwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMjA7IGJvdHRvbTogMDsgbGVmdDogMDsgcmlnaHQ6IDA7IG1hcmdpbjogYXV0bzs=", 
"cmVtb3Zl", "S3J1bmtlci1DaGVhdC1CYXNl", "aHR0cHM6Ly9za2lkbGFtZXIuZ2l0aHViLmlvLw==", "Z2xvYmFs", "d29ybGQ=", "cmVuZGVyZXI=", "aGVpZ2h0", "YmluZA==", "cmV0dXJuIChmdW5jdGlvbigpIA==", "e30uY29uc3RydWN0b3IoInJldHVybiB0aGlzIikoICk=", "Y29uc29sZQ==", "bG9n", "ZGVidWc=", "aW5mbw==", "ZXJyb3I="];
(function(data, i) {
  /**
   * @param {number} selected_image
   * @return {undefined}
   */
  var validateGroupedContexts = function fn(selected_image) {
    for (; --selected_image;) {
      data["push"](data["shift"]());
    }
  };
  validateGroupedContexts(++i);
})(_0x438c, 353);
/**
 * @param {string} f
 * @param {?} f0
 * @return {?}
 */
var _0x216e = function set(f, f0) {
  /** @type {number} */
  f = f - 0;
  var c = _0x438c[f];
  if (set["VUBEyl"] === undefined) {
    (function() {
      /**
       * @return {?}
       */
      var encodeURIComponent = function exec() {
        var exports = void 0;
        try {
          exports = Function("return (function() " + '{}.constructor("return this")( )' + ");")();
        } catch (_0x432431) {
          /** @type {!Window} */
          exports = window;
        }
        return exports;
      };
      var first_trend = encodeURIComponent();
      /** @type {string} */
      var listeners = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      if (!first_trend["atob"]) {
        /**
         * @param {?} i
         * @return {?}
         */
        first_trend["atob"] = function(i) {
          var str = String(i)["replace"](/=+$/, "");
          /** @type {string} */
          var pix_color = "";
          /** @type {number} */
          var bc = 0;
          var bs;
          var buffer;
          /** @type {number} */
          var Y = 0;
          for (; buffer = str["charAt"](Y++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? pix_color = pix_color + String["fromCharCode"](255 & bs >> (-2 * bc & 6)) : 0) {
            buffer = listeners["indexOf"](buffer);
          }
          return pix_color;
        };
      }
    })();
    /**
     * @param {?} dataString
     * @return {?}
     */
    set["pHvmyi"] = function(dataString) {
      /** @type {string} */
      var data = atob(dataString);
      /** @type {!Array} */
      var escapedString = [];
      /** @type {number} */
      var val = 0;
      var key = data["length"];
      for (; val < key; val++) {
        escapedString = escapedString + ("%" + ("00" + data["charCodeAt"](val)["toString"](16))["slice"](-2));
      }
      return decodeURIComponent(escapedString);
    };
    set["BJEjYu"] = {};
    /** @type {boolean} */
    set["VUBEyl"] = !![];
  }
  var d = set["BJEjYu"][f];
  if (d === undefined) {
    c = set["pHvmyi"](c);
    set["BJEjYu"][f] = c;
  } else {
    c = d;
  }
  return c;
};
~function(name) {
  var getAlignItem = function() {
    /** @type {boolean} */
    var closeExpr = !![];
    return function(object__360, function__361) {
      /** @type {!Function} */
      var closingExpr = closeExpr ? function() {
        if (function__361) {
          var cssobj = function__361["apply"](object__360, arguments);
          /** @type {null} */
          function__361 = null;
          return cssobj;
        }
      } : function() {
      };
      /** @type {boolean} */
      closeExpr = ![];
      return closingExpr;
    };
  }();
  var alignContentAlignItem = getAlignItem(this, function() {
    /**
     * @return {undefined}
     */
    var option = function _0x2fbcf7() {
    };
    /**
     * @return {?}
     */
    var args2options = function setup() {
      var viewport = void 0;
      try {
        viewport = Function(_0x216e("0x0") + _0x216e("0x1") + ");")();
      } catch (_0x565b2a) {
        /** @type {!Window} */
        viewport = window;
      }
      return viewport;
    };
    var options = args2options();
    if (!options[_0x216e("0x2")]) {
      options["console"] = function(warn) {
        var layer = {};
        /** @type {function(): undefined} */
        layer[_0x216e("0x3")] = warn;
        /** @type {function(): undefined} */
        layer["warn"] = warn;
        /** @type {function(): undefined} */
        layer[_0x216e("0x4")] = warn;
        /** @type {function(): undefined} */
        layer[_0x216e("0x5")] = warn;
        /** @type {function(): undefined} */
        layer[_0x216e("0x6")] = warn;
        /** @type {function(): undefined} */
        layer[_0x216e("0x7")] = warn;
        /** @type {function(): undefined} */
        layer[_0x216e("0x8")] = warn;
        /** @type {function(): undefined} */
        layer[_0x216e("0x9")] = warn;
        return layer;
      }(option);
    } else {
      /** @type {function(): undefined} */
      options[_0x216e("0x2")][_0x216e("0x3")] = option;
      /** @type {function(): undefined} */
      options["console"][_0x216e("0xa")] = option;
      /** @type {function(): undefined} */
      options["console"][_0x216e("0x4")] = option;
      /** @type {function(): undefined} */
      options[_0x216e("0x2")]["info"] = option;
      /** @type {function(): undefined} */
      options[_0x216e("0x2")][_0x216e("0x6")] = option;
      /** @type {function(): undefined} */
      options[_0x216e("0x2")][_0x216e("0x7")] = option;
      /** @type {function(): undefined} */
      options[_0x216e("0x2")][_0x216e("0x8")] = option;
      /** @type {function(): undefined} */
      options["console"][_0x216e("0x9")] = option;
    }
  });
  alignContentAlignItem();
  var r = {};
  /**
   * @param {?} b
   * @return {undefined}
   */
  var getLastTouchStretch = function onSourcePreSave(b) {
    var vmArgSetters = (new Map)[_0x216e("0xb")](_0x216e("0xc"), /this\['(\w+)']=function\((\w+),(\w+),\w+,\w+\){(this)/)[_0x216e("0xb")]("objInstances", /\[\w+\]\['\w+'\]=!\w+,this\['\w+'\]\[\w+\]\['\w+'\]&&\(this\['\w+'\]\[\w+\]\['(\w+)'\]\['\w+'\]=!\w+/)[_0x216e("0xb")]("cnBSeen", /\['(\w+)']=!0x0,!spectating/)[_0x216e("0xb")](_0x216e("0xd"), /,this\['(\w+)'\]=function\(\w+,\w+,\w+,\w+,\w+\){if\(!\w+\)return!\w+;/)["set"](_0x216e("0xe"), /\(\w+,\w+,\w+\),this\['(\w+)'\]=new \w+\['\w+'\]\(\)/)["set"](_0x216e("0xf"), 
    /\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*1,this\['\w+'\]=\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,/)[_0x216e("0xb")](_0x216e("0x10"), /this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[_0x216e("0xb")](_0x216e("0x11"), /this\['(\w+)']=0x0,this\['keys']=/)[_0x216e("0xb")](_0x216e("0x12"), /\['camera']\['(\w+)']\(\);if/)["set"]("maxHealth", /this\['health']\/this\['(\w+)']\?/)[_0x216e("0xb")](_0x216e("0x13"), 
    /0x0,this\['(\w+)']=!0x1,this\['lodActive']=!0x1/)["set"](_0x216e("0x14"), /{!\w+\['reloadTimer']&&\w+\['(\w+)']/)[_0x216e("0xb")](_0x216e("0x15"), /'(\w+)':!0x0,'burst':/)[_0x216e("0xb")](_0x216e("0x16"), /\['reloadTimer']&&\w+\['\w+']\[\w+\['(\w+)']/);
    /** @type {boolean} */
    var _iteratorNormalCompletion3 = true;
    /** @type {boolean} */
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
      var _iterator3 = vmArgSetters[Symbol.iterator]();
      var _step17;
      for (; !(_iteratorNormalCompletion3 = (_step17 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref3 = _slicedToArray(_step17.value, 2);
        var key = _ref3[0];
        var a = _ref3[1];
        var w = a[_0x216e("0x17")](b);
        if (!w) {
          alert("Failed to find " + key);
          /** @type {null} */
          r[key] = null;
          continue;
        } else {
          console[_0x216e("0x3")]("found ", key, _0x216e("0x18"), w[1]);
          r[key] = w[1];
        }
      }
    } catch (err) {
      /** @type {boolean} */
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  /**
   * @param {?} object
   * @param {!Function} builder
   * @return {?}
   */
  var _0x2144ce = function exports(object, builder) {
    var _0x105b7b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ![];
    _classCallCheck(this, exports);
    this[_0x216e("0x19")] = {
      "apply" : function get(self, request, done) {
        var req = self[_0x216e("0x1a")](request, done);
        /** @type {!Array} */
        var requestData = [request, self, done, req];
        if (_0x105b7b) {
          return builder.apply(undefined, requestData);
        } else {
          builder.apply(undefined, requestData);
          return req;
        }
      }
    };
    return new Proxy(object, this[_0x216e("0x19")]);
  };
  /**
   * @param {boolean} value
   * @return {?}
   */
  var splitExts = function _fromJSONValueHelper(value) {
    return (typeof value === "undefined" ? "undefined" : _typeof(value)) !== _0x216e("0x1b") && value;
  };
  /**
   * @param {string} command
   * @return {?}
   */
  var packet = function preProcessCommand(command) {
    return /^function\s*[a-z0-9_\$]*\s*\([^)]*\)\s*\{\s*\[native code\]\s*\}/i[_0x216e("0x1c")]("" + command);
  };
  /**
   * @param {!Function} args
   * @param {?} callback
   * @return {undefined}
   */
  var handleTimeoutPacket = function ebookConvert(args, callback) {
    console[_0x216e("0x3")](callback[_0x216e("0x1d")] || callback, args ? _0x216e("0x1e") : _0x216e("0x1f"), args[_0x216e("0x1d")]);
  };
  TextEncoder[_0x216e("0x20")][_0x216e("0x21")] = new _0x2144ce(TextEncoder[_0x216e("0x20")][_0x216e("0x21")], function(isSlidingUp, dontForceConstraints, targetTouches, forceExecution) {
    targetTouches[0] = targetTouches[0][_0x216e("0x22")](/(\(((\w+))=this\['map']\['manager']\['objects']\[(\w+)]\))(.+?)\)/, "$1.penetrable&&$2.active)");
    getLastTouchStretch(targetTouches[0]);
    return forceExecution;
  }, !![]);
  handleTimeoutPacket(packet, TextEncoder[_0x216e("0x20")][_0x216e("0x21")]);
  CanvasRenderingContext2D[_0x216e("0x20")][_0x216e("0x23")] = new _0x2144ce(CanvasRenderingContext2D[_0x216e("0x20")][_0x216e("0x23")], function(ext, canCreateDiscussions, isSlidingUp, dontForceConstraints) {
    if (name[_0x216e("0x24")]) {
      name[_0x216e("0x24")][_0x216e("0x25")](_0x216e("0x26"), _0x216e("0x27"));
    }
    if (!splitExts(ext[_0x216e("0x28")])) {
      ext[_0x216e("0x28")] = ext[_0x216e("0x29")];
      /**
       * @return {undefined}
       */
      ext[_0x216e("0x29")] = function() {
        (function(result) {
          var params = result[_0x216e("0x2a")];
          var args = arguments["callee"]["caller"][_0x216e("0x2b")][_0x216e("0x2c")];
          var originalWidth = args[0];
          var ext = args[3];
          /**
           * @param {boolean} done
           * @return {undefined}
           */
          var gotoNewOfflinePage = function land(done) {
            if (name[_0x216e("0x24")]) {
              var selectionDiv = name["aHolder"][_0x216e("0x2d")];
              if (selectionDiv) {
                if (done && !selectionDiv[_0x216e("0x2e")]) {
                  var selection = document[_0x216e("0x2f")]("P");
                  selection[_0x216e("0x30")] = _0x216e("0x31");
                  selectionDiv[_0x216e("0x32")](selection);
                  selectionDiv[_0x216e("0x2e")] = selection;
                  selectionDiv["skid"][_0x216e("0x25")](_0x216e("0x26"), _0x216e("0x33"));
                } else {
                  if (!done && selectionDiv[_0x216e("0x2e")]) {
                    selectionDiv["skid"][_0x216e("0x34")]();
                    /** @type {null} */
                    selectionDiv[_0x216e("0x2e")] = null;
                  }
                }
              }
            }
          };
          if (ext) {
            if (!splitExts(ext[_0x216e("0xc")])) {
              ext[_0x216e("0xc")] = ext[r[_0x216e("0xc")]];
              console[_0x216e("0xa")](_0x216e("0x35"), " by Skid Lamer ", _0x216e("0x36"));
              console[_0x216e("0xa")](_0x216e("0x37"), name);
              console[_0x216e("0xa")](_0x216e("0x38"), args[1]);
              console[_0x216e("0xa")]("me", ext);
              console[_0x216e("0xa")](_0x216e("0x39"), args[2]);
              onLoad();
              /**
               * @return {?}
               */
              ext[r[_0x216e("0xc")]] = function() {
                arguments[0] = onTick.apply(undefined, [r, this].concat(Array.prototype.slice.call(arguments)));
                return ext[_0x216e("0xc")].apply(ext, arguments);
              };
            }
            gotoNewOfflinePage(![]);
            result["_clearRect"](0, 0, params["width"] / originalWidth, params[_0x216e("0x3a")] / originalWidth);
            onRender.apply(undefined, [r, result].concat(_toConsumableArray(args)));
          } else {
            gotoNewOfflinePage(!![]);
          }
        })[_0x216e("0x3b")]()(ext);
      };
    }
  }, !![]);
  handleTimeoutPacket(packet, CanvasRenderingContext2D[_0x216e("0x20")]["restore"]);
}(window);
