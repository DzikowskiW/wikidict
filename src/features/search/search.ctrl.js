SearchCtrl.$inject = ['$log', '$state', 'searchStore', 'translator'];

export default function SearchCtrl($log, $state, searchStore, translator) {
  const vm = this;
  vm.searchPhrase = '';
  vm.langFrom = searchStore.getLangFrom();
  vm.langTo = searchStore.getLangTo();
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
    vm.searchPhrase = phrase;
    if (phrase && phrase.length > 0) {
      $state.go('search.results', { phrase, langTo: vm.langTo, langFrom: vm.langFrom });
    }
  }
}
