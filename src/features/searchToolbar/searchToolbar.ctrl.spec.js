/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';

import searchToolbarModule from './index';

describe('Search Toolbar: SearchToolbarCtrl', function() {
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
});
