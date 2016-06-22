var server = require('express');
var port = process.env.PORT || 3500;
var app = server();
var shrink = require('shrink');
var short= require('short');
var mongo = require('mongodb').MongoClient;


app.listen(port, function(){ 
  console.log('Ready: ' + port);
  });

app.get('/new/:inputurl(*)/', function(req,res) {
//  var result; var inp=req.params.inputurl.replace("https://","");
//  result = shrink.shorten(inp);

short.connect('mongodb://localhost:27017/short');
short.connection.on('error', function(error) {
  throw new Error(error);
});

var shortURLPromise = short.generate({
  URL : req.params.inputurl
});

shortURLPromise.then(function(mongodbDoc) {
  console.log('>> created short URL:');
  console.log(mongodbDoc);
  console.log('>> retrieving short URL: %s', mongodbDoc.hash);
  short.retrieve(mongodbDoc.hash).then(function(result) {
    console.log('>> retrieve result:');
    console.log(result);
    
    //moved here
    res.json({
      
      //{ "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
     
      original_url:mongodbDoc.URL, //=> 'http://google.com'
      short_url:"https://th-tinyurl-microservice.herokuapp.com/" +mongodbDoc.hash
    });
  
    
   // process.exit(0);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
}, function(error) {
  if (error) {
    throw new Error(error);
  }
});
    //was here
});

