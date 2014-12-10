(function () {

	angular.module('app')
			.controller('VehicleSearch', VehicleSearch)
			.controller('Modal', Modal);

	VehicleSearch.$inject = ['$location', '$modal','knockservice'];
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

	function VehicleSearch($location, $modal, knockservice)	{
		var vm = this;
		vm.searchText = '';
		vm.carsToKnock = [];
        vm.searchResults = [];
        vm.noCars = false;

		vm.activate = activate;
        vm.searchCar = searchCar;
        vm.selectCar = selectCar;
        vm.unSelectCar = unSelectCar;
        vm.isNotAdded = isNotAdded;
        vm.saveCarKnock = saveCarKnock;

		activate();

		function activate() {

		}

        function searchCar() {
            knockservice.searchCar(vm.searchText).then(function (data) {
            	vm.searchResults = data;
            	if (vm.searchResults.length === 0) {
            		vm.noCars = true;
            	}else {
            		vm.noCars = false;
            	}
            });
        }

        function selectCar(id) {
        	var index = vm.carsToKnock.indexOf(id);
        	if (index === -1) {
        		vm.carsToKnock.push(id);
			}        	
        }

        function unSelectCar(id) {
        	var index = vm.carsToKnock.indexOf(id);
        	if (index > -1) {
        		vm.carsToKnock.splice(index,1);
        	}
        }

        function isNotAdded(id) {
        	var index = vm.carsToKnock.indexOf(id);
        	return index === -1;
        }

        function saveCarKnock() {
			//knockService.saveKnock(vm.rakeNumber, vm.carList.filter(function (car) { return car.selected;}));

			knockSucces();
			//knockFailed();

			function knockSucces() {
				var message = "Knock successfully saved for " + vm.carsToKnock.length + " car(s)"
				vm.knockResult = {
					success : true,
					title: "Success",
					message : message
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
				templateUrl: "carKnockSaveMessage.html",
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