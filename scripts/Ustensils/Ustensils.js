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
