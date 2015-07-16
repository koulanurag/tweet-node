ngGetTweets.factory('tweetFactory', [ '$http',
    function ($http) {
        
        

        function Tweets() {

            this.defaults = {

                endpointGETMethod: 'get',

                endpointURL: 'json/getTweets'

            };

        }

        Tweets.prototype.loadData = function () {
            
            var params = {};
            return $http(
                {
                    method: this.defaults.endpointGETMethod,
                    url: this.defaults.endpointURL,
                    params: params,
                    cache: false
                }
            ).then($.proxy(Tweets.prototype.loadDataSuccess, this));
        };
        Tweets.prototype.startLiveFeed = function(){
            $http(
                {
                    method: this.defaults.endpointGETMethod,
                    url: 'startLiveFeeds'
                }
            )
        }
        Tweets.prototype.startRestFeed = function(){
            $http(
                {
                    method: this.defaults.endpointGETMethod,
                    url: 'startRestFeed'
                }
            )
        }
        Tweets.prototype.setHandleActivation = function(handleId, handleStatus){
            var paramString = '/'+handleId+'/'+handleStatus;
            $http(
                {
                    method: this.defaults.endpointGETMethod,
                    url: 'setHandleActivation'+paramString,
                }
            )
        }
        Tweets.prototype.loadHandles = function(){
            return $http(
                {
                    method: this.defaults.endpointGETMethod,
                    url: 'json/getHandles'
                }
            ).then($.proxy(Tweets.prototype.loadHandlesSuccess, this));
        }
        Tweets.prototype.loadHandlesSuccess = function(response){
            this.handles = response.data
        }
        Tweets.prototype.getHandles = function(){
            return this.handles
        }
        Tweets.prototype.stopLiveFeed = function(){
            $http(
                {
                    method: this.defaults.endpointGETMethod,
                    url: 'stopLiveFeeds'
                }
            )
        }
        Tweets.prototype.loadDataSuccess = function (response) {
            this.data=response.data
        };

        Tweets.prototype.getData = function () {
           // return "abc"
            return this.data;

        };

        return new Tweets();

    }]);