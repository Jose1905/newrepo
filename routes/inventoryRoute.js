const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require('../utilities/inventory-validation')

// Route to build Inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build Detail view by inventory ID
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// Route to build Management view
router.get("/", utilities.handleErrors(invController.buildInvManagement))

// Route to build add Classification view
router.get("/addClassification", utilities.handleErrors(invController.buildAddClassification))

router.post(
    "/addClassification",
    invValidate.addClassificationRules(),
    invValidate.checkAddClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Route to build add Inventory view
// router.get("/addInventory", utilities.handleErrors(invController.buildAddInventory))

// Route to build error page
router.get("/broken", utilities.handleErrors(invController.throwError));

module.exports = router;