theme.$inject = ['$mdThemingProvider'];

export default function theme($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('orange');
}
