import mySqlDatabase from "../databaseConnectionSQL.js";

export async function addRequest(data) {
  let preSQL = `
      insert into request (input, output, user_id)
      values (:input, :output, :user_id)
`;
  let params = {
    input: data.input,
    output: data.output,
    user_id: data.user_id,
  };

  try {
    const response = await mySqlDatabase.query(preSQL, params);
    console.log("Successfully added request :" + JSON.stringify(response));
    return true;
  } catch (err) {
    console.log("Error in AddRequest function :" + err);
    return false;
  }
}

export default addRequest;
