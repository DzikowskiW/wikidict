/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import translatorModule from './index';

describe('App Translator Module', function() {
  describe('Factory: wikipediaTranslator', function() {
    // GLOBALS
    let $rootScope;

    // SETUP
    beforeEach(function () {
      angular.mock.module(translatorModule);
    });

    // TESTS
    it('autocomplete should return properly formatted result ', function (done) {
      const translator = setupHintFetcherMock(['mock',
        ['mockone'],
        ['mockone Description'],
        ['http://mockone.link'],
      ]);
      const promise = translator.autocomplete('en', 'mock');
      promise.then(response => {
        expect(response).to.deep.equal([{
          phrase: 'mockone',
          description: 'mockone Description',
          url: 'http://mockone.link',
        }]);
        done();
      });
      // to resolve $q.promises
      $rootScope.$digest();
    });

    it('autocomplete should handle invalid Open Search result', function (done) {
      const translator = setupHintFetcherMock(['invalid result']);
      const promise = translator.autocomplete('en', 'mock');
      promise.catch(() => {
        done();
      });
      // to resolve $q.promises
      $rootScope.$digest();
    });

    it('search should return properly formatted result ', function (done) {
      const translator = setupResultFetcherMock({
        query: {
          normalized: [{ from: 'dog', to: 'Dog' }],
          pages: {
            4269567: {
              pageid: 4269567,
              ns: 0,
              title: 'Dog',
              langlinks: [{ lang: 'pl', '*': 'Pies domowy' }],
            },
          },
        },
      });
      const promise = translator.translate('en', 'pl', 'dog');
      promise.then(response => {
        expect(response).to.deep.equal({
          original: {
            phrase: 'dog',
            normalized_phrase: 'Dog',
          },
          translation: {
            phrase: 'Pies domowy',
          },
        });
        done();
      });
      // to resolve $q.promises
      $rootScope.$digest();
    });

    // HELPERS
    function setupHintFetcherMock(returnedData) {
      let translatorService;
      const searchHintFetcherMock = {
        autocomplete: null,
      };
      angular.mock.module(function ($provide) {
        $provide.value('searchHintFetcher', searchHintFetcherMock);
      });

      angular.mock.inject(function ($injector, _$rootScope_, $q) {
        searchHintFetcherMock.autocomplete = function() {
          const deferred = $q.defer();
          deferred.resolve({ data: returnedData });
          return deferred.promise;
        };
        translatorService = $injector.get('translator');
        $rootScope = _$rootScope_;
      });
      return translatorService;
    }

    function setupResultFetcherMock(returnedData) {
      let translatorService;
      const resultFetcherMock = {
        translate: null,
      };
      angular.mock.module(function ($provide) {
        $provide.value('translationResultFetcher', resultFetcherMock);
      });

      angular.mock.inject(function ($injector, _$rootScope_, $q) {
        resultFetcherMock.translate = function() {
          const deferred = $q.defer();
          deferred.resolve({ data: returnedData });
          return deferred.promise;
        };
        translatorService = $injector.get('translator');
        $rootScope = _$rootScope_;
      });
      return translatorService;
    }
  });
});
