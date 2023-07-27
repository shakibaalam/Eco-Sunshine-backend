import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "name id required!"],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  des: {
    type: String,
    required: [true, "des name required!"],
  },
  price: {
    type: String,
    required: [true, "price name required!"],
  },
  img: {
    type: String,
    required: [true, "img name required!"],
  },
  minimumQu: {
    type: String,
    required: [true, "minimumQu name required!"],
  },
  availableQu: {
    type: String,
    required: [true, "availableQu name required!"],
  }
});

const productsModel = mongoose.model("products", productsSchema);

export default productsModel;
