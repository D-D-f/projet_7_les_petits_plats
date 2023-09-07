const filterIngredients = (recipes, wordUser) => {
  if (wordUser !== "") {
    const recipesWithUserIngredient = recipes.filter((recipe) => {
      return recipe.ingredients.some((item) =>
        item.ingredient.toLowerCase().includes(wordUser.toLowerCase())
      );
    });

    return recipesWithUserIngredient;
  } else {
    return [];
  }
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
