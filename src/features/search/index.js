import angular from 'angular';
import uiRouter from 'angular-ui-router';

import searchComponent from './search.component';
import routes from './routes';

export default angular.module('wikidict.search', [uiRouter])
  .component('wdSearch', searchComponent)
  .config(routes)
  .name;
