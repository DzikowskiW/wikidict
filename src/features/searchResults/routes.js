routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('search.results', {
    url: '/:langFrom/:langTo/:phrase',
    parent: 'search',
    controller: searchResultsRouteCtrl,
    controllerAs: 'vm',
    template: '<wd-search-results phrase="vm.phrase" result="vm.result" flex></wd-search-results>',
  });
}

searchResultsRouteCtrl.$inject = ['$stateParams', 'searchStore', 'translator'];
function searchResultsRouteCtrl($stateParams, searchStore, translator) {
  searchStore.langFrom = $stateParams.langFrom;
  searchStore.langTo = $stateParams.langTo;
  this.phrase = $stateParams.phrase;
  this.result = translator.translate(
    $stateParams.langFrom,
    $stateParams.langTo,
    this.phrase);
}
