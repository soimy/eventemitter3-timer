import PIXI from'pixi.js';
import TimerManager from './TimerManager';
import Timer from './Timer';

if(!PIXI.TimerManager){
  let timerManager = new TimerManager();

  PIXI.TimerManager = TimerManager;
  PIXI.Timer = Timer;
  PIXI.timer = timerManager;
}
export default PIXI.timer;
