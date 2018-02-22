import Timer from "./Timer";
export default class TimerManager {
    timers: Timer[];
    private _timersToDelete;
    private _last;
    constructor();
    update(delta?: number): void;
    removeTimer(timer: Timer): void;
    addTimer(timer: Timer): void;
    createTimer(time: number): Timer;
    private _remove(timer);
    private _getDeltaMS();
}
