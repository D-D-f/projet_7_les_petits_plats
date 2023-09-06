const filterUstensile = (recipe, wordUser) => {
  const result = [];
  for (const recip of recipe) {
    for (const ustensil of recip.ustensils) {
      if (ustensil.toLowerCase().includes(wordUser.toLowerCase())) {
        result.push(recip);
      }
    }
  }
  return result;
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
