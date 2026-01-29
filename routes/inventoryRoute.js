const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail view by inventory ID
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// Route to build error page
router.get("/broken", utilities.handleErrors(invController.throwError));

module.exports = router;