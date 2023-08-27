import { SigninForm } from "../components/SigninForm"
import styled from 'styled-components';
import Image from '../Images/phonepe.jpeg';

export const Signup=()=>{

   return(
    <DIV>  
        <SigninForm/>
    </DIV>
   ) 
}


const DIV=styled.div`
width :100% ;
font-family: 'Poppins', sans-serif;
height: 500px;
padding-top:100px;
background-color: #02a95c;
/* background-image: url('https://mir-s3-cdn-cf.behance.net/projects/808/f3eb58157538329.Y3JvcCwxMDA3LDc4OCwxOTcsMA.jpg'); */
`