/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import core from './index';

describe('App Core Module', function() {
  describe('Factory: translationResultFetcher', function() {
    let resultFetcher;

    beforeEach(function() {
      angular.mock.module(core);

      const httpMock = {
        jsonp: sinon.spy(),
      };
      const urlMock = 'https://example.url';

      angular.mock.module(function($provide) {
        $provide.value('$http', httpMock);
        $provide.value('translationUrl', urlMock);
      });

      angular.mock.inject(function($injector) {
        resultFetcher = $injector.get('translationResultFetcher');
      });
    });


    it('should be able to fetch jsonp translated results from wikipedia', function() {
      expect(resultFetcher).to.respondTo('translate');
    });

    it('should throw an exception if the phrase is null', function() {
      expect(resultFetcher.translate(null, 'PL', 'EN')).to.throw('Missing phrase');
    });

    xit('should throw an exception if the language FROM is null', function() {
    });

    xit('should throw an exception if the language TO is null', function() {
    });
  });
});
