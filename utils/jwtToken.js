const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const expDate = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN_SECONDS * 1000
  );

  const httpOnlyCookieOptions = {
    expires: expDate,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("token", token, httpOnlyCookieOptions).json({
    sucess: true,
    user,
  });
};

module.exports = sendToken;
