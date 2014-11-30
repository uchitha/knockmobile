(function () {

	angular.module('app')
			.controller('SaveKnock', SaveKnock);


	SaveKnock.$inject = ['$location','knockservice'];

	function SaveKnock($location, knockservice) {
		var vm = this;
		vm.rakeNumber = knockservice.getRake();
		vm.carList = [];
		vm.selectAllToggle = false; //UnSelect All to b checked

		vm.activate = activate;
		vm.selectAll = selectAll;

		activate();

		function activate() {
			$('#selectCarToggle').bootstrapToggle();
			$('#selectCarToggle').bootstrapToggle('off');

			knockservice.getCarsForRake(vm.rakeNumber).then(function (data) {
				vm.carList = data;
				var i = 0;
				vm.carList.forEach(function (c) {
						c.selected = true;
				});
			});
		}

		function selectAll() {
			vm.selectAllToggle = $("#selectCarToggle").prop('checked');

			if (vm.selectAllToggle) {
				vm.carList.forEach(function (c) {
					c.selected = true;
				});
			}else {
				vm.carList.forEach(function (c) {
					c.selected = false;
				});
			}
		}
	}

})();