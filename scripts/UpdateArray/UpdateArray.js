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

  if (stateRecipes.ingredient !== "") {
    const ingredient = filterIngredients(
      stateRecipes.recipesFilter,
      stateRecipes.ingredient
    );
    stateRecipes.recipesFilter.splice(0, stateRecipes.recipesFilter.length);
    stateRecipes.recipesFilter.push(...ingredient);
  }

  if (stateRecipes.appliances !== "") {
    const appliance = filterAppliances(
      stateRecipes.recipesFilter,
      stateRecipes.appliances
    );
    stateRecipes.recipesFilter.splice(0, stateRecipes.recipesFilter.length);
    stateRecipes.recipesFilter.push(...appliance);
  }

  if (stateRecipes.ustensiles !== "") {
    const ustensils = filterUstensile(
      stateRecipes.recipesFilter,
      stateRecipes.ustensiles
    );
    stateRecipes.recipesFilter.splice(0, stateRecipes.recipesFilter.length);
    stateRecipes.recipesFilter.push(...ustensils);
  }
};
