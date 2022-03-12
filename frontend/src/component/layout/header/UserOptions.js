import React, { Fragment, useState } from 'react';
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userActions';
import './Header.css'

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {cartItems} = useSelector((state)=>state.cart)
  
    const options  =[
        {icon:<ListAltIcon/>,name:"Orders", func:orders},
        {icon:<PersonIcon/>,name:"Profile", func:account},
        {icon:<ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}  />,name:`Cart-${cartItems.length}`, func:cart},
        {icon:<ExitToAppIcon/>,name:"logoutUser", func:logoutUser},
    ]
   if(user.role === "admin"){
        options.unshift({icon:<DashboardIcon/>,name:"Dashboard", func:dashboard})
}
function dashboard(){
  navigate("/admin/dashboard")
}
function cart(){
  navigate("/cart")
}
function orders(){
  navigate("/orders/me")
}
function account(){
  navigate("/account")
}
function logoutUser(){
  navigate("/")
dispatch(logout())
alert.success("Logout succesfully")
}


  return <Fragment>
    <Backdrop open={open} style={{ zIndex: "10" }} />
  <SpeedDial
    ariaLabel="SpeedDial tooltip example"
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    direction="down"
    className="speedDial"
    style={{ zIndex: "11" }}
    icon={
        <img 
        className='speedDialIcon'
         src={user.avatar.url?user.avatar.url:"/profile.png"}
         alt="Profile"
         
        />
    }
  > 

{options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      {/* <SpeedDialAction icon={<DashboardIcon/>} tooltipTitle="Dahsboard" ></SpeedDialAction> */}
      
       </SpeedDial>

  </Fragment>
};

export default UserOptions;
