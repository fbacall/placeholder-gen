var express = require('express');
var app = express();

var port = process.argv[2] || 3000;

function defaultTextColour(bgColour) {
  return (
          (
           parseInt(bgColour.substr(0,2), 16) + 
           parseInt(bgColour.substr(2,2), 16) + 
           parseInt(bgColour.substr(4,2), 16)
          ) / (3 * 0xFF)
         ) >= 0.5 ? '000000' : 'FFFFFF';
}

app.get('/:size/:colour?/:text?', function(req, res) {
  console.log(req.ip, req.params);

  var size = req.params.size.split('x');
  var width = size[0], height = size[1];
  var colour = req.params.colour || '663399';
  var textColour = req.params.text || defaultTextColour(colour);

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+width+'" height="'+height+'"> \
               <g> \
                 <rect width="'+width+'" height="'+height+'" style="fill:#'+colour+'"/> \
                 <text y="50%" x="50%" text-anchor="middle" dominant-baseline="central" style="font-family: sans-serif; font-size: '+Math.ceil(height/2)+'px; fill:#'+textColour+'">'+width+'x'+height+'</text> \
               </g> \
             </svg>';

  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(port);
console.log("Serving on port:", port);

