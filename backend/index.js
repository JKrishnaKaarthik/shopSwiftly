import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import { getUsers } from "./backend.js";

const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = 5000;

// getUsers()

app.post("/signup", (req, res) => {
  console.log(req.body);
  return res.json("successful data transfer");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
