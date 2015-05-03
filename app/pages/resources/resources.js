(function (angular) {
	"use strict";
	angular.module('myApp.resources', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute'])

	.controller('ResourcesCtrl', ['$scope', 'fbutil', '$firebaseObject', 'user', 'UpdateUserGameService', 
		function($scope, fbutil, $firebaseObject, user, UpdateUserGameService) {
			var userGame, currentGameTime;
			
			var initialize = function() {
				userGame = $firebaseObject(fbutil.ref('game_db/user_games', user.uid, 'resources'));

				userGame.$bindTo($scope, 'resources').then(function() {
					console.log($scope.resources);
					setInterval(function() {
						UpdateUserGameService.updateUserGame(user)
					}, 500);
				});
			};



			$scope.updateGame = function() {
				UpdateUserGameService.updateUserGame(user);
			};


			initialize();

		}]);
}) (angular);