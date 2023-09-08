const searchMainBar = (array) => {
  const name = filterName(array, stateRecipes.searchBar);
  const description = filterDescription(array, stateRecipes.searchBar);
  const ingredient = filterIngredients(array, stateRecipes.searchBar);
  const allArray = [...name, ...ingredient, ...description];
  const filter = [];

  for (const arr of allArray) {
    if (!filter.includes(arr)) {
      filter.push(arr);
    }
  }

  return filter;
};

// Permet de faire la recherche sur la search bar principal
