let storedArticles = JSON.parse(localStorage.getItem("newArticle"));
console.log(storedArticles);

//création des éléments de la page panier.html
const cartMain = document.querySelector("#cartPage");
const emptyCartSection = document.querySelector("#emptyCart");
// si le panier est vide
if (storedArticles == null || storedArticles.length === 0) {
  const emptyCartDiv = document.createElement("div");
  emptyCartSection.appendChild(emptyCartDiv);
  emptyCartDiv.className = " container center";

  const emptyCartTitle = document.createElement("h3");
  emptyCartDiv.appendChild(emptyCartTitle);
  emptyCartTitle.className = "cart-title";
  emptyCartTitle.textContent = "Votre panier est bien vide !";
} else {
  //Si le panier contient des articles
  emptyCartSection.style.display = "none";
  const cartSection = document.querySelector("#cart");
  let i = 0;
  for (storedArticle of storedArticles) {
    const eachArticle = document.createElement("div");
    cartSection.appendChild(eachArticle);
    eachArticle.className = "cart__item";

    const articleInCart = document.createElement("p");
    eachArticle.appendChild(articleInCart);
    articleInCart.textContent =
      storedArticle.quantity +
      " " +
      storedArticle.articleName +
      " , " +
      storedArticle.articleColor;

    const articlePriceDiv = document.createElement("div");
    eachArticle.appendChild(articlePriceDiv);
    articlePriceDiv.className = "article__price";
    articlePriceDiv.id = i++;

    const price = document.createElement("p");
    articlePriceDiv.appendChild(price);
    price.textContent = storedArticle.articlePrice + " €";

    //création du bouton supprimer un article
    const deleteArticleBtn = document.createElement("button");
    articlePriceDiv.appendChild(deleteArticleBtn);
    deleteArticleBtn.className = "btn--danger";
    deleteArticleBtn.type = "submit";
    deleteArticleBtn.title = "supprimer cet article ?";

    const deleteBtnIcon = document.createElement("i");
    deleteArticleBtn.appendChild(deleteBtnIcon);
    deleteBtnIcon.className = "fas fa-trash-alt";
  }
  // récupération de l'article à supprimer
  let deleteArticleBtn = document.querySelectorAll(".btn--danger");
  for (let i = 0; i < deleteArticleBtn.length; i++) {
    deleteArticleBtn[i].addEventListener("click", (event) => {
      event.preventDefault();

      let id = event.target.closest(".article__price").id;
      // suppression de l'article dans le localStorage
      storedArticles.splice(id, 1);
      // mise à jour du localStorage
      localStorage.setItem("newArticle", JSON.stringify(storedArticles));
      JSON.parse(localStorage.getItem("newArticle"));

      alert("Cet article a bien été suprimé");
      window.location.href = "panier.html";
    });
  }

  // calcul du montant total
  let calculPrice = [];
  for (storedArticle of storedArticles) {
    let article = storedArticle.articlePrice;
    calculPrice.push(article);
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = calculPrice.reduce(reducer, 0);
  console.log(totalPrice);

  // affichage du prix total
  const total = document.createElement("p");
  cartSection.appendChild(total);
  total.className = "total";
  total.textContent = " Montant total de : " + totalPrice + " €";

  // création d'un bouton vider le panier

  const clearCartBtn = document.createElement("button");
  cartSection.appendChild(clearCartBtn);
  clearCartBtn.className = "btn btn--danger";
  clearCartBtn.type = "button";
  clearCartBtn.ariaLabel = "vider le panier";

  const clearCartLink = document.createElement("a");
  clearCartBtn.appendChild(clearCartLink);
  clearCartLink.href = "panier.html";
  clearCartLink.ariaLabel = "vider le panier";
  clearCartLink.textContent = "Vider le panier";
  clearCartLink.className = "clearCart__link";
  clearCartLink.style.color = "white";

  clearCartLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("newArticle");
    alert("Votre panier a bien été vidé.");
    window.location.href = "panier.html";
  });

  //création du formulaire
  const containerForm = document.querySelector(".container__form");
  const orderForm = document.createElement("form");
  containerForm.appendChild(orderForm);
  orderForm.className = "order__form";

  //vérification de la validité des champs du formulaire //

  //validité prénom, nom, ville
  function validateString(value) {
    return /^[a-zA-Z\-]+$/.test(value);
  }
  //validité adresse
  function validateAddress(value) {
    return /^[a-zA-Z0-9\s\,\''\-]*$/.test(value);
  }
  //validité code postal
  function validatePostCode(value) {
    return /^[0-9]{5}/g.test(value);
  }
  //validité email
  function validateEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }

  // ajout du champs prénom
  const divFirstName = document.createElement("div");
  orderForm.appendChild(divFirstName);
  divFirstName.className = "form flex-col";
  const labelFirstName = document.createElement("label");
  divFirstName.appendChild(labelFirstName);
  labelFirstName.setAttribute("type", "text");
  labelFirstName.textContent = "Prénom : ";

  const inputFirstName = document.createElement("input");
  divFirstName.appendChild(inputFirstName);
  inputFirstName.setAttribute("type", "text");
  inputFirstName.setAttribute("class", "form__input");
  inputFirstName.setAttribute("aria-label", "prénom");
  inputFirstName.setAttribute("value", "Fanny");
  inputFirstName.placeholder = "Prénom";
  inputFirstName.required = true;
  //vérification
  inputFirstName.addEventListener("change", (e) => {
    if (validateString(inputFirstName.value)) {
    } else {
      alert("un prénom ne contient ni chiffre ni symbole");
      e.preventDefault();
    }
  });

  // ajout du champs nom
  const divLastName = document.createElement("div");
  orderForm.appendChild(divLastName);
  divLastName.className = "form flex-col";
  const labelLastName = document.createElement("label");
  divLastName.appendChild(labelLastName);
  labelLastName.setAttribute("type", "text");
  labelLastName.textContent = "Nom : ";

  const inputLastName = document.createElement("input");
  divLastName.appendChild(inputLastName);
  inputLastName.setAttribute("type", "text");
  inputLastName.setAttribute("class", "form__input");
  inputLastName.setAttribute("aria-label", "nom");
  inputLastName.setAttribute("value", "Poui");
  inputLastName.placeholder = "Nom";
  inputLastName.required = true;
  //vérification
  inputLastName.addEventListener("change", (e) => {
    if (validateString(inputLastName.value)) {
    } else {
      alert("un nom ne contient ni chiffre ni symbole");
      e.preventDefault();
    }
  });

  // ajout du champs adresse :
  const divAddress = document.createElement("div");
  orderForm.appendChild(divAddress);
  divAddress.className = "form flex-col";
  const labelAddress = document.createElement("label");
  divAddress.appendChild(labelAddress);
  labelAddress.setAttribute("type", "text");
  labelAddress.textContent = "Adresse : ";

  const inputAddress = document.createElement("input");
  divAddress.appendChild(inputAddress);
  inputAddress.setAttribute("type", "text");
  inputAddress.setAttribute("class", "form__input");
  inputAddress.setAttribute("aria-label", "adresse");
  inputAddress.setAttribute("value", "2 rue des Troul");

  inputAddress.placeholder = "Adresse";
  inputAddress.required = true;
  //vérification
  inputAddress.addEventListener("change", (e) => {
    if (validateAddress(inputAddress.value)) {
    } else {
      alert("un nom ne contient pas de symbole");
      e.preventDefault();
    }
  });
  // ajout du champs code postal :
  const divPostCode = document.createElement("div");
  orderForm.appendChild(divPostCode);
  divPostCode.className = "form flex-col";
  const labelPostCode = document.createElement("label");
  divPostCode.appendChild(labelPostCode);
  labelPostCode.setAttribute("type", "text");
  labelPostCode.textContent = "Code Postal : ";

  const inputPostCode = document.createElement("input");
  divPostCode.appendChild(inputPostCode);
  inputPostCode.setAttribute("type", "text");
  inputPostCode.setAttribute("class", "form__input");
  inputPostCode.setAttribute("aria-label", "code postal");
  inputPostCode.setAttribute("value", "12345");
  inputPostCode.placeholder = "Code Postal";
  inputPostCode.required = true;
  //vérification
  inputPostCode.addEventListener("change", (e) => {
    if (validatePostCode(inputPostCode.value)) {
    } else {
      alert("un code postal doit contenir 5 chiffres");
      e.preventDefault();
    }
  });
  // ajout du champs ville :
  const divCity = document.createElement("div");
  orderForm.appendChild(divCity);
  divCity.className = "form flex-col";
  const labelCity = document.createElement("label");
  divCity.appendChild(labelCity);
  labelCity.setAttribute("type", "text");
  labelCity.textContent = "Ville : ";

  const inputCity = document.createElement("input");
  divCity.appendChild(inputCity);
  inputCity.setAttribute("type", "text");
  inputCity.setAttribute("class", "form__input");
  inputCity.setAttribute("aria-label", "ville");
  inputCity.setAttribute("value", "Trouloulou");
  inputCity.placeholder = "Ville";
  inputCity.required = true;
  //vérification
  inputCity.addEventListener("change", (e) => {
    if (validateString(inputCity.value)) {
    } else {
      alert("un nom de ville ne contient ni symbole ni chiffre");
      e.preventDefault();
    }
  });
  // ajout du champs email :
  const divEmail = document.createElement("div");
  orderForm.appendChild(divEmail);
  divEmail.className = "form flex-col";
  const labelEmail = document.createElement("label");
  divEmail.appendChild(labelEmail);
  labelEmail.setAttribute("type", "text");
  labelEmail.textContent = "Email : ";

  const inputEmail = document.createElement("input");
  divEmail.appendChild(inputEmail);
  inputEmail.setAttribute("type", "email");
  inputEmail.setAttribute("class", "form__input");
  inputEmail.setAttribute("aria-label", "Email");
  inputEmail.setAttribute("value", "me@voila.fr");

  inputEmail.placeholder = "email@mail.com";
  inputEmail.required = true;
  //vérification
  inputEmail.addEventListener("change", (e) => {
    if (validateEmail(inputEmail.value)) {
    } else {
      alert("Veuillez renseigner un mail valide, de type nom@mail.com");
      e.preventDefault();
    }
  });

  //création du bouton de validation de commande
  const divSubmit = document.createElement("div");
  containerForm.appendChild(divSubmit);
  divSubmit.className = "container__form center";
  const submitBtn = document.createElement("button");
  divSubmit.appendChild(submitBtn);
  submitBtn.className = "btn";
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("aria-label", "valider la commande");
  submitBtn.textContent = "valider la commande";

  // Si le formulaire est valide, envoi des données de la commande au serveur
  submitBtn.addEventListener("click", (e) => {
    if (
      validateString(inputFirstName.value) &&
      validateString(inputLastName.value) &&
      validateAddress(inputAddress.value) &&
      validatePostCode(inputPostCode.value) &&
      validateString(inputCity.value) &&
      validateEmail(inputEmail.value)
    ) {
      e.preventDefault();

      //envoi du montant total au localStorage
      localStorage.setItem("totalPrice", totalPrice);
      const storagePrice = localStorage.getItem("totalPrice");
      console.log(storagePrice);

      //création de l'objet "contact"
      let contact = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      };
      console.log(contact);

      //création du tableau "products"(= ID des nounours sur panier)
      let products = [];
      for (storedArticle of storedArticles) {
        let productsId = storedArticle.articleId;
        products.push(productsId);
      }
      console.log(products);

      //création de l'obet à envoyer, regroupant contact et produits :
      let send = {
        contact,
        products,
      };
      console.log(send);

      // envoi des données au serveur
      const post = async function (data) {
        try {
          let response = await fetch(
            "http://localhost:3000/api/teddies/order",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            let data = await response.json();
            console.log(data.orderId);
            localStorage.setItem("responseOrder", data.orderId);
            console.log(data.orderId);
            localStorage.removeItem("newArticle");
            window.location = "order.html";
          } else {
            e.preventDefault();
            console.error("Retour du serveur : ", response.status);
            alert("Erreur rencontrée : " + response.status);
          }
        } catch (error) {
          alert("Erreur : " + error);
        }
      };

      post(send);
    }
  });
}
