
import { Routes,Route } from "react-router-dom";
import {Signup} from '../pages/Signup';
import SingleRequestCard from '../components/Requests/SingleRequestCard';
import UserPage from '../pages/UserPage';
import Requests from '../pages/Requests';
import {Login} from '../pages/Login';
import Home from "../pages/Home";
import Checkout from '../components/Checkout/Ckeckout';
import DonationDetails from "../pages/DonationDetails";
<<<<<<< HEAD
import Requests from "../pages/Requests";
import SingleRequestCard from "../components/Requests/SingleRequestCard";
import UserPage from "../pages/UserPage";
=======

>>>>>>> 1f726495ee937c30634f14557d724dcfa80ae661
export default function AllRoutes(){
    return(

        <>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/donait/:id" element={<DonationDetails/>} />
        <Route path="/requests" element={<Requests/>}/>
        <Route path="/requests/:id" element={<SingleRequestCard/>}/>
        <Route path="/user" element={<UserPage/>}/>
<<<<<<< HEAD
        {/* <Route path="/user" element={<UserPage/>}/> */}
=======
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
>>>>>>> 1f726495ee937c30634f14557d724dcfa80ae661
    </Routes>
  </>

    )
}