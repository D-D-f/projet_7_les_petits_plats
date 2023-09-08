const filterWords = (recipes, name, value) => {
  const ingredient = document.querySelector(`.ingredient`);
  const appliance = document.querySelector(".appliances");
  const ustensils = document.querySelector(".ustensiles");

  if (name === "ustensils") {
    ustensils.innerHTML = "";
    const ustensil = getUniqueUstensils(recipes).filter((usten) =>
      usten.includes(value)
    );

    ustensil.forEach((element) => {
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
  } else if (name === "appliance") {
    appliance.innerHTML = "";
    const appliances = getUniquesAppliances(recipes).filter((appli) =>
      appli.includes(value)
    );

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
  } else if (name === "ingredient") {
    ingredient.innerHTML = "";
    const ingredients = getUniqueIngredients(recipes).filter((ingred) =>
      ingred.includes(value)
    );

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
  }
};
