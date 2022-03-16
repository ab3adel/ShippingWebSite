import React from  'react';

// components
import Navbar from '../../components/Navbar'
import SimpleSlider from '../../components/hero'
import Features from '../../components/features'
import AboutSection from '../../components/about'
import ServiceArea from '../../components/ServiceArea'
import TruckArea from '../../components/Truck'
import WpoFeatures from '../../components/wpofeatures'
import CounterSection from '../../components/CounterSection'
import PricingSection from '../../components/Pricing'
import Testimonial from '../../components/testimonial'
import TeamSection from '../../components/Team'
import BlogSection from '../../components/BlogSection'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'


const Homepage = () => {
    return(
       <div>
           <Navbar/>
           <SimpleSlider/>
           <Features/>
           <AboutSection/>
           <ServiceArea/>
           <TruckArea/>
           <WpoFeatures/>
           <CounterSection/>
           <PricingSection/>
           <Testimonial/>
           <TeamSection/>
           <BlogSection/>
           <Newsletter/>
           <FooterSection/>
       </div>
    )
}

export default Homepage;