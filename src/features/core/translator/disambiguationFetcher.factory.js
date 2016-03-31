disambiguationFetcher.$inject = ['$http'];

export default function disambiguationFetcher($http) {
  return {
    similarTo,
  };

  function similarTo(lang, phrase){
    return $http({
      url: genrateUrl(lang),
      method: 'JSONP',
      params: {
        titles: phrase,
        action: 'query',
        prop: 'categories',
        generator: 'links',
        format: 'json',
        callback: 'JSON_CALLBACK',
      },
    });
  }

  function genrateUrl(lang) {
    return `https://${lang}.wikipedia.org/w/api.php`;
  }
}
