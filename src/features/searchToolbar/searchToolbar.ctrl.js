SearchCtrl.$inject = ['$scope', '$log', '$state', 'searchStore', 'translator'];

export default function SearchCtrl($scope, $log, $state, searchStore, translator) {
  const vm = this;
   vm.langTo = vm.langTo || '';
   vm.langFrom = vm.langFrom || '';
   vm.searchPhrase = vm.langSearch || '';
  vm.desc = '';
  // --------
  vm.autocomplete = autocomplete;
  vm.search = search;
  init();

  // --------
  function init() {
    $scope.$watch(
      () => vm.searchPhrase,
      newVal => {
        if (newVal) {
          vm.searchPhrase = newVal;
        }
      });
  }

  function autocomplete(phrase) {
    if (!phrase || phrase.length <= 2) {
      return null;
    }
    return translator.autocomplete(vm.langFrom, phrase);
  }

  function search(phrase, desc) {
    if (!phrase) {
      return;
    }
    vm.searchPhrase = phrase;
    if (phrase && phrase.length > 0) {
      $state.go('search.languages.results', { phrase, langTo: vm.langTo, langFrom: vm.langFrom });
    }
  }
}
