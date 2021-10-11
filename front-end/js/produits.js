(async function () {
  const teddyId = getTeddyId();
  const teddyData = await getTeddyData(teddyId);
  addEventListenerToCartBtn(teddyData);
  displayProduct(teddyData);
})();

function addEventListenerToCartBtn(teddyData) {
  let btn = document.getElementById("addToCartBtn");
  btn.addEventListener("click", () => {
    addToCart(teddyData);
  });
}

// Récupération de l'id dans les searchParams de l'url
function getTeddyId() {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  return id;
}
// Récupération des data dans l'API

function getTeddyData(teddyId) {
  return fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    .then((response) => {
      return response.json();
    })
    .then((teddyData) => {
      return teddyData;
      //   données API
    })
    .catch((error) => {
      alert(
        "La connexion au serveur n'a pu être effectuée. veuillez réessayer un peu plus tard..."
      );
    });
}

// affichage des données du produit selectionné dans l'API
function displayProduct(teddyData) {
  document.querySelector(".card__img").src = teddyData.imageUrl;
  document.querySelector(".card__title").textContent = teddyData.name;
  document.querySelector(".card__description").textContent =
    teddyData.description;
  document.querySelector(".card__price").textContent = `${
    teddyData.price / 100
  }.00 €`;
  document.querySelector(".choice").innerHTML += `<form class="card__form">
    <label for="quantity">Quantité :</label>
    <input class="teddyQuantity" type="number" name="teddyQuantity" value="1" min="1"/>
   </form>
   <form class="card__form">
    <label for="color--select">Couleur :</label>
    <select name="teddyColor" id="color--select" type="text"></select>
   </form>`;

  // options de sélection de couleurs
  const selectColors = teddyData.colors;

  //Récupération de la balise select contenant les balises option qui correspondent à la couleur
  const selectTag = document.querySelector("#color--select");
  for (let i = 0; i < selectColors.length; i++) {
    const option = document.createElement("option");
    option.value = `${selectColors[i]}`;
    option.innerHTML = `${selectColors[i]}`;
    selectTag.appendChild(option);
  }
}

// ajout dans le panier via localStorage

function addToCart(teddyData) {
  // récupération du panier déjà existant dans le localStorage
  let cart = JSON.parse(localStorage.getItem("CART")) || [];

  console.log(cart);

  let teddyInCart = false;
  for (const currentTeddy of cart) {
    if (currentTeddy._id == teddyData._id) {
      currentTeddy.quantity++;
      teddyInCart = true;
      break;
    }
  }

  if (teddyInCart == false) {
    teddyData.quantity = 1;
    cart.push(teddyData);
  }

  // console.log(teddyData);
  //  if (teddyId.quantity >= 1){
  //    teddyId.quantity ++;
  //  } else{
  //    teddyId.quantity =1;
  //  }

  // Sauvegarde du nouveau panier dans la localStorage
  console.log(cart);
  localStorage.setItem("CART", JSON.stringify(cart));
}
