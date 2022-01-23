import './App.css';
import React from 'react';
import Header from "./component/layout/header/Header.js"
import Footer from "./component/layout/footer/Footer.js"

import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import WebFont from 'webfontloader'
import Home from './component/home/Home.js'
import Loader from './component/layout/loader/Loader';
import ProductDetails from './component/Product/ProductDetails.js'



function App() {
  React.useEffect(()=>{
    WebFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
        },
      });
})
  return ( 
     <Router>
        <Header/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/product/:id" element={<ProductDetails/>}/>

     

        




     


        </Routes>
        <Footer/>
     </Router>
 
  );
}

export default App;
