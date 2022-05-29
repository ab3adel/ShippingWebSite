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
import CountryPhoneInput, { ConfigProvider, } from 'antd-country-phone-input';
import en from '../Signup/world.json';

import 'flagpack/dist/flagpack.css';
// import './addressform.scss'
import './formStyle.scss'
import "../../globalVar"
// import { setCities } from '../../redux/actions';
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

const AddNewRecipientForm = ({ setSliderHeightTrigger, sliderHeightTrigger, refreshRecipints, reseter }) => {
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
        const number = phoneUtil.parseAndKeepRawInput(values.recipient_phone, phone.short);
        if (phoneUtil.isValidNumber(number) && phoneUtil.isValidNumberForRegion(number, phone.short)) {
            onSubmitRecipient(values)
        }
        else {
            useformRecip.setFields([
                {
                    name: 'recipient_phone',
                    errors: [`${i18n.language == 'ar' ?
                        `الرجاء ادخل رقم هاتف صحيح!` : 'Please Input Valid Phone Number!'}`],
                },
            ])
        }





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
                    `${global.apiUrl}api/countries`,
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

        countries.length == 0 && fetchCountries()
    }, [userToken])
    useEffect(() => {
        useformRecip.resetFields();
        setCountryDetails({ postalCode: false, stateCode: false })
        setCountry('')
        setCity('')
        setPhone({ short: 'KW' })
    }, [reseter])
    const onSubmitRecipient = async (values) => {

        setErrorMessage2('')
        setSuccessAdd2('')
        setLoading2(true)

        const data = {
            customer_id: profile.customer.id,
            outgoing: false,
            recipient_id: null,
            recipient_name_en: values.recipient_name_en,
            recipient_name_ar: values.recipient_name_ar,
            recipient_phone: values.recipient_phone,
            email: values.email,
            address: {
                city_id: values.city_id,
                // country_code: values.country_code,
                line_1: country === 117 ?
                    `{"Area":"${values.area}", "Block":"${values.Block}", "Jaddah":"${values.jaddah ? values.jaddah : ""}" }`
                    :
                    values.line_1,
                line_2: country === 117 ?
                    `{"Street":"${values.street}", "Building":"${values.building}" }`
                    :
                    values.line_2 ? values.line_2 : '',
                line_3: country === 117 ?
                    `{"Floor":"${values.floor ? values.floor : ""}", "Flat":"${values.flat ? values.flat : ""}", "PCAIID":"${values.PCAIID ? values.PCAIID : ""}" }`
                    :

                    values.line_3 ? values.line_3 : '',
                main: 1,
                post_code: values.post_code ? values.post_code : '',
                state_code: values.state_code ? values.state_code : '',
                type: 'home'
            }

        }

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/address`,
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
                setSuccessAdd2(i18n.language == 'ar' ? `تم إضافة مرسل إليه بنجاح` : `New Recipient added successfully`)
                setLoading2(false)
                useformRecip.resetFields();
                setPhone({ short: 'KW' })
                setCountryDetails({ postalCode: false, stateCode: false })
                setCountry('')
                setCity('')
                refreshRecipints()
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
    const [countryDetails, setCountryDetails] = useState({ postalCode: false, stateCode: false })
    function onChangeCountry(value) {
        const cont = countries.filter(item => item.id == value)[0]
        setCountryDetails({ postalCode: cont.postal_aware !== 0, stateCode: cont.state_or_province !== 0 })
        cont.postal_aware == 0 && UpdateRecipientForm.current.setFieldsValue({ post_code: '', });
        cont.state_or_province == 0 && UpdateRecipientForm.current.setFieldsValue({ state_code: '', });
        setCountry(value)
        setCity('')
        setSliderHeightTrigger(!sliderHeightTrigger)
        value != '' ? fetchCities(value) : setCities([])
    }
    function onChangeCity(value) {
        setCity(value)
        let city = cities.find(item => item.id == value)
        if (city.code) {
            UpdateRecipientForm.current.setFieldsValue({ state_code: city.code })
        }
        else { UpdateRecipientForm.current.setFieldsValue({ state_code: '' }) }

    }
    const fetchCities = async (id) => {
        let respons = await fetch(
            `${global.apiUrl}api/cities/getCityByCountryId?country_id=${id}`,
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
                // setCity
                if (res.payload.length === 1) { UpdateRecipientForm.current.setFieldsValue({ city_id: res.payload[0].id }) }
                else { UpdateRecipientForm.current.setFieldsValue({ city_id: null }) }
            })
            .catch(err => console.log(err))

    }


    function onSearch(val) {
        console.log('search:', val);
    }
    const [phone, setPhone] = useState({ short: 'KW' })
    const handlePhone = (v) => {
        setPhone(v)
        // { phone: '32', code: 965, short: 'KW' }
        if (v.phone) { UpdateRecipientForm.current.setFieldsValue({ recipient_phone: `${v.code}${v.phone}` }) }
        else { UpdateRecipientForm.current.setFieldsValue({ recipient_phone: null }) }

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
                <div className='col-md-6 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}
                        name="recipient_name_ar"
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
                <div className='col-md-6 col-lg-4'>   <Form.Item
                    label={i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}
                    name="recipient_name_en"
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

                <div className='col-md-6 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الهاتف` : `Phone`}
                        name="recipient_phone"
                        // type='email'
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل رقم هاتف المستلم!` : 'Please Input Recipient Phone Number!',
                            },

                        ]}
                    >
                        {/* type='email' */}
                        <ConfigProvider locale={en} areaMapper={(area) => {
                            return Object.assign(Object.assign({}, area), { emoji: <span className={`fp ${area.short.toLowerCase()}`} /> });
                        }}>
                            <CountryPhoneInput
                                dir='ltr'
                                style={{ direction: "ltr" }}
                                value={phone}
                                // value='+964235245425'
                                onChange={(v) => {
                                    handlePhone(v)
                                }} />
                        </ConfigProvider>
                        {/* <Input placeholder={i18n.language == 'ar' ? `الهاتف` : `Phone`} /> */}
                    </Form.Item>
                </div>
                <div className='col-md-6 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                        name="email"
                        type='email'
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: i18n.language == 'ar' ? `الرجاء ادخل البريد الالكتروني للمستلم!` : 'Please Input Recipient Email!',
                    //     },

                    // ]}
                    >
                        {/* type='email' */}
                        <Input type='email' placeholder={`email@example.com`} />
                    </Form.Item>
                </div>
                <div className='col-md-12'> <h4 className='updateFormTitle'>

                    {i18n.language == 'ar' ? `معلومات العنوان` : `Address Information`}

                </h4>

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
                        autoComplete='none'
                    >

                        <Select
                            showSearch
                            // style={{ width: 200 }}
                            placeholder={i18n.language == 'ar' ? `الدولة` : `Country`}
                            optionFilterProp="children"
                            value={country}
                            autoComplete='none'
                            onChange={onChangeCountry}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {countries && countries.map((item) => {
                                return (

                                    <React.Fragment key={item.id}>
                                        {item.id == 117 ?
                                            null
                                            :
                                            <Option value={item.id}>{i18n.language === 'ar' ?
                                                item.country_name_ar ? item.country_name_ar : item.country_name_en
                                                : item.country_name_en}{' / '}{item.country_code}</Option>
                                        }

                                    </React.Fragment>

                                    // <Option key={item.id} value={item.id}>{item.country_name_en}{' / '}{item.country_code}</Option>
                                )
                            })}


                        </Select>
                    </Form.Item>


                </div>
                <div className='col-md-4 col-lg-4'>
                    <Form.Item
                        autoComplete='none'
                        label={i18n.language == 'ar' ? `المدينة` : `City`}
                        name="city_id"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل مدينة المستلم` : 'Please Input Recipient City !',
                            }]}
                    >

                        <Select
                            autoComplete='none'
                            showSearch
                            disabled={cities.length <= 1}
                            // style={{ width: 200 }}
                            placeholder={i18n.language == 'ar' ? `المدينة` : `City`}
                            optionFilterProp="children"
                            value={city}
                            onChange={onChangeCity}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {cities.map((ele, index) => {
                                return (<Option key={ele.id} value={ele.id}>  {i18n.language === 'ar' ?
                                    ele.name_ar ? ele.name_ar : ele.name_en
                                    :

                                    ele.name_en}</Option>)
                            })}

                        </Select>
                    </Form.Item>


                </div>


                {country === 117 ?
                    <>
                        <div className='col-md-6 col-lg-2'>
                            <Form.Item
                                label={t(`Area`)}
                                rules={[{
                                    required: true,
                                    message: i18n.language == 'ar' ? `الرجاء ادخل حقل المنطقة` : 'Please Input Address Area!',
                                },]}
                                name="area"
                            >
                                <Input placeholder={t(`Area`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-2'>
                            <Form.Item
                                label={t(`Block`)}
                                rules={[{
                                    required: true,
                                    message: i18n.language == 'ar' ? `الرجاء ادخل حقل القطعة` : 'Please Input Address Block!',
                                },]}
                                name="Block"
                            >
                                <Input placeholder={t(`Block`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-3'>
                            <Form.Item
                                label={t(`Jaddah`)}
                                // rules={[{
                                //     required: true,
                                //     message: i18n.language == 'ar' ? `الرجاء ادخل حقل الجادة` : 'Please Input Address Jaddah!',
                                // },]}
                                name="jaddah"
                            >
                                <Input placeholder={t(`Jaddah`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-3'>
                            <Form.Item
                                label={t(`Street`)}
                                rules={[{
                                    required: true,
                                    message: i18n.language == 'ar' ? `الرجاء ادخل حقل الشارع` : 'Please Input Address Street !',
                                },]}
                                name="street"
                            >
                                <Input placeholder={t(`Street`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-2'>
                            <Form.Item
                                label={t(`Building`)}
                                rules={[{
                                    required: true,
                                    message: i18n.language == 'ar' ? `الرجاء ادخل حقل البناء` : 'Please Input Address Building !',
                                },]}
                                name="building"
                            >
                                <Input placeholder={t(`Building`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-1'>
                            <Form.Item
                                label={t(`Floor`)}
                                // rules={[{
                                //     required: true,
                                //     message: i18n.language == 'ar' ? `الرجاء ادخل حقل الطابق` : 'Please Input Address Floor !',
                                // },]}
                                name="floor"
                            >
                                <Input placeholder={t(`Floor`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-1'>
                            <Form.Item
                                label={t(`Flat`)}
                                // rules={[{
                                //     required: true,
                                //     message: i18n.language == 'ar' ? `الرجاء ادخل حقل الشقة` : 'Please Input Address Flat !',
                                // },]}
                                name="flat"
                            >
                                <Input placeholder={t(`Flat`)} />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-2'>
                            <Form.Item
                                label={t(`PCAIID`)}
                                // rules={[{
                                //     required: true,
                                //     message: i18n.language == 'ar' ? `الرجاء ادخل حقل PCAIID` : 'Please Input Address PCAIID !',
                                // },]}
                                name="PCAIID"
                            >
                                <Input placeholder={t(`PCAIID`)} />
                            </Form.Item>
                        </div>
                    </>
                    :
                    <>
                        <div className='col-md-6 col-lg-4'>
                            <Form.Item
                                label={i18n.language == 'ar' ? `العنوان الكامل` : `Full Address`}
                                rules={[
                                    {
                                        required: true,
                                        message: i18n.language == 'ar' ? `الرجاء ادخل حقل العنوان الكامل`
                                            : 'Please Input Full Address Field!',
                                    },

                                ]}
                                name="line_1"
                            >

                                <Input placeholder={i18n.language == 'ar' ? `العنوان الكامل` : `Full Address`} />
                            </Form.Item>


                        </div>
                        <div className='col-md-6 col-lg-4'>
                            <Form.Item
                                label={i18n.language == 'ar' ? `علامات مميزة للعنوان` : `Distinctive signs of address`}

                                name="line_2"
                            >

                                <Input placeholder={i18n.language == 'ar' ? `علامات مميزة للعنوان` : `Distinctive signs of address`} />
                            </Form.Item>


                        </div>
                        {/* <div className='col-md-6 col-lg-4'>
                            <Form.Item
                                label={i18n.language == 'ar' ? `السطر 3` : `Line 3`}

                                name="line_3"
                            >
                                <Input placeholder={i18n.language == 'ar' ? `السطر 3` : `Line 3`} />
                            </Form.Item>


                        </div> */}

                    </>

                }


                {countryDetails.stateCode ? <div className=' col-md-4 col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رمز الولاية` : `State Code`}
                        name="state_code"
                        rules={[
                            {
                                required: countryDetails.stateCode,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل رمز الولاية` : 'Please Input State Code!',
                            },
                        ]}
                    >
                        <Input disabled={!countryDetails.stateCode} placeholder={i18n.language == 'ar' ? `رمز الولاية` : `State Code`} />

                    </Form.Item>


                </div> : null}
                {countryDetails.postalCode ? <div className='col-lg-2'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الرمز البريدي` : `Postal Code`}
                        name="post_code"

                        rules={[
                            {
                                required: countryDetails.postalCode,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل الرمز البريدي` : 'Please Input Postal Code!',
                            },
                        ]}
                    >
                        <Input disabled={!countryDetails.postalCode} placeholder={i18n.language == 'ar' ? `الرمز البريدي` : `Postal Code`} />
                    </Form.Item>


                </div> : null}



                {/* 
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


                </div> */}

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