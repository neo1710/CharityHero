import React from 'react'
 import TopAd from "../components/HomePageComponents/TopAd"
 import Guide from "../components/HomePageComponents/Guide"
 import Banner from "../components/HomePageComponents/Banner"
 import CardBanner from "../components/HomePageComponents/CardBanner"
 import Bottom from "../components/HomePageComponents/Bottom"
import ProductSlider from '../components/HomePageComponents/Slider'

 function Home() {
  return (
    <div>
         <br />
        <TopAd/>
        <br />
        <Guide/>
        <br />
        <Banner/>
        <br />
        <CardBanner/>
        <br />
         <ProductSlider/>
         <br/>
        <Bottom/>   

    </div>
  )
}

export default Home