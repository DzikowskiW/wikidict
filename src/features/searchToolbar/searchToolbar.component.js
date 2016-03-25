import SearchToolbarCtrl from './searchToolbar.ctrl';

const searchToolbarComponent = {
  template: require('./searchToolbar.tmpl.html'),
  controller: SearchToolbarCtrl,
  controllerAs: 'vm',
  bindings: {
    langFrom: '<',
    langTo: '<',
    searchPhrase: '<',
  },
};

export default searchToolbarComponent;
