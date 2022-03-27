const sendToken = (user, statusCode, res) => {

  const token = user.getJWTToken();
  const expDate = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN_SECONDS * 1000
  );

  const httpOnlyCookieOptions = {
    expires: expDate,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  const normalCookieOptions = {
    expires: expDate,
    httpOnly: false
  };

  res.status(statusCode)
    .cookie("token", token, httpOnlyCookieOptions)
    .cookie("logged-in", true, normalCookieOptions)
    .json({
      sucess: true,
    });
};

module.exports = sendToken;
