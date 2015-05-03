(function(angular) {
	"use strict";

	var app = angular.module('myApp.menu', []);

	app.controller('menuController', ['$scope', 'Auth', '$location',
		function($scope, Auth, $location) {
			$scope.logout = function() {
				Auth.$unauth();
				$location.path('/login');
			};
		}]);

	app.directive('menu', function () {

		return {
			restrict: 'E',
			templateUrl: 'components/menu/menu.html',
			controller: "menuController"
		};
	});
}) (angular);