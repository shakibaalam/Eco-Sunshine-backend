import CreateDonationModel from "../../models/createDonation.js";
import DonationModel from "../../models/donation.js";

const createCDonation = async (req, res) => {
  try {
    const donation = req.params.id
    const donationPart = await DonationModel.findById(donation)
    const user = req.user_id
    const result = new CreateDonationModel({
      title: donationPart.title,
      fund: donationPart.fund,
      user,
      donation,

    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllCDonation = async (req, res) => {
  try {
    const user = req.user_id
    if (req.params.id) {
      const product = await CreateDonationModel.findById(req.params.id);
      return res.status(200).send(product);
    }
    const product = await CreateDonationModel.find(
      { user: user }
    )


    return res.status(200).send({
      data: product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllUserDonation = async (req, res) => {
  try {
    if (req.params.id) {
      const product = await CreateDonationModel.findById(req.params.id);
      return res.status(200).send(product);
    }
    const product = await CreateDonationModel.find(
      {}
    )


    return res.status(200).send({
      data: product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export { createCDonation, getAllCDonation, getAllUserDonation };
