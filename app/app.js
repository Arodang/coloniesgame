'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'myApp.config',
  'myApp.security',
  'myApp.home',
  'myApp.profile',
  'myApp.chat',
  'myApp.login',
  'myApp.routes',
  'myApp.menu',
  'myApp.resources',
  'myApp.updateUserGame'
  ])
.run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
