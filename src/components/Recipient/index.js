import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom'
import { Modal, Carousel, Form, Input, Button, Alert, Upload, Radio, Popconfirm, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

import Fade from 'react-reveal/Fade';
import '../../globalVar';
import AddNewAddressForm from './AddNewAddressForm'
import UpdateAddressForm from './UpdateAddressForm'

import './style.scss'

const RecipientInfo = () => {
    const { id } = useParams();

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
    const updateFormRef = useRef(null);
    const startForm = useRef(null);
    const [attachmentForm] = Form.useForm();
    const [recipient, setRecipient] = useState('')
    const [countries, setCountries] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [reseter, setReseter] = useState(false)
    const [sliderHeightTrigger, setSliderHeightTrigger] = useState(false)
    const [formStatus, setFormStatus] = useState('ADD_NEW_ADDRESS')
    const [activeAddress, setActiveAddress] = useState({})
    const refreshRecipint = () => { setRefresh(!refresh) }
    useEffect(() => { !userToken && history.push('/') })
    useEffect(async () => {


        const fetchRecipient = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/address/${profile.customer.id}?incoming=1&recipient_id=${id}`,
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
                    setRecipient(response.payload[0])
                }
                if (response.message && response.message == "Unauthenticated.") {
                    localStorage.removeItem("token");
                    localStorage.clear()
                    history.push("/");
                }
            } catch (err) { console.log(err); }
        }

        userToken && profile && fetchRecipient()
    }, [refresh, profile])
    useEffect(() => {

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

        countries.length === 0 && fetchCountries()
    }, [userToken])
    const goTostart = (id) => {
        const violation = document.getElementById(id);
        window.scrollTo({
            top: violation.offsetTop,
            behavior: "smooth"
        });
    };
    const handleNext = () => { carousel.current.next(); setReseter(!reseter) };
    const handlePrev = () => { carousel.current.prev(); setReseter(!reseter); };
    const handleADDNEWNext = () => { setFormStatus('ADD_NEW_ADDRESS'); handleNext() }
    const handleUpdateNext = (address) => {
        handleNext();
        // { behavior: 'smooth', block: 'start' }
        // window.scrollTo(0, this.startForm.current.offsetTop)
        goTostart('startForm')
        // startForm.current.scrollIntoView()
        setActiveAddress(address); setFormStatus('UPDATE_ADDRESS');
    }
    const onFinish = (values) => {
        console.log('Success:', values);

        onSubmitAddAtachment(values)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOpenAttachModal = async () => {
        await setAddAttachModal(true)
        // attachmentForm.resetFields();
        updateFormRef.current && updateFormRef.current.setFieldsValue({
            name_en: recipient.name_en,
            phone: recipient.phone,
            name_ar: recipient.name_ar,
            email: recipient.email,
        });



    }
    const onSubmitAddAtachment = async (values) => {
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)
        var data = new FormData()
        data.append('name_en', values.name_en)
        data.append('phone', values.phone)
        data.append('name_ar', values.name_ar)
        data.append('email', values.email)


        try {
            const responsee = await fetch(
                `${global.apiUrl}api/recipients/${recipient.id}?_method=put`,
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
                refreshRecipint()
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

    }



    const { confirm } = Modal;
    function showDeleteConfirm() {
        confirm({
            wrapClassName: 'deletemodal',
            title: i18n.language == 'ar' ? `هل انت متأكد من حذف المستلم ${recipient.name_ar}`
                :
                `Are you sure you want to delete  recipient ${recipient.name_en}`,
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: i18n.language == 'ar' ? "حذف" : "Delete",
            okType: 'danger',
            cancelText: i18n.language == 'ar' ? "الغاء" : "Cancel",
            onOk() {
                return new Promise(async (resolve, reject) => {
                    const responsee = await fetch(
                        `${global.apiUrl}api/recipients/${recipient.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + userToken,
                                Accept: "application/json",
                            },
                        }
                    );
                    const response = await responsee.json();
                    if (response.success) {
                        resolve()
                        history.push("/Recipients")

                    }
                    if (response.message && response.message == "Unauthenticated.") {
                        localStorage.removeItem("token");
                        localStorage.clear()
                        history.push("/");
                        resolve()
                    }

                }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    function showDeleteAddressConfirm(address) {
        confirm({
            wrapClassName: 'deletemodal',
            title: i18n.language == 'ar' ? `هل انت متأكد من حذف عنوان`
                :
                `Are you sure you want to delete  address`,
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: i18n.language == 'ar' ? "حذف" : "Delete",
            okType: 'danger',
            cancelText: i18n.language == 'ar' ? "الغاء" : "Cancel",
            onOk() {
                return new Promise(async (resolve, reject) => {
                    const responsee = await fetch(
                        `${global.apiUrl}api/address/${address.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + userToken,
                                Accept: "application/json",
                            },
                        }
                    );
                    const response = await responsee.json();
                    if (response.success) {
                        refreshRecipint()
                        resolve()


                    }
                    if (response.message && response.message == "Unauthenticated.") {
                        localStorage.removeItem("token");
                        localStorage.clear()
                        history.push("/");
                        resolve()
                    }

                }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    console.log('updateFormRef', startForm.current);
    return (
        <div className="section recipientSection" ref={startForm} id='startForm'>
            {profile && recipient &&
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
                                                <div className="col-md-12 col-lg-12 bg-c-lite-green user-profile">
                                                    <div className="card-block   text-white USerCont">

                                                        <h6 className="f-w-600 col-md-12 col-lg-5 nameProfile mb-0 ">
                                                            {i18n.language == 'ar' ? recipient.name_ar : recipient.name_en}
                                                        </h6>

                                                        <Button type="primary" className='col-md-12 col-lg-2  profileButton' onClick={() => { handleOpenAttachModal() }} >
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تعديل` : `Update`}

                                                        </Button>
                                                        <Button type="primary" className='col-md-12 col-lg-2   profileButton' onClick={() => { handleADDNEWNext() }} >
                                                            <i className="fa fa-map-marker" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `إضافة عنوان` : `Add Address`}

                                                        </Button>



                                                        <Button type="primary" className='col-md-12 col-lg-2  profileButton' onClick={() => { showDeleteConfirm() }} >
                                                            <i className="fa fa-trash" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `حذف` : `Remove`}

                                                        </Button>





                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 addressPArent">
                                                    <div className="card-block">
                                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">

                                                            {i18n.language == 'ar' ? `معلومات المستلم` : `Recipient Information`}
                                                        </h6>
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-4">
                                                                <p className="m-b-10 f-w-600">

                                                                    {i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}
                                                                </p>
                                                                <h6 className="text-muted f-w-400">{recipient.name_en ? recipient.name_en : '-'}</h6>
                                                            </div>
                                                            <div className="col-sm-12 col-md-4">
                                                                <p className="m-b-10 f-w-600"> {i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}   </p>
                                                                <h6 className="text-muted f-w-400">  {recipient.name_ar ? recipient.name_ar : '-'}   </h6>
                                                            </div>
                                                            <div className="col-sm-12 col-md-4">
                                                                <p className="m-b-10 f-w-600"> {i18n.language == 'ar' ? `هاتف` : `Phone`}   </p>
                                                                <h6 className="text-muted f-w-400 phone" style={{ direction: 'ltr' }}>  {recipient.phone}   </h6>
                                                            </div>
                                                            <div className="col-sm-12 col-md-4">
                                                                <p className="m-b-10 f-w-600"> {i18n.language == 'ar' ? `البريد الالكترني` : `Email`}   </p>
                                                                <h6 className="text-muted f-w-400 phone" style={{ direction: 'ltr' }}>  {recipient.email ? recipient.email : "-"}   </h6>
                                                            </div>

                                                        </div>
                                                        {recipient.addresses && recipient.addresses.map((address, index) => {
                                                            return (

                                                                <div className='col-md-12 ' key={address.id}>
                                                                    <div className='row addressTitle_row'>
                                                                        <div className='col-md-4 p-0'>
                                                                            <h6 className="   f-w-600">
                                                                                {i18n.language == 'ar' ? `العنوان ${(index + 1)}` : `Address ${(index + 1)}`}</h6>
                                                                        </div>
                                                                        <div className=' row col-md-8  p-0 butonsParent'>
                                                                            <div className=' col-md-4 col-lg-7'>   </div>
                                                                            <Button type="primary" className='col-md-5  col-lg-3   profileButton updateAdressBtn' onClick={() => { handleUpdateNext(address) }} >
                                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تعديل` : `Update`}

                                                                            </Button>

                                                                            {recipient.addresses.length > 1 &&
                                                                                <Button type="primary" className='col-md-2 col-lg-1   profileButton deleteAdressBtn' onClick={() => { showDeleteAddressConfirm(address) }} >
                                                                                    <i className="fa fa-trash delI" aria-hidden="true"  ></i>

                                                                                </Button>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `الدولة` : `Country`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.city.country.country_name_en}{' / '}{address.country_code}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-6  col-sm-6 col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `المدينة` : `City`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.city.name_en}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-6  col-sm-6 col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `الرمز البريدي` : `Postal Code`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.post_code ? address.post_code : '-'}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-6 col-sm-6 col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `رمز الولاية` : `State Code`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.state_code ? address.state_code : '-'}
                                                                            </h6>
                                                                        </div>
                                                                        {address.city.country_id === 117 ?
                                                                            <>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Area')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_1).Area}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Block')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_1).Block}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Jaddah')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_1).Jaddah ? JSON.parse(address.line_1).Jaddah : "-"}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Street')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_2).Street}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Building')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_2).Building}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Floor')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_3).Floor ? JSON.parse(address.line_3).Floor : "-"}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('Flat')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_3).Flat ? JSON.parse(address.line_3).Flat : "-"}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-3">
                                                                                    <p className="m-b-10 f-w-600">{t('PCAIID')}</p>
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_3).PCAIID ? JSON.parse(address.line_3).PCAIID : "-"}
                                                                                    </h6>
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div className="col-md-6">
                                                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `السطر 1` : `Line 1`}</p>
                                                                                    <h6 className="text-muted f-w-400">{address.line_1}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-6">
                                                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `السطر 2` : `Line 2`}</p>
                                                                                    <h6 className="text-muted f-w-400">{address.line_2 ? address.line_2 : '-'}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-6 col-sm-6 col-md-6">
                                                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `السطر 3` : `Line 3`}</p>
                                                                                    <h6 className="text-muted f-w-400">{address.line_3 ? address.line_3 : '-'}
                                                                                    </h6>
                                                                                </div>
                                                                            </>

                                                                        }


                                                                        <div className="col-6 col-sm-6 col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `النوع` : `Type`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.type ? address.type : '-'}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-6 col-sm-6 col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `الحالة` : `Status`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.main == 0 ?
                                                                                i18n.language == 'ar' ? `إضافي` : `Extra`
                                                                                :
                                                                                i18n.language == 'ar' ? `رئيسي` : `Main`
                                                                            }
                                                                            </h6>
                                                                        </div>




                                                                    </div>
                                                                </div>
                                                            )
                                                        })


                                                        }


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
                                    <div className='col-md-12'>
                                        <div className="col-md-12 col-lg-12 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white USerCont updateForm">

                                                <h6 className="f-w-600 nameProfile ">
                                                    {formStatus === 'ADD_NEW_ADDRESS' ?
                                                        <> {i18n.language == 'ar' ? `إضافة عنوان جديد` : `Add New Address`}</>
                                                        :
                                                        <> {i18n.language == 'ar' ? `تعديل عنوان` : `Update Address`}</>
                                                    }

                                                </h6>

                                                <Button type="primary" className='col-md-3 profileButton' onClick={() => { handlePrev() }} >
                                                    <i className="fa fa-undo" aria-hidden="true"  ></i>
                                                    {i18n.language == 'ar' ? `رجوع` : `Back`}

                                                </Button>



                                            </div>
                                        </div>


                                        <div className=" col-md-12 col-lg-12 registerFormCol">
                                            {formStatus === 'ADD_NEW_ADDRESS' ?
                                                <AddNewAddressForm
                                                    countries={countries}
                                                    recipientID={recipient.id}
                                                    refreshRecipint={refreshRecipint}
                                                    reseter={reseter}
                                                    sliderHeightTrigger={sliderHeightTrigger}
                                                    setSliderHeightTrigger={setSliderHeightTrigger}
                                                />
                                                :
                                                < UpdateAddressForm
                                                    countries={countries}
                                                    recipientID={recipient.id}
                                                    refreshRecipint={refreshRecipint}
                                                    reseter={reseter}
                                                    activeAddress={activeAddress}
                                                    sliderHeightTrigger={sliderHeightTrigger}
                                                    setSliderHeightTrigger={setSliderHeightTrigger}
                                                />

                                            }



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>




                    <Modal
                        wrapClassName='attachModal'
                        title={i18n.language == 'ar' ? `تعديل معلومات المرسل إليه` : `Update Recipient Information`}
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
                            // initialValues={{
                            //     remember: true,
                            // }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            form={attachmentForm}
                            autoComplete="off"
                            layout="vertical"
                            ref={updateFormRef}
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


                                <div className='col-md-12'>   <Form.Item
                                    label={i18n.language == 'ar' ? `الاسم الانكليزي` : `English Name`}
                                    name="name_en"
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
                                <div className='col-md-12'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `الاسم العربي` : `Arabic Name`}
                                        name="name_ar"
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
                                <div className='col-md-12 col-lg-5'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `الهاتف` : `Phone`}
                                        name="phone"
                                        // type='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء ادخل رقم هاتف المستلم!` : 'Please Input Recipient Phone Number!',
                                            },

                                        ]}
                                    >
                                        {/* type='email' */}
                                        <Input placeholder={i18n.language == 'ar' ? `الهاتف` : `Phone`} />
                                    </Form.Item>
                                </div>
                                <div className='col-md-12 col-lg-7'>
                                    <Form.Item
                                        label={i18n.language == 'ar' ? `البريد الالكتروني` : `Email`}
                                        name="email"
                                        type='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: i18n.language == 'ar' ? `الرجاء ادخل البريد الالكتروني للمستلم!` : 'Please Input Recipient Email!',
                                            },

                                        ]}
                                    >
                                        {/* type='email' */}
                                        <Input type='email' placeholder={`email@example.com`} />
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

export default RecipientInfo;
