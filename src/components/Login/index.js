import React, { Component, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import "../../globalVar"
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'


const LoginForm = () => {
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const dispatch = useDispatch()
    const { clearProfile, setProfile } = bindActionCreators(actionCreators, dispatch)
    const forgetFormRef = useRef();
    const [forgetForm] = Form.useForm();
    const [forgetModal, setForgetModal] = useState(false)
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
    const onFinish = (values) => {

        onSubmit(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onSubmit = async (data) => {

        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)

        let dataLogin = {}

        data.inputReg.split('@').length > 1 ?
            dataLogin = { password: data.password, email: data.inputReg }
            :
            dataLogin = { password: data.password, phone: "965" + data.inputReg.toString().trim().replaceAll(" ", "").slice(-8) }

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
                    body: JSON.stringify(dataLogin),

                }
            );
            const response = await responsee.json();
            if (response.success) {
                setLoading(false)
                form.resetFields();
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.payload.access_token)
                );
                setProfile(response.payload)
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
    const handleOpenForgetModal = () => {
        forgetForm.resetFields();
        setForgetModal(true)
        setErrorMessage('')
        setSuccessAdd('')
    }
    const handleCloseForgetModal = () => {
        forgetForm.resetFields();
        setForgetModal(false)
        setErrorMessage('')
        setSuccessAdd('')
    }
    const onFinishForget = (values) => {

        onSubmitforget(values)



    };

    const onFinishFailedForget = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmitforget = async (data) => {

        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var regData = new FormData()

        regData.append('email', data.email)
        try {
            const responsee = await fetch(
                `${global.apiUrl}api/forgotPassword`,
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
                setLoading(false)
                setAnimat(!animat)
                setSuccessAdd(i18n.language == 'ar' ? "تم إرسال بريد إلكتروني بكلمة مرور جديدة إليك ، يرجى التحقق من صندوق الوارد الخاص بك." : "An email with new password has been sent to you, please check your inbox.")


                const timer = setTimeout(() => { setSuccessAdd('') }, 8000);
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

    };
    return (
        <>
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

                            {Object.keys(errorMessage).map((item, index) => (
                                <Alert message={errorMessage[item]} key={index} type="error" showIcon />
                            ))}

                        </>

                        }
                    </div>
                </Fade>

                <Form.Item
                    label={i18n.language == 'ar' ? `البريد الالكتروني أو رقم الهاتف` : `Email Or Phone Number`}
                    name="inputReg"
                    // type='email'
                    rules={[
                        {
                            // type: 'email',
                            required: true,
                            message: i18n.language == 'ar' ? `الرجاء ادخل بريدك الالكتروني أو رقم الهاتف` : 'Please input your Email or Phone Number!',
                        },

                    ]}
                >

                    <Input placeholder='email@example.com Or phone Number ' />
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

                <Form.Item className='createLabel mb-1'
                >
                    <div class="ant-col ant-col-30 ant-form-item-label">
                        <label style={{ cursor: "pointer" }} onClick={() => { handleOpenForgetModal() }} >  {i18n.language == 'ar' ? `هل نسيت كلمة المرور ؟` : `Did You Forget Your Password ?`}  </label>


                    </div>
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
            <Modal
                wrapClassName='attachModal'
                title={i18n.language == 'ar' ? `نسيت كلمة المرور` : `Forget Your Password`}
                centered
                visible={forgetModal}
                // onOk={() => handleSaveAttach()}
                onCancel={() => handleCloseForgetModal()}
                footer={[
                    <Button className='cancelBTN' key="back" onClick={() => handleCloseForgetModal()}>
                        {i18n.language == 'ar' ? `اغلاق` : `Close`}
                    </Button>,
                    <Button key="bsack" type="primary" htmlType="submit" className='col-5 col-xs-5 col-sm-5 col-md-5 saveBtn'
                        onClick={() => forgetForm.submit()} disabled={loading}>
                        {i18n.language == 'ar' ? `إرسال` : `Send`}
                        {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                    </Button>
                ]}
            >
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
                    onFinish={onFinishForget}
                    onFinishFailed={onFinishFailedForget}
                    form={forgetForm}
                    autoComplete="off"
                    layout="vertical"
                    ref={forgetFormRef}
                >


                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='text-center d-block'>

                                {i18n.language == 'ar' ? `سيتم ارسال كلمة مرور جديدة الى بريدك الالكتروني` : `A new password will be sent to your email`}

                            </label>

                        </div>



                        <div className='col-md-12'>
                            <Form.Item
                                autoComplete='none'
                                label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                                name="email"
                                type='email'
                                rules={[
                                    {

                                        required: true,
                                        message: i18n.language == 'ar' ? `الرجاء ادخل بريدك الالكتروني !` : 'Please input your Email!',
                                    },

                                ]}
                            >

                                <Input placeholder='email@example.com' autoComplete='none' />
                            </Form.Item>
                        </div>

                        <Fade top spy={animat} duration={1000} >
                            <div className='col-md-12' >

                                {succesAdd && <>

                                    <Alert message={succesAdd} type="success" showIcon />
                                </>

                                }
                            </div >
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


                    </div>

                </Form>
            </Modal>
        </>


    )

}



export default LoginForm;