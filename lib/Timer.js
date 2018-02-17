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
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer(time) {
        if (time === void 0) { time = 1; }
        var _this = _super.call(this) || this;
        _this.time = time;
        if (!Timer._timerManager)
            Timer._timerManager = new TimerManager_1.default();
        Timer._timerManager.addTimer(_this);
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
        get: function () {
            if (!Timer._timerManager)
                Timer._timerManager = new TimerManager_1.default();
            return Timer._timerManager;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.remove = function () {
        // if (!this.manager) return this;
        Timer._timerManager.removeTimer(this);
        return this;
    };
    Timer.prototype.start = function () {
        this.active = true;
        return this;
    };
    Timer.prototype.stop = function () {
        this.active = false;
        this.emit("stop", this._elapsedTime);
        return this;
    };
    Timer.prototype.reset = function () {
        this._elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;
        return this;
    };
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