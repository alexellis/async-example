var async = require('async');

var track = async.queue(function(runner, finishLine) {
  console.log("> " +runner.name + " entered his lane");
  setTimeout(
    function() {
      console.log("< "+runner.name + " crossed the line");
      finishLine();
    }, Math.floor((Math.random() * 2000) + 1000));
}, 4);

track.drain = function() {
  console.log("All the results are in now. We have a winner");
}

track.push({name: "bolt"});
track.push({name: "mo"});
track.push({name: "phil"});
track.push({name: "dave"});
track.push({name: "alex"});
