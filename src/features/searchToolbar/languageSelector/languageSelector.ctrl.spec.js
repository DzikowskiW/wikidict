/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import searchToolbarModule from './../index';

describe('Search Toolbar: LanguageSelector Controller', function() {
  let languageSelectorCtrl;
  let $scope;

  beforeEach(() => {
    angular.mock.module(searchToolbarModule);
    angular.mock.inject(($componentController, $rootScope) => {
      $scope = $rootScope.$new();
      languageSelectorCtrl = $componentController('wdLanguageSelector',
        { $scope: $scope },
        { langFrom: 'pl', langTo: 'en' });
    });
  });

  it('should return correct languages', function() {
    expect(languageSelectorCtrl.langFrom).to.equal('pl');
    expect(languageSelectorCtrl.langTo).to.equal('en');
  });

  it('should automatically switch languages if the language is already set in an oposite field',
    function() {
      $scope.$digest();
      languageSelectorCtrl.langFrom = 'en';
      $scope.$digest();
      expect(languageSelectorCtrl.langFrom).to.equal('en');
      expect(languageSelectorCtrl.langTo).to.equal('pl');
    });

  it('should have an ability to switch languages', function() {
    languageSelectorCtrl.switchLanguages();
    expect(languageSelectorCtrl.langFrom).to.equal('en');
    expect(languageSelectorCtrl.langTo).to.equal('pl');
  });

});
