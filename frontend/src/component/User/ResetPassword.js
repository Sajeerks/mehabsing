import React, { Fragment,useState, useEffect } from 'react';
import './ResetPassword.css'
import { clearErrors, updateProfile, resetPassword } from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader.js'
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useSearchParams ,useParams} from "react-router-dom";


const ResetPassword = () => {
    const { error, success, loading } = useSelector((state) => state.forgotpasswordss);
    const navigate = useNavigate();
    const dispatch= useDispatch()
    const alert = useAlert()
    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("__firebase_request_key")
    let { token } = useParams();
      // console.log("tokenn :", token)
      // console.log("error :",error)
       const [password, setPassword] = useState("")
       const [confirmPassword, setconfirmPassword] = useState("")


const resetPasswordSubmit =(e)=>{
    e.preventDefault()

    const myform = new FormData()

   
    myform.set("password", password)
    myform.set("confirmPassword", confirmPassword)
    // console.log(" lofin form submitted")
    // console.log("form data : ", myform)
    dispatch(resetPassword(token,myform))
    console.log(" lofin form submitted")
    // navigate("/account")

}



  useEffect(() => {
    if(success){
      alert.success("Password updated successfulley")
      // console.log("isupated indide useeffect:", isUpdated )

      // console.log("dispatched load user in UPADATE")
   navigate("/login")
   dispatch({type:UPDATE_PASSWORD_RESET})
  
   }

  
  if(error){
      dispatch(clearErrors())
      alert.error(error)
  }

  }, [error,alert, success,navigate,dispatch ,]);
  

  return (
    <Fragment>
    {loading?(
        <Loader/>
    ):(
        <Fragment>
        <MetaData title="Update Password" />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                    <h2 className="resetPasswordHeading">Update Profile</h2>
                    <form
                        className="resetPasswordForm"
                      
                        onSubmit={resetPasswordSubmit}
                      >
                        
                        <div>
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="new Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div>
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                        />
                        </div>
                 
                        
        
                 
                        <input type="submit" value="Update passord" className="resetPasswordBtn" />
                      </form>
                      </div>
                    </div>
                    </Fragment>
    )}

</Fragment>
  )
}

export default ResetPassword