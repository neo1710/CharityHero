import React from 'react'
import "../../styles/homecss/cardbanner.css"
import yourself from "../../Images/start-yourself@2x.png"
import family from "../../Images/start-friends-Family@2x.png"
import charity from "../../Images/start-charity@2x.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; 
const CardBanner = () => {
  return (
    <div className='CBMain'>
        <div>
            <p>Make your Impact</p>
            <h2>Fundraise For ....</h2>
        </div>
        <div>
            <img width={"100%"} src={yourself} alt="" />
            <div>Yourself</div>
              <div className='arrow'>
              <FontAwesomeIcon icon={faArrowRight} />
              </div>
           
        </div>
        <div>
            <img width={"100%"} src={family} alt="" />
            <div>Family</div>
              <div  className='arrow'>
              <FontAwesomeIcon icon={faArrowRight} /> 
              </div>
            
        </div>
        <div>
            <img width={"100%"} src={charity} alt="" />
            <div>Charity</div>
             <div className='arrow'>
            <FontAwesomeIcon icon={faArrowRight} />
             </div>
        </div>
    </div>
  )
}

export default CardBanner