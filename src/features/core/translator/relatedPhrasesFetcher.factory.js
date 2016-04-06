relatedPhrasesFetcher.$inject = ['$q', '$http'];

export default function relatedPhrasesFetcher($q, $http) {
  return {
    relatedTo: fetchRelatedPhrases,
  };

  function fetchRelatedPhrases(lang, phrase) {
    const deferred = $q.defer();
    $http({
      url: genrateUrl(lang),
      method: 'JSONP',
      params: {
        titles: phrase,
        action: 'query',
        prop: 'redirects',
        format: 'json',
        callback: 'JSON_CALLBACK',
      },
    }).then((response) => {
      try {
        const convertedData = convertRelatedData(response.data);
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

  function convertRelatedData(data) {
    let result = [];
    if (data && data.query && data.query.pages
      && Object.keys(data.query.pages).length === 1
      && Object.keys(data.query.pages)[0] >= 0) {
      const pageKey = Object.keys(data.query.pages);
      const redirects = data.query.pages[pageKey].redirects;
      if (redirects) {
        result = redirects.map(el => { return { title: el.title }; });
      }
    }
    return result;
  }

}
