var EE3Timer =
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TimerManager_1 = __webpack_require__(1);
var eventemitter3_1 = __webpack_require__(4);
/**
 * A Simple Timer class extending [EventEmitter3](https://github.com/primus/eventemitter3)
 *
 * Auther: Shen Yiming(soimy@163.com)
 *
 * Repo: https://github.com/soimy/pixi-timer
 *
 * @export
 * @class Timer
 * @extends {EventEmitter}
 */
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    /**
     * Creates an instance of Timer.
     *
     * Newly created timers will be default to be added to the global timerManager.
     * Can manually create TimerManager and assign timers.
     *
     * @param {number} [time=1] The time is ms before timer end or repedeated.
     * @memberof Timer
     */
    function Timer(time) {
        if (time === void 0) { time = 1; }
        var _this = _super.call(this) || this;
        _this.time = time;
        if (!Timer._timerManager)
            Timer._timerManager = new TimerManager_1.TimerManager();
        Timer._timerManager.addTimer(_this);
        _this._timerManager = Timer._timerManager;
        _this.active = false;
        _this.isEnded = false;
        _this.isStarted = false;
        _this.expire = false;
        _this.delay = 0;
        _this.repeat = 0;
        _this.loop = false;
        _this._delayTime = 0;
        _this._elapsedTime = 0;
        _this._repeat = 0;
        return _this;
    }
    Object.defineProperty(Timer, "timerManager", {
        /**
         * The global TimerManager which is default to all newly created timers.
         *
         * @static
         * @type {TimerManager}
         * @memberof Timer
         */
        get: function () {
            if (!Timer._timerManager)
                Timer._timerManager = new TimerManager_1.TimerManager();
            return Timer._timerManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "timerManager", {
        /**
         * The timerManager this timer is assigned to.
         *
         * @type {(TimerManager | null)}
         * @memberof Timer
         */
        get: function () { return this._timerManager; },
        set: function (value) { this._timerManager = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove this timer from it's timerManager.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    Timer.prototype.remove = function () {
        // if (!this.manager) return this;
        Timer._timerManager.removeTimer(this);
        return this;
    };
    /**
     * Start timer from it's current time.
     *
     * A `started` event will be emitted.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    Timer.prototype.start = function () {
        this.active = true;
        return this;
    };
    /**
     * Stop timer, current time stop updated.
     *
     * A `ended` event will be emitted.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    Timer.prototype.stop = function () {
        this.active = false;
        this.emit("stop", this._elapsedTime);
        return this;
    };
    /**
     * Rest timer to it's initial status.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    Timer.prototype.reset = function () {
        this._elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;
        return this;
    };
    /**
     * Increment timer's time. Should be put in main logic loop.
     *
     * Using `TimerManager.update()` method instead is recommended.
     *
     * @param {number} delta The amount of increment in ms.
     * @returns {void}
     * @memberof Timer
     */
    Timer.prototype.update = function (delta) {
        if (!this.active)
            return;
        if (this.delay > this._delayTime) {
            this._delayTime += delta;
            return;
        }
        if (!this.isStarted) {
            this.isStarted = true;
            this.emit("start", this._elapsedTime);
        }
        if (this.time > this._elapsedTime) {
            var t = this._elapsedTime + delta;
            var ended = (t >= this.time);
            this._elapsedTime = (ended) ? this.time : t;
            this.emit("update", this._elapsedTime, delta);
            if (ended) {
                if (this.loop || this.repeat > this._repeat) {
                    this._repeat++;
                    this.emit("repeat", this._elapsedTime, this._repeat);
                    this._elapsedTime = 0;
                    return;
                }
                this.isEnded = true;
                this.active = false;
                this.emit("end", this._elapsedTime);
            }
        }
    };
    return Timer;
}(eventemitter3_1.EventEmitter));
exports.Timer = Timer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Timer_1 = __webpack_require__(0);
/**
 * Manager class for Timers
 *
 * @export
 * @class TimerManager
 */
var TimerManager = /** @class */ (function () {
    /**
     * Creates an instance of TimerManager.
     * @memberof TimerManager
     */
    function TimerManager() {
        this.timers = [];
        this._timersToDelete = [];
        this._last = 0;
    }
    /**
     * Increment all managed timers' time.
     *
     * Better to use this method instead of `timers.update()` for centralized control.
     *
     * @param {number} [delta] The increment amount in ms. Omit to use internal deltams.
     * @memberof TimerManager
     */
    TimerManager.prototype.update = function (delta) {
        if (!delta && delta !== 0) {
            delta = this._getDeltaMS();
        }
        if (this._timersToDelete.length) {
            for (var _i = 0, _a = this._timersToDelete; _i < _a.length; _i++) {
                var timerToDel = _a[_i];
                this._remove(timerToDel);
            }
            this._timersToDelete.length = 0;
        }
        for (var _b = 0, _c = this.timers; _b < _c.length; _b++) {
            var timer = _c[_b];
            if (timer.active) {
                timer.update(delta);
                if (timer.isEnded && timer.expire) {
                    this.removeTimer(timer);
                }
            }
        }
    };
    /**
     * Remove timer from this timerManager.
     *
     * @param {Timer} timer The timer to be removed.
     * @memberof TimerManager
     */
    TimerManager.prototype.removeTimer = function (timer) {
        this._timersToDelete.push(timer);
        timer.timerManager = null;
    };
    /**
     * Add timer to this timerManager, and remove timer from it's original timerManager.
     *
     * @param {Timer} timer The timer to be added.
     * @memberof TimerManager
     */
    TimerManager.prototype.addTimer = function (timer) {
        this.timers.push(timer);
        if (timer.timerManager)
            timer.timerManager.removeTimer(timer);
        timer.timerManager = this;
    };
    /**
     * Create a new timer under this timerManager.
     *
     * @param {number} time time of newly created timer.
     * @returns {Timer} The newly created timer.
     * @memberof TimerManager
     */
    TimerManager.prototype.createTimer = function (time) {
        var timer = new Timer_1.Timer(time);
        this.addTimer(timer);
        return timer;
    };
    TimerManager.prototype._remove = function (timer) {
        var index = this.timers.indexOf(timer);
        if (index > -1) {
            this.timers.splice(index, 1);
        }
    };
    TimerManager.prototype._getDeltaMS = function () {
        if (this._last === 0)
            this._last = Date.now();
        var now = Date.now();
        var deltaMS = now - this._last;
        this._last = now;
        return deltaMS;
    };
    return TimerManager;
}());
exports.TimerManager = TimerManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Timer_1 = __webpack_require__(0);
exports.Timer = Timer_1.Timer;
var TimerManager_1 = __webpack_require__(1);
exports.TimerManager = TimerManager_1.TimerManager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWJhZGU1MDRiZWFkNTBmNjA0MTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RpbWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UaW1lck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLDRDQUE4QztBQUM5Qyw2Q0FBNkM7QUFFN0M7Ozs7Ozs7Ozs7R0FVRztBQUNIO0lBQTJCLHlCQUFZO0lBNkZuQzs7Ozs7Ozs7T0FRRztJQUNILGVBQVksSUFBUTtRQUFSLCtCQUFRO1FBQXBCLFlBQ0ksaUJBQU8sU0FpQlY7UUFoQkcsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNuRSxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNuQyxLQUFJLENBQUMs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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDJEQUEyRCxZQUFZO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0IsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidWlsZC9ldmVudGVtaXR0ZXIzLXRpbWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNWJhZGU1MDRiZWFkNTBmNjA0MTkiLCJpbXBvcnQgeyBUaW1lck1hbmFnZXIgfSBmcm9tIFwiLi9UaW1lck1hbmFnZXJcIjtcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5cbi8qKlxuICogQSBTaW1wbGUgVGltZXIgY2xhc3MgZXh0ZW5kaW5nIFtFdmVudEVtaXR0ZXIzXShodHRwczovL2dpdGh1Yi5jb20vcHJpbXVzL2V2ZW50ZW1pdHRlcjMpXG4gKlxuICogQXV0aGVyOiBTaGVuIFlpbWluZyhzb2lteUAxNjMuY29tKVxuICpcbiAqIFJlcG86IGh0dHBzOi8vZ2l0aHViLmNvbS9zb2lteS9waXhpLXRpbWVyXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFRpbWVyXG4gKiBAZXh0ZW5kcyB7RXZlbnRFbWl0dGVyfVxuICovXG5leHBvcnQgY2xhc3MgVGltZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGdsb2JhbCBUaW1lck1hbmFnZXIgd2hpY2ggaXMgZGVmYXVsdCB0byBhbGwgbmV3bHkgY3JlYXRlZCB0aW1lcnMuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHR5cGUge1RpbWVyTWFuYWdlcn1cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lck1hbmFnZXIoKTogVGltZXJNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFUaW1lci5fdGltZXJNYW5hZ2VyKSBUaW1lci5fdGltZXJNYW5hZ2VyID0gbmV3IFRpbWVyTWFuYWdlcigpO1xuICAgICAgICByZXR1cm4gVGltZXIuX3RpbWVyTWFuYWdlcjtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3RpbWVyTWFuYWdlcjogVGltZXJNYW5hZ2VyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWUgdW50aWwgdGltZXIgdHJpZ2dlcmVkLlxuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgdGltZTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGFjdGl2YXRpb24gc3RhdHVzIG9mIHRpbWVyLlxuICAgICAqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQG1lbWJlcm9mIFRpbWVyXG4gICAgICovXG4gICAgcHVibGljIGFjdGl2ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBpbmRpY2F0b3I6IHdoZXRoZXIgdGhpcyB0aW1lciBpcyBlbmRlZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBtZW1iZXJvZiBUaW1lclxuICAgICAqL1xuICAgIHB1YmxpYyBpc0VuZGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIGluZGljYXRvcjogd2hldGhlciB0aGlzIHRpbWVyIGlzIHN0YXJ0ZWQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNTdGFydGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogRGVsYXkgaW4gbXMgYmVmb3JlIHRpbWVyIHN0YXJ0c1xuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVsYXk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSByZXBlYXQgY291bnQgYmVmb3JlIHRpbWVyIHN0b3BcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFRpbWVyXG4gICAgICovXG4gICAgcHVibGljIHJlcGVhdDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGlzIHRpbWVyIGxvb3BzIGZvcmV2ZXJcbiAgICAgKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBtZW1iZXJvZiBUaW1lclxuICAgICAqL1xuICAgIHB1YmxpYyBsb29wOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGlzIHRpbWVyIGlzIGV4cGlyZWQgYW5kIHNob3VsZCBiZSByZW1vdmVkIGZyb20gdGltZXJNYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQG1lbWJlcm9mIFRpbWVyXG4gICAgICovXG4gICAgcHVibGljIGV4cGlyZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lck1hbmFnZXIgdGhpcyB0aW1lciBpcyBhc3NpZ25lZCB0by5cbiAgICAgKlxuICAgICAqIEB0eXBlIHsoVGltZXJNYW5hZ2VyIHwgbnVsbCl9XG4gICAgICogQG1lbWJlcm9mIFRpbWVyXG4gICAgICovXG4gICAgcHVibGljIGdldCB0aW1lck1hbmFnZXIoKTogVGltZXJNYW5hZ2VyIHwgbnVsbCB7IHJldHVybiB0aGlzLl90aW1lck1hbmFnZXI7IH1cbiAgICBwdWJsaWMgc2V0IHRpbWVyTWFuYWdlcih2YWx1ZTogVGltZXJNYW5hZ2VyIHwgbnVsbCkgeyB0aGlzLl90aW1lck1hbmFnZXIgPSB2YWx1ZTsgfVxuXG4gICAgcHJpdmF0ZSBfZGVsYXlUaW1lOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZWxhcHNlZFRpbWU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9yZXBlYXQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF90aW1lck1hbmFnZXI6IFRpbWVyTWFuYWdlciB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRpbWVyLlxuICAgICAqXG4gICAgICogTmV3bHkgY3JlYXRlZCB0aW1lcnMgd2lsbCBiZSBkZWZhdWx0IHRvIGJlIGFkZGVkIHRvIHRoZSBnbG9iYWwgdGltZXJNYW5hZ2VyLlxuICAgICAqIENhbiBtYW51YWxseSBjcmVhdGUgVGltZXJNYW5hZ2VyIGFuZCBhc3NpZ24gdGltZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lPTFdIFRoZSB0aW1lIGlzIG1zIGJlZm9yZSB0aW1lciBlbmQgb3IgcmVwZWRlYXRlZC5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aW1lID0gMSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICBpZiAoIVRpbWVyLl90aW1lck1hbmFnZXIpIFRpbWVyLl90aW1lck1hbmFnZXIgPSBuZXcgVGltZXJNYW5hZ2VyKCk7XG4gICAgICAgIFRpbWVyLl90aW1lck1hbmFnZXIuYWRkVGltZXIodGhpcyk7XG4gICAgICAgIHRoaXMuX3RpbWVyTWFuYWdlciA9IFRpbWVyLl90aW1lck1hbmFnZXI7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0VuZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhwaXJlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVsYXkgPSAwO1xuICAgICAgICB0aGlzLnJlcGVhdCA9IDA7XG4gICAgICAgIHRoaXMubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2RlbGF5VGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2VsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhpcyB0aW1lciBmcm9tIGl0J3MgdGltZXJNYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RpbWVyfSBSZXR1cm4gc2VsZiBmb3IgY2hhaW5hYmxlIG1ldGhvZC5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlKCk6IFRpbWVyIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLm1hbmFnZXIpIHJldHVybiB0aGlzO1xuICAgICAgICBUaW1lci5fdGltZXJNYW5hZ2VyLnJlbW92ZVRpbWVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCB0aW1lciBmcm9tIGl0J3MgY3VycmVudCB0aW1lLlxuICAgICAqXG4gICAgICogQSBgc3RhcnRlZGAgZXZlbnQgd2lsbCBiZSBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RpbWVyfSBSZXR1cm4gc2VsZiBmb3IgY2hhaW5hYmxlIG1ldGhvZC5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnQoKTogVGltZXIge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgdGltZXIsIGN1cnJlbnQgdGltZSBzdG9wIHVwZGF0ZWQuXG4gICAgICpcbiAgICAgKiBBIGBlbmRlZGAgZXZlbnQgd2lsbCBiZSBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RpbWVyfSBSZXR1cm4gc2VsZiBmb3IgY2hhaW5hYmxlIG1ldGhvZC5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RvcCgpOiBUaW1lciB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdChcInN0b3BcIiwgdGhpcy5fZWxhcHNlZFRpbWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXN0IHRpbWVyIHRvIGl0J3MgaW5pdGlhbCBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGltZXJ9IFJldHVybiBzZWxmIGZvciBjaGFpbmFibGUgbWV0aG9kLlxuICAgICAqIEBtZW1iZXJvZiBUaW1lclxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldCgpOiBUaW1lciB7XG4gICAgICAgIHRoaXMuX2VsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gMDtcbiAgICAgICAgdGhpcy5fZGVsYXlUaW1lID0gMDtcbiAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0VuZGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCB0aW1lcidzIHRpbWUuIFNob3VsZCBiZSBwdXQgaW4gbWFpbiBsb2dpYyBsb29wLlxuICAgICAqXG4gICAgICogVXNpbmcgYFRpbWVyTWFuYWdlci51cGRhdGUoKWAgbWV0aG9kIGluc3RlYWQgaXMgcmVjb21tZW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVsdGEgVGhlIGFtb3VudCBvZiBpbmNyZW1lbnQgaW4gbXMuXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICogQG1lbWJlcm9mIFRpbWVyXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5kZWxheSA+IHRoaXMuX2RlbGF5VGltZSkge1xuICAgICAgICAgICAgdGhpcy5fZGVsYXlUaW1lICs9IGRlbHRhO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwic3RhcnRcIiwgdGhpcy5fZWxhcHNlZFRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGltZSA+IHRoaXMuX2VsYXBzZWRUaW1lKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gdGhpcy5fZWxhcHNlZFRpbWUgKyBkZWx0YTtcbiAgICAgICAgICAgIGNvbnN0IGVuZGVkID0gKHQgPj0gdGhpcy50aW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fZWxhcHNlZFRpbWUgPSAoZW5kZWQpID8gdGhpcy50aW1lIDogdDtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInVwZGF0ZVwiLCB0aGlzLl9lbGFwc2VkVGltZSwgZGVsdGEpO1xuXG4gICAgICAgICAgICBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb29wIHx8IHRoaXMucmVwZWF0ID4gdGhpcy5fcmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlcGVhdCsrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJyZXBlYXRcIiwgdGhpcy5fZWxhcHNlZFRpbWUsIHRoaXMuX3JlcGVhdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIiwgdGhpcy5fZWxhcHNlZFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1RpbWVyLnRzIiwiaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi9UaW1lclwiO1xuXG4vKipcbiAqIE1hbmFnZXIgY2xhc3MgZm9yIFRpbWVyc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBUaW1lck1hbmFnZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVyTWFuYWdlciB7XG4gICAgcHVibGljIHRpbWVyczogVGltZXJbXTtcblxuICAgIHByaXZhdGUgX3RpbWVyc1RvRGVsZXRlOiBUaW1lcltdO1xuICAgIHByaXZhdGUgX2xhc3Q6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGltZXJNYW5hZ2VyLlxuICAgICAqIEBtZW1iZXJvZiBUaW1lck1hbmFnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50aW1lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fdGltZXJzVG9EZWxldGUgPSBbXTtcblxuICAgICAgICB0aGlzLl9sYXN0ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmNyZW1lbnQgYWxsIG1hbmFnZWQgdGltZXJzJyB0aW1lLlxuICAgICAqXG4gICAgICogQmV0dGVyIHRvIHVzZSB0aGlzIG1ldGhvZCBpbnN0ZWFkIG9mIGB0aW1lcnMudXBkYXRlKClgIGZvciBjZW50cmFsaXplZCBjb250cm9sLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YV0gVGhlIGluY3JlbWVudCBhbW91bnQgaW4gbXMuIE9taXQgdG8gdXNlIGludGVybmFsIGRlbHRhbXMuXG4gICAgICogQG1lbWJlcm9mIFRpbWVyTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFkZWx0YSAmJiBkZWx0YSAhPT0gMCkge1xuICAgICAgICAgICAgZGVsdGEgPSB0aGlzLl9nZXREZWx0YU1TKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdGltZXJzVG9EZWxldGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRpbWVyVG9EZWwgb2YgdGhpcy5fdGltZXJzVG9EZWxldGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmUodGltZXJUb0RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90aW1lcnNUb0RlbGV0ZS5sZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCB0aW1lciBvZiB0aGlzLnRpbWVycykge1xuICAgICAgICAgICAgaWYgKHRpbWVyLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVwZGF0ZShkZWx0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVyLmlzRW5kZWQgJiYgdGltZXIuZXhwaXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGltZXIodGltZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRpbWVyIGZyb20gdGhpcyB0aW1lck1hbmFnZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RpbWVyfSB0aW1lciBUaGUgdGltZXIgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZVRpbWVyKHRpbWVyOiBUaW1lcik6IHZvaWQge1xuICAgICAgICB0aGlzLl90aW1lcnNUb0RlbGV0ZS5wdXNoKHRpbWVyKTtcbiAgICAgICAgdGltZXIudGltZXJNYW5hZ2VyID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGltZXIgdG8gdGhpcyB0aW1lck1hbmFnZXIsIGFuZCByZW1vdmUgdGltZXIgZnJvbSBpdCdzIG9yaWdpbmFsIHRpbWVyTWFuYWdlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VGltZXJ9IHRpbWVyIFRoZSB0aW1lciB0byBiZSBhZGRlZC5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFkZFRpbWVyKHRpbWVyOiBUaW1lcik6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVycy5wdXNoKHRpbWVyKTtcbiAgICAgICAgaWYgKHRpbWVyLnRpbWVyTWFuYWdlcikgdGltZXIudGltZXJNYW5hZ2VyLnJlbW92ZVRpbWVyKHRpbWVyKTtcbiAgICAgICAgdGltZXIudGltZXJNYW5hZ2VyID0gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgdGltZXIgdW5kZXIgdGhpcyB0aW1lck1hbmFnZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSB0aW1lIG9mIG5ld2x5IGNyZWF0ZWQgdGltZXIuXG4gICAgICogQHJldHVybnMge1RpbWVyfSBUaGUgbmV3bHkgY3JlYXRlZCB0aW1lci5cbiAgICAgKiBAbWVtYmVyb2YgVGltZXJNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVRpbWVyKHRpbWU6IG51bWJlcik6IFRpbWVyIHtcbiAgICAgICAgY29uc3QgdGltZXIgPSBuZXcgVGltZXIodGltZSk7XG4gICAgICAgIHRoaXMuYWRkVGltZXIodGltZXIpO1xuICAgICAgICByZXR1cm4gdGltZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlKHRpbWVyOiBUaW1lcik6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudGltZXJzLmluZGV4T2YodGltZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy50aW1lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERlbHRhTVMoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhc3QgPT09IDApdGhpcy5fbGFzdCA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhTVMgPSBub3cgLSB0aGlzLl9sYXN0O1xuICAgICAgICB0aGlzLl9sYXN0ID0gbm93O1xuICAgICAgICByZXR1cm4gZGVsdGFNUztcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVGltZXJNYW5hZ2VyLnRzIiwiZXhwb3J0IHsgVGltZXIgfSBmcm9tIFwiLi9UaW1lclwiO1xyXG5leHBvcnQgeyBUaW1lck1hbmFnZXIgfSBmcm9tIFwiLi9UaW1lck1hbmFnZXJcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9