import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';
import appComponent from './app.component';
import coreView from '../features/coreView';

import '../style/app.css';
import 'angular-material/angular-material.css';
import 'angular-material/angular-material.layouts.css';

export default angular.module('app', [angularMaterial, coreView, uiRouter])
  .component('wdApp', appComponent)
  .value('$routerRootComponent', 'wdApp')
  .name;

