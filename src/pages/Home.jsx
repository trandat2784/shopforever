import React from 'react'
import Hero from '../component/Hero'
import LastestCollection from '../component/LastestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewSletterBox from '../component/NewSletterBox'


const Home = () => {
  return (
    <div>
      <Hero/>
      
      <LastestCollection/>
      <BestSeller/>
      <OurPolicy  />
      <NewSletterBox/>
    </div>
  )
}

export default Home
