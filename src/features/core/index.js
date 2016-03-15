import angular from 'angular';

import { translationUrl } from './params';
import translationResultFetcher from './translationResultFetcher.factory';

export default angular.module('wikiDict.core', [])
  .constant('translationUrl', translationUrl)
  .factory('translationResultFetcher', translationResultFetcher)
  .name;
