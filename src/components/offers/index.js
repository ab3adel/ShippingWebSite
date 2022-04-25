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
            setData([{
                image: dhl, companyName: 'DHL',
                dDate: rateStatus.DHL.products ? rateStatus.DHL.products[0].deliveryCapabilities.estimatedDeliveryDateAndTime.slice(0, 10) : ""
                , price: rateStatus.DHL.products ? rateStatus.DHL.products[0].totalPrice[0].price : '', msg: rateStatus.DHL.title ? rateStatus.DHL.title : "", success: rateStatus.DHL.products ? true : false
            },
            { image: ups, companyName: 'Aramex', dDate: "", price: rateStatus.Aramex.TotalAmount.Value, success: !rateStatus.Aramex.HasErrors, msg: '' },
            {
                image: fedex, companyName: 'Fedex', dDate: rateStatus.FedEx.output.rateReplyDetails[0] && rateStatus.FedEx.output.rateReplyDetails[0].operationalDetail && rateStatus.FedEx.output.rateReplyDetails[0].operationalDetail.deliveryDate ? rateStatus.FedEx.output.rateReplyDetails[0].operationalDetail.deliveryDate.slice(0, 10) : "",
                price: rateStatus.FedEx.output.rateReplyDetails[0].ratedShipmentDetails[0].totalNetChargeWithDutiesAndTaxes,
                success: true, msg: ''
            }])
        }
        else { setData([]) }
    }, [rateStatus, success])
    console.log('rate', rateStatus)
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
                return (<Company handleStage={handleStage}
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

                />)
            })}


        </div>
    )
}
export default Offers;