import './offers.scss'
import ups from '../../images/shipping-request/ups.svg'
import fedex from '../../images/shipping-request/fedex.svg'
import dhl from '../../images/shipping-request/dhl.svg'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Company } from './company'
const Offers = (props) => {
    let { setActiveOffer, handleStage, handleFields, rateStatus, success } = props
    const [t, i18n] = useTranslation();
    let [data, setData] = useState([])


    useEffect(() => {
        if (success) {
            let fedexOutput= null
            let dhlOutput =null
            if (rateStatus && rateStatus.FedEx && rateStatus.FedEx.output && rateStatus.FedEx.output.rateReplyDetails ){

                fedexOutput = rateStatus.FedEx.output.rateReplyDetails[0]
            }
            if (rateStatus && rateStatus.DHL && rateStatus.DHL.products) {
                dhlOutput= rateStatus.DHL.products[0]
            }
            setData([
                dhlOutput ?{
                image: dhl, companyName: 'DHL',
                dDate: dhlOutput.deliveryCapabilities.estimatedDeliveryDateAndTime.slice(0, 10)
                , price:dhlOutput.totalNetCharge 
                , msg: rateStatus.DHL.title ? rateStatus.DHL.title : ""
                , success: rateStatus.DHL.products ? true : false,
                company_id:rateStatus.DHL.company_id
                ,serviceName:null,serviceCode:null,required_documents:null
                ,signatureOptionType:null,commodityName:null,serviceId:null
                ,serviceType:null


            }:
            {
                image: dhl, companyName: 'DHL',msg:null
            }
            ,
            { image: ups, companyName: 'Aramex', dDate: "", 
            price: rateStatus.Aramex.TotalAmount.Value
            , success: !rateStatus.Aramex.HasErrors, msg: ''
           ,company_id:rateStatus.Aramex.company_id
           ,serviceName:null,serviceCode:null,required_documents:null
           ,signatureOptionType:null,commodityName:null,serviceId:null
           ,serviceType:null },
           fedexOutput?{
                image: fedex, companyName: 'Fedex',
                 dDate: fedexOutput && fedexOutput.operationalDetail && fedexOutput.operationalDetail.deliveryDate ? fedexOutput.operationalDetail.deliveryDate.slice(0, 10) : "",
                price: fedexOutput.ratedShipmentDetails[0].totalNetChargeWithDutiesAndTaxes,
                success: true, msg: '',serviceType:fedexOutput.serviceType
                ,serviceName:fedexOutput.serviceName,serviceId:fedexOutput.serviceDescription.serviceId,
                serviceCode:fedexOutput.serviceDescription.code,company_id:rateStatus.FedEx.company_id,
                required_documents:fedexOutput.commit.requiredDocuments
                ,signatureOptionType:fedexOutput.signatureOptionType
                ,commodityName:fedexOutput.commit.commodityName
              
            }:
            {
                image: fedex, companyName: 'Fedex',msg:null
            }
        ])
        }
        else { setData([]) }
    }, [rateStatus, success])
   
    const whiteBackground = (e) => {
        let div = e.currentTarget
        div.classList.add('whiteColor')
    }
    const lightWitheBackground = (e) => {

        let div = e.currentTarget
        div.classList.remove('whiteColor')
    }
    return (
        <div className='offersContainer container ' id='offersDIV'>
            {data.map((ele, index) => {
                return (
                    <Company handleStage={handleStage}
                    companyName={ele.companyName}
                    price={ele.price}
                    image={ele.image}
                    success={ele.success}
                    deliveryDate={ele.dDate}
                    msg={ele.msg}
                    setActiveOffer={setActiveOffer}
                    whiteBackground={whiteBackground}
                    lightWitheBackground={lightWitheBackground}
                    handleFields={handleFields}
                    key={index}
                    {...ele}
                    

                />)
            })}


        </div>
    )
}
export default Offers;