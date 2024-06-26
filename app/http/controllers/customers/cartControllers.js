const cartControllers = () => {
  return {
    index(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrices: 0,
        };
      }
      const cart = req.session.cart;

      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty += 1;
        cart.totalPrices += req.body.price;
      } else {
        cart.items[req.body._id].qty += 1;
        cart.totalQty += 1;
        cart.totalPrices += req.body.price;
      }
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
};

export default cartControllers;
