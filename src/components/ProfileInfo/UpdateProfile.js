import React, { Component, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Upload, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'
import Fade from 'react-reveal/Fade';
import './formStyle.css'
import "../../globalVar"

const UpdateProfile = ({ reseter }) => {
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const [errorMessage2, setErrorMessage2] = useState();
    const [succesAdd2, setSuccessAdd2] = useState();
    const [loading2, setLoading2] = useState('')
    const [animat2, setAnimat2] = useState(false)
    const UpdateProfileForm = useRef();
    const UpdateCustomerForm = useRef();
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()
    const { refreshProfile, setProfile } = bindActionCreators(actionCreators, dispatch)
    const [form] = Form.useForm();
    const [formCustomer] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);

        onSubmit(values)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinishCustomer = (values) => {
        console.log('Success:', values);

        onSubmitCustomer(values)

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
    const onFinishFailedCustomer = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const profile = useSelector((state) => state.profile.profile)
    const onFill = () => {
        setFileList([])
        UpdateProfileForm.current.setFieldsValue({
            name: profile.name,
            email: profile.email

        });
        UpdateCustomerForm.current.setFieldsValue({

            _method: 'put',
            company: profile.customer.company != null && profile.customer.company != '' && profile.customer.company != 'undefined' ? profile.customer.company : '',
            address: profile.customer.address,
            phone: profile.customer.phone != null && profile.customer.phone != '' && profile.customer.phone != 'undefined' ? profile.customer.phone : '',
            bank_name: profile.customer.bank_name,
            bank_account_number: profile.customer.bank_account_number,
            IBAN_number: profile.customer.IBAN_number,

        });
    };
    useEffect(() => {
        onFill()
    }, [reseter])
    const onSubmit = async (data) => {
        console.log(JSON.stringify({ data }))
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var regData = new FormData()
        // fileList.length > 0 && regData.append('IDPhoto', fileList[0])
        regData.append('email', data.email)
        regData.append('name', data.name)
        regData.append('_method', 'put')

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/users/${profile.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        Accept: "application/json",
                    },
                    body: regData,

                }
            );
            const response = await responsee.json();
            if (response.success) {
                setAnimat(!animat)
                setSuccessAdd(i18n.language == 'ar' ? `تم تعديل المعلومات بنجاح` : `Information has been modified successfully`)
                setLoading(false)
                // form.resetFields();
                setFileList([])
                setProfile(response.payload)
                const timer = setTimeout(() => { setSuccessAdd('') }, 8000);
                return () => clearTimeout(timer);

            }
            else {
                setLoading(false)
                setAnimat(!animat)
                setErrorMessage(response.errors)

                setFileList([])
                const timer = setTimeout(() => { setErrorMessage('') }, 8000);
                return () => clearTimeout(timer);

            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
        // reset({})
    };
    const onSubmitCustomer = async (data) => {
        console.log(JSON.stringify({ data }))
        setErrorMessage2('')
        setSuccessAdd2('')
        setLoading2(true)

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/customers/${profile.customer.id}?_method=put`,
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
                setSuccessAdd2(i18n.language == 'ar' ? `تم تعديل المعلومات بنجاح` : `Information has been modified successfully`)
                setLoading2(false)
                // form.resetFields();
                refreshProfile()
                // setProfile(response.payload)
                const timer = setTimeout(() => { setSuccessAdd2('') }, 8000);
                return () => clearTimeout(timer);

            }
            else {
                setLoading2(false)
                setAnimat2(!animat2)
                setErrorMessage2(response.errors)


                const timerr = setTimeout(() => { setErrorMessage2('') }, 8000);
                return () => clearTimeout(timerr);

            }
        } catch (err) {
            console.log(err);
        }

        setLoading2(false)
        // reset({})
    };
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            autoComplete="off"
            layout="vertical"
            ref={UpdateProfileForm}
        >


            <div className='row'>
                <div className='col-md-12'> <h4 className='updateFormTitle'>

                    {i18n.language == 'ar' ? `تعديل الحساب` : `Update Account`}

                </h4>

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
                {/* <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `صورة الهوية` : `ID Photo`}

                        name="IDPhoto"

                    >
                        <Upload accept='image/*' className=' ' {...uploadConfig} required multiple={false} fileList={fileList} value={fileList}>
                            <Button className='col-md-12 uploadBTN idPhoto'  >
                                <i class="fa fa-upload" aria-hidden="true"></i>
                                {"  "}{i18n.language == 'ar' ? `رفع صورة` : `Upload Image`}</Button>
                        </Upload>

                    </Form.Item>
                </div> */}
                <div className='col-md-12'>
                    <Form.Item
                        // wrapperCol={{
                        //     // offset: 24,
                        //     span: 25,
                        // }}
                        className='text-center'
                    >
                        <Button type="primary" htmlType="submit" className='col-md-4' disabled={loading}>
                            {i18n.language == 'ar' ? `حفظ` : `Save`}
                            {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
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
            form={formCustomer}
            autoComplete="off"
            layout="vertical"
            ref={UpdateCustomerForm}
        >


            <div className='row'>
                <div className='col-md-12'> <h4 className='updateFormTitle'>

                    {i18n.language == 'ar' ? `تعديل المعلومات` : `Information Update`}

                </h4>

                </div>
                <Fade top spy={animat2} duration={1000} >
                    <div className='col-md-12'>

                        {succesAdd2 && <>

                            <Alert message={succesAdd2} type="success" showIcon />
                        </>

                        }
                    </div>
                </Fade>
                <Fade top spy={animat2} duration={1000} >
                    <div className='col-md-12'>

                        {errorMessage2 && <>

                            {Object.keys(errorMessage2).map((item, i) => (
                                <Alert message={errorMessage2[item]} type="error" showIcon />
                            ))}

                        </>

                        }
                    </div>
                </Fade>
                {/* <div className='col-md-12'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `العنوان` : `Address`}
                        name="address"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `العنوان` : `Address`} />
                    </Form.Item>


                </div> */}
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم الهاتف` : `Phone Number`}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: i18n.language == 'ar' ? `الرجاء ادخل رقم الهاتف!` : 'Please input your Phone Number!',
                            },

                        ]}
                    >

                        <Input placeholder={i18n.language == 'ar' ? `رقم الهاتف` : `Phone Number`} />
                    </Form.Item>


                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `الشركة` : `Company`}
                        name="company"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `الشركة` : `Company`} />
                    </Form.Item>


                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `اسم البنك` : `Bank Name`}
                        name="bank_name"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `اسم البنك` : `Bank Name`} />
                    </Form.Item>


                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم الحساب البنكي` : `Bank Account Number`}
                        name="bank_account_number"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `رقم الحساب البنكي` : `Bank Account Number`} />
                    </Form.Item>


                </div>
                <div className='col-md-4'>
                    <Form.Item
                        label={i18n.language == 'ar' ? `رقم IBAN` : `IBAN Number`}
                        name="IBAN_number"
                    >

                        <Input placeholder={i18n.language == 'ar' ? `رقم IBAN` : `IBAN Number`} />
                    </Form.Item>


                </div>



            </div>






            <Form.Item
                // wrapperCol={{
                //     // offset: 24,
                //     span: 25,
                // }}
                className='text-center'
            >
                <Button type="primary" htmlType="submit" className='col-md-4' disabled={loading2}>
                    {i18n.language == 'ar' ? `حفظ` : `Save`}
                    {loading2 && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                </Button>
            </Form.Item>

        </Form>


    </>


    )

}



export default UpdateProfile;