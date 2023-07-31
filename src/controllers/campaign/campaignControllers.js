import compaignModel from "../../models/campaign.js";


const createCompaign = async (req, res) => {
  try {
    const result = new compaignModel({
      title: req.body.title,
      des: req.body.des,
      targetAmount: req.body.targetAmount,
      endDate: req.body.endDate,
      startDate: req.body.startDate,
      img: req.body.img,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteCompaign = async (req, res) => {
  try {
    if (!(await compaignModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await compaignModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateCompaign = async (req, res) => {
  try {
    const visitorBook = await compaignModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!visitorBook) {
      return res.status(404).send({ error: "Visitor book not found" });
    }
    return res.send(visitorBook);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllCompaign = async (req, res) => {
  try {
    if (req.params.id) {
      const product = await compaignModel.findById(req.params.id);
      return res.status(200).send(product);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const product = await compaignModel.find(
      query ? { school: query } : {}
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await compaignModel.countDocuments(
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

export { createCompaign, deleteCompaign, UpdateCompaign, getAllCompaign };
