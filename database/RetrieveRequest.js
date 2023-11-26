import mySqlDatabase from "../databaseConnectionSQL.js";

async function retrieveRequest(data) {
  let preSQL = `
      select * 
      from request
      where user_id = ?
`;
  let params = [data.user_id]

  try {
    const response = await mySqlDatabase.query(preSQL, params);
    console.log("Successfully retrieved request :" + JSON.stringify(response[0]));
    return response[0];
  } catch (err) {
    console.log("Error in retrieve request function :" + err)
    return ({err});
  }
}

export default retrieveRequest;

