const form = document.querySelector("#form_header");
const nbRecette = document.querySelector(".nbRecette");
const allCard = document.querySelector(".allCard > .row");
const allUl = document.querySelectorAll(".ul_list");
const formUstensile = document.querySelector("#form_ustensile");
const formAppliance = document.querySelector("#form_appliance");
const formIngredient = document.querySelector("#form_ingredient");
const tagContainer = document.querySelector(".filter_all");

const stateRecipes = {
  recipesFilter: [],
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

const getForm = async (e) => {
  e.preventDefault();
  stateRecipes.searchBar = "";
  stateRecipes.searchBar = e.target[0].value;
  await updateArray();
  displayFilterCard(stateRecipes.recipesFilter);
  console.log(stateRecipes);
};

form.addEventListener("submit", getForm);

formUstensile.addEventListener("submit", (e) => {
  e.preventDefault();
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
  stateRecipes.recipesFilter.splice(0, stateRecipes.recipesFilter.length);
  stateRecipes.recipesFilter.push(...getRecettes);
  getRecettes.forEach((recette) => {
    card(recette);
  });
  displayFilter(stateRecipes.recipesFilter);
  nbRecette.innerText = `${getRecettes.length} Recettes`;
};

init();
