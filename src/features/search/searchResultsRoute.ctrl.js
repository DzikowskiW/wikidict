SearchResultsRouteCtrl.$inject = ['$stateParams', 'searchStore', 'translator'];

export default function SearchResultsRouteCtrl($stateParams, searchStore, translator) {
  const vm = this;
  vm.langFrom = searchStore.getLangFrom();
  vm.langTo = searchStore.getLangTo();
  vm.phrase = $stateParams.phrase;
  searchStore.setPhrase(vm.phrase);
  vm.resultsPromise = (vm.phrase) ? translator.translate(vm.langFrom, vm.langTo, vm.phrase) : null;
}
