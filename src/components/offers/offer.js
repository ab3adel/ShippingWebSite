import { notification } from 'antd'
import './offers.scss'
import React, { useState } from 'react'
import "../../globalVar"
import { useTranslation } from 'react-i18next'
import { Button, Popover, Radio, Form } from 'antd'
import { Link } from 'react-router-dom'
import ReactWhatsapp from 'react-whatsapp';
import {
  EmailShareButton,
  FacebookMessengerShareButton,

  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,

  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,

} from "react-share";
import { AddCharges } from '../addedCharges/addedCharge'
export const Offer = (props) => {
  const { formFields, activeOffer, handleFields, disableButton, dateString } = props
  const [t, i18n] = useTranslation();
  const [visible, setVisible] = useState(false)
  const [payer, setPayer] = useState('sender')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [loading, setLoading] = useState(false)
  const [urlPay, setUrlPay] = useState('')
  const [urlToken, setUrlToken] = useState([])
  const [showShare, setShowShare] = useState(false)
  const [finalCost, setFinalCost] = useState(activeOffer['OfferPrice'])
  const handleVisibleChange = (newVisible) => {
    setShowShare(newVisible);
  };

  const onChange = (e) => {
    setPayer(e.target.value)

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
            payer: payer == 'cash' ? 'sender' : payer,
            payment_method: payer == 'cash' ? 'cash' : 'online'
          }),

        }
      );
      const response = await responsee.json();
      if (payer === 'cash') {
        notification.success({
          message: t('SuccessfullRequest'),
          description: i18n.language === 'en' ?
            "your request has been added successfully" :
            "  تم الحفظ بنجاح",
          duration: 5,
          rtl: i18n.language === 'ar',
          placement: 'bottomRight'
        })
        setLoading(false)
        return
      }
      if (response.transaction && response.transaction.url) {
        setUrlPay(response.transaction.url)
        setUrlToken(response.transaction.url.split('&'))
        if ((payer === 'sender')) { window.open(response.transaction.url) }
        if (payer === 'recipient') { setShowShare(true) }
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false)
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(function () {

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
  const addCharges = (name, value) => {
    let arr = []

    if (formFields['addedCharges']) {
      arr = [...formFields['addedCharges']]
    }
    let newFinalCost = finalCost + Number(value)
    arr.push({ name, value })
    setFinalCost(newFinalCost)
    handleFields(pre => ({ ...pre, addedCharges: arr }))
    return true
  }


  let options = [
    { label: t('cash'), value: 'cash' },
    { label: t('Sender'), value: 'sender' },
    { label: t("Recipient"), value: 'recipient' },
  ]

  const message = () => {
    if (i18n.language === 'ar') {
      return `عزيزي العميل  %0a هذا الشحنة للاختبار %0a رابط الدفع : %0a`
    }
    else {
      return `Dear Client %0a This Shipment for Test %0a Pay URL : %0a`
    }
  }
  const content = (
    activeOffer.id && activeOffer.recipient ?
      <div className='IconsCont'>

        {/* <FacebookMessengerShareButton url={urlPay}   > <FacebookMessengerIcon size={32} round={true} />
</FacebookMessengerShareButton > */}

        {/* <ReactWhatsapp number={' '}
          //  number={activeOffer.recipient.phone}
          message={"  `${urlPay}` + ` ${urlToken[(urlToken.length - 1)]}`}
          className={"react-share__ShareButton "}>
          <  WhatsappIcon size={32} round={true} />
        </ReactWhatsapp> */}
        <button

          onClick={() => { window.open(`https://wa.me/${activeOffer.recipient.phone}/?text=${message()}${urlPay.replace("&", "%26")}`) }}

          className={"react-share__ShareButton "}>
          <  WhatsappIcon size={32} round={true} />
        </button>
        <TelegramShareButton url={urlPay}   >
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton >
        <ViberShareButton url={urlPay}   >
          <ViberIcon size={32} round={true} />
        </ViberShareButton >
        <EmailShareButton url={urlPay}   >
          <EmailIcon size={32} round={true} />
        </EmailShareButton >



      </div >
      : null

  );
  const removeCharge = (order) => {

    let arr = []
    if (formFields['addedCharges']) {
      arr = [...formFields['addedCharges']]
    }
    let newFinalCost = finalCost - Number(arr[order].value)
    let newArr = arr.filter((ele, index) => index !== order)
    setFinalCost(newFinalCost)
    handleFields(pre => ({ ...pre, addedCharges: newArr }))
    return true
  }

  return (

    <div className="offerContainer">
      <div className="row col-md-12 d-flex justify-content-center m-0">
        <div className='col-md-8 d-flex justify-content-center'>
          <img src={activeOffer['image']} />
        </div>

      </div>
      <div className="row col-md-12 col-lg-10 mx-auto my-2">
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t('Name')}
            <div className='bold'>{activeOffer['CompanyName']}</div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t("Weight")}
            <div className='bold'>{formFields['Weight']}{` ${i18n.language === 'ar' ? '(كجم)' : "(KG)"}`}</div>
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
            <div className='bold'>{dateString}</div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <div className='offerDetail '>
            {t('Price')}
            <div className='bold'>
              {activeOffer['OfferPrice'].toFixed(2)}
              {`${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 d-flex justify-content-center m-0">
          {

            formFields['addedCharges'] && formFields['addedCharges'].length > 0 ?
              <div className="row col-md-12 m-0">
                <div className="d-flex justify-content-center col-md-12 text-align-center">
                  {t("ExtraCharges")}
                </div>
                {
                  formFields['addedCharges'].map((ele, index) => {
                    return (
                      <div className="col-md-12 col-sm-12 d-flex justify-content-center align-items-center"
                        key={index}>

                        <div className='offerDetail ' >
                          {ele.name}

                          <div className='bold'>{ele.value}{` ${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}</div>
                        </div>
                        <i className="fa fa-close" aria-hidden="true"
                          onClick={() => removeCharge(index)} ></i>
                      </div>
                    )
                  })
                }
                {/* <div className="col-md-12 col-sm-12 justify-content-center d-flex " >
                  <div className='col-md-10 finalCost '>

                    <div className="d-flex justify-content-center col-md-12 text-align-center bold">
                      {t("FinalCost")}
                    </div>
                    <div className="d-flex justify-content-center col-md-12 text-align-center ">
                    {Number(finalCost).toFixed(2)}
                    <span>

                      {`${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}
                    </span>
                    </div>
                  </div>
                </div> */}
              </div> : ""
          }
        </div>

      </div>
      <div className='row col-md-12 justify-content-center m-0'>
        <div className="col-md-12 col-sm-12 justify-content-center d-flex " >
          <div className='col-md-8 finalCost mb-3'>

            <div className="d-flex justify-content-center col-md-12 text-align-center bold">
              {t("FinalCost")}
            </div>
            <div className="d-flex justify-content-center col-md-12 text-align-center ">
              {Number(finalCost).toFixed(2)}
              <span>

                {`${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='row col-md-12 justify-content-center m-0'>
        <Button
          className='addInFormBTN col-md-4'
          onClick={() => setVisible(true)}
          disabled={loading}
        >

          {t("AddExtraCharges")}
        </Button>
      </div>
      {activeOffer.id &&
        <>
          <div className='row col-md-12 justify-content-center text-center m-0 '>
            <div className='col-md-12 pt-1 pb-1 '>
              <Link to="/Bills" className='billLInk'>
                {i18n.language === 'ar' ?
                  "يمكنك الانتقال الى صفحة الفواتير من اجل رؤية مزيد من التفاصيل او اتمام عملية الدفع فيما بعد"
                  :
                  "You can go to the billing page in order to see more details or complete the payment process later"
                }
              </Link>
            </div>
            {activeOffer.accepted ?
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
                  <div className='col-md-12 d-flex justify-content-center text-center m-0'>
                    <Form.Item
                    // validateStatus={charge.NameError ? "error" : ""}
                    // label={i18n.language === 'ar' ? "اختر من سيقوم بالدفع" : "Choose who will pay:"}
                    >
                      <Radio.Group options={options}
                        onChange={onChange}
                        value={payer}


                      />
                    </Form.Item>
                    {/* <div className={`col-md-4 col-lg-2 selectPay ${payer == "sender" && 'activePayer'}`}
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
                    </div> */}

                  </div>
                  <div className='  col-md-12 justify-content-center pt-1 pb-1 m-0'>
                    {urlPay === '' ? <Button
                      className='addInFormBTN col-md-4'
                      onClick={() => getURL()}
                      disabled={loading}
                    >

                      {payer === 'recipient' ? i18n.language === 'ar' ? "مشاركة  رابط الدفع" : "Share Pay URL" : null}
                      {payer === 'sender' ? i18n.language === 'ar' ? "الذهاب للدفع" : "Go To Payment Page" : null}
                      {payer === 'cash' ? i18n.language === 'ar' ? "حفظ" : "Save" : null}


                      {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                    </Button>
                      : null}

                    {payer == 'recipient' && urlPay ?
                      <Popover content={content} title={i18n.language === 'ar' ?
                        "مشاركة"
                        :
                        "Share "} trigger="click"
                        visible={showShare}
                        onVisibleChange={handleVisibleChange}>
                        <Button className='ant-btn ant-btn-default addInFormBTN col-md-4'>     {i18n.language === 'ar' ?
                          "مشاركة  رابط الدفع"
                          :
                          "Share Pay URL"}</Button>
                      </Popover>



                      : null
                    }

                    {payer == 'sender' && urlPay ?

                      <Button
                        className='addInFormBTN col-md-4'
                        onClick={() => window.open(urlPay)}
                        disabled={loading}
                      >  {payer === 'sender' ? i18n.language === 'ar' ? "الذهاب للدفع" : "Go To Payment Page" : null}

                      </Button>


                      : null
                    }

                    {payer == 'cash' && urlPay ?

                      <Button
                        className='addInFormBTN col-md-4'
                        onClick={() => getURL()}
                        disabled={loading}
                      >  {i18n.language === 'ar' ? "حفظ" : "Save"}

                      </Button>


                      : null
                    }
                  </div>
                </div>
              </>
              : null
            }

          </div>
        </>

      }
      <AddCharges
        visible={visible}
        setVisible={setVisible}
        addCharges={addCharges}
      />

    </div>
  )
}