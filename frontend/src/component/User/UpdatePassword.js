import React, { Fragment,useState, useEffect } from 'react';
import './UpdatePassword.css'
import { clearErrors, updateProfile, updatePassword } from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader.js'
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VpnKeyIcon from "@material-ui/icons/VpnKey";


const UpdatePassword = () => {
   
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
      const navigate = useNavigate();
      const dispatch= useDispatch()
      const alert = useAlert()
    
  
         const [oldPassword, setoldPassword] = useState("")
         const [newPassword, setnewPassword] = useState("")
         const [confirmPassword, setconfirmPassword] = useState("")


  const updatePasswordSubmit =(e)=>{
      e.preventDefault()
  
      const myform = new FormData()
  
      myform.set("oldPassword", oldPassword)
      myform.set("newPassword", newPassword)
      myform.set("confirmPassword", confirmPassword)
      // console.log(" lofin form submitted")
      // console.log("form data : ", myform)
      dispatch(updatePassword(myform))
      console.log(" lofin form submitted")
      // navigate("/account")
  
  }
  
  const   updatePasswordDataChange=(e)=>{
    
        
  }
  
    useEffect(() => {
      if(isUpdated){
        alert.success("Password updated successfulley")
        // console.log("isupated indide useeffect:", isUpdated )

        // console.log("dispatched load user in UPADATE")
     navigate("/account")
     dispatch({type:UPDATE_PASSWORD_RESET})
    
     }
  
    
    if(error){
        dispatch(clearErrors())
        alert.error(error)
    }
  
    }, [error,alert, isUpdated,navigate,dispatch ,]);
    







  return (
    <Fragment>
    {loading?(
        <Loader/>
    ):(
        <Fragment>
        <MetaData title="Update Password" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                    <h2 className="updatePasswordHeading">Update Profile</h2>
                    <form
                        className="updatePasswordForm"
                       
                        encType="multipart/form-data"
                        onSubmit={updatePasswordSubmit}
                      >
                         <div className="loginPassword">
                        <VpnKeyIcon />
                        <input
                            type="password"
                            placeholder="Old password"
                            required
                            value={oldPassword}
                            onChange={(e) => setoldPassword(e.target.value)}
                        />
                        </div>
                        <div>
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="new Password"
                            required
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
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
                 
                        
        
                 
                        <input type="submit" value="Update passord" className="updatePasswordBtn" />
                      </form>
                      </div>
                    </div>
                    </Fragment>
    )}

</Fragment>

  )
}

export default UpdatePassword