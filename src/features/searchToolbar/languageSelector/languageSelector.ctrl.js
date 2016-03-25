LanguageSelectorCtrl.$inject = ['$scope'];

export default function LanguageSelectorCtrl($scope) {
  const vm = this;

  vm.switchLanguages = switchLanguages;
  initWatches();

  // --------------------
  function initWatches() {
    $scope.$watch(() => vm.langFrom,
      (newVal, oldVal) => {
        if (newVal === vm.langTo) {
          vm.langTo = oldVal;
        }
      }
    );

    $scope.$watch(() => vm.langTo,
      (newVal, oldVal) => {
        if (newVal === vm.langFrom) {
          vm.langFrom = oldVal;
        }
      }
    );
  }

  function switchLanguages() {
    [vm.langFrom, vm.langTo] = [vm.langTo, vm.langFrom];
  }
}
