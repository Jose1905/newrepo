const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build detail view by inventory ID
router.get("/:invId", invController.buildByInvId);

module.exports = router;