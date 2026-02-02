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
    body("classificaition_name")
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9]+$/)
      .isLength({ min: 1 })
      .custom(async (classificaition_name) => {
        const classificationExists =
        await invModel.checkExistingClassification(classificaition_name);
        if (classificationExists) {
        throw new Error("Classification exists. Please enter a different classification name");
        }
      })
      .withMessage("Please provide a valid Classification name"), // on error this message is sent.
  ];
};

/* ******************************
 * Check data and return errors or continue
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

module.exports = validate;
