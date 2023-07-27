import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const register = async (req, res) => {
  const { name, email, password, confirmPassword, role } =
    req.body;
  try {
    if (!email || !name || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all the required fields....",
      });
    }

    if (password === !confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    const users = await UserModel.findOne({ email });
    if (users) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
      email: req.body.email,
    });
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    await user.validate();
    await user.save();

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      userDetails,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const validatePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid Response!",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid User!",
      });
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password!",
      });
    }
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    await UserModel.findByIdAndUpdate(user._id);
    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      userDetails,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};


const getAllUser = async (req, res) => {
  try {
    const user = req.user_id
    const admissionEnquiries = await UserModel.find({})
    return res.status(200).send({
      data: admissionEnquiries
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await UserModel.updateOne(
      { _id: id }, 
      { $set: { role } }
    );

    if (updatedUser.n === 0) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send({
      message: "User role updated successfully"
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


export { login, register, getAllUser, updateUserRole };
