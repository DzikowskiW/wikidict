/* eslint prefer-arrow-callback: 0, func-names: 0, space-before-function-paren: 0 */
/* global angular */

import { expect } from 'chai';
import app from './app';

describe('App Module', function() {
  describe('Component: app', function() {
    let ctrl;
    beforeEach(function() {
      angular.mock.module(app);
      angular.mock.inject(function($rootScope, _$componentController_) {
        ctrl = _$componentController_('wikiDict', { $scope: $rootScope.$new() });
      });
    });

    it('should contain the starter url', function() {
    });
  });
});
