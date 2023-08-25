import React from 'react'
import "../../styles/homecss/topad.css"
import { Link } from 'react-router-dom'

const TopAd = () => {
  return (
    <div className='topAd'>
        <div>
            <h1>We know you need <br /> funds, we are here to <br /> help you</h1>
            <Link to={"/login"}><button>Start Charity Hero</button></Link>
        </div>
        <div>
            <img width={"100%"} src="https://i0.wp.com/crowdfunding.milaap.org/wp-content/uploads/2022/07/Bkgnd-image-above-fold.png?w=1392&ssl=1" alt="" />
        </div>
    </div>
  )
}

export default TopAd