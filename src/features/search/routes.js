routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('search', {
    url: '/search',
    template: require('./route.search.tmpl.html'),
    controller: SearchRouteCtrl,
    controllerAs: 'vm',
  });

  $stateProvider.state('search.languages', {
    url: '/:langFrom/:langTo',
    template: require('./route.search.languages.html'),
    controller: SearchLanguageRouteCtrl,
    controllerAs: 'vm',
  });

  $stateProvider.state('search.languages.results', {
    url: '/:phrase',
    template: require('./route.search.languages.results.html'),
    controller: SearchResultsRouteCtrl,
    controllerAs: 'vm',
  });
}


SearchRouteCtrl.$inject = ['$scope'];
function SearchRouteCtrl($scope) {
  $scope.Model = {
    langFrom: '',
    langTo: '',
    phrase: '',
  };
}

SearchResultsRouteCtrl.$inject = ['$stateParams', '$scope', 'translator'];
function SearchResultsRouteCtrl($stateParams, $scope, translator) {
  $scope.Model.phrase = $stateParams.phrase;
  $scope.Model.resultsPromise = ($scope.Model.phrase) ?
    translator.translate($scope.Model.langFrom, $scope.Model.langTo, $scope.Model.phrase) : null;
}


SearchLanguageRouteCtrl.$inject = ['$stateParams', '$scope'];
function SearchLanguageRouteCtrl($stateParams, $scope) {
  $scope.Model.langFrom = $stateParams.langFrom;
  $scope.Model.langTo = $stateParams.langTo;
}
