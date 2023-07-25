import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, "title id required!"],
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
  img: {
    type: String,
    required: [true, "img name required!"],
  },
  para: {
    type: String,
    required: [true, "para name required!"],
  },
  fund: {
    type: String,
    required: [true, "fund name required!"],
  },
  days: {
    type: String,
    required: [true, "days name required!"],
  },
  goal: {
    type: String,
    required: [true, "goal name required!"],
  },
});

const DonationModel = mongoose.model("donation", DonationSchema);

export default DonationModel;
