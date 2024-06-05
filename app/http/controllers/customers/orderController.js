import Order from "../../../models/order.js";
import moment from "moment";
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
      //validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address,
      });
      await order.save();
      if (order) {
        req.flash("success", "Order placed successfully");
        delete req.session.cart;
        return res.redirect("/customers/orders");
      } else {
        req.flash("error", "Something went wrong");
        return res.redirect("/cart");
      }
    },
    async show(req, res) {
      const order = await Order.findById(req.params.id);

      //Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order: order });
      }
      res.redirect('/')
    },
  };
};
export default orderControllers;
