const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const send = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dmorxcs1y",
  api_key: "872881161811572",
  api_secret: "kDnGezb0yopoQZ3SAyWObnQjBIA",
});

exports.registerUser = async (req, res) => {
  const { email, password, tipo, ...data } = req.body;
  const objBusiness = {
    name: data.name,
    business: {
      name: data.name,
      type: data.type,
      ruc: data.ruc,
    },
    address: data.address,
    location: data.location,
    province: data.province,
    region: data.region,
    district: data.district,
  };
  if (!email || !password) {
    res.status(400).json({
      sucess: false,
      error: "El  correo electrónico y contraseña son requeridos",
    });
  }
  try {
    const user = await User.create({
      email,
      password,
      tipo,
      ...objBusiness,
    });

    /*const config = {
      templateId: "d-dc9eeacf9528476ba89bf402bb5ad859",
      to: email,
      from: { email: "moranrosales23@hotmail.com", name: "Tours App" },
      dynamic_template_data: {
        name_user: email.split("@")[0],
        url_activar: `${
          process.env.FRONT_URL
        }/confirmacion/${user.getJWTToken()}`,
      },
    };
    send.sendEmailTemplates(config);*/
    sendToken(user, 201, res);
  } catch (err) {
    console.log(err);
    console.log("error");
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
      message: "Ingrese correo electrónico y contraseña",
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

exports.getMiself = async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({
    success: true,
    user,
  });
};

exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Desconectado",
  });
};
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "No hay ningún usuario con ese correo",
    });
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/resetPassword/${resetToken}`;

  const message = `su token de restablecimiento de contraseña es :- \n\n ${resetPasswordUrl} \n\n si no solicitó este restablecimiento, ignore este correo electrónico`;
  try {
    await send.sendEmail({
      email: user.email,
      subject: "Restablece su contraseña",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Correo electrónico enviado a ${user.email} con éxito`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(404).json({
      sucess: false,
      message: "No se pudo enviar el correo electrónico",
    });
  }
};
exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({
      success: false,
      message: "El token no es válido o ha caducado",
    });
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({
      sucess: false,
      message: "Las contraseñas no coinciden",
    });
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};

exports.confirmEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user.verify) {
      res.status(400).json({
        success: false,
        message: "Esta cuenta ya se encuentra verificada",
      });
    } else {
      user.verify = true;
      user.save();
      res.status(200).json({
        success: true,
        message: "Su cuenta se ha activado con éxito",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Usuario inválido" });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.find({ _id: id });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};
/**
 * @description: Update user data
 * @param {req} request object
 * @param {res} response object
 * @returns {json}}
 * @author : Brayanmf
 */
exports.updateProfile = async (req, res) => {
  const { ...data } = req.body;
  const { file } = req;
  if (!file) {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { ...data },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        user,
      });
    } catch {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }

  const size = file.size / 1024 / 1024;
  if (size > 3) {
    return res.status(400).json({
      success: false,
      message: "El archivo es muy grande",
    });
  }

  try {
    await cloudinary.uploader.destroy(req.user.avatar.public_id, {
      resource_type: "image",
    });
    const result = await cloudinary.uploader.upload(file.path, {
      tags: "user_profile",
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...data, avatar: { public_id: result.public_id, url: result.url } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  } finally {
    fs.unlinkSync(file.path);
  }
};
