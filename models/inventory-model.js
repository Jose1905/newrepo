const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name",
  );
}

/* ***************************
 *  Get inventory by classification id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id],
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

/* ***************************
 *  Get all Vehicle information by inventory_id
 * ************************** */
async function getVehicleByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.inv_id = $1`,
      [inv_id],
    );
    return data.rows;
  } catch (error) {
    console.error("getVehicleByInvId error " + error);
  }
}

/* *****************************
*   Add new Classification ID
* *************************** */
async function addClassification(classificaition_name){
  try {
    const sql = "INSERT INTO classification classification_name VALUES $1 RETURNING *"
    return await pool.query(sql, [classificaition_name])
  } catch (error) {
    return error.message
  } 
}

/* **********************
 *   Check for existing classification
 * ********************* */
async function checkExistingClassification(classification_name) {
  try {
    const sql = "SELECT * FROM account WHERE classification_name = $1"
    const email = await pool.query(sql, [classification_name])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getVehicleByInvId, addClassification, checkExistingClassification};