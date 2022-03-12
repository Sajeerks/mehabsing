import './productReviews.css'
import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Star from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {deleteReviews, clearErrors,getAllReviews,getAllAdinProducts} from '../../actions/productAction'
import { DELETE_PRODUCT_RESET, DELETE_REVIEW_RESET } from '../../constants/productConstants';


const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const alert = useAlert();
 
 const {error:deleteError,isDeleted} = useSelector((state)=>state.deleteReviews)
    
 

  const { error, reviews, loading } = useSelector((state) => state.productAllReviews);
 // console.log("products in product list ", products)

//  console.log("reviews :",reviews)

 const  [productId, setProductId] = useState("")
 const deleteReviewHandler=(reviewId)=>{
   const nam = reviews.filter(item=>item._id===reviewId)
  //  console.log("nam  :", nam)
  //  console.log("nam.name  :", nam[0].name)

   let proceed =  window.confirm(" Do you want to comment of user with name :   "+nam[0].name )
   if(proceed){
     dispatch(deleteReviews(reviewId,productId))
   }else return 
    

  }
  const columns= [
    { field: "id", headerName: "Review ID", minWidth: 30, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 30,
      flex: .5,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "text",
      minWidth: 150,
      flex: 1,
    //   cellClassName:(params)=>{
    //     return params.getValue(params.id,"comment").length > 50 
    //     ?"largeLength"
    //     :"smallLength"
    //   }
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "text",
      minWidth: 100,
      flex: 0.3,
      cellClassName:(params)=>{
        return params.getValue(params.id,"rating") >= 3
        ?"greenColor"
        :"redColor"
      }
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "text",
      sortable: false,
      renderCell:(params)=>{
        return (
          <Fragment>
        
            <Button
             onClick={()=>deleteReviewHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      }
  
        },

  ]
const rows= []
reviews && reviews.map((item)=>(
  rows.push({
  id:item._id,
   rating:item.rating,
   comment:item.comment,
   user:item.name,
  })
))

const productReviewsSubmitHandler =(e)=>{
e.preventDefault()
dispatch(getAllReviews(productId))
}
useEffect(()=>{
  if(productId.length === 24 ){
    dispatch(getAllReviews(productId))
    
  }
  if(deleteError){
    alert.error(deleteError)
      dispatch(clearErrors())
}
  
if(isDeleted){
  alert.success("review was deleted successfully")
  dispatch({type:DELETE_REVIEW_RESET})
  // navigate("/admin/dashboard")

}

if(error){
  setProductId("")
  alert.error(error)
  dispatch(clearErrors())
 
  // navigate("/admin/dashboard")
}
},[deleteError, error, isDeleted, dispatch, alert,navigate,productId])

  return (
    <Fragment>
      <MetaData title ="ALL REVIEWS "/>
      <div className="dashboard">
        <SideBar/>
        <div className="productReviewsContainer">
     
        <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <div>
                  <h1 >ALL REVIEWS</h1>
            </div>
          

            <div>
              < Star/>
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
         
           

            <div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false || productId === "" ? true : false}
            >
              GET Reviews
            </Button>
            </div>
         
         
          </form>
          
         
            {reviews && reviews.length >0? (  <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight

            
          />):(
              <h1 className='productReviewsFormHeading'>No reviews found</h1>
          )}
        
        </div>
      </div>

    </Fragment>


  )
}


export default ProductReviews