import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProcductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,productDeleteReducer, deleteReviewReducer, productAllReviewsReducer
} from "./reducers/productReducer.js";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDeatilsReducer, updateOrderReducer, } from "./reducers/orderReducers.js";

const reducer = combineReducers({
  profile: profileReducer,

  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  forgotpasswordss: forgotPasswordReducer,
  cart: cartReducer,
  neworder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDeatilsReducer,
 newReview: newReviewReducer,
newProduct: newProcductReducer,
deleteProduct:productDeleteReducer,
allOrders:allOrdersReducer,
updateOrderState:updateOrderReducer,
userDetails:userDetailsReducer,
allUsers:allUsersReducer,
deleteReviews:deleteReviewReducer,
productAllReviews:productAllReviewsReducer,


});

let initailState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  },
 
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initailState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
