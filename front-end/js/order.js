main();
function main(){
    displayOrderId();
    
  
}

function displayOrderId() {
const orderNumber = document.querySelector(".orderNumber span");
const totalPrice = document.querySelector(".totalPrice span");

orderNumber.innerText = localStorage.getItem("orderId");
totalPrice.innerText =localStorage.getItem("total");
}


//vidage du localStorage pour pouvoir refaire des achats

localStorage.clear();