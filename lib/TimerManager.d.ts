import Timer from "./Timer";
/**
 * Manager class for Timers
 *
 * @export
 * @class TimerManager
 */
export default class TimerManager {
    timers: Timer[];
    private _timersToDelete;
    private _last;
    /**
     * Creates an instance of TimerManager.
     * @memberof TimerManager
     */
    constructor();
    /**
     * Increment all managed timers' time.
     * Better to use this method instead of `timers.update()` for centralized control.
     *
     * @param {number} [delta] The increment amount in ms. Omit to use internal deltams.
     * @memberof TimerManager
     */
    update(delta?: number): void;
    /**
     * Remove timer from this timerManager.
     *
     * @param {Timer} timer The timer to be removed.
     * @memberof TimerManager
     */
    removeTimer(timer: Timer): void;
    /**
     * Add timer to this timerManager, and remove timer from it's original timerManager.
     *
     * @param {Timer} timer The timer to be added.
     * @memberof TimerManager
     */
    addTimer(timer: Timer): void;
    /**
     * Create a new timer under this timerManager.
     *
     * @param {number} time time of newly created timer.
     * @returns {Timer} The newly created timer.
     * @memberof TimerManager
     */
    createTimer(time: number): Timer;
    private _remove(timer);
    private _getDeltaMS();
}
