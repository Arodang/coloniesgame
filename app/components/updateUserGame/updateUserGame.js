(function (angular) {
	"use strict";
	angular.module('myApp.updateUserGame', ['firebase','firebase.utils', 'firebase.auth', 'ngRoute'])

	.factory('UpdateUserGameService', ['$firebaseObject', 'fbutil', function($firebaseObject, fbutil) {
		var userGameRef = {};
		var baseValuesRef = {};
		var currentTime = 0;
		var lastTime = 0;
		var timeChanged = 0;
		var user = {};

		var updateResources = function() {
			


			var buildings = $firebaseObject(userGameRef.child('buildings'));
			var baseBuildingVals = $firebaseObject(baseValuesRef.child('buildings'));
			var resources = $firebaseObject(userGameRef.child('resources'));
			var userDate = $firebaseObject(userGameRef.child('last_saved_datetime'));

			function updateResource(resourceName, buildingName) {
				var incomeAmount = baseBuildingVals[buildingName].increased_income_amount;
				var buildingCount = buildings[buildingName];
				var oldResourceValue = resources[resourceName];
				var newResourceValue = Math.round(oldResourceValue + buildingCount*incomeAmount*timeChanged);
				return newResourceValue;
			};

			buildings.$loaded().then(function() {
				baseBuildingVals.$loaded().then(function(){
					resources.$loaded().then(function() {
						userDate.$loaded().then(function() {
							lastTime = userDate.$value * .001;
							var currentTimeSeconds = currentTime.getTime() * .001;
							timeChanged = currentTimeSeconds - lastTime;

							resources.gold = updateResource("gold", "merchant_hall");
							resources.lumber = updateResource("lumber", "lumber_yard");
							resources.fur = updateResource("fur", "trappers_hut");
							resources.salt = updateResource("salt", "salt_mine");
							resources.$save();

							userDate.$value = currentTime.getTime();
							userDate.$save();

						});
						
						
					});
				});
			});
		};

		var updateBuildings = function() {

		};

		var updateBusinessContracts = function() {

		};

		var publicUpdateUserGame = function(user) {
			this.user = user;

			baseValuesRef = fbutil.ref('game_db/base_game_values');

			userGameRef = fbutil.ref('game_db/user_games', user.uid);

			currentTime = new Date();

			updateBusinessContracts();
			updateBuildings();
			updateResources();
		};

		return {
			updateUserGame : publicUpdateUserGame
		}

	}]);
})(angular);