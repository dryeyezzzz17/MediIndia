const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, country,medicalhistory } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success:false,
        message: "Required fields are missing",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success:false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      country,
      medicalhistory
    });

    return res.status(201).json({
      success:true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "User registration failed.Try again!",
    });
  }
};

//LOGIN 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success:false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success:false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success:true,
      message:"Login successful",
      data:{
        token,
        user:{
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          country: user.country,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "Login failed.Try again!",
    });
  }
};
