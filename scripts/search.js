var constants = require('../config/globals');
var stringify = require('../scripts/stringify');
var glitchify = require('../scripts/glitchImg');
var rp = require('request-promise');
var request = require('request');

exports.fetch = function(query, res, full){
  var opts = {
    uri:constants.searchUrl,
    qs:{
      'q':query,
      'cx':constants.cx,
      'key':constants.browserKey,
      'searchType':'image',
      'fileType':'jpg'
    },
    json:true
  }
  rp(opts).then(function(result){
    console.log(result.items[0].image);
    // res.contentType = 'image/jpg';
    // res.pipe(result.items[0].link)
    // res.setHeader("content-disposition", "attachment; filename=logo.png");
    // request(result.items[0].link).pipe(res);
    // stringify.base64(result.items[0].link, res, query);
    stringify.drawText(result.items[0].link, res, query);
    // console.log(glitchify.glitch(base, query));
    // return result.items[0].link;
  }).catch(function(err){
    console.log(err);
  });
}
