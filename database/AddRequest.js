import mySqlDatabase from "../databaseConnectionSQL.js";

async function addRequest(data) {
  let preSQL = `
      insert into request (input, output, user_id, createdAt)
      values (:input, :output, :user_id, :createdAt)
`;
  let params = {
    input: data.input,
    output: data.output,
    user_id: data.user_id,
    createdAt: data.createdAt,
  }

  try {
    const response = await mySqlDatabase.query(preSQL, params);
    console.log("Successfully added request :" + JSON.stringify(response));
    return true;
  } catch (err) {
    console.log("Error in AddRequest function :" + err)
    return false;
  }

}

export default addRequest;
