import Order from "../../../models/order.js";
import moment from "moment";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

const orderControllers = () => {
  return {
    async index(req, res) {
      const orders = await Order.find(
        {
          customerId: req.user._id,
        },
        null,
        {
          sort: { createdAt: -1 },
        }
      );
      res.header(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale-0, post-check=0, pre-check=0"
      );
      res.render("customers/orders", { orders: orders, moment: moment });
    },
    async store(req, res) {
      // Validate request
      const { phone, address, stripeToken, paymentType } = req.body;
      if (!phone || !address) {
        return res.status(422).json({ message: "All fields are required" });
      }

      let order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address,
      });

      try {
        order = await order.save();
        const placedOrder = await Order.populate(order, { path: "customerId" });

        // Stripe payment
        if (paymentType === "card") {
          try {
            // Convert token to source
            const source = await stripe.sources.create({
              type: 'card',
              token: stripeToken,
            });
            await stripe.charges.create({
              amount: req.session.cart.totalPrices * 100,
              currency: "inr",
              source: source.id,
              description: `Pizza order: ${placedOrder._id}`,
            });

            placedOrder.paymentStatus = true;
            placedOrder.paymentType = paymentType
            await placedOrder.save();

            // Emit orderPlaced event
            const eventEmitter = req.app.get("eventEmitter");
            eventEmitter.emit("orderPlaced", placedOrder);
            // Clear the cart
            delete req.session.cart;
            return res.json({ message: "Payment successful, Order placed successfully" });
          } catch (paymentError) {
            console.error("Payment error:", paymentError);
            delete req.session.cart;
            return res.json({ message: "Order placed but Payment failed, You can pay at delivery time." });
          }
        } else {
          // Emit orderPlaced event
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("orderPlaced", placedOrder);
          // Clear the cart
          delete req.session.cart;
          return res.json({ message: "Order placed successfully" });
        }
      } catch (error) {
        // Clear the cart
        delete req.session.cart;
        return res.status(500).json({ message: "Something went wrong" });
      }
    },
    async show(req, res) {
      const order = await Order.findById(req.params.id);

      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order: order });
      }
      res.redirect("/");
    },
  };
};

export default orderControllers;
