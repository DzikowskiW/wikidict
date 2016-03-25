/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';

import searchModule from './index';

describe('Search: SearchCtrl', function() {
  // MOCKS AND GLOBALS
  let searchCtrl;

  // SETUP
  beforeEach(() => {
    angular.mock.module(searchModule);
    angular.mock.inject(($injector, $componentController, $rootScope) => {
      searchCtrl = $componentController('wdSearch', { $scope: $rootScope.$new() });
    });

  });

  // TESTS
  it('should provide autocomplete method for search phrase hints', function() {
    expect(searchCtrl).to.respondTo('autocomplete');
  });
});
