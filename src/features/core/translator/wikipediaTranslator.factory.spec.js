/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import translatorModule from './index';
import 'babel-polyfill';

describe('App Translator Module', function() {
  describe('Factory: wikipediaTranslator', function() {
    // GLOBALS
    let $rootScope;


    // SETUP
    beforeEach(function () {
      angular.mock.module(translatorModule);
    });

    // TESTS
    it('autocomplete should return result of relatedPhrasesFetcher', function () {
      const returnedValue = Symbol();
      let translator;

      angular.mock.module(function($provide) {
        $provide.value('searchHintFetcher', {
          autocomplete: () => returnedValue,
        });
      });

      angular.mock.inject(function($injector) {
        translator = $injector.get('translator');
      });

      expect(translator.autocomplete()).to.equal(returnedValue);
    });

    it('similarTo should return result of disambiguationFetcher', function () {
      const returnedValue = Symbol();
      let translator;

      angular.mock.module(function($provide) {
        $provide.value('disambiguationFetcher', {
          similarTo: () => returnedValue,
        });
      });

      angular.mock.inject(function($injector) {
        translator = $injector.get('translator');
      });

      expect(translator.similarTo()).to.equal(returnedValue);
    });

    xit('translate should fetch translation results', function(){});
    xit('translate should fetch quick summary of translated results', function(){});
    xit('translate should fetch related phrases of translated results', function(){});
    xit('translate should resolve disambiguation when it occurs', function(){});
    xit('translate should quietly fail when it is impossible to fetch summary', function(){});
    xit('translate should quietly fail when it is impossible to fetch related phrases', function(){});
    xit('translate should fail when it is impossible to fetch translation results', function(){});
    xit('translate should fail when it is impossible to fetch disambiguation results', function(){});
  });
});
