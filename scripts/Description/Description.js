const filterDescription = (recipes, wordUser) => {
  if (wordUser !== "") {
    const getDescription = recipes.filter((item) =>
      item.description.toLowerCase().includes(wordUser.toLowerCase())
    );

    return getDescription;
  } else {
    return [];
  }
};
