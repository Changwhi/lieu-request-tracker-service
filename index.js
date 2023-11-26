import cors from "cors";
import express from "express";
import pkg from "express-ipfilter";
import { GET, POST } from "./constants.js";
import addRequest from "./database/AddRequest.js";
import availableAPIrequest from "./database/AvailableAPI.js";
import retrieveTicketStatus from "./database/RequestQuantity.js";
import retrieveRequest from "./database/RetrieveRequest.js";
import { createRequestManager } from "./database/createRequestManager.js";
import { errorHandler } from "./error.handler.js";
const { IpFilter } = pkg;

const port = process.env.PORT || 3000;
const app = express();

app.use(IpFilter([process.env.WHITELIST_IP], { mode: "allow" }));

app.use(express.json());
app.use(
  cors({
    methods: POST,
    GET,
  })
);

app.post("/create", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({ error: "Missing user id" });
    }

    const result = await createRequestManager(id);
    return res.status(201).json({ id: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

app.post("/insert", async (req, res) => {
  try {
    const createdAt = req.body.createdAt;
    const input = req.body.input;
    const output = req.body.output;
    const user_id = req.body.user_id;

    const response = await addRequest({
      input: input,
      output: output,
      user_id: user_id,
      createdAt: createdAt,
    });
    if (response) {
      res.json({ Success: "Your request has been stored in our database" });
    } else {
      res.json({ Err: "Failed to add your request" });
    }
    return;
  } catch (error) {
    console.error("Error in request insert route", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/ticketStatus", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await retrieveTicketStatus({ user_id: user_id });
    return res.json(response);
  } catch (error) {
    console.error("Error in request route", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/availableAPI", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await availableAPIrequest({ user_id: user_id });
    return res.json(response);
  } catch (error) {
    console.error("Error in availableAPI route", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    console.log(user_id);
    const response = await retrieveRequest({ user_id: user_id });
    return res.json(response);
  } catch (error) {
    console.error("Error in request route", error);
    return res.status(500).send({ error: error });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening on PORT:", port);
});
