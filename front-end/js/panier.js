// récupérer les données du localStorage

let cartStorage = JSON.parse(localStorage.getItem("CART"));

console.log(cartStorage);

// 1- AFFICHER DES PRODUITS DANS LE PANIER //

const displayCart = document.querySelector(".container__table");

if (cartStorage === null || cartStorage == 0) {
  const emptyCart = `
    <section id="emptyCart" class="container">
     <div class="container cta">
      <h2 class="cart-title">
        Votre panier est tristement vide.<br>
       </h2>
       <a href="../index.html">
        <button class="btn btn--back" aria-label="commencer vos achats">Commencer vos achats</button>
      </a>
     </div>
   </section>`;
  displayCart.innerHTML = emptyCart;
} else {
  let tableCart = `

  <table>
    <thead>
      <tr>
        <th>Produit</th>
        <th>Quantité</th>
        <th>Couleur</th>
        <th>Prix</th>
        <th>Supprimer</th>
      </tr>
    </thead>
       
  `;

  for (i = 0; i < cartStorage.length; i++) {
    tableCart += `
   
    <tbody class="productTable"> 
      <tr>
        <td class="productName">${cartStorage[i].name}</td>
        <td class="productQuantity" >${cartStorage[i].quantity}</td>
        <td class="productColor">${cartStorage[i].colors[i]} </td>
        <td class="productPrice">${cartStorage[i].price / 100} €</td>
       
        <td><button class="delete-item btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>  
      </tr>
     </tbody> 
  
    `;
  }

  if (i === cartStorage.length) {
    displayCart.innerHTML = tableCart;
  }
}

// Supprimer un article du panier

let deleteItem = Array.from(document.querySelectorAll(".delete-item"));
let updatedTab = [];

// selectionner l'id de l'article à supprimer
for (let i = 0; i < deleteItem.length; i++) {
  deleteItem[i].addEventListener("click", (event) => {
    event.preventDefault();

    deleteItem[i].parentElement.style.display = "none";
    updatedTab = cartStorage;
    // méthode splice() : retirer l'élément cliqué du uptdatedTab
    updatedTab.splice([i], 1);
    cartStorage = localStorage.setItem("CART", JSON.stringify(updatedTab));

    // message de mise à jour du localStorage
    alert("Ce produit a bien été retiré du panier");
    window.location.reload();
  });
}

// 2- CALCULER LE TOTAL DU PANIER //

let cartTotal = [];
// on parcourt les prix dans la liste des produits du panier
for (let j = 0; j < cartStorage.length; j++) {
  let pricesInCart = cartStorage[j].price;
  // afficher les prix du panier dans le total du tableau
  cartTotal.push(pricesInCart);
  //console.log(cartTotal);
}

// additionner les montants dans le talbeau : methode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = cartTotal.reduce(reducer, 0);
//console.log(totalPrice);

// afficher le prix total dans le tableau
displayTotalPrice = `
     <h2 class="productTotal"> Total de ${totalPrice / 100} €</h2>   
`;
displayCart.insertAdjacentHTML("beforeend", displayTotalPrice);

// 3- VIDER LE PANIER //

// bouton "vider le panier" et "continuer vos achats"
const clearCartBtn = `
  <div class="clearCart">
    <button class="btn btn_danger" aria-label="vider votre panier" type="button">Vider le panier
    </button>
  </div>  
 `;

if (cartStorage !== null) {
  displayCart.insertAdjacentHTML("afterend", clearCartBtn);
}
const clearAllBtn = document.querySelector(".clearCart");
// suppression de la clé CART dans le localStorage pour vider le panier
clearAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //.clear pour vider le localStorage
  localStorage.clear();
  // boîte de dialogue
  alert("Le panier a bien été vidé");
  // rechargement de la page
  window.location.reload();
});

// 4- FORMULAIRE //

const displayForm = () => {
  // récupération du conteneur du formulaire
  const orderForm = document.querySelector(".container__form");
  //console.log(orderForm);

  // réupération des éléments du formulaire
  const form = `
    <form id="orderForm">
    <div class="form flex-col">
      <label class="form__label">Prénom</label>
      <input id="firstName" class="form__input"  aria-label="Prénom" type="text" placeholder="votre prénom" required value ="Fanny"/>
    </div>
    <div class="form flex-col">
      <label class="form__label">Nom</label>
      <input id="lastName" class="form__input" aria-label="nom" type="text" placeholder="votre nom"
      required value="Code"/>
    </div>
    <div class="form flex-col">
      <label class="form__label">Email</label>
      <input id="email" class="form__input" aria-label="email" type="text" placeholder="ex : orinico@mail.com"  value="me@voila.fr" required"/> 
    </div>
    <div class="form flex-col">
      <label class="form__label">Adresse</label>
      <input id="address" class="form__input" aria-label="adresse" type="text" placeholder="numéro, voie, code postal" required value="mon adresse"/> 
    </div>
    <div class="form flex-col">
      <label class="form__label">Code Postal</label>
      <input id="postalCode" class="form__input" aria-label="code postal" type="text" placeholder="75000" required value="12345"/> 
    </div>
    <div class="form flex-col">
      <label class="form__label">Ville</label>
      <input id="city" class="form__input" aria-label="ville" type="text" placeholder="ville" required value="ma Ville"/>
    </div>
    <div class="form flex-col terms">
    <input id="terms" aria-label="valider les conditions générales de vente" type="checkbox" value="" required checked/> 
    <label class="terms--check"> Accepter les termes et conditions générales de vente </label>
    </div>
     
    <div class="form container">
    <button id="order" class="btn" aria-label="valider la commande" type="submit"> 
      valider la commande
    </button>
    </div>
    </form>
`;
  //injection des éléments HTML "à la suite"
  orderForm.insertAdjacentHTML("afterend", form);
};

displayForm();

// récupération du bouton "valider la commande"
const validateOrderBtn = document.querySelector("#order");

//Ecouteur d'événements du bouton au clic
validateOrderBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // récupération des valeurs renseignées dans le formulaire
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    address: document.querySelector("#address").value,
    postalCode: document.querySelector("#postalCode").value,
    city: document.querySelector("#city").value,
  };
console.log(contact);
  // contrôle de validité des données utilisateur avec des REGEX

  const regExStringValueInput = (value) =>{
    return/^[a-zA-Z\-]+$/.test(value);
  };
  const regExPostalCodeInput = (value) =>{
    return/^[0-9]{5}/g.test(value);
  }
  const regExEmailInput = (value) =>{
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const regExAddressInput = (value) => {
    return /^[a-zA-Z0-9\s\,\''\-]*$/.test(value);
  };
  
  function firstNameValidity(){
    const firstNameInput = contact.firstName;
    if(regExStringValueInput(firstNameInput)){
      return true;
    } else {
      alert("Veuillez renseigner un prénom valide");
      return false;
    }
  }
  function lastNameValidity(){
    const lastNameInput = contact.lastName;
    if(regExStringValueInput(lastNameInput)){
      return true;
    } else {
      alert("Veuillez renseigner un prénom valide");
      return false;
    }
  }

  function emailValidity(){
    const emailInput = contact.email;
    if(regExEmailInput(emailInput)){
      return true;
    } else {
      alert('Un email doit contenir @ et ".". Veuillez renseigner un email valide');
      return false;
    }
  }

  function addressValidity(){
    const addressInput = contact.address;
    if(regExAddressInput(addressInput)){
      return true;
    } else {
      alert("une adresse ne doit pas contenir de caractères spéciaux. Veuillez renseigner une addresse valide");
      return false;
    }
  }

  function postalCodeValidity(){
    const postalCodeInput = contact.postalCode;
    if(regExPostalCodeInput(postalCodeInput)){
      return true;
    } else {
      alert("Un code postal ne doit contenir que 5 chiffes. Veuillez renseigner un code postal valide");
      return false;
    }
  }

  function cityValidity(){
    const cityInput = contact.city;
    if(regExAddressInput(cityInput)){
      return true;
    } else {
      alert("Un nom de ville ne doit contenir que les lettres. Veuillez renseigner un nom  de ville valide");
      return false;
    }
  }

  ////
 const products = [];
  for( let k = 0; k < cartStorage.length; k++) {
    let getOrderId = cartStorage[k]._id;
    products.push(getOrderId)
  }
console.log(products);
  // contrôle de validité du formulaire avant envoi dans le localStorage
if (firstNameValidity() && lastNameValidity() && emailValidity() && addressValidity() && postalCodeValidity() && cityValidity()) {
  // ajouter le formulaire dans le localStorage
  localStorage.setItem ("contact", JSON.stringify(contact));
} else {
  alert ('Veuillez remplir le formulaire corrrectement.');
  return 
}

// Objet des valeurs du formulaire de contact et du contenu du panier à envoyer au serveur
 const toSend = {
  contact,
  products,
 }
 const toSendJson = JSON.stringify(toSend);

 const order = fetch (`http://localhost:3000/api/teddies/order`, {
   method: 'POST',
   body: toSendJson,
   headers: { "Content-Type" : "application/json" },
  
 });
 
 // préparation du prix à afficher dans la page de confirmation de commande
 let orderTotalPrice = document.querySelector(".productTotal").innerText;

 //Réponse serveur
 order.then(async(res) => {
  try {
    const cartContent = await res.json();
  
    localStorage.setItem("orderId", cartContent.orderId);
    localStorage.setItem("total", orderTotalPrice);
    document.location.href = "order.html";
  } catch (e) {
    alert(error)
  }
 })

});
