var async = require('async');

var urls = [
  "https://github.com/alexellis/async-example",
  "https://github.com/alexellis/docker-arm",
  "https://github.com/alexellis/ghost-on-docker",
  "https://github.com/alexellis/rpi-display",
  "https://github.com/alexellis/arm-node-bench",
  "https://github.com/alexellis/remote_checkins_ruby"
];

function makeDownloadFunc(url) {
    return function(done) {
      console.log("> Opening HTTP connection to " + url);
      setTimeout(function() {
        console.log("< Downloaded " + url.split(".com")[1]);
        done();
      }, Math.floor((Math.random() * 2000) + 1000))
    };
}

var work = [];
urls.forEach(function(url) {
  work.push(makeDownloadFunc(url));
});

async.parallel(work, function() {
  console.log("All the URLs have been downloaded now.")
});
