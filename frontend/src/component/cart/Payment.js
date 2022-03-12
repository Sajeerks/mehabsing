import React, { Fragment, useEffect, useRef ,useState} from "react";
import CheckoutSteps from "./CheckoutSteps.js";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import {PaymentElement} from '@stripe/react-stripe-js';
import { clearErrors, createOrder } from "../../actions/orderActions.js";
// import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector(state =>state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.neworder);


  const paymentData = {
      amount:Math.round(orderInfo.totalPrice*100) ,/// multiply with 100 to get in rs as stire show in paise
      email:"kk@kk.com"
  }
       
  const order = {
    shippingInfo,
    orderItems:cartItems, 

    itemsPrice:orderInfo.subtotal, 
    taxPrice:orderInfo.tax, 
    shippingPrice:orderInfo.shippingCharges, 
    totalPrice:orderInfo.totalPrice,

  }


  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    console.log("clidkeeeeeee")
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        // "/api/v1/payment/process",
        "/api/v1/paytry",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      console.log("client_secret :",client_secret)
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
  
      if (result.error) {
       /// console.log("resutlt error:", result)
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      }else{
         // console.log("resutl ELSE t:", result)
          if(result.paymentIntent.status ==="succeeded"){
            order.paymentInfo= {
              id:result.paymentIntent.id,
              status:result.paymentIntent.status,
            }
            dispatch(createOrder(order))
            navigate("/success")
          }else{
            console.log("resutl lastttttt t:", result)
              alert.error("There is an issue while processing payment")
          }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

useEffect(() => {
  if(error){
    alert.error(error) 
     dispatch(clearErrors())
  }


}, [error, dispatch.alert])





////////////////////////////////////////
// const amount = Math.round(orderInfo.totalPrice*100)

// const handleToken=(totalAmount, token)=>{
// try {
//     axios.post("/api/v1/paytry", {
//         token:token.id,
//         amount:totalAmount,
//         email:"kk@kk.com"
//     })
    
// } catch (error) {
//     console.log("eroor in payment font end", error)
// }
// }

// const makePayment =(token)=>{
// handleToken(amount, token)

// }

// const [stripeApiKey, setStripeApiKey] = useState("")
// const [secretKey, setSecretKey] = useState("")

// useEffect(()=>{
//     (async () => {
//         const { data } = await axios.get("/api/v1/stripeapikey");
//         setStripeApiKey(data.stripeApiKey);
//       })();
//       (async () => {
//         const { data } = await axios.get("/api/v1/secretKey");
//         setSecretKey(data.secretKey);
//       })();




// },[stripeApiKey])
// console.log("api key in payment item", stripeApiKey)
// console.log("secretKey  :", secretKey)
///////////////////////////////////////////
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">


      {/* <StripeCheckout
        token={makePayment}
      stripeKey={stripeApiKey}
    
      /> */}


       <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form> 
      </div>

      <div>4242 4242 4242 4242</div>
    </Fragment>
  );
};

export default Payment;
