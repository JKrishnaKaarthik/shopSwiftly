import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getUser,
  createUser,
  getProducts,
  getProduct,
  getCartItems,
} from "./backend.js";

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
  const result = await getProduct(req.params.id);
  return res.json(result);
});

app.get("/cart/:username", async (req, res) => {
  try {
    const result = await getCartItems(req.params.username);
    return res.json({ status: "success", data: result });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to retrieve cart items" });
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
