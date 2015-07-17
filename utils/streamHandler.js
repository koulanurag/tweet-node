var Tweet = require('../models/Tweet');

//handling of stream feeds 
var flag = true;
module.exports = function(stream,io){
    
    stream.on('data',function(data){
        //console.log(data);
        //creating a tweet instance
        
        var tweet = {
          twid: data['id'],
          active: false,
          author: data['user']['name'],
          avatar: data['user']['profile_image_url'],
          body: data['text'],
          date: data['created_at'],
          screenname: data['user']['screen_name'],
          location: data['user']['location'],
          hashtags: data['entities']['hashtags'].map(function(h){return h.text}),
          media_urls: []
        };
        if(data['entities']['media'] !== undefined ){
//            tweet.media.push(data['entities']['media']);
            //console.log(tweet.media)
            tweet.media_urls = data['entities']['media'].map(function(m){
                return [m['media_url'],m['sizes']]
            })
        }
        
        
        var tweetEntry = new Tweet(tweet)
        
            tweetEntry.save(function(err) {
              if (!err) {
                // If everything is cool, socket.io emits the tweet.
                io.emit('livefeed', tweet);
              }
              else{
                  console.log(err);
                  tweetEntry.remove(function(err){
                      if(!err){
                            console.log('removed all')
                      }
                      else{
                          console.log(err)
                      }
                  });
              }
            });
            
    })
    stream.on('error',function(error){
        console.log("error: ",error)
       //console.log(data) 
    })
    stream.on('end', function (response) {
        console.log('end')
    // Handle a disconnection
    });
    stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
    console.log('destroy')
    });
    
}