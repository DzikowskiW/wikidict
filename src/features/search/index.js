import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appCore from '../core';
import searchToolbar from '../searchToolbar';
import searchResults from '../searchResults';

import searchComponent from './search.component';
import routes from './routes';

export default angular.module('wikidict.search', [uiRouter, appCore, searchResults, searchToolbar])
  .component('wdSearch', searchComponent)
  .config(routes)
  .name;
