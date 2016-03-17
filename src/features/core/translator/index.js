import angular from 'angular';
import config from '../../../config';

import translationResultFetcher from './translationResultFetcher.factory';
import phraseRedirector from './phraseRedirector.factory';
import searchHintFetcher from './searchHintFetcher.factory';
import translator from './wikipediaTranslator.factory';

export default angular.module('wikiDict.core.translator', [config])
  .factory('phraseRedirector', phraseRedirector)
  .factory('searchHintFetcher', searchHintFetcher)
  .factory('translationResultFetcher', translationResultFetcher)
  .factory('translator', translator)
  .name;
