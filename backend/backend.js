import mysql from "mysql2";
import dotenv from "dotenv";
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
  console.log(users);
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

export async function getCartItems() {
  const getCartItemsQuery =
    "select * from products p, users u, cart c where p.product_id = c.product_id and u.username = c.username order by addTime desc;";
  const [result] = await dp.query(getCartItemsQuery);
  console.log(result);
  return result;
}

