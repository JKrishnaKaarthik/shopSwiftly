import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({path: '.env.local'});

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
  const getUserQuery = "select * from users where username = ?"
  const [user] = await dp.query(getUserQuery, [
    username,
  ]);
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
