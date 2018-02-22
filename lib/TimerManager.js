"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer_1 = require("./Timer");
var TimerManager = /** @class */ (function () {
    function TimerManager() {
        this.timers = [];
        this._timersToDelete = [];
        this._last = 0;
    }
    TimerManager.prototype.update = function (delta) {
        if (!delta && delta !== 0) {
            delta = this._getDeltaMS();
        }
        for (var _i = 0, _a = this.timers; _i < _a.length; _i++) {
            var timer = _a[_i];
            if (timer.active) {
                timer.update(delta);
                if (timer.isEnded && timer.expire) {
                    timer.remove();
                }
            }
        }
        if (this._timersToDelete.length) {
            for (var _b = 0, _c = this._timersToDelete; _b < _c.length; _b++) {
                var timerToDel = _c[_b];
                this._remove(timerToDel);
            }
            this._timersToDelete.length = 0;
        }
    };
    TimerManager.prototype.removeTimer = function (timer) {
        this._timersToDelete.push(timer);
        timer.timerManager = null;
    };
    TimerManager.prototype.addTimer = function (timer) {
        this.timers.push(timer);
        if (timer.timerManager)
            timer.timerManager.removeTimer(timer);
        timer.timerManager = this;
    };
    TimerManager.prototype.createTimer = function (time) {
        var timer = new Timer_1.default(time);
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
exports.default = TimerManager;
//# sourceMappingURL=TimerManager.js.map