import SearchRouteCtrl from './searchRoute.ctrl';
import SearchResultsRouteCtrl from './searchResultsRoute.ctrl';
import SearchLanguageRouteCtrl from './searchLanguageRoute.ctrl';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('search', {
    url: '/search',
    template: require('./search.tmpl.html'),
    controller: SearchRouteCtrl,
    controllerAs: 'vm',
  });

  $stateProvider.state('search.languages', {
    url: '/:langFrom/:langTo',
    template: `<ui-view
      layout="row"
      layout-align="center"
      layout-padding
      layout-wrap
      layout-fill></ui-view>`,
    controller: SearchLanguageRouteCtrl,
    controllerAs: 'vm',
  });

  $stateProvider.state('search.languages.results', {
    url: '/:phrase',
    template: require('./search.results.tmpl.html'),
    controller: SearchResultsRouteCtrl,
    controllerAs: 'vm',
  });
}
