import TimerManager from "./TimerManager";
import { EventEmitter } from "eventemitter3";

export default class Timer extends EventEmitter {

    public static get timerManager(): TimerManager {
        if (!Timer._timerManager) Timer._timerManager = new TimerManager();
        return Timer._timerManager;
    }
    private static _timerManager: TimerManager;

    public time: number;
    public active: boolean;
    public isEnded: boolean;
    public isStarted: boolean;
    public expire: boolean;
    public delay: number;
    public repeat: number;
    public loop: boolean;

    private _delayTime: number;
    private _elapsedTime: number;
    private _repeat: number;

    constructor(time = 1) {
        super();
        this.time = time;
        if (!Timer._timerManager) Timer._timerManager = new TimerManager();
        Timer._timerManager.addTimer(this);

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

    public remove(): Timer {
        // if (!this.manager) return this;
        Timer._timerManager.removeTimer(this);
        return this;
    }

    public start(): Timer {
        this.active = true;
        return this;
    }

    public stop(): Timer {
        this.active = false;
        this.emit("stop", this._elapsedTime);
        return this;
    }

    public reset(): Timer {
        this._elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;
        return this;
    }

    public update(delta: number) {
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
