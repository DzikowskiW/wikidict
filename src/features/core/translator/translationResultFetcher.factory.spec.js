/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import core from './index';

describe('App Core Module', function() {
  describe('Factory: translationResultFetcher', function() {
    let resultFetcher;
    let $httpBackend;

    // MOCKS
    const returnedValue = {
      query: {
        pages: {
          10628: {
            pageId: 10628,
            title: 'Pies domowy',
            extract: 'abc',
            fullurl: 'https://pl.wikipedia.org/wiki/Pies_domowy',
            langlinks: [{
              lang: 'fr',
              url: 'https://fr.wikipedia.org/wiki/Chien',
              langname: 'francuski',
              autonym: 'fran\u00e7ais',
              '*': 'Chien',
            }],
            thumbnail: {
              source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/200px-Collage_of_Nine_Dogs.jpg',
              width: 200,
              height: 176,
            },
          },
        },
      },
    };

    // SETUP
    beforeEach(function() {
      angular.mock.module(core);

      angular.mock.inject(function($injector) {
        resultFetcher = $injector.get('translationResultFetcher');
        $httpBackend = $injector.get('$httpBackend');
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
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

    it('translate should successfully process correct input', function (done) {
      $httpBackend
        .expectJSONP('https://pl.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&exintro=true&explaintext=true&format=json&inprop=url&lllang=fr&llprop=url%7Clangname%7Cautonym&pithumbsize=200&ppprop=disambiguation&prop=langlinks%7Cextracts%7Cpageimages%7Cinfo%7Ccategories%7Cpageprops&redirects=true&titles=pies')
        .respond(200, returnedValue);

      resultFetcher
        .translate('pl','fr', 'pies')
        .then(result => {
          expect(result).to.deep.equal({
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
          done();
        });

      $httpBackend.flush();
    });

    it('autocomplete should reject invalid input', function (done) {
      $httpBackend
        .expectJSONP('https://pl.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&exintro=true&explaintext=true&format=json&inprop=url&lllang=fr&llprop=url%7Clangname%7Cautonym&pithumbsize=200&ppprop=disambiguation&prop=langlinks%7Cextracts%7Cpageimages%7Cinfo%7Ccategories%7Cpageprops&redirects=true&titles=pies')
        .respond(200, { query: '' });

      resultFetcher
        .translate('pl','fr', 'pies')
        .catch(() => {
          done();
        });

      $httpBackend.flush();
    });

    it('autocomplete should handle server problems', function (done) {
      $httpBackend
        .expectJSONP('https://pl.wikipedia.org/w/api.php?action=query&callback=JSON_CALLBACK&exintro=true&explaintext=true&format=json&inprop=url&lllang=fr&llprop=url%7Clangname%7Cautonym&pithumbsize=200&ppprop=disambiguation&prop=langlinks%7Cextracts%7Cpageimages%7Cinfo%7Ccategories%7Cpageprops&redirects=true&titles=pies')
        .respond(500, '');

      resultFetcher
        .translate('pl', 'fr', 'pies')
        .catch(() => {
          done();
        });

      $httpBackend.flush();
    });
  });
});
