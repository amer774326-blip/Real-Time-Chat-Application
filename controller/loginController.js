const express = require("express");
const { getLogin, login, logout } = require("../../controller/loginController");
const decorateHtmlResponse = require("../../middlewares/common/decorateHtmlResponse");
const { loginValidators, loginValidationHandler } = require("../../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../../middlewares/common/checkLogin"); 

const router = express.Router();

const page_title = "Login";

router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

router.post(
  "/",
  decorateHtmlResponse(page_title),
  loginValidators,
  loginValidationHandler,
  login
);

router.delete("/", logout);

module.exports = router;
