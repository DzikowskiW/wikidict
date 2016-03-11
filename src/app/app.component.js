import AppCtrl from './app.ctrl';

const appComponent = {
  template: require('./app.tmpl.html'),
  controller: AppCtrl,
  controllerAs: 'vm',
  $routeConfig: [
    { path: '/home/...', name: 'Home', component: 'appHome', useAsDefault: true },
    { path: '/search/...', name: 'SearchResults', component: 'appSearchResults' },
  ],
};

export default appComponent;
