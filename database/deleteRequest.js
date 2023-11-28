import mySqlDatabase from "../databaseConnectionSQL.js";

export const deleteRequest = async ({ requestId, userId }) => {
  const query = `
    DELETE FROM request WHERE request_id = :requestId AND user_id = :userId
  `;
  const params = { requestId, userId };

  const results = await mySqlDatabase.query(query, params);
  return results[0].affectedRows === 1;
};
