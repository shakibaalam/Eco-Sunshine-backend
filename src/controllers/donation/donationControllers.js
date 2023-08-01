
import DonationModel from "../../models/donation.js";


const createDonation = async (req, res) => {
  try {
    const result = new DonationModel({
      title: req.body.title,
      img: req.body.img,
      para: req.body.para,
      fund: req.body.fund,
      days: req.body.days,
      goal: req.body.goal,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteDonationcreateDonation = async (req, res) => {
  try {
    if (!(await DonationModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await DonationModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateDonationcreateDonation = async (req, res) => {
  try {
    const visitorBook = await DonationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!visitorBook) {
      return res.status(404).send({ error: "product book not found" });
    }
    return res.send(visitorBook);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllDonationcreateDonation = async (req, res) => {
  try {
    if (req.params.id) {
      const product = await DonationModel.findById(req.params.id);
      return res.status(200).send(product);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const product = await DonationModel.find(
      query ? { school: query } : {}
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await DonationModel.countDocuments(
      query ? { school: query } : {}
    );

    return res.status(200).send({
      data: product,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export { createDonation, deleteDonationcreateDonation, UpdateDonationcreateDonation, getAllDonationcreateDonation };
