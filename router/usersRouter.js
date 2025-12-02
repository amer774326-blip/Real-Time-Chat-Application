const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  removeUser
} = require("../controller/usersController");
const {
  addUserValidators,
  addUserValidationHandler
} = require("../middlewares/users/userValidators");
const {
  checkLogin,
  redirectLoggedIn,
  requireRole
} = require("../middlewares/common/checkLogin");

// users page
router.get("/", checkLogin, requireRole(["admin"]), getUsers);

// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

module.exports = router;
