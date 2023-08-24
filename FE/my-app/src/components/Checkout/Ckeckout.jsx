import React, { useState } from 'react'
import Style from './Checkout.module.css'
import payment_optionImage from '../../Images/CheckoutStrip.png'
import payment_assurance from '../../Images/all-assurance-offering.png'
import CreditCard from './CreditCard'
import NetBanking from './NetBanking'
import BhimUpi from './BhimUpi'
import QRcode from './QRcode'
import BankList from './BankList'

const initialOptions = {
  Credit:true,
  BHIM:false,
  Banking:false,
  UPI:false
}
const Ckeckout = () => {
const [checkOptinTrue,setcheckOptinTrue]=useState(initialOptions)
const [bankName,setBankName]=useState({})
console.log(bankName)

const {Credit,BHIM,Banking,UPI}=checkOptinTrue
  return (
    <div className={Style.checkout_main}>
      <div className={Style.manege}>

      <div className={Style.payment_option}>
<h4>PAYMENT OPTIONS</h4>
      </div>


      <div className={Style.secure}>
  
<div className={Style.left}>
<button onClick={()=>setcheckOptinTrue({
  Credit:true,
  BHIM:false,
  Banking:false,
  UPI:false
})} className={Credit?Style.Payment_option_btn_Active:Style.Payment_option_btn}>Credit/Debit Card</button>
<button onClick={()=>setcheckOptinTrue({
  Credit:false,
  BHIM:true,
  Banking:false,
  UPI:false
})} className={BHIM?Style.Payment_option_btn_Active:Style.Payment_option_btn}>BHIM UPI / PhonePe</button>
<button onClick={()=>setcheckOptinTrue({
  Credit:false,
  BHIM:false,
  Banking:true,
  UPI:false
})} className={Banking?Style.Payment_option_btn_Active:Style.Payment_option_btn}>Net Banking</button>
<button onClick={()=>setcheckOptinTrue({
  Credit:false,
  BHIM:false,
  Banking:false,
  UPI:true
})} className={UPI?Style.Payment_option_btn_Active:Style.Payment_option_btn}>UPI QR Code</button>
{/* <button className={Style.Payment_option_btn}>Cash On Delivery</button> */}
</div>
<div className={Style.right}>
<div className={Style.secure_photo}>
  <p className={Style.secure_100}>100% Secure</p>
  <img src={payment_optionImage} alt="" />
</div>
{Credit&&<CreditCard/>}
{Banking&&((bankName.name&&bankName.image)?<NetBanking bankName={bankName} setBankName={setBankName} />:<BankList setBankName={setBankName}  />)}
{BHIM&&<BhimUpi/>}
{UPI&&<QRcode/>}
</div>
      </div>

      <div className={Style.t_and_c}>
<p>By placing the order,I have read and agreed lenskart.com</p>
<a href="#" style={{color:"#68ebed"}}>T&C</a>
      </div>
     <div className={Style.Cancellation}>
      <h1>Lenskart Assurance </h1>
      <p>Cancellation Policy {">"}</p>
     </div>
     <div>
      <img className={Style.payment_assurance} src={payment_assurance} alt="" />
     </div>


     </div>
    </div>
  )
}

export default Ckeckout
