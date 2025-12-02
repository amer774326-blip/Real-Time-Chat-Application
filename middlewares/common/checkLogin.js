function checkLogin(req, res, next) {
  if (req.signedCookies.chat_application_cookie) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = {
  checkLogin,
};
