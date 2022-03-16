import React from  'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import TeamSection from '../../components/Team'
import Testimonial from '../../components/testimonial'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'


const TeamPage = () => {
    return(
       <div className="price-sec">
           <Navbar/>
           <Breadcumb bdtitle={'Our Team'} bdsub={'Team'}/>
           <TeamSection/>
           <Testimonial/>
           <Newsletter/>
           <FooterSection/>
       </div>
    )
}

export default TeamPage;