import axios from "axios";
import Noty from "noty";
import moment from "moment";
import initAdmin from "./admin.js";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  axios
    .post("/update-carts", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: "Item added to cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        progressBar: false,
        text: "Something went wrong",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}
//admin handling
initAdmin();

//change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order)

let time = document.createElement('small')

const updateStatus = (order) => {
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if(stepCompleted){
      status.classList.add('step_completed')
    }
    if(dataProp === order.status){
      stepCompleted = false
      time.innerText = moment(order.updatedAt).format('hh:mm A')
      status.appendChild(time)
      if(status.nextElementSibling){
        status.nextElementSibling.classList.add('current')
      }
    }
  })
};
updateStatus(order);

//socket.io
let socket = io()

//join
if(order){
  socket.emit('join', `order_${order._id}`)
}


//order_v8t37954028hgo8u4685895620
