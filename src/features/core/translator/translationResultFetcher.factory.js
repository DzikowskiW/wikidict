translationResultFetcher.$inject = ['$http', 'wdOrigin'];

export default function translationResultFetcher($http, wdOrigin) {
  return {
    translate,
  };

  //------------

  function translate(langFrom, langTo, phrase) {
    if (!(typeof phrase === 'string' || phrase instanceof String) || phrase.length <= 0) {
      throw new Error('Invalid phrase for translationResultFetcher given');
    }
    if (!langFrom || langFrom.length < 1) {
      throw new Error('Invalid from language parameter');
    }
    if (!langTo || langTo.length < 1) {
      throw new Error('Invalid to language parameter');
    }
    return $http({
      url: generateUrl(langFrom),
      method: 'JSONP',
      params: {
        action: 'query',
        titles: phrase,
        prop: 'langlinks|extracts',
        explaintext:true,
        exintro: true,
        lllang: langTo,
        format: 'json',
        callback: 'JSON_CALLBACK',
      },
    });
  }

  function generateUrl(langFrom) {
    return `https://${langFrom}.wikipedia.org/w/api.php`;
  }

}
