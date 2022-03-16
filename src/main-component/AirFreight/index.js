import React from  'react';
// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import TransportAir from '../../components/TransportAir'
import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'

import air1 from '../../images/air/1.jpg'
import air2 from '../../images/air/2.jpg'

const AirFreight = () => {
    return(
       <div>
           <Navbar/>
           <Breadcumb bdtitle={'Air Freight'} bdsub={'Air Freight'}/>
           <TransportAir simg={air1} simg2={air2}/>
           <Newsletter/>
           <FooterSection/>
       </div>
    )
}

export default AirFreight;