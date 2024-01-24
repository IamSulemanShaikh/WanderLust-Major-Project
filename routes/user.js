const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/user.js")


router.route("/signup")
.get(userController.renderSignupForm )
.post(wrapAsync(userController.signup))


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}), userController.Login
)



// logout 
router.get("/logout", userController.Logout);
module.exports = router;


 