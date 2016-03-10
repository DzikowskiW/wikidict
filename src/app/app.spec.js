import {expect} from 'chai';
import app from './app';

describe('app', function()  {

  describe('AppCtrl', function() {
    let ctrl;

    beforeEach(function() {
      angular.mock.module(app);

      angular.mock.inject(($controller) => {
        ctrl = $controller('AppCtrl', {});
      });
    });

    it('should contain the starter url', function() {
      expect(ctrl.url).to.equal('https://github.com/preboot/angular-webpack');
    });
  });
});