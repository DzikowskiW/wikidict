import './languageSelector.css';
import ctrl from './languageSelector.ctrl';

const languageSelector = {
  restrict: 'E',
  template: require('./languageSelector.html.twig.html'),
  bindings: {
    langFrom: '=',
    langTo: '=',
  },
  controller: ctrl,
  controllerAs: 'vm',
};

export default languageSelector;
