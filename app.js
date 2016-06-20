var express = require("express");
var bodyParser = require("body-parser");
var app = express.createServer();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./routes/routes.js")(app);
 
var server = app.listen(process.env.PORT, function () {
    console.log("Listening on port %s...", server.address().port);
});
