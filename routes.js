//handling routes
var config  = require('./config');

module.exports = {

  index: function(req, res) {
      
        res.sendFile(__dirname + '/index.html');
      
    // Call static model method to get tweets in the db
/*    Tweet.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderComponentToString(
        TweetsApp({
          tweets: tweets
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });*/
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
  },
  get_handles: function(req,res){
      
      res.send(config.twitter_handles)
    
  }

}