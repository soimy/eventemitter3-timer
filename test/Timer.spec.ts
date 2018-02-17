import Timer from "../lib/Timer";
import { expect } from "chai";

describe("Timer", () => {
    let timer: Timer;
    // beforeEach(() => {
    //     timer = new Timer();
    // });

    context("#Timer intialized", () => {
        timer = new Timer(1000);
        it("TimerManager is created", () => {
            expect(Timer.timerManager).to.not.equal(null);
        });

        it("Timer count is 1", () => {
            expect(Timer.timerManager.timers.length).to.equal(1);
        });
    });
});
