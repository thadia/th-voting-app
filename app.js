var port = process.env.PORT || 3000;
var map = require('through2-map');
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (req, res) {
    // request handling logic...
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var urlObj = url.parse(req.url, true);

    console.log(urlObj);
    var path=urlObj.pathname;
    var isoDate = urlObj.query.iso;
    var date = new Date(isoDate);

    if(path == "/api/parsetime"){
       var jsonObj={ "hour": 00,
       "minute": 00,
       "second": 00};
       jsonObj.hour=date.getHours();
       jsonObj.minute=date.getMinutes();
       jsonObj.second=date.getSeconds();
       console.log(jsonObj);
       res.end(JSON.stringify(jsonObj));
    }


   else
   if(path == "/api/unixtime"){
        var jsonObj={ "unixtime": 00, };
        jsonObj.unixtime=date.getTime();
        console.log(jsonObj);
        res.end(JSON.stringify(jsonObj));
   }

     });
server.listen(port);