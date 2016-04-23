blurAutocomplete.$inject = ['$timeout'];
export default function blurAutocomplete($timeout) {
  return function (scope, element) {
    element.bind('keydown keypress', event => {
      if (event.which === 13) {
        scope.$apply(() => {
          $timeout(() => {
            element.find('input').blur();
          });
        });
      }
    });
  };
}
