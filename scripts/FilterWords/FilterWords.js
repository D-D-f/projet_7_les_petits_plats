const filterWords = (recipes, name, value) => {
  const ingredient = document.querySelector(`.ingredient`);
  const appliance = document.querySelector(".appliances");
  const ustensils = document.querySelector(".ustensiles");

  if (name === "ustensils") {
    const ustensil = getUniqueUstensils(recipes).filter((usten) =>
      usten.includes(value)
    );

    ustensil.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = element;
      if (stateRecipes.ustensiles === li.innerText) {
        li.style.backgroundColor = "#ffd15b";
        li.style.padding = "10px";
      }
      ustensils.append(li);
      li.style.cursor = "pointer";
      li.addEventListener("click", () => eventLi(li, "ustensil"));
    });
  } else if (name === "appliance") {
    const appliances = getUniquesAppliances(recipes).filter((appli) =>
      appli.includes(value)
    );

    appliances.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = element;
      if (stateRecipes.appliances === li.innerText) {
        li.style.backgroundColor = "#ffd15b";
        li.style.padding = "10px";
      }
      appliance.append(li);
      li.style.cursor = "pointer";
      li.addEventListener("click", () => eventLi(li, "appliance"));
    });
  } else if (name === "ingredient") {
    const ingredients = getUniqueIngredients(recipes).filter((ingred) =>
      ingred.includes(value)
    );

    ingredients.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = element;
      if (stateRecipes.ingredient === li.innerText) {
        li.style.backgroundColor = "#ffd15b";
        li.style.padding = "10px";
      }
      ingredient.append(li);
      li.style.cursor = "pointer";
      li.addEventListener("click", () => eventLi(li, "ingredient"));
    });
  }
};
