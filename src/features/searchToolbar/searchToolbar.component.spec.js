/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import sinon from 'sinon';

import searchToolbarModule from './index';

describe('Search Toolbar Component', function() {
  // MOCKS AND GLOBALS
  let searchCtrl;

  // SETUP
  beforeEach(() => {
    angular.mock.module(searchToolbarModule);
    angular.mock.inject(($componentController, $rootScope) => {
      searchCtrl = $componentController('wdSearchToolbar', { $scope: $rootScope.$new() });
    });
  });

  // TESTS
  it('should provide autocomplete method for search phrase hints', function() {
    expect(searchCtrl).to.respondTo('autocomplete');
  });

  it('autocomplete should return null when phrase.length < 3 ', function() {
    expect(searchCtrl.autocomplete()).to.be.null;
  });

  it('autocomplete should return translator\'s autocomplete result when phrase.length >= 3 ', function() {
    const returnValue = Symbol();
    angular.mock.inject(($injector) => {
      const translator = $injector.get('translator');
      translator.autocomplete = () => returnValue;
    });
    expect(searchCtrl.autocomplete('test')).to.equal(returnValue);
  });

  it('should provide search method', function() {
    expect(searchCtrl).to.respondTo('search');
  });

  it('search should return null for empty phrase', function() {
    expect(searchCtrl.search('')).to.be.null;
  });

  it('search should change routing state to fetch results', function() {
    let stateGoSpy = null;
    angular.mock.inject($injector => {
      const $state = $injector.get('$state');
      stateGoSpy = sinon.stub($state, 'go');
    });
    searchCtrl.search('test');
    expect(stateGoSpy.calledOnce).to.be.true;
    expect(stateGoSpy.getCall(0).args[0]).to.equal('search.languages.results');
    expect(stateGoSpy.getCall(0).args[1].phrase).to.equal('test');
  });
});
