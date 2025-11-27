// external dependencies
const express = require("express");

const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  addUsersValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");

// initiate the router
const router = express.Router();

// users page
router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUsersValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

module.exports = router;
