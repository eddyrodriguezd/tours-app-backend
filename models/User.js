const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Por favor introduzca su correo electrónico"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Por favor, introduzca su contraseña"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default: "166246_zzulcy",
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dmorxcs1y/image/upload/v1649306884/166246_zzulcy.png",
    },
  },
  tipo: {
    type: String, //enum
    enum: ["admin", "user", "business"],
    default: "user",
  },
  phone: {
    type: String,
  },
  socialMedia: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  verify: {
    type: Boolean,
    default: false,
  },
  business: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },

    ruc: {
      type: String,
    },
  },

  address: {
    type: String,
  },
  location: {
    type: String,
  },

  province: {
    type: String,
  },
  region: {
    type: String,
  },
  district: {
    type: String,
  },

  webSite: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_SECONDS * 1000,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordToken = hashedToken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
