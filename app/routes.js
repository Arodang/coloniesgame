(function (angular) {
  "use strict";

  angular.module('myApp.routes', ['ngRoute', 'firebase.auth', 'myApp.config'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    });
    $routeProvider.whenAuthenticated('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatCtrl'
    });
    $routeProvider.whenAuthenticated('/account', {
      templateUrl: 'account/account.html',
      controller: 'AccountCtrl'
    });
    $routeProvider.whenAuthenticated('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
})(angular);

