/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import translator from './index';

describe('App Translator Module: searchHintFetcher', function() {
  let hintFetcher;
  let $httpBackend;

  // SETUP
  beforeEach(function() {
    angular.mock.module(translator);

    angular.mock.inject(function ($injector) {
      hintFetcher = $injector.get('searchHintFetcher');
      $httpBackend = $injector.get('$httpBackend');
    });
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // TESTS
  it('should have an autocomplete method that returns promise', function () {
    expect(hintFetcher).to.respondTo('autocomplete');
  });

  it('autocomplete should successfully process OpenSearch input', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=opensearch&callback=JSON_CALLBACK&format=json&limit=10&namespace=0&search=phrase')
      .respond(200, ['phrase',
        ['phraseone', 'phrasetwo'],
        ['Phrase One Description', 'Phrase Two Desc'],
        ['http://phraseone.link', 'http://phrasetwo.link'],
      ]);

    hintFetcher
      .autocomplete('en', 'phrase')
      .then(result => {
        expect(result).to.deep.equal([
          { phrase: 'phraseone',
            description: 'Phrase One Description',
            url: 'http://phraseone.link' },
          { phrase: 'phrasetwo',
            description: 'Phrase Two Desc',
            url: 'http://phrasetwo.link' },
        ]);
        done();
      });

    $httpBackend.flush();
  });

  it('autocomplete should reject invalid input', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=opensearch&callback=JSON_CALLBACK&format=json&limit=10&namespace=0&search=phrase')
      .respond(200, { query: '' });

    hintFetcher
      .autocomplete('en', 'phrase')
      .catch(() => {
        done();
      });

    $httpBackend.flush();
  });

  it('autocomplete should handle server problems', function (done) {
    $httpBackend
      .expectJSONP('https://en.wikipedia.org/w/api.php?action=opensearch&callback=JSON_CALLBACK&format=json&limit=10&namespace=0&search=phrase')
      .respond(500, '');

    hintFetcher
      .autocomplete('en', 'phrase')
      .catch(() => {
        done();
      });

    $httpBackend.flush();
  });
});
