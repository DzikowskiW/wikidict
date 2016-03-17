/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import translator from './index';

describe('App Translator Module', function() {
  describe('Factory: searchHintFetcher', function() {
    let hintFetcher;

    // MOCKS
    const promise = {
      then() {},
    };
    const httpMock = sinon.stub().returns(promise);

    // SETUP
    beforeEach(function () {
      angular.mock.module(translator);

      angular.mock.module(function ($provide) {
        $provide.value('$http', httpMock);
      });

      angular.mock.inject(function ($injector) {
        hintFetcher = $injector.get('searchHintFetcher');
      });
    });

    // TESTS
    it('should have an autocomplete method that returns promise', function () {
      expect(hintFetcher).to.respondTo('autocomplete');
    });

    it('utocomplete should return promise', function () {
      const response = hintFetcher.autocomplete('en', 'phrase');
      expect(response).to.respondTo('then');
    });
  });
});
