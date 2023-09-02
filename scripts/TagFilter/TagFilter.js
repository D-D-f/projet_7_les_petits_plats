const deleteFilter = async () => {
  await updateArray();
  displayFilterCard(stateRecipes.recipesFilter);
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
  close.addEventListener("click", () => {
    if (div.className === "tag_ingredient") {
      stateRecipes.ingredient = "";
    } else if (div.className === "tag_appliances") {
      stateRecipes.appliances = "";
    } else if (div.className === "tag_ustensiles") {
      stateRecipes.ustensiles = "";
    }

    div.remove();
    deleteFilter();
  });
};
