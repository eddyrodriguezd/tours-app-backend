const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Inicie sesión para acceder a este recurso",
    });
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);

  if (!req.user) {
    return res.status(401).json({
      sucess: false,
      message: "reinicie sesión para acceder a este recurso",
    });
  }
  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.tipo)) {
      return res.status(401).json({
        status: 401,
        message: "No tienes permisos para acceder a este recurso",
      });
    }
    next();
  };
};
