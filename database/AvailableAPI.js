import mySqlDatabase from "../databaseConnectionSQL.js";

async function availableAPIrequest(data) {
  let preSQL = `
        select activated 
        from request_manager
        where user_id = ?
      `;
  let params = [data.user_id];

  try {
    const response = await mySqlDatabase.query(preSQL, params);
    console.log(
      "Successfully availableAPIrequest request :" + JSON.stringify(response[0])
    );
    const result = response[0][0];
    return { activated: result.activated === 1 ?? false };
  } catch (err) {
    console.log("Error in availableAPIrequest function :" + err);
    return err;
  }
}

export default availableAPIrequest;
