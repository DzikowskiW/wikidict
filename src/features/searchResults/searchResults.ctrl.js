SearchResultsCtrl.$inject = ['$mdToast'];
export default function SearchResultsCtrl($mdToast) {
  const vm = this;
  vm.showCopyConfirmation = showCopyConfirmation;
  vm.getFlagIconClass = getFlagIconClass;
  vm.state = 'loading'; // loading, notFound, result, disambiguation
  init();

  // ----------
  function init() {
    vm.state = 'loading';
    vm.resultsPromise
      .then(result => {
        if (result.disambiguation) {
          vm.state = 'disambiguation';
        } else if (result.translation.phrase) {
          vm.state = 'result';
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

  function getFlagIconClass(langCode) {
    const code = langCode === 'en' ? 'gb' : langCode;
    return `flag-icon-${code}`;
  }
}
