// @ts-nocheck
const searchMainBar = (array) => {
  const name = filterName(array, stateRecipes.searchBar);
  const description = filterDescription(array, stateRecipes.searchBar);
  const ingredient = filterIngredients(array, stateRecipes.searchBar);

  const nameSet = new Set(name);
  for (const item of description) {
    nameSet.add(item);
  }
  for (const item of ingredient) {
    nameSet.add(item);
  }

  const uniqueElements = Array.from(nameSet);
  return uniqueElements;
};

// Permet de faire la recherche sur la search bar principal
