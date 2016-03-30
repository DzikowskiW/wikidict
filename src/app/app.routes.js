routes.$inject = ['$urlRouterProvider'];

export default function routes($urlRouterProvider) {
  $urlRouterProvider.when('', '/search/en/pl');
  $urlRouterProvider.when('/search', '/search/en/pl');
}
