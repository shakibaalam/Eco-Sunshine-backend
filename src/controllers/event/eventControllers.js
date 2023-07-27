import addEventModel from "../../models/addEvent.js";

const createAddEvent = async (req, res) => {
  try {
    const result = new addEventModel({
      title: req.body.title,
      des: req.body.des,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      image: req.body.image,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllAddEvent = async (req, res) => {
  try {
    if (req.params.id) {
      const admissionEnquiries = await addEventModel.findById(req.params.id);
      return res.status(200).send(admissionEnquiries);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const startIndex = (page - 1) * limit;
    const admissionEnquiries = await addEventModel.find(
      query ? { school: query } : {}
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await addEventModel.countDocuments(
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

const deleteEvent = async (req, res) => {
    try {
      if (!(await addEventModel.findById(req.params.id))) {
        return res.status(400).send({
          message: "Invalid Id!",
        });
      }
      await addEventModel.findByIdAndDelete(req.params.id);
  
      return res.status(200).send({
        message: "Success",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };
  const UpdateEvent = async (req, res) => {
    try {
      const visitorBook = await addEventModel.findByIdAndUpdate(
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

export { createAddEvent, getAllAddEvent, deleteEvent, UpdateEvent };
