// @ts-nocheck
const eventLi = async (elem, nameFilter) => {
  if (nameFilter === "ingredient") {
    if (!stateRecipes.ingredient.includes(elem)) {
      stateRecipes.ingredient.push(elem.innerText);
      createTagFilter(elem.innerText, "ingredient");
    }
  } else if (nameFilter === "appliance") {
    if (!stateRecipes.appliances.includes(elem)) {
      stateRecipes.appliances.push(elem.innerText);
      createTagFilter(elem.innerText, "appliances");
    }
  } else if (nameFilter === "ustensil") {
    if (!stateRecipes.ustensiles.includes(elem)) {
      stateRecipes.ustensiles.push(elem.innerText);
      createTagFilter(elem.innerText, "ustensiles");
    }
  }
  await updateArray();
  const fusionArray = [
    ...stateRecipes.recipesFilterAppliances,
    ...stateRecipes.recipesFilterIngredient,
    ...stateRecipes.recipesFilterUstensiles,
  ];
  const idCounts = {};
  const duplicateObjects = [];

  fusionArray.forEach((element) => {
    const id = element.id;
    if (idCounts[id] === undefined) {
      idCounts[id] = 1;
    } else {
      idCounts[id]++;
    }
  });

  Object.keys(idCounts).forEach((id) => {
    if (idCounts[id] > 1) {
      const duplicates = fusionArray.filter(
        (element) => element.id === parseInt(id)
      );
      duplicateObjects.push(...duplicates);
    }
  });

  const displayArray = duplicateObjects.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  displayFilterCard(displayArray.length > 0 ? displayArray : fusionArray);
};

const displayFilter = (array) => {
  const ingredient = document.querySelector(`.ingredient`);
  const appliance = document.querySelector(".appliances");
  const ustensils = document.querySelector(".ustensiles");
  const ingredients = getUniqueIngredients(array);
  const appliances = getUniquesAppliances(array);
  const ustensiles = getUniqueUstensils(array);

  ingredients.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    li.style.padding = "5px 10px";
    if (stateRecipes.ingredient.includes(li.innerText)) {
      li.style.backgroundColor = "#ffd15b";
    }
    ingredient.append(li);
    li.style.cursor = "pointer";
    li.addEventListener("click", () => eventLi(li, "ingredient"));
  });
  appliances.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    li.style.padding = "5px 10px";
    if (stateRecipes.appliances === li.innerText) {
      li.style.backgroundColor = "#ffd15b";
    }
    appliance.append(li);
    li.style.cursor = "pointer";
    li.addEventListener("click", () => eventLi(li, "appliance"));
  });
  ustensiles.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    li.style.padding = "5px 10px";
    if (stateRecipes.ustensiles === li.innerText) {
      li.style.backgroundColor = "#ffd15b";
    }
    ustensils.append(li);
    li.style.cursor = "pointer";
    li.addEventListener("click", () => eventLi(li, "ustensil"));
  });
};
