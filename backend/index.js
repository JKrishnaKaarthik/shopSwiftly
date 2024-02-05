import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getUser, createUser, getProducts } from "./backend.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const port = 5000;

app.post("/", async (req, res) => {
  const [result] = await getUser(req.body.userName);
  if (
    result.username === req.body.userName &&
    result.password === req.body.password
  ) {
    return res.json({ message: "login data send", userName: result.username });
  } else {
    return res.json("login unsuccessful");
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  createUser(req.body);
  return res.json("successful data transfer");
});

app.get("/products", async (req, res) => {
  const result = await getProducts();
  return res.json(result);
});

app.get("/product/:id", async (req, res) => {
  console.log("got the product data");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
