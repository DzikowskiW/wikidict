/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';
import translatorModule from './index';

describe('App Translator Module', function() {
  describe('Factory: wikipediaTranslator', function() {
    let translator;

    // MOCKS
    const promise = {
      then() {},
    };
    const httpMock = sinon.stub().returns(promise);

    // SETUP
    beforeEach(function () {
      angular.mock.module(translatorModule);

      angular.mock.module(function ($provide) {
        $provide.value('$http', httpMock);
      });

      angular.mock.inject(function ($injector) {
        translator = $injector.get('translator');
      });
    });

    // TESTS
    it('should have an autocomplete method', function () {
      expect(translator).to.respondTo('autocomplete');
    });

    it('autocomplete should return promise', function () {
      const response = translator.autocomplete('en', 'phrase');
      expect(response).to.respondTo('then');
    });
  });
});
