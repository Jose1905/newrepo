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

// Route to build add Inventory view
router.get("/addInventory", utilities.handleErrors(invController.buildAddInventory))

// Route to build error page
router.get("/broken", utilities.handleErrors(invController.throwError));

// Route to get and edit inventory items by classification id
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to get the inventory modify view
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildModifyInventory))

// Route to add the classification to the database
router.post(
    "/addClassification",
    invValidate.addClassificationRules(),
    invValidate.checkAddClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Route to add the inventory to the database
router.post(
    "/addInventory",
    invValidate.addInventoryRules(),
    invValidate.checkAddInventoryData,
    utilities.handleErrors(invController.addInventory)
)

// Route to update the inventory in the database
router.post(
    "/update/",
    invValidate.addInventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory))

module.exports = router;