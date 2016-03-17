searchHintFetcher.$inject = ['$http', 'wdOrigin'];

export default function searchHintFetcher($http, wdOrigin) {
  return {
    autocomplete,
  };
  // --------
  function autocomplete(lang, phrase){
    return $http({
      url: genrateUrl(lang),
      method: 'JSONP',
      params: {
        search: phrase,
        action: 'opensearch',
        limit: 10,
        namespace: 0,
        format: 'json',
        callback: 'JSON_CALLBACK',
      },
    });
  }

  function genrateUrl(lang) {
    return `https://${lang}.wikipedia.org/w/api.php`;
  }
}
