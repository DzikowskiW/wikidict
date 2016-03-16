import angular from 'angular';
import translator from './translator';

import { translationUrl } from './params';
import searchStore from './searchStore.factory';

export default angular.module('wikiDict.core', [translator])
  .constant('translationUrl', translationUrl)
  .factory('searchStore', searchStore)
  .name;
