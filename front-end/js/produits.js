(async function(){
    const teddyId = getTeddyId();
    const teddyData = await  getTeddyData(teddyId);
  
    displayProduct(teddyData);
}) ()

function getTeddyId(){
    return new URL (window.location.href).searchParams.get("id")
}

function getTeddyData(teddyId){
    return fetch("http://localhost:3000/api/teddies/${teddyId}")
    .then ((response) => {
        return response.json();
    
    })
    .then ((teddyData)=>{
        return teddyData;
    });
    // .catch((error)=>{
    //     alert("La connexion au serveur n'a pu être effectuée. Veuillez essayer plus tard.")
    // });
}

function displayProduct(teddy) {
 
document.querySelector(".card__img").src = teddy.imageUrl;
document.querySelector(".card__title").textContent = teddy.name;
document.querySelector(".card__price").textContent = `${teddy.price / 100}.00 €`;



}



