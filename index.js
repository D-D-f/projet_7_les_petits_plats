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

const filterAllIngredients = (recettes) => {
  let allIngredients = [];
  recettes.forEach((recette) => {
    recette.ingredients.filter(
      (ingredient) =>
        allIngredients.includes(ingredient.ingredient.toLowerCase()) !== true &&
        allIngredients.push(ingredient.ingredient.toLowerCase())
    );
  });
};

const selectSearch = () => {
  const chevron = document.querySelector("#span");
  const div = document.querySelector(".menu");
  const ul = document.querySelector("ul");
  const input = document.querySelector(".input");

  chevron.addEventListener("click", () => {
    if (chevron.classList.contains("chevronDown")) {
      chevron.classList.remove("chevronDown");
      ul.classList.remove("ul_on");
      div.classList.remove("height");
      input.classList.remove("input_on");
    } else {
      chevron.classList.add("chevronDown");
      div.classList.add("height");
      ul.classList.add("ul_on");
      input.classList.add("input_on");
    }
  });
};

const init = async () => {
  const getRecettes = await getData();
  filterAllIngredients(getRecettes);
  selectSearch();
};
init();
