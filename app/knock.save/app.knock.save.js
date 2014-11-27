(function () {

	angular.module('app')
			.controller('SaveKnock', SaveKnock);


	SaveKnock.$inject = ['$location','knockservice'];

	function SaveKnock($location, knockservice) {
		var vm = this;
		vm.rakeNumber = 'M0324A';
		vm.carList = [];

		vm.activate = activate;
		vm.selectCar = selectCar;

		activate();

		function activate() {
			$('#selectCarToggle').bootstrapToggle();
			$('#selectCarToggle').bootstrapToggle('on')

			knockservice.getCarsForRake(vm.rakeNumber).then(function (data) {
				vm.carList = data;
			});
		}

		function selectCar(car) {
			console.log(this);
		}
	}

})();