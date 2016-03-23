import 'flag-icon-css/css/flag-icon.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appCore from '../core';

import searchComponent from './search.component';
import routes from './routes';

export default angular.module('wikidict.search', [uiRouter, appCore])
  .component('wdSearch', searchComponent)
  .config(routes)
  .name;
