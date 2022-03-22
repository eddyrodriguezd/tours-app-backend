const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticateUser = async (req, res, next) => {
  const token = parseCookies(req)?.token;

  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Inicie sesión para acceder a este recurso",
    });
  }

  console.log('token', token);
  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log('Couldn\'t authenticate user', err);
    if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
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

const parseCookies = (request) => {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach((cookie) => {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}