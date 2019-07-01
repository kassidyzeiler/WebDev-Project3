"use strict";

//Set up the requirements for the server
//Including the port
var http = require('http');
var requestHandler = require('./request-handle');
var port = 3000;

//Create the server
var server = http.createServer(requestHandler);

//Connect and listen to the declared port
server.listen(port, function(){
  console.log("Server is listening on port " + port);
});