import SearchRouteCtrl from './searchRoute.ctrl';
import SearchResultsRouteCtrl from './searchResultsRoute.ctrl';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('search', {
    url: '/search/:langFrom/:langTo',
    template: require('./search.tmpl.html'),
    controller: SearchRouteCtrl,
    controllerAs: 'vm',
  });

  $stateProvider.state('search.results', {
    url: '/:phrase',
    views: {
      main: {
        template: require('./search.results.tmpl.html'),
        controller: SearchResultsRouteCtrl,
        controllerAs: 'vm',
      },
    },
  });
}
