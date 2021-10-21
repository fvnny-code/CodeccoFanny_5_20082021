displayOrderId();

function displayOrderId() {
  const orderNumber = document.querySelector(".orderNumber span");
  const totalPrice = document.querySelector(".totalPrice span");

  orderNumber.innerText = localStorage.getItem("responseOrder");
  totalPrice.innerText = localStorage.getItem("totalPrice");
  //vidage du localStorage pour pouvoir refaire des achats
  localStorage.clear();
}

//vidage du localStorage pour pouvoir refaire des achats
