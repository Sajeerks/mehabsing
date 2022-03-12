import './ProductList.css'
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {getAllAdinProducts, clearErrors,deleteProductAction} from '../../actions/productAction'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


const ProductList = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const alert = useAlert();
 
 const {error:deleteError,isDeleted} = useSelector((state)=>state.deleteProduct)
   
 

  const { error, products } = useSelector((state) => state.products);
 // console.log("products in product list ", products)

 const deleteProductHandler=(id)=>{
   const nam = products.filter(item=>item._id===id)
   console.log("nam  :", nam)
   console.log("nam.name  :", nam[0].name)

   let proceed =  window.confirm(" Do you want to delete product "+nam[0].name )
   if(proceed){
     dispatch(deleteProductAction(id))
   }else return 
    

  }
  const columns= [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell:(params)=>{
        return (
          <Fragment>
                     <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
             onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      }
  
        },

  ]
const rows= []
products && products.map((item)=>(
  rows.push({
  id:item._id,
   stock:item.stock,
   price:item.price,
   name:item.name,
  })
))
useEffect(()=>{
  if(deleteError){
    alert.error(deleteError)
      dispatch(clearErrors())
}
  
if(isDeleted){
  alert.success("product was deleted successfully")
  navigate("/admin/dashboard")
  dispatch({type:DELETE_PRODUCT_RESET})
}
dispatch(getAllAdinProducts())
if(error){
  alert.error(error)
  dispatch(clearErrors())
}
},[deleteError, error, isDeleted, dispatch, alert,navigate])

  return (
    <Fragment>
      <MetaData title ="Dashboard AdminProucts"/>
      <div className="dashboard">
        <SideBar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>

    </Fragment>


  )
}

export default ProductList