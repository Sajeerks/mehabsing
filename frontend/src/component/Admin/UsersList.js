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

import { deleteUserDataAction, clearErrors, getAllusersAction } from '../../actions/userActions';
import { DELETE_USER_RESET, UPDATE_USER_RESET } from '../../constants/userConstants';
import Loader from '../layout/loader/Loader';



const UsersList = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const alert = useAlert();
 
 
 const {loading:allLoading,users, error:allUsersError} = useSelector((state)=>state.allUsers)
 const {loading,isDeleted, isUpdated, error, message} = useSelector((state)=>state.profile)


// console.log("allLoading :",allLoading)
// console.log("users :",users)


 


 const deleteUserHandler=(id)=>{
   const nam = users.filter(item=>item._id===id)
   console.log("nam  :", nam)
   console.log("nam.name  :", nam[0].name)

   let proceed =  window.confirm(" Do you want to delete USER==: "+nam[0].name )
   if(proceed){
     dispatch(deleteUserDataAction(id))
   }else return 
    

  }
  const columns= [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
    
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.5,
      cellClassName:(params)=>{
        return params.getValue(params.id,"role") ==="admin"
        ?"greenColor"
        :"redColor"
      }
    
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
                     <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
             onClick={()=>deleteUserHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      }
  
        },

  ]
const rows= []
users && users.map((item)=>(
  rows.push({
  id:item._id,
   role:item.role,
   email:item.email,
   name:item.name,
  })
))
useEffect(()=>{
if(error){
alert.error(error)
dispatch(clearErrors())
}

if(allUsersError){
    alert.error(allUsersError)
    dispatch(clearErrors())
 }

if(isDeleted){
    alert.success( message)
    console.log("message :", message)
    dispatch({type:DELETE_USER_RESET})
    // navigate("/admin/dashboard")
    }
if(isUpdated){
    alert.succes( "the user is UPDATED succesfulley")
    dispatch({type:UPDATE_USER_RESET})
    // navigate("/admin/dashboard")
    }
  

dispatch(getAllusersAction())

},[ dispatch, alert,navigate, error, isDeleted, isUpdated, allUsersError, message])

  return (
    <Fragment>
         <MetaData title ="Dashboard AdminProucts"/>
      <div className="dashboard">
        <SideBar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS {users && users.length}</h1>

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
export default UsersList