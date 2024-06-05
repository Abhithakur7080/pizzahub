import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentType: {
        type: String,
        default: 'COD'
    },
    status: {
        type: String,
        default: "Order_Placed"
    }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;