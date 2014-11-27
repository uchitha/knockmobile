(function() {

	angular.module('app')
			.controller('Knock',Knock);

	Knock.$inject = ['$location'];

	function Knock($location) {
		var vm = this;
		vm.activate = activate;
		vm.goToRakeList = goToRakeList;
		vm.goToVehicleSearch = goToVehicleSearch;

		activate();

		function activate () {
			// body...

		}

		function goToRakeList() {
			$location.path('/rakeList');
		}

		function goToVehicleSearch() {
			console.log('TO DO - Vehicle Search');
		}

	}

})();