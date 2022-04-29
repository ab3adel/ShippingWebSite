import React, { useState, useRef } from 'react';
import logo from '../../images/logo/logo33.png'
import { Row, Col, Upload, Form, Input, Button, Checkbox, Modal, Select } from 'antd';
import './style.scss'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'
const TruckArea = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    let history = useHistory();
    const [t, i18n] = useTranslation();

    const onFinish = (values) => {
        console.log('Success:', values);

        onSubmit(values)


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmit = async (data) => {

        setLoading(true)
        try {
            const responsee = await fetch(
                `${global.apiUrl}api/shipping/tracking?company_name=${data.cName}&shipment_tracking_id=${data.id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },

                }
            );
            const response = await responsee.json();
            if (response.shipments) {
                setLoading(false)
                success(response.shipments[0])
            }
            else {
                error(response.errors)
            }

        } catch (err) {
            console.log(err);
        }

        setLoading(false)

    };

    function success(info) {
        Modal.success({
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
            className: '',
            wrapClassName: "modalMessage",
            okText: i18n.language === 'ar' ? "اغلاق" : "Close",
            title: i18n.language === 'ar' ? "نجاح" : "Success",
            content: (<div  >

                <p className='nameR mb-1'><b>{i18n.language === 'ar' ? "المرسل إليه :" : "Recipient :"}</b> {info.receiverDetails.name}</p>
                <p className='nameR mb-1'><b>{i18n.language === 'ar' ? "عنوان الاستلام:" : "Recipient Address :"}</b> {info.receiverDetails.postalAddress.countryCode + " /"}
                    {info.receiverDetails.postalAddress.cityName + " /"}
                    {info.receiverDetails.postalAddress.countyName}
                </p>

                <p className='nameR mb-1'><b>{i18n.language === 'ar' ? "الوصف :" : "Description :"}</b> {info.description} {" / "}
                    <b>{i18n.language === 'ar' ? "عدد القطع :" : "Number Of Pieces :"}</b> {info.numberOfPieces}
                </p>
                <p className='nameR mb-1'><b>{i18n.language === 'ar' ? "تاريخ :" : "Date :"}</b> {info.shipmentTimestamp.slice(0, 10)} {" / "}
                    <b>{i18n.language === 'ar' ? "الوزن :" : "Weight :"}</b> {info.totalWeight} {" "} {i18n.language === 'ar' ? "(كجم)" : "(KG)"}
                </p>


            </div>),
        });
    }

    function error(messages) {
        Modal.error({
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
            className: '',
            wrapClassName: "modalMessage",
            okText: i18n.language === 'ar' ? "اغلاق" : "Close",
            title: i18n.language === 'ar' ? "حدث خطأ" : "Error",
            content: (

                <div>
                    {Object.keys(messages).map((item, i) => (

                        <p key={item} >{messages[item]}</p>

                    ))}

                </div>
            ),
        });
    }




    return (
        <section className="wpo-track-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="track">
                            <h3>
                                {i18n.language === 'ar' ?
                                    "أدخل رقم التتبع وتتبع شحنتك"
                                    :
                                    "Enter Tracking Number and Track Your Cargo"
                                }

                            </h3>
                            <div className="wpo-tracking-form">
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 30,
                                    }}
                                    wrapperCol={{
                                        span: 32,
                                    }}

                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    form={form}
                                    ref={formRef}
                                    autoComplete="off"
                                    layout="vertical"
                                >


                                    <div className='row'>

                                        <div className='col-md-4'>
                                            <Form.Item
                                                name="id"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: i18n.language == 'ar' ? `أدخل رقم التتبع` : 'Enter Tracking Number',
                                                    },

                                                ]}
                                            >

                                                <Input placeholder={i18n.language == 'ar' ?
                                                    "رقم التتبع"
                                                    :
                                                    "Tracking Number"
                                                } />
                                            </Form.Item>


                                        </div>
                                        <div className='col-md-3'>
                                            <Form.Item

                                                name="cName"
                                                // type='email' 
                                                autoComplete='off'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: i18n.language == 'ar' ? `الرجاء اختر شركة!` : 'Please Select Company!',
                                                    },

                                                ]}
                                            >
                                                <Select

                                                    style={{ width: '100%' }}
                                                    placeholder={i18n.language == 'ar' ? `الشركة` : `Company`}

                                                >
                                                    <Option value={'Aramex'}  >  {i18n.language == 'ar' ? "آراميكس" : "Aramex"} </Option>
                                                    <Option value={'DHL'}  >  {i18n.language == 'ar' ? "دي إتش إل" : "DHL"} </Option>
                                                    <Option value={'FedEx'}  >  {i18n.language == 'ar' ? "فيديكس" : "FedEx"} </Option>



                                                </Select>
                                            </Form.Item>
                                        </div>






                                        <div className="col-lg-3 col-md-6 col-sm-6" style={{ textAlign: 'start' }}>

                                            <Form.Item
                                                // wrapperCol={{
                                                //     // offset: 24,
                                                //     span: 25,
                                                // }}
                                                className='text-center'
                                            >
                                                <Button htmlType='submit' disabled={loading}>
                                                    {i18n.language === 'ar' ? "تتبع شحنتك" : "Track Your Cargo"}
                                                    {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>

                                {/* <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control"

                                                    placeholder={i18n.language == 'ar' ?
                                                        "البريد الالكتروني"
                                                        :
                                                        "Email"
                                                    } />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control"
                                                    placeholder={i18n.language == 'ar' ?
                                                        "رقم التتبع"
                                                        :
                                                        "Tracking Number"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-6" style={{ textAlign: 'start' }}>
                                            <button type="submit">
                                                {i18n.language === 'ar' ?
                                                    "تتبع شحنتك"
                                                    :
                                                    "Track Your Cargo"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </form> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 sendCArgo ">
                        <div className="track">

                            <h3 style={{ textAlign: 'center' }}>
                                {i18n.language === 'ar' ?
                                    "يمكنك إرسال شحنة"
                                    :
                                    "You Can Send a Shipment"
                                }

                            </h3>
                            <button type="submit" className='sendCargobt'
                                onClick={() => history.push(userToken ? '/shippingrequest' : '/Login')}>
                                <img src={logo} alt="" className='sendLogo' />
                                {i18n.language === 'ar' ?
                                    "ارسل شحنة"
                                    :
                                    "Send a Cargo"
                                }
                            </button>
                        </div>


                    </div>

                </div>
            </div >
        </section >
    )

}

export default TruckArea;
