import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate} from "react-router-dom";

export default function PrivateRoute({children}){
    let auth=useSelector((store)=>store.authReducer.isAuth);
    let path=useLocation();
      return auth? children:<Navigate to={'/login'} state={path.pathname} replace={false} /> 
}