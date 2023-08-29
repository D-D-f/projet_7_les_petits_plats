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
  searchRecipeFilter: [],
  searchUser: [],
  ingredient: "",
  appliance: "",
  ustensils: "",
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
  }
};

const filterIngredients = (recipes, wordUser) => {
  if (wordUser !== "") {
    const recipesWithUserIngredient = recipes.filter((recipe) => {
      return recipe.ingredients.some((item) =>
        item.ingredient.toLowerCase().includes(wordUser.toLowerCase())
      );
    });

    return recipesWithUserIngredient;
  }
};

const filterDescription = (recipes, wordUser) => {
  if (wordUser !== "") {
    const getDescription = recipes.filter((item) =>
      item.description.toLowerCase().includes(wordUser.toLowerCase())
    );

    return getDescription;
  }
};

const filterAppliances = (recipes, wordUser) => {
  if (wordUser !== "") {
    const filterAppliance = recipes.filter((elem) => {
      return elem.appliance.toLowerCase().includes(wordUser.toLowerCase());
    });
    return filterAppliance;
  }
};

const filterUstensile = (recipes, wordUser) => {
  if (wordUser !== "") {
    const recipesWithUserUstenfils = recipes.filter((recipe) => {
      return recipe.ustensils.some((item) =>
        item.toLowerCase().includes(wordUser)
      );
    });

    return recipesWithUserUstenfils;
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

const createTagFilter = (classe, texte) => {
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
  });
};

const filterAllIngredients = (recettes) => {
  const ul = document.querySelector(".ingredient");
  let allIngredients = [];
  recettes.forEach((recette) => {
    recette.ingredients.filter(
      (ingredient) =>
        !allIngredients.includes(ingredient.ingredient.toLowerCase()) &&
        allIngredients.push(ingredient.ingredient.toLowerCase())
    );
  });

  allIngredients.forEach((ingredient) => {
    let li = document.createElement("li");
    li.innerText = ingredient;
    ul.append(li);
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      allFilter.getFilter.push(li.innerText);
      allFilter.ingredient = li.innerText;
    });
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
    li.innerText = appliance.toLowerCase();
    ul.append(li);
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      allFilter.getFilter.push(li.innerText);
      allFilter.appliance = li.innerText;
    });
  });
};

// Filter for display ustensil
const filterAllUstensils = (recettes) => {
  const ul = document.querySelector(".ustensiles");
  let allUstensils = [];
  recettes.forEach((recette) => {
    recette.ustensils.filter(
      (ustensil) =>
        !allUstensils.includes(ustensil.toLowerCase()) &&
        allUstensils.push(ustensil.toLowerCase())
    );
  });

  allUstensils.forEach((ustensil) => {
    let li = document.createElement("li");
    li.innerText = ustensil;
    ul.append(li);
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      stateRecipes.ustensils = "";
      stateRecipes.ustensils = li.innerText;

      createTagFilter("tag_ustensil", li.innerText);

      const ustensils = filterUstensile(
        stateRecipes.searchRecipeFilter.length > 0
          ? stateRecipes.searchRecipeFilter
          : stateRecipes.recipes,
        ustensil
      );

      allCard.innerHTML = "";
      ustensils.forEach((recette) => {
        card(recette);
      });

      nbRecette.innerText = `${ustensils.length} Recettes`;
      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(ustensils);
    });
  });
};

// Function for display all filter
const displayAllInfo = (array, appliance, ustensil) => {
  filterAllIngredients(array);
  allAppliance(array, appliance);
  filterAllUstensils(array, ustensil);
};

// Create element for card
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

// CreateElement for Card
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

// display filter
const displayFilterCard = (arrayFilter) => {
  allCard.innerHTML = "";
  arrayFilter.map((filter) => {
    return card(filter);
  });
  for (const ul of allUl) {
    ul.innerHTML = "";
  }

  displayAllInfo(arrayFilter);
  nbRecette.innerText = `${arrayFilter.length} Recettes`;
};

// get value user
const getForm = (e) => {
  e.preventDefault();
  if (e.target[0].value.length >= 3) {
    stateRecipes.searchUser.shift();
    stateRecipes.searchUser.push(e.target[0].value);
    searchMainBar();
    allCard.innerHTML = "";
    stateRecipes.searchRecipeFilter.forEach((recette) => {
      card(recette);
    });
    nbRecette.innerText = `${stateRecipes.searchRecipeFilter.length} Recettes`;
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(stateRecipes.searchRecipeFilter);
  } else {
    stateRecipes.searchUser.shift();
    allCard.innerHTML = "";
    stateRecipes.recipes.forEach((recette) => {
      card(recette);
    });
    nbRecette.innerText = `${stateRecipes.recipes.length} Recettes`;
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(stateRecipes.recipes);
  }
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
      allCard.innerHTML = "";
      const appliance = filterAppliances(
        stateRecipes.searchRecipeFilter,
        e.target[0].value
      );

      appliance.forEach((recette) => {
        card(recette);
      });
      nbRecette.innerText = `${appliance.length} Recettes`;
      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(appliance);
    } else {
      allCard.innerHTML = "";
      const appliance = filterIngredients(
        stateRecipes.appliance,
        e.target[0].value
      );

      appliance.forEach((recette) => {
        card(recette);
      });
      nbRecette.innerText = `${appliance.length} Recettes`;
      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(appliance);
    }
  }
});

formIngredient.addEventListener("submit", (e) => {
  e.preventDefault();
  stateRecipes.ingredient = "";
  stateRecipes.ingredient = e.target[0].value;

  if (stateRecipes.ingredient !== "") {
    if (stateRecipes.searchRecipeFilter.length > 0) {
      allCard.innerHTML = "";
      const ingredient = filterIngredients(
        stateRecipes.searchRecipeFilter,
        e.target[0].value
      );

      ingredient.forEach((recette) => {
        card(recette);
      });
      nbRecette.innerText = `${ingredient.length} Recettes`;
      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(ingredient);
    } else {
      allCard.innerHTML = "";
      const ingredient = filterIngredients(
        stateRecipes.recipes,
        e.target[0].value
      );

      ingredient.forEach((recette) => {
        card(recette);
      });
      nbRecette.innerText = `${ingredient.length} Recettes`;
      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(ingredient);
    }
  }
});

const init = async () => {
  const getRecettes = await getData();
  stateRecipes.recipes.push(...getRecettes);
  getRecettes.forEach((recette) => {
    card(recette);
  });

  displayAllInfo(getRecettes);
  nbRecette.innerText = `${getRecettes.length} Recettes`;
};

init();
