SearchResultsCtrl.$inject = ['$mdToast'];
export default function SearchResultsCtrl($mdToast) {
  const vm = this;
  vm.showCopyConfirmation = showCopyConfirmation;

  init();

  // ----------
  function init() {
    vm.resultPromise.then(result => {
      vm.result = result;
    });
  }

  function showCopyConfirmation(phrase) {
    $mdToast.showSimple(`Copied: ${phrase}`);
  }
}
