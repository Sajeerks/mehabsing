import React, { Fragment, useState } from 'react';
import './Search.css'
import { useNavigate,useParams } from "react-router-dom";


const Search = ()  => {
    let navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler =(e)=>{
        e.preventDefault()
      if(keyword.trim()){
        navigate(`/products/${keyword}`)
      }else{
        navigate(`/products`)
      }
    }

  return <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
          <input type="text"
           placeholder='Search the product'
           onChange={(e)=>setKeyword(e.target.value)}
          
          />
          <input type="submit" value="Search" />
      </form>
  </Fragment>;
};

export default Search;
