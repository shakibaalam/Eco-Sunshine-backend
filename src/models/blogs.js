import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, "name id required!"],
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
  img: {
    type: String,
    required: [true, "img name required!"],
  },
  content: {
    type: String,
    required: [true, "content name required!"],
  },
  author: {
    type: String,
    required: [true, "author name required!"],
  },
 
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
});

const BlogModel = mongoose.model("blog", blogSchema);

export default BlogModel;
