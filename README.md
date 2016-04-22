## Patterns for `async` processing in Node.js or JavaScript

Please **Star** the repo :)

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
