SearchResultsCtrl.$inject = ['$mdToast'];
export default function SearchResultsCtrl($mdToast) {
  const vm = this;
  vm.showCopyConfirmation = showCopyConfirmation;
  vm.state = 'loading'; // loading, notFound, ok
  init();

  // ----------
  function init() {
    console.log(vm);
    vm.state = 'loading';
    vm.resultsPromise
      .then(result => {
        if (result.translation.phrase) {
          vm.state = 'ok';
        } else {
          vm.state = 'notFound';
        }
        vm.result = result;
      })
      .catch( err => {
        vm.state = 'error';
      });
  }

  function showCopyConfirmation(phrase) {
    $mdToast.showSimple(`Copied: ${phrase}`);
  }
}
