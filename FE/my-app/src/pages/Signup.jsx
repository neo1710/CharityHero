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
height: 500px;
background-image: url('https://www.gofundme.com/en-gb/c/wp-content/uploads/sites/11/2021/04/hand-wing-people-love-heart-symbol-1361975-pxhere.com_.jpg?w=1024');
`