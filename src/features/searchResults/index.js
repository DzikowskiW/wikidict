import angular from 'angular';
import ngClipboard from 'ngclipboard';
import mdAngular from 'angular-material';

import searchResultsComponent from './searchResults.component';

export default angular.module('wikidict.searchResults', [ngClipboard, mdAngular])
  .component('wdSearchResults', searchResultsComponent)
  .name;
