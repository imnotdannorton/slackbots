exports.glitch = function(base, query){
  // console.log(query);
  var queryBase =  new Buffer(query).toString('base64');
  var q = query.replace(/ /g, '').split("");
  // var index = base.indexOf(";base64,") + 8;
  // var header = base.substring(0, index);
  // var baseData = base + queryBase;
  var l = q.length;
  console.log(queryBase);
  // for(i = 0; i < q.length-1; i++){
  //   console.log("string: ", q[i], base.length);
  //   var index = Math.floor(Math.random()*(base.length-1))
  //   var reg = new RegExp(q[i], "g");
  //   var double = q[i]+q[i].toUpperCase();
  //   baseData = base.replace(reg, double);
  // }

  // var glitchString = header+baseData;
  return baseData
}
