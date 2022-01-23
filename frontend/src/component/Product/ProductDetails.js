import React, { Fragment, useEffect } from 'react';
import './ProductDetails.css'
import Carousel from 'react-material-ui-carousel'
import {useSelector,useDispatch} from 'react-redux'
import {getProductDetails} from '../../actions/productAction.js'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const {error, product,loading }= useSelector(state => state.productDetails)
    console.log("product inside product details   :" , product)

    useEffect(()=>{
        dispatch(getProductDetails(id))
 
    }, [dispatch,id])
  return( 
  <Fragment>
  <div className='ProductDetails'>  
     <div>
       <Carousel>
             {product.images && product.images.map((item, i)=>(
                  <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ) )}
         </Carousel>

     </div>

  </div>
  </Fragment>
  
  );
};

export default ProductDetails;
