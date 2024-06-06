import { loadStripe } from "@stripe/stripe-js";
import placedOrder from "./apiService.js";
import CardWidget from "./CardWidget.js";

const initStripe = async () => {
  const stripe = await loadStripe("pk_test_51POcgjL0oax3kOpJKF63E0mb2NyHbHnHh6ly063p9TPucHxLmdKzGjPQ6AC5Rrzv2nUcdkia8cAcTJnWPnOqX4Xt00p9XSNkKD");
  let card;
  const paymentType = document.querySelector("#payment-type");

  if (!paymentType) {
    return;
  }
  paymentType.addEventListener("change", (e) => {
    if (e.target.value === "card") {
      // display widget
      card = new CardWidget(stripe)
      card.mount();
    } else {
      card.destroy();
    }
  });
  // ajax call
  const paymentForm = document.querySelector("#payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let formData = new FormData(paymentForm);
      let formObj = {};
      for (let [key, value] of formData.entries()) {
        formObj[key] = value;
      }

      // for cash on delivery
      if (!card) {
        placedOrder(formObj);
        return;
      }

      // verify card
      const token = await card.createToken()
      formObj.stripeToken = token.id
      placedOrder(formObj);
    });
  }
};

export default initStripe;
