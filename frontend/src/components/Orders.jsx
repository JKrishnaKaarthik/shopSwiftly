import React, { useEffect, useState } from "react";
import Header from "./Header";
import OrderItem from "./OrderItem";
import axios from "axios";

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const username = localStorage.getItem("username");

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

  let orders;
  orders =
    ordersData.length > 0 &&
    ordersData.map((order, id) => (
      <OrderItem
        key={id}
        title={order.title}
        brand={order.brand}
        price={order.price}
        rating={order.rating}
        image={order.image}
        orderDate={order.orderTime}
      />
    ));

  return (
    <div className="orders-main">
      <Header />
      <h1 className="orders-heading">Your Orders</h1>
      <div className="orders">{orders}</div>
    </div>
  );
}
