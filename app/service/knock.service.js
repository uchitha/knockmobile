(function () {

	angular.module('app')
			.factory('knockservice', knockservice);

	knockservice.$inject = ['$http','$filter'];

	function knockservice($http,$filter) {
		return {
			setRake : setRake,
			getRake : getRake,
			getAllRakes : getAllRakes,
			getRakesAtYard: getRakesAtYard,
			getCarsForRake: getCarsForRake,
            searchCar : searchCar
		};

		var _rakeNumber = '';

		function setRake(rakeNumber) {
			_rakeNumber = rakeNumber;
		}

		function getRake() {
			return _rakeNumber;
		}

		function getAllRakes() {
			return $http.get('/app/data/rakeList.json')
						.then(getAllRakesComplete);

			function getAllRakesComplete(response) {
				return response.data;
			}
		}

		function getRakesAtYard() {
			return $http.get('/app/data/rakeList.json')
						.then(getYardRakesComplete);

			function getYardRakesComplete(response) {
				var data = response.data.filter(function (e) {
					return (e.location === "yard");
				});
				return data;
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
            var searchCarPromise = $http.get('/app/data/carList.json')
                .then(function(response) {
                	var results = response.data.filter(function (element) {
                        	return element.id === searchText;
                	});
                	var anyCar = response.data[getRandomInt(0,10)];
                	anyCar.id = searchText;
                	var results = [];
                	results.push(anyCar);
                	return results;
                });

            return searchCarPromise;
        }

        function getRandom(min, max) {
  			return Math.random() * (max - min) + min;
		}

		function getRandomInt(min, max) {
  			return Math.floor(Math.random() * (max - min)) + min;
		}

	}

})();