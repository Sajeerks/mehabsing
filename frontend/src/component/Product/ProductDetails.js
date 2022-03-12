import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReviewAction } from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions.js";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  // Paper,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { error, product, loading } = useSelector(
    (state) => state.productDetails
  );
  const {success , error:reviewError} = useSelector((state)=>state.newReview)
  const options = {
    // size: 10,
       size:"large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };



  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");





  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

const submitReviewToggle =()=>{
open?setOpen(false):setOpen(true)
console.log("openvalue :", open)
}
const reviewSubmitHandler =()=>{
  const myform= new FormData()
  myform.set("rating" , rating)
  myform.set("comment" , comment)
  myform.set("productId" , id)
  
   dispatch(newReviewAction(myform))
   setOpen(false)
}



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review submitted succesfully")
      dispatch({type:NEW_REVIEW_RESET})
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id,success,reviewError ,loading,rating, alert,error]);

  const addToCartHanler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("items added to cart");
  };




  return (
    <Fragment>
      <MetaData title={`${product.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />

                //  <Item key={i} item={item} />
              ))}
          </Carousel>
        </div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product #{product._id}</p>
          <div className="detailsBlock-2">
            {/* <ReactStars {...options} /> */}
            <Rating {...options} />


            <span className="detailsBlock-2-span">
              {"   "}({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>

            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              {"  "}
              <button
                disabled={product.stock < 1 ? true : false}
                onClick={addToCartHanler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:{" "}
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button  onClick={submitReviewToggle} className="submitReview">Submit Review</button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
      </Dialog>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
};

// function Item(props) {
//   return (
//     <Paper>
//       <h2>{props.item.url}</h2>
//       <p>{props.item.public_id}</p>

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }

export default ProductDetails;
