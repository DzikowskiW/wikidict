relatedPhrasesFetcher.$inject = ['$http', 'wdOrigin'];

export default function relatedPhrasesFetcher($http, wdOrigin) {
  return {
    relatedTo: fetchRelatedPhrases,
  };

  function fetchRelatedPhrases(lang, phrase) {
    return $http({
      url: genrateUrl(lang),
      method: 'JSONP',
      params: {
        titles: phrase,
        action: 'query',
        prop: 'redirects',
        format: 'json',
        callback: 'JSON_CALLBACK',
      },
    });
  }

  function genrateUrl(lang) {
    return `https://${lang}.wikipedia.org/w/api.php`;
  }
}
