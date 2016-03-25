SearchRouteCtrl.$inject = ['$stateParams', 'searchStore'];

export default function SearchRouteCtrl($stateParams, searchStore) {
  const vm = this;
  vm.langFrom = $stateParams.langFrom;
  vm.langTo = $stateParams.langTo;
  searchStore.setLangFrom(vm.langFrom);
  searchStore.setLangTo(vm.langTo);
  vm.phrase = $stateParams.phrase || '';
}
