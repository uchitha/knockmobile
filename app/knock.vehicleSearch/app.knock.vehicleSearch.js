(function () {

	angular.module('app')
			.controller('VehicleSearch', VehicleSearch);

	VehicleSearch.$inject = ['$location','knockservice'];

	function VehicleSearch($location, knockservice)	{
		var vm = this;
		vm.searchText = '';
		vm.carsToKnock = [];
        vm.searchResults = [];

		vm.activate = activate;
        vm.searchCar = searchCar;

		activate();

		function activate() {

		}

        function searchCar() {
            knockservice.getCarsForRake(vm.searchText).then(function (data) {
                vm.searchResults = data.filter(function (e) {
                    return e.id === vm.searchText;
                });
                console.log(vm.searchResults);
            });
        }
	}

})();