SearchRouteCtrl.$inject = ['$scope'];

export default function SearchRouteCtrl($scope) {
  $scope.Model = {
    langFrom: '',
    langTo: '',
    phrase: '',
  };
}
