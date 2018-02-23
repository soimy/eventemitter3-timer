"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer_1 = require("./Timer");
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
//# sourceMappingURL=TimerManager.js.map