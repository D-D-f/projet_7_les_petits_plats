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

// Retrieves objects that have part of the word given as a parameter in the descriptions
