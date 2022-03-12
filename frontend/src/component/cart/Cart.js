import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart,removeFromCart } from "../../actions/cartActions";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
  //   const item = {
  //     product: "procut id",
  //     price: 200,
  //     name: "masha Allah",
  //     quantity: 2,
  //     image:
  //       "https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg",
  //   };
  const navigate = useNavigate()
  const dispatch = useDispatch(); 
  const { cartItems } = useSelector((state) => state.cart);
  const {user, isAuthenticated} =useSelector((state) => state.user);
  //console.log("userrr:", user)
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const removeItemsFromCart=(id)=>{
    dispatch(removeFromCart(id));
  }


const checkOutHandler =()=>{
  //console.log("checkout clicked")
  if(!isAuthenticated){
    //console.log("checkout clicked inside")
    navigate('/login')
 } else{
  navigate('/shipping')
 }
}



  //console.log("cartItems  :", cartItems)
  return (
    <Fragment>
            <MetaData title={`Cart -- ECOMMERCE`} />
      {cartItems.length === 0?(
        <div className="emptyCart">
         <RemoveShoppingCartIcon/>
         <Typography>NO product in your cart</Typography>
         <Link to="/products">View Products</Link>
        </div>
      ):(<Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer" key={item.product}>
              <CartItemCard item={item} deleteCardItems={removeItemsFromCart} />
              <div className="cartInput">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                >
                  -
                </button>
                <input type="number" readOnly value={item.quantity} />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}

        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`${cartItems.reduce((acc,item)=>acc+(item.quantity*item.price),0)}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkOutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>)}
    </Fragment>
  );
};

export default Cart;
