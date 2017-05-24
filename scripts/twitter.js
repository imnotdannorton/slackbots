var twitter = require('Twitter');
var constants = require('../config/globals');
var parse = require('../routes/parse');
var stringify = require('../scripts/stringify');
var search = require('../scripts/search');
var twitClient = new twitter(constants.twitter);
exports.track = function(string){
  twitClient.stream('statuses/filter', {track:'#'+string}, function(stream){
    stream.on('data', function(tweet){
      var parsed = parse.sendString(tweet.text);
      console.log(parsed);
    })
    stream.on('error', function(error) {
      console.log(error);
    });
  });
}

exports.find = function(string, res){
  twitClient.get('search/tweets', {q: string}, function(error, tweets, response) {
   var i = Math.floor(Math.random()*(tweets.statuses.length-1));
   var parsed = parse.sendString(tweets.statuses[i].text);
   var img = search.fetch(parsed);
   console.log("parsed: ", parsed);
  });
  if(res){



  
  }
}
