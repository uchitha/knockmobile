(function () {

	angular.module('app')
			.factory('knockservice', knockservice);

	knockservice.$inject = ['$http','$filter'];

	function knockservice($http,$filter) {
		return {
			getAllRakes : getAllRakes,
			getRakesAtYard: getRakesAtYard,
			getCarsForRake: getCarsForRake,
            searchCar : searchCar
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

        function searchCar(searchText) {
            return $http.get('/app/data/carList.json')
                .then(function(response) { filterCar (response, searchText) });

            function filterCar(response,searchText) {
                var data = response.data.filter(function (element) {
                    return element.id === searchText;
                });
                return response.data;
            }
        }

	}

})();