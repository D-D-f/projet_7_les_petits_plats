const filterUstensile = (recipes, wordUser) => {
  if (wordUser !== "") {
    const recipesWithUserUstenfils = recipes.filter((recipe) => {
      return recipe.ustensils.some((item) =>
        item.toLowerCase().includes(wordUser)
      );
    });

    return recipesWithUserUstenfils;
  } else {
    return [];
  }
};

const getSearchUstensils = (recipes, wordUser) => {
  let filteredRecipes = [...recipes];

  wordUser.forEach((word) => {
    if (word.trim() !== "") {
      const currentFilteredRecipes = filteredRecipes.filter((recipe) => {
        return recipe.ustensils.some((item) =>
          item.toLowerCase().includes(word.toLowerCase())
        );
      });

      filteredRecipes = currentFilteredRecipes;
    }
  });
  stateRecipes.recipesFilterUstensiles.splice(
    0,
    stateRecipes.recipesFilterUstensiles.length
  );
  stateRecipes.recipesFilterUstensiles.push(...filteredRecipes);
  return filteredRecipes.length > 0 ? filteredRecipes : [];
};

const getUniqueUstensils = (recipes) => {
  const getUstensils = recipes
    .flatMap((ingredient) => {
      return ingredient.ustensils.map((item) => item.toLowerCase());
    })
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  return getUstensils;
};
