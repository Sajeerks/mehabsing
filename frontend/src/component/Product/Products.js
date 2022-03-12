import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../../component/home/ProductCard.js'
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import './Products.css'
import {  useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import Typography from '@mui/material/Typography';
import Slider from "@material-ui/core/Slider";



const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "ahas",
    "sample category"
  ];
const Products = () => {
    let { keyword } = useParams();
  //  console.log("keyword :", keyword)
    const alert = useAlert()
    const dispatch = useDispatch()
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ratings, setRatings] = useState(0);
    const [price, setPrice] = useState([0,100000]);
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }



    const priceHandler =(e,newPrice)=>{
      setPrice(newPrice)
    }
  
    const data = useSelector(state=>state.products)
    const {loading, products, error, productsCount ,resultPerPage,filteredProductsCount} =  data
    //   console.log("prioductcoutn   in product js;",productsCount)
    // console.log("filteredProductsCount  ;",filteredProductsCount)

    let count = filteredProductsCount
    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }



        dispatch(getProduct(keyword,currentPage, price,category,ratings))
 
    }, [dispatch, keyword,currentPage, price, category,ratings, alert, error])
  return <Fragment>
     {loading?
     (<Loader/>):
     (<Fragment>   
       <MetaData title={`PRODUCTS...ECOMMERCE`}/>

            <h2 className='productsHeading'>products</h2>
            <div className="products">
                {products && products.map((product)=>(
                    <ProductCard key ={product._id} product ={product} />
                ))}
            </div>
             
             <div className="filterBox">
             <Typography>Price</Typography>
             <Slider
                value={price}
                onChange={priceHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={100000}
              />


            <Typography>Categories</Typography>
             <ul className='categoryBox'>
                 {categories.map((category)=>(
                     <li   className="category-link"
                     key ={category}
                     onClick={()=>{
                      setCategory(category)
                      setCurrentPage(1)
                     }}
                     >
                      {category}
                     </li>
                 ))}
             </ul>
             <fieldset>
             <Typography component={"legend"}>Rating above</Typography>
             <Slider
              value ={ratings}
              onChange={(e,newRating)=>{
                setRatings(newRating)
                setCurrentPage(1)
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
             />


             </fieldset>





             </div>
    

      {resultPerPage < count  &&(
                   <div className="paginationBox">
                   <Pagination
                   activePage={currentPage}
                   itemsCountPerPage={resultPerPage}
                   totalItemsCount={count}
                   onChange={setCurrentPageNo}
                   nextPageText="Next"
                   prevPageText="Prev"
                   firstPageText="1st"
                   lastPageText="Last"
                   itemClass='page-item'
                   linkClass='page-link'
                   activeClass='pageItemActive'
                   activeLinkClass="pageLinkActive"
                   />
               </div>
      )}



          </Fragment>)}
  </Fragment>
};

export default Products;

