// @ts-nocheck
const filterAppliances = (recipes, wordUser) => {
  if (wordUser !== "") {
    const filterAppliance = recipes.filter((elem) => {
      return elem.appliance.toLowerCase().includes(wordUser.toLowerCase());
    });
    return filterAppliance;
  } else {
    return [];
  }
};

// Function which returns the array which corresponds to the appliance as a parameter

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

// The function allows you to retrieve all the appliance contained in the wordUser array

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

// Function to retrieve appliance without duplicates
