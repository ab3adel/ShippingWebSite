import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { Modal, Carousel, Form, Input, Button, Alert, Upload, Radio, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import Fade from 'react-reveal/Fade';
import '../../globalVar';
import UpdateProfile from './UpdateProfile'
import './style.css'

const ProfileInfo = () => {
    const { TextArea } = Input;
    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const profile = useSelector((state) => state.profile.profile)
    const [t, i18n] = useTranslation();
    const [addAttachModal, setAddAttachModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const carousel = useRef();
    const attachmentFormRef = useRef();
    const [attachmentForm] = Form.useForm();
    const [uploading, setUploading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [attachType, setAttachType] = useState('file')

    useEffect(() => { !userToken && history.push('/') })
    const uploadConfig = {
        onRemove: file => {

            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)
            return false



        },
        beforeUpload: file => {
            setFileList([file])

            return false;
        },
        fileList,
    };
    const handleNext = () => carousel.current.next();
    const handlePrev = () => carousel.current.prev();
    const onFinish = (values) => {
        console.log('Success:', values);

        onSubmitAddAtachment(values)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOpenAttachModal = () => {
        attachmentForm.resetFields();
        setAttachType('file')
        setAddAttachModal(true)
        setFileList([])
    }
    const onSubmitAddAtachment = async (values) => {
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var data = new FormData()
        data.append('customer_id', profile.customer.id)
        data.append('key', values.key)
        data.append('value', values.value)


        try {
            const responsee = await fetch(
                `${global.apiUrl}api/attachments`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        Accept: "application/json",
                    },
                    body: data,

                }
            );
            const response = await responsee.json();
            if (response.success) {
                setAnimat(!animat)
                setSuccessAdd(i18n.language == 'ar' ? `تم تعديل المعلومات بنجاح` : `Information has been modified successfully`)
                setLoading(false)
                // form.resetFields();
                // setProfile(response.payload)
                // attachmentForm.resetFields();
                // setFileList([])
                const timer = setTimeout(() => { setSuccessAdd('') }, 8000);
                return () => clearTimeout(timer);

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

    }
    const handleCloseAttachModal = () => {
        attachmentForm.resetFields();
        setAddAttachModal(false)
        setAttachType('file')
        setFileList([])
    }

    return (
        <div className="section profileSection">
            {profile &&
                <>
                    <Carousel ref={carousel} dots={false} touch={false} pauseOnHover={true}
                        touchMove={false}
                        swipe={false}
                        draggable={false} adaptiveHeight={true}>
                        <div className=' d-flex '>


                            <div className='container'>
                                <div className="row  d-flex justify-content-center">
                                    <div className=" col-md-12">
                                        <div className="carddd user-card-full">
                                            <div className="row m-l-0 m-r-0">
                                                <div className="col-md-12 col-lg-4 bg-c-lite-green user-profile">
                                                    <div className="card-block text-center text-white USerCont">
                                                        <div className=" ">
                                                            <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                                                        <h6 className="f-w-600 nameProfile ">
                                                            {profile.name}
                                                        </h6>
                                                        <p className='comp'>  {profile.customer && profile.customer.company ? profile.customer.company :
                                                            i18n.language == 'ar' ? 'الشركة غير معرفة' : 'No Company'}</p>
                                                        <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleNext() }} >
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تعديل` : `Update`}

                                                        </Button>
                                                        <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleOpenAttachModal() }} >
                                                            <i className="fa fa-paperclip" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `اضافة مرفق` : `Add Attachment`}

                                                        </Button>


                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-8">
                                                    <div className="card-block">
                                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">

                                                            {i18n.language == 'ar' ? `معلومات الحساب` : `Account Information`}
                                                        </h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">

                                                                    {i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                                                                </p>
                                                                <h6 className="text-muted f-w-400">{profile.email}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">
                                                                    {i18n.language == 'ar' ? `هاتف` : `Phone`}

                                                                </p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {profile.customer && profile.customer.phone ? profile.customer.phone : '-'}
                                                                </h6>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <p className="m-b-10 f-w-600">
                                                                    {i18n.language == 'ar' ? `العنوان` : `Address`}

                                                                </p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {profile.customer && profile.customer.address ? profile.customer.address : '-'}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                            {i18n.language == 'ar' ? `معلومات مصرفية` : `Banking Information`}</h6>
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `اسم البنك` : `Bank Name`}</p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {profile.customer && profile.customer.bank_name ? profile.customer.bank_name : '-'}
                                                                </h6>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `رقم الحساب` : `Account Number`}</p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {profile.customer && profile.customer.bank_account_number ? profile.customer.bank_account_number : '-'}
                                                                </h6>
                                                            </div>

                                                            <div className="col-sm-4">
                                                                <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `رقم IBAN` : `IBAN Number`}</p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {profile.customer && profile.customer.IBAN_number ? profile.customer.IBAN_number : '-'}
                                                                </h6>
                                                            </div>

                                                        </div>
                                                        {profile.customer && profile.customer.attachments.length > 0 ?
                                                            <>

                                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                                    {i18n.language == 'ar' ? `معلومات اضافية` : `Extra Information`}</h6>

                                                                <div className="row">

                                                                    {profile.customer.attachments.map((item) => {
                                                                        return (
                                                                            <div key={item.id} className="col-sm-4">
                                                                                <p className="m-b-10 f-w-600">{item.key}</p>
                                                                                <h6 className="text-muted f-w-400">
                                                                                    {item.file == 0 ? item.value :
                                                                                        <>
                                                                                            <a href={`${global.apiUrl + item.value}`} target="_blank">
                                                                                                {i18n.language == 'ar' ? `رابط الملف` : `File URL`}
                                                                                            </a>
                                                                                        </>

                                                                                    }
                                                                                </h6>
                                                                            </div>



                                                                        )
                                                                    })}

                                                                </div>
                                                            </>
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=' d-flex '>
                            <div className='container'>
                                <div className="row  d-flex justify-content-center">
                                    <div className="col-md-12 col-lg-4  bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white USerCont">
                                            <div className=" ">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                                            <h6 className="f-w-600 nameProfile ">
                                                {profile.name}
                                            </h6>
                                            <p className='comp'>  {profile.customer && profile.customer.company ? profile.customer.company :
                                                i18n.language == 'ar' ? 'الشركة غير معرفة' : 'No Company'}</p>
                                            <Button type="primary" className='col-md-8 profileButton' onClick={() => { handlePrev() }} >
                                                <i className="fa fa-undo" aria-hidden="true"  ></i>
                                                {i18n.language == 'ar' ? `رجوع` : `Back`}

                                            </Button>

                                        </div>
                                    </div>
                                    <div className=" col-md-12 col-lg-8 registerFormCol">
                                        <UpdateProfile />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>




                    <Modal
                        wrapClassName='attachModal'
                        title={i18n.language == 'ar' ? `إضافة مرفق` : `Add Attachment`}
                        centered
                        visible={addAttachModal}
                        // onOk={() => handleSaveAttach()}
                        onCancel={() => handleCloseAttachModal()}
                        footer={[
                            <Button className='cancelBTN' key="back" onClick={() => handleCloseAttachModal()}>
                                {i18n.language == 'ar' ? `الغاء` : `Cancel`}
                            </Button>,
                            <Button key="bsack" type="primary" htmlType="submit" className='col-5 col-xs-5 col-sm-5 col-md-5 saveBtn' onClick={() => attachmentForm.submit()} disabled={loading}>
                                {i18n.language == 'ar' ? `حفظ` : `Save`}
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
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            form={attachmentForm}
                            autoComplete="off"
                            layout="vertical"
                            ref={attachmentFormRef}
                        >


                            <div className='row'>
                                {/* <div className='col-md-12'>
                                    <h4 className='updateFormTitle'>

                                        {i18n.language == 'ar' ? `تعديل الحساب` : `Update Account`}

                                    </h4>

                                </div> */}
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

                                <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `نوع المرفق` : `Attatchmentt Type`}
                                        name="TYPE" >
                                        <Radio.Group defaultValue={attachType} value={attachType}
                                            onChange={(e) => { attachmentForm.resetFields(); setAttachType(e.target.value) }}>
                                            <Radio.Button value="text">{i18n.language == 'ar' ? `نص` : `TEXT`}</Radio.Button>
                                            <Radio.Button value="file">{i18n.language == 'ar' ? `ملف` : `File`}</Radio.Button>

                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `اسم المرفق` : `Attatchment Name`}
                                        name="key"
                                        // type='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء ادخل اسم المرفق!` : 'Please input Attatchment Name!',
                                            },

                                        ]}
                                    >
                                        {/* type='email' */}
                                        <Input placeholder={i18n.language == 'ar' ? `اسم المرفق` : `Attatchment Name`} />
                                    </Form.Item>
                                </div>
                                {attachType === 'text' ?
                                    <div className='col-md-12'>
                                        <Form.Item
                                            label={i18n.language == 'ar' ? `المعلومات` : `Information`}
                                            name="value"

                                            rules={[
                                                {

                                                    required: true,
                                                    message: i18n.language == 'ar' ? `الرجاء ادخل المعلومات!` : 'Please input your Information!',
                                                },

                                            ]}
                                        >
                                            {/* type='email' */}
                                            <TextArea autoSize={{ minRows: 1, maxRows: 3 }} placeholder={i18n.language == 'ar' ? `المعلومات` : `Information`} />
                                        </Form.Item>
                                    </div>
                                    :

                                    <div className='col-md-12'>
                                        <Form.Item
                                            label={i18n.language == 'ar' ? `ملف` : `File`}
                                            required
                                            name="value"
                                            rules={[
                                                {

                                                    required: true,
                                                    message: i18n.language == 'ar' ? `الرجاء رفع ملف!` : 'Please upload File!',
                                                },

                                            ]}
                                        >
                                            <Upload className=' ' {...uploadConfig} required multiple={false} fileList={fileList}>
                                                <Button className='col-md-12 uploadBTN'  ><i class="fa fa-upload" aria-hidden="true"></i>{"  "}{i18n.language == 'ar' ? `رفع ملف` : `Upload File`}</Button>
                                            </Upload>

                                        </Form.Item>
                                    </div>
                                }




                            </div>

                        </Form>
                    </Modal>

                </>
            }
        </div>

    )

}

export default ProfileInfo;
