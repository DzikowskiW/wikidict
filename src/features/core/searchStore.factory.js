searchStore.$inject = [];

export default function searchStore() {
  const fromLang = 'pl';
  const toLang = 'en';
  // -------
  return {
    getFromLang: () => fromLang,
    getToLang: () => toLang,
  };
  // -------
}
