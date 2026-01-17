const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../Utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

const userController = require("../controllers/users.js");



router
  .route("/signup")
               // signup page 
    .get(userController.renderSignupForm)
    .post( wrapAsync(userController.signup));

              // login page 
router
  .route("/login")
    .get(userController.renderLoginForm)
    .post( 
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect : "/login",
        failureFlash : true,
    }),
    userController.login
);

              // logout page

router.get("/logout", userController.logout );

module.exports = router;