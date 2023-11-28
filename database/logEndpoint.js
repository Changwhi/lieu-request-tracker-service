import mySqlDatabase from "../databaseConnectionSQL.js";

export const logRequestEndpoint = async (path, method) => {
  const query = `
    INSERT INTO endpoint_log (path, method)
    VALUES (:path, :method);
  `;

  const params = { path, method };

  const result = await mySqlDatabase.query(query, params);
  if (result[0].affectedRows !== 1) {
    return false;
  }
  return true;
};

export const retrieveEndpointLog = async () => {
  const query = `
    SELECT path, method, COUNT(*) as count 
    FROM endpoint_log 
    GROUP BY path
  `;
  const result = await mySqlDatabase.query(query);
  return result[0];
};
