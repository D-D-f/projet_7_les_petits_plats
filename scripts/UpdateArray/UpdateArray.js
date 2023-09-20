// @ts-nocheck
const updateArray = async () => {
  const allArray = await getData();
  stateRecipes.recipesFilter.splice(0, stateRecipes.recipesFilter.length);
  stateRecipes.recipesFilter.push(...allArray);
  const getArray = [...stateRecipes.recipesFilter];

  if (stateRecipes.searchBar !== "") {
    const search = searchMainBar(getArray);
    stateRecipes.recipesFilter.splice(0, stateRecipes.recipesFilter.length);
    stateRecipes.recipesFilter.push(...search);
  }

  if (stateRecipes.ingredient.length > 0) {
    getSearchIngredients(stateRecipes.recipesFilter, stateRecipes.ingredient);
  } else {
    stateRecipes.recipesFilterIngredient.splice(
      0,
      stateRecipes.recipesFilterIngredient.length
    );
  }

  if (stateRecipes.appliances.length > 0) {
    getSearchAppliance(stateRecipes.recipesFilter, stateRecipes.appliances);
  } else {
    stateRecipes.recipesFilterAppliances.splice(
      0,
      stateRecipes.recipesFilterAppliances.length
    );
  }

  if (stateRecipes.ustensiles.length > 0) {
    getSearchUstensils(stateRecipes.recipesFilter, stateRecipes.ustensiles);
  } else {
    stateRecipes.recipesFilterUstensiles.splice(
      0,
      stateRecipes.recipesFilterUstensiles.length
    );
  }
};

// function to put the new data into the staterecipes object
