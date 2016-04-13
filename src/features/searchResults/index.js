import './searchResults.css';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngClipboard from 'ngclipboard';
import mdAngular from 'angular-material';

import searchResultsComponent from './searchResults.component';

export default angular.module('wikidict.searchResults', [ngAnimate, ngClipboard, mdAngular])
  .component('wdSearchResults', searchResultsComponent)
  .name;
