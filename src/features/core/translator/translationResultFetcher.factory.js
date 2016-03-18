translationResultFetcher.$injector = ['$http','wdOrigin'];

export default function translationResultFetcher($http, wdOrigin) {
  return {
    translate,
  };

  //------------

  function translate(phrase, langFrom, langTo) {
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
      method: 'GET',
      params: {
        action: 'query',
        titles: 'phrase',
        prop: 'langlinks',
        lllang: langTo,
        format: 'json',
        origin: wdOrigin,
      },
    });
  }

  function generateUrl(langFrom) {
    return `https://${langFrom}.wikipedia.org/w/api.php`;
  }

  function formatResults(wikimediaResults){
    return '';
  }
}
