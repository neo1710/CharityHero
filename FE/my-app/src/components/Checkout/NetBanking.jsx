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
  useDisclosure,
} from '@chakra-ui/react'
import {useSelector,useDispatch} from "react-redux"
import AlertPopup from './AlertPopup'
import { useNavigate } from 'react-router-dom'
import { PostDonationData } from '../../redux/RequestReducer/action'

const initialUserDetail={
  userName:"",
  password:""
}
const NetBanking = ({bankName,setBankName}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  //  const [cardData,setCardData]=React.useState(initialcreaditData)
  const [bankingdata,setBankingData]=useState(initialUserDetail)
 
   const allData=useSelector(store=>store.donateHistoryReducer)
   console.log("allData",allData);
  //  const {name,card_Number,card_Cvv,card_Expiry}=cardData
 

  // console.log();

  const handlepayment=()=>{
if(bankingdata.userName&&bankingdata.password){
  const userData= JSON.parse(localStorage.getItem("userDetails"))||{}
  let arr = new Date().toLocaleString().split(",").map((ele)=>ele.trim())
  const DonerDetails={
    donor:bankingdata.userName,
    amount:userData.amount,
    data:arr[0],
    time:arr[1],
    message:userData.message,
    userID:userData.userID,
    donationRequestID:userData._id
  }
  dispatch(PostDonationData(DonerDetails))
  setBankingData(initialUserDetail)
  onOpen() 
  
  setTimeout(()=>{
      navigate("/")
  },5000)
}
else{
  alert("Please fill all the fields")
}
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
    <AlertPopup onOpen={onOpen} isOpen={isOpen} onClose={onClose}/>
  </Button>
    <Button onClick={()=>setBankingData(initialUserDetail)}  m={"1rem"}  w={"90%"} colorScheme='teal' variant='solid'>
    RESET
  </Button>
    </div>
    </div>
  )
}

export default NetBanking
