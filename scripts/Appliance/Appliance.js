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

const getSearchAppliance = (recipes, wordUser) => {
  let filteredRecipes = [...recipes];

  wordUser.forEach((word) => {
    if (word.trim() !== "") {
      const currentFilteredRecipes = recipes.filter((elem) => {
        return elem.appliance.toLowerCase().includes(word.toLowerCase());
      });

      filteredRecipes = currentFilteredRecipes;
    }
  });
  stateRecipes.recipesFilterAppliances.splice(
    0,
    stateRecipes.recipesFilterAppliances.length
  );
  stateRecipes.recipesFilterAppliances.push(...filteredRecipes);
  return filteredRecipes.length > 0 ? filteredRecipes : [];
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
