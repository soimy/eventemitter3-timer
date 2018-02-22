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
var TimerManager_1 = require("./TimerManager");
var eventemitter3_1 = require("eventemitter3");
/**
 * A Simple Timer class extending [EventEmitter3]{@link https://github.com/primus/eventemitter3 }
 *
 * @export
 * @class Timer
 * @extends {EventEmitter}
 */
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    /**
     * Creates an instance of Timer.
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
            Timer._timerManager = new TimerManager_1.default();
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
                Timer._timerManager = new TimerManager_1.default();
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
     * Increment timer's time. Better put this in main logic loop.
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
exports.default = Timer;
//# sourceMappingURL=Timer.js.map