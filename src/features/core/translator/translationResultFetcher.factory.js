translationResultFetcher.$inject = ['$q', '$http', 'wdOrigin'];

export default function translationResultFetcher($q, $http, wdOrigin) {
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
    const deferred = $q.defer();
    $http({
      url: generateUrl(langFrom),
      method: 'JSONP',
      params: {
        action: 'query',
        titles: phrase,
        prop: 'langlinks|extracts|pageimages|info|categories|pageprops',
        redirects: true,
        ppprop: 'disambiguation',
        inprop: 'url', // url to original article,
        pithumbsize: 200, // thumb size
        llprop: 'url|langname|autonym',
        explaintext: true,
        exintro: true,
        lllang: langTo,
        format: 'json',
        callback: 'JSON_CALLBACK',
      },
    }).then((response) => {
      try {
        const convertedData = convertWikipediaResponse(langFrom, phrase, response.data);
        deferred.resolve(convertedData);
      } catch (e) {
        deferred.reject(e.message);
      }
    }, (...args) => {
      deferred.reject.apply(this, args);
    });
    return deferred.promise;
  }

  function generateUrl(langFrom) {
    return `https://${langFrom}.wikipedia.org/w/api.php`;
  }

  function convertWikipediaResponse(langFrom, searchedPhrase, data) {
    const result = {
      original: {
        phrase: searchedPhrase,
      },
      translation: {},
    };
    if (!(data && data.query && data.query.pages)) {
      throw new Error('Invalid response');
    }
    if (Object.keys(data.query.pages).length === 1
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
}
