const filterDescription = (recipe, wordUser) => {
  let descriptions = [];
  for (const descri of recipe) {
    if (descri.description.includes(wordUser)) {
      descriptions.push(descri);
    }
  }

  return descriptions;
};
