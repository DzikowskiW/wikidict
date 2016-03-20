routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('search.results', {
    url: '/:phrase',
    parent: 'search',
    controller: searchResultsRouteCtrl,
    controllerAs: 'vm',
    template: '<wd-search-results phrase="vm.phrase" result="vm.result"></wd-search-results>',
  });
}

searchResultsRouteCtrl.$inject = ['$stateParams', 'searchStore', 'translator'];
function searchResultsRouteCtrl($stateParams, searchStore, translator) {
  this.phrase = $stateParams.phrase;
  this.result = translator.translate(searchStore.getLangFrom(),
    searchStore.getLangTo(),
    this.phrase);
}
