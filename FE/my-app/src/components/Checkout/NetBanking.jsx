import React, { useState } from 'react'
import Style from './Checkout.module.css'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useStatStyles,
} from '@chakra-ui/react'

const initialUserDetail={
  userName:"",
  password:""
}
const NetBanking = ({bankName,setBankName}) => {

  const [bankingdata,setBankingData]=useState(initialUserDetail)

  console.log();

  const handlepayment=()=>{

  }
  return (
    <div>
      <div style={{margin:".5rem",width:"90%"}}>
        <button onClick={()=>setBankName({})} style={{width:"100%",padding:".5rem",backgroundColor:"rgb(35, 209, 12)",border:"3px solid black",borderRadius:"7px",fontSize:"18px",fontWeight:"600",color:"black"}}>Change Bank</button>
      </div>
<div  className={Style.BankList} style={{marginTop:"1.5rem"}}>
    <div className={Style.nextSymboleLogo1}>
      {/* <h1>{bankName.name=="State Bank Of India"?"yono":""}</h1> */}
        <img src={bankName.image} alt='SBI' />
        <span>{bankName.name}</span>
    </div>
    <div className={Style.nextSymboleLogo}>
    <img src={bankName.image} alt='SBI' />
        <span>{bankName.name}</span>
    </div>
    </div>
    <div style={{marginTop:"1rem"}}>

      <h1>LOGIN</h1>
    </div>
    <div className={Style.Upi_id_card}>
    <FormControl isRequired>
  <FormLabel>User Name</FormLabel>
  <Input placeholder='User Name' type='text' value={bankingdata.userName} onChange={(e)=>setBankingData(prev=>({...prev,userName:e.target.value}))} isRequired/>
</FormControl>
    </div>
    <div className={Style.Upi_id_card}>
    <FormControl isRequired>
  <FormLabel>Password</FormLabel>
  <Input placeholder='Password' type='password' value={bankingdata.password} onChange={(e)=>setBankingData(prev=>({...prev,password:e.target.value}))} isRequired/>
</FormControl>
    </div>
 
    <div style={{display:"flex"}}>
    <Button onClick={handlepayment} m={"1rem"}  w={"90%"} colorScheme='teal' variant='solid'>
    LOGIN
  </Button>
    <Button onClick={()=>setBankingData(initialUserDetail)}  m={"1rem"}  w={"90%"} colorScheme='teal' variant='solid'>
    RESET
  </Button>
    </div>
    </div>
  )
}

export default NetBanking
