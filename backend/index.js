import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getUsers, getUser, createUser } from "./backend.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

app.post('/', async (req, res) => {
  console.log(req.body)
  const [result] = await getUser(req.body.userName)
  console.log(result)
  if(result.username === req.body.userName && result.password === req.body.password) {
    return res.json("login data send");
    // return res.json({username : result.username})
  } else {
    return res.json("login unsuccessful");
  }
})

app.post("/signup", async (req, res) => {
  console.log(req.body);
  createUser(req.body);
  return res.json("successful data transfer");
});

// console.log(getUsers());

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
