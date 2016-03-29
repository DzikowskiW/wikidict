/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import searchToolbarModule from './../index';

describe('SearchToolbar: languageSelector directive', function() {
  let element, scope;

  beforeEach(() => {
    angular.mock.module(searchToolbarModule);
    angular.mock.inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      scope.langFrom = 'pl';
      scope.langTo = 'en';
      element = angular.element('<wd-language-selector lang-from="langFrom" lang-to="langTo"></wd-language-selector>');
      $compile(element)(scope);
    });
  });

  it ('should bind to correct params', function(){
    const ctrl = element.controller('wdLanguageSelector');
    expect(scope.langFrom).to.equal(ctrl.langFrom);
    expect(scope.langTo).to.equal(ctrl.langTo);
  });
});
