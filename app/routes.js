(function (angular) {
  "use strict";

  angular.module('myApp.routes', ['ngRoute', 'firebase.auth', 'myApp.config'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'pages/login/login.html'
    });
    $routeProvider.whenAuthenticated('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatCtrl'
    });
    $routeProvider.whenAuthenticated('/profile', {
      templateUrl: 'pages/profile/profile.html',
      controller: 'ProfileCtrl'
    });
    $routeProvider.whenAuthenticated('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    });
    $routeProvider.whenAuthenticated('/resources', {
      templateUrl: 'pages/resources/resources.html',
      controller: 'ResourcesCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/resources'});
  }]);
})(angular);

