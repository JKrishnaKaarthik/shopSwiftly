import express from "express";
import cors from "cors";
import {
  getUser,
  createUser,
  getProducts,
  getProduct,
  getCartItems,
  addToCart,
  deleteCartItem,
  incrementCartCount,
  decrementCartCount,
  addOrder,
  getOrders,
  getSearchResults,
  getCategoryProduct,
  getProductBrandFromSearch,
  getFilteredProducts,
} from "./backend.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const port = process.env.PORT | 5000;

app.use('/', (req, res) => {
  res.send("server is running")
});

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

app.post("/cart", async (req, res) => {
  try {
    const result = await addToCart(req.body.username, req.body.productId);
    return res.json("successful data transfer");
  } catch (err) {
    console.log(err);
    return res.json("unsuccessful data transfer");
  }
});

app.delete("/cart/:productID", async (req, res) => {
  const productId = parseInt(req.params.productID);
  const result = await deleteCartItem(productId);
  return res.json("successful data transfer");
});

app.put("/cart/increment/:cartId", async (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const result = await incrementCartCount(cartId);
  return res.json("successful data transfer");
});

app.put("/cart/decrement/:cartId", async (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const result = await decrementCartCount(cartId);
  return res.json("successful data transfer");
});

app.post("/orders", async (req, res) => {
  const result = await addOrder(req.body.username, req.body.productId);
  return res.json(result);
});

app.get("/orders/:username", async (req, res) => {
  const result = await getOrders(req.params.username);
  return res.json(result);
});

app.get("/search/:query", async (req, res) => {
  const searchResult = await getSearchResults(req.params.query);
  const query = [searchResult];
  const searchBrands = await getProductBrandFromSearch(query[0]);
  return res.json({ productData: searchResult, brands: searchBrands });
});

app.get("/search/category/:category", async (req, res) => {
  const searchCategory = await getCategoryProduct(req.params.category);
  const query = [searchCategory];
  const searchBrands = await getProductBrandFromSearch(query[0]);
  return res.json({ productData: searchCategory, brands: searchBrands });
});

app.post("/search/productFilter", async (req, res) => {
  const productData = req.body.productData.productData;
  const searchRating = req.body.searchRating;
  const searchPrice = req.body.searchPrice;
  const searchBrands = req.body.searchBrands;
  const result = await getFilteredProducts(
    productData,
    searchRating,
    searchPrice,
    searchBrands
  );
  const brands = await getProductBrandFromSearch(result);
  return res.json({ productData: result, brands: brands });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
