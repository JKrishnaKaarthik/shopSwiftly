import React, { createElement } from "react";
import Header from "./Header";
import { cartData } from "../data/cartData";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

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
      <div className="cart-body">
        <div>{cartElements}</div>
        <CartSummary />
      </div>
    </div>
  );
}
