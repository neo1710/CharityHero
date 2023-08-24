import React from 'react'
import "../../styles/homecss/guide.css"

const Guide = () => {
  return (
    <div className='guideMain'>
        <div>
            <h1>Fundraising on CharityHero <br /> takes just a few minutes</h1>
        </div>
        <div className='steps'>
            <div>
                <div className='num'><div>1</div></div>
                <div>
                    <div className='hedG'>Start with the basics</div>
                    <p>Kick things off with your name and location.</p>
                </div>
            </div>
            <div>
                <div className='num'><div>2</div></div>
                <div>
                    <div className='hedG'>Tell your story</div>
                    <p>We'll guide you with tips along the way.</p>
                </div>
            </div>
            <div>
                <div className='num'><div>3</div></div>
                <div>
                    <div className='hedG'>Share with friends and family</div>
                    <p>People out there want to help you.</p>
                </div>
            </div>
         
        </div>
    </div>
  )
}

export default Guide