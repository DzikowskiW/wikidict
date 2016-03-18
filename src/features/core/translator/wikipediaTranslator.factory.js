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
      try {
        const convertedData = convertFromOpenSearch(response.data);
        deferred.resolve(convertedData);
      } catch (e) {
        deferred.reject(e.message);
      }
    }, (...args) => {
      deferred.reject.apply(this, args);
    });
    return deferred.promise;
  }

  function convertFromOpenSearch(data) {
    if (!Array.isArray(data) || data.length < 4 || data[1].length !== data[2].length
      || data[3].length !== data[2].length) {
      throw new Error('Invalid OpenSearch argument');
    }
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
