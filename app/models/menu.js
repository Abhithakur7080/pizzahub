import mongoose from "mongoose";

const { Schema, model } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const Menu = model("Menu", menuSchema);

export default Menu;
