const searchToolbarComponent = {
  template: require('./searchToolbar.tmpl.html'),
  controller: SearchToolbarCtrl,
  controllerAs: 'vm',
  bindings: {
    langFrom: '<',
    langTo: '<',
    searchPhrase: '<',
  },
};

export default searchToolbarComponent;

SearchToolbarCtrl.$inject = ['$scope', '$state', 'translator'];
function SearchToolbarCtrl($scope, $state, translator) {
  const vm = this;
  vm.langTo = vm.langTo || '';
  vm.langFrom = vm.langFrom || '';
  vm.searchPhrase = vm.langSearch || '';
  vm.desc = '';

  // --------
  vm.autocomplete = autocomplete;
  vm.search = search;

  // --------
  function autocomplete(phrase) {
    if (!phrase || phrase.length <= 2) {
      return null;
    }
    return translator.autocomplete(vm.langFrom, phrase);
  }

  function search(phrase) {
    if (!phrase) {
      return null;
    }
    vm.searchPhrase = phrase;
    if (phrase && phrase.length > 0) {
      $state.go('search.languages.results', { phrase, langTo: vm.langTo, langFrom: vm.langFrom });
    }
  }
}
