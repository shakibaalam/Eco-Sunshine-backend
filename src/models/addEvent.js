// donation.mjs
import mongoose from 'mongoose';

const addEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required!"],
  },
  des: {
    type: String,
    required: [true, "des is required!"],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: [true, "time is required!"],
  },
  location: {
    type: String,
    required: [true, "location is required!"],
  },
  image: {
    type: String,
    required: [true, "image is required!"],
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
  }
});

const addEventModel = mongoose.model('addEvent', addEventSchema);

export default addEventModel;
