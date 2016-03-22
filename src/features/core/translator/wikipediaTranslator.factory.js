wikipediaTranslator.$inject = ['$q', 'searchHintFetcher', 'translationResultFetcher'];

export default function wikipediaTranslator($q, searchHintFetcher, translationResultFetcher) {
  const PHRASES = 1;
  const PHRASE_DESCRIPTIONS = 2;
  const PHRASE_LINKS = 3;

  return {
    autocomplete,
    translate,
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

  function translate(langFrom, langTo, phrase) {
    const deferred = $q.defer();
    translationResultFetcher.translate(langFrom, langTo, phrase)
      .then((response) => {
        try {
          const convertedData = convertWikipediaResponse(phrase, response.data);
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

  function convertWikipediaResponse(searchedPhrase, data) {
    const result = {
      original: {
        phrase: searchedPhrase,
      },
      translation: {},
    };

    if (data && data.query && data.query.pages
      && Object.keys(data.query.pages).length === 1
      && Object.keys(data.query.pages)[0] >= 0) {
      const pageKey = Object.keys(data.query.pages);
      const translationData = data.query.pages[pageKey];
      result.original.normalized_phrase = translationData.title;
      result.original.desc = translationData.extract;
      result.original.url = translationData.fullurl;
      if (translationData.thumbnail) {
        result.original.thumbnail = translationData.thumbnail.source;
      }
      result.translation.phrase = translationData.langlinks[0]['*'];
      result.translation.langname = translationData.langlinks[0].langname;
      result.translation.url = translationData.langlinks[0].url;
      result.translation.autonym = translationData.langlinks[0].autonym;
    }
    return result;
  }
}
