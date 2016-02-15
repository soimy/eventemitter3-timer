import PIXI from'pixi.js';
import TimerManager from './TimerManager';
import Timer from './Timer';

let timer = {
  TimerManager : TimerManager,
  Timer : Timer
};

if(!PIXI.timerManager){
  PIXI.timerManager = new TimerManager();

  PIXI.timer = timer;
}

export default timer;
