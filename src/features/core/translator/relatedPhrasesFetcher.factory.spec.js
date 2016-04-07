/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import translator from './index';

describe('App Translator Module: RelatedPhrasesFetcher', function() {
  let relatedFetcher;
  let $httpBackend;

  // SETUP
  beforeEach(function () {
    angular.mock.module(translator);

    angular.mock.inject(function ($injector) {
      relatedFetcher = $injector.get('relatedPhrasesFetcher');
      $httpBackend = $injector.get('$httpBackend');
    });
  });
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // TESTS
  it('should have a relatedTo method', function () {
    expect(relatedFetcher).to.respondTo('relatedTo');
  });

  it('relatedTo should successfully process correct input', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&format=json&prop=redirects&titles=phrase')
      .respond(200,{
        query: {
          pages: {
            123: {
              title: 'phrase',
              redirects: [
                { title: 'similar phrase' },
                { title: 'another similar phrase' },
                { title: 'sentence' },
              ],
            },
          },
        },
      });

    relatedFetcher
      .relatedTo('en', 'phrase')
      .then(result => {
        expect(result).to.deep.equal([
          { title: 'similar phrase' },
          { title: 'another similar phrase' },
          { title: 'sentence' },
        ]);
        done();
      });

    $httpBackend.flush();
  });

  it('relatedTo should reject invalid input', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&format=json&prop=redirects&titles=phrase')
      .respond(200, { query: '' });

    relatedFetcher
      .relatedTo('en', 'phrase')
      .catch(() => {
        done();
      });

    $httpBackend.flush();
  });

  it('relatedTo should handle server problems', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&format=json&prop=redirects&titles=phrase')
      .respond(500, '');

    relatedFetcher
      .relatedTo('en', 'phrase')
      .catch(() => {
        done();
      });

    $httpBackend.flush();
  });
});
