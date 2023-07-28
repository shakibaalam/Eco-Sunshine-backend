// donation.mjs
import mongoose from 'mongoose';

const compaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required!"],
  },
  des: {
    type: String,
    required: [true, "des is required!"],
  },
  targetAmount: {
    type: String,
    required: [true, "targetAmount is required!"],
  },
  endDate: {
    type: String,
    required: [true, "endDate is required!"],
  },
  startDate: {
    type: String,
    required: [true, "startDate is required!"],
  },
  img: {
    type: String,
    required: [true, "img is required!"],
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
});

const compaignModel = mongoose.model('compaign', compaignSchema);

export default compaignModel;
