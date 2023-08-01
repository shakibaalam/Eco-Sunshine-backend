// donation.mjs
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: [true, "title is required!"],
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
  fund: {
    type: String,
    required: [true, "fund name is required!"],
  },
  paymentConfirm: {
    type: String,
    required: false,
  }
});

const CreateDonationModel = mongoose.model('CreateDonation', donationSchema);

export default CreateDonationModel;
