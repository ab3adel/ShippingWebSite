import React, { Component, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import "../../globalVar"

const SignupForm = () => {
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
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
            onSubmit(values)
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onSubmit = async (data) => {
        console.log(JSON.stringify({ data }))
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/register`,
                {
                    method: "POST",
                    headers: {
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
                setAnimat(!animat)
                setSuccessAdd(i18n.language == 'ar' ? `نجاح` : `Success`)
                setLoading(false)
                form.resetFields();

                const timer = setTimeout(() => { setSuccessAdd('') }, 8000);
                await localStorage.setItem(
                    "token",
                    JSON.stringify(response.payload.access_token)
                );
                history.push('/')
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
            autoComplete="off"
            layout="vertical"
        >
            <Fade top spy={animat} duration={1000} >
                <div>

                    {succesAdd && <>

                        <Alert message={succesAdd} type="success" showIcon />
                    </>

                    }
                </div>
            </Fade>
            <Fade top spy={animat} duration={1000} >
                <div>

                    {errorMessage && <>

                        {Object.keys(errorMessage).map((item, i) => (
                            <Alert message={errorMessage[item]} type="error" showIcon />
                        ))}

                    </>

                    }
                </div>
            </Fade>

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
                <div className='col-md-6'>   <Form.Item
                    label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                    name="email"
                    type='email'
                    rules={[
                        {
                            // type: 'email',
                            required: true,
                            message: i18n.language == 'ar' ? `الرجاء ادخل بريدك الالكتروني !` : 'Please input your Email!',
                        },

                    ]}
                >
                    {/* type='email' */}
                    <Input placeholder='email@example.com' />
                </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `كلمة المرور` : `Password`}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل كلمة المرور !` : 'Please input your password!',
                            },
                        ]}
                    >

                        <Input.Password placeholder='********' />
                    </Form.Item>


                </div>
                <div className='col-md-6'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `تأكيد كلمة المرور` : `Password Confirmation`}
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل تأكيد كلمة المرور !` : 'Please input your password confirmation!',
                            },
                        ]}
                    >

                        <Input.Password placeholder='********' />
                    </Form.Item>


                </div>

                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم الهاتف` : `Phone Number`}
                        name="customer[phone]"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `رقم الهاتف` : `Phone Number`} />
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
<<<<<<< HEAD
=======


>>>>>>> 020d688709a61424bc6e32bd749a673d8218e87d
                </div> */}



            </div>






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