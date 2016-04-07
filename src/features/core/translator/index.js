import angular from 'angular';
import config from '../../../config';

import relatedPhrasesFetcher from './relatedPhrasesFetcher.factory';
import translationResultFetcher from './translationResultFetcher.factory';
import searchHintFetcher from './searchHintFetcher.factory';
import disambiguationFetcher from './disambiguationFetcher.factory';
import translator from './wikipediaTranslator.factory';

export default angular.module('wikiDict.core.translator', [config])
  .factory('disambiguationFetcher', disambiguationFetcher)
  .factory('relatedPhrasesFetcher', relatedPhrasesFetcher)
  .factory('searchHintFetcher', searchHintFetcher)
  .factory('translationResultFetcher', translationResultFetcher)
  .factory('translator', translator)
  .name;
