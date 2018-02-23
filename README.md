EventEmitter3-Timer
======================

[![Build Status](https://travis-ci.org/soimy/eventemitter3-timer.svg?branch=master)](https://travis-ci.org/soimy/eventemitter3-timer)
[![Coverage Status](https://coveralls.io/repos/github/soimy/eventemitter3-timer/badge.svg?branch=master)](https://coveralls.io/github/soimy/eventemitter3-timer?branch=master)
[![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard-flat.svg)](http://definitelytyped.org)

`EventEmitter3-Timer` is a plugin extend [EventEmitter3](https://github.com/primus/eventemitter3) to create time events easily.
The origin purpose of this module is to add timer events into `PIXI.js` event system which is also extends `EventEmitter3`. There was a great repo [pixi-timer](https://github.com/Nazariglez/pixi-timer) but stop updated since 2016 and can't work with latest PIXI v4+. So here it is, a new Timer for `PIXI.js` or any other code work with `EventEmitter3`, with almost the same API with `pixi-timer` but with optimized workflow and support of `typescript` (Because the whole module is written in typescript).

## Installation

```bash
npm install eventemitter3-timer
```

## Usage

### Browserify - Webpack

If you use Browserify or Webpack you can use timer like this:

```ts
import { Timer, TimerManager } from "eventemitter3-timer";

//create PIXI application
const app = new PIXI.Application(800,600);
document.body.appendChild(app.view);

//create timer
const timer = new Timer(1000); // in ms
timer.on("end", () => {
  console.log("Timer ended.");
});
timer.start();

//increment timer in ticker loop
app.ticker.add(() => Timer.timemanager.update(app.ticker.elapsedMS), this);

```

### Prebuilt files

Prebuilt minified js expose a `EE3Timer` namespace.

```js
//create PIXI application
const app = new PIXI.Application(800,600);
document.body.appendChild(app.view);

const timer = new EE3Timer.Timer(1000); // in ms
timer.on("end", () => {
  console.log("Timer ended.");
});
timer.start();

//increment timer in ticker loop
app.ticker.add(() => Timer.timemanager.update(app.ticker.elapsedMS), this);

```

## How it works

This plugin add a new namespace named `EE3Timer` if using prebuilt minified js, and exposed 2 new classes, `TimerManager` and `Timer`.

> `Timer` is the main class for timers,
> `TimerManager` stands for centralized management of a sets of timers.

By defaults, all timers created from `new Timer(time)` is managed by a global static manager `Timer.timerManager`. Most of times all you need is add `Timer.timerManager.update()` in your main loop (eg: `PIXI.Application.ticker`). You can pass as params for `Timer.timerManager.update(delta)` your own delta time, if you don't pass anything it will be calculated internally.

> Note:
> `PIXI.Application.ticker` will pass `deltaTime` as param for ticker callback, and this `deltaTime` is a scala value default to `1` which is not the actual elasped time between each tick, we should use `elaspedMS` instead. (Take a look at previous samples)

When a timer is ended, the instance will kept in the memory and in the timerManager, but you can prevent this if you set .expire = true in the timer.

Alternatively, we can manually create `TimerManager` class to manage a set of timers.

```js
const timer1 = new Timer(1000); // Managed by global Timer.timerManager
timer1.start();
const tm = new TimerManager();
const timer2 = tm.createTimer(500); // Create a timer and assigned to custom TimerManager
timer2.start();
tm.update(500); // won't affect timer1 which is controled by global timerManager
tm.addTimer(timer1); // timer1 now no longer controled by gloabl timerManager
tm.update(1000); // now timer1 will fire

```

## Events

Timer extends from [EventEmitter3](https://github.com/primus/eventemitter3), and emit some events: start, end, repeat, update and stop. More info: [Node.js Events](https://nodejs.org/api/events.html#events_emitter_emit_event_arg1_arg2)

- __start - callback(elapsedTime)__: Fired when the timer starts counting. If the timer has an delay, this event fires when the delay time is ended.
- __end - callback(elapsedTime)__: Fired when the timer is over. If the .loop option it's true, this event never will be fired, and if the timer has an .repeat number, this event will be fired just when all the repeats are done.
- __repeat - callback(elapsedTime, repeat)__: Fired at every repeat cycle, if your time has .repeat=5 this events will be fired 5 times.
- __update - callback(elapsedTime, delta)__: Fired at each frame.
- __stop - callback(elapsedTime)__: Fired only when it's used the .stop() method. It's useful to know when a timer is cancelled.

## Some examples

Create a timer to count to 1 second, and repeat the count 15 times.

```ts
var timer = new Timer(1000);
timer.repeat = 15;

timer.on('start', () => console.log('start'));
timer.on('end', elapsed => console.log('end', elapsed));
timer.on('repeat', (elapsed, repeat) => console.log('repeat', repeat));

timer.start();
```

Create a timer to count to 100 ms and repeat forever.

```js
var timer = new Timer(100);
timer.loop = true;

timer.on('start', () => console.log('start'));
timer.on('repeat', (elapsed, repeat) => console.log('repeat', repeat));

timer.start();
```

Create a timer to count one minute and just end.

```js
var timer = new Timer(1000*60);
timer.on('start', () => console.log('start'));
timer.on('end', elapsed => console.log('end', elapsed));

timer.start();
```

Create a timer to count to 5 seconds, and when the count it's ended, reset it and count to 10 seconds.

```js
var timer = new Timer(5000);
timer.on('start', () => console.log('start'));
timer.on('end', elapsed => {
  if(elapsed === 5000){
    console.log('Reset and count to 10 seconds');
    this.reset(); //Reset the timer
    this.time = 10000; //set to 10 seconds
    this.start(); //And start again
  }else{
    console.log('end');
  }
}, timer);

timer.start();
```

Create a timer to count to 5 seconds, but with 2 seconds as delay.

```js
var timer = new Timer(5000);
timer.delay = 2000;
timer.on('start', () => console.log('start'));
timer.on('end', elapsed => console.log('end', elapsed));

timer.start();
```

## API

- [Timer](https://soimy.github.io/eventemitter3-timer/classes/_timer_.timer.html)
- [TimerManager](https://soimy.github.io/eventemitter3-timer/modules/_timermanager_.timermanager.html)
