/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import translator from './index';

describe('App Translator Module: disambiguationFetcher', function() {
  let relatedFetcher;

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
      relatedFetcher = $injector.get('disambiguationFetcher');
    });
  });

  // TESTS
  it('should have a similarTo method', function () {
    expect(relatedFetcher).to.respondTo('similarTo');
  });

  it('similarTo should return promise', function () {
    const response = relatedFetcher.similarTo('en', 'phrase');
    expect(response).to.respondTo('then');
  });
});