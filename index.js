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

const displayAllInfo = (array) => {
  filterAllIngredients(array);
  allAppliance(array);
  filterAllUstensils(array);
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
  section.appendChild(article);
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

const init = async () => {
  const getRecettes = await getData();
  const nbRecette = document.querySelector(".nbRecette");
  displayAllInfo(getRecettes);
  nbRecette.innerText = `${getRecettes.length} Recettes`;

  getRecettes.forEach((recette) => {
    card(recette);
  });
};
init();
