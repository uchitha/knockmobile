(function () {

	angular.module('app')
			.controller('SaveKnock', SaveKnock)
			.controller('Modal', Modal);


	SaveKnock.$inject = ['$location','$modal','knockservice'];
	Modal.$inject = ['$location', '$modalInstance', 'result'];

	function Modal($location, $modalInstance, result) {
		var vm = this;
		vm.knockResult = result;
		vm.goToMainPage = goToMainPage;

		function goToMainPage() {
			$modalInstance.close('close');
			if (vm.knockResult.success) {
				$location.path('/');
			}
		}
	}

	function SaveKnock($location, $modal, knockservice) {
		var vm = this;
		vm.rakeNumber = knockservice.getRake();
		vm.carList = [];
		vm.selectAllToggle = false; //UnSelect All to b checked
		vm.showMsgWindow = false;
		vm.knockResult = null;

		vm.activate = activate;
		vm.selectAll = selectAll;
		vm.saveKnock = saveKnock;

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

		function saveKnock() {
			//knockService.saveKnock(vm.rakeNumber, vm.carList.filter(function (car) { return car.selected;}));

			knockSucces();
			//knockFailed();

			function knockSucces() {
				vm.knockResult = {
					success : true,
					title: "Success",
					message : "Knock successfully saved for rake " + vm.rakeNumber
				}
				showWindow();
			}

			function knockFailed() {
				vm.knockResult = {
					success : false,
					title: "Failure",
					message : "Knock save failed. Please try again."
				}
				showWindow();
			}
		}

		function showWindow() {
			vm.modalInstance = $modal.open( {
				templateUrl: "knockSaveMessage.html",
				controller: "Modal as vm",
				resolve: {
					result: function () {
						return vm.knockResult;
					}
				}
			});
		}
		
	}

})();