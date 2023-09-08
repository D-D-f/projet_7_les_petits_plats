const deleteFilter = async () => {
  await updateArray();

  const fusionArray = [
    ...stateRecipes.recipesFilterAppliances,
    ...stateRecipes.recipesFilterIngredient,
    ...stateRecipes.recipesFilterUstensiles,
  ];
  const idCounts = {};
  const duplicateObjects = [];

  fusionArray.forEach((element) => {
    const id = element.id;
    if (idCounts[id] === undefined) {
      idCounts[id] = 1;
    } else {
      idCounts[id]++;
    }
  });

  Object.keys(idCounts).forEach((id) => {
    if (idCounts[id] > 1) {
      const duplicates = fusionArray.filter(
        (element) => element.id === parseInt(id)
      );
      duplicateObjects.push(...duplicates);
    }
  });

  const displayArray = duplicateObjects.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  if (displayArray.length > 0) {
    displayFilterCard(displayArray);
  } else if (fusionArray.length > 0) {
    displayFilterCard(fusionArray);
  } else {
    displayFilterCard(stateRecipes.recipesFilter);
  }
};

const createTagFilter = (texte, name) => {
  const div = document.createElement("div");
  const text = document.createElement("span");
  const close = document.createElement("span");
  div.append(text, close);
  div.classList.add(`tag_${name}`);
  text.innerText = texte;
  close.innerHTML = "<i class='fa-solid fa-circle-xmark'></i>";
  tagContainer.appendChild(div);

  close.style.cursor = "pointer";
  close.addEventListener("click", async () => {
    if (div.className === "tag_ingredient") {
      const index = stateRecipes.ingredient.indexOf(texte);
      stateRecipes.ingredient.splice(index, index + 1);
    } else if (div.className === "tag_appliances") {
      const index = stateRecipes.appliances.indexOf(texte);
      stateRecipes.appliances.splice(index, index + 1);
    } else if (div.className === "tag_ustensiles") {
      const index = stateRecipes.ustensiles.indexOf(texte);
      stateRecipes.ustensiles.splice(index, index + 1);
    }

    div.remove();
    await deleteFilter();
  });
};
