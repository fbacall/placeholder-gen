var http = require('http');
var port = parseInt(process.argv[2] || '3000');
var defaults = { width: 500, height: 100, colour: '663399' };

// Choose black or white text to contrast with the background colour
function defaultTextColour(bgColour) {
  return (
          (
           parseInt(bgColour.substr(0,2), 16) +
           parseInt(bgColour.substr(2,2), 16) +
           parseInt(bgColour.substr(4,2), 16)
          ) / (3 * 0xFF)
         ) >= 0.5 ? '000000' : 'FFFFFF';
}

http.createServer(function (req, res) {
  var params = req.url.split('/');
  console.log(req.connection.remoteAddress, params);

  var size = params[1].split('x');
  var width = size[0] || defaults.width;
  var height = size[1] || defaults.height;
  var colour = params[2] || defaults.colour;
  var textColour = params[3] || defaultTextColour(colour);
  var textSize = Math.ceil(Math.min((width / params[1].length), (height / 2)));

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'"><g>'+
              '<rect width="100%" height="100%" style="fill:#'+colour+'"/>'+
              '<text y="50%" x="50%" text-anchor="middle" dominant-baseline="central" style="font-family: sans-serif; font-size: '+textSize+'px; fill:#'+textColour+'">'+width+'x'+height+'</text>' +
            '</g></svg>';

  res.writeHead(200, {'Content-Type': 'image/svg+xml', 'Content-Length': svg.length + 1});
  res.end(svg + '\n');
}).listen(port);

console.log("Serving on port:", port);

