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
        default: 'cod'
    },
    paymentStatus: {
      type: Boolean,
      default: false
    },
    status: {
        type: String,
        default: "order_placed"
    }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
