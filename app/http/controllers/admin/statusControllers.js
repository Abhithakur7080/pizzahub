import Order from "../../../models/order.js";

const statusControllers = () => {
  return {
    async update(req, res) {
      const order = await Order.updateOne(
        { _id: req.body.orderId },
        { status: req.body.status }
      );
      if(!order){
        return res.redirect('/admin/orders')
      }
      return res.redirect('/admin/orders')
    },
  };
};
export default statusControllers;
