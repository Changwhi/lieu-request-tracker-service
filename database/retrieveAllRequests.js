import mySqlDatabase from "../databaseConnectionSQL.js";

async function retrieveAllRequest() {
  let preSQL = `
      SELECT request_id, user.user_id, username, user_type.user_type, input, output, createdAt
      from request
      JOIN user ON request.user_id = user.user_id
      JOIN user_type ON user.user_type_id = user_type.user_type_id
`;

  try {
    const response = await mySqlDatabase.query(preSQL);
    return response[0];
  } catch (err) {
    console.log("Error in retrieve request function :" + err);
    return { err };
  }
}

export default retrieveAllRequest;
