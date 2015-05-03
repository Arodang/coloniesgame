"use strict";
angular.module('myApp.login', ['firebase.utils', 'firebase.auth', 'ngRoute'])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', '$firebaseObject', function($scope, Auth, $location, fbutil, $firebaseObject) {
  $scope.email = null;
  $scope.pass = null;
  $scope.confirm = null;
  $scope.createMode = false;

  $scope.login = function(email, pass) {
    $scope.err = null;
    Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: true})
    .then(function(/* user */) {
      $location.path('/profile');
    }, function(err) {
      $scope.err = errMessage(err);
    });
  };

  $scope.createAccount = function() {
    $scope.err = null;
    if( assertValidAccountProps() ) {
      var email = $scope.email;
      var pass = $scope.pass;
        // create user credentials in Firebase auth system
        Auth.$createUser({email: email, password: pass})
        .then(function() {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({ email: email, password: pass });
          })
        .then(function(user) {
            // create a user profile in our data store
            var userRef = fbutil.ref('users', user.uid);
            createUserGameObject(user.uid);
            return fbutil.handler(function(cb) {
              userRef.set({email: email}, cb);
            });
          })
        .then(function(/* user */) {
            // redirect to the account page
            $location.path('/profile');
          }, function(err) {
            $scope.err = errMessage(err);
          });
      }
    };

    var createUserGameObject = function (userID) {
      var gameRef = fbutil.ref('game_db/user_games', userID);
      var baseGame = $firebaseObject(fbutil.ref('game_db/user_games/initial_user_game_setup'));
      baseGame.$loaded().then(function() {
        return fbutil.handler(function(cb) {
          var initialDateTime = new Date();
          gameRef.set({
            resources: baseGame.resources,
            last_saved_datetime: initialDateTime.getTime(),
            buildings: baseGame.buildings,
            business_contracts: baseGame.business_contracts,
            fleets: baseGame.fleets
          }, cb);
        });
      });
    };

    var assertValidAccountProps = function () {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass || !$scope.confirm ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !$scope.err;
    }

    var errMessage = function (err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }

  }]);
