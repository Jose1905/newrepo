const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

// Route to build Sign in view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to Register account
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Route to build register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

module.exports = router;