var baseApp = angular.module('baseApp', ['ngRoute', 'login']);

baseApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'user/login/login.html',
		controller: 'loginController'
	});
});

