import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { useNavigate , useParams} from "react-router-dom";
import { clearErrors, getUserDetailsAction, updateUserDataAction } from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/loader/Loader";

const UpdateUser = () => {
  
  const {loading:updateLoading, error:updateError, isUpdated} = useSelector(state =>state.profile)
  const {loading, error, user} = useSelector(state=>state.userDetails)
const dispatch = useDispatch()
  const alert = useAlert();
  const {id} = useParams()
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

 console.log("loading ", loading)
 console.log("updateLoading ", updateLoading)
 console.log("updateError ", updateError)
 console.log("isUpdated ", isUpdated)

 console.log("error ", error)
 console.log("user ", user)
 console.log("id :", id)



  const updateUserHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("role", role);


 
    dispatch(updateUserDataAction(id, myform));

  
  };
  useEffect(() => {
    // dispatch(getUserDetailsAction(id)) 
    if(!user){
   console.log("nouser dispathech")
      dispatch(getUserDetailsAction(id)) 

    }


   if(user && user._id !==id){
 
    dispatch(getUserDetailsAction(id)) 
   }else{
 
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)

   }


    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(updateError){
        alert.error(updateError);
        dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("user  updated successfully");
      navigate("/admin/dashboard");
      dispatch({ type: UPDATE_USER_RESET });
    }


  }, [dispatch, error, alert, user,id, navigate, updateLoading, updateError, loading]);

  return (
    <Fragment>
      <MetaData title={"CREATE NEW PRODUCT"} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading?(<Loader/>):(
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateUserHandler}
          >
            <h1>UPDATE USER</h1>

            <div>
              < PersonIcon/>
              <input
                type="text"
                placeholder=" Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="text"
                placeholder="email"
                value={email}
            
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

           

         

            <div>
              <  VerifiedUserIcon/>
               <select  value={role}  onChange={(e) => setRole(e.target.value)}>

                <option value="">Chosse Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              
               </select>
               
               
              
            </div>

      

     

            <Button
              id="createProductBtn"
              type="submit"
              disabled={updateLoading ? true : false || role === "" ? true : false}
            >
              Update User
            </Button>
          </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};




export default UpdateUser