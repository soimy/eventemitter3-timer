import { Timer, TimerManager } from "../src/index";
import { expect } from "chai";
import "mocha";

describe("TimerManager", () => {
    const manager: TimerManager = new TimerManager();

    context("#TimerManager Methods", () => {

        const timers: Timer[] = [];

        it("TimerManager is initialized", () => {
            expect(manager.timers.length).to.equal(0);
        });

        it("Create timers from manager", () => {
            timers.push(manager.createTimer(500));
            expect(manager.timers.length).to.equal(1);
        });

        it("TimerManager.update increment timers", () => {
            timers.push(manager.createTimer(1000));
            timers.forEach(timer => timer.start());
            manager.update(500);
            expect(timers[0].isEnded).to.equal(true);
            expect(timers[1].isEnded).to.equal(false);
        });

        it("TimerManager.update don't affect not managed timers", () => {
            timers.push(new Timer(500)); // this timer is under global timerManager
            timers.forEach(timer => {
                timer.reset();
                timer.start();
            });
            manager.update(500);
            expect(timers[0].isEnded).to.equal(true);
            expect(timers[1].isEnded).to.equal(false);
            expect(timers[2].isEnded).to.equal(false);
        });

        it("Add timers to this manager", () => {
            manager.addTimer(timers[2]);
            timers.forEach(timer => {
                timer.reset();
                timer.start();
            });
            manager.update(500);
            expect(timers[0].isEnded).to.equal(true);
            expect(timers[1].isEnded).to.equal(false);
            expect(timers[2].isEnded).to.equal(true);
        });

        it("Remove timers to this manager", () => {
            manager.removeTimer(timers[0]);
            manager.update();
            timers.forEach(timer => {
                timer.reset();
                timer.start();
            });
            manager.update(500);
            expect(timers[0].isEnded).to.equal(false);
            expect(timers[1].isEnded).to.equal(false);
            expect(timers[2].isEnded).to.equal(true);
        });

    });
});
