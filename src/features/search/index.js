import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appCore from '../core';
import searchToolbar from '../searchToolbar';
import searchResults from '../searchResults';

import routes from './routes';

export default angular.module('wikidict.search', [uiRouter, appCore, searchResults, searchToolbar])
  .config(routes)
  .name;
