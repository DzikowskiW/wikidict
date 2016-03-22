import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngClipboard from 'ngclipboard';
import mdAngular from 'angular-material';

import searchResultsComponent from './searchResults.component';
import routes from './routes';

export default angular.module('wikidict.searchResults', [uiRouter, ngClipboard, mdAngular])
  .component('wdSearchResults', searchResultsComponent)
  .config(routes)
  .name;
