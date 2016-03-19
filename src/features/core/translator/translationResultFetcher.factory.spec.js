/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import core from './index';

describe('App Core Module', function() {
  describe('Factory: translationResultFetcher', function() {
    let resultFetcher;

    // MOCKS
    const returnedValue = Symbol();
    const httpMock = sinon.stub().returns(returnedValue);

    // SETUP
    beforeEach(function() {
      angular.mock.module(core);

      angular.mock.module(function($provide) {
        $provide.value('$http', httpMock);
      });

      angular.mock.inject(function($injector) {
        resultFetcher = $injector.get('translationResultFetcher');
      });
    });

    // TESTS
    it('should be able to fetch jsonp translated results from wikipedia', function() {
      expect(resultFetcher).to.respondTo('translate');
    });

    it('should throw an exception if the phrase is null, number', function() {
      expect(() => resultFetcher.translate('PL', 'EN', null))
        .to.throw(/phrase/);
    });

    it('should throw an exception if the phrase is number', function() {
      expect(() => resultFetcher.translate('PL', 'EN', 12))
        .to.throw(/phrase/);
    });

    it('should throw an exception if the phrase is empty', function() {
      expect(() => resultFetcher.translate('PL', 'EN', ''))
        .to.throw(/phrase/);
    });

    it('should throw an exception if the language FROM is null', function() {
      expect(() => resultFetcher.translate(null, 'EN', 'pies'))
        .to.throw(/ from /);
    });

    it('should throw an exception if the language TO is null', function() {
      expect(() => resultFetcher.translate('PL', null, 'pies'))
        .to.throw(/ to /);
    });

    it('should return promise', function() {
      const result = resultFetcher.translate('PL', 'EN', 'pies');
      expect(result).to.equal(returnedValue);
    });
  });
});
