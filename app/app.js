(function () {

	angular.module('app',['ngRoute', 'ngAnimate','ui.bootstrap'])
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
			}).when('/carSearch', {
                templateUrl: 'app/knock.vehicleSearch/app.knock.vehicleSearch.html'
            })
			.otherwise({redirectTo: '/'})
	}


})();