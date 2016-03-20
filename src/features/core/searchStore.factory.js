searchStore.$inject = [];

export default function searchStore() {
  let langFrom = 'en';
  let langTo = 'pl';
  let currentResult;
  // -------
  return {
    setCurrentResult: result => { currentResult = result; },
    getCurrentResult: () => currentResult,
    getLangFrom: () => langFrom,
    getLangTo: () => langTo,
  };
  // -------
}
