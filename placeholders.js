var http = require('http');
var port = parseInt(process.argv[2] || '3000');

// Generate a randomish colour based on the given width and height
function defaultBackgroundColour(width, height) {
  var col = (width * height * 0x13579 % 0xFFFFFF).toString(16);
  return '000000'.substr(0, (6 - col.length)) + col;
};

// Choose black or white text to contrast with the background colour
function defaultTextColour(bgColour) {
  return ((parseInt(bgColour[0], 16) * 2 +
           parseInt(bgColour[2], 16) * 4 +
           parseInt(bgColour[4], 16)) / 112 // (2 + 4 + 1) * 16
         ) >= 0.6 ? '000000' : 'FFFFFF';
}

http.createServer(function (req, res) {
  var params = req.url.split('/');
  console.log(req.connection.remoteAddress, params);

  var size = params[1].split('x');
  var width = size[0] || Math.ceil(50 + (Math.random() * 500));
  var height = size[1] || Math.ceil(50 + (Math.random() * 200));
  var colour = params[2] || defaultBackgroundColour(width, height);
  var textColour = params[3] || defaultTextColour(colour);
  var text = params[4] ? unescape(params[4]) : '' + width + 'x' + height;
  var textSize = Math.ceil(Math.min((width / text.length), (height / 2)));

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'"><g>'+
              '<rect width="100%" height="100%" style="fill:#'+colour+'"/>'+
              '<text y="50%" x="50%" text-anchor="middle" dominant-baseline="central" style="font-family: sans-serif; font-size: '+textSize+'px; fill:#'+textColour+'">'+text+'</text>' +
            '</g></svg>';

  res.writeHead(200, {'Content-Type': 'image/svg+xml', 'Content-Length': svg.length + 1});
  res.end(svg + '\n');
}).listen(port);

console.log("Serving on port:", port);

