translationResultFetcher.$injector = ['$http', 'translationUrl'];

export default function translationResultFetcher($http, translationUrl) {
  return {
    translate,
  };

  //------------

  function translate(phrase, langFrom, langTo) {
    return $http.jsonp(translationUrl);
  }
}
