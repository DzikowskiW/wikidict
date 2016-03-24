SearchCtrl.$inject = ['$log', '$state', 'searchStore', 'translator'];

export default function SearchCtrl($log, $state, searchStore, translator) {
  const vm = this;
  vm.searchPhrase = '';
  vm.langFrom = searchStore.getLangFrom();
  vm.langTo = searchStore.getLangTo();
  vm.desc = '';
  // --------
  vm.autocomplete = autocomplete;
  vm.search = search;
  // --------
  function autocomplete(phrase) {
    console.log('autocompleting '+phrase);
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
