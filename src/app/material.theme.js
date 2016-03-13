theme.$inject = ['$mdThemingProvider'];

export default function theme($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
}
