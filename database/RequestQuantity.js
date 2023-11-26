import mySqlDatabase from "../databaseConnectionSQL.js";

async function retrieveTicketStatus(data) {
  let preSQL = `
      select u.user_id, u.username, u.user_type_id, r.numberOfRequest
      from user u 
      left join request_manager r
      on u.user_id = r.user_id
      where u.user_id = ?
`;
  let params = [data.user_id]

  try {
    const response = await mySqlDatabase.query(preSQL, params);
    console.log("Successfully retrieveTicketStatus request :" + JSON.stringify(response[0]));
    return response[0];
  } catch (err) {
    console.log("Error in retrieveTicketStatus function :" + err)
    return err;
  }
}

export default retrieveTicketStatus;

