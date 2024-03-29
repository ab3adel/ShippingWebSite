import React, { Component, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Input, Button, Checkbox, Select } from 'antd';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'
import Fade from 'react-reveal/Fade';
import './formStyle.scss'
import "../../globalVar"
import { setCities } from '../../redux/actions';

const AddNewRecipientForm = () => {
    let history = useHistory();
    const { Option } = Select;
    const [t, i18n] = useTranslation();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    const [errorMessage2, setErrorMessage2] = useState();
    const [succesAdd2, setSuccessAdd2] = useState();
    const [loading2, setLoading2] = useState('')
    const [animat2, setAnimat2] = useState(false)
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const UpdateRecipientForm = useRef();
    const dispatch = useDispatch()
    const { refreshProfile, setProfile } = bindActionCreators(actionCreators, dispatch)

    const [useformRecip] = Form.useForm();


    const onFinishCustomer = (values) => {
        console.log('Success:', values);

        onSubmitRecipient(values)

    };

    const onFinishFailedCustomer = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const profile = useSelector((state) => state.profile.profile)
    const onFill = () => {

        UpdateRecipientForm.current.setFieldsValue({

            _method: 'put',
            company: profile.customer.company,
            address: profile.customer.address,
            phone: profile.customer.phone,
            bank_name: profile.customer.bank_name,
            bank_account_number: profile.customer.bank_account_number,
            IBAN_number: profile.customer.IBAN_number,

        });
    };
    useLayoutEffect(() => {

        // onFill()
        const fetchCountries = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/shipping/countries`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + userToken,
                            Accept: "application/json",
                        },
                    }
                );
                const response = await responsee.json();
                if (response.success) {
                    setCountries(response.payload)
                }
                if (response.message && response.message == "Unauthenticated.") {
                    localStorage.removeItem("token");
                    localStorage.clear()
                    history.push("/");
                }
            } catch (err) { console.log(err); }
        }

        fetchCountries()
    }, [])

    const onSubmitRecipient = async (values) => {

        setErrorMessage2('')
        setSuccessAdd2('')
        setLoading2(true)

        const data = {
            customer_id: profile.customer.id,
            name_ar: values.name_ar,
            name_en: values.name_en,
            addresses: [
                {
                    city: values.city,
                    country_code: values.country_code,
                    line_1: values.line_1,
                    line_2: values.line_2 ? values.line_2 : '',
                    line_3: values.line_3 ? values.line_3 : '',
                    main: values.main,
                    post_code: values.post_code,
                    state_code: values.state_code,
                    type: values.type
                }
            ]
        }

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/reciepients`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': 'https://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),

                }
            );
            const response = await responsee.json();
            if (response.success) {
                setAnimat2(!animat2)
                setSuccessAdd2(i18n.language == 'ar' ? `تم إضافة مستلم بنجاح` : `New Recipient added successfully`)
                setLoading2(false)
                useformRecip.resetFields();
                setCountry('')
                setCity('')

                // setProfile(response.payload)
                const timer = setTimeout(() => { setSuccessAdd2('') }, 8000);
                return () => clearTimeout(timer);

            }
            else {
                setLoading2(false)
                setAnimat2(!animat2)
                setErrorMessage2(response.messages)


                const timerr = setTimeout(() => { setErrorMessage2('') }, 8000);
                return () => clearTimeout(timerr);

            }
        } catch (err) {
            console.log(err);
        }

        setLoading2(false)
        // reset({})
    };
    function onChangeCountry(value) {
        setCountry(value)
        setCity('')
        value != '' ? fetchCities(value) : setCities([])
    }
    function onChangeCity(value) {
        setCity(value)

    }
    const fetchCities = async (state_code) => {
        let respons = await fetch(
            `${global.apiUrl}api/shipping/cities?code=${state_code}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            },
        )
            .then(res => res.json())
            .then(res => {

                setCities(res.payload)
            }
            )
            .catch(err => console.log(err))

    }

    function onSearch(val) {
        console.log('search:', val);
    }
    return (<>

        <Form
            name="basic"
            labelCol={{
                span: 30,
            }}
            wrapperCol={{
                span: 32,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinishCustomer}
            onFinishFailed={onFinishFailedCustomer}
            form={useformRecip}
            autoComplete="off"
            layout="vertical"
            ref={UpdateRecipientForm}
        >


            <div className='row'>
                {/* <div className='col-md-12'> <h4 className='updateFormTitle'>

                    {i18n.language == 'ar' ? `معلومات المستلم` : `Recipient Information`}

                </h4>

                </div> */}

                <div className='col-md-6'>   <Form.Item
                    label={i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}
                    name="name_en"
                    // type='email'
                    rules={[
                        {
                            required: true,
                            message: i18n.language == 'ar' ? `الرجاء ادخل اسم المستلم باللغة الانكليزية!` : 'Please Input English Recipient Name!',
                        },

                    ]}
                >
                    {/* type='email' */}
                    <Input placeholder={i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`} />
                </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}
                        name="name_ar"
                        // type='email'
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل اسم المستلم باللغة العربية!` : 'Please Input Arabic Recipient Name!',
                            },

                        ]}
                    >
                        {/* type='email' */}
                        <Input placeholder={i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`} />
                    </Form.Item>
                </div>
                <div className='col-md-12'> <h4 className='updateFormTitle'>

                    {i18n.language == 'ar' ? `معلومات العنوان` : `Address Information`}

                </h4>

                </div>
                <div className='col-md-6 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `السطر 1` : `Line 1`}
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل السطر الاول للعنوان` : 'Please Input Address Line 1 !',
                            },

                        ]}
                        name="line_1"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `السطر 1` : `Line 1`} />
                    </Form.Item>


                </div>
                <div className='col-md-6 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `السطر 2` : `Line 2`}

                        name="line_2"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `السطر 2` : `Line 2`} />
                    </Form.Item>


                </div>
                <div className='col-md-6 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `السطر 3` : `Line 3`}

                        name="line_3"
                    >
                        <Input placeholder={i18n.language == 'ar' ? `السطر 3` : `Line 3`} />
                    </Form.Item>


                </div>

                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الدولة` : `Country`}
                        name="country_code"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل دولة المستلم` : 'Please Input Recipient Country !',
                            }]}
                    >

                        <Select
                            showSearch
                            // style={{ width: 200 }}
                            placeholder={i18n.language == 'ar' ? `الدولة` : `Country`}
                            optionFilterProp="children"
                            value={country}
                            onChange={onChangeCountry}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {countries && countries.map((item) => {
                                return (<Option key={item.country_code} value={item.country_code}>{item.country_name_en}{' / '}{item.country_code}</Option>)
                            })}


                        </Select>
                    </Form.Item>


                </div>
                <div className='col-md-4 col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `المدينة` : `City`}
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل مدينة المستلم` : 'Please Input Recipient City !',
                            }]}
                    >

                        <Select
                            showSearch
                            // style={{ width: 200 }}
                            placeholder={i18n.language == 'ar' ? `المدينة` : `City`}
                            optionFilterProp="children"
                            value={city}
                            onChange={onChangeCity}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {cities.map((ele, index) => {
                                return (<Option key={index} value={ele}>{ele}</Option>)
                            })}

                        </Select>
                    </Form.Item>


                </div>
                <div className=' col-md-4 col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رمز الولاية` : `State Code`}
                        name="state_code"
                    >
                        <Input placeholder={i18n.language == 'ar' ? `رمز الولاية` : `State Code`} />

                    </Form.Item>


                </div>
                <div className='col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الرمز البريدي` : `Postal Code`}
                        name="post_code"
                    >
                        <Input placeholder={i18n.language == 'ar' ? `الرمز البريدي` : `Postal Code`} />
                    </Form.Item>


                </div>



                <div className=' col-md-4 col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الحالة` : `Status`}
                        name="main"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل حالة العنوان` : 'Please Input Address Status!',
                            }]}
                    >
                        <Select placeholder={i18n.language == 'ar' ? `الحالة` : `Status`}   >
                            <Option value="1"> {i18n.language == 'ar' ? `رئيسي` : `Main `}  </Option>
                            <Option value="0"> {i18n.language == 'ar' ? `إضافي` : `Extra`}   </Option>

                        </Select>
                    </Form.Item>


                </div>

                <div className=' col-md-4 col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `النوع` : `Type`}
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل نوع العنوان` : 'Please Input Address Type!',
                            }]}
                    >
                        <Select placeholder={i18n.language == 'ar' ? `النوع` : `Type`}   >
                            <Option value="home"> {i18n.language == 'ar' ? `منزل` : `Home`}  </Option>
                            <Option value="work"> {i18n.language == 'ar' ? `عمل` : `Work`}   </Option>
                            <Option value="other"> {i18n.language == 'ar' ? `آخر` : `Other`}   </Option>

                        </Select>
                    </Form.Item>


                </div>

            </div>



            <Fade top spy={animat2} duration={1000} >
                <div className='col-md-12 mb-1'>

                    {succesAdd2 && <>

                        <Alert message={succesAdd2} type="success" showIcon />
                    </>

                    }
                </div>
            </Fade>
            <Fade top spy={animat2} duration={1000} >
                <div className='col-md-12 mb-1'>

                    {errorMessage2 && <>

                        {Object.keys(errorMessage2).map((item, i) => (
                            <Alert message={errorMessage2[item]} type="error" showIcon />
                        ))}

                    </>

                    }
                </div>
            </Fade>


            <Form.Item
                // wrapperCol={{
                //     // offset: 24,
                //     span: 25,
                // }}
                className='text-center'
            >
                <Button type="primary" htmlType="submit" className='col-md-4 mb-1' disabled={loading2}>
                    {i18n.language == 'ar' ? `حفظ` : `Save`}
                    {loading2 && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                </Button>
            </Form.Item>

        </Form>


    </>


    )

}



export default AddNewRecipientForm;