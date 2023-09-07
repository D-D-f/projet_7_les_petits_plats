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
  recipesFilterIngredient: [],
  recipesFilterAppliances: [],
  recipesFilterUstensiles: [],
  searchBar: "",
  ingredient: [],
  appliances: [],
  ustensiles: [],
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
};

form.addEventListener("submit", getForm);

formUstensile.addEventListener("submit", (e) => {
  e.preventDefault();
  allUl.forEach((ul) => {
    ul.innerHTML = "";
  });
  filterWords(stateRecipes.recipesFilter, "ustensils", e.target[0].value);
});

formAppliance.addEventListener("submit", (e) => {
  e.preventDefault();
  allUl.forEach((ul) => {
    ul.innerHTML = "";
  });
  filterWords(stateRecipes.recipesFilter, "appliance", e.target[0].value);
});

formIngredient.addEventListener("submit", (e) => {
  e.preventDefault();
  allUl.forEach((ul) => {
    ul.innerHTML = "";
  });
  filterWords(stateRecipes.recipesFilter, "ingredient", e.target[0].value);
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
