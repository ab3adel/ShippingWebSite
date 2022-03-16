import React from  'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import Features3 from '../../components/features3'
import ServiceArea2 from '../../components/ServiceArea2'
import TruckArea from '../../components/Truck'
import TeamSection from '../../components/Team'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'


const ServiceSingle = () => {
    return(
       <div>
           <Navbar/>
           <Breadcumb bdtitle={'Service Single'} bdsub={'Service'}/>
           <Features3/>
           <ServiceArea2/>
           <TruckArea/>
           <TeamSection/>
           <Newsletter nwclass={'wpo-newsletter-section'}/>
           <FooterSection/>
       </div>
    )
}

export default ServiceSingle;