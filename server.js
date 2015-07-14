
//reuired modules   == Deisel ------------ ready to be burnt
var express = require('express');
var twitter = require('twitter');
var config  = require('./config');
var streamHandler = require('./utils/streamHandler.js')



var app = express();
var port = process.env.PORT || 8080;
var http = require('http').Server(app);

//create nTwitter instance
var twit = new twitter(config.twitter_keys)



//static files
app.use(express.static('public'));


//route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


// Fire it up : start server  ::::>================>
http.listen(port, function(){
  console.log('Express server listening on port ' + port);
});

// Set a stream listener for keywords
twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
    streamHandler(stream)
});
