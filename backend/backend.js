import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

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
  const [user] = await dp.query("select * from users where username = ?", [
    username,
  ]);
  return user;
}

export async function createUser(userDetails) {
  const createUserQuery = "INSERT INTO USERS VALUES(?, ?, ?, ?, ?, ?)";
  console.log(userDetails.userName);
  const result = await dp.query(createUserQuery, [userDetails.userName, userDetails.password, userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.DOB])
  console.log(result)
  console.log(getUser(userDetails.username))
}
