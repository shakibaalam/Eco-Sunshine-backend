import EventRegModel from "../../models/eventRetester.js";

const registerEvent = async (req, res) => {
  try {
    const result = new EventRegModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      comments: req.body.comments,
      date: req.body.date,
      location: req.body.location,
      time: req.body.time,
      des: req.body.des,
      title: req.body.title,
      image: req.body.image,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getRegEvent = async (req, res) => {
  try {
    if (req.params.id) {
      const product = await EventRegModel.findById(req.params.id);
      return res.status(200).send(product);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const product = await EventRegModel.find(query ? { school: query } : {})
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await EventRegModel.countDocuments(
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

const getRegEventUser = async (req, res) => {
  try {
    const user = req.user_id;

    if (req.params.id) {
      // Assuming that req.params.id refers to the event ID
      const product = await EventRegModel.findOne({
        _id: req.params.id,
        user: user, // Filter by the logged-in user ID
      });
      return res.status(200).send(product);
    }

    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;

    const product = await EventRegModel.find(
      query ? { school: query, user: user } : { user: user } // Filter by the logged-in user ID
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await EventRegModel.countDocuments(
      query ? { school: query, user: user } : { user: user } // Filter by the logged-in user ID
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

const deleteRegEvent = async (req, res) => {
  try {
    if (!(await EventRegModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await EventRegModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const updateRegEvent = async (req, res) => {
  try {
    const visitorBook = await EventRegModel.findByIdAndUpdate(
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

export { registerEvent, getRegEvent, deleteRegEvent, updateRegEvent,getRegEventUser };
