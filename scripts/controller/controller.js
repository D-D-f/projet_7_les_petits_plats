// function to filter the main search to names
const filterName = (recipes, value) => {
  const getName = recipes
    .flatMap((recipe) => recipe.name.toLowerCase().split(" "))
    .filter((name) => name.startsWith(value))
    .reduce((acc, cur) => {
      acc.includes(cur) === false ? acc.push(cur) : "";
      return acc;
    }, [])
    .join("");

  const filterForName = recipes.filter((recipe) =>
    recipe.name.toLowerCase().split(" ").includes(getName)
  );

  return filterForName;
};

// function to filter the main search ingredients
const filterIngredients = (recipes, ingredient) => {
  const getIngredient = recipes
    .flatMap((item) => {
      return item.ingredients.flatMap((item) =>
        item.ingredient
          .toLowerCase()
          .split(" ")
          .filter((item) => item.startsWith(ingredient))
      );
    })
    .filter((item, index, self) => self.indexOf(item) === index)
    .join("");

  const getObject = recipes.filter((ingredient) => {
    const igrd = ingredient.ingredients.filter((igr) =>
      igr.ingredient.toLowerCase().split(" ").includes(getIngredient)
    );
    return igrd.length > 0;
  });

  return getObject;
};

// function to filter the main search description
const filterDescription = (recipes, description) => {
  const getIndex = recipes.map((item) => {
    return item.description
      .toLowerCase()
      .split(" ")
      .filter((item) => item.startsWith(description));
  });

  const index = getIndex
    .map((item, index) => item.length > 0 && index)
    .filter((item) => item !== false);

  const displayDescription = index.map((item) => recipes[item]);
  return displayDescription;
};

// function to filter the main search appliance
const filterAppliances = (recipes, appliance) => {
  const filterAppliance = recipes.filter((elem) => {
    return elem.appliance.toLowerCase().startsWith(appliance);
  });
  return filterAppliance;
};

const filterAllIngredients = (recettes) => {
  const ul = document.querySelector(".ingredient");
  let allIngredients = [];
  recettes.forEach((recette) => {
    recette.ingredients.filter(
      (ingredient) =>
        allIngredients.includes(ingredient.ingredient.toLowerCase()) !== true &&
        allIngredients.push(ingredient.ingredient.toLowerCase())
    );
  });

  allIngredients.forEach((ingredient) => {
    let li = document.createElement("li");
    li.innerText = ingredient;
    ul.append(li);
  });
};

// Filter for display appliance
const allAppliance = (recettes) => {
  const ul = document.querySelector(".appliances");
  let allAppliances = [];
  recettes.forEach((appliance) => {
    if (!allAppliances.includes(appliance.appliance)) {
      allAppliances.push(appliance.appliance);
    }
  });

  allAppliances.forEach((appliance) => {
    let li = document.createElement("li");
    li.innerText = appliance;
    ul.append(li);
  });
};

// Filter for display ustensil
const filterAllUstensils = (recettes) => {
  const ul = document.querySelector(".ustensiles");
  let allUstensils = [];
  recettes.forEach((recette) => {
    recette.ustensils.filter(
      (ustensil) =>
        allUstensils.includes(ustensil.toLowerCase()) !== true &&
        allUstensils.push(ustensil.toLowerCase())
    );
  });

  allUstensils.forEach((ustensil) => {
    let li = document.createElement("li");
    li.innerText = ustensil;
    ul.append(li);
  });
};

// Function for display all filter
const displayAllInfo = (array) => {
  filterAllIngredients(array);
  allAppliance(array);
  filterAllUstensils(array);
};

// function to filter the main search ustensile
const filterUstensile = (recipes, ustensils) => {
  const getIndex = recipes.map((item) =>
    item.ustensils
      .join(" ")
      .toLowerCase()
      .split(" ")
      .filter((item) => item.startsWith(ustensils))
  );

  const index = getIndex
    .map((item, index) => item.length > 0 && index)
    .filter((item) => item !== false);

  const getUstensils = index.map((item) => recipes[item]);
  return getUstensils;
};

const filterAll = (array, ingredient, appliance, ustensils) => {
  const allFilter = [...array, ...ingredient, ...appliance, ...ustensils];
  const idOccurrences = {};

  allFilter.forEach((obj) => {
    if (idOccurrences[obj.id]) {
      idOccurrences[obj.id]++;
    } else {
      idOccurrences[obj.id] = 1;
    }
  });

  const getId = Object.keys(idOccurrences).filter(
    (id) => idOccurrences[id] >= 4
  );

  console.log(getId);
};

const filterForMainSearchBar = (recipes) => {
  const name = filterName(recipes);
  const ingredients = filterIngredients(recipes, searchIngredient);
  const description = filterDescription(recipes);
  const appliance = filterAppliances(recipes, searchAppliance);
  const ustensils = filterUstensile(recipes, searchUstensile);
  const allFilter = [...name, ...ingredients, ...description];
  const deleteD = Array.from(new Set(allFilter));
  filterAll(deleteD, ingredients, appliance, ustensils);
};

const filterNameAndIngredientAndDescription = () => {
  const name = filterName();
  const ingredients = filterIngredients();
  const description = filterDescription();

  const arrayDisplay = [...name, ...ingredients, ...description];

  const uniqueObjects = arrayDisplay.reduce((acc, cur) => {
    const existingObj = acc.find((obj) => obj.id === cur.id);
    if (!existingObj) {
      acc.push(cur);
    }

    return acc;
  }, []);

  allFilter.searchUser.push(...uniqueObjects);

  displayFilterCard(uniqueObjects);
};
