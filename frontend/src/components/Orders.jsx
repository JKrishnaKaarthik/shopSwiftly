import React, { useEffect, useState } from "react";
import Header from "./Header";
import OrderItem from "./OrderItem";
import axios from "axios";

export default function Orders() {
  const [ordersData, setOrdersData] = useState();
  const username = localStorage.getItem("username");
  console.log(ordersData);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/orders/${username}`);
        setOrdersData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="orders-main">
      <Header />
      <h1 className="orders-heading">Your Orders</h1>
      <OrderItem />
    </div>
  );
}
