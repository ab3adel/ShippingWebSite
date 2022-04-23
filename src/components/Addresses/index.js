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

const MyAddress = () => {
    const { id } = useParams();

    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const profile = useSelector((state) => state.profile.profile)
    const [t, i18n] = useTranslation();

    const carousel = useRef();

    const startForm = useRef(null);
    const [sliderHeightTrigger, setSliderHeightTrigger] = useState(false)
    const [recipient, setRecipient] = useState('')
    const [countries, setCountries] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [reseter, setReseter] = useState(false)
    const [formStatus, setFormStatus] = useState('ADD_NEW_ADDRESS')
    const [activeAddress, setActiveAddress] = useState({})
    const refreshRecipint = () => { setRefresh(!refresh) }
    useEffect(() => { !userToken && history.push('/') })
    useEffect(async () => {


        const fetchRecipient = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/address/${profile.customer.id}?incoming=0`,
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
                    setRecipient({ addresses: response.payload })
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




    const { confirm } = Modal;


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
                                                        {recipient.addresses && recipient.addresses.length === 0 ?
                                                            <>
                                                                <h6 className="f-w-600 col-md-12 col-lg-5 nameProfile mb-0 ">
                                                                    {i18n.language == 'ar' ? 'يجب ان تدخل عنوانك' : 'You Must Enter Your Address'}
                                                                </h6>
                                                                <Button type="primary" className='col-md-12 col-lg-4   profileButton' onClick={() => { handleADDNEWNext() }} >
                                                                    <i className="fa fa-map-marker" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `إضافة عنوان` : `Add Address`}

                                                                </Button>
                                                            </>
                                                            : null}
                                                        {recipient.addresses && recipient.addresses.length > 0 ?
                                                            <h6 className="f-w-600 col-md-12 col-lg-5 nameProfile mb-0 ">
                                                                {i18n.language == 'ar' ? 'عنواني' : 'My Address'}
                                                            </h6> : null}











                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 addressPArent">
                                                    <div className="card-block">


                                                        {recipient.addresses && recipient.addresses.map((address, index) => {
                                                            return (

                                                                <div className='col-md-12 ' key={address.id}>
                                                                    <div className='row addressTitle_row'>
                                                                        <div className='col-md-4 p-0'>
                                                                            <h6 className="   f-w-600">
                                                                                {i18n.language == 'ar' ? `عنوان ارسال الشحنات` : `Shipments Send Address`}</h6>
                                                                        </div>
                                                                        <div className=' row col-md-8  p-0 butonsParent'>
                                                                            <div className=' col-md-4 col-lg-7'>   </div>
                                                                            <Button type="primary" className='col-md-5  col-lg-3   profileButton updateAdressBtn' onClick={() => { handleUpdateNext(address) }} >
                                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `تعديل` : `Update`}

                                                                            </Button>

                                                                            {recipient.addresses.length > 1 &&
                                                                                <Button type="primary" className='col-md-2 col-lg-1   profileButton deleteAdressBtn' onClick={() => { showDeleteAddressConfirm(address) }} >
                                                                                    <i className="fa fa-trash delI" aria-hidden="true"  ></i>

                                                                                </Button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `الدولة` : `Country`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.city.country.country_name_en}{' / '}{address.country_code}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-6 col-sm-6 col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `المدينة` : `City`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.city.name_en}
                                                                            </h6>
                                                                        </div>
                                                                        {/* <div className="col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `الرمز البريدي` : `Postal Code`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.post_code ? address.post_code : '-'}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `رمز الولاية` : `State Code`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.state_code ? address.state_code : '-'}
                                                                            </h6>
                                                                        </div> */}
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
                                                                                    <h6 className="text-muted f-w-400">{JSON.parse(address.line_1).Jaddah ? JSON.parse(address.line_1).Jaddah : '-'}
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
                                                                                <div className="col-md-6">
                                                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `السطر 2` : `Line 2`}</p>
                                                                                    <h6 className="text-muted f-w-400">{address.line_2 ? address.line_2 : '-'}
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `السطر 3` : `Line 3`}</p>
                                                                                    <h6 className="text-muted f-w-400">{address.line_3 ? address.line_3 : '-'}
                                                                                    </h6>
                                                                                </div>
                                                                            </>

                                                                        }
                                                                        {/* <div className="col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `النوع` : `Type`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.type ? address.type : '-'}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `الحالة` : `Status`}</p>
                                                                            <h6 className="text-muted f-w-400">{address.main == 0 ?
                                                                                i18n.language == 'ar' ? `إضافي` : `Extra`
                                                                                :
                                                                                i18n.language == 'ar' ? `رئيسي` : `Main`
                                                                            }
                                                                            </h6>
                                                                        </div> */}





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
                                    <div className='col-md-11'>
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
                                                    refreshRecipint={refreshRecipint}
                                                    reseter={reseter}
                                                    handlePrev={handlePrev}
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




                </>
            }
        </div>

    )

}

export default MyAddress;
