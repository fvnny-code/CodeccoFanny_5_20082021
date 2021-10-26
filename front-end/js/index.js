// Je déclare la fonction asynchrone auto-invoquée
(async function () {
  // je déclare la constante teddies dont la valeur est getProducts() et qui ne s'exécutera que lorsque la promesse sera tenue.
  const teddies = await getProducts();
  // Pour chaque ourson de la liste d'oursons
  for (teddy of teddies) {
    // on affiche l'ourson en question
    displayProduct(teddy);
    console.log(teddies)
  }
})();

//appel API
function getProducts() {
  return fetch('http://localhost:3000/api/teddies')
    .then((response) => {
      return response.json();
    })
    .then((teddies) => {
      return teddies;
    })
    .catch((error) => {
      alert(
        "La connexion au serveur n'a pu être effectuée. veuillez réessayer un peu plus tard..."
      );
    });
}
// Affichage des produits
function displayProduct(teddy) {
  const templateElement = document.getElementById("templateProduct");
  const cloneElement = document.importNode(templateElement.content, true);
  let container = document.getElementById("containerProduct");

  cloneElement.querySelector(".card__img").src = teddy.imageUrl;

  cloneElement.querySelector(".card__title").textContent = teddy.name;
  cloneElement.querySelector(".card__price").textContent = `${
    teddy.price / 100
  }.00 €`;
  
  cloneElement.querySelector(".btn").href += `?id=${teddy._id}`;

  container.appendChild(cloneElement);
}
