import cors from "cors";
import addRequest from "./database/AddRequest.js";
import retrieveRequest from "./database/RetrieveRequest.js";
import retrieveTicketStatus from "./database/RequestQuantity.js";
import availableAPIrequest from "./database/AvailableAPI.js";
import { POST, GET } from "./constants.js";
import express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    methods: POST, GET,
  }),
);

const validateRequest = (req, res, next) => {
  console.log(req.body.user_id)
  if (!req.body.user_id) {
    return res.status(400).send({ error: "No text provided" });
  }
  next();
};


app.post("/request/insert", validateRequest, async (req, res) => {
  try {
    const createdAt = req.body.createdAt;
    const input = req.body.input;
    const output = req.body.output;
    const user_id = req.body.user_id;

    const response = await addRequest({ input: input, output: output, user_id: user_id, createdAt: createdAt });
    if (response) {
      res.json({ "Success": "Your request has been stored in our database" });

    } else {
      res.json({ "Err": "Failed to add your request" });
    }
    return;
  } catch (error) {
    console.error("Error in request insert route", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/request", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    console.log(user_id)
    const response = await retrieveRequest({ user_id: user_id });
    const responseData = JSON.stringify(response);
    res.send(responseData)
  } catch (error) {
    console.error("Error in request route", error);
    return res.status(500).send({ error: error });
  }
});


app.get("/request/ticketStatus", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await retrieveTicketStatus({ user_id: user_id });
    res.send(response)
  } catch (error) {
    console.error("Error in request route", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/request/availableAPI", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await availableAPIrequest({ user_id: user_id });
    res.send(response)
  } catch (error) {
    console.error("Error in availableAPI route", error);
    return res.status(500).send({ error: error });
  }
});

app.listen(port, () => {
  console.log("Listening on PORT:", port);
});
