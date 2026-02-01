const { text } = require("express");
const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs");
// const pswdBtn = document.querySelector("#pswdBtn"); Unable to retrieve the pswdBtn element

async function buildLogin(req, res) {
  const nav = await utilities.getNav();
  res.render("account/login", { title: "Login", nav });
}

async function buildRegister(req, res, next) {
  const nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
}

/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the registration.",
    );
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`,
    );
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }
}

// togglePassword function not working

/* function togglePassword(button) {
  const pswdInput = document.getElementById("account_password");
  const type = pswdInput.getAttribute("type");
  if (type === "password") {
    pswdInput.setAttribute("type", "text");
    button.innerHTML = "Hide Password";
  } else {
    pswdInput.setAttribute("type", "password");
    button.innerHTML = "Show Password";
  }
}

pswdBtn.addEventListener("click", togglePassword(pswdBtn)); */

module.exports = { buildLogin, buildRegister, registerAccount };
