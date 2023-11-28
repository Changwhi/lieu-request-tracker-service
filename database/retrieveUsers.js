import mySqlDatabase from "../databaseConnectionSQL.js";

async function retrieveUsers() {
  let preSQL = `
    SELECT user.user_id, user.username, user_type.user_type, numberOfRequest as request_count 
    FROM request_manager
    JOIN user ON user.user_id = request_manager.user_id
    JOIN user_type ON user.user_type_id = user_type.user_type_id
    GROUP BY user.username
  `;

  try {
    const response = await mySqlDatabase.query(preSQL);
    return response[0];
  } catch (err) {
    console.log("Error in retrieveTicketStatus function :" + err);
    return err;
  }
}

export const retrieveUserById = async (user_id) => {
  const query = `
    SELECT * FROM request WHERE user_id = :user_id 
  `;
  const params = { user_id };

  const results = await mySqlDatabase.query(query, params);
  return results[0];
};

export default retrieveUsers;
