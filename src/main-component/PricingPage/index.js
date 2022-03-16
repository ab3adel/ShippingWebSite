import React from  'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import PricingSection from '../../components/Pricing'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'


const PricingPage = () => {
    return(
       <div className="price-sec">
           <Navbar/>
           <Breadcumb bdtitle={'Our Pricing'} bdsub={'Our Pricing'}/>
           <PricingSection/>
           <Newsletter/>
           <FooterSection/>
       </div>
    )
}

export default PricingPage;