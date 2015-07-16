var mongoose = require('mongoose');


//schema for our tweet data
var schema = new mongoose.Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
  , location   : String
  , media_urls : Array
  , hashtags   : Array
});


// Create a static getTweets method to return tweet data from the db
schema.statics.getTweets = function(page, skip, callback) {

var tweets = [],
    start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  Tweet.find({},'twid active author avatar body date screenname media_urls hashtags',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs){

    // If everything is cool...
    if(!err) {
      tweets = docs;  // We got tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // Set them to active
      });
    }

    // Pass them back to the specified callback
    callback(tweets);

  });

};

// Return a Tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);