var request = require('request').defaults({ encoding: null });
var glitchify = require('../scripts/glitchImg');
var path = require('path');
var fs = require('fs');
var gm = require('gm');

exports.base64 = function(link, res, q){
  request.get(link, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var imgBuff = new Buffer(body);
        var stringBuff = new Buffer(q);
        var totalLength = imgBuff.length + stringBuff.length

        var imgdata = new Buffer.concat([imgBuff, stringBuff], totalLength).toString('base64');
        var glitchString = glitchify.glitch(imgdata, q);
        console.log(glitchString);
        data = "data:" + response.headers["content-type"] + ";base64," + imgdata
        // var img = data.replace(/^data:image\/\w+;base64,/, '');

        fs.writeFile('glitch.jpg', imgdata, {encoding: 'base64'}, function(err){
          res.sendFile('glitch.jpg', { root : path.join(__dirname, '../')})
        });
        // console.log(data);
    }
  });
}

exports.drawText = function(link, res, q){
  console.log("drawText: ", q);
  var filename = q.trim().split(" ").join("_") + '.jpg';
  request.get(link, function (error, response, body) {
    gm(body).fill("#FFF").stroke("#000", 1).resize(400).fontSize('30px').font('Impact.ttf').drawText(20, 120,  q.toUpperCase()).write(filename, function(){
      res.sendFile(filename, { root : path.join(__dirname, '../')});
    });
    // gm('test2.jpg')
    // .blur(8, 4)
    // .stroke("red", 7)
    // .fill("#ffffffbb")
    // .drawLine(20, 10, 50, 40)
    // .fill("#2c2")
    // .stroke("blue", 1)
    // .drawRectangle(40, 10, 50, 20)
    // .drawRectangle(60, 10, 70, 20, 3)
    // .drawArc(80, 10, 90, 20, 0, 180)
    // .drawEllipse(105, 15, 3, 5)
    // .drawCircle(125, 15, 120, 15)
    // .drawPolyline([140, 10], [143, 13], [145, 13], [147, 15], [145, 17], [143, 19])
    // .drawPolygon([160, 10], [163, 13], [165, 13], [167, 15], [165, 17], [163, 19])
    // .drawBezier([180, 10], [183, 13], [185, 13], [187, 15], [185, 17], [183, 19])
    // .fontSize(168)
    // .stroke("#efe", 2)
    // .fill("#888")
    // .drawText(20, 98, "graphics magick")
    // .write('test3.jpg', function(){
    //     res.sendFile('test3.jpg', { root : path.join(__dirname, '../')});
    // })

  });

}