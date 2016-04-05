wikipediaTranslator.$inject = ['$q', 'searchHintFetcher',
  'translationResultFetcher', 'relatedPhrasesFetcher', 'disambiguationFetcher'];

export default function wikipediaTranslator($q, searchHintFetcher,
               translationResultFetcher, relatedPhrasesFetcher, disambiguationFetcher) {
  const PHRASES = 1;
  const PHRASE_DESCRIPTIONS = 2;
  const PHRASE_LINKS = 3;

  return {
    autocomplete,
    similarTo,
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
    let convertedData = null;
    translationResultFetcher.translate(langFrom, langTo, phrase)
      // translating
      .then((response) => {
        try {
          convertedData = convertWikipediaResponse(langFrom, phrase, response.data);
          //disambiguation
          if (convertedData.disambiguation) {
            similarTo(langFrom, phrase)
              .then(result => {
                convertedData.disambiguation = result;
                deferred.resolve(convertedData);
              });
          } else {
            // fetching quick summary and related phrases
            autocomplete(langFrom,convertedData.original.normalized_phrase)
            .then(openSearchResult => {
              convertedData.original.summary = openSearchResult[0].description;
              return fetchRelatedPhrases(langTo, convertedData.translation.phrase);
            })
            .then(relatedPhrases => {
              convertedData.translation.related = relatedPhrases;
              deferred.resolve(convertedData);
            }, (...args) => {
              deferred.reject.apply(this, args);
            });
          }
        } catch (e) {
          deferred.reject(e.message);
        }
      }, (...args) => {
        deferred.reject.apply(this, args);
      });
    return deferred.promise;
  }

  function fetchRelatedPhrases(lang, phrase) {
    const deferred = $q.defer();
    relatedPhrasesFetcher.relatedTo(lang, phrase)
      .then((response) => {
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

  function similarTo(lang, phrase){
    const deferred = $q.defer();
    disambiguationFetcher.similarTo(lang, phrase)
      .then((response) => {
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

  function convertWikipediaResponse(langFrom, searchedPhrase, data) {
    const result = {
      original: {
        phrase: searchedPhrase,
      },
      translation: {},
    };

    if (data && data.query && data.query.pages
      && Object.keys(data.query.pages).length === 1
      && Object.keys(data.query.pages)[0] >= 0)
    {
      const pageKey = Object.keys(data.query.pages);
      const translationData = data.query.pages[pageKey];
      result.original.normalized_phrase = translationData.title;
      result.original.langcode = langFrom;
      result.original.desc = translationData.extract;
      result.original.url = translationData.fullurl;
      if (translationData.thumbnail) {
        result.original.thumbnail = translationData.thumbnail.source;
      }
      if (translationData.pageprops
        && typeof translationData.pageprops.disambiguation === 'string') {
        result.disambiguation = true;
      }
      if (!translationData.langlinks) {
        result.translation.error = result.translation.error || {};
        result.translation.error.noResult = true;
      } else {
        result.translation.phrase = translationData.langlinks[0]['*'];
        result.translation.langname = translationData.langlinks[0].langname;
        result.translation.langcode = translationData.langlinks[0].lang;
        result.translation.url = translationData.langlinks[0].url;
        result.translation.autonym = translationData.langlinks[0].autonym;
      }
    }
    return result;
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

  function convertDisambiguationData(data) {
    let result = [];
    if (data && data.query && data.query.pages
      && Object.keys(data.query.pages).length > 1) {
      result = Object.keys(data.query.pages).map(pageKey => {
        return {
          title: data.query.pages[pageKey].title,
          pageId: data.query.pages[pageKey].pageid,
        };
      });
    }
    return result;
  }
}
