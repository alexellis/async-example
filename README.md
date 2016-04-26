## Patterns for `async` processing in Node.js or JavaScript

Please **Star** the repo :)

This repo exists to provide practical examples and explanations of how to use and when to apply `async` patterns in Node.js from the `async` library available on `npm`.

### Q&A

* Doesn't `async` have its own documentation?

Yes it does and it's very comprehensive, once you have the hang of these patterns go ahead and read about the many other more specialized options it offers. This page is designed to be a kind of practical cheat-sheet.

* But doesn't language X do asynchronous, too?

It may do, but when working in Node.js specifically I/O needs to be done asynchronously, so it's important to have a few patterns available for managing this.

* Why haven't you featured pattern X or Y?

If said pattern is fundamental and useful for starting out in `async` processing then please raise a PR with a simple example attached.

### Installing

I've tested these with Node 4.x, 5.x will probably work the same.

[Node.js Downloads](https://nodejs.org/en/download/)

```
npm install
```

*npm install will read the package.json file, where I've specified async as a dependency*

### Examples

#### 1) async.queue

**When to use it:**
* You have a large amount of of local I/O or HTTP I/O to do and must throttle the amount of work-in-progress. If you allow 1000 TCP ports to open at once this will likely hit the Operating System's limit very quickly. The same applies to file handles when doing I/O.

**Running the example:**

[sprint.js](https://github.com/alexellis/async-example/blob/master/sprint.js)

```
$ node sprint.js
> bolt entered his lane
> mo entered his lane
> phil entered his lane
> dave entered his lane
< phil crossed the line
> alex entered his lane
< dave crossed the line
< mo crossed the line
< bolt crossed the line
< alex crossed the line

All the results are in now. We have a winner
```

Extending the example
* Task: can you randomize the runners entering the track / queue in this file?

**API usage example:**

```
var taskHandler = function(task, done) {
  doStuff(task.url, function() {
    done();
  });
};

var queueSize = 4;

var myQueue = async.queue(taskHandler, queueSize);

myQueue.drain = function() {
  console.log("All the work has been done.");
}

for(var i = 0; i < 100; i++) {
  myQueue.push({ id: i, url: "http://localhost/get-person/"+i });
}
```

#### 2) async.series

**When to use it:**

* You have a set of I/O or async operations to perform and have encountered callback-hell. You refactor to remove the nesting.
* Same as above, but you want to create an array of functions ahead of time, then execute them one after the other

[series.js](https://github.com/alexellis/async-example/blob/master/series.js)

**Running the example**

```
$ node series.js
We have sent a probe to the moon
Collecting soil samples.
Firing boosters and returning to Earth.
Nasa over and out
```

**API Usage:**
```
async.series(
  [
    function(done) {
      console.log("Task 1");
      done()
    },
    function(done) {
      console.log("Task 2");
      done()
    },
  ], function() {
    console.log("All done.")
  }
);
```

#### 3) async.parallel

**When to use it:**

* You have a bunch of I/O or asynchronous work to perform and don't care about the order, but can't progress until it's all finished.
* Be careful if you are reading or writing files, or making TCP connections. There is a hard limit each operating system supports and while this may be fine with small numbers, large parallel workloads will cause issues. 

API is the same as for async.series, but the keyword is parallel.

Try the example:

[parallel-download.js](https://github.com/alexellis/async-example/blob/master/parallel-download.js)

```
$ node parallel-download.js
> Opening HTTP connection to https://github.com/alexellis/async-example
> Opening HTTP connection to https://github.com/alexellis/docker-arm
> Opening HTTP connection to https://github.com/alexellis/ghost-on-docker
> Opening HTTP connection to https://github.com/alexellis/rpi-display
> Opening HTTP connection to https://github.com/alexellis/arm-node-bench
> Opening HTTP connection to https://github.com/alexellis/remote_checkins_ruby
< Downloaded /alexellis/async-example
< Downloaded /alexellis/arm-node-bench
< Downloaded /alexellis/ghost-on-docker
< Downloaded /alexellis/remote_checkins_ruby
< Downloaded /alexellis/docker-arm
< Downloaded /alexellis/rpi-display
All the URLs have been downloaded now.
```

#### 4) async.waterfall

**When to use it:**

* You have a bunch of I/O to do, but each step is dependent on the previous.. along the chain of call-backs you may be producing intermittent results which get passed forwards. This is like a waterfall with data passing in one direction.
* At the end you can receive the results of the whole flow in the final callback.
* If an error occurs at any part of the waterfall, you just pass that error into the `done()` callback and the final call-back will be invoked breaking the whole chain.

[waterfall.js](https://github.com/alexellis/async-example/blob/master/waterfall.js)

**Running the example**

```
$ node waterfall.js
Getting repos list
Getting stargazers from first repo
Getting stargazers' detailled information
All done, here is the star-gazer data:
[ { name: 'alex', repoCount: 10, url: 'https://github.com/alex' },
  { name: 'karl', repoCount: 2, url: 'https://github.com/karl' },
  { name: 'john', repoCount: 6, url: 'https://github.com/john' } ]
```

**API Usage:**
```
async.waterfall(
  [
    function(done) {
      var error = null;
      console.log("Task 1");
      done(error, {id: "first set of results"} )
    },
    function(firstResults, done) {
      var error = null;

      console.log("Task 2");
      done(error, firstResults, {id: "second set of results"} )
    },
  ], function(error, firstResults, secondResults) {
    console.log(firstResults, secondResults);
  }
);
```

### async.until

Another pattern which can be very useful is `async.until / async.while`. Use when you have a non-deterministic amount of work to process. 

See an example here: [xservedbyfinder async.until](https://github.com/alexellis/xservedbyfinder/blob/master/node_v2/app.js)

### Taking it further

Head over to the official [async](https://github.com/caolan/async) documentation.

