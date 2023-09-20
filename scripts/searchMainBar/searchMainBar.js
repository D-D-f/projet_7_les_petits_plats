// @ts-nocheck

const searchMainBar = (array) => {
  const name = filterName(array, stateRecipes.searchBar);
  const description = filterDescription(array, stateRecipes.searchBar);
  const ingredient = filterIngredients(array, stateRecipes.searchBar);
  const mergedArray = [...name, ...description, ...ingredient];
  const uniqueElementsSet = new Set(mergedArray);
  const uniqueElements = Array.from(uniqueElementsSet);
  return uniqueElements;
};

// Function that allows you to search with the main field
