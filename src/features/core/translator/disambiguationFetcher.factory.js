disambiguationFetcher.$inject = ['$q', '$http'];

export default function disambiguationFetcher($q, $http) {
  return {
    similarTo,
  };

  function similarTo(lang, phrase){
    const deferred = $q.defer();
    $http({
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
    }).then((response) => {
      try {
        const convertedData = convertDisambiguationData(response.data);
        deferred.resolve(convertedData);
      } catch (e) {
        deferred.reject(e.message);
      }
    }, (...args) => {
      deferred.reject.apply(this, args);
    });
    return deferred.promise;
  }

  function genrateUrl(lang) {
    return `https://${lang}.wikipedia.org/w/api.php`;
  }

  function convertDisambiguationData(data) {
    return Object.keys(data.query.pages).map(pageKey => {
      return {
        title: data.query.pages[pageKey].title,
        pageId: data.query.pages[pageKey].pageid,
      };
    });
  }
}
