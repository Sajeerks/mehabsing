import React, { Fragment, useEffect } from "react";
import Siderbar from "./Sidebar.js"
import "./Dashboard.css"
import { Typography } from "@material-ui/core";
import { Link} from "react-router-dom";
import MetaData from '../layout/MetaData.js';
import { Doughnut, Line , Bar} from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {getAllAdinProducts} from '../../actions/productAction'
import { getAllOrders } from "../../actions/orderActions.js";
import { getAllusersAction } from "../../actions/userActions.js";




const Dashboard = () => {
  let outOfStock = 0
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
 const {users} = useSelector((state)=>state.allUsers)



products && products.forEach((item)=>{
  if(item.stock === 0 ){
    outOfStock +=1
  }
})

let totalAmount = 0
orders && orders.forEach(item=>{
  totalAmount+=item.totalPrice
})


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock,products.length-outOfStock],
          },
        ],
      };


      useEffect(()=>{
        dispatch(getAllAdinProducts())
        dispatch(getAllOrders())
        dispatch(getAllusersAction())

        
        },[dispatch])


  return (
    <div className='dashboard'>
                <MetaData title="Dashboard"/>
            <Siderbar/>
         

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                <div>
                    <p>
                    {/* Total Amount <br /> ₹{totalAmount} */}
                    Total Amount <br /> ₹{totalAmount.toFixed(2)}
                    </p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                    <p>Orders {orders && orders.length}</p>
                    {/* <p>{orders && orders.length}</p> */}
                    </Link>
                    <Link to="/admin/users">
                    <p>Users {users && users.length} </p>
                    {/* <p>{users && users.length}</p> */}
                    </Link>
                </div>
                </div>
            
                    <div className="lineChart">             
                    <Line data={lineState} />
                    </div>

                    <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                    </div>
            </div>



    </div>
  )
}

export default Dashboard