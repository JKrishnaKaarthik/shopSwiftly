import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getUsers, getUser, createUser } from "./backend.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

app.post("/signup", (req, res) => {
  console.log(req.body);
  createUser(req.body);
  return res.json("successful data transfer");
});

// console.log(getUsers());

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
