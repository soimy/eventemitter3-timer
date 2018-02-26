(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EE3Timer"] = factory();
	else
		root["EE3Timer"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
var eventemitter3_1 = __webpack_require__(3);
/**
 * A Simple Timer class extending [EventEmitter3](https://github.com/primus/eventemitter3)
 *
 * Auther: Shen Yiming(soimy@163.com)
 *
 * Repo: https://github.com/soimy/eventemitter3-timer
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

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Timer_1 = __webpack_require__(0);
exports.Timer = Timer_1.Timer;
var TimerManager_1 = __webpack_require__(1);
exports.TimerManager = TimerManager_1.TimerManager;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

/***/ })
/******/ ]);
});
//# sourceMappingURL=eventemitter3-timer.js.map