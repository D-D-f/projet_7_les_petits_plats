const form = document.querySelector("#form_header");
const nbRecette = document.querySelector(".nbRecette");
const allCard = document.querySelector(".allCard > .row");
const allUl = document.querySelectorAll(".ul_list");
const formUstensile = document.querySelector("#form_ustensile");
const formAppliance = document.querySelector("#form_appliance");
const formIngredient = document.querySelector("#form_ingredient");

const allFilter = {
  arrayPrincipal: [],
  userValue: [],
  searchUser: [],
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
  console.log(getUstensils);
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
  const name = filterName(
    allFilter.arrayPrincipal,
    allFilter.userValue.join("")
  );
  const ingredients = filterIngredients(
    allFilter.arrayPrincipal,
    allFilter.userValue.join("")
  );
  const description = filterDescription(
    allFilter.arrayPrincipal,
    allFilter.userValue.join("")
  );

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

formUstensile.addEventListener("submit", (e) => {
  e.preventDefault();
  filterUstensile(
    allFilter.searchUser.length > 0
      ? allFilter.searchUser
      : allFilter.arrayPrincipal,
    e.target[0].value
  );

  const search = filterUstensile(
    allFilter.searchUser.length > 0
      ? allFilter.searchUser
      : allFilter.arrayPrincipal,
    e.target[0].value
  );
  allFilter.searchUser.splice(0, allFilter.searchUser.length);
  allFilter.searchUser.push(...search);

  if (allFilter.searchUser.length > 0) {
    allCard.innerHTML = "";
    allFilter.searchUser.forEach((recette) => {
      card(recette);
    });
    nbRecette.innerText = `${allFilter.searchUser.length} Recettes`;
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(allFilter.searchUser);
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
});

formAppliance.addEventListener("submit", (e) => {
  e.preventDefault();
  filterAppliances(
    allFilter.searchUser.length > 0
      ? allFilter.searchUser
      : allFilter.arrayPrincipal,
    e.target[0].value
  );

  const search = filterAppliances(
    allFilter.searchUser.length > 0
      ? allFilter.searchUser
      : allFilter.arrayPrincipal,
    e.target[0].value
  );
  allFilter.searchUser.splice(0, allFilter.searchUser.length);
  allFilter.searchUser.push(...search);

  if (allFilter.searchUser.length > 0) {
    allCard.innerHTML = "";
    allFilter.searchUser.forEach((recette) => {
      card(recette);
    });
    nbRecette.innerText = `${allFilter.searchUser.length} Recettes`;
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(allFilter.searchUser);
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
});

formIngredient.addEventListener("submit", (e) => {
  e.preventDefault();
  filterIngredients(
    allFilter.searchUser.length > 0
      ? allFilter.searchUser
      : allFilter.arrayPrincipal,
    e.target[0].value
  );

  const search = filterIngredients(
    allFilter.searchUser.length > 0
      ? allFilter.searchUser
      : allFilter.arrayPrincipal,
    e.target[0].value
  );
  allFilter.searchUser.splice(0, allFilter.searchUser.length);
  allFilter.searchUser.push(...search);

  if (allFilter.searchUser.length > 0) {
    allCard.innerHTML = "";
    allFilter.searchUser.forEach((recette) => {
      card(recette);
    });
    nbRecette.innerText = `${allFilter.searchUser.length} Recettes`;
    allUl.forEach((ul) => {
      ul.innerHTML = "";
    });
    displayAllInfo(allFilter.searchUser);
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
});

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
