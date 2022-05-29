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
// import { setCities } from '../../redux/actions';

const AddNewAddressForm = ({ setSliderHeightTrigger, sliderHeightTrigger, refreshRecipint, reseter, countries, recipientID }) => {
    let history = useHistory();
    const { Option } = Select;
    const [t, i18n] = useTranslation();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    const [errorMessage2, setErrorMessage2] = useState();
    const [succesAdd2, setSuccessAdd2] = useState();
    const [loading2, setLoading2] = useState('')
    const [animat2, setAnimat2] = useState(false)

    const [cities, setCities] = useState([])
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const AddressFormRef = useRef();
    const dispatch = useDispatch()
    const { refreshProfile, setProfile } = bindActionCreators(actionCreators, dispatch)

    const [useAddressForm] = Form.useForm();



    const onFinishCustomer = (values) => {
        console.log('Success:', values);

        onSubmitRecipient(values)

    };

    const onFinishFailedCustomer = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const profile = useSelector((state) => state.profile.profile)
    const onFill = () => {

        AddressFormRef.current.setFieldsValue({

            _method: 'put',
            company: profile.customer.company,
            address: profile.customer.address,
            phone: profile.customer.phone,
            bank_name: profile.customer.bank_name,
            bank_account_number: profile.customer.bank_account_number,
            IBAN_number: profile.customer.IBAN_number,

        });
    };
    useEffect(() => {
        useAddressForm.resetFields();
        setCountryDetails({ postalCode: false, stateCode: false })
        setCountry('')
        setCity('')
    }, [reseter])

    const onSubmitRecipient = async (values) => {

        setErrorMessage2('')
        setSuccessAdd2('')
        setLoading2(true)
        const data = {
            customer_id: profile.customer.id,
            outgoing: false,
            recipient_id: recipientID,

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
                setSuccessAdd2(i18n.language == 'ar' ? `تم إضافة عنوان بنجاح` : `New Address added successfully`)
                setLoading2(false)
                useAddressForm.resetFields();
                setCountryDetails({ postalCode: false, stateCode: false })
                setCountry('')
                setCity('')
                refreshRecipint()
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
        cont.postal_aware == 0 && AddressFormRef.current.setFieldsValue({ post_code: '', });
        cont.state_or_province == 0 && AddressFormRef.current.setFieldsValue({ state_code: '', });
        setCountry(value)

        setSliderHeightTrigger(!sliderHeightTrigger)
        value != '' ? fetchCities(value) : setCities([])
    }
    function onChangeCity(value) {
        setCity(value)
        let city = cities.find(item => item.id == value)
        if (city.code) {
            AddressFormRef.current.setFieldsValue({ state_code: city.code })
        }
        else { AddressFormRef.current.setFieldsValue({ state_code: '' }) }

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
                if (res.payload.length === 1) { AddressFormRef.current.setFieldsValue({ city_id: res.payload[0].id }) }
                else { AddressFormRef.current.setFieldsValue({ city_id: null }) }
            })
            .catch(err => console.log(err))

    }

    function onSearch(val) {
        console.log('search:', val);
    }
    return (<>

        <Form
            name="dynamic_form_nest_item"
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
            form={useAddressForm}
            autoComplete="off"
            layout="vertical"
            ref={AddressFormRef}
        >


            <div className='row'>
                {/* <div className='col-md-12'> <h4 className='updateFormTitle'>

                    {i18n.language == 'ar' ? `معلومات المستلم` : `Recipient Information`}

                </h4>

                </div> */}


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
                    >

                        <Select
                            showSearch
                            autoComplete="none"
                            placeholder={i18n.language == 'ar' ? `الدولة` : `Country`}
                            optionFilterProp="children"
                            value={country}
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
                                                : item.country_name_en}
                                                {' / '}{item.country_code}</Option>
                                        }

                                    </React.Fragment>)
                            })}


                        </Select>
                    </Form.Item>


                </div>
                <div className='col-md-4 col-lg-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `المدينة` : `City`}
                        name="city_id"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل حقل مدينة المستلم` : 'Please Input Recipient City !',
                            }]}
                    >

                        <Select
                            showSearch
                            disabled={cities.length <= 1}
                            placeholder={i18n.language == 'ar' ? `المدينة` : `City`}
                            optionFilterProp="children"
                            value={city}
                            autoComplete="none"
                            onChange={onChangeCity}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {cities.map((ele, index) => {
                                return (<Option key={ele.id} value={ele.id}>
                                    {i18n.language === 'ar' ?
                                        ele.name_ar ? ele.name_ar : ele.name_en
                                        :

                                        ele.name_en}
                                </Option>)
                            })}

                        </Select>
                    </Form.Item>


                </div>
                {/* <div className=' col-md-4 col-lg-2'>
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


                </div>
                <div className='col-lg-2'>
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


                </div> */}

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
                        <div className='col-md-6 col-lg-2'>
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
                        <div className='col-md-6 col-lg-3'>
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
export default AddNewAddressForm
