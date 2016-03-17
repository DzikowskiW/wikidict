SearchCtrl.$inject = ['$log', 'searchStore', 'translator'];

export default function SearchCtrl($log, searchStore, translator) {
  const vm = this;
  vm.searchPhrase = '';
  vm.autocomplete = autocomplete;
  vm.search = search;
  // --------
  function autocomplete(phrase) {
    if (phrase && phrase.length > 2) {
      return translator.autocomplete(searchStore.getLangFrom(), phrase);
    }
  }

  function search(phrase) {
    console.log(phrase);
  }
}
