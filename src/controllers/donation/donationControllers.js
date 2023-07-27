import productsModel from "../../models/products.js";


const createProducts = async (req, res) => {
  try {
    const result = new productsModel({
      name: req.body.name,
      img: req.body.img,
      des: req.body.des,
      price: req.body.price,
      availableQu: req.body.availableQu,
      minimumQu: req.body.minimumQu,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteProducts = async (req, res) => {
  try {
    if (!(await productsModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await productsModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateProducts = async (req, res) => {
  try {
    const visitorBook = await productsModel.findByIdAndUpdate(
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

const getAllProducts = async (req, res) => {
  try {
    if (req.params.id) {
      const admissionEnquiries = await productsModel.findById(req.params.id);
      return res.status(200).send(admissionEnquiries);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const admissionEnquiries = await productsModel.find(
      query ? { school: query } : {}
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await productsModel.countDocuments(
      query ? { school: query } : {}
    );

    return res.status(200).send({
      data: admissionEnquiries,
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

export { createProducts, deleteProducts, UpdateProducts, getAllProducts };
