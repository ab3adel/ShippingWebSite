
import React, { useState } from 'react'
import { Modal, Radio, Input, Form, Button, Popover } from 'antd'
import { useTranslation } from 'react-i18next'
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
export const PaymentForm = (props) => {
    let { open, setOpen, paymentUrl, handlePayment, recipientPhone } = props
    const [payer, setPayer] = useState('sender')
    const [method, setMethod] = useState('online')
    let [showLabel, setShowLabel] = useState(false)

    const { t, i18n } = useTranslation()
    const handleCancel = () => {

        setOpen(false)
    }
    const charge = { Name: '', Value: '' }
    let options = [
        // { label: t('cash'), value: 'cash' },
        { label: t('Sender'), value: 'sender' },
        { label: t("Recipient"), value: 'recipient' },
    ]
    let methodOptions = [
        { label: t("online"), value: 'online' },
        { label: t('cash'), value: 'cash' },

    ]
    const handleChage = (e) => {
        setPayer(e.target.value)
        if (e.target.value === 'recipient') {
            setMethod('online')
        }
    }
    const handleChageMethod = (e) => {
        setMethod(e.target.value)
    }
    const noChange = () => {
        return
    }
    const handleOk = () => {
        handlePayment(payer, method)

    }
    const saveToClipboard = () => {
        if (paymentUrl) {
            navigator.clipboard.writeText(paymentUrl)
            setShowLabel(true)
            setTimeout(() => { setShowLabel(false) }, 4000)
        }
    }


    const content = (
        <div className='IconsCont'>

            {/* <FacebookMessengerShareButton url={urlPay}   > <FacebookMessengerIcon size={32} round={true} />
      </FacebookMessengerShareButton > */}
            {/* <WhatsappShareButton
                url={`https://wa.me/${recipientPhone}?text=${paymentUrl}`}

            >
                <  WhatsappIcon size={32} round={true} />
            </WhatsappShareButton > */}
            <ReactWhatsapp number={recipientPhone} message={paymentUrl}
                className={"react-share__ShareButton "}>
                <  WhatsappIcon size={32} round={true} />
            </ReactWhatsapp>
            <TelegramShareButton url={paymentUrl}   >
                <TelegramIcon size={32} round={true} />
            </TelegramShareButton >
            <ViberShareButton url={paymentUrl}   >
                <ViberIcon size={32} round={true} />
            </ViberShareButton >
            <EmailShareButton url={paymentUrl}   >
                <EmailIcon size={32} round={true} />
            </EmailShareButton >



        </div>
    );

    return (


        <Modal
            title={t("Payment")}
            visible={open}
            onCancel={handleCancel}
            onOk={handleOk}
            okText={t('Done')}
            footer={[
                <Button className='cancelBTN' key="back" onClick={() => handleCancel()}>
                    {i18n.language == 'ar' ? `الغاء` : `Cancel`}
                </Button>,
                <Button key="bsack" type="primary" htmlType="submit" className='col-5 col-xs-5 col-sm-5 col-md-5 saveBtn'
                    onClick={() => handleOk()}
                //  disabled={loading}
                >
                    {i18n.language == 'ar' ? `تم` : `ok`}
                    {/* {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>} */}
                </Button>
            ]}
            className={i18n.language === "ar" ? "myModal arabicAlign" : "myModal"}
            wrapClassName='attachModal'
        >

            <div className="col-md-12">

                <div className="row col-md-12 col-sm-12">
                    <Form.Item
                        validateStatus={charge.NameError ? "error" : ""}
                        label={i18n.language === 'ar' ? "اختر من سيقوم بالدفع" : "Choose who will pay:"}
                    >
                        <Radio.Group options={options}
                            onChange={handleChage}
                            value={payer}


                        />
                    </Form.Item>

                </div>
                {payer === 'sender' ? <div className="row col-md-12 col-sm-12">
                    <Form.Item
                        validateStatus={charge.NameError ? "error" : ""}
                        label={i18n.language === 'ar' ? "طريقة الدفع" : "Payment Method"}
                    >
                        <Radio.Group options={methodOptions}
                            onChange={handleChageMethod}
                            value={method}


                        />
                    </Form.Item>

                </div> : null}
                {payer && paymentUrl && payer === 'recipient' ?
                    <div className=' row col-md-12 col-sm-12' style={{ position: 'relative' }}>
                        <Form.Item
                            label={i18n.language === 'ar' ? 'مشاركة رابط الدفع' : "Share Payment URL"}
                        >

                            <Popover content={content} title={i18n.language === 'ar' ?
                                "مشاركة"
                                :
                                "Share "} trigger="click">
                                <Button className='ant-btn ant-btn-default addInFormBTN col-md-12' >     {i18n.language === 'ar' ?
                                    "مشاركة الرابط"
                                    :
                                    "Share Pay URL"}</Button>
                            </Popover>

                            {/* <Input type={'text'}

                                name="Value"
                                placeholder={` ${i18n.language === 'ar' ? 'الرابط' : "Link"}`}
                                disabled={!Boolean(paymentUrl)}
                                value={paymentUrl}
                                onChange={noChange}
                                onClick={saveToClipboard}

                            /> */}
                        </Form.Item>
                        {/* {showLabel && (
                            <div className="savedLabelClipboard">
                                {i18n.language === "ar" ? "تم الحفظ" : "saved to clipboard"}

                            </div>
                        )} */}

                    </div> : ""}
            </div>
        </Modal>
    )
}