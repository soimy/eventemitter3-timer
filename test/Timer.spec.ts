import Timer from "../lib/Timer";
import { expect } from "chai";
import TimerManager from "../lib/TimerManager";

describe("Timer", () => {
    let timer: Timer;
    const manager: TimerManager = Timer.timerManager;
    // beforeEach(() => {
    //     timer = new Timer();
    // });

    context("#Timer add & delete", () => {
        timer = new Timer(1000);
        let timer2: Timer;
        it("TimerManager is created", () => {
            expect(manager).to.not.equal(null);
        });

        it("Timer count is 1", () => {
            expect(manager.timers.length).to.equal(1);
        });

        it("Add more timers", () => {
            timer2 = new Timer(2000);
            expect(manager.timers.length).to.equal(2);
        });

        it("Delete one timer", () => {
            manager.removeTimer(timer2);
            manager.update(500);
            expect(manager.timers.length).to.equal(1);
        });
    });
});
