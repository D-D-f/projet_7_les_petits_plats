const searchMainBar = (array) => {
  const name = filterName(array, stateRecipes.searchBar);
  const description = filterDescription(array, stateRecipes.searchBar);
  const ingredient = filterIngredients(array, stateRecipes.searchBar);
  const allArray = [...name, ...description, ...ingredient].reduce(
    (acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    },
    []
  );

  if (allArray.length > 0) {
    array.splice(0, array.length);
    array.push(...allArray);
  }
  return allArray;
};

// Permet de faire la recherche sur la search bar principal
