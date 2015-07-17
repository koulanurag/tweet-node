ngGetTweets.controller('tweetsCtrl', ['$scope','$rootScope','$timeout', 'tweetFactory',
    function ($scope, $rootScope,$timeout, tweetFactory) {
    $scope.publicTweets=[];
    $scope.publicTweetsCount=0;
    $scope.totalLiveFeedCount=0
    $scope.freshFeed=[];
    $scope.feed=[];
    $scope.hashtags = []//new Set();
    $scope.flag=true;
    
    $scope.showNewFeed = function(){
        var temp = $scope.freshFeed.concat($scope.feed);
        $scope.freshFeed =[];
        $scope.feed = temp.slice(0, 50);
        $('.livefeed').scrollTop(0);
    }
    $scope.update = function(data){
/*        console.log(data.hashtags)*/
/*        if (data.hashtags.length >0){
            angular.forEach(data.hashtags,function(value){
                //$scope.hashtags.add(value);
                //$scope.hashtags.push(value);
                //$scope.$apply()
                if (!(value in $scope.hashtags)){
                    console.log('inserting....')
                    $scope.hashtags.push(value)
                }
                else{
                    console.log(value,"not inserted")
                }
            });
            //$scope.$apply();
        }*/
        if($scope.feed.length <= 20){
            $scope.feed.unshift(data);
        }
        if( $scope.feed.length > 20 && $scope.freshFeed.length < 40){
            $scope.freshFeed.unshift(data);
        }
        $scope.totalLiveFeedCount += 1;
//        console.log('freshfeed',$scope.freshFeed.length)
//        console.log($scope.feed.length);
       $scope.$apply();
    }
    $scope.updateRestFeed = function(data){
        //console.log(data.hashtags)
        $scope.publicTweetsCount=$scope.publicTweetsCount+data.tweets.length;
        $scope.publicTweets.unshift(data);
        $scope.$apply();
/*        console.log('publicTweets',$scope.publicTweets)*/
    }
    $scope.showTwitterHandleBox = false;
    $scope.toggleTwitterHandleBox = function(){
        $scope.showTwitterHandleBox = !$scope.showTwitterHandleBox
    }
    $scope.twitterHandles = []
    $scope.LiveFeedButtonValue="Start"
    $scope.changeLiveFeedStatus = function(){
        if($scope.LiveFeedButtonValue=="Start"){
             tweetFactory.startLiveFeed()
             $scope.LiveFeedButtonValue="Stop"
        }
        else{
            tweetFactory.stopLiveFeed()
            $scope.LiveFeedButtonValue="Start"
        }
    }
    $scope.updateHandles = function(id){
        angular.forEach($scope.twitterHandles,function(value,key){
           if (value.id == id){
                tweetFactory.setHandleActivation(value.id,value.activated)
           }

        });
        tweetFactory.updateHandles()
    }
    

    $timeout(function(){
        tweetFactory.loadHandles().then(
                function(){
                    $scope.twitterHandles=tweetFactory.getHandles();
                    console.log('$scope.twitterHandles',$scope.twitterHandles)
                },function(){
                    console.log('twitter Handles received');
                }
            )
        //tweetFactory.startRestFeed();    
        $scope.changeLiveFeedStatus()
        var socket = io.connect("http://ukkkcc1915e7.koulanurag.koding.io:3018");
        var socket = io.connect();
        socket.on('livefeed',
            function (data) {
                console.log('receving live feed')
                $scope.update(data)
            }
        );
/*        socket.on('restfeed',
            function (data) {
                $scope.updateRestFeed(data)
            }
        );*/
        //drawLineChart();    
    });

    }]);