var language = require('nlp_compromise');
var express = require('express');
var search = require('../scripts/search');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//   console.log(req.params);
//   res.send(req.params);
// });
randomString = function(array){
  var i = Math.floor(Math.random()*(array.length-1))
  if(array[i] && array[i].text){
    return array[i].text
  }else{
    return ""
  }
}
exports.sendString = function(phrase){
  var sen = language.sentence(phrase);
  var parsed = randomString(sen.adjectives()) + " " + randomString(sen.nouns()) + " " + randomString(sen.verbs())
  return parsed
}
exports.handleString = function(req, res, next){
  var sen = language.sentence(req.params.phrase);
  var parsed = randomString(sen.adjectives()) + " " + randomString(sen.nouns()) + " " + randomString(sen.verbs())
  var img = search.fetch(parsed, res, req.params.phrase);
  // console.log(parsed, img);
  // res.send(img);
}
// module.exports = router;
