import React, { useState } from 'react'
import {ShippingRequestForm} from '../../components/shippingRequestForm'
import FooterSection from '../../components/Footer'
import './shippingrequestpage.scss'
import abimg2 from '../../images/about/222.png'
import NewAddress from '../../components/AddressForm'
import Offers from '../../components/offers'
import {Offer} from '../../components/offers/offer'
import {RequestButton} from './requestbutton'
import back from '../../images/shipping-request/back.jpg'
import pack from '../../images/shipping-request/packing.png'
import { useTranslation } from 'react-i18next';

 const ShippingRequest =() =>{
     const [visible,setVisible]=React.useState(false)
     let [stage,setStage]=useState(1)
     const tokenString = localStorage.getItem("token");
     const userToken = JSON.parse(tokenString);
     const [t, i18n] = useTranslation();
     let backImages=[back,pack]

     const handleStage =()=>{
         console.log(stage)
         let collection =document.querySelectorAll('.stage')
        
         if (stage ===3) return
         setStage(++stage)
         collection[stage-1].classList.add('currentStage')
         
     }
    return (
        <div>
        {/* <Navbar /> */}
        <div className={'section shippingRequestSection '} 
             style={{backgroundImage:`url(${backImages[stage-1]})`}}>
            <div className='container'>
                
                <div className='row shippingRequestIntro'>
                    <div className="row">

                        <div className="col-md-12  ">
                                <h3>{t('Send Shipment')}</h3>
                        </div>
                    </div>
                   <div className=" col-md-12 row ">
                       <div className=" col-md-4  horizonal-align currentStage stage"
                         >
                        <div className="shipping-icon">

                          <i class="fa fa-id-card-o" aria-hidden="true"></i>
                        </div>
                          <p>
                          {t('Fill Your Form')}
                          </p> 
                       </div>
                       <div className=" col-md-4 horizonal-align stage">
                           <div className='shipping-icon'>
                              <i class="fa fa-bus" aria-hidden="true"></i>
                           </div>
                           <p>

                              {t('Choose Best Offer')}
                           </p>
                       </div>
                       <div className=" col-md-4 horizonal-align stage">
                           <div className='shipping-icon'>
                              <i class="fa fa-bus" aria-hidden="true"></i>
                           </div>
                           <p>

                                {t('Ready To Send')}
                           </p>
                       </div>
                    </div>
                </div>
                <div className='row shippingRequestRow '>
                    
                    <div className='col-md-8 shippingRequestCol '
                     >
                   {stage ===1 &&(

                        <ShippingRequestForm setVisible={setVisible} />
                        
                   )}
                   {
                       stage===2 && (<Offers handleStage={handleStage} />)
                   }
                   {
                       stage===3 && (<Offer />)
                   }
                       <img src={abimg2} className='loginImg'></img>
                    </div>
                   
                </div>
                
         
               <RequestButton stage={stage} handleStage={handleStage}/>
            
            </div>

        </div>

        <FooterSection />
        {visible && (
            <NewAddress userToken={userToken} visible={visible} setVisible={setVisible}/>
        )}
    </div>
    )
}
export default ShippingRequest;