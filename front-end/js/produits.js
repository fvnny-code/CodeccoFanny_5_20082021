const urlParams = new URL(document.location).searchParams;
const id = urlParams.get("id");
console.log(id);

const getTeddyData = async function () {
  // récupération des données du teddy sélectionné par son id
  try {
    let response = await fetch(`http://localhost:3000/api/teddies/` + id);
    if (response.ok) {
      let teddyId = await response.json();
      console.log(teddyId);

     
      const teddyMainSection = document.getElementById("product");
      
      // création de le div de l'ours
      const teddyFigure = document.createElement("figure");
      teddyMainSection.appendChild(teddyFigure);
      teddyFigure.className = "card";
      // ajout de l'image à la figure de l'ours
      const teddyImg = document.createElement("img");
      teddyFigure.appendChild(teddyImg);
      teddyImg.setAttribute("src", teddyId.imageUrl);
      teddyImg.setAttribute("alt", "ours en peluche " + teddyId.name);
      teddyImg.setAttribute("title", "ours en peluche " + teddyId.name);
      teddyImg.className = "card__img";
      //création de la figcaption d'infos du nounours
      const teddyFigcaption = document.createElement("figcaption");
      teddyFigure.appendChild(teddyFigcaption);
      teddyFigcaption.className = "card__body";
      // ajout du nom du nounours
      const teddyH3 = document.createElement("h3");
      teddyFigcaption.appendChild(teddyH3);
      teddyH3.className = "card__title";
      teddyH3.textContent = teddyId.name;
      //ajout de la description du produit
      const teddyDescription = document.createElement("p");
      teddyFigcaption.appendChild(teddyDescription);
      teddyDescription.className = "card__description center";
      teddyDescription.textContent = teddyId.description;

      //ajout du prix
      const teddyPrice = document.createElement("p");
      teddyFigcaption.appendChild(teddyPrice);
      teddyPrice.className = "card__price";
      teddyPrice.textContent = teddyId.price / 100 + " €";
      //création du formulaire d'options de couleurs
      const formColors = document.createElement("form");
      teddyFigcaption.appendChild(formColors);

      const formColorsDiv = document.createElement("div");
      formColors.appendChild(formColorsDiv);
      formColorsDiv.className = "colors__choice";

      const formColorsLabel = document.createElement("label");
      formColorsDiv.appendChild(formColorsLabel);
      formColorsLabel.textContent = "Options de couleurs : ";
      formColorsLabel.setAttribute(
        "for",
        "options de couleurs de " + teddyId.name
      );

      const selectColors = document.createElement("select");
      formColorsDiv.appendChild(selectColors);
      selectColors.setAttribute(
        "name",
        "Options deu couleurs de " + teddyId.name
      );
      selectColors.setAttribute("id", "color--select");
      selectColors.setAttribute("type", "text");

      //ajout des options de couleurs
      const colors = teddyId.colors;

      for (i = 0; i < colors.length; i++) {
        const selectOption = document.createElement("option");
        selectColors.appendChild(selectOption);
        selectOption.textContent = colors[i];
        selectOption.setAttribute("value", colors[i]);
      }

      //création du bouton panier
      let addToCart = document.createElement("button");
      teddyFigcaption.appendChild(addToCart);
      addToCart.type = "submit";
      addToCart.name = "add";
      addToCart.ariaLabel = "ajouter au panier";
      addToCart.id = "addToCartBtn";
      addToCartBtn.className = "btn btn--validate";
      addToCartBtn.textContent = "Ajouter au panier";

      // récupération des données et envoi à la page panier
      addToCart.addEventListener("click", (e) => {
        e.preventDefault();
        //stockage des données dans le localStorage
        let articlesInCart = {
          articleName: teddyId.name,
          articleId: teddyId._id,
          articleColor: selectColors.value,
          quantity: 1,
          articlePrice: teddyId.price / 100,
        };
        console.log(articlesInCart);

        let storedArticles = JSON.parse(localStorage.getItem("newArticle"));
        const articleColor = selectColors.value;
        if (storedArticles) {
          storedArticles.push(articlesInCart);
          localStorage.setItem("newArticle", JSON.stringify(storedArticles));
          console.log(storedArticles);

          if (
            window.confirm(
              teddyId.name +
                " " +
                articleColor +
                " a bien été ajouté. Souhaitez vous consulter votre panier ?"
            )
          ) {
            window.location.href = "panier.html";
          } else {
            window.location.href = "../index.html";
          }
        } else {
          storedArticles = [];
          storedArticles.push(articlesInCart);
          localStorage.setItem("newArticle", JSON.stringify(storedArticles));
          console.log(storedArticles);
          if (
            window.confirm(
              teddyId.name +
                " " +
                articleColor +
                " a bien été ajouté. Souhaitez vous consulter votre panier ?"
            )
          ) {
            window.location.href = "panier.html";
          } else {
            window.location.href = "../index.html";
          }
        }
      });
    } else {
      console.error("Retour du serveur : ", response.status);
      alert("Erreur rencontrée : " + response.status);
    }
  } catch (error) {
    alert("Erreur : " + error);
  }
};

getTeddyData();

