import 'flag-icon-css/css/flag-icon.css';
import 'font-awesome/css/font-awesome.css';
import angular from 'angular';
import mdAngular from 'angular-material';


import './search.css';
import appCore from '../core';

import languageSelector from './languageSelector/languageSelector.directive';
import searchToolbarComponent from './searchToolbar.component';

export default angular.module('wikidict.searchTranslator', [mdAngular, appCore])
  .directive('wdLanguageSelector', languageSelector)
  .component('wdSearchToolbar', searchToolbarComponent)
  .name;
