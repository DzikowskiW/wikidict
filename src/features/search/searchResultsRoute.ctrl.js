SearchResultsRouteCtrl.$inject = ['$stateParams', '$scope', 'translator'];

export default function SearchResultsRouteCtrl($stateParams, $scope, translator) {
  $scope.Model.phrase = $stateParams.phrase;
  $scope.Model.resultsPromise = ($scope.Model.phrase) ?
    translator.translate($scope.Model.langFrom, $scope.Model.langTo, $scope.Model.phrase) : null;
}
