
import mySqlDatabase from "../databaseConnectionSQL.js";

async function availableAPIrequest(data) {
  let preSQL = `
        select activated 
        from request_manager
        where user_id = ?
      `;
  let params = [data.user_id]

  try {
    const response = await mySqlDatabase.query(preSQL, params);
    console.log("Successfully availableAPIrequest request :" + JSON.stringify(response[0]));
    return response[0];
  } catch (err) {
    console.log("Error in availableAPIrequest function :" + err)
    return err;
  }
}

export default availableAPIrequest;

