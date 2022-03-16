import React from 'react';

// components

import SimpleSlider from '../../components/hero'
import Features2 from '../../components/features2'
import AboutSection2 from '../../components/about2'
import ServiceArea2 from '../../components/ServiceArea2'
import TruckArea from '../../components/Truck'
import WpoFeatures from '../../components/wpofeatures'
import CounterSection from '../../components/CounterSection'
import PricingSection from '../../components/Pricing'
import Testimonial from '../../components/testimonial'
import TeamSection from '../../components/Team'
import BlogSection2 from '../../components/BlogSection2'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'


const Homepage2 = () => {
    return (
        <div>

            <SimpleSlider />
            <TruckArea />
            <CounterSection subclass={'counter-style-2'} />
            <Features2 />

            <ServiceArea2 />

            <WpoFeatures />

            {/* <PricingSection/> */}
            {/* <Testimonial /> */}
            {/* <TeamSection/> */}
            {/* <BlogSection2 /> */}
            {/* <Newsletter/> */}
            <FooterSection />
        </div>
    )
}

export default Homepage2;