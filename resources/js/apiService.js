import axios from "axios";
import Noty from "noty";
const placedOrder = (formObj) => {
  axios
    .post("/orders", formObj)
    .then((res) => {
      new Noty({
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: res.data.message,
      }).show();
      setTimeout(() => {
        window.location.href = "/customers/orders";
      }, 1000);
    })
    .catch((err) => {
      new Noty({
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: err.res.data.message,
      }).show();
    });
};
export default placedOrder