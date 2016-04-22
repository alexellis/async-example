var async = require('async');

async.series(
  [
    function(done) {
      console.log("We have sent a probe to the moon");
      done();
    },
    function(done) {
      console.log("Collecting soil samples.");
      done();
    },
    function(done) {
      console.log("Firing boosters and returning to Earth.");
      done();
    }
], function() {
  console.log("Nasa over and out");
});
