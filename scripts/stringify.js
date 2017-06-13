
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
exports.stream = function(link, res, q){

}
exports.drawText = function(link, res, q){
  console.log("drawText: ", q);
  var filename = q.trim().split(" ").join("_") + '.jpg';
  // request.get(link, function (error, response, body) {
    console.log(gm);
    gm(request(link)).fill("#FFF").stroke("#000", 1).resize(400).fontSize('30px').font('Impact.ttf').drawText(20, 120,  q.toUpperCase()).setFormat('jpg').stream(function(err, stdout, stderr){
        // console.log("body: ", body);
        // console.log("buffer", buffer, body);
        s3Params.Key = filename;
        // s3Params.Body = buffer;
        // s3.putObject(s3Params, (err, s3data) => {
        // if(err){
        //   console.log("s3 rrors: ", err);
        //   return res.end();
        // }
        // const returnData = {
        //   signedRequest: s3data,
        //   url: `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
        // };
        // res.write(JSON.stringify(returnData));
        // res.end();
        // });
        var buf = [];
        stdout.on('data', function(d) {
           buf.push(d);
        });
        stdout.once('end', function(data) {
            console.log("putting buf", buf);
            s3Params.Body = buf;
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
        });
        stdout.once('data', function(data){
            console.log(String(data));
        })
    });

  // });

}
