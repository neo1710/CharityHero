import React from 'react'
import Style from './Checkout.module.css'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react'

const initialcreaditData={
  name:"",
  card_Number:"",
  card_Cvv:"",
  card_Expiry:"",
  
}
const CreditCard = () => {

  const handlepayment=()=>{

  }
  return (
    <div>
    <div className={Style.Upi_id_card}>
    <FormControl isRequired>
  <FormLabel>Enter card number</FormLabel>
  <Input placeholder='Enter card number' type='Number' isRequired/>
</FormControl>
    </div>
    <div className={Style.Upi_id_cvc}>
      <div className={Style.account_number} style={{width:"60%"}}>
    <FormControl isRequired>
  <FormLabel>Card expiry date</FormLabel>
  <Input placeholder="MM/YYYY" />
</FormControl>

      </div>

      
      <div className={Style.account_number} style={{width:"30%"}}>
  <FormControl isRequired>
  <FormLabel>CVC</FormLabel>
  <Input type="Number"  placeholder='CVC' />
</FormControl>
      </div>
    </div>
    <div className={Style.Upi_id_card}>
    <FormControl isRequired>
  <FormLabel>Card holder name</FormLabel>
  <Input  placeholder="Card holder name" />
</FormControl>
    </div>
    <Button onClick={handlepayment} m={"1rem"}  w={"90%"} colorScheme='teal' variant='solid'>
    CLICK FOR FUND
  </Button>
    </div>
  )
}

export default CreditCard
