import React from 'react'
import Style from './Checkout.module.css'
const BankList = ({setBankName}) => {

const AllBankList=[
    {
    id:1,
    name:"State Bank Of India",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png"
},
{
id:2,
name:"Axis Bank",
image:"https://companieslogo.com/img/orig/AXISBANK.BO-8f59e95b.png?t=1672905040"
}]



  return (
    <div className={Style.BankList_Container} >

    <div className={Style.BankList} style={{marginTop:"1.5rem"}}>
    <div className={Style.bankName}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png' alt='SBI' />
        <span>State Bank Of India</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>
   
    <div className={Style.BankList}>
    <div className={Style.bankName}>
        <img src='https://companieslogo.com/img/orig/AXISBANK.BO-8f59e95b.png?t=1672905040' alt='Axis' />
        <span>Axis Bank</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>
    <div className={Style.BankList}>
    <div className={Style.bankName}>
        <img src='' alt='SBI' />
        <span>SBI</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>
    <div className={Style.BankList}>
    <div className={Style.bankName}>
        <img src='' alt='SBI' />
        <span>SBI</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>
    <div className={Style.BankList}>
    <div className={Style.bankName}>
        <img src='' alt='SBI' />
        <span>SBI</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>
    <div className={Style.BankList}>
    <div className={Style.bankName}>
        <img src='https://companieslogo.com/img/orig/PNB.NS-f0a1e3ee.png?t=1611211975' alt='PNB' />
        <span>Punjab National Bank</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>
    <div className={Style.BankList} style={{marginBottom:"1.5rem"}}>
    <div className={Style.bankName}>
        <img src='' alt='SBI' />
        <span>SBI</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>


    </div>
  )
}

export default BankList
