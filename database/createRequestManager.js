import mySqlDatabase from "../databaseConnectionSQL.js";

export const createRequestManager = async (userId) => {
  const query = `
    INSERT INTO request_manager (user_id, activated)
    VALUES (:user_id, 0)
  `;

  const params = { user_id: userId };
  const result = await mySqlDatabase.query(query, params);
  return result[0].insertId;
};
