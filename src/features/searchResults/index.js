import angular from 'angular';
import uiRouter from 'angular-ui-router';

import searchResultsComponent from './searchResults.component';
import routes from './routes';

export default angular.module('wikidict.searchResults', [uiRouter])
  .component('wdSearchResults', searchResultsComponent)
  .config(routes)
  .name;
