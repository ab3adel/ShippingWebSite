import { Modal, Input, Form, Button } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const AddCharges = ({ visible, setVisible, addCharges }) => {
    const { t, i18n } = useTranslation()
    let [charge, setCharge] = React.useState({ Name: '', Value: '', NameError: null, ValueError: null })
    const handleOk = () => {
        if (charge.Name && charge.Value) {

            if (addCharges(charge.Name, charge.Value)) {

                setCharge({ Name: '', Value: '', NameError: null, ValueError: null })
            }
        }
        else if (!charge.Name) {
            setCharge(pre => ({ ...pre, NameError: t('Required') }))

        }
        else {
            setCharge(pre => ({ ...pre, ValeError: t('Required') }))
        }

    }
    const handleCancel = () => {
        setVisible(false)
    }
    const addCharge = (e) => {
        let input = e.target
        let newCharge = { ...charge }
        newCharge[input.name] = input.value
        setCharge(newCharge)
    }

    return (
        <Modal
            title={t("ExtraCharges")}
            visible={visible}
            onOk={handleOk}

            onCancel={handleCancel}
            okText={t('Add')}
            footer={[
                <Button className='cancelBTN' key="back" onClick={() => handleCancel()}>
                    {i18n.language == 'ar' ? `الغاء` : `Cancel`}
                </Button>,
                <Button key="bsack" type="primary" htmlType="submit" className='col-5 col-xs-5 col-sm-5 col-md-5 saveBtn'
                    onClick={() => handleOk()}
                //  disabled={loading}
                >
                    {t('Add')}
                    {/* {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>} */}
                </Button>
            ]}
            className={i18n.language === "ar" ? "myModal arabicAlign" : "myModal"}
            wrapClassName='attachModal'

        >
            <div className="row col-md-12">

                <div className="col-md-6 col-sm-12">
                    <Form.Item
                        validateStatus={charge.NameError ? "error" : ""}

                    >

                        <Input type={'text'}
                            placeholder={t('ChargeName')}
                            name="Name"
                            onChange={(e) => addCharge(e)}
                            required={true}
                            value={charge.Name}
                        />
                    </Form.Item>

                </div>
                <div className='col-md-6 col-sm-12'>
                    <Form.Item
                        validateStatus={charge.ValueError ? "error" : ""}
                    >

                        <Input type={'number'}

                            name="Value"
                            placeholder={` ${i18n.language === 'ar' ? '(د.ك)' : "(KWD)"}`}
                            disabled={!Boolean(charge.Name)}
                            onChange={(e) => addCharge(e)}
                            required={true}
                            value={charge.Value}

                        />
                    </Form.Item>

                </div>
            </div>
        </Modal>

    )
}