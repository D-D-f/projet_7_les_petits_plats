const form = document.querySelector("#form_header");
const nbRecette = document.querySelector(".nbRecette");
const allCard = document.querySelector(".allCard > .row");
const allUl = document.querySelectorAll(".ul_list");
const formUstensile = document.querySelector("#form_ustensile");
const formAppliance = document.querySelector("#form_appliance");
const formIngredient = document.querySelector("#form_ingredient");
const tagContainer = document.querySelector(".filter_all");

const stateRecipes = {
  recipes: [],
  searchBar: "",
  ingredient: "",
  appliances: "",
  ustensiles: "",
};

const getData = async () => {
  try {
    const requete = await fetch("./public/recettes.json", {
      method: "GET",
    });

    if (requete.ok) {
      const data = await requete.json();
      return [...data];
    }
  } catch (e) {
    console.log(e);
  }
};

const filterName = (recipes, wordUser) => {
  if (wordUser !== "") {
    const getName = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(wordUser.toLowerCase())
    );
    return getName;
  } else {
    return [];
  }
};

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

const searchMainBar = () => {
  const name = filterName(
    stateRecipes.searchRecipeFilter.length > 0
      ? stateRecipes.searchRecipeFilter
      : stateRecipes.recipes,
    stateRecipes.searchUser.join("")
  );

  const ingredient = filterIngredients(
    stateRecipes.searchRecipeFilter.length > 0
      ? stateRecipes.searchRecipeFilter
      : stateRecipes.recipes,
    stateRecipes.searchUser.join("")
  );

  const description = filterDescription(
    stateRecipes.searchRecipeFilter.length > 0
      ? stateRecipes.searchRecipeFilter
      : stateRecipes.recipes,
    stateRecipes.searchUser.join("")
  );

  const addAllArrayInOne = [...name, ...ingredient, ...description];

  const uniqueArray = addAllArrayInOne.reduce((acc, cur) => {
    const existingObj = acc.find((obj) => obj.id === cur.id);
    if (!existingObj) {
      acc.push(cur);
    }

    return acc;
  }, []);

  stateRecipes.searchRecipeFilter.push(...uniqueArray);
};

const createTagFilter = (elem, classe, texte) => {
  const div = document.createElement("div");
  const text = document.createElement("span");
  const close = document.createElement("span");
  div.append(text, close);
  div.classList.add(classe);
  text.innerText = texte;
  close.innerHTML = "<i class='fa-solid fa-circle-xmark'></i>";
  tagContainer.appendChild(div);

  close.style.cursor = "pointer";
  close.addEventListener("click", () => {
    div.remove();
    elem.classList.remove("true");
    elem.style.backgroundColor = "white";
    if (classe === "tag_ustensiles") {
      stateRecipes.ustensiles = "";
    } else if (classe === "tag_appliances") {
      stateRecipes.appliances = "";
    } else if (classe === "tag_ingredient") {
      stateRecipes.ingredient = "";
    }
  });
};

const arrayFilter = () => {
  const name = filterName(stateRecipes.recipes, stateRecipes.searchBar);
  const description = filterDescription(
    stateRecipes.recipes,
    stateRecipes.searchBar
  );
  const ingredient = filterIngredients(
    stateRecipes.recipes,
    stateRecipes.searchBar
  );

  const allArray = [...name, ...description, ...ingredient].reduce(
    (acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    },
    []
  );

  if (allArray.length > 0) {
    stateRecipes.recipes.splice(0, stateRecipes.recipes.length);
    stateRecipes.recipes.push(...allArray);
  }

  displayFilterCard(stateRecipes.recipes);
};

const filterArray = (name) => {
  if (name === "ingredient") {
    const ingredient = filterIngredients(
      stateRecipes.recipes,
      stateRecipes.ingredient
    );
    stateRecipes.recipes.splice(0, stateRecipes.recipes.length);
    stateRecipes.recipes.push(...ingredient);
  } else if (name === "appliances") {
    const appliance = filterAppliances(
      stateRecipes.recipes,
      stateRecipes.appliances
    );
    stateRecipes.recipes.splice(0, stateRecipes.recipes.length);
    stateRecipes.recipes.push(...appliance);
  } else if (name === "ustensiles") {
    const ustensils = filterUstensile(
      stateRecipes.recipes,
      stateRecipes.ustensiles
    );
    stateRecipes.recipes.splice(0, stateRecipes.recipes.length);
    stateRecipes.recipes.push(...ustensils);
  }
};

const displayFilterCard = (arrayFilter) => {
  allCard.innerHTML = "";
  arrayFilter.forEach((filter) => {
    card(filter);
  });
  for (const ul of allUl) {
    ul.innerHTML = "";
  }

  nbRecette.innerText = `${arrayFilter.length} Recettes`;
};

const addFilter = (elem, nameClass, text, name) => {
  if (elem.classList.contains("true")) {
    return;
  } else {
    elem.classList.add("true");
    stateRecipes[name] = elem.innerText;
    filterArray(name);
    createTagFilter(elem, nameClass, text);
    displayFilterCard(stateRecipes.recipes);
    displayAllFilter(getUniqueIngredients, stateRecipes.recipes, "ingredient");
    displayAllFilter(getUniquesAppliances, stateRecipes.recipes, "appliances");
    displayAllFilter(getUniqueUstensils, stateRecipes.recipes, "ustensiles");
  }
};

const createDivRecette = (parent, ingredient, quantity, unit) => {
  const block = document.createElement("div");
  const pIngred = document.createElement("p");
  const pQuantity = document.createElement("p");
  pIngred.classList.add("ingredient");
  pQuantity.classList.add("quantity");
  pIngred.style.margin = 0;
  pIngred.style.padding = 0;
  block.classList.add("col-6");
  parent.append(block);
  block.append(pIngred, pQuantity);
  pIngred.innerText = ingredient;
  pQuantity.innerText = `${quantity !== undefined ? quantity : ""}${
    unit !== undefined ? unit : ""
  }`;
};

const card = ({ name, image, description, ingredients, time }) => {
  const section = document.querySelector(
    ".section > .container > .allCard > .row"
  );
  const article = document.createElement("article");
  const times = document.createElement("span");
  const divCard = document.createElement("div");
  const img = document.createElement("img");
  const divBody = document.createElement("div");
  const title = document.createElement("h3");
  const h5 = document.createElement("h5");
  const h5Ingred = document.createElement("h5");
  const p = document.createElement("p");
  const containerRecette = document.createElement("div");
  const rowRecette = document.createElement("div");
  containerRecette.classList.add("container", "m-2", "heightContainer");
  containerRecette.append(h5Ingred);
  rowRecette.classList.add("row", "row-cols-2");
  containerRecette.append(rowRecette);
  article.classList.add("col-4", "mb-4", "position-relative");
  article.append(times, divCard);
  divCard.classList.add("card", "p-0");
  img.classList.add("card-img-top", "w-100", "image");
  divBody.classList.add("card-body", "m-2");
  section.append(article);
  divCard.append(img, divBody, containerRecette);
  divBody.append(title, h5, p);
  title.innerText = name;
  title.classList.add("title_card", "mb-4");
  img.setAttribute("src", `assets/photos/${image}`);
  img.setAttribute("alt", name);
  h5.innerText = "RECETTE";
  h5.classList.add("mt-2");
  h5Ingred.innerText = "INGRÉDIENTS";
  p.innerText = description;
  p.classList.add("text-description");
  times.innerText = `${time}min`;
  times.classList.add(
    "bg-primary",
    "p-2",
    "ps-3",
    "pe-3",
    "rounded-4",
    "position-absolute",
    "z-1",
    "time"
  );

  ingredients.forEach((item) => {
    createDivRecette(rowRecette, item.ingredient, item.quantity, item.unit);
  });

  return article;
};

const displayAllFilter = (functionFilter, recipes, name) => {
  const ul = document.querySelector(`.${name}`);
  const filter = functionFilter(recipes);

  filter.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    ul.append(li);
    li.style.cursor = "pointer";

    if (
      li.innerText === stateRecipes.ingredient ||
      li.innerText === stateRecipes.appliances ||
      li.innerText === stateRecipes.ustensiles
    ) {
      li.classList.add("true");
    }

    li.addEventListener("click", () =>
      addFilter(li, `tag_${name}`, li.innerText, name)
    );
  });
};

const getForm = (e) => {
  e.preventDefault();
  stateRecipes.searchBar = "";
  stateRecipes.searchBar = e.target[0].value;

  arrayFilter();
};

form.addEventListener("submit", getForm);

formUstensile.addEventListener("submit", (e) => {
  e.preventDefault();
  stateRecipes.ustensils = "";
  stateRecipes.ustensils = e.target[0].value;

  if (stateRecipes.ustensils !== "") {
    if (stateRecipes.searchRecipeFilter.length > 0) {
      const ustensils = filterUstensile(
        stateRecipes.searchRecipeFilter,
        e.target[0].value
      );

      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });

      stateRecipes.searchRecipeFilter.shift();
      stateRecipes.searchRecipeFilter.push(ustensils);
      displayAllInfo(ustensils, stateRecipes.ustensils);
    } else {
      const ustensils = filterUstensile(
        stateRecipes.recipes,
        e.target[0].value
      );

      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(ustensils, stateRecipes.ustensils);
    }
  } else {
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(stateRecipes.recipes);
  }
});

formAppliance.addEventListener("submit", (e) => {
  e.preventDefault();
  stateRecipes.appliance = "";
  stateRecipes.appliance = e.target[0].value;

  if (stateRecipes.appliance !== "") {
    if (stateRecipes.searchRecipeFilter.length > 0) {
      const appliance = filterUstensile(
        stateRecipes.searchRecipeFilter,
        e.target[0].value
      );

      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });

      stateRecipes.searchRecipeFilter.shift();
      stateRecipes.searchRecipeFilter.push(appliance);
      displayAllInfo(appliance, stateRecipes.appliance);
    } else {
      const appliance = filterUstensile(
        stateRecipes.appliance,
        e.target[0].value
      );

      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(appliance, stateRecipes.appliance);
    }
  } else {
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(stateRecipes.recipes);
  }
});

formIngredient.addEventListener("submit", (e) => {
  e.preventDefault();
  stateRecipes.ingredient = "";
  stateRecipes.ingredient = e.target[0].value;

  if (stateRecipes.ingredient !== "") {
    if (stateRecipes.searchRecipeFilter.length > 0) {
      const ingredient = filterIngredients(
        stateRecipes.searchRecipeFilter,
        e.target[0].value
      );

      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });

      stateRecipes.searchRecipeFilter.shift();
      stateRecipes.searchRecipeFilter.push(ingredient);
      displayAllInfo(ingredient, stateRecipes.ingredient);
    } else {
      const ingredient = filterUstensile(
        stateRecipes.ingredient,
        e.target[0].value
      );

      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(ingredient, stateRecipes.ingredient);
    }
  } else {
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(stateRecipes.recipes);
  }
});

const init = async () => {
  const getRecettes = await getData();
  stateRecipes.recipes.push(...getRecettes);
  getRecettes.forEach((recette) => {
    card(recette);
  });
  displayAllFilter(getUniqueIngredients, getRecettes, "ingredient");
  displayAllFilter(getUniquesAppliances, getRecettes, "appliances");
  displayAllFilter(getUniqueUstensils, getRecettes, "ustensiles");
  nbRecette.innerText = `${getRecettes.length} Recettes`;
};

init();
