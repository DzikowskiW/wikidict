searchStore.$inject = [];

export default function searchStore() {
  const langFrom = 'en';
  const langTo = 'pl';
  // -------
  return {
    getLangFrom: () => langFrom,
    getLangTo: () => langTo,
  };
  // -------
}
