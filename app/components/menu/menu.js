(function(angular) {
  "use strict";

  var app = angular.module('myApp.menu', []);

  app.directive('menu', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/menu/menu.html'
    };
  });
}) (angular);