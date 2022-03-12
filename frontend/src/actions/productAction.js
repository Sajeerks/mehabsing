import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
  ALL_DETAILS_REQUEST,
  ALL_DETAILS_SUCCESS,
  ALL_DETAILS_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL, ALL_REVIEW_REQUEST ,
  ALL_REVIEW_SUCCESS ,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST ,
  DELETE_REVIEW_SUCCESS ,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL ,
} from "../constants/productConstants.js";


export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`, config);
    console.log("datat form deleteReviews  ",data)
    //console.log("reviewData form newReviewAction  ", reviewData);
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAIL, payload: error.response.data.message });
  }
};


export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/v1/reviews?id=${id}`, config);
    //console.log("datat form newReviewAction  ",data)
    //console.log("reviewData form newReviewAction  ", reviewData);
    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({ type: ALL_REVIEW_FAIL, payload: error.response.data.message });
  }
};









//Update product
export const updateProductAction = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    console.log("product form updateProductAction bedor fetching  ", productData);
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    //console.log("datat form newReviewAction  ",data)
    console.log("product form updateProductAction  ", productData);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message });
  }
};





export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("product form deleteProductAction bedor fetching  ", productId);
    const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
    //console.log("datat form newReviewAction  ",data)
    console.log("product form deleteProductAction  ", productId);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProductAction = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    console.log("product form newProductAction bedor fetching  ", productData);
    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );
    //console.log("datat form newReviewAction  ",data)
    console.log("product form newProductAction  ", productData);
    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const newReviewAction = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/v1/review", reviewData, config);
    //console.log("datat form newReviewAction  ",data)
    //console.log("reviewData form newReviewAction  ", reviewData);
    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      //console.log(link)
      const { data } = await axios.get(link);
      //console.log(data)
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: ALL_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: ALL_DETAILS_FAIL, payload: error.response.data.message });
  }
};

///admin/products
export const getAllAdinProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
