import mongoose from "mongoose";

const EventRegSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name id is required!"],
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
  time: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, "img is required!"],
  },
  phone: {
    type: String,
    required: [true, "phone name is required!"],
  },
  message: {
    type: String,
    required: [true, "message name is required!"],
  },
  comments: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  des: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

const EventRegModel = mongoose.model("EventReg", EventRegSchema);

export default EventRegModel;
