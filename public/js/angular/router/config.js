ngGetTweets.config(
    ['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('default', {
                url: '/',
                views: {
                    'default': {
                        controller: 'tweetsCtrl',
                        templateUrl: 'views/getTweets.html'
                    }
                }

            });
            
    }]);
