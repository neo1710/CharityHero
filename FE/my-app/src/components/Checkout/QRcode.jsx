import React from 'react'
import Style from './Checkout.module.css'
import googlepay from '../../Images/googlepay.jpeg'
import phonepe from '../../Images/phonepe.jpeg'
import Paytmimg from '../../Images/paytm.jpeg'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


function QRcode() {
const navigate=useNavigate()
  const [IspayTrue, setIsPayTrue] = React.useState({
    google: true,
    phone: false,
    paytm: false
  })

  const handleNAvigate=()=>{
    navigate("/")
  }
  const { google, phone, paytm } = IspayTrue
  return (
    <div className={Style.BhimUpi_Main}>
      <div className={Style.multipleOption}>
        <div onClick={() => setIsPayTrue({
          google: true,
          phone: false,
          paytm: false
        })} className={Style.everyOption}>
          <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1554965305_google-pay.png" alt="" />
          <h2>Google Pay</h2>
        </div>
        <div onClick={() => setIsPayTrue({
          google: false,
          phone: true,
          paytm: false
        })} className={Style.everyOption}>

          <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1577193138_bhim-upi.png" alt="" />
          <h2>Phone Pe</h2>
        </div>
        <div onClick={() => setIsPayTrue({
          google: false,
          phone: false,
          paytm: true
        })} className={Style.everyOption}>
          <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1558704583_paytmupi.png" alt="" />
          <h2>Paytm</h2>
        </div>
      </div>

      {google && <div className={Style.QR_code}>
        <img src={googlepay} id={Style.googlepay} alt="QR code" />
      </div>}
      {phone && <div className={Style.QR_code}>
        <img src={phonepe} alt="QR code" />
      </div>}
      {paytm && <div className={Style.QR_code}>
        <img src={Paytmimg} alt="QR code" />
      </div>}

      <Button onClick={handleNAvigate}  m={"1rem"}  w={"90%"} colorScheme='teal' variant='solid'>
    GO BACK TO HOME PAGE
  </Button>
    </div>
  )

}

export default QRcode
