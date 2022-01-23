import React, { Fragment, useEffect } from 'react';
import './home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';

// const product ={name:"Blue Tshirt", 
// images:[{url:"https://m.media-amazon.com/images/I/81RnU-hjDaL._AC_SY550_.jpg"}], 
// price:3000,
// _id:"dfdfdfdf"}

const Home = () => {
    const {products,productsCount, loading, error} = useSelector(state=>state.products)
    const alert = useAlert()
const dispatch =useDispatch()
useEffect(()=>{
    if(error){
        return alert.error(error)
    }
dispatch(getProduct())
},[dispatch,error, alert])



  return (
      <Fragment>
          {loading?(<Loader/>):(<Fragment>
      <MetaData title="HOME PAGE IS WORKING" />
         <div className="banner">
            <p> Welcome to Ecommerce </p>
            <h1>FIND AMAZING PRODUCTS</h1>
            <a href="#container">
                <button>
                    Scroll 
                </button>
            </a>
         </div>
         <h2 className='homeHeading' > Featured products</h2>
            <div className="container" id="container">
              
            {   products && products.map((product)=>(
                      <Product  key ={product._id}product ={product}/>
                ))
        }

            </div>


  </Fragment>)}
      </Fragment>
  )
};

export default Home;
