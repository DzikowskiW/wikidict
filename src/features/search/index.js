import 'flag-icon-css/css/flag-icon.css';
import 'font-awesome/css/font-awesome.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './search.css';
import appCore from '../core';

import searchComponent from './search.component';
import routes from './routes';

export default angular.module('wikidict.search', [uiRouter, appCore])
  .component('wdSearch', searchComponent)
  .config(routes)
  .name;
