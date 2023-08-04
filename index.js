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
  return allIngredients;
};

const allAppliance = (recettes) => {
  let allAppliances = [];
  recettes.forEach((appliance) => {
    if (!allAppliances.includes(appliance.appliance)) {
      allAppliances.push(appliance.appliance);
    }
  });

  return allAppliances;
};

const filterAllUstensils = (recettes) => {
  let allUstensils = [];
  recettes.forEach((recette) => {
    recette.ustensils.filter(
      (ustensil) =>
        allUstensils.includes(ustensil.toLowerCase()) !== true &&
        allUstensils.push(ustensil.toLowerCase())
    );
  });
  return allUstensils;
};

const searchBar = (nameOfList, name) => {
  const section = document.querySelector(".allMenu");
  const menu = document.createElement("div");
  menu.classList.add("menu");
  const spanContainer = document.createElement("span");
  spanContainer.classList.add("allspan");
  const spanName = document.createElement("span");
  spanName.innerText = nameOfList;
  const spanChevron = document.createElement("span");
  spanChevron.id = "span";
  spanChevron.classList.add("chevron");
  spanContainer.append(spanName, spanChevron);
  spanChevron.innerHTML = "<i class='fa-solid fa-chevron-down'></i>";
  const divInput = document.createElement("div");
  divInput.classList.add("input");
  const input = document.createElement("input");
  divInput.appendChild(input);
  input.classList.add("input_select");
  input.setAttribute("type", "search");
  const ul = document.createElement("ul");

  name.forEach((name) => {
    const li = document.createElement("li");
    li.innerText = name;
    ul.append(li);
  });
  menu.append(spanContainer, divInput, ul);
  section.appendChild(menu);

  spanContainer.addEventListener("click", () => {
    if (spanContainer.classList.contains("chevronDown")) {
      spanContainer.classList.remove("chevronDown");
      ul.classList.remove("ul_on");
      menu.classList.remove("height");
      divInput.classList.remove("input_on");
    } else {
      spanContainer.classList.add("chevronDown");
      menu.classList.add("height");
      ul.classList.add("ul_on");
      divInput.classList.add("input_on");
    }
  });
};

const displayList = (ingredient, appareil, ustensile) => {
  searchBar("Ingrédients", ingredient);
  searchBar("Appareils", appareil);
  searchBar("Ustensiles", ustensile);
};

const init = async () => {
  const getRecettes = await getData();
  const ingredients = filterAllIngredients(getRecettes);
  const appliances = allAppliance(getRecettes);
  const ustensils = filterAllUstensils(getRecettes);
  displayList(ingredients, appliances, ustensils);
};
init();
