/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import translator from './index';

describe('App Translator Module: disambiguationFetcher', function() {
  let disambiguationFetcher;
  let $httpBackend;

  // SETUP
  beforeEach(function() {
    angular.mock.module(translator);

    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      disambiguationFetcher = $injector.get('disambiguationFetcher');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // TESTS
  it('should have a similarTo method', function () {
    expect(disambiguationFetcher).to.respondTo('similarTo');
  });

  it('similarTo should successfully process correct input', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&format=json&generator=links&prop=categories&titles=test')
      .respond({
        query: {
          pages: {
            1: {
              pageid: 1,
              title: 'test one',
            },
            22134: {
              pageid: 22134,
              title: 'test two',
            },
            55132: {
              pageid: 55132,
              title: 'test three',
            },
          },
        },
      });
    const promise = disambiguationFetcher.similarTo('en', 'test');
    promise.then(resultData => {
      expect(resultData).to.deep.equal([
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
    $httpBackend.flush();
  });

  it('similarTo should reject invalid input', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&format=json&generator=links&prop=categories&titles=test')
      .respond(200, { query: '' });
    const promise = disambiguationFetcher.similarTo('en', 'test');
    promise.catch(() => {
      done();
    });
    $httpBackend.flush();
  });

  it('similarTo should graceful handle server outage', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&format=json&generator=links&prop=categories&titles=test')
      .respond(500, '');
    const promise = disambiguationFetcher.similarTo('en', 'test');
    promise.catch(() => {
      done();
    });
    $httpBackend.flush();
  });
});
