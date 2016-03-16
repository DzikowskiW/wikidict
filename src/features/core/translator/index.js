import angular from 'angular';

import translationResultFetcher from './translationResultFetcher.factory';
import phraseRedirector from './phraseRedirector.factory';
import searchHintFetcher from './searchHintFetcher.factory';

export default angular.module('wikiDict.core.translator', [])
  .factory('phraseRedirector', phraseRedirector)
  .factory('searchHintFetcher', searchHintFetcher)
  .factory('translationResultFetcher', translationResultFetcher)
  .name;
