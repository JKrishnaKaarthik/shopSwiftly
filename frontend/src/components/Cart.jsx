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
      itemcount: 0,
      product_id: 0,
    },
  ];
  const [cartDetails, setCartDetails] = useState([]);
  const [total, setTotal] = useState(0);

  const incrementCartItem = async (id) => {
    try {
      setCartDetails((prevCartDetails) =>
        prevCartDetails.map((item) =>
          item.cart_id === id
            ? { ...item, itemcount: item.itemcount + 1 }
            : item
        )
      );
      const result = await axios.put(`/api/cart/increment/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const decrementCartItem = async (id) => {
    try {
      setCartDetails((prevCartDetails) =>
        prevCartDetails.map((item) =>
          item.cart_id === id
            ? { ...item, itemcount: item.itemcount - 1 }
            : item
        )
      );
      const result = await axios.put(`/api/cart/decrement/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const username = localStorage.getItem("username");
  const deleteCartItem = async (id) => {
    try {
      const result = await axios.delete(`/api/cart/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //to convert the price of item from string to number and then add them and covert back to string
  useEffect(() => {
    function addNumbersWithCommas(numbersArray) {
      let numbers = [];
      numbersArray.map((item) => {
        numbers.push(
          parseInt(item.price.replace(/,/g, ""), 10) * item.itemcount
        );
      });
      const sum = numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const sumString = sum.toLocaleString();
      return sumString;
    }
    setTotal(addNumbersWithCommas(cartDetails));
  }, [cartDetails]);

  //to get the cart items from the database
  useEffect(() => {
    try {
      const getCartItems = async () => {
        const res = await axios.get(`/api/cart/${username}`);
        setCartDetails(res.data.data);
      };
      getCartItems();
    } catch (err) {
      console.log(err);
    }
  }, []);

  //to generate all the cart items to render on the page
  let cartElements;
  cartElements =
    cartDetails.length > 0 &&
    cartDetails.map((item) => {
      console.log(item);
      return (
        item.itemcount > 0 && (
          <CartItem
            key={item.cart_id}
            id={item.cart_id}
            image={item.image}
            title={item.title}
            price={item.price}
            itemcount={item.itemcount}
            productId={item.product_id}
            incrementCartItem={incrementCartItem}
            decrementCartItem={decrementCartItem}
            deleteCartItem={deleteCartItem}
          />
        )
      );
    });

  return (
    <div>
      <Header username={props.username} />
      <div className="cart-body">
        <div>{cartElements}</div>
        <CartSummary total={total} />
      </div>
    </div>
  );
}
