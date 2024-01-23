import React from "react";
import Header from "./Header";
import { cartData } from "../data/cartData";
import CartItem from "./CartItem";

export default function Cart(props) {
  console.log(cartData);
  return (
    <div>
      <Header username={props.username}/>
      <CartItem />
    </div>
  );
}
