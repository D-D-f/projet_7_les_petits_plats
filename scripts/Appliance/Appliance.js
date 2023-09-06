const filterAppliances = (recipe, wordUser) => {
  let tableau = [];
  for (const appli of recipe) {
    const verif = appli.appliance.toLowerCase().includes(wordUser);
    if (verif === true) {
      tableau.push(appli);
    }
  }

  return tableau;
};

const getUniquesAppliances = (recipes) => {
  const getAppliance = recipes
    .flatMap((appliance) => {
      return appliance.appliance.toLowerCase();
    })
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  return getAppliance;
};
