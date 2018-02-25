import { Timer, TimerManager } from "../dist/eventemitter3-timer";
import { expect } from "chai";

describe("Timer", () => {
    const manager: TimerManager = Timer.timerManager;

    context("#Timer add & delete", () => {

        const timers: Timer[] = [];
        let num = 10;
        let prevNum: number;

        it("Global TimerManager is created", () => {
            prevNum = manager.timers.length;
            timers.push(new Timer(1000));
            expect(manager).to.not.equal(null);
        });

        it("Timer count is correct", () => {
            expect(manager.timers.length).to.equal(prevNum + 1);
        });

        it("Add " + num + " timers", () => {
            for (let i = 0; i < num; i++) {
                timers.push(new Timer(Math.random() * 1000 + 1000));
            }
            expect(manager.timers.length).to.equal(num + prevNum + 1);
        });

        it("Delete one timer using TimeManager.removeTimer()", () => {
            manager.removeTimer(timers[0]);
            manager.update(5);
            expect(manager.timers.length).to.equal(num + prevNum);
        });

        it("Delete all timers using Timer.prototype.remove()", () => {
            for (const timer of timers) {
                timer.remove();
            }
            manager.update(5);
            expect(manager.timers.length).to.equal(prevNum);
        });
    });

    context("#Timer functionalities", () => {
        const timer = new Timer(1000);
        let started: boolean = false;
        let ended: boolean = false;
        let repeated: number = 0;
        let _delta: number = 0;
        let _elapsed: number = 0;
        timer.on("start", () => started = true);
        timer.on("update", (elapsed, delta) => {
            _delta = delta;
            _elapsed = elapsed;
        });
        timer.on("repeat", (elapsed, repeat) => repeated = repeat);
        timer.on("end", elapsed => {
            ended = true;
            _elapsed = elapsed;
        });

        it("Timer is started", () => {
            timer.start();
            timer.update(500);
            expect(started).to.equal(true);
            expect(timer.isStarted).to.equal(true);
            expect(ended).to.equal(false);
            expect(timer.isEnded).to.equal(false);
        });

        it("Timer is updated", () => {
            expect(_elapsed).to.equal(500);
            expect(_delta).to.equal(500);
        });

        it("Timer is ended", () => {
            timer.update(600);
            expect(_elapsed).to.equal(1000);
            expect(ended).to.equal(true);
            expect(timer.isEnded).to.equal(true);
        });

        it("Timer is looping", () => {
            expect(timer.active).to.equal(false);
            timer.loop = true;
            timer.time = 500;
            timer.reset();
            timer.start();
            for (let i = 0; i < 10; i++) {
                timer.update(500);
                expect(repeated).to.equal(i + 1);
            }
        });

        it("Timer is repeated", () => {
            expect(timer.active).to.equal(true);
            timer.loop = false;
            timer.repeat = 5;
            timer.reset();
            timer.start();
            for (let i = 0; i < 10; i++) {
                timer.update(500);
            }
            expect(repeated).to.equal(5);
            expect(timer.active).to.equal(false);
        });

        it("Timer is delayed", () => {
            timer.repeat = 0;
            timer.reset();
            timer.delay = 500;
            timer.start();
            timer.update(500);
            expect(timer.active).to.equal(true);
            expect(timer.isEnded).to.equal(false);
            timer.update(500);
            expect(timer.isEnded).to.equal(true);
        });

        it("Timer can be expired", () => {
            timer.expire = true;
            timer.delay = 0;
            timer.reset();
            timer.start();
            timer.timerManager.update(500);
            expect(timer.timerManager).to.equal(null);
        });
    });
});
