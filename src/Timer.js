import PIXI from 'pixi.js';
export default class Timer extends PIXI.utils.EventEmitter{
  constructor(time = 1, manager){
    super();
    this.time = time;
    if(manager)this.addTo(manager);

    this.active = false;
    this.isEnded = false;
    this.isStarted = false;
    this.expire = false;
    this.delay = 0;
    this.repeat = 0;
    this.loop = false;

    this._delayTime = 0;
    this._elapsedTime = 0;
    this._repeat = 0;
  }

  addTo(manager){
    this.manager = manager;
    this.manager.addTimer(this);
    return this;
  }

  remove(){
    if(!this.manager)return;
    this.manager.removeTimer(this);
    return this;
  }

  start(){
    this.active = true;
    return this;
  }

  stop(){
    this.active = false;
    this.emit('stop', this._elapsedTime);
    return this;
  }

  reset(){
    this._elapsedTime = 0;
    this._repeat = 0;
    this._delayTime = 0;
    this.isStarted = false;
    this.isEnded = false;
    return this;
  }

  update(delta, deltaMS){
    if(!this.active)return;
    if(this.delay > this._delayTime){
      this._delayTime += deltaMS;
      return;
    }

    if(!this.isStarted){
      this.isStarted = true;
      this.emit('start', this._elapsedTime);
    }

    if(this.time > this._elapsedTime){
      let t = this._elapsedTime+deltaMS;
      let ended = (t>=this.time);

      this._elapsedTime = (ended) ? this.time : t;
      this.emit('update', this._elapsedTime, delta);

      if(ended){
        if(this.loop || this.repeat > this._repeat){
          this._repeat++;
          this.emit('repeat', this._elapsedTime, this._repeat);
          this._elapsedTime = 0;
          return;
        }

        this.isEnded = true;
        this.active = false;
        this.emit('end', this._elapsedTime);
      }
    }
  }
}
