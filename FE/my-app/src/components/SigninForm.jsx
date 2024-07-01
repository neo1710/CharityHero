import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Input,
  Heading
} from '@chakra-ui/react'

  export const SigninForm=()=>{
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [org,setOrg]=useState("");
  let [bool,setBool]=useState(false);
  let [load,setload]=useState(false);
  let [err,setErr]=useState(false);
 let navigate=useNavigate();
  useEffect(()=>{
if(bool){
  setTimeout(() => {
   navigate('/login'); 
  }, 2000);

}
  },[bool])
function signin(e){
    e.preventDefault();
let data={email,password:pass,organization:org,name};
setload(true);
  axios.post(`https://ivory-ox-kilt.cyclic.cloud/user/register`,data).then((res)=>{
console.log(res);
setBool(true);
setload(false)
  }).catch((err)=>{
    console.log(err);
    setload(false)
  })  
  setName("");
  setEmail("");
  setOrg("");
  setPass("");
}

  console.log({name,email,pass,org});

    return (<>
      { load?<Spinner size='xl' />:   <DIV className='div'>
       {bool? <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle color={'#02a95c'} mt={4} mb={1} fontSize='lg'>
          User has been registered
        </AlertTitle>
        <AlertDescription color={'#02a95c'} maxWidth='sm'>
          Thanks for Signing up.
        </AlertDescription>
      
      </Alert> : <div >
            <Heading id="head">Register Here</Heading><br />
<form >
    <label>Name</label><br />
<Input  className='Input' value={name} onChange={(e)=>{setName(e.target.value)}}
type="text" required /><br />
<label>Email</label><br />
         <Input  className='Input' value={email} onChange={(e)=>{setEmail(e.target.value)}}
         type="text" required /><br />
         <label >Password</label><br />
         <Input  className='Input' value={pass} onChange={(e)=>{setPass(e.target.value)}}
         type="password" required /><br />
         <label>Organization</label><br />
         <Input className='Input' value={org} onChange={(e)=>{setOrg(e.target.value)}}
         type="text" required /><br />
         <button type='submit' onClick={(e)=>{signin(e)}}>SUBMIT</button>
</form>
</div>}
  
        </DIV>}
        </>
    )
  }


  const DIV=styled.div`
width: 40%;
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
margin: auto;
background-color: white;
padding: 20px;
#head {
    color: #02a95c;
  }
  label{
    color: #02a95c;
    font-weight: bolder;
  }
.Input {
    border: #02a95c 1px solid;
    padding: 10px;
    border-radius: 5px;
    width:60%;
  }
h1{
  color:#02a95c;
}
button{
    background-color: #02a95c;;
    color: white;
    padding: 4px;
    border: 1px lightgreen solid;
    margin-top: 10px;
}
button:hover{
    background-color: lightgray;
    border:1px solid black;
}
@media (min-width: 10px) and (max-width:500px) {
    #head{
      font-size: large;
    }
  .Input {
    border: #02a95c 1px solid;
    border-radius: 5px;
    width:60%;
  }
  .div {
    width: 70%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin: auto;
    background-color: white;
    padding: 20px;
  }
 
  }
  `