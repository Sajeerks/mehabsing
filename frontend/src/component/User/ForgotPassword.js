import React, { Fragment,useState, useEffect } from 'react';
import './ForgotPassword.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { clearErrors,forgotPassword } from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader.js'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';


const ForgotPassword = () => {  

    const { error, message, loading } = useSelector((state) => state.forgotpasswordss);
      const navigate = useNavigate();
      const dispatch= useDispatch()
      const alert = useAlert()

    const [email, setEmail] = useState("")

      const forgotPasswordSubmit =(e)=>{
        e.preventDefault()
    
        const myform = new FormData()
    
        myform.set("email", email)

        // console.log(" lofin form submitted")
        // console.log("form data : ", myform)
        dispatch(forgotPassword(myform))
        console.log(" FORM form submitted")
        // navigate("/account")
    
    }


    useEffect(() => {

    
      if(error){
          dispatch(clearErrors())
          alert.error(error)
      }
      if(message){
          alert.success(message)
          // navigate("/login")
      }
    
      }, [error,alert, ,navigate,dispatch ,message]);
      





  return (
     <Fragment>
          {loading?(
              <Loader/>
          ):(
              <Fragment>
              <MetaData title="Forgot Password" />
                      <div className="forgotPasswordContainer">
                          <div className="forgotPasswordBox">
                          <h2 className="forgotPasswordHeading">Forgot Password</h2>
                          <form
                              className="forgotPasswordForm"
              
                              onSubmit={forgotPasswordSubmit}
                            >
                          
                              <div className="forgotPasswordEmail">
                                <MailOutlineIcon />
                                <input
                                  type="email"
                                  placeholder="Email"
                                  required
                                  name="email"
                                  value={email}
                                  onChange={(e)=>setEmail(e.target.value)}
                                />
                              </div>
                              
              
                            
                              <input type="submit" value="Send mail" className="forgotPasswordBtn" />
                            </form>
                            </div>
                          </div>
                          </Fragment>
          )}

      </Fragment>
  )
}

export default ForgotPassword