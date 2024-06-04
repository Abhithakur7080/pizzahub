import Order from "../../../models/order.js";
const AdminOrderControllers = (req, res) => {
  return {
    async index(req, res) {
      const orders = await Order.find(
        {
          status: { $ne: "completed" },
        },
        null,
        {
          sort: { createdAt: -1 },
        }
      )
        .populate("customerId", "-password")
        .exec();
      if (!orders) {
      }
      if (req.xhr) {
        return res.json(orders);
      } else {
        return res.render("admin/orders");
      }
    },
  };
};
export default AdminOrderControllers;
