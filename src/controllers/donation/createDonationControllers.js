import CreateDonationModel from "../../models/createDonation.js";

const createCDonation = async (req, res) => {
  try {
    const donation = req.params.id
    const user = req.user_id
    const result = new CreateDonationModel({
      title: req.body.title,
      fund: req.body.fund,
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
    if (req.params.id) {
      const product = await CreateDonationModel.findById(req.params.id);
      return res.status(200).send(product);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const product = await CreateDonationModel.find(
      query ? { school: query } : {}
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await CreateDonationModel.countDocuments(
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

export { createCDonation, getAllCDonation };
