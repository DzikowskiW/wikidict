SearchLanguageRouteCtrl.$inject = ['$stateParams', '$scope'];

export default function SearchLanguageRouteCtrl($stateParams, $scope) {
  $scope.Model.langFrom = $stateParams.langFrom;
  $scope.Model.langTo = $stateParams.langTo;
}