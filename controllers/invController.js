const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by Inventory ID view
 * ************************** */

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleByInvId(inv_id)
  const grid = await utilities.buildVehicleDetailsGrid(data)
  let nav = await utilities.getNav()
  const vehicleMake = data[0].inv_make
  const vehicleModel = data[0].inv_model
  res.render("./inventory/detail", {
    title: vehicleMake + " " + vehicleModel,
    nav,
    data,
    grid,
  })
}

/* ***************************
 *  Build Inventory Management view
 * ************************** */
async function buildInvManagement (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build Add Classification view
 * ************************** */
async function buildAddClassification (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/addClassification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
 *  Process Classification addition
 * *************************************** */
async function addClassification(req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;  
  const regResult = await invModel.addClassification(
    classification_name
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added classification ${classification_name}.`,
    );
    res.status(201).render("/", {
      title: "Home",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("inventory/addClassification", {
      title: "Add Classification",
      nav,
    });
  }
}

/* ***************************
 *  Build error view
 * ************************** */
invCont.throwError = async function (req, res) {
  throw new Error("I am an intentional error");
}

module.exports = { invCont, addClassification, buildAddClassification, buildInvManagement };