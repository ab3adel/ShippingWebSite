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
     const [formFields,setFormFields]=useState({
         SenderAddress:'',RecipientAddress:''
         ,Type:'',Date:'',Width:'',Length:'',Recipient:"",
         Height:'',Weight:'',SenderAddressError:false,
         RecipientAddressError:false,TypeError:false,
         DateError:false,WidthError:false,LengthError:false,
         HeightError:false,WeightError:false,RecipientError:false
        
     })
     const [addressFormType,setAddressFormType]=useState({type:"address",isSender:true})
     let [stage,setStage]=useState(1)
     const tokenString = localStorage.getItem("token");
     const userToken = JSON.parse(tokenString);
     const [t, i18n] = useTranslation();
     let backImages=[back,pack]

     const handleStage =(type)=>{
        if(checkError()) return
         let collection =document.querySelectorAll('.stage')
        if (type=== "Next"){

            if (stage ===3) return
            setStage(++stage)
            collection[stage-1].classList.add('currentStage')
        }
        if (type==="Previous") {
            if (stage ===1) return
            setStage(--stage)
            collection[stage].classList.remove('currentStage')
        }
         
     }
     const handleFields=(name,value)=>{
 
         let newFormFields={...formFields}
         newFormFields[name]=value
         setFormFields(pre => ({...pre,...newFormFields}))
     }
     const checkError=()=>{
         
        let newFormFields={...formFields}
        let emptyVal=Object.keys(newFormFields)
           .filter(ele=>!newFormFields[ele] && !ele.includes('Error'))

        if (emptyVal.length===0) return false
        emptyVal.forEach(ele=>{
            newFormFields[`${ele}Error`]=true 
            
        })
        setFormFields(newFormFields)
        return true
       
     }
    const handleAddressForm=(type,isSender) =>{
        setAddressFormType(pre=>({...pre,type,isSender}))
        setVisible(true)
    }
    return (
        <div>
        {/* <Navbar /> */}
        <div className={'section shippingRequestSection '} 
             style={{backgroundImage:`url(${backImages[stage-1]})`}}>
            <div className='container padding-top'>
                
                <div className='row shippingRequestIntro'>
                    <div className="row">

                        <div className="col-md-12  ">
                                <h3>{t('Send Shipment')}</h3>
                        </div>
                    </div>
                   <div className=" col-md-12 row ">
                       <div className=" col-md-4 horizonal-align currentStage stage "
                         >
                        <div className="shipping-icon  d-flex align-times-center">

                          <i class="fa fa-id-card-o" aria-hidden="true"></i>
                        </div>
                          <p  className="d-flex justify-content-center ">
                          {t('Fill Your Form')}
                          </p> 
                       </div>
                       <div className=" col-md-4 horizonal-align stage">
                           <div className='shipping-icon'>
                           <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
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

                        <ShippingRequestForm 
                        
                        handleFields={handleFields}
                        formFields={formFields}
                        handleAddressForm={handleAddressForm}
                        />
                        
                   )}
                   {
                       stage===2 && (<Offers handleStage={handleStage}  handleFields={handleFields}/>)
                   }
                   {
                       stage===3 && (<Offer formFields={formFields} />)
                   }
                       <img src={abimg2} className='loginImg'></img>
                    </div>
                   
                </div>
                
                <div className="row nextStage col-md-12">
                   <RequestButton Type="Next" stage={stage} handleStage={handleStage}/>
                   <RequestButton Type="Previous" stage={stage} handleStage={handleStage}/>
               </div>
            
            </div>

        </div>

        <FooterSection />
        {visible && (
            <NewAddress 
            isSender={addressFormType.isSender}
            type={addressFormType.type}
            userToken={userToken} 
            visible={visible} 
            setVisible={setVisible}/>
        )}
    </div>
    )
}
export default ShippingRequest;