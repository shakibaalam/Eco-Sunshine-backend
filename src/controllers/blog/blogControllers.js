import BlogModel from "../../models/blogs.js";

const createBlog = async (req, res) => {
  try {
    const today = new Date();
    const result = new BlogModel({
      title: req.body.title,
      img: req.body.img,
      content: req.body.content,
      date: today,
      views: req.body.views,
      comments: req.body.comments,
      author: req.body.author,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    if (!(await BlogModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await BlogModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateBlog = async (req, res) => {
  try {
    const visitorBook = await BlogModel.findByIdAndUpdate(
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

const getAllBlog = async (req, res) => {
  try {
    if (req.params.id) {
      const admissionEnquiries = await BlogModel.findById(req.params.id);
      return res.status(200).send(admissionEnquiries);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const admissionEnquiries = await BlogModel.find(
      query ? { school: query } : {}
    )
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await BlogModel.countDocuments(
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

export { createBlog, deleteBlog, UpdateBlog, getAllBlog };
