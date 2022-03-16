import React, { Component, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Form, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import "../../globalVar"


const LoginForm = () => {
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        onSubmit(values)
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
                `${global.apiUrl}api/login`,
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
                setLoading(false)
                form.resetFields();
                await localStorage.setItem(
                    "token",
                    JSON.stringify(response.payload.access_token)
                );
                history.push('/')


            }
            else {
                setLoading(false)
                setAnimat(!animat)
                setErrorMessage(response.messages)


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
                // span: 32,
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

                    {errorMessage && <>

                        {Object.keys(errorMessage).map((item, i) => (
                            <Alert message={errorMessage[item]} type="error" showIcon />
                        ))}

                    </>

                    }
                </div>
            </Fade>

            <Form.Item
                label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                name="email"
                // type='email'
                rules={[
                    {
                        // type: 'email',
                        required: true,
                        message: i18n.language == 'ar' ? `الرجاء ادخل بريدك الالكتروني !` : 'Please input your Email!',
                    },
                    // {
                    //     type: 'email',

                    //     message: i18n.language == 'ar' ? `الرجاء ادخل بريد الكتروني صحيح!` : 'Please enter a valid email',
                    // },
                ]}
            >
                {/* type='email' */}
                <Input placeholder='email@example.com' />
            </Form.Item>

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



            <Form.Item
                // wrapperCol={{
                //     // offset: 24,
                //     span: 25,
                // }}
                className='text-center'
            >
                <Button type="primary" htmlType="submit" className='col-md-8' disabled={loading}>
                    {i18n.language == 'ar' ? `تسجيل الدخول` : `LOGIN`}
                    {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                </Button>
            </Form.Item>
            <Form.Item className='createLabel'
            >
                <div class="ant-col ant-col-30 ant-form-item-label">
                    <label   >  {i18n.language == 'ar' ? `ليس لديك حساب ؟` : `You Don't Have An Account?`}  </label>
                    <Link to='/Register' className='signupLiink'> {i18n.language == 'ar' ? `انشاء حساب` : `Create Account`}</Link>

                </div>
            </Form.Item>
        </Form>

    )

}



export default LoginForm;