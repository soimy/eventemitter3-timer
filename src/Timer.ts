import { TimerManager } from "./TimerManager";
import { EventEmitter } from "eventemitter3";

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
export class Timer extends EventEmitter {

    /**
     * The global TimerManager which is default to all newly created timers.
     *
     * @static
     * @type {TimerManager}
     * @memberof Timer
     */
    public static get timerManager(): TimerManager {
        if (!Timer._timerManager) Timer._timerManager = new TimerManager();
        return Timer._timerManager;
    }
    private static _timerManager: TimerManager;

    /**
     * The time until timer triggered.
     *
     * @type {number}
     * @memberof Timer
     */
    public time: number;

    /**
     * The activation status of timer.
     *
     * @type {boolean}
     * @memberof Timer
     */
    public active: boolean;

    /**
     * Status indicator: whether this timer is ended.
     *
     * @type {boolean}
     * @memberof Timer
     */
    public isEnded: boolean;

    /**
     * Status indicator: whether this timer is started.
     *
     * @type {boolean}
     * @memberof Timer
     */
    public isStarted: boolean;

    /**
     * Delay in ms before timer starts
     *
     * @type {number}
     * @memberof Timer
     */
    public delay: number;

    /**
     * The repeat count before timer stop
     *
     * @type {number}
     * @memberof Timer
     */
    public repeat: number;

    /**
     * Whether this timer loops forever
     *
     * @type {boolean}
     * @memberof Timer
     */
    public loop: boolean;

    /**
     * Whether this timer is expired and should be removed from timerManager.
     *
     * @type {boolean}
     * @memberof Timer
     */
    public expire: boolean;

    /**
     * The timerManager this timer is assigned to.
     *
     * @type {(TimerManager | null)}
     * @memberof Timer
     */
    public get timerManager(): TimerManager | null { return this._timerManager; }
    public set timerManager(value: TimerManager | null) { this._timerManager = value; }

    private _delayTime: number;
    private _elapsedTime: number;
    private _repeat: number;
    private _timerManager: TimerManager | null;

    /**
     * Creates an instance of Timer.
     *
     * Newly created timers will be default to be added to the global timerManager.
     * Can manually create TimerManager and assign timers.
     *
     * @param {number} [time=1] The time is ms before timer end or repedeated.
     * @memberof Timer
     */
    constructor(time = 1) {
        super();
        this.time = time;
        if (!Timer._timerManager) Timer._timerManager = new TimerManager();
        Timer._timerManager.addTimer(this);
        this._timerManager = Timer._timerManager;

        this.active = false;
        this.isEnded = false;
        this.isStarted = false;
        this.expire = false;
        this.delay = 0;
        this.repeat = 0;
        this.loop = false;

        this._delayTime = 0;
        this._elapsedTime = 0;
        this._repeat = 0;
    }

    /**
     * Remove this timer from it's timerManager.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    public remove(): Timer {
        // if (!this.manager) return this;
        Timer._timerManager.removeTimer(this);
        return this;
    }

    /**
     * Start timer from it's current time.
     *
     * A `started` event will be emitted.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    public start(): Timer {
        this.active = true;
        return this;
    }

    /**
     * Stop timer, current time stop updated.
     *
     * A `ended` event will be emitted.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    public stop(): Timer {
        this.active = false;
        this.emit("stop", this._elapsedTime);
        return this;
    }

    /**
     * Rest timer to it's initial status.
     *
     * @returns {Timer} Return self for chainable method.
     * @memberof Timer
     */
    public reset(): Timer {
        this._elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;
        return this;
    }

    /**
     * Increment timer's time. Should be put in main logic loop.
     *
     * Using `TimerManager.update()` method instead is recommended.
     *
     * @param {number} delta The amount of increment in ms.
     * @returns {void}
     * @memberof Timer
     */
    public update(delta: number): void {
        if (!this.active)return;
        if (this.delay > this._delayTime) {
            this._delayTime += delta;
            return;
        }

        if (!this.isStarted) {
            this.isStarted = true;
            this.emit("start", this._elapsedTime);
        }

        if (this.time > this._elapsedTime) {
            const t = this._elapsedTime + delta;
            const ended = (t >= this.time);

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
    }
}
