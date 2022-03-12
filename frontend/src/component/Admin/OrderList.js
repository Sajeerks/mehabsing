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
import {deleteOrder, clearErrors,updateOrder,getAllOrders} from '../../actions/orderActions'
import { UPDATE_ORDER_RESET,DELETE_ORDER_RESET } from '../../constants/orderConstants';


const OrderList = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const alert = useAlert();
 
 const {error:deleteError,isDeleted, isUpdated} = useSelector((state)=>state.updateOrderState)
   
 

  const { error, orders } = useSelector((state) => state.allOrders);
 // console.log("products in product list ", products)

 const deleteOrderHandler=(id)=>{
   const nam = orders.filter(item=>item._id===id)
   console.log("nam  :", nam)
   console.log("nam.name  :", nam[0]._id )

   let proceed =  window.confirm(" Do you want to delete product "+nam[0]._id )
   if(proceed){
     dispatch(deleteOrder(id))
   }else return 
    

  }
  const columns= [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5, 
      cellClassName:(params)=>{
        return params.getValue(params.id,"status") ==="Delivered"
        ?"greenColor"
        :"redColor"
      }
    
    }, 
      
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "amount",
        headerName: "Amount",
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
                     <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
             onClick={()=>deleteOrderHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      }
  
        },

  ]
const rows= []
orders && orders.map((item)=>(
  rows.push({
  id:item._id,
  itemsQty:item.orderItems.length,
  amount:item.totalPrice,
  status:item.orderStatus,
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
  dispatch({type:DELETE_ORDER_RESET})
}
// dispatch(getAllAdinProducts())
if(deleteError){
  alert.error(error)
  dispatch(clearErrors())
}
dispatch(getAllOrders())
},[deleteError, error, isDeleted, dispatch, alert,navigate])

  return (
    <Fragment>
      <MetaData title ="Dashboard allorders"/>
      <div className="dashboard">
        <SideBar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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
export default OrderList