routes.$inject = ['$urlRouterProvider'];

export default function routes($urlRouterProvider) {
  $urlRouterProvider.when('', '/search');
}
