const utilities = require(".");
const { body, validationResult } = require("express-validator");
const invModel = require("../models/inventory-model");
const validate = {};

/*  **********************************
 *  Add Classification Data Validation Rules
 * ********************************* */
validate.addClassificationRules = () => {
  return [
    // Classification name is required and must not contain spaces nor special characters.
    body("classification_name")
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9]+$/)
      .isLength({ min: 1 })
      .custom(async (classification_name) => {
        const classificationExists =
          await invModel.checkExistingClassification(classification_name);
        if (classificationExists) {
          throw new Error(
            "Classification exists. Please enter a different classification name",
          );
        }
      })
      .withMessage("Please provide a valid Classification name"), // on error this message is sent.
  ];
};

/*  **********************************
 *  Add Inventory Data Validation Rules
 * ********************************* */
validate.addInventoryRules = () => {
  return [
    // Make: min 3 characters
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters long"),

    // Model: min 3 characters
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters long"),

    // Description: 1–250 characters
    body("inv_description")
      .trim()
      .isLength({ min: 1, max: 250 })
      .withMessage("Description must be between 1 and 250 characters"),

    // Image path: min 3 characters
    body("inv_image")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Image path must be at least 3 characters"),

    // Thumbnail path: min 3 characters
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Thumbnail path must be at least 3 characters"),

    // Price: decimal or integer, must be positive
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    // Year: 4-digit year between 1800 and 2099
    body("inv_year")
      .isInt({ min: 1800, max: 2099 })
      .withMessage("Year must be a valid 4-digit year"),

    // Miles: integer between 0 and 3,250,000
    body("inv_miles")
      .isInt({ min: 0, max: 3250000 })
      .withMessage("Miles must be between 0 and 3,250,000"),

    // Color: required, letters & spaces only (optional tightening)
    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Color is required"),
  ];
};

/* ******************************
 * Check data and return errors in clasification data or continue
 * ***************************** */
validate.checkAddClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/addClassification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/* ******************************
 * Check data and return errors in inventory data or continue
 * ***************************** */
validate.checkAddInventoryData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let dropDown = await utilities.buildClassificationList();
    res.render("inventory/addInventory", {
      errors,
      title: "Add Inventory",
      nav,
      dropDown,
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

/* ******************************
 * Errors will be directed back to the edit view.
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
    inv_id,
  } = req.body;
  let errors = [];
  errors = validationResult(req);
  const itemName = `${inv_make} ${inv_model}`;
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let dropDown = await utilities.buildClassificationList();
    res.render("inventory/edit-Inventory", {
      errors,
      title: "Edit " + itemName,
      nav,
      dropDown,
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      inv_id,
    });
    return;
  }
  next();
};

module.exports = validate;
