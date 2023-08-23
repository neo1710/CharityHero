
import React, { useState } from 'react'
import Style from './Checkout.module.css'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
  } from '@chakra-ui/react'
const BhimUpi = () => {
    const [IspayTrue,setIsPayTrue]=useState({
        google:true,
        phone:false,
        paytm:false
    })

    const handlepayment=()=>{
        alert('hello world')
    }
    const {google,phone,paytm}=IspayTrue
  return (
    <div className={Style.BhimUpi_Main}>
  <div className={Style.multipleOption}>
    <div  onClick={()=>setIsPayTrue({
        google:true,
        phone:false,
        paytm:false
    })}  className={Style.everyOption}>
    <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1554965305_google-pay.png" alt="" />
    <h1>Google Pay</h1>
    </div>
    <div  onClick={()=>setIsPayTrue({
        google:false,
        phone:true,
        paytm:false
    })} className={Style.everyOption}>

    <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1577193138_bhim-upi.png" alt="" />
    <h1>Phone Pe</h1>
    </div>
    <div onClick={()=>setIsPayTrue({
        google:false,
        phone:false,
        paytm:true
    })}  className={Style.everyOption}>
    <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1558704583_paytmupi.png" alt="" />
    <h1>Paytm</h1>
    </div>
  </div>

 {google&&<div className={Style.Upi_id}>
  <FormControl isRequired>
  <FormLabel>Inter your google Pay UPI ID</FormLabel>
  <Input w={{ base: "70%", md: "60%", lg: "50%" }} placeholder='google Pay UPI ID' />
</FormControl>
<Button onClick={handlepayment} mt={"1rem"}  w={{ base: "60%", md: "50%", lg: "40%" }} colorScheme='teal' variant='solid'>
    Button
  </Button>
  </div>}
 {phone&&<div className={Style.Upi_id}>
  <FormControl isRequired>
  <FormLabel>Inter your Phone Pe UPI ID</FormLabel>
  <Input w={{ base: "70%", md: "60%", lg: "50%" }} placeholder='Phone Pe UPI ID' />
</FormControl>
<Button onClick={handlepayment} mt={"1rem"}  w={{ base: "60%", md: "50%", lg: "40%" }} colorScheme='teal' variant='solid'>
    Button
  </Button>
  </div>}
 {paytm&&<div className={Style.Upi_id}>
  <FormControl isRequired>
  <FormLabel>Inter your Paytm UPI ID</FormLabel>
  <Input w={{ base: "70%", md: "60%", lg: "50%" }} placeholder='Paytm UPI ID' />
</FormControl>
<Button onClick={handlepayment} mt={"1rem"}  w={{ base: "60%", md: "50%", lg: "40%" }} colorScheme='teal' variant='solid'>
    Button
  </Button>
  </div>}
    </div>
  )
}

export default BhimUpi
