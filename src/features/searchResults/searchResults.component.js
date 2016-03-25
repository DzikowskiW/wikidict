import SearchResultsCtrl from './searchResults.ctrl';

const searchResultsComponent = {
  template: require('./searchResults.tmpl.html'),
  controller: SearchResultsCtrl,
  controllerAs: 'vm',
  bindings: {
    phrase: '<',
    resultsPromise: '<',
  },
};

export default searchResultsComponent;
