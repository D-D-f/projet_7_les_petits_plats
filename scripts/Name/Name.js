const filterName = (recipes, wordUser) => {
  if (wordUser !== "") {
    const getName = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(wordUser.toLowerCase())
    );
    return getName;
  } else {
    return [];
  }
};
