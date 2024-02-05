import React, { createElement, useState } from "react";
import Header from "./Header";
import { cartData } from "../data/cartData";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function Cart(props) {
  const [cartDetails, setCartDetails] = useState(cartData || []);

  const deleteCartItem = (id) => {
    setCartDetails((prevCartDetails) =>
      prevCartDetails.map((cartItem) =>
        id === cartItem.id ? { ...cartItem, isAdded: false } : cartItem
      )
    );
  };

  const cartElements = cartDetails.map((item) => {
    return item.isAdded ? (
      <CartItem
        key={item.id}
        id={item.id}
        url={item.url}
        title={item.title}
        price={item.price}
        deleteCartItem={deleteCartItem}
      />
    ) : null;
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
