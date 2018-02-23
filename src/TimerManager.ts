import { Timer } from "./Timer";

/**
 * Manager class for Timers
 *
 * @export
 * @class TimerManager
 */
export class TimerManager {
    public timers: Timer[];

    private _timersToDelete: Timer[];
    private _last: number;

    /**
     * Creates an instance of TimerManager.
     * @memberof TimerManager
     */
    constructor() {
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
    public update(delta?: number): void {
        if (!delta && delta !== 0) {
            delta = this._getDeltaMS();
        }

        if (this._timersToDelete.length) {
            for (const timerToDel of this._timersToDelete) {
                this._remove(timerToDel);
            }
            this._timersToDelete.length = 0;
        }

        for (const timer of this.timers) {
            if (timer.active) {
                timer.update(delta);
                if (timer.isEnded && timer.expire) {
                    this.removeTimer(timer);
                }
            }
        }

    }

    /**
     * Remove timer from this timerManager.
     *
     * @param {Timer} timer The timer to be removed.
     * @memberof TimerManager
     */
    public removeTimer(timer: Timer): void {
        this._timersToDelete.push(timer);
        timer.timerManager = null;
    }

    /**
     * Add timer to this timerManager, and remove timer from it's original timerManager.
     *
     * @param {Timer} timer The timer to be added.
     * @memberof TimerManager
     */
    public addTimer(timer: Timer): void {
        this.timers.push(timer);
        if (timer.timerManager) timer.timerManager.removeTimer(timer);
        timer.timerManager = this;
    }

    /**
     * Create a new timer under this timerManager.
     *
     * @param {number} time time of newly created timer.
     * @returns {Timer} The newly created timer.
     * @memberof TimerManager
     */
    public createTimer(time: number): Timer {
        const timer = new Timer(time);
        this.addTimer(timer);
        return timer;
    }

    private _remove(timer: Timer): void {
        const index = this.timers.indexOf(timer);
        if (index > -1) {
            this.timers.splice(index, 1);
        }
    }

    private _getDeltaMS(): number {
        if (this._last === 0)this._last = Date.now();
        const now = Date.now();
        const deltaMS = now - this._last;
        this._last = now;
        return deltaMS;
    }
}
