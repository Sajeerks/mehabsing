import React from 'react';
import playstore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import "./footer.css"

const Footer = () => {
  return (
   <footer id ="footer">
       <div className="leftFooter">
         <h4>DOWNLOAD OUR APP</h4>
         <p>Download our app on Appstore or Googleplay</p>
         <img src={playstore} alt="playstore"/>
         <img src={appStore} alt="appStore"/>
       </div>
       <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High quality is our first priority</p>
        <p>Copy right Sajeer Inc</p>
       </div>
       <div className="rightFooter">
           <h4>Follow us on</h4>
           <a href="https://www.linkedin.com/in/meabhisingh">Instagram</a>
           <a href="https://www.linkedin.com/in/meabhisingh">Facebook</a>
           <a href="https://www.linkedin.com/in/meabhisingh">Linkden</a>


       </div>

   </footer>
    )
};

export default Footer;
