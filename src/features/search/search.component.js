const searchComponent = {
  template: require('./search.tmpl.html'),
  bindings: {
    langFrom: '<',
    langTo: '<',
    searchPhrase: '<',
    searchResultsPromise: '<',
  },
  controllerAs: 'vm',
};

export default searchComponent;
