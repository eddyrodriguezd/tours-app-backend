const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN_SECONDS * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, cookieOptions).json({
    sucess: true,
    user,
    token,
  });
};

module.exports = sendToken;
