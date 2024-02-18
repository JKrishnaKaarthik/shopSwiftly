import mysql from "mysql2";
import dotenv from "dotenv";
import { productData } from "./productData.js";
dotenv.config({ path: ".env.local" });

const dp = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers() {
  const [users] = await dp.query("select * from users");
  return users;
}

export async function getUser(username) {
  const getUserQuery = "select * from users where username = ?";
  const [user] = await dp.query(getUserQuery, [username]);
  return user;
}

export async function createUser(userDetails) {
  const createUserQuery = "INSERT INTO USERS VALUES(?, ?, ?, ?, ?, ?)";
  const result = await dp.query(createUserQuery, [
    userDetails.userName,
    userDetails.password,
    userDetails.firstName,
    userDetails.lastName,
    userDetails.email,
    userDetails.DOB,
  ]);
  const [userDetail] = await getUser(userDetails.userName);
  return userDetail;
}

export async function getProducts() {
  const getProductsQuery = "select * from products";
  const result = await dp.query(getProductsQuery);
  return result;
}

export async function getProduct(id) {
  const getProductQuery = "select * from products where product_id = ?";
  const [result] = await dp.query(getProductQuery, [id]);
  return result[0];
}

export async function getCartItems(username) {
  const getCartItemsQuery =
    "select c.cart_id, p.image, p.title, p.price, c.itemcount, p.product_id from products p, users u, cart c where p.product_id = c.product_id and u.username = c.username and u.username=? order by addTime desc";
  const [result] = await dp.query(getCartItemsQuery, [username]);
  return result;
}

export async function addToCart(username, productId) {
  productId = parseInt(productId);
  const addToCartQuery = "INSERT INTO cart (product_id, username) VALUES(?, ?)";
  const [result] = await dp.query(addToCartQuery, [productId, username]);
  return result;
}

export async function deleteCartItem(cartId) {
  const deleteCartItemQuery = "DELETE FROM cart WHERE cart_id = ?";
  const [result] = await dp.query(deleteCartItemQuery, [cartId]);
  return result;
}

export async function incrementCartCount(cartId) {
  const incrementCartCountQuery =
    "UPDATE cart SET itemcount = itemcount + 1 WHERE cart_id = ?";
  const [result] = await dp.query(incrementCartCountQuery, [cartId]);
  console.log(result);
  return result;
}

export async function decrementCartCount(cartId) {
  const decrementCartCountQuery =
    "UPDATE cart SET itemcount = itemcount - 1 WHERE cart_id = ?";
  const [result] = await dp.query(decrementCartCountQuery, [cartId]);
  return result;
}

export async function addOrder(username, productId){
  const addOrderQuery = "INSERT INTO orders (product_id, username) VALUES(?, ?)";
  const [result] = await dp.query(addOrderQuery, [productId, username]);
  return result;
}
// incrementCartCount();

async function insertProductItems() {
  const insertProductQuery =
    "INSERT INTO products (product_id, image, brand, title, rating, description, price, ratingCount, category_id, productType) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  for (let i = 0; i < productData.length; i++) {
    const product = productData[i];
    await dp.query(insertProductQuery, [
      product.id,
      product.image,
      product.brand,
      product.title,
      product.rating,
      product.description,
      product.price,
      product.ratingCount,
      product.category,
      product.productType,
    ]);
  }
}

// insertProductItems();
