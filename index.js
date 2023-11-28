import express from "express";
import pkg from "express-ipfilter";
import addRequest from "./database/AddRequest.js";
import availableAPIrequest from "./database/AvailableAPI.js";
import retrieveUsers, { retrieveUserById } from "./database/retrieveUsers.js";
import retrieveRequest from "./database/retrieveUsers.js";
import { createRequestManager } from "./database/createRequestManager.js";
import {
  logRequestEndpoint,
  retrieveEndpointLog,
} from "./database/logEndpoint.js";
import { errorHandler } from "./error.handler.js";
import retrieveAllRequest from "./database/retrieveAllRequests.js";
import { deleteRequest } from "./database/deleteRequest.js";
const { IpFilter } = pkg;

const port = process.env.PORT || 3000;
const app = express();

app.use(IpFilter([process.env.WHITELIST_IP], { mode: "allow" }));

app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({ message: "Missing user id" });
    }

    const result = await createRequestManager(id);
    return res.status(201).json({ id: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

app.post("/insert", async (req, res) => {
  try {
    const input = req.body.input;
    const output = req.body.output;
    const user_id = req.body.user_id;

    const response = await addRequest({
      input: input,
      output: output,
      user_id: user_id,
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

app.post("/log", async (req, res) => {
  try {
    const { path, method } = req.body;
    const success = await logRequestEndpoint(path, method);
    if (!success) {
      return res.status(500).json({ error: "Failed to log request" });
    }
    return res.status(201).json({ message: "request logged" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/log", async (_req, res) => {
  try {
    const response = await retrieveEndpointLog();
    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await retrieveUsers({ user_id: user_id });
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

app.get("/all", async (_req, res) => {
  try {
    const response = await retrieveAllRequest();
    return res.json(response);
  } catch (error) {
    console.error("Error in request route", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await retrieveUserById(user_id);
    return res.json(response);
  } catch (error) {
    console.error("Error in request route", error);
    return res.status(500).send({ error: error });
  }
});

app.delete("/", async (req, res) => {
  try {
    const requestId = req.query.id;
    const userId = req.query.user_id;

    if (!requestId || !userId) {
      return res.status(400).send({ message: "Missing request id or user id" });
    }
    const response = await deleteRequest({
      requestId: requestId,
      userId: userId,
    });

    if (response) {
      return res.status(204).json();
    }
    return res.status(400).json({ error: "Failed to delete request" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.message });
  }
});

app.use("*", (_req, res) => {
  return res.status(404).send();
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening on PORT:", port);
});
