

var request = require('request').defaults({ encoding: null });
var glitchify = require('../scripts/glitchImg');
var path = require('path');
var fs = require('fs');
var gm = require('gm');

var aws = require('aws-sdk');
var s3 = new aws.S3();

var S3_BUCKET = 'img-gen-bot';
var s3Params = {
    Bucket: S3_BUCKET,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
exports.testGM = function(link, res, q){

}
exports.drawText = function(link, res, q){
  console.log("drawText: ", q);
  var filename = q.trim().split(" ").join("_") + '.jpg';
  // request.get(link, function (error, response, body) {
    console.log(gm);
    gm(request(link)).resize(400).setFormat('jpg').toBuffer(function(err, buffer){
        // console.log("body: ", body);
        console.log("buffer", buffer);
        s3Params.Key = filename;
        s3Params.Body = buffer;
        s3.putObject(s3Params, (err, s3data) => {
        if(err){
          console.log("s3 rrors: ", err);
          return res.end();
        }
        const returnData = {
          signedRequest: s3data,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
        });
        // var buf = new Buffer('');
        // stdout.on('data', function(d) {
        //    buf = Buffer.concat([buf, d]);
        // });
        // stdout.on('end', function(data) {
        //     console.log("putting buf", buf);
        //     s3Params.Body = buf;
        //     s3.putObject(s3Params, (err, s3data) => {
        //     if(err){
        //       console.log("s3 rrors: ", err);
        //       return res.end();
        //     }
        //     const returnData = {
        //       signedRequest: s3data,
        //       url: `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
        //     };
        //     res.write(JSON.stringify(returnData));
        //     res.end();
        //     });
        // });
    });

  // });

}
