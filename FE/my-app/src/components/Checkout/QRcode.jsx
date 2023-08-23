import React from 'react'
import Style from './Checkout.module.css'
import googlepay from '../../Images/googlepay.jpeg'
import phonepe from '../../Images/phonepe.jpeg'
import Paytmimg from '../../Images/phonepe.jpeg'


function QRcode() {

  const [IspayTrue, setIsPayTrue] = React.useState({
    google: true,
    phone: false,
    paytm: false
  })
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
          <h1>Google Pay</h1>
        </div>
        <div onClick={() => setIsPayTrue({
          google: false,
          phone: true,
          paytm: false
        })} className={Style.everyOption}>

          <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1577193138_bhim-upi.png" alt="" />
          <h1>Phone Pe</h1>
        </div>
        <div onClick={() => setIsPayTrue({
          google: false,
          phone: false,
          paytm: true
        })} className={Style.everyOption}>
          <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1558704583_paytmupi.png" alt="" />
          <h1>Paytm</h1>
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
    </div>
  )

}

export default QRcode
