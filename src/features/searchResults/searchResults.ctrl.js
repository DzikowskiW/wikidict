SearchResultsCtrl.$inject = [];
export default function SearchResultsCtrl() {
  const vm = this;
  init();

  // ----------
  function init() {
    vm.resultPromise.then(result => {
      vm.result = result;
    });
  }
};
