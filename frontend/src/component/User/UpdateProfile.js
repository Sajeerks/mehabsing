import React, { Fragment,useState, useEffect } from 'react';
import './UpdateProfile.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@mui/icons-material/Face'
import { clearErrors, updateProfile,loadUser } from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader.js'
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch= useDispatch()
    const alert = useAlert()
  


    
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")

      // const [avatar, setAvatar] = useState("/Profile.png");
      const [avatar, setAvatar] = useState("");

      const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
// console.log("isupated :", isUpdated )
// // console.log("loading :", loading )
// console.log("user in UPADTEPROFILE :", user )

const updateProfileSubmit =(e)=>{
    e.preventDefault()

    const myform = new FormData()

    myform.set("name", name)
    myform.set("email", email)
    myform.set("avatar", avatar)
    // console.log(" lofin form submitted")
    // console.log("form data : ", myform)
    dispatch(updateProfile(myform))
    ///console.log(" lofin form submitted")
    // navigate("/account")

}

const   updateProfileDataChange=(e)=>{
  
        const reader = new FileReader()
        reader.onload = ()=>{
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
}

  useEffect(() => {
    if(isUpdated){
      alert.success("profile updates successfulley")
      // console.log("isupated indide useeffect:", isUpdated )
      dispatch(loadUser())
      // console.log("dispatched load user in UPADATE")
   navigate("/account")
   dispatch({type:UPDATE_PROFILE_RESET})
  
   }

      if(user){
          setName(user.name)
          setEmail(user.email)
          setAvatarPreview(user.avatar.url)
      }
  if(error){
      dispatch(clearErrors())
      alert.error(error)
  }

  }, [error,alert, user, isUpdated,navigate,dispatch ,]);
  

  



  return (
      <Fragment>
          {loading?(
              <Loader/>
          ):(
              <Fragment>
              <MetaData title="Update Profile" />
                      <div className="updateProfileContainer">
                          <div className="updateProfileBox">
                          <h2 className="updateProfileHeading">Update Profile</h2>
                          <form
                              className="updateProfileForm"
                             
                              encType="multipart/form-data"
                              onSubmit={updateProfileSubmit}
                            >
                              <div className="updateProfileName">
                                <FaceIcon />
                                <input
                                  type="text"
                                  placeholder="Name"
                                  required
                                  name="name"
                                  value={name}
                                  onChange={(e)=>setName(e.target.value)}
                                />
                              </div>
                              <div className="updateProfileEmail">
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
                              
              
                              <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                  type="file"
                                  name="avatar"
                                  accept="image/*"
                                  onChange={updateProfileDataChange}
                                />
                              </div>
                              <input type="submit" value="updateProfile" className="updateProfileBtn" />
                            </form>
                            </div>
                          </div>
                          </Fragment>
          )}

      </Fragment>

  )
}

export default UpdateProfile