import './offers.scss'
import ups from '../../images/shipping-request/ups.svg'
import React from 'react'
import {useTranslation} from 'react-i18next'
export const Offer = (props) =>{
const {formFields}=props
const {i18n,t} =useTranslation()
    return (

        <div className="offerContainer">
           <div className="row col-md-12 d-flex justify-content-center">
               <div className='col-md-8 d-flex justify-content-center'>
                     <img src={ups} />
               </div>

           </div>
           <div className= "row col-md-12">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                <div className='offerDetail '>
                   {t('Name')}
                    <div className='bold'>{formFields['CompanyName']}</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                <div className='offerDetail '>
                    {t('Price')}
                    <div className='bold'>{formFields['OfferPrice']}$</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                <div className='offerDetail '>
                    {t('Sender Address')}
                    <div className='bold'>{formFields['SenderAddress']}</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                 <div className='offerDetail '>
                    {t('Recipient Address')}
                    <div className='bold'>{formFields['RecipientAddress']}</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className='offerDetail '>
                  { t("Shipment Type")}
                    <div className='bold'>{formFields['Type']}</div>
                </div>
              </div>
              
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className='offerDetail '>
                   {t("Width")}
                    <div className='bold'>{formFields['Width']}cm</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className='offerDetail '>
                   {t("Height")}
                    <div className='bold'>{formFields['Height']}cm</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className='offerDetail '>
                     {t("Date")}
                    <div className='bold'>{formFields['Date']}</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className='offerDetail '>
                     {t("Weight")}
                    <div className='bold'>{formFields['Weight']}Kg</div>
                </div>
              </div>
           </div>

        </div>
    )
}