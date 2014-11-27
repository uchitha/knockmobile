(function () {

	angular.module('app',['ngRoute','kendo.directives'])
			.config(config);

	function config($routeProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: 'app/knock/app.knock.html'
			})
			.when('/rakeList', {
				templateUrl: 'app/knock.rakeList/app.knock.rakeList.html'
			})
			.when('/knockSave', {
				templateUrl: 'app/knock.save/app.knock.save.html'
			})
			.otherwise({redirectTo: '/'})
	}


})();