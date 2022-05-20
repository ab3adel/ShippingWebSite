import React, { Component, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import CountryPhoneInput, { ConfigProvider, } from 'antd-country-phone-input';
import en from './world.json';

import 'flagpack/dist/flagpack.css';
import { Row, Col, Upload, Form, Input, Button, Checkbox, Select } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import "../../globalVar"
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const SignupForm = () => {
    const { Option } = Select;
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const [fileList, setFileList] = useState([])
    const [fileList2, setFileList2] = useState([])
    const [categories, setCategories] = useState([])
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
    const formRef = useRef(null)
    useEffect(() => {

        // onFill()
        const fetchCategories = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/categories`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );
                const response = await responsee.json();
                if (response.success) {
                    setCategories(response.payload)
                }

            } catch (err) { console.log(err); }
        }

        fetchCategories()
    }, [])
    const onFinish = (values) => {
        console.log('Success:', values);
        if (values.password != values.password_confirmation) {
            setAnimat(!animat)
            setErrorMessage({
                credentials: i18n.language == 'ar' ?
                    `كلمة المرور وتأكيد كلمة المرور غير متطابقين`
                    :
                    `Password and confirm password don't match`
            })


            const timer = setTimeout(() => { setErrorMessage('') }, 8000);
            return () => clearTimeout(timer);
        }
        else {


            const number = phoneUtil.parseAndKeepRawInput(values['customer[phone]'], phone.short);
            if (phoneUtil.isValidNumber(number) && phoneUtil.isValidNumberForRegion(number, phone.short)) {
                onSubmit(values)
            }
            else {
                form.setFields([
                    {
                        name: 'customer[phone]',
                        errors: [`${i18n.language == 'ar' ?
                            `الرجاء ادخل رقم هاتف صحيح!` : 'Please Input Valid Phone Number!'}`],
                    },
                ])
            }



        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const uploadConfig = {
        onRemove: file => {

            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList([])
            return false



        },
        beforeUpload: file => {
            setFileList([file])

            return false;
        },
        fileList,
    };
    const uploadConfig2 = {
        onRemove: file => {

            const index = fileList2.indexOf(file);
            const newFileList = fileList2.slice();
            newFileList.splice(index, 1);
            setFileList2([])
            return false



        },
        beforeUpload: file => {
            setFileList2([file])

            return false;
        },
        fileList2,
    };
    const onSubmit = async (data) => {
        console.log(JSON.stringify({ data }))
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var regData = new FormData()


        regData.append('IDPhoto_face', fileList[0])
        regData.append('IDPhoto_back', fileList2[0])
        regData.append('email', data.email)
        regData.append('name', data.name)
        regData.append('password', data.password)
        regData.append('password_confirmation', data.password_confirmation)
        regData.append('customer[phone]', data[`customer[phone]`])
        regData.append('customer[company]', data[`customer[company]`])
        regData.append('category_id', data.category_id)

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/register`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: regData,
                }
            );
            const response = await responsee.json();
            if (response.success) {
                setAnimat(!animat)
                setSuccessAdd({
                    msg1: i18n.language == 'ar' ? `تم تسجيل الحساب بنجاح` : `Account has been successfully registered`,
                    msg2: i18n.language == 'ar' ? `انتظر تفعيل الحساب من قبل المسؤول` : `Wait for the account to be activated by the administrator`

                })
                setPhone({ short: 'KW' })
                form.resetFields();
                setFileList([])
                setFileList2([])
                setLoading(false)

                const timer = setTimeout(() => { setSuccessAdd('') }, 10000);
                // await localStorage.setItem(
                //     "token",
                //     JSON.stringify(response.payload.access_token)
                // );
                // history.push('/')
                return () => clearTimeout(timer);

            }
            else {
                setLoading(false)
                setAnimat(!animat)
                setErrorMessage(response.errors)


                const timer = setTimeout(() => { setErrorMessage('') }, 8000);
                return () => clearTimeout(timer);

            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
        // reset({})
    };
    const getFlag = (short) => {
        const data = require(`world_countries_lists/data/flags/24x24/${short.toLowerCase()}.png`);
        // for dumi
        if (typeof data === 'string') {
            return data;
        }
        // for CRA
        return data.default;
    };
    const [phone, setPhone] = useState({ short: 'KW' })
    const handlePhone = (v) => {
        setPhone(v)
        // { phone: '32', code: 965, short: 'KW' }
        if (v.phone) { formRef.current.setFieldsValue({ "customer[phone]": `${v.code}${v.phone}` }) }
        else { formRef.current.setFieldsValue({ "customer[phone]": null }) }

    }
    return (
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            ref={formRef}
            autoComplete="off"
            layout="vertical"
        >


            <div className='row'>
                <div className='col-md-6'>   <Form.Item
                    label={i18n.language == 'ar' ? `الاسم` : `Name`}
                    name="name"
                    // type='email'
                    rules={[
                        {
                            required: true,
                            message: i18n.language == 'ar' ? `الرجاء ادخل اسمك!` : 'Please input your Name!',
                        },

                    ]}
                >
                    {/* type='email' */}
                    <Input placeholder={i18n.language == 'ar' ? `الاسم` : `Name`} />
                </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                        autoComplete='none'
                        label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                        name="email"
                        type='email'
                    // rules={[
                    //     {
                    //         // type: 'email',
                    //         required: true,
                    //         message: i18n.language == 'ar' ? `الرجاء ادخل بريدك الالكتروني !` : 'Please input your Email!',
                    //     },

                    // ]}
                    >
                        {/* type='email' */}
                        <Input placeholder='email@example.com' autoComplete='none' />
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                        autoComplete='none'
                        label={i18n.language == 'ar' ? `كلمة المرور` : `Password`}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل كلمة المرور !` : 'Please input your password!',
                            },
                        ]}
                    >

                        <Input.Password placeholder='********' autoComplete='none' />
                    </Form.Item>


                </div>
                <div className='col-md-6'>
                    <Form.Item
                        autoComplete='off'
                        label={i18n.language == 'ar' ? `تأكيد كلمة المرور` : `Password Confirmation`}
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل تأكيد كلمة المرور !` : 'Please input your password confirmation!',
                            },
                        ]}
                    >

                        <Input.Password placeholder='********' autoComplete='off' />
                    </Form.Item>


                </div>


                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم الهاتف` : `Phone Number`}
                        name="customer[phone]"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل رقم هاتفك !` : 'Please input your phone number !',
                            },
                        ]}
                    >
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
                        {/* <Input placeholder={i18n.language == 'ar' ? `رقم الهاتف` : `Phone Number`} /> */}
                    </Form.Item>


                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الشركة` : `Company`}
                        name="customer[company]"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `الشركة` : `Company`} />
                    </Form.Item>


                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `التصنيف` : `Category`}
                        name="category_id"
                        // type='email' 
                        autoComplete='off'
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء اختر تصنيف!` : 'Please Select Category!',
                            },

                        ]}
                    >
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder={i18n.language == 'ar' ? `اختر تصنيف` : `Select Category`}



                        // optionLabelProp="label"
                        >
                            {categories && categories.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}  >
                                        {i18n.language == 'ar' ? item.name_ar : item.name_en}
                                    </Option>
                                )
                            })}


                        </Select>
                    </Form.Item>
                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `صورة الهوية (وجه أمامي)` : `ID Photo (Face)`}
                        required
                        name="IDPhoto_face"
                        rules={[
                            {

                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء رفع صورة الهوية!` : 'Please upload ID Image!',
                            },

                        ]}
                    >
                        <Upload accept='image/*' className=' ' {...uploadConfig} required multiple={false} fileList={fileList} value={fileList}>
                            <Button className='col-md-12 uploadBTN idPhoto'  >
                                <i class="fa fa-upload" aria-hidden="true"></i>
                                {"  "}{i18n.language == 'ar' ? `رفع صورة` : `Upload Image`}</Button>
                        </Upload>

                    </Form.Item>
                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `صورة الهوية (وجه خلفي)` : `ID Photo (Back)`}
                        required
                        name="IDPhoto_back"
                        rules={[
                            {

                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء رفع صورة الهوية!` : 'Please upload ID Image!',
                            },

                        ]}
                    >
                        <Upload accept='image/*' className=' ' {...uploadConfig2} required multiple={false} fileList={fileList2} value={fileList2}>
                            <Button className='col-md-12 uploadBTN idPhoto'  >
                                <i class="fa fa-upload" aria-hidden="true"></i>
                                {"  "}{i18n.language == 'ar' ? `رفع صورة` : `Upload Image`}</Button>
                        </Upload>

                    </Form.Item>
                </div>
                <div className='col-md-12 agreeDiv'>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve()
                                        : Promise.reject(new Error(
                                            i18n.language == 'ar' ? "يجب الموافقة على الشروط والأحكام"
                                                :
                                                "You must agree to the terms and conditions"
                                        )),
                            },
                        ]}

                    >
                        <Checkbox>
                            {i18n.language == 'ar' ? ` أوافق على` : `I Agree To `}

                            <Link to="/terms-Conditions">
                                {i18n.language === 'ar' ?
                                    `الشروط و الأحكام`
                                    :
                                    `The Terms and Conditions`}</Link>
                        </Checkbox>
                    </Form.Item>

                </div>
                {/* <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `اسم البنك` : `Bank Name`}
                        name="customer[bank_name]"
                    >
                        <Input placeholder={i18n.language == 'ar' ? `اسم البنك` : `Bank Name`} />
                    </Form.Item>
                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم الحساب البنكي` : `Bank Account Number`}
                        name="customer[bank_account_number]"
                    >
                        <Input placeholder={i18n.language == 'ar' ? `رقم الحساب البنكي` : `Bank Account Number`} />
                    </Form.Item>
                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم IBAN` : `IBAN Number`}
                        name="customer[IBAN_number]"
                    >
                        <Input placeholder={i18n.language == 'ar' ? `رقم IBAN` : `IBAN Number`} />
                    </Form.Item>


                </div> */}



            </div>



            <Fade top spy={animat} duration={1000} >
                <div className='col-md-12 mb-1'>

                    {succesAdd && <>
                        {Object.keys(succesAdd).map((item, i) => (
                            <Alert message={succesAdd[item]} type="success" showIcon />
                        ))}


                    </>

                    }

                </div>
            </Fade>
            <Fade top spy={animat} duration={1000} >
                <div className='col-md-12'>

                    {errorMessage && <>

                        {Object.keys(errorMessage).map((item, i) => (
                            <Alert message={errorMessage[item]} type="error" showIcon />
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
                <Button type="primary" htmlType="submit" className='col-md-8' disabled={loading}>
                    {i18n.language == 'ar' ? `انشاء حساب` : `Create Account`}
                    {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                </Button>
            </Form.Item>
            <Form.Item className='createLabel'
            >
                <div class="ant-col ant-col-30 ant-form-item-label">
                    <label   >  {i18n.language == 'ar' ? `لديك حساب ؟` : `You Already Have An Account?`}  </label>
                    <Link to='/Login' className='signupLiink'> {i18n.language == 'ar' ? `عودة الى تسجبل الدخول` : `Back To Login`}</Link>

                </div>
            </Form.Item>
        </Form>

    )

}



export default SignupForm;