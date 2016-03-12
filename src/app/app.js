import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';
import appComponent from './app.component';
import search from '../features/search';
import searchResults from '../features/searchResults';
import routes from './app.routes';
import theme from './material.theme';

import '../style/app.css';
import 'angular-material/angular-material.css';
import 'angular-material/angular-material.layouts.css';
//import 'font-awesome/css/font-awesome.css';

export default angular.module('app', [angularMaterial, uiRouter, search, searchResults])
  .component('wikiDict', appComponent)
  .config(routes)
  .config(theme)
  .name;

