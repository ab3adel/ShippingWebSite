import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { Tag, Modal, Carousel, Form, Input, Button, Alert, Upload, Radio, Select, message } from 'antd';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'
import { UploadOutlined } from '@ant-design/icons';

import Fade from 'react-reveal/Fade';
import '../../globalVar';
import UpdateProfile from './UpdateProfile'
import './style.css'

const ProfileInfo = () => {
    const { Option } = Select;
    const { TextArea } = Input;
    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const dispatch = useDispatch()
    const { refreshProfile, setProfile, clearProfile } = bindActionCreators(actionCreators, dispatch)
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
    const passFormRef = useRef();
    const [passForm] = Form.useForm();
    const [reseter, setReseter] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [attachType, setAttachType] = useState('file')
    const [passwordModal, setPasswordModal] = useState(false)
    const [categoriesModal, setCategoriesModal] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedtCategories] = useState()
    const [loadingId, setLoadingId] = useState('')
    const [categoriesForm] = Form.useForm();
    const categoriesFormRef = useRef(null);
    useEffect(() => { !userToken && history.push('/') })
    useEffect(() => {

        // onFill()
        const fetchCategories = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/categories`,
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
                    setCategories(response.payload)
                }
                if (response.message && response.message == "Unauthenticated.") {
                    localStorage.removeItem("token");
                    localStorage.clear()
                    history.push("/");
                }
            } catch (err) { console.log(err); }
        }

        fetchCategories()
    }, [])

    const uploadConfig = {
        onRemove: file => {

            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            attachmentForm.resetFields();
            setFileList([])
            return false



        },
        beforeUpload: file => {
            setFileList([file])

            return false;
        },
        fileList,
    };
    const handleNext = () => { carousel.current.next(); setReseter(!reseter) };
    const handlePrev = () => { carousel.current.prev(); setReseter(!reseter) };
    const onFinish = (values) => {
        console.log('Success:', values);

        onSubmitAddAtachment(values)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [attachFile, setAttachFile] = useState({ arabic: 'ملف', english: "File" })
    const handleOpenAttachModal = (item) => {
        attachmentForm.resetFields();
        setAttachType('file')
        setAddAttachModal(true)
        setAttachFile({
            ...item,
            arabic: item.key === 'IDPhoto_face' ? `صورة الهوية (وجه امامي)`
                :
                item.key === 'IDPhoto_back' ? `صورة الهوية (وجه خلفي)` : item.key,
            english: item.key === 'IDPhoto_face' ? `ID Photo (Face)`
                :
                item.key === 'IDPhoto_back' ? `ID Photo (Back)` : item.key

        })
        setFileList([])
    }


    const onSubmitAddAtachment = async (values) => {
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var data = new FormData()
        data.append('customer_id', profile.customer.id)
        data.append('_method', "put")
        data.append('value', fileList[0])


        try {
            const responsee = await fetch(
                `${global.apiUrl}api/attachments/${attachFile.id}`,
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
                refreshProfile()
                // setProfile(response.payload)
                attachmentForm.resetFields();
                setFileList([])
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
        setAttachFile({ arabic: 'ملف', english: "File" })
        setAddAttachModal(false)
        setAttachType('file')
        setFileList([])
    }
    const handleOpenPassModal = () => {
        passForm.resetFields();
        setPasswordModal(true)
        setErrorMessage('')
        setSuccessAdd('')
    }
    const handleClosePassModal = () => {
        passForm.resetFields();
        setPasswordModal(false)
        setErrorMessage('')
        setSuccessAdd('')
    }
    const onFinishPass = (values) => {
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
            onSubmitPasswordChange(values)

        }

    };

    const onFinishFailedPass = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmitPasswordChange = async (data) => {

        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var regData = new FormData()

        regData.append('password', data.password)
        regData.append('password_confirmation', data.password_confirmation)
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
                setLoading(false)
                handleClosePassModal()
                localStorage.clear()
                clearProfile()

                history.push('/Login')
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
    const handleCloseCategoriesModal = () => {
        setSelectedtCategories('')
        categoriesForm.resetFields();
        setCategoriesModal(false)
        setErrorMessage('')
        setSuccessAdd('')
    }
    const onFinishFailedCategories = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinishCategories = (values) => {
        console.log('Success:', values);
        onSubmitSaveCategory(values)



    };
    const handleOpenCategoriesModal = () => {
        categoriesForm.resetFields();
        setSelectedtCategories('')
        setCategoriesModal(true)
        setErrorMessage('')
        setSuccessAdd('')
    }
    function handleCategoryChange(value) {
        console.log('handleCategoryChange:', value);
        setSelectedtCategories(value)
    }

    function preventDefault(e) {
        e.preventDefault();
        console.log('Clicked! But prevent default.');
    }
    const onSubmitSaveCategory = async (values) => {
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var data = new FormData()
        data.append('customer_id', profile.customer.id)
        data.append('category_id', selectedCategories)



        try {
            const responsee = await fetch(
                `${global.apiUrl}api/customers/attach/category`,
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
                setSuccessAdd(i18n.language == 'ar' ? `تم إضافة التصنيف بنجاح` : `Category has been added successfully`)
                setLoading(false)
                setSelectedtCategories('')

                refreshProfile()
                categoriesForm.resetFields();

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
    const onSubmitRemoveCategory = async (id) => {

        setLoadingId(id)
        var data = new FormData()
        data.append('customer_id', profile.customer.id)
        data.append('category_id', id)

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/customers/detach/category`,
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
                setLoadingId('')
                refreshProfile()
            }

        } catch (err) {
            console.log(err);
        }

        setLoadingId('')

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
                                                        <p className='comp'>  {profile.customer && profile.customer.company && profile.customer.company != 'undefined' ? profile.customer.company :
                                                            i18n.language == 'ar' ? 'الشركة غير معرفة' : 'No Company'}</p>
                                                        <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleNext() }} >
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تعديل` : `Update`}

                                                        </Button>
                                                        <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleOpenCategoriesModal() }} >
                                                            <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                                                            {i18n.language == 'ar' ? `إضافة تصنيفات` : `Add Categories`}

                                                        </Button>
                                                        <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleOpenPassModal() }} >
                                                            <i className="fa fa-lock" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تغيير كلمة المرور` : `Change Password`}

                                                        </Button>
                                                        {/* <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleOpenAttachModal() }} >
                                                            <i className="fa fa-paperclip" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `اضافة مرفق` : `Add Attachment`}

                                                        </Button> */}



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
                                                            {profile.customer && profile.customer.attachments.length > 0 && profile.customer.attachments.map((item) => {
                                                                return (
                                                                    <div key={item.id} className="col-sm-6 attachParet">
                                                                        <p className="m-b-10 f-w-600">
                                                                            {item.key === "IDPhoto_face" ?
                                                                                i18n.language == 'ar' ? `صورة الهوية (وجه أمامي)` : `ID Photo (Face)`
                                                                                : null
                                                                            }
                                                                            {item.key === "IDPhoto_back" ?
                                                                                i18n.language == 'ar' ? `صورة الهوية (وجه خلفي)` : `ID Photo (Back)`
                                                                                : null
                                                                            }
                                                                            {
                                                                                item.key !== "IDPhoto_back" && item.key !== "IDPhoto_face" ?
                                                                                    item.key : null
                                                                            }
                                                                            <span className='editSpan' onClick={() => { handleOpenAttachModal(item) }}>
                                                                                {i18n.language == 'ar' ? ` (تعديل) ` : ` (Update) `}
                                                                            </span>
                                                                        </p>
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
                                                        {/* {profile.customer && profile.customer.attachments.length > 0 ?
                                                            <>

                                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                                    {i18n.language == 'ar' ? `معلومات اضافية` : `Extra Information`}</h6>

                                                                <div className="row">

                                                                    {profile.customer.attachments.map((item) => {
                                                                        return (
                                                                            <div key={item.id} className="col-sm-4">
                                                                                <p className="m-b-10 f-w-600" onClick={() => { handleOpenAttachModal(item) }}>
                                                                                    {item.key === "IDPhoto_face" ?
                                                                                        i18n.language == 'ar' ? `صورة الهوية (وجه أمامي)` : `ID Photo (Face)`
                                                                                        : null
                                                                                    }
                                                                                    {item.key === "IDPhoto_back" ?
                                                                                        i18n.language == 'ar' ? `صورة الهوية (وجه خلفي)` : `ID Photo (Back)`
                                                                                        : null
                                                                                    }
                                                                                    {
                                                                                        item.key !== "IDPhoto_back" && item.key !== "IDPhoto_face" ?
                                                                                            item.key : null
                                                                                    }
                                                                                </p>
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
                                                            null} */}
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
                                                        {profile.customer && profile.customer.categories.length > 0 ?
                                                            <>

                                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                                    {i18n.language == 'ar' ? `التصنيفات` : `Categories`}</h6>

                                                                <div className="row">
                                                                    <div className="col-md-12  d-flex tagsCont ">
                                                                        {profile.customer.categories.map((item) => {
                                                                            return (

                                                                                <div key={item.id} className='tagParent'>
                                                                                    <Tag closable onClose={preventDefault}
                                                                                        closeIcon={
                                                                                            loadingId === item.id ? <i className="fa fa-spinner fa-spin" ></i>
                                                                                                : <i className="fa fa-trash" aria-hidden="true" onClick={() => { onSubmitRemoveCategory(item.id) }} ></i>

                                                                                        }
                                                                                    >
                                                                                        {i18n.language == 'ar' ? item.name_ar : item.name_en}
                                                                                    </Tag>
                                                                                </div>





                                                                            )
                                                                        })}
                                                                    </div>
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
                                            <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleOpenPassModal() }} >
                                                <i className="fa fa-lock" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تغيير كلمة المرور` : `Change Password`}

                                            </Button>
                                            <Button type="primary" className='col-md-8 profileButton' onClick={() => { handlePrev() }} >
                                                <i className="fa fa-undo" aria-hidden="true"  ></i>
                                                {i18n.language == 'ar' ? `رجوع` : `Back`}

                                            </Button>

                                        </div>
                                    </div>
                                    <div className=" col-md-12 col-lg-8 registerFormCol">
                                        <UpdateProfile reseter={reseter} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>




                    <Modal
                        wrapClassName='attachModal'
                        title={i18n.language == 'ar' ? `تعديل مرفق` : `Update Attachment`}
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

                                {/* <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `نوع المرفق` : `Attatchmentt Type`}
                                        name="TYPE" >
                                        <Radio.Group defaultValue={attachType} value={attachType}
                                            onChange={(e) => { attachmentForm.resetFields(); setAttachType(e.target.value) }}>
                                            <Radio.Button value="text">{i18n.language == 'ar' ? `نص` : `TEXT`}</Radio.Button>
                                            <Radio.Button value="file">{i18n.language == 'ar' ? `ملف` : `File`}</Radio.Button>

                                        </Radio.Group>
                                    </Form.Item>
                                </div> */}
                                {/* <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `اسم المرفق` : `Attatchment Name`}
                                        name="key"
                                      
                                        rules={[
                                            {
                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء ادخل اسم المرفق!` : 'Please input Attatchment Name!',
                                            },

                                        ]}
                                    >
                                     
                                        <Input placeholder={i18n.language == 'ar' ? `اسم المرفق` : `Attatchment Name`} />
                                    </Form.Item>
                                </div> */}
                                {/* {attachType === 'text' ?
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
                                            
                                            <TextArea autoSize={{ minRows: 1, maxRows: 3 }} placeholder={i18n.language == 'ar' ? `المعلومات` : `Information`} />
                                        </Form.Item>
                                    </div>
                                    : */}

                                <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ?
                                            attachFile.arabic

                                            : attachFile.english}
                                        required
                                        name="value"
                                        rules={[
                                            {

                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء رفع ملف!` : 'Please upload File!',
                                            },

                                        ]}
                                    >
                                        <Upload accept='image/*' className='col-md-6' {...uploadConfig} required multiple={false} fileList={fileList}>
                                            <Button className='col-md-12 uploadBTN'  ><i class="fa fa-upload" aria-hidden="true"></i>{"  "}{i18n.language == 'ar' ? `رفع ملف` : `Upload File`}</Button>
                                        </Upload>

                                    </Form.Item>
                                </div>
                                {/* } */}




                            </div>

                        </Form>
                    </Modal>



                    <Modal
                        wrapClassName='attachModal'
                        title={i18n.language == 'ar' ? `تغيير كلمة المرور` : `Change Password`}
                        centered
                        visible={passwordModal}
                        // onOk={() => handleSaveAttach()}
                        onCancel={() => handleClosePassModal()}
                        footer={[
                            <Button className='cancelBTN' key="back" onClick={() => handleClosePassModal()}>
                                {i18n.language == 'ar' ? `الغاء` : `Cancel`}
                            </Button>,
                            <Button key="bsack" type="primary" htmlType="submit" className='col-5 col-xs-5 col-sm-5 col-md-5 saveBtn'
                                onClick={() => passForm.submit()} disabled={loading}>
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
                            onFinish={onFinishPass}
                            onFinishFailed={onFinishFailedPass}
                            form={passForm}
                            autoComplete="off"
                            layout="vertical"
                            ref={passFormRef}
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
                                        label={i18n.language == 'ar' ? `كلمة المرور الجديدة` : `New Password`}
                                        name="password"
                                        // type='email'
                                        autoComplete='off'

                                        rules={[
                                            {
                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء ادخل كلمة المرور الجديدة!` : 'Please input New Password!',
                                            },

                                        ]}
                                    >


                                        <Input.Password placeholder='********' autoComplete='off' />
                                    </Form.Item>
                                </div>
                                <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `تأكيد كلمة المرور` : `New Password Confirmation`}
                                        name="password_confirmation"
                                        autoComplete='off'
                                        // type='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء ادخل تأكيد كلمة المرور` : 'Please input New Password Confirmation!',
                                            },

                                        ]}
                                    >

                                        <Input.Password placeholder='********' autoComplete='off' />
                                    </Form.Item>
                                </div>






                            </div>

                        </Form>
                    </Modal>
                    <Modal
                        wrapClassName='attachModal'
                        title={i18n.language == 'ar' ? `إضافة تصنيف` : `Add Category`}
                        centered
                        visible={categoriesModal}
                        // onOk={() => handleSaveAttach()}
                        onCancel={() => handleCloseCategoriesModal()}
                        footer={[
                            <Button className='cancelBTN' key="back" onClick={() => handleCloseCategoriesModal()}>
                                {i18n.language == 'ar' ? `الغاء` : `Cancel`}
                            </Button>,
                            <Button key="bsack" type="primary" htmlType="submit" className='col-5 col-xs-5 col-sm-5 col-md-5 saveBtn'
                                onClick={() => categoriesForm.submit()} disabled={loading}>
                                {i18n.language == 'ar' ? `حفظ` : `Save`}
                                {loading && <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></>}
                            </Button>
                        ]}
                    >
                        <Form
                            name="basicc"
                            labelCol={{
                                span: 30,
                            }}
                            wrapperCol={{
                                span: 32,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishCategories}
                            onFinishFailed={onFinishFailedCategories}
                            form={categoriesForm}
                            autoComplete="off"
                            layout="vertical"
                            ref={categoriesFormRef}
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
                                        label={i18n.language == 'ar' ? `التصنيفات` : `Categories`}
                                        name="password"
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
                                            name='category_id'
                                            value={selectedCategories}
                                            onChange={handleCategoryChange}
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







                            </div>

                        </Form>
                    </Modal>

                </>
            }
        </div>

    )

}

export default ProfileInfo;
