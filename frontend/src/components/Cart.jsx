import React, { createElement, useEffect, useState } from "react";
import Header from "./Header";
import { cartData } from "../data/cartData";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import axios from "axios";

export default function Cart(props) {
  const [cartDetails, setCartDetails] = useState(cartData || []);
  // console.log(cartDetails);

  const deleteCartItem = (id) => {
    setCartDetails((prevCartDetails) =>
      prevCartDetails.map((cartItem) =>
        id === cartItem.id ? { ...cartItem, isAdded: false } : cartItem
      )
    );
  };

  const username = localStorage.getItem("username");
  //write a get request using axios to get the cart items from the server with username from local storage and store it to a state
  useEffect(() => {
    const getCartItems = async () => {
      const res = await axios.get(`http://localhost:5000/cart/${username}`);
      setCartDetails(res.data.data);
    };
    getCartItems();
  }, []);

  console.log(localStorage.getItem("username"));

  const cartElements = cartDetails.map((item) => {
    console.log(item);
    return (
      <CartItem
        key={item.cart_id}
        id={item.cart_id}
        image={item.image}
        title={item.title}
        price={item.price}
        deleteCartItem={deleteCartItem}
      />
    );
  });

  return (
    <div>
      <Header username={props.username} />
      <div className="cart-body">
        <div>{cartElements}</div>
        <CartSummary />
      </div>
    </div>
  );
}
