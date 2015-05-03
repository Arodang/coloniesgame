(function(angular) {
  "use strict";

  var app = angular.module('myApp.menu', []);

  app.directive('menu', function () {
    return {
      restrict: 'E',
      template: './menu.html'
    };
  };
})(angular);