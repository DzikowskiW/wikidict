import angular from 'angular';

import homeComponent from './home/home.component';
import searchResults from './searchResults/searchResults.component';

export default angular.module('app.coreView', [])
  .component('appHome', homeComponent)
  .component('appSearchResults', searchResults)
  .name;
