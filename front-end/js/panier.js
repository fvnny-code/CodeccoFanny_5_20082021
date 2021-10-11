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
        <th>quantité</th>
        <th>Couleur</th>
        <th>Prix</th>
        <th>Total</th>
        <th>Supprimer</th>
      </tr>
    </thead>
           
  `;
  
  for (i = 0; i < cartStorage.length; i++) {
  
    tableCart += `
    
    <tbody class="productTable"> 
      <tr>
        <td class="productName">${cartStorage[i].name}</td>
        <td class="productQuantity">${cartStorage[i].quantity}</td>
        <td class="productColor"></td>
        <td class="productPrice">${cartStorage[i].price/100}</td>
        <td class="productTotal"></td>

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
  deleteItem[i].addEventListener("click" , (event) => {
    event.preventDefault();

    deleteItem[i].parentElement.style.display ="none";
    updatedTab = cartStorage;
// méthode splice() : retirer l'élément cliqué du uptdatedTab
    updatedTab.splice([i], 1);
    cartStorage = localStorage.setItem("CART", JSON.stringify( updatedTab));

// message de mise à jour du localStorage
  alert("Ce produit a bien été retiré du panier");
  window.location.reload();

  })
}

// 2- VIDER LE PANIER //

// bouton "vider le panier" et "continuer vos achats"
 const clearCartBtn = `
    <button class="emptyCart btn btn_danger" aria-label="vider votre panier" type="button">Vider le panier
    </button>
 `;
 
if(cartStorage !== null) {
  displayCart.insertAdjacentHTML("afterend", clearCartBtn);
} 
const clearAllBtn = document.querySelector(".emptyCart");
// suppression de la clé CART dans le localStorage pour vider le panier
 clearAllBtn.addEventListener("click", (e)=>{
   e.preventDefault();
   //.clear pour vider le localStorage
   localStorage.clear();
   // boîte de dialogue
   alert("Le panier a bien été vidé")
   // rechargement de la page
   window.location.reload();
 })




// 3- CALCULER LE TOTAL DU PANIER //

// 4- FORMULAIRE //