import React, { useEffect, useState } from "react";
import Header from "./Header";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import axios from "axios";

export default function Cart(props) {
  const initalState = [
    {
      cart_id: 0,
      image: "",
      title: "",
      price: "",
    },
  ];

  const [cartDetails, setCartDetails] = useState(initalState || []);

  const deleteCartItem = (id) => {
    console.log(id);
    setCartDetails((prevCartDetails) =>
      prevCartDetails.map((cartItem) =>
        id === cartItem.id ? { ...cartItem, isAdded: false } : cartItem
      )
    );
  };

  const username = localStorage.getItem("username");
  useEffect(() => {
    const getCartItems = async () => {
      const res = await axios.get(`http://localhost:5000/cart/${username}`);
      setCartDetails(res.data.data);
    };
    getCartItems();
  }, []);

  const cartElements = cartDetails.map((item) => {
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
