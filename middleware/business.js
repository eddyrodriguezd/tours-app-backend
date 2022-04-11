const axios = require("axios");

exports.business = async (req, res, next) => {
  if (Object.keys(req.body).length === 1) {
    try {
      const { ruc } = req.body;
      const config = {
        headers: {
          Authorization: "Bearer " + process.env.RUC_KEY,
        },
      };
      const { data } = await axios.post(
        "https://api.peruapis.com/v1/ruc",
        { document: ruc },
        config
      );
      res.status(200).json({
        ok: true,
        data: data.data,
      });
    } catch (err) {
      res.status(400).json({
        ok: false,
        message: "El RUC no existe",
      });
    }
  } else {
    next();
  }
};
