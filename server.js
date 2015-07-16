
//reuired modules   == Deisel ------------ ready to be burnt
var express = require('express');
var twitter = require('twitter');
var config  = require('./config');
var routes  = require('./routes');
var streamHandler = require('./utils/streamHandler.js');
var mongoose = require('mongoose');
var twitterHandles=config.twitter_handles;
var socket = require('socket.io');

var app = express();
var port = process.env.PORT || 8081;
var http = require('http').Server(app);

//connecting to mongo-db on azure
//mongoose.connect('mongodb://quantumkoul1.cloudapp.net:27017/tweets',function(err,db){
/*mongoose.connect('mongodb://localhost/tweets',function(err,db){
  if(!err) {
    console.log("We are connected");
  }
  else{
      console.log(err);
  }
});
*/

//create nTwitter instance
var twit = new twitter(config.twitter_keys)

//static files
app.use(express.static('public'));


//route
app.get('/', routes.index );
app.get('/json/getHandles', routes.get_handles );


// Fire it up : start server  ::::>================>
var server = http.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
// Initialize socket.io
var io = socket.listen(server);


// Set a stream listener for keywords
twit.stream('statuses/filter',{ follow: twitterHandles.map(function(t){return t.id}).join()}, function(stream){
    streamHandler(stream,io)
});
