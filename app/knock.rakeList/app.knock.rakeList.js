(function () {

	angular.module('app')
			.controller('RakeList',RakeList);

	RakeList.$inject = ['$location','knockservice'];

	function RakeList($location, knockservice) {
		var vm = this;
		vm.showAllRakes = false;
		vm.rakeList = [];

		vm.activate = activate;
		vm.goToSaveKnock = goToSaveKnock;

		activate();

		function activate () {
			vm.currentTime = new Date();
			vm.rakeLocation = "Yard";

			//TODO Not ng style - this is jQuery
			$('#showAllRakesToggle').bootstrapToggle();
			$('#showAllRakesToggle').change(showRakeList);
			
			knockservice.getRakesAtYard().then(function (data) {
				vm.rakeList = data;
			})
			
		}

		function showRakeList () {
			// body...
		}

		function goToSaveKnock (rakeNumber) {
			console.log(rakeNumber);
			$location.path('/knockSave');
		}
	}

})();