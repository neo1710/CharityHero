import { Routes,Route } from "react-router-dom";
import {Signup} from '../pages/Signup';
import SingleRequestCard from '../components/Requests/SingleRequestCard';
import UserPage from '../pages/UserPage';
import Requests from '../pages/Requests';
import {Login} from '../pages/Login';

export default function AllRoutes(){
    return(
        <Routes>
        <Route path="/requests" element={<Requests/>}/>
        <Route path="/requests/:id" element={<SingleRequestCard/>}/>
        <Route path="/user" element={<UserPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    )
}