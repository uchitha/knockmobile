(function () {

	angular.module('app')
			.factory('knockservice', knockservice);

	knockservice.$inject = ['$http'];

	function knockservice($http) {
		return {
			getAllRakes : getAllRakes,
			getRakesAtYard: getRakesAtYard,
			getCarsForRake: getCarsForRake,
		};

		function getAllRakes() {
			return {
				error : "Not Implemented"
			}
		}

		function getRakesAtYard() {
			return $http.get('/app/data/rakeList.json')
						.then(getAllRakesComplete);

			function getAllRakesComplete(response) {
				return response.data;
			}
		}

		function getCarsForRake(rakeNumber) {
			return $http.get('/app/data/carList.json')
						.then(getAllCarsForRake);

			function getAllCarsForRake(response) {
				return response.data;
			}
		}

	}

})();