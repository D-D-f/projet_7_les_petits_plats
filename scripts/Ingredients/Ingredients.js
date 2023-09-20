// @ts-nocheck
const filterIngredients = (recipe, wordUser) => {
  let firstFilter = [];
  let getObj = [];
  let result = [];
  for (const recip of recipe) {
    firstFilter.push(...recip.ingredients);
  }

  for (const test of firstFilter) {
    if (test.ingredient.toLowerCase().includes(wordUser.toLowerCase())) {
      getObj.push(test);
    }
  }

  for (const np of recipe) {
    const verif = np.ingredients;
    let i = 0;
    while (i < getObj.length) {
      if (verif.includes(getObj[i])) {
        if (!result.includes(np)) {
          result.push(np);
        }
      }
      i++;
    }
  }

  return result;
};

const getSearchIngredients = (recipes, wordUser) => {
  let filteredRecipes = [...recipes];

  wordUser.forEach((word) => {
    if (word.trim() !== "") {
      const currentFilteredRecipes = filteredRecipes.filter((recipe) => {
        return recipe.ingredients.some((item) =>
          item.ingredient.toLowerCase().includes(word.toLowerCase())
        );
      });

      filteredRecipes = currentFilteredRecipes;
    }
  });
  stateRecipes.recipesFilterIngredient.splice(
    0,
    stateRecipes.recipesFilterIngredient.length
  );
  stateRecipes.recipesFilterIngredient.push(...filteredRecipes);
  return filteredRecipes.length > 0 ? filteredRecipes : [];
};

const getUniqueIngredients = (recipes) => {
  const getIngredients = recipes
    .flatMap((ingredient) => {
      return ingredient.ingredients.map((item) =>
        item.ingredient.toLowerCase()
      );
    })
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  return getIngredients;
};
