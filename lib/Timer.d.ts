import TimerManager from "./TimerManager";
import { EventEmitter } from "eventemitter3";
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
export default class Timer extends EventEmitter {
    /**
     * The global TimerManager which is default to all newly created timers.
     *
     * @static
     * @type {TimerManager}
     * @memberof Timer
     */
    static readonly timerManager: TimerManager;
    private static _timerManager;
    /**
     * The time until timer triggered.
     *
     * @type {number}
     * @memberof Timer
     */
    time: number;
    /**
     * The activation status of timer.
     *
     * @type {boolean}
     * @memberof Timer
     */
    active: boolean;
    /**
     * Status indicator: whether this timer is ended.
     *
     * @type {boolean}
     * @memberof Timer
     */
    isEnded: boolean;
    /**
     * Status indicator: whether this timer is started.
     *
     * @type {boolean}
     * @memberof Timer
     */
    isStarted: boolean;
    /**
     * Delay in ms before timer starts
     *
     * @type {number}
     * @memberof Timer
     */
    delay: number;
    /**
     * The repeat count before timer stop
     *
     * @type {number}
     * @memberof Timer
     */
    repeat: number;
    /**
     * Whether this timer loops forever
     *
     * @type {boolean}
     * @memberof Timer
     */
    loop: boolean;
    /**
     * Whether this timer is expired and should be removed from timerManager.
     *
     * @type {boolean}
     * @memberof Timer
     */
    expire: boolean;
    /**
     * The timerManager this timer is assigned to.
     *
     * @type {(TimerManager | null)}
     * @memberof Timer
     */
    timerManager: TimerManager | null;
    private _delayTime;
    private _elapsedTime;
    private _repeat;
    private _timerManager;
    /**
     * Creates an instance of Timer.
     *
     * Newly created timers will be default to be added to the global timerManager.
     * Can manually create TimerManager and assign timers.
     *
     * @param {number} [time=1] The time is ms before timer end or repedeated.
     * @memberof Timer
     */
    constructor(time?: number);
    /**
     * Remove this timer from it's timerManager.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    remove(): Timer;
    /**
     * Start timer from it's current time.
     *
     * A `started` event will be emitted.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    start(): Timer;
    /**
     * Stop timer, current time stop updated.
     *
     * A `ended` event will be emitted.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    stop(): Timer;
    /**
     * Rest timer to it's initial status.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    reset(): Timer;
    /**
     * Increment timer's time. Should be put in main logic loop.
     *
     * Using `TimerManager.update()` method instead is recommended.
     *
     * @param {number} delta The amount of increment in ms.
     * @returns {void}
     * @memberof Timer
     */
    update(delta: number): void;
}
