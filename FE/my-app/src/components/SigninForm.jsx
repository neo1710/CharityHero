import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';



  export const SigninForm=()=>{
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [org,setOrg]=useState("");

function signin(e){
    e.preventDefault();
let data={email,password:pass,organization:org,name};
  axios.post(`https://ivory-ox-kilt.cyclic.cloud/user/register`,data).then((res)=>{
console.log(res);
  }).catch((err)=>{
    console.log(err);
  })  
}

  console.log({name,email,pass,org});

    return (
        <DIV>
            <label>Register Here</label>
<form >
    <label>Name</label><br />
<input value={name} onChange={(e)=>{setName(e.target.value)}}
type="text" required placeholder="name"/><br />
<label>Email</label><br />
         <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
         type="text" required placeholder="email"/><br />
         <label >Password</label><br />
         <input value={pass} onChange={(e)=>{setPass(e.target.value)}}
         type="password" required placeholder="password"/><br />
         <label>Organization</label><br />
         <input value={org} onChange={(e)=>{setOrg(e.target.value)}}
         type="text" required placeholder="organization"/><br />
         <button type='submit' onClick={(e)=>{signin(e)}}>SUBMIT</button>
</form>

        </DIV>
    )
  }


  const DIV=styled.div`
width: 50%;
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
margin: auto;
background-color: white;
padding: 20px;
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
  `