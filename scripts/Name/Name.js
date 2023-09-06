const filterName = (recipe, wordUser) => {
  let names = [];
  for (const name of recipe) {
    if (name.name.toLowerCase().includes(wordUser)) {
      names.push(name);
    }
  }

  return names;
};
