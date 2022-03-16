import React from  'react';

// components
import Navbar from '../../components/Navbar'
import SimpleSlider from '../../components/hero'
import Features from '../../components/features'
import AboutSection3 from '../../components/about3'
import ServiceArea3 from '../../components/ServiceArea3'
import WpoFeatures from '../../components/wpofeatures'
import Testimonial from '../../components/testimonial'
import TeamSection from '../../components/Team'
import BlogSection from '../../components/BlogSection'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'


const Homepage3 = () => {
    return(
       <div>
           <Navbar/>
           <SimpleSlider/>
           <Features tbclass={'wpo-section-area-3'}/>
           <AboutSection3/>
           <ServiceArea3/>
           <WpoFeatures/>
           <Testimonial/>
           <TeamSection/>
           <BlogSection/>
           <Newsletter/>
           <FooterSection/>
       </div>
    )
}

export default Homepage3;