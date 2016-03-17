import angular from 'angular';

export default angular.module('wikiDict.config', [])
  .constant('wdOrigin', 'http://localhost:8080')
  .name;
