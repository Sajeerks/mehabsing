import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST ,
 ALL_ORDERS_SUCCESS ,
 ALL_ORDERS_FAIL ,
  UPDATE_ORDER_REQUEST ,
  UPDATE_ORDER_SUCCESS ,
  UPDATE_ORDER_RESET ,
  UPDATE_ORDER_FAIL ,
 
  DELETE_ORDER_REQUEST ,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET ,
  DELETE_ORDER_FAIL ,
} from "../constants/orderConstants.js";

import axios from "axios";


//delete order
export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`,  config);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};









//update order
export const updateOrder = (id, order) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("datat in update order action prioro to submitting :"+order )
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);
    console.log("datat in update order action after submitting :"+data )
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};








//get all orders
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/v1/admin/orders", config);
    //console.log("Dataform my ordewractop ", data);
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
  }
};










export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

//myOrders
export const myOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/v1/orders/me", config);
    //console.log("Dataform my ordewractop ", data);
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
  }
};



//get order details

export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.get(`/api/v1/order/${id}`, config);
     // console.log("Dataform my getOrderDetails ", data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };

















//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
