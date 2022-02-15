const { Schema, model } = require("mongoose");

const CategoriesSchema = Schema(
  {
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Categories", CategoriesSchema);
