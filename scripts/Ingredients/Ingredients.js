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
