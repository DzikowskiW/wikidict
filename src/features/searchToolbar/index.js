import 'flag-icon-css/css/flag-icon.css';
import 'font-awesome/css/font-awesome.css';
import angular from 'angular';
import mdAngular from 'angular-material';
import uiRouter from 'angular-ui-router';


import './search.css';
import appCore from '../core';

import languageSelector from './languageSelector/languageSelector.component';
import searchToolbarComponent from './searchToolbar.component';

export default angular.module('wikidict.searchToolbar', [mdAngular, appCore, uiRouter])
  .component('wdLanguageSelector', languageSelector)
  .component('wdSearchToolbar', searchToolbarComponent)
  .name;
