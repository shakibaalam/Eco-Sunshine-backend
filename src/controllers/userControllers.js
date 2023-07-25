import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } =
    req.body;
  try {
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all the required fields",
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
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "USER",
      email: req.body.email,
    });
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
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
      firstName: user.firstName,
      lastName: user.lastName,
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
        expiresIn: "5d",
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
      firstName: user.firstName,
      lastName: user.lastName,
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

export { login, register };
