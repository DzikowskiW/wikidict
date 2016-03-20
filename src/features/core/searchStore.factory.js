searchStore.$inject = [];

export default function searchStore() {
  this.langFrom = 'en';
  this.langTo = 'pl';
  let currentResult;
  // -------
  return {
    setCurrentResult: result => { currentResult = result; },
    getCurrentResult: () => currentResult,
    getLangFrom: () => this.langFrom,
    getLangTo: () => this.langTo,
  };
  // -------
}
