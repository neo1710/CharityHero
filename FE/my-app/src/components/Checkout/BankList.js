import React from 'react'
import Style from './Checkout.module.css'
// import unioun from '../../Images/phonepe.jpeg'
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
},
{
id:3,
name:"Bank of Baroda",
image:"https://companieslogo.com/img/orig/BANKBARODA.NS-6790b239.png?t=1604067029"
},
{
id:4,
name:"Union Bank",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwrO1kKAIPFSWktF1vq8_PC7KyI-WJXuLAPatvdv2xXjfw9TwNE9NHIRJI6yhq7JUM5v4&usqp=CAU"
},
{
id:5,
name:"Punjab National Bank",
image:"https://companieslogo.com/img/orig/PNB.NS-f0a1e3ee.png?t=1611211975"
},
{
id:6,
name:"ICICI Bank",
image:"https://companieslogo.com/img/orig/IBN-af38b5c0.png?t=1648383607"
},
{
id:7,
name:"Allahabad Bank",
image:"https://w7.pngwing.com/pngs/463/478/png-transparent-allahabad-bank-purasawalkam-branch-bank-of-india-bank.png"
},
{
id:8,
name:"Corporation Bank",
image:"https://i.pinimg.com/474x/d0/c5/53/d0c553a53729dca9f52703c2165b498f.jpg"
},
{
id:9,
name:"Kotak Mahindra Bank",
image:"https://companieslogo.com/img/orig/KOTAKBANK.NS-36440c5e.png?t=1593960269"
},
{
id:6,
name:"Indian Overseas Bank",
image:"https://w7.pngwing.com/pngs/115/292/png-transparent-indian-overseas-bank-thumbnail-round-bank-logos.png"
},
]



  return (
    <div className={Style.BankList_Container} >   
    <h1 style={{paddingTop:"10px",borderBottom:"1px solid #4f676f",marginBottom:"20px",fontSize:"18px",fontWeight:"600",color:"green"}}>Select Bank</h1>
        {AllBankList?.map(item=> <div onClick={()=>setBankName(item)} key={item.id} className={Style.BankList} style={{marginTop:".5rem"}}>
    <div className={Style.bankName}>
        <img src={item.image} alt='SBI' />
        <span>{item.name}</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div>)}

    {/* <div className={Style.BankList} style={{marginTop:"1.5rem"}}>
    <div className={Style.bankName}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png' alt='SBI' />
        <span>State Bank Of India</span>
    </div>
    <div className={Style.nextSymbole}>
        <p>{">"}</p>
    </div>
    </div> */}
   
    {/* <div className={Style.BankList}>
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
    </div> */}


    </div>
  )
}

export default BankList
