SearchCtrl.$inject = ['$scope', '$log', '$state', 'searchStore', 'translator'];

export default function SearchCtrl($scope, $log, $state, searchStore, translator) {
  const vm = this;
  vm.langTo = vm.langTo || '';
  vm.langFrom = vm.langFrom || '';
  vm.searchPhrase = vm.searchPhrase || '';
  vm.desc = '';

  // --------
  vm.autocomplete = autocomplete;
  vm.search = search;
  init();

  // --------
  function init() {
    $scope.$watch(() => searchStore.getPhrase(),
      (newVal) => {
        vm.searchPhrase = newVal;
        if (newVal && newVal.length){
          setDescription(vm.searchPhrase);
        }
      });
    if (vm.searchPhrase.length > 0) {
      setDescription(vm.searchPhrase);
    }
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
    setDescription(phrase, desc);
    if (phrase && phrase.length > 0) {
      $state.go('search.results', { phrase, langTo: vm.langTo, langFrom: vm.langFrom });
    }
  }

  function setDescription(phrase, desc) {
    if (!desc) {
      vm.desc = '';
      translator.autocomplete(vm.langFrom, phrase)
        .then((result) => {
          vm.desc = result[0].description;
        });
    } else {
      vm.desc = desc;
    }
  }
}
