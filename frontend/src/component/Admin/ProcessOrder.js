import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors ,updateOrder} from "../../actions/orderActions";
import Loader from "../layout/loader/Loader.js";
import "./processOrder.css";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const {error:updateError, isUpdated} = useSelector((state) => state.updateOrderState);
  console.log("order in process order :", order )
  const updateOrderStatus = (e) => {
    e.preventDefault();
    
    const myform = new FormData();
    myform.set("status", status);

    dispatch(updateOrder(id,myform))


  };

  useEffect(() => {
    if (error) { 
      console.log("error",error)
      alert.error(error);
      dispatch(clearErrors());
      //setStatus("")
      //navigate("/admin/dashboard")
    
    }
    if (updateError) {
      console.log("updateError",updateError)
      alert.error(updateError);
      dispatch(clearErrors());
      console.log("updateError",updateError)
      // setStatus("")
     // navigate("/admin/dashboard")
   
    }

    if(isUpdated){
      alert.success("the Order has benn updated")
     dispatch({type:UPDATE_ORDER_RESET})
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id, navigate, alert,error, updateError, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"UPDATE ORDER"} />
          <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
              <div className="confirmOrderPage"
               style={{
                 display:order.orderStatus === "Delivered"?"block":"grid"
               }}
              >
                <div>
                  <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmshippingAreaBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                  <div className="confirmCartItems">
                    <Typography>Your order Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            <span>
                              {item.quantity} X ₹{item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div      style={{
                  display:order.orderStatus === "Delivered"?"none":"block"
                }}>
                  {/*             */}
                  <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateOrderStatus}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" &&(<option value="shipped">Shipped</option>)}
                        {order.orderStatus === "shipped" && (<option value="Delivered">Delivered</option>)}
                      </select> 
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false || status===""?true:false}
                    >
                      Update
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProcessOrder;
