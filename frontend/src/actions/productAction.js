import axios from 'axios'
import {
    ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,CLEAR_ERRORS,ALL_DETAILS_REQUEST,ALL_DETAILS_SUCCESS,
    ALL_DETAILS_FAIL
} from '../constants/productConstants.js'

export const getProduct = ()=> async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST})
        const {data} = await axios.get("/api/v1/products")
           console.log(data)
        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data})

    } catch (error) {
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message})
        
    }
}
// Clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS,})
}

export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({type:ALL_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`)
           console.log(data)
        dispatch({type:ALL_DETAILS_SUCCESS,payload:data.product})

    } catch (error) {
        dispatch({type:ALL_DETAILS_FAIL,payload:error.response.data.message})
        
    }
}


