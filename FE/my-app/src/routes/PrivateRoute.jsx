import { shallowEqual, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

export default function PrivateRoute({children}){
    const location = useLocation()

    const {isAuth} = useSelector((store)=>{
        return {
            isAuth: store.authReducer.isAuth
        }
    },shallowEqual)
   return isAuth ? children : <Navigate to={"/login"} state={location.pathname} replace={true}/>
}