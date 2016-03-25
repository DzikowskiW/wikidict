import './languageSelector.css';
import ctrl from './languageSelector.ctrl';

export default function languageSelector() {
  return {
    restrict: 'E',
    template: require('./languageSelector.html.twig.html'),
    scope: {
      langFrom: '=',
      langTo: '=',
    },
    bindToController: true,
    controller: ctrl,
    controllerAs: 'vm',
  };
}
