// @ts-nocheck
const form = document.querySelector("#form_header");
const nbRecette = document.querySelector(".nbRecette");
const allCard = document.querySelector(".allCard > .row");
const formUstensile = document.querySelector("#form_ustensile");
const formAppliance = document.querySelector("#form_appliance");
const formIngredient = document.querySelector("#form_ingredient");
const tagContainer = document.querySelector(".filter_all");
const deleteBorder = document.querySelectorAll(".accordion-button");
const msgEmptyArray = document.querySelector(".msgArrEmpty");

// The object that manages each element of the filter
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

// Get recipes
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
    console.error(e);
  }
};

// Sends to the stateRecipes object, the value of the user to filter the recipes
const getForm = async (e) => {
  e.preventDefault();
  stateRecipes.searchBar = "";
  stateRecipes.searchBar = e.target.value;

  if (stateRecipes.searchBar.length > 2) {
    await updateArray();
    displayFilterCard(stateRecipes.recipesFilter);
  }
  if (stateRecipes.searchBar.length === 0) {
    await updateArray();
    displayFilterCard(stateRecipes.recipesFilter);
  }

  if (stateRecipes.recipesFilter.length === 0) {
    msgEmptyArray.textContent = `Aucune recette ne contient ${e.target.value} vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
  }
};

form.addEventListener("input", getForm);

formUstensile.addEventListener("input", (e) => {
  e.preventDefault();

  filterWords(stateRecipes.recipesFilter, "ustensils", e.target.value);
});

formAppliance.addEventListener("input", (e) => {
  e.preventDefault();
  filterWords(stateRecipes.recipesFilter, "appliance", e.target.value);
});

formIngredient.addEventListener("input", (e) => {
  e.preventDefault();
  filterWords(stateRecipes.recipesFilter, "ingredient", e.target.value);
});

for (const border of deleteBorder) {
  border.addEventListener("click", () => {
    border.style.border = "none";
    border.style.boxShadow = "none";
  });
}

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
