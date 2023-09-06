const eventLi = async (elem, nameFilter) => {
  if (nameFilter === "ingredient") {
    stateRecipes.ingredient = elem.innerText;
    createTagFilter(elem.innerText, "ingredient");
  } else if (nameFilter === "appliance") {
    stateRecipes.appliances = elem.innerText;
    createTagFilter(elem.innerText, "appliances");
  } else if (nameFilter === "ustensil") {
    stateRecipes.ustensiles = elem.innerText;
    createTagFilter(elem.innerText, "ustensiles");
  }
  await updateArray();
  displayFilterCard(stateRecipes.recipesFilter);
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
    if (stateRecipes.ingredient === li.innerText) {
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
