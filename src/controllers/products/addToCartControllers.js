import addToCartModel from "../../models/addToCart.js";
import productsModel from "../../models/products.js";


const createAddToCart = async (req, res) => {
  try {
    const product = req.params.id
    const productsDetails = await productsModel.findById(product)
    console.log(productsDetails);
    const user = req.user_id
    const result = new addToCartModel({
      name: productsDetails.name,
      price: productsDetails.price,
      img: productsDetails.img,
      quantity: req.body.quantity,
      user,
      product,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteAddToCart = async (req, res) => {
  try {
    if (!(await addToCartModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await addToCartModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateAddToCart = async (req, res) => {
  try {
    const visitorBook = await addToCartModel.findByIdAndUpdate(
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

const getAllAddToCart = async (req, res) => {
  try {
    const user = req.user_id
    if (req.params.id) {
      const admissionEnquiries = await addToCartModel.findById(req.params.id);
      return res.status(200).send(admissionEnquiries);
    }
    const admissionEnquiries = await addToCartModel.find(
      { user }
    )


    return res.status(200).send({
      data: admissionEnquiries
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export { createAddToCart, deleteAddToCart, UpdateAddToCart, getAllAddToCart };
