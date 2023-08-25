
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
    const [upiId,setUpiID]=useState("")
    const handlepayment=()=>{
if(upiId.length>4&&upiId.includes("@")){

}
else{

        alert('Please fill you correct UPI ID')
    }
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
    <h2>Google Pay</h2>
    </div>
    <div  onClick={()=>setIsPayTrue({
        google:false,
        phone:true,
        paytm:false
    })} className={Style.everyOption}>

    <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1577193138_bhim-upi.png" alt="" />
    <h2>Phone Pe</h2>
    </div>
    <div onClick={()=>setIsPayTrue({
        google:false,
        phone:false,
        paytm:true
    })}  className={Style.everyOption}>
    <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1558704583_paytmupi.png" alt="" />
    <h2>Paytm</h2>
    </div>
  </div>

 {google&&<div className={Style.Upi_id}>
  <FormControl isRequired>
  <FormLabel>Inter your google Pay UPI ID</FormLabel>
  <Input onChange={e=>setUpiID(e.target.value)} value={upiId} w={{ base: "70%", md: "60%", lg: "50%" }} placeholder='google Pay UPI ID' />
</FormControl>
<Button onClick={handlepayment} mt={"1rem"}  w={{ base: "60%", md: "50%", lg: "40%" }} colorScheme='teal' variant='solid'>
CLICK FOR FUND
  </Button>
  </div>}
 {phone&&<div className={Style.Upi_id}>
  <FormControl isRequired>
  <FormLabel>Inter your Phone Pe UPI ID</FormLabel>
  <Input onChange={e=>setUpiID(e.target.value)} value={upiId} w={{ base: "70%", md: "60%", lg: "50%" }} placeholder='Phone Pe UPI ID' />
</FormControl>
<Button onClick={handlepayment} mt={"1rem"}  w={{ base: "60%", md: "50%", lg: "40%" }} colorScheme='teal' variant='solid'>
CLICK FOR FUND
  </Button>
  </div>}
 {paytm&&<div className={Style.Upi_id}>
  <FormControl isRequired>
  <FormLabel>Inter your Paytm UPI ID</FormLabel>
  <Input onChange={e=>setUpiID(e.target.value)} value={upiId} w={{ base: "70%", md: "60%", lg: "50%" }} placeholder='Paytm UPI ID' />
</FormControl>
<Button onClick={handlepayment} mt={"1rem"}  w={{ base: "60%", md: "50%", lg: "40%" }} colorScheme='teal' variant='solid'>
  CLICK FOR FUND
  </Button>
  </div>}
    </div>
  )
}

export default BhimUpi
