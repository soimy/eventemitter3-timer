import Timer from "./Timer";

export default class TimerManager {
    public timers: Timer[];

    private _timersToDelete: Timer[];
    private _last: number;

    constructor() {
        this.timers = [];
        this._timersToDelete = [];

        this._last = 0;
    }

    public update(delta?: number): void {
        if (!delta && delta !== 0) {
            delta = this._getDeltaMS();
        }

        for (const timer of this.timers) {
            if (timer.active) {
                timer.update(delta);
                if (timer.isEnded && timer.expire) {
                    timer.remove();
                }
            }
        }

        if (this._timersToDelete.length) {
            for (const timerToDel of this._timersToDelete) {
                this._remove(timerToDel);
            }
            this._timersToDelete.length = 0;
        }
    }

    public removeTimer(timer: Timer): void {
        this._timersToDelete.push(timer);
    }

    public addTimer(timer: Timer): void {
        this.timers.push(timer);
    }

    public createTimer(time: number): Timer {
        return new Timer(time);
    }

    private _remove(timer: Timer): void {
        const index = this.timers.indexOf(timer);
        if (index > 0) this.timers.splice(index, 1);
    }

    private _getDeltaMS(): number {
        if (this._last === 0)this._last = Date.now();
        const now = Date.now();
        const deltaMS = now - this._last;
        this._last = now;
        return deltaMS;
    }
}
