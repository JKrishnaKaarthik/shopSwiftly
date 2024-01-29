import React, { createElement } from "react";
import Header from "./Header";
import { cartData } from "../data/cartData";
import CartItem from "./CartItem";

export default function Cart(props) {
  // console.log(cartData);
  const cartElements = cartData.map((item) => (
    <CartItem
      key={item.id}
      url={item.url}
      title={item.title}
      price={item.price}
    />
  ));
  return (
    <div>
      <Header username={props.username} />
      {cartElements}
    </div>
  );
}
