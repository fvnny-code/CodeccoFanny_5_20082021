(async function () {
    const teddyId = getTeddyId();
    const teddyData = await getTeddyData(teddyId);
    displayProduct(teddyData);
  })();
  
  function getTeddyId() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    return id;
  }
  
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
  
  function displayProduct(teddy) {
    document.querySelector(".card__img").src = teddy.imageUrl;
    document.querySelector(".card__title").textContent = teddy.name;
    document.querySelector(".card__description").textContent = teddy.description;
    document.querySelector(".card__price").textContent = `${teddy.price / 100}.00 €`;
  
  
    const selectColors = teddy.colors;
    const colorForm = document.querySelector("#color--select");
  
    for (let i = 0; i < selectColors.length; i++) {
        const option = document.createElement("option");
        option.value = `${selectColors[i]}`;
        option.innerHTML = `${selectColors[i]}`;
        document.querySelector("#color--select").appendChild(option);
        
    }
  
    
    
  }
  