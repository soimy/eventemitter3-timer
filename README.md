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
var timer = require('pixi-timer'); //pixi-timer is added automatically to the PIXI namespace

//create PIXI renderer
var renderer = new PIXI.autoDetectRenderer(800,600);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

function animate(){
  window.requestAnimationFrame(animate);
  renderer.render(stage);
  PIXI.timerManager.update();
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
  PIXI.timerManager.update();
}
animate();
```

### How it works
This plugin add a new namespace named `timer`to the PIXI namespace, and the timer namespace has 2 new classes, TimerManager and Timer, and create an instance for TimerManager in PIXI.timerManager, but all you need is add PIXI.timerManager.update() in your requestAnimationFrame. You can pass as params for `PIXI.timerManager.update(delta)` your own delta time, if you don't pass anything it will be calculated internally, for max accuracy calculating the delta time you can use the [AnimationLoop](https://github.com/Nazariglez/pixi-animationloop/) plugin.

When a timer is ended, the instance will kept in the memory and in the timerManager, but you can prevent this if you set .expire = true in the timer.

#### Using AnimationLoop
```js
var renderer = new PIXI.autoDetectRenderer(800,600);
document.body.appendChild(renderer.view);

var animationLoop = new PIXI.AnimationLoop(renderer);

//Add a postrender or prerender event to add the timer.update in the raf.
animationLoop.on('postrender', function(){
  PIXI.timerManager.update(this.delta); //Pass as param the delta time to PIXI.timerManager.update
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
var timer = PIXI.timerManager.createTimer(1000);
timer.repeat = 15;

timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});
timer.on('repeat', function(elapsed, repeat){console.log('repeat', repeat)});

timer.start();
```

Create a timer to count to 100 ms and repeat forever.
```js
var timer = PIXI.timerManager.createTimer(100);
timer.loop = true;

timer.on('start', function(elapsed){console.log('start')});
timer.on('repeat', function(elapsed, repeat){console.log('repeat', repeat)});

timer.start();
```

Create a timer to count one minute and just end.
```js
var timer = PIXI.timerManager.createTimer(1000*60);
timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});

timer.start();
```

Create a timer to count to 5 seconds, and when the count it's ended, reset it and count to 10 seconds.
```js
var timer = PIXI.timerManager.createTimer(5000);
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
var timer = PIXI.timerManager.createTimer(5000);
timer.delay = 2000;
timer.on('start', function(elapsed){console.log('start')});
timer.on('end', function(elapsed){console.log('end', elapsed)});

timer.start();
```

## API
### TimerManager
#### constructor()
The constructor
#### .timers
An array with all the timers created
#### .update( delta )
The update method, make sure it is in the raf. You can pass a fixed delta time (like 0.016), your own calculated delta, or nothing. (Delta time in seconds not milliseconds).
#### .removeTimer( timer )
Remove a timer from the .timers array in the next frame.
#### .addTimer( timer )
Normally you want to use .createTimer(time) to create a timer, but, you can also create a timer with new PIXI.Timer(time) and add it in the manager with this method.  
#### .createTimer( time )
Return a new instance of PIXI.Timer managed by this timerManager.

### Timer
#### constructor()
The constructor
#### .time
The timer will count to this value
#### .manager
The TimerManager instance who manage this timer (maybe you want to use different managers for each scene)
#### .active
Read only, it's the state of the timer. It's different to the .isStarted. For example: if the timer has a delay, and you use .start(), .isStarted will be false, but .active will be true.
#### .isStarted
Return as boolean if the count is started.
#### .isEnded
Return as boolean if the count is ended.
#### .expire
Set to true if you want to delete the instance of this timer when the timer will end. (false by default)
#### .delay
Set a delay in milliseconds before the timer's count.
#### .repeat
Set to repeat N times the count
#### .loop
Set true to repeat the count forever
#### .addTo( manager )
Add this timer instance to a timerManager
#### .remove()
Remove this instance in the next frame
#### .start()
Active this timer, and start the count or the delay.
#### .stop()
Disable the timer, stopping the count. If you use .start() after .stop() the count will be resumed.
#### .reset()
Reset the timer to the initial state. Values like .time, .loop, .repeat, etcetera will be kept.
#### .update( delta, deltaMS )
The update method, you don't need to use this method, the manager will do this internally.
