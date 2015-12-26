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
This plugin add 2 new classes (TimerManager and Timer) to the PIXI namespace, and create an instance for TimerManager in PIXI.timer, but all you need is add PIXI.timer.update() in your requestAnimationFrame. You can pass as params for .update(delta) your own delta time, if you don't pass anything it will be calculated internally, for max accuracy calculating the delta time you can use the [AnimationLoop](https://github.com/Nazariglez/pixi-animationloop/) plugin.

### Events
TimerManager extends from [PIXI.utils.EventEmitter](https://github.com/primus/eventemitter3), and emit some events: start, end, repeat, update and stop. More info: [Node.js Events](https://nodejs.org/api/events.html#events_emitter_emit_event_arg1_arg2)

#### start - callback(elapsedTime)
Fired when the timer starts counting. If the timer has an delay, this event fires when the delay time is ended.
#### end - callback(elapsedTime)
Fired when the timer is over. If the .loop option it's true, this event never will be fired, and if the timer has an .repeat number, this event will be fired just when all the repeats are done.
#### repeat - callback(elapsedTime, repeat)
Fired at every repeat cycle, if your time has .repeat=5 this events will be fired 5 times.
#### update - callback(elapsedTime, delta)
Fired at each frame.
#### stop - callback(elapsedTime)
Fired only when it's used the .stop() method. It's useful to know when a timer is cancelled.

```js
var timer = PIXI.timer.createTimer(1000);
timer.repeat = 15;

timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});
timer.on('repeat', function(elapsed, repeat){console.log('repeat', repeat)});
timer.on('update', function(elapsed, delta){console.log('update',elapsed, delta)});
timer.on('stop', function(elapsed){console.log('stop')});

timer.start();
```

### Some examples
-

## API
### TimerManager
#### constructor()
The constructor

### Timer
#### constructor()
The constructor
