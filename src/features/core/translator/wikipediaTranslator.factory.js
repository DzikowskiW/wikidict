wikipediaTranslator.$inject = ['$q', 'searchHintFetcher'];

export default function wikipediaTranslator($q, searchHintFetcher) {
  const PHRASES = 1;
  const PHRASE_DESCRIPTIONS = 2;
  const PHRASE_LINKS = 3;

  return {
    autocomplete,
  };

  // ------------

  function autocomplete(lang, phrase) {
    const deferred = $q.defer();
    searchHintFetcher.autocomplete(lang, phrase)
    .then((response) => {
      deferred.resolve(convertFromOpenSearch(response.data));
    }, (...args) => {
      deferred.reject.apply(this, args);
    });
    return deferred.promise;
  }

  function convertFromOpenSearch(data) {
    const result = [];
    for (let i = 0; i < data[PHRASES].length; i++) {
      result.push({
        phrase: data[PHRASES][i],
        description: data[PHRASE_DESCRIPTIONS][i],
        url: data[PHRASE_LINKS][i],
      });
    }
    return result;
  }
}
