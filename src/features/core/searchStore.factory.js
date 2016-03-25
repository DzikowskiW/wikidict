searchStore.$inject = [];

export default function searchStore() {
  this.langFrom = null;
  this.langTo = null;
  this.phrase = null;
  let resultsPromise;
  // -------
  return {
    setCurrentResultPromise: result => { resultsPromise = result; },
    getCurrentResultPromise: () => resultsPromise,
    getLangFrom: () => this.langFrom,
    getLangTo: () => this.langTo,
    getPhrase: () => this.phrase,
    setLangFrom: lang => { this.langFrom = lang; },
    setLangTo: lang => { this.langTo = lang; },
    setPhrase: phrase => { this.phrase = phrase; },
    updateState: (langFrom, langTo, phrase) => {
      this.langFrom = langFrom;
      this.langTo = langTo;
      this.phrase = phrase;
    },
  };
  // -------
}
