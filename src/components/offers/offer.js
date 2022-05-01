import { notification } from 'antd'
import './offers.scss'
import ups from '../../images/shipping-request/ups.svg'
import React, { useState } from 'react'
import "../../globalVar"
import { useTranslation } from 'react-i18next'
import { Button, Space, Radio, Form } from 'antd'
import { AddCharges } from './addedcharges'
import { Link, useHistory } from 'react-router-dom'

export const Offer = (props) => {
  const { formFields, activeOffer, handleFields, disableButton } = props
  const [t, i18n] = useTranslation();
  const [visible, setVisible] = useState(false)
  const [payer, setPayer] = useState('sender')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [loading, setLoading] = useState(false)
  const [urlPay, setUrlPay] = useState('')
  const onChange = (val) => {
    setPayer(val)
  }

  const getURL = async () => {
    setLoading(true)


    try {
      const responsee = await fetch(
        `${global.apiUrl}api/payment`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            offer_id: activeOffer.id,
            lang_code: i18n.language == 'ar' ? 'AR' : 'EN',
            payer: payer
          }),

        }
      );
      const response = await responsee.json();
      console.log(response)
      if (response.transaction && response.transaction.url) {
        setUrlPay(response.transaction.url)
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false)
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      notification.success({
        message: i18n.language === 'en' ?
          "Success" :
          "نجاح",
        description: i18n.language === 'en' ?
          "Pay URL Copied To Clipboard" :
          "تم نسخ رابط الدفع الى الحافظة",
        duration: 5,
        rtl: i18n.language === 'ar',
        placement: 'bottomRight'
      })
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
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

            formFields['addedCharges'] && formFields['addedCharges'].length > 0 ?
              <div className="row col-md-12 ">
                <div className="d-flex justify-content-center col-md-12 text-align-center">
                  {t("ExtraCharges")}
                </div>
                {
                  formFields['addedCharges'].map((ele, index) => {
                    return (
                      <div className="col-md-12 col-sm-12 d-flex justify-content-center" key={index}>

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
              </div> : ""
          }
        </div>

      </div>
      <div className='row col-md-12 justify-content-center'>
        <Button
          className='addInFormBTN col-md-4'
          onClick={() => setVisible(true)}
          disabled={disableButton}
        >

          {t("AddExtraCharges")}
        </Button>
      </div>
      {activeOffer.id &&
        <>
          <div className='row col-md-12 justify-content-center text-center'>
            <div className='col-md-12 pt-1 pb-1 '>
              <Link to="/Bills" className='billLInk'>
                {i18n.language === 'ar' ?
                  "يمكنك الانتقال الى صفحة الفواتير من اجل رؤية مزيد من التفاصيل او اتمام عملية الدفع فيما بعد"
                  :
                  "You can go to the billing page in order to see more details or complete the payment process later"
                }
              </Link>
            </div>
            {activeOffer.accepted &&
              <>
                <div className='col-md-12'>
                  <strong>
                    {i18n.language === 'ar' ?
                      "يمكنك البدء بأجراءات الدفع مباشرة"
                      :
                      "You can start the payment process directly"
                    }
                  </strong>

                </div>
                <div className='col-md-12 justify-content-center'>
                  <div className='text-center col-md-12 justify-content-center pt-1 pb-1'>
                    {i18n.language === 'ar' ?
                      "اختر من سيقوم بالدفع"
                      :
                      "Choose who will pay"
                    }
                  </div>
                  <div className='col-md-12 d-flex justify-content-center text-center'>
                    <div className={`col-md-4 col-lg-2 selectPay ${payer == "sender" && 'activePayer'}`}
                      onClick={() => onChange('sender')}>
                      {i18n.language === 'ar' ?
                        "المرسل"
                        :
                        "Sender"
                      }
                    </div>
                    <div className={`col-md-4 col-lg-2 selectPay ${payer == "recipient" && 'activePayer'}`}
                      onClick={() => onChange('recipient')}>
                      {i18n.language === 'ar' ?
                        "المرسل إليه"
                        :
                        "Recipient"
                      }
                    </div>

                  </div>
                  <div className='  col-md-12 justify-content-center pt-1 pb-1'>
                    {urlPay === '' ? <Button
                      className='addInFormBTN col-md-4'
                      onClick={() => getURL()}
                      disabled={loading}
                    >

                      {i18n.language === 'ar' ?
                        "الحصول على رابط الدفع"
                        :
                        "Get Pay URL"}
                      {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                    </Button> : null}
                    {payer == 'sender' && urlPay ?
                      <a className='ant-btn ant-btn-default addInFormBTN col-md-4' href={urlPay} target='blank'>
                        {i18n.language === 'ar' ?
                          "الانتقال للدفع"
                          :
                          "Redirect To Pay"}

                      </a>
                      : null
                    }
                    {payer == 'recipient' && urlPay ?
                      <Button className='ant-btn ant-btn-default addInFormBTN col-md-4' onClick={() => copyText(urlPay)}>
                        {i18n.language === 'ar' ?
                          "نسخ الرابط"
                          :
                          "Copy Pay URL"}

                      </Button>
                      : null
                    }
                  </div>
                </div>
              </>

            }

          </div>
        </>
      }
      <AddCharges
        visible={visible}
        setVisible={setVisible}
        formFields={formFields}
        handleFields={handleFields}
      />
    </div>
  )
}