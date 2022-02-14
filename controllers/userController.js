const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "ejemplo de id", url: "ruta" },
    });

    res.status(201).json({
      sucess: true,
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
      error: err,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      message: " Por favor ingrese correo electrónico y contraseña",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      sucess: false,
      message: "Correo electrónico o contraseña no válidos",
    });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      sucess: false,
      message: "Correo electrónico o contraseña no válidos",
    });
  }

  sendToken(user, 200, res);
};
