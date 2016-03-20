import SearchResultsCtrl from './searchResults.ctrl';

const searchResultsComponent = {
  template: require('./searchResults.tmpl.html'),
  controller: SearchResultsCtrl,
  controllerAs: 'vm',
  bindings: {
    phrase: '<',
    resultPromise: '<result',
  },
};

export default searchResultsComponent;
