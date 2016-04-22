var async = require('async');

async.waterfall(
  [
    function(done) {
      var err = null;
      console.log("Getting repos list");
      var repos = ["handsondocker", "xservedbyfinder"];
      done(err, repos);
    },
    function(repos, done) {

      var err = null;
      console.log("Getting stargazers from first repo");

      var repo = repos[0];
      var stargazers = ["alex", "karl", "john"];
      done(err, repos, stargazers);
    },
    function(repos, stargazers, done) {

      var err = null;
      console.log("Getting stargazers' detailled information");

      var gazerData = [];
      var stargazers = ["alex", "karl", "john"];
      stargazers.forEach(function(gazer) {
        gazerData.push({name: gazer, repoCount: Math.floor((Math.random() * 10) + 1), url: "https://github.com/"+gazer});
      });

      done(err,gazerData);
    },
], function(err, res) {
  console.log("All done, here is the star-gazer data:");
  console.log(res);
});
