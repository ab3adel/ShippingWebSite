import React, { useEffect, useState, useRef } from 'react'
import CountryPhoneInput, { ConfigProvider, } from 'antd-country-phone-input';
import en from '../Signup/world.json';

import 'flagpack/dist/flagpack.css';
import './addressform.scss'
import {
    Modal
    , Form
    , Input
    , Select, Alert
}
    from 'antd'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import '../../globalVar'
import { useDispatch, useSelector } from 'react-redux'
import { setCountries } from '../../redux/actions'
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();


const NewAddress = (props) => {
    let { refreshRecipients, recipientID,
        setRefreshRecipients, refreshMyAddress,
        setRefreshMyAddress, visible, setVisible, userToken, isSender, type } = props
    const [t, i18n] = useTranslation();
    const [errorMessage2, setErrorMessage2] = useState();
    const [loadingCities, setLoadingCites] = React.useState(false)
    const [disableCities, setDisableCities] = React.useState(true)
    const [country, setCountry] = useState()

    const [form] = Form.useForm()
    const { Option } = Select
    const [countryDetails, setCountryDetails] = useState({ postalCode: false, stateCode: false })

    const types = ['Work', 'Home', 'Others']
    const dispatch = useDispatch()
    const { cities, countries } = useSelector((state) => state.address)
    const { profile } = useSelector((state) => state.profile)
    const AddressRef = useRef();
    useEffect(async () => {

        countries.length == 0 && fetchCountries()
        if (isSender && type === "Address") {
            AddressRef.current.setFieldsValue({ country: 117, })
            handleCountryChange(117)
        }
    }, [])

    const handleCancel = () => {
        setVisible(false)
    }
    const handleOk = (values) => {
        console.log(values, "ok")

        if (type === "Recipient") {
            const number = phoneUtil.parseAndKeepRawInput(values['recipient_phone'], phone.short);
            if (phoneUtil.isValidNumber(number) && phoneUtil.isValidNumberForRegion(number, phone.short)) {
                addHandler(values)
            }
            else {
                form.setFields([
                    {
                        name: 'recipient_phone',
                        errors: [`${i18n.language == 'ar' ?
                            `الرجاء ادخل رقم هاتف صحيح!` : 'Please Input Valid Phone Number!'}`],
                    },
                ])
            }

        }
        else { addHandler(values) }


    }
    const addHandler = async (values) => {
        let data = {
            customer_id: profile.customer.id,
            address: {
                city_id: values.city,
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
        if (isSender && type === "Address") {
            data = { ...data, outgoing: true, }
        }
        if (!isSender && type === "Address") {
            data = {
                ...data, outgoing: false,
                recipient_id: recipientID,
            }
        }
        if (!isSender && type === "Recipient") {
            data = {
                ...data, outgoing: false,
                recipient_id: null,
                recipient_name_en: values.recipient_name_en,
                recipient_name_ar: values.recipient_name_ar,
                recipient_phone: values.recipient_phone,
                email: values.email,
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
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),

                }
            );
            const response = await responsee.json();
            if (response.success) {
                setPhone({ short: 'KW' })
                // useAddressForm.resetFields();
                // setCountryDetails({ postalCode: false, stateCode: false })
                // setCountry('')
                // setCity('')

                !isSender && setRefreshRecipients(!refreshRecipients)
                isSender && type === "Address" && setRefreshMyAddress(!refreshMyAddress)
                // setProfile(response.payload)
                handleCancel()

            }
            else if (response.errors) {
                setErrorMessage2(response.errors)
                const timerr = setTimeout(() => { setErrorMessage2('') }, 8000);
                return () => clearTimeout(timerr);
            }
            else if (response.messages) {
                setErrorMessage2(response.messages)
                const timerr = setTimeout(() => { setErrorMessage2('') }, 8000);
                return () => clearTimeout(timerr);
            }

        } catch (err) {
            console.log(err);
        }
    }
    const fetchCountries = async () => {
        await fetch(
            `${global.apiUrl}api/countries`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }

            }
        )
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'SET_COUNTRIES',
                    payload: res.payload
                })

            }
            )

            .catch(err => console.log(err))


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
                dispatch({
                    type: 'SET_CITIES',
                    payload: res.payload
                })
                if (res.payload.length === 1) {
                    setDisableCities(true)
                    AddressRef.current.setFieldsValue({ city: res.payload[0].id })
                }
                else {
                    AddressRef.current.setFieldsValue({ city: null })
                    setDisableCities(false)
                }
                setLoadingCites(false)
            })
            .catch(err => console.log(err))

    }

    const handleCountryChange = (value) => {
        setLoadingCites(true)
        setCountry(value)
        if (!isSender) {
            const cont = countries.filter(item => item.id == value)[0]
            setCountryDetails({ postalCode: cont.postal_aware !== 0, stateCode: cont.state_or_province !== 0 })
            cont.postal_aware == 0 && AddressRef.current.setFieldsValue({ post_code: '', });
            cont.state_or_province == 0 && AddressRef.current.setFieldsValue({ state_code: '', });
            AddressRef.current.setFieldsValue({ city: null, });
        }
        fetchCities(value)

    }

    const [phone, setPhone] = useState({ short: 'KW' })
    const handlePhone = (v) => {
        setPhone(v)
        // { phone: '32', code: 965, short: 'KW' }
        if (v.phone) { AddressRef.current.setFieldsValue({ recipient_phone: `${v.code}${v.phone}` }) }
        else { AddressRef.current.setFieldsValue({ recipient_phone: null }) }

    }
    const handleStateCode = (value) => {
        form.setFieldsValue({ 'state_code': value })
    }
    const citySelected = (e, v) => {

        let city = cities.filter(ele => ele.id === e)

        if (city[0] && city[0].code) {
            // handleStateCode(city[0].code);
            form.setFieldsValue({ 'state_code': city[0].code })
        }
        else { form.setFieldsValue({ 'state_code': '' }) }
    }

    return (
        <Modal
            title={type === "Address" ? t("New Address") : t('Add Recipient')}
            visible={visible}
            onOk={() => {
                form.
                    validateFields()
                    .then(values => {
                        handleOk(values)
                    })
            }}
            onCancel={handleCancel}
            className={i18n.language === "ar" ? "myModal arabicAlign" : "myModal"}

        >
            <Form
                form={form}
                autoComplete={false}
                labelCol={{
                    span: 32
                }}
                wrapperCol={{
                    span: 30
                }}
                initialValues={{
                    remember: true
                }}
                ref={AddressRef}
                layout="vertical"
            >
                <div className='row'>
                    {!isSender && type === "Recipient" && (

                        <>
                            <div className='col-md-6'>
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
                            <div className='col-md-6'>   <Form.Item
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

                            <div className='col-md-6'>
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
                                    <ConfigProvider locale={en}
                                        areaMapper={(area) => {
                                            return Object.assign(Object.assign({}, area), { emoji: <span className={`fp ${area.short.toLowerCase()}`} /> });
                                        }}
                                    >
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
                            <div className='col-md-6'>
                                <Form.Item
                                    label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                                    name="email"
                                    // type='email'
                                    rules={[
                                        {
                                            required: true,
                                            message: i18n.language == 'ar' ? `الرجاء ادخل البريد الالكتروني للمستلم!` : 'Please Input Recipient Email!',
                                        },

                                    ]}
                                >
                                    {/* type='email' */}
                                    <Input placeholder={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`} />
                                </Form.Item>
                            </div>
                        </>


                    )}
                    {/* <div className='col-md-6'>
                        <Form.Item
                            name="type"
                            label={t('Type')}
                            rules={[
                                {
                                    required: true,
                                    message: t('Required')
                                }
                            ]}
                        >
                            <Select placeholder={t('Type')}
                                className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}
                                direction={i18n.language === "ar" ? 'rtl' : 'ltr'}>
                                {types.map((ele, index) => {
                                    return (
                                        <Option value={ele} key={index} >
                                            <div className={i18n.language === "ar" ? 'toRight' : ""}>
                                                {ele}
                                            </div>

                                        </Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='col-md-6'>
                        <Form.Item
                            name="main"
                            label={t('Main Address')}
                            rules={[
                                {
                                    required: true,
                                    message: t('Required')
                                }
                            ]}
                        >
                            <Select placeholder={t('Main Address')}
                                className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}
                                direction={i18n.language === "ar" ? 'rtl' : 'ltr'}>
                                <Option value={'main'}>
                                    <div className={i18n.language === "ar" ? 'toRight' : ""}>
                                        {t('Main')}
                                    </div>
                                </Option>
                                <Option value={'extra'}>
                                    <div className={i18n.language === "ar" ? 'toRight' : ""}>

                                        {t('Extra')}
                                    </div>
                                </Option>
                            </Select>
                        </Form.Item>
                    </div> */}
                    <div className='col-md-6'>
                        <Form.Item
                            autoComplete='none'
                            name="country"
                            label={t('Country')}
                            rules={[
                                {
                                    required: true,
                                    message: t('Required')
                                }
                            ]}
                        >
                            <Select
                                autoComplete='none'
                                disabled={isSender && type === "Address"}
                                showSearch
                                optionFilterProp="children"
                                value={country}
                                onChange={handleCountryChange}
                                // onSearch={onSearch}
                                listItemHeight={10}
                                //  listHeight={250}

                                placeholder={t('Country')}
                                direction={i18n === "ar" ? 'rtl' : 'ltr'}
                                className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}>
                                {countries.map((item) => {
                                    return (
                                        <React.Fragment key={item.id}>
                                            {type === "Recipient" && item.id == 117 ?
                                                null
                                                :
                                                <Option value={item.id}>
                                                    {i18n.language === 'ar' ?
                                                        item.country_name_ar ? item.country_name_ar : item.country_name_en
                                                        : item.country_name_en}
                                                    {' / '}{item.country_code}</Option>
                                            }

                                        </React.Fragment>

                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='col-md-6'>
                        <Form.Item
                            autoComplete='none'
                            name="city"
                            label={t('City')}
                            rules={[
                                {
                                    required: true,
                                    message: t('Required')
                                }
                            ]}
                        >
                            <Select placeholder={t('City')}
                                autoComplete='none'
                                showSearch
                                optionFilterProp="children"
                                listItemHeight={10}
                                // listHeight={250}
                                loading={loadingCities}
                                disabled={disableCities}
                                onSelect={(e, v) => citySelected(e, v)}
                                direction={i18n.language === "ar" ? 'rtl' : 'ltr'}
                                className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}>
                                {cities.map((ele, index) => {
                                    return (
                                        <Option key={ele.id} value={ele.id}>
                                            {i18n.language === 'ar' ?
                                                ele.name_ar ? ele.name_ar : ele.name_en
                                                :
                                                ele.name_en}
                                        </Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    {country === 117 ?
                        <>
                            <div className='col-md-6 col-lg-4'>
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
                            <div className='col-md-6 col-lg-4'>
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
                            <div className='col-md-6 col-lg-4'>
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
                            <div className='col-md-6 col-lg-5'>
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
                            <div className='col-md-6 col-lg-4'>
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
                            <div className='col-md-6 col-lg-3'>
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
                            <div className='col-md-6 col-lg-3'>
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
                            <div className='col-md-6 col-lg-3'>
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

                            <div className='col-md-6 col-lg-6'>
                                <Form.Item
                                    label={i18n.language == 'ar' ? `العنوان الكامل` : `Full Address`}
                                    rules={[
                                        {
                                            required: true,
                                            message: i18n.language == 'ar' ?
                                                `الرجاء ادخل حقل العنوان الكامل`
                                                : 'Please Input Full Address Field!',
                                        },

                                    ]}
                                    name="line_1"
                                >

                                    <Input placeholder={i18n.language == 'ar' ? `العنوان الكامل` : `Full Address`} />
                                </Form.Item>


                            </div>
                            <div className='col-md-6 col-lg-6'>
                                <Form.Item
                                    label={i18n.language == 'ar' ? `إضافة على العنوان` : `Extra Addres Information`}

                                    name="line_2"
                                >

                                    <Input placeholder={i18n.language == 'ar' ? `إضافة على العنوان` : `Extra Addres Information`} />
                                </Form.Item>


                            </div>
                            {countryDetails.stateCode ? <div className=' col-md-6 col-lg-3'>
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
                                    <Input disabled={!countryDetails.stateCode}

                                        placeholder={i18n.language == 'ar' ? `رمز الولاية` : `State Code`} />

                                </Form.Item>


                            </div> : null}
                            {countryDetails.postalCode ? <div className='col-md-6  col-lg-3'>
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
                            {/* <div className='col-md-6 col-lg-6'>
                                <Form.Item
                                    label={i18n.language == 'ar' ? `السطر 3` : `Line 3`}

                                    name="line_3"
                                >
                                    <Input placeholder={i18n.language == 'ar' ? `السطر 3` : `Line 3`} />
                                </Form.Item>


                            </div> */}

                        </>

                    }

                    {errorMessage2 && <div className='col-md-12 '>

                        {Object.keys(errorMessage2).map((item, i) => (
                            <Alert message={errorMessage2[item]} type="error" showIcon />
                        ))}
                    </div>}
                </div>
            </Form>
        </Modal>
    )
}
export default NewAddress;