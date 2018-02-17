import TimerManager from "./TimerManager";
import { EventEmitter } from "eventemitter3";
export default class Timer extends EventEmitter {
    static readonly timerManager: TimerManager;
    private static _timerManager;
    time: number;
    active: boolean;
    isEnded: boolean;
    isStarted: boolean;
    expire: boolean;
    delay: number;
    repeat: number;
    loop: boolean;
    private _delayTime;
    private _elapsedTime;
    private _repeat;
    constructor(time?: number);
    remove(): Timer;
    start(): Timer;
    stop(): Timer;
    reset(): Timer;
    update(delta: number): void;
}
