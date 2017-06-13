
var request = require('request').defaults({ encoding: null });
var glitchify = require('../scripts/glitchImg');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
var imgMgk = gm.subClass({ imageMagick: true });
var aws = require('aws-sdk');
var s3 = new aws.S3();

var S3_BUCKET = 'img-gen-bot';
var s3Params = {
    Bucket: S3_BUCKET,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
exports.drawText = function(link, res, q){
  console.log("drawText: ", q);
  var filename = q.trim().split(" ").join("_") + '.jpg';
    console.log(imgMgk);
    imgMgk(request(link)).fill("#FFF").stroke("#000", 1).resize(400).fontSize('30px').font('Impact.ttf').drawText(20, 120,  q.toUpperCase()).setFormat('jpg').stream(function(err, stdout, stderr){

        s3Params.Key = filename;
        var buf = [];
        stdout.on('data', function(d) {
            console.log('stdout data: ', d);
           buf.push(d);
        });
        stdout.once('end', function(data) {
            console.log("putting buf", buf);
            s3Params.Body = Buffer.concat(buf);
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

}
