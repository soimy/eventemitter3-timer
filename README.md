pixi-timer
======================

pixi-timer is a plugin for Pixi.js v3.0.8 or higher to create time events easily.

## Installation
```
npm install pixi-timer
```

## Usage
### Browserify - Webpack
If you use Browserify or Webpack you can use pixi-timer like this:

```js
var PIXI = require('pixi.js');
var timerManager = require('pixi-timer'); //pixi-timer is added automatically to the PIXI namespace

//create PIXI renderer
var renderer = new PIXI.autoDetectRenderer(800,600);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

function animate(){
  window.requestAnimationFrame(animate);
  renderer.render(stage);
  PIXI.timer.update();
}
animate();
```

### Prebuilt files

```js
var renderer = new PIXI.autoDetectRenderer(800,600);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

function animate(){
  window.requestAnimationFrame(animate);
  renderer.render(stage);
  PIXI.timer.update();
}
animate();
```

### How it works
This plugin add 2 new classes (TimerManager and Timer) to the PIXI namespace, and create an instance for TimerManager in PIXI.timer, but all you need is add PIXI.timer.update() in your requestAnimationFrame. You can pass as params for `PIXI.timer.update(delta)` your own delta time, if you don't pass anything it will be calculated internally, for max accuracy calculating the delta time you can use the [AnimationLoop](https://github.com/Nazariglez/pixi-animationloop/) plugin.

When a timer is ended, the instance will kept in the memory and in the timerManager, but you can prevent this if you set .expire = true in the timer.

#### Using AnimationLoop
```js
var renderer = new PIXI.autoDetectRenderer(800,600);
document.body.appendChild(renderer.view);

var animationLoop = new PIXI.AnimationLoop(renderer);

//Add a postrender or prerender event to add the timer.update in the raf.
animationLoop.on('postrender', function(){
  PIXI.timer.update(this.delta); //Pass as param the delta time to PIXI.timer.update
});

animationLoop.start();
```

### Events
TimerManager extends from [PIXI.utils.EventEmitter](https://github.com/primus/eventemitter3), and emit some events: start, end, repeat, update and stop. More info: [Node.js Events](https://nodejs.org/api/events.html#events_emitter_emit_event_arg1_arg2)

- __start - callback(elapsedTime)__: Fired when the timer starts counting. If the timer has an delay, this event fires when the delay time is ended.
- __end - callback(elapsedTime)__: Fired when the timer is over. If the .loop option it's true, this event never will be fired, and if the timer has an .repeat number, this event will be fired just when all the repeats are done.
- __repeat - callback(elapsedTime, repeat)__: Fired at every repeat cycle, if your time has .repeat=5 this events will be fired 5 times.
- __update - callback(elapsedTime, delta)__: Fired at each frame.
- __stop - callback(elapsedTime)__: Fired only when it's used the .stop() method. It's useful to know when a timer is cancelled.

### Some examples
Create a timer to count to 1 second, and repeat the count 15 times.
```js
var timer = PIXI.timer.createTimer(1000);
timer.repeat = 15;

timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});
timer.on('repeat', function(elapsed, repeat){console.log('repeat', repeat)});

timer.start();
```

Create a timer to count to 100 ms and repeat forever.
```js
var timer = PIXI.timer.createTimer(100);
timer.loop = true;

timer.on('start', function(elapsed){console.log('start')});
timer.on('repeat', function(elapsed, repeat){console.log('repeat', repeat)});

timer.start();
```

Create a timer to count one minute and just end.
```js
var timer = PIXI.timer.createTimer(1000*60);
timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});

timer.start();
```

Create a timer to count to 5 seconds, and when the count it's ended, reset it and count to 10 seconds.
```js
var timer = PIXI.timer.createTimer(5000);
timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){
  if(elapsed === 5000){
    console.log('Reset and count to 10 seconds');
    this.reset(); //Reset the timer
    this.time = 10000; //set to 10 seconds
    this.start(); //And start again
  }else{
    console.log('end');
  }
});

timer.start();
```

Create a timer to count to 5 seconds, but with 2 seconds as delay.
```js
var timer = PIXI.timer.createTimer(5000);
timer.delay = 2000;
timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});

timer.start();
```


## API
### TimerManager
#### constructor()
The constructor

### Timer
#### constructor()
The constructor
