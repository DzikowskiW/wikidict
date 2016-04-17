wikipediaTranslator.$inject = ['$q', 'searchHintFetcher',
  'translationResultFetcher', 'relatedPhrasesFetcher', 'disambiguationFetcher'];

export default function wikipediaTranslator($q, searchHintFetcher,
               translationResultFetcher, relatedPhrasesFetcher, disambiguationFetcher) {
  return {
    autocomplete,
    similarTo,
    translate,
  };

  // ------------
  function autocomplete(lang, phrase) {
    return searchHintFetcher.autocomplete(lang, phrase);
  }

  function fetchRelatedPhrases(lang, phrase) {
    return relatedPhrasesFetcher.relatedTo(lang, phrase);
  }

  function similarTo(lang, phrase) {
    return disambiguationFetcher.similarTo(lang, phrase);
  }

  function translate(langFrom, langTo, phrase) {
    const deferred = $q.defer();
    let convertedData = null;
    translationResultFetcher.translate(langFrom, langTo, phrase)
      // translating
      .then((response) => {
        try {
          convertedData = response;
          // disambiguation handling
          if (convertedData.disambiguation) {
            similarTo(langFrom, phrase)
              .then(result => {
                convertedData.disambiguation = result;
                deferred.resolve(convertedData);
              })
              .catch(() => deferred.reject(convertedData));
          } else {
            autocomplete(langFrom, convertedData.original.normalized_phrase)
              // fetching quick summary
              .then(openSearchResult => {
                if (openSearchResult && openSearchResult.length) {
                  convertedData.original.summary = openSearchResult[0].description;
                }
                return fetchRelatedPhrases(langTo, convertedData.translation.phrase);
              }, () => {
                // if failed to fetch summary
                convertedData.original.summary = null;
                return fetchRelatedPhrases(langTo, convertedData.translation.phrase);
              })
              // fetching related phrases
              .then(relatedPhrases => {
                convertedData.translation.related = relatedPhrases;
              }, () => {
                convertedData.translation.related = [];
              })
            .finally(() => deferred.resolve(convertedData));
          }
        } catch (e) {
          deferred.reject(e.message);
        }
      }, (...args) => {
        deferred.reject.apply(this, args);
      });
    return deferred.promise;
  }
}
