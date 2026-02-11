// Toggle visibility of account links based on login status
let accountLink = document.getElementById("accountLink");
let logoutLink = document.getElementById("logoutLink");
let managementLink = document.getElementById("managementLink");
if (sessionStorage.getItem("loggedIn") === "true") {
  accountLink.hidden = true;
  logoutLink.hidden = false;
  managementLink.hidden = false;
} else {
  accountLink.hidden = false;
  logoutLink.hidden = true;
  managementLink.hidden = true;
}