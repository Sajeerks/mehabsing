import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route , Routes} from 'react-router-dom'
import { useNavigate,Navigate   } from 'react-router'
import Home from '../home/Home'
const ProtectedRoute = ({children, ...rest}) => {
    const navigate = useNavigate()

 const{user,loading,isAuthenticated}=   useSelector((state)=>state.user)
//const {isUpated} = useSelector(state=>state.profile)
 //console.log("user form protected Route :", user )
//  console.log("rest :", rest)
//  console.log("rest.kk :", rest.tt)
// //  console.log("compnenet :",Component)
//  console.log("children :",children)
// console.log("isupate in protedted", isUpated)
 if(!isAuthenticated){
    return <Navigate to={'/login'} />;
}
if(rest.isAdmin === true && user.role !=="admin"  ){
    return <Navigate to={'/login'} />;
}
return children
}
export default ProtectedRoute