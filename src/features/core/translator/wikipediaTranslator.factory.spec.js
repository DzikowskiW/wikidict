/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import translatorModule from './index';
import 'babel-polyfill';
import sinon from 'sinon';

describe('App Translator Module', function() {
  describe('Factory: wikipediaTranslator', function() {
    // GLOBALS
    let $rootScope;


    // SETUP
    beforeEach(function () {
      angular.mock.module(translatorModule);
      $rootScope = null;
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

    it('translate should fetch translation results', function(done){
      angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
      });
      const translator = mockTranslate();
      translator
        .translate('pl', 'fr', 'pies')
        .then((data) => {
          expect(data).to.deep.equal({
            original: {
              phrase: 'pies',
              summary: 'Pies Description',
              normalized_phrase: 'Pies domowy',
              langcode: 'pl',
              desc: 'abc',
              url: 'https://pl.wikipedia.org/wiki/Pies_domowy',
              thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/200px-Collage_of_Nine_Dogs.jpg',
            },
            translation: {
              phrase: 'Chien',
              langname: 'francuski',
              langcode: 'fr',
              url: 'https://fr.wikipedia.org/wiki/Chien',
              autonym: 'fran\u00e7ais',
              related: [
                { title: 'similar phrase' },
                { title: 'another similar phrase' },
              ],
            },
          });
          done();
        });
      $rootScope.$apply();
    });

    it('translate should resolve disambiguation when it occurs', function(done) {
      let translator;
      angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        mockTranslate();

        const resultFetcher = $injector.get('translationResultFetcher');
        const $q = $injector.get('$q');
        resultFetcher.translate = () => {
          return $q.when({
            original: {
              phrase: 'pies1',
              normalized_phrase: 'Pies domowy',
              langcode: 'pl',
            },
            disambiguation: true,
          });
        };

        translator = $injector.get('translator');
      });

      translator
        .translate('pl', 'fr', 'pies')
        .then((data) => {
          expect(data.disambiguation).to.deep.equal([
            {
              title: 'test one',
              pageId: 1,
            },
            {
              title: 'test two',
              pageId: 22134,
            },
            {
              title: 'test three',
              pageId: 55132,
            },
          ]);
          done();
        });
      $rootScope.$apply();
    });

    it('translate should quietly fail when it is impossible to fetch summary', function(done){
      let translator;
      angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        const $q = $injector.get('$q');
        mockTranslate();

        const hintFetcher = $injector.get('searchHintFetcher');
        hintFetcher.autocomplete = () => {
          let deferred = $q.defer();
          deferred.reject();
          return deferred.promise;
        };

        translator = $injector.get('translator');
      });

      translator
        .translate('pl', 'fr', 'piesy')
        .then((data) => {
          expect(data.original.summary).to.equal(null);
          done();
        });
      $rootScope.$apply();
    });

    it('translate should quietly fail when it is impossible to fetch related phrases', function(done) {
      let translator;
      angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        const $q = $injector.get('$q');
        mockTranslate();

        const relatedPhrasesFetcher = $injector.get('relatedPhrasesFetcher');
        relatedPhrasesFetcher.relatedTo = () => {
          let deferred = $q.defer();
          deferred.reject();
          return deferred.promise;
        };

        translator = $injector.get('translator');
      });

      translator
        .translate('pl', 'fr', 'pies')
        .then((data) => {
          expect(data.translation.related).to.deep.equal([]);
          done();
        });
      $rootScope.$apply();
    });

    it('translate should fail when it is impossible to fetch translation results', function(done) {
      let translator;
      angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        const $q = $injector.get('$q');
        mockTranslate();

        const resultFetcher = $injector.get('translationResultFetcher');
        resultFetcher.translate = () => {
          let deferred = $q.defer();
          deferred.reject();
          return deferred.promise;
        };

        translator = $injector.get('translator');
      });

      translator
        .translate('pl', 'fr', 'pies')
        .catch(() => {
          done();
        });
      $rootScope.$apply();
    });

    it('translate should fail when it is impossible to fetch disambiguation results', function(done) {
      let translator;
      angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        const $q = $injector.get('$q');
        mockTranslate();

        const resultFetcher = $injector.get('translationResultFetcher');
        resultFetcher.translate = () => {
          return $q.when({
            original: {
              phrase: 'pies',
              normalized_phrase: 'Pies domowy',
              langcode: 'pl',
            },
            disambiguation: true,
          });
        };

        const disambiguationFetcher = $injector.get('disambiguationFetcher');
        disambiguationFetcher.similarTo = () => {
          let deferred = $q.defer();
          deferred.reject();
          return deferred.promise;
        };

        translator = $injector.get('translator');
      });

      translator
        .translate('pl', 'fr', 'pies')
        .catch(() => {
          done();
        });
      $rootScope.$apply();
    });

    // HELPERS
    function mockTranslate() {
      let translator;
      angular.mock.inject(function($injector) {
        const $q = $injector.get('$q');
        const resultFetcher = $injector.get('translationResultFetcher');
        resultFetcher.translate = () => {
          return $q.when({
            original: {
              phrase: 'pies',
              normalized_phrase: 'Pies domowy',
              langcode: 'pl',
              desc: 'abc',
              url: 'https://pl.wikipedia.org/wiki/Pies_domowy',
              thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/200px-Collage_of_Nine_Dogs.jpg',
            },
            translation: {
              phrase: 'Chien',
              langname: 'francuski',
              langcode: 'fr',
              url: 'https://fr.wikipedia.org/wiki/Chien',
              autonym: 'fran\u00e7ais',
            },
          });
        };

        const hintFetcher = $injector.get('searchHintFetcher');
        sinon.stub(hintFetcher, 'autocomplete', () => {
          return $q.when([{
            phrase: 'pies',
            description: 'Pies Description',
            url: 'http://pies.link' }]);
        });

        const relatedPhrasesFetcher = $injector.get('relatedPhrasesFetcher');
        sinon.stub(relatedPhrasesFetcher, 'relatedTo', () => {
          return $q.when([
            { title: 'similar phrase' },
            { title: 'another similar phrase' },
          ]);
        });

        const disambiguationFetcher = $injector.get('disambiguationFetcher');
        sinon.stub(disambiguationFetcher, 'similarTo', () => {
          return $q.when([
            {
              title: 'test one',
              pageId: 1,
            },
            {
              title: 'test two',
              pageId: 22134,
            },
            {
              title: 'test three',
              pageId: 55132,
            },
          ]);
        });
        translator = $injector.get('translator');
      });

      return translator;
    }
  });
});
