/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import translator from './index';

describe('App Translator Module: RelatedPhrasesFetcher', function() {
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
      relatedFetcher = $injector.get('relatedPhrasesFetcher');
    });
  });

  // TESTS
  it('should have a relatedTo method', function () {
    expect(relatedFetcher).to.respondTo('relatedTo');
  });

  it('relatedTo should return promise', function () {
    const response = relatedFetcher.relatedTo('en', 'phrase');
    expect(response).to.respondTo('then');
  });
});