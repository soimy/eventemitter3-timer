import Timer from './Timer';

export default class TimerManager{
  constructor(){
    this.timers = [];
    this._timersToDelete = [];

    this._last = 0;
  }

  update(delta){
    let deltaMS;
    if(!delta && delta !== 0){
      deltaMS = this._getDeltaMS();
      delta = deltaMS/1000;
    }else{
      deltaMS = delta*1000;
    }

    for(let i = 0; i < this.timers.length; i++){
      let timer = this.timers[i];
      if(timer.active){
        timer.update(delta, deltaMS);
        if(timer.isEnded && timer.expire){
          timer.remove();
        }
      }
    }

    if(this._timersToDelete.length){
      for(let i = 0; i < this._timersToDelete.length; i++){
        this._remove(this._timersToDelete[i]);
      }
      this._timersToDelete.length = 0;
    }
  }

  removeTimer(timer){
    this._timersToDelete.push(timer);
  }

  addTimer(timer){
    timer.manager = this;
    this.timers.push(timer);
  }

  createTimer(time){
    return new Timer(time, this);
  }

  _remove(timer){
    let index = this.timers.indexOf(timer);
    if(index > 0)this.timers.splice(index, 1);
  }

  _getDeltaMS(){
    if(this._last === 0)this._last = Date.now();
    let now = Date.now();
    let deltaMS = now-this._last;
    this._last = now;
    return deltaMS;
  }
}
