const filterAppliances = (recipes, wordUser) => {
  if (wordUser !== "") {
    const filterAppliance = recipes.filter((elem) => {
      return elem.appliance.toLowerCase().includes(wordUser.toLowerCase());
    });
    return filterAppliance;
  } else {
    return [];
  }
};

const getUniquesAppliances = (recipes) => {
  const getAppliance = recipes
    .flatMap((appliance) => {
      return appliance.appliance.toLowerCase();
    })
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  return getAppliance;
};
