import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { loginReq } from '../redux/AuthReducer/action';

  export const Login=()=>{
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  let navigate=useNavigate();
  let location=useLocation();
  console.log('loc',location)
  let check=useSelector((store)=>store.authReducer);
  console.log(check);
let dispatch=useDispatch()
useEffect(()=>{
if(check.isAuth===true){
navigate(location.state);
}
},[check])


function doit(e){
    e.preventDefault();
    let data={email,password:pass}
 dispatch(loginReq(data));
 console.log(data);
setEmail("");
setPass("");
}

  console.log({email,pass});

    return (
       <DIV>
       
       <div>
            <label>LOGIN HERE</label>
<form >
<label>Email</label><br />
         <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
         type="text" required placeholder="email"/><br />
         <label >Password</label><br />
         <input value={pass} onChange={(e)=>{setPass(e.target.value)}}
         type="password" required placeholder="password"/><br />
         <button type='submit' onClick={(e)=>{doit(e)}}>SUBMIT</button>
</form>
<a>if you are not a user <Link to='/signup' className='link'>register here</Link> </a>
        </div>
        </DIV>
    )
  }

const DIV=styled.div`
width :100% ;
height: 500px;
padding-top:150px;
background-image: url('https://www.gofundme.com/en-gb/c/wp-content/uploads/sites/11/2021/04/hand-wing-people-love-heart-symbol-1361975-pxhere.com_.jpg?w=1024');
div{
width: 50%;
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
margin: auto;

background-color: white;
padding: 20px;
}
input{
   border :green 1px solid ;
}
button{
    background-color: green;
    color: white;
    border: 1px lightgreen solid;
}
button:hover{
    background-color: lightgray;
    border:1px solid black;
}
.link{
   color :green ;
}
`