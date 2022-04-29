import './offers.scss'
import ups from '../../images/shipping-request/ups.svg'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {Button,Space} from 'antd'
import {AddCharges} from './addedcharges'
export const Offer = (props) => {
  const { formFields, activeOffer,handleFields,disableButton } = props
  const { i18n, t } = useTranslation()
  const [visible,setVisible]= React.useState(false)
  return (

    <div className="offerContainer">
      <div className="row col-md-12 d-flex justify-content-center">
        <div className='col-md-8 d-flex justify-content-center'>
          <img src={activeOffer['image']} />
        </div>

      </div>
      <div className="row col-md-12">
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t('Name')}
            <div className='bold'>{activeOffer['CompanyName']}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t('Price')}
            <div className='bold'>{activeOffer['OfferPrice'].toFixed(2)}{` ${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}</div>
          </div>
        </div>
       
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t("Shipment Type")}
            <div className='bold'>{formFields['Type']}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t("Length")}
            <div className='bold'>{formFields['Length']}{` ${i18n.language === 'ar' ? '(سم)' : "(CM)"}`}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t("Width")}
            <div className='bold'>{formFields['Width']}{` ${i18n.language === 'ar' ? '(سم)' : "(CM)"}`}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t("Height")}
            <div className='bold'>{formFields['Height']}{` ${i18n.language === 'ar' ? '(سم)' : "(CM)"}`}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {/* {t("Date")} */}
            {` ${i18n.language === 'ar' ? 'التاريخ' : "Date"}`}
            <div className='bold'>{formFields['Date']}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t("Weight")}
            <div className='bold'>{formFields['Weight']}{` ${i18n.language === 'ar' ? '(كجم)' : "(KG)"}`}</div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 d-flex justify-content-center">
      {  

         formFields['addedCharges'] && formFields['addedCharges'].length >0 ?
         <div className="row col-md-12 ">
            <div className="d-flex justify-content-center col-md-12 text-align-center">
              {t("ExtraCharges")}
              </div>
              {
                formFields['addedCharges'].map((ele,index)=>{
                  return (
                    <div  className="col-md-12 col-sm-12 d-flex justify-content-center" key={index}>

                          <div className='offerDetail ' >
                            {ele.name}
                          
                          </div>

                          <div className='offerDetail ' >
              
                            <div className='bold'>{ele.value}{` ${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}</div>
                          </div>
                    </div>
                  )
                })
            }
         </div>:""
      }
        </div>
        
      </div>
      <div className='row col-md-12'>
          <Button 
          onClick={()=>setVisible(true)}
          disabled={disableButton}
           >
          
          {t("AddExtraCharges")}
          </Button>
      </div>
       <AddCharges 
          visible={visible} 
          setVisible={setVisible}
          formFields={formFields}
          handleFields={handleFields}
          />
    </div>
  )
}