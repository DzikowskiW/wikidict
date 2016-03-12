routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('search', {
    url: '/search',
    template: '<wd-search></wd-search>',
  });
}
