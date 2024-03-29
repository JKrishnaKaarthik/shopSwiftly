import mysql from "mysql2";
import dotenv from "dotenv";
import { productData } from "./productData.js";
import natural from "natural";
dotenv.config({ path: ".env.local" });

const stemmer = natural.PorterStemmer;
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

export async function getCategoryProduct(categroyName) {
  const getCategoryProductQuery =
    "select p.product_id, p.image, p.brand, p.title, p.rating, p.description, p.price, p.ratingCount, p.productType, c.category_name\
    from products p, category c where p.category_id = c.category_id and category_name = ?";
  const [result] = await dp.query(getCategoryProductQuery, [categroyName]);
  return result;
}

export async function getCartItems(username) {
  const getCartItemsQuery =
    "select c.cart_id, p.image, p.title, p.price, c.itemcount, p.product_id from products p, users u, cart c where p.product_id = c.product_id and u.username = c.username and u.username=? order by addTime desc";
  const [result] = await dp.query(getCartItemsQuery, [username]);
  return result;
}

export async function getProductBrandFromSearch(searchResult) {
  try {
    const uniqueBrands = new Set();
    searchResult.forEach((product) => {
      uniqueBrands.add(product.brand);
    });

    const result = Array.from(uniqueBrands);
    return result;
  } catch (error) {
    console.error("Error fetching product brands:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
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
  return result;
}

export async function decrementCartCount(cartId) {
  const decrementCartCountQuery =
    "UPDATE cart SET itemcount = itemcount - 1 WHERE cart_id = ?";
  const [result] = await dp.query(decrementCartCountQuery, [cartId]);
  return result;
}

export async function addOrder(username, productId) {
  const addOrderQuery =
    "INSERT INTO orders (product_id, username) VALUES(?, ?)";
  const [result] = await dp.query(addOrderQuery, [productId, username]);
  return result;
}

export async function getOrders(username) {
  const getOrdersQuery =
    "select p.image, p.title, p.price, p.rating, p.brand, p.product_id, o.orderTime from products p, users u, orders o where p.product_id = o.product_id and u.username = o.username and u.username=? order by orderTime desc";
  const [result] = await dp.query(getOrdersQuery, [username]);
  return result;
}

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
    let tokens = (
      product.title +
      " " +
      product.description +
      " " +
      product.brand +
      " " +
      product.category
    )
      .split(" ")
      .map((token) => stemmer.stem(token).toLowerCase().trim());

    const dict = {};
    tokens.forEach((token) => {
      if (dict.hasOwnProperty(token)) dict[token] = dict[token] + 1;
      else dict[token] = 1;
    });
    for (const key in dict) {
      const [rows] = await dp.query(
        "SELECT COUNT(*) AS count FROM tokenf WHERE token = ?",
        [key]
      );
      const count = rows[0].count;
      if (count == 0) {
        await dp.query("INSERT INTO tokenf (token, frequency) VALUES (?, 1)", [
          key,
        ]);
      } else {
        dp.query(
          "UPDATE tokenf SET frequency = frequency + 1 WHERE token = ?",
          [key]
        );
      }
    }
    let n = tokens.length;
    for (const key in dict) {
      let tf = dict[key] / n;
      await dp.query(
        "INSERT INTO tfidf (token, productID, tf) VALUES (?, ?, ?)",
        [key, product.id, tf]
      );
    }
  }
}

export async function search(query) {
  let tokens = query
    .split(" ")
    .map((token) => stemmer.stem(token).toLowerCase().trim());
  const dict = {};
  tokens.forEach((token) => {
    if (dict.hasOwnProperty(token)) dict[token] += 1;
    else dict[token] = 1;
  });
  const res = {};
  for (const key in dict) {
    const [rows] = await dp.query(
      "SELECT productID, tf FROM tfidf WHERE token = ?",
      [key]
    );
    const tmp = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const [n] = await dp.query("SELECT COUNT(*) AS count FROM products");
      const count = n[0].count;
      const [termf] = await dp.query(
        "SELECT frequency FROM tokenf WHERE token = ?",
        [key]
      );
      const termff = termf[0].frequency;
      const idf = Math.log(count / termff);
      const score = row.tf * idf;
      tmp.push({
        productID: row.productID,
        score: score,
      });
    }
    for (let i = 0; i < tmp.length; i++) {
      if (res.hasOwnProperty(tmp[i].productID)) {
        res[tmp[i].productID] += tmp[i].score;
      } else {
        res[tmp[i].productID] = tmp[i].score;
      }
    }
  }
  const tmp1 = [];
  for (const key in res) tmp1.push([res[key], key]);
  tmp1.sort((a, b) => b[0] - a[0]);
  return tmp1;
}

export async function getSearchResults(query) {
  const productIDs = await search(query);
  const products = [];
  for (let i = 0; i < productIDs.length; i++) {
    const product = await getProduct(productIDs[i][1]);
    products.push(product);
  }
  return products;
  // const getProductsQuery = "select * from products where product_id in (?)";
  // const [result] = await dp.query(getProductsQuery, [
  //   productIDs.map((x) => x[1]),
  // ]);
  // return result;
}

// insertProductItems();

export async function getFilteredProducts(
  productData,
  searchRating,
  searchPrice,
  searchBrands
) {
  let filteredProducts = productData;
  searchPrice.startPrice = parseInt(searchPrice.startPrice);
  searchPrice.endPrice = parseInt(searchPrice.endPrice);
  if (searchRating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= searchRating
    );
  }
  if (searchPrice.startPrice > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = parseInt(product.price.replace(/,/g, ""));
      return price >= searchPrice.startPrice;
    });
  }
  if (searchPrice.endPrice > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = parseInt(product.price.replace(/,/g, ""));
      return price <= searchPrice.endPrice;
    });
  }
  if (searchBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      searchBrands.includes(product.brand)
    );
  }
  return filteredProducts;
}
