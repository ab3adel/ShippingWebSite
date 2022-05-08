import React, { useState } from 'react'
import { Modal, Radio, Input, Form, Button } from 'antd'
import { useTranslation } from 'react-i18next'

export const PaymentForm = (props) => {
    let { open, setOpen, paymentUrl, handlePayment } = props
    const [payer, setPayer] = useState('')
    let [showLabel, setShowLabel] = useState(false)

    const { t, i18n } = useTranslation()
    const handleCancel = () => {
        setOpen(false)
    }
    const charge = { Name: '', Value: '' }
    let options = [
        { label: t('Sender'), value: 'sender' },
        { label: t("Recipient"), value: 'recipient' }
    ]
    const handleChage = (e) => {
        setPayer(e.target.value)
    }
    const noChange = () => {
        return
    }
    const handleOk = () => {
        handlePayment(payer)

    }
    const saveToClipboard = () => {
        if (paymentUrl) {
            navigator.clipboard.writeText(paymentUrl)
            setShowLabel(true)
            setTimeout(() => { setShowLabel(false) }, 4000)
        }
    }

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
                        label={i18n.language === 'ar' ? "حدد من المسؤول عن الدفع" : "Choose who will pay:"}
                    >
                        <Radio.Group options={options}
                            onChange={handleChage}
                            value={payer}

                        />
                    </Form.Item>

                </div>
                {payer && payer === 'recipient' ?
                    <div className=' row col-md-12 col-sm-12' style={{ position: 'relative' }}>
                        <Form.Item
                            label={i18n.language === 'ar' ? 'انقر لحفظ الرابط' : "click to save to clipboard"}
                        >

                            <Input type={'text'}

                                name="Value"
                                placeholder={` ${i18n.language === 'ar' ? 'الرابط' : "Link"}`}
                                disabled={!Boolean(paymentUrl)}
                                value={paymentUrl}
                                onChange={noChange}
                                onClick={saveToClipboard}

                            />
                        </Form.Item>
                        {showLabel && (
                            <div className="savedLabelClipboard">
                                {i18n.language === "ar" ? "تم الحفظ" : "saved to clipboard"}
                            </div>
                        )}

                    </div> : ""}
            </div>
        </Modal>
    )
}