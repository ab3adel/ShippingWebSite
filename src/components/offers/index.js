import './offers.scss'
import ups from '../../images/shipping-request/ups.svg'
import fedex from '../../images/shipping-request/fedex.svg'
import dhl from '../../images/shipping-request/dhl.svg'
import React from 'react'
import { useTranslation } from 'react-i18next';
import {Company} from './company'
const Offers = (props) =>{
    let {handleStage,handleFields}=props
    const [t, i18n] = useTranslation();
    let data=[{image:dhl,companyName:'dhl',price:130},
               {image:ups,companyName:'ups',price:200},
               {image:fedex,companyName:'fedex',price:300}]
const whiteBackground =(e)=>{
    let div = e.currentTarget
    div.classList.add('whiteColor')
}
const lightWitheBackground =(e)=>{

    let div = e.currentTarget
    div.classList.remove('whiteColor')
}
return (
    <div className='offersContainer container'>
       {data.map((ele,index)=>{
           return (<Company handleStage={handleStage}
                         companyName={ele.companyName}
                         price={ele.price}
                         image={ele.image}
                            whiteBackground={whiteBackground}
                            lightWitheBackground={lightWitheBackground}
                            handleFields={handleFields}
                            key={index}

                         />)
       })}
       
      
    </div>
)
}
export default Offers;