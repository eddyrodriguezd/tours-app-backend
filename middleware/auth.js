const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticateUser = async (req, res, next) => {

  //const token = parseCookies(req)?.token;
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Inicie sesión para acceder a este recurso",
    });
  }

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("Couldn't authenticate user", err);
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res.status(401).json({
        sucess: false,
        message: "Token no válido",
      });
    }
    return res.status(500).json({
      sucess: false,
      message: "Error no controlado",
    });
  }

  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return res.status(401).json({
      sucess: false,
      message: "Reinicie sesión para acceder a este recurso",
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
