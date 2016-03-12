routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('searchResults', {
    url: '/search/results',
    template: '<wd-search-results></wd-search-results>',
  });
}
