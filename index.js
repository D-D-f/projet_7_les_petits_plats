const form = document.querySelector("#form_header");
const nbRecette = document.querySelector(".nbRecette");
const allCard = document.querySelector(".allCard > .row");
const allUl = document.querySelectorAll(".ul_list");

const allFilter = {
  arrayPrincipal: [],
  userValue: [],
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

// Filter for display ingredient
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

const filterName = () => {
  const names = allFilter.arrayPrincipal
    .flatMap((recipes) => recipes.name.toLowerCase().split(" "))
    .filter((name) => name.startsWith(allFilter.userValue[0].toLowerCase()));
  const uniqueNames = names.reduce((unique, name) => {
    if (!unique.includes(name)) {
      unique.push(name);
    }
    return unique;
  }, []);

  const searchName = allFilter.arrayPrincipal.filter((name) =>
    name.name.toLowerCase().split(" ").includes(uniqueNames.join(""))
  );
  return searchName;
};

const filterIngredient = () => {
  const filteredIngredients = allFilter.arrayPrincipal.flatMap((recipe) =>
    recipe.ingredients.filter((ingredient) =>
      ingredient.ingredient
        .toLowerCase()
        .includes(allFilter.userValue[0].toLowerCase())
    )
  );

  const filteredRecipes = allFilter.arrayPrincipal.filter((recipe) => {
    const matchedIngredients = recipe.ingredients.filter((ingredient) =>
      ingredient.ingredient
        .toLowerCase()
        .includes(allFilter.userValue[0].toLowerCase())
    );

    return matchedIngredients.length > 0;
  });

  return filteredRecipes;
};

const filterDescription = () => {
  const getIndex = allFilter.arrayPrincipal.map((item) => {
    return item.description
      .toLowerCase()
      .split(" ")
      .filter((item) => item.startsWith(allFilter.userValue[0]));
  });

  const index = getIndex
    .map((item, index) => item.length > 0 && index)
    .filter((item) => item !== false);

  const displayDescription = index.map(
    (item) => allFilter.arrayPrincipal[item]
  );
  return displayDescription;
};

// filter for name
const filterNameAndIngredientAndDescription = () => {
  const name = filterName();
  const ingredients = filterIngredient();
  const description = filterDescription();

  const arrayDisplay = [...name, ...ingredients, ...description];

  const uniqueObjects = arrayDisplay.reduce((acc, cur) => {
    const existingObj = acc.find((obj) => obj.id === cur.id);
    if (!existingObj) {
      acc.push(cur);
    }

    return acc;
  }, []);

  displayFilterCard(uniqueObjects);
};

// get value user
const getForm = (e) => {
  e.preventDefault();
  const getFormulaire = new FormData(form);
  const formValues = {};
  for (const [key, value] of getFormulaire.entries()) {
    if (value.length >= 3) {
      allFilter.userValue.push((formValues[key] = value.toLowerCase()));
      if (allFilter.userValue.length > 1) {
        allFilter.userValue.shift();
      }
      filterNameAndIngredientAndDescription();
    } else {
      allCard.innerHTML = "";
      allFilter.arrayPrincipal.forEach((recette) => {
        card(recette);
      });
      nbRecette.innerText = `${allFilter.arrayPrincipal.length} Recettes`;
      allUl.forEach((ul) => {
        ul.innerHTML = "";
      });
      displayAllInfo(allFilter.arrayPrincipal);
    }
  }
};

const init = async () => {
  const getRecettes = await getData();
  allFilter.arrayPrincipal.push(...getRecettes);

  getRecettes.forEach((recette) => {
    card(recette);
  });
  displayAllInfo(getRecettes);
  nbRecette.innerText = `${getRecettes.length} Recettes`;
  form.addEventListener("submit", getForm);
};

init();
