import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { ShippingRequestForm } from '../../components/shippingRequestForm'
import FooterSection from '../../components/Footer'
import './shippingrequestpage.scss'
import abimg2 from '../../images/about/222.png'
import NewAddress from '../../components/AddressForm'
import Offers from '../../components/offers'
import { Offer } from '../../components/offers/offer'
import { RequestButton } from './requestbutton'
import back from '../../images/shipping-request/back.jpg'
import pack from '../../images/shipping-request/packing.png'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'



const ShippingRequest = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const { profile, types } = useSelector((state) => state.profile)
    const { countries } = useSelector((state) => state.address)
    const { setTypes, setCountries } = bindActionCreators(actionCreators, dispatch)
    const [visible, setVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState()
    const [errorMessage, setErrorMessage] = useState();
    const [formFields, setFormFields] = useState({
        // SenderAddress: '',
        RecipientAddress: ''
        , Type: '', Date: '', Width: '', Length: '', Recipient: "",
        Category: "", NumberOfPieces: "",
        Height: '', Weight: '',  Hermonized: "",
        HermonizedError: "", Price: "", PriceError: "",
        DocumentShipment:"",ShipmentPurpose:"",
        //  SenderAddressError: false,
        DocumentShipmentError:false,ShipmentPurposeError:false,
        RecipientAddressError: false, TypeError: false,
        DateError: false, WidthError: false, LengthError: false,
        HeightError: false, WeightError: false, RecipientError: false, CategoryError: false
        , NumberOfPiecesError: ""

    })
    const [addressFormType, setAddressFormType] = useState({ type: "address", isSender: true })
    let [stage, setStage] = useState(1)
    let [rateStatus, setRateStatus] = useState(1)
    let [myAddress, setMyAddress] = useState()
    let [recipients, setRcipients] = useState()
    let [activeOffer, setActiveOffer] = useState({
        image: '',
        CompanyName: '',
        OfferPrice: '',
    })
    let [refreshMyAddress, setRefreshMyAddress] = useState(false)
    let [refreshRecipients, setRefreshRecipients] = useState(false)
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [t, i18n] = useTranslation();
    let backImages = [back, pack]
    useEffect(() => { !userToken && history.push('/Login') })
    useEffect(() => {

        countries.length === 0 && fetchCountries()
    }, [])
    useEffect(async () => {
        const fetchMyAddress = async (e) => {
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
                    response.payload.length > 0 ?
                        setMyAddress(response.payload[0])
                        :
                        setMyAddress("EMPTY")
                    // setMyAddress({ addresses: response.payload })
                }
                if (response.message && response.message == "Unauthenticated.") {
                    localStorage.removeItem("token");
                    localStorage.clear()
                    history.push("/");
                }
            } catch (err) { console.log(err); }
        }

        userToken && profile && fetchMyAddress()
    }, [profile, refreshMyAddress])
    useEffect(async () => {
        const fetchRecipients = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/address/${profile.customer.id}?incoming=1`,
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
                    response.payload.length > 0 ?
                        setRcipients(response.payload)
                        :
                        setRcipients("EMPTY")
                    setFormFields({ ...formFields, RecipientAddress: null, })
                }
                if (response.message && response.message == "Unauthenticated.") {
                    localStorage.removeItem("token");
                    localStorage.clear()
                    history.push("/");
                }
            } catch (err) { console.log(err); }
        }

        userToken && profile && fetchRecipients()
    }, [profile, refreshRecipients])
    useEffect(async () => {
        const fetchTypes = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/shipping/packageTypes`,
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
                    setTypes(response.payload)
                }

            } catch (err) { console.log(err); }
        }
        userToken && types.length === 0 && fetchTypes()
    }, [])
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
                dispatch({
                    type: 'SET_COUNTRIES',
                    payload: response.payload
                })
            }
        } catch (err) { console.log(err); }
    }
    const handleStage = async (type) => {
        if (checkError()) return
        let collection = document.querySelectorAll('.stage')
        if (type === "Next") {
            if (stage === 1) { rateRequest() }
            if (stage === 2) {

                setStage(++stage)
                collection[stage - 1].classList.add('currentStage')

            }
            if (stage === 3) return

        }
        if (type === "Previous") {
            if (stage === 1) return
            setStage(--stage)
            collection[stage].classList.remove('currentStage')
        }

    }
    const handleFields = (name, value) => {
        setErrorMessage('')
        if (name && name === "Recipient") {
            setFormFields({ ...formFields, [name]: value, RecipientAddress: null, [`${name}Error`]: value ? false : true })

        }
        //  if (name === "Weight") {
            
        //     let typeObj = types.filter(ele=>ele.name_en === formFields["Type"] || ele.name_ar === formFields["Type"])
           
        //     if (typeObj.length === 0) {
        //         setFormFields(pre=>({...pre,WeightError:true}))
        //         setErrorMessage(pre=>({...pre,prerequisite:t("TypeFirst")}))
        //     }
        //     else {
        //         if (formFields["Type"] !== "BOX" && value > typeObj[0]["allowed_weight"]) {
        //             setFormFields(pre=>({...pre,WeightError:true}))
        //             setErrorMessage (pre=>({WeightError:`${t("AllowedWeightError")} ${typeObj[0]["allowed_weight"]} KG`}))
        //         }
        //         if (formFields["Type"] === "BOX") {
                    
        //         }
        //         else {
        //             setFormFields(pre=>({...pre,WeightError:false,Weight:value}))
        //         }
        //     }
        // }
       
        else {
            setFormFields({ ...formFields, [name]: value, [`${name}Error`]: value || value ===false ? false : true })
        }
        // let newFormFields = { ...formFields }
        // newFormFields[name] = value
        // setFormFields(pre => ({ ...pre, ...newFormFields }))
    }
    const checkError = () => {

        let newFormFields = { ...formFields }
        let emptyVal = Object.keys(newFormFields)
            .filter(ele => !newFormFields[ele] && !ele.includes('Error'))

        if (emptyVal.length === 0) {
            
            let typeObj = types.filter(ele=>ele.name_en === formFields["Type"] || ele.name_ar === formFields["Type"])
            if (formFields["Type"] !== "CARTON" && formFields["Weight"] > typeObj[0]["allowed_weight"]) {
                            setFormFields(pre=>({...pre,WeightError:true}))
                            setErrorMessage (pre=>({WeightError:`${t("AllowedWeightError")} ${typeObj[0]["allowed_weight"]} KG`}))
                            
                            return true
                        }
            if  (formFields["Type"] === "CARTON")  {
                let volumeWeight = (formFields["Height"] * formFields["Width"] * formFields["Length"])/5000
                let maxWeight = volumeWeight > formFields["Weight"] ? volumeWeight:formFields["Weight"]
                if (maxWeight >typeObj[0]["allowed_weight"] ) {
                    setErrorMessage (pre=>({WeightError:`${t("AllowedWeightError")} ${typeObj[0]["allowed_weight"]} KG`}))
                    if (volumeWeight > formFields["Weight"]) {
                        newFormFields['HeightError']=true
                        newFormFields['LengthError']=true
                        newFormFields['WidthError']= true
                    }
                    else {
                        newFormFields['WeightError']=true
                    }
                    setFormFields(pre=>({...pre,...newFormFields}))
                    return true
                }
            }           
            return false
        }
        emptyVal.forEach(ele => {
            newFormFields[`${ele}Error`] = true

        })
        setFormFields(newFormFields)
        return true

    }
    const handleAddressForm = (type, isSender) => {
        setAddressFormType(pre => ({ ...pre, type, isSender }))
        setVisible(true)
    }
    const goTostart = (id) => {
        const violation = document.getElementById(id);
        violation && window.scrollTo({
            top: violation.offsetTop,
            behavior: "smooth"
        });
    };

    const rateRequest = async () => {
        setLoading(true)
        setSuccess(false)
        setErrorMessage('')
        let collection = document.querySelectorAll('.stage')

        // const data = {
        //     "category_id": "2",
        //     "xLocale": "ar_AE",
        //     "recipientAddressId": "15",
        //     "shipDateStamp": "2022-04-24",
        //     "NumberOfPieces": "4",
        //     "CustomsValueAmount": "4",
        //     "GoodsOriginCountryCode": "CN",
        //     "harmonizedCode": "080211",
        //     "unitPrice": "1",
        //     "requestedPackageLineItems": [
        //         {
        //             "subPackagingType": "BAG",
        //             "weight": {
        //                 "units": "KG",
        //                 "value": "18"
        //             },
        //             "dimensions": {
        //                 "length": "1",
        //                 "width": "1",
        //                 "height": "1",
        //                 "units": "CM"
        //             }
        //         }
        //     ]
        // }
        const data = {
            category_id: formFields.Category,
            xLocale: i18n.language === "ar" ? "ar_AE" : "en_US",
            recipientAddressId: formFields.RecipientAddress,
            shipDateStamp: formFields.Date,
            NumberOfPieces: formFields.NumberOfPieces,
            // CustomsValueAmount: formFields.CustomsAmount,
            // GoodsOriginCountryCode: formFields.Country,
            harmonizedCode: formFields.Hermonized,
            unitPrice: formFields.Price,
            documentShipment:formFields.DocumentShipment,
            shipmentPurpose:formFields.ShipmentPurpose,
            requestedPackageLineItems: [
                {
                    subPackagingType: formFields.Type,
                    weight: {
                        units: "KG",
                        value: formFields.Weight,
                    },
                    dimensions: {
                        length: formFields.Length,
                        width: formFields.Width,
                        height: formFields.Height,
                        units: "CM"
                    }
                }
            ]
        }

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/shipping/rateAndTransitTimes`,
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
             
            if (response instanceof Array) {
               
                setLoading(false)
                setSuccess(false)
                setErrorMessage({
                    Cat: i18n.language == 'ar' ?
                        `التصنيف غير مدعوم`
                        :
                        `Category Not Supported`
                })
                const timerr = setTimeout(() => { setErrorMessage('') }, 8000);
                return () => clearTimeout(timerr);
            }
            else if (!response.messages && !response.FedEx.errors) {
                setRateStatus(response)
                setSuccess(true)
                // console.log("resRate", response)
                setLoading(false)
                setStage(++stage)
                collection[stage - 1].classList.add('currentStage')
                goTostart("offersDIV")

            }
            else if (response && response.FedEx && response.FedEx.errors) {
                setLoading(false)
                setSuccess(false)
                setErrorMessage(response.FedEx.errors[0])
                const timerr2 = setTimeout(() => { setErrorMessage('') }, 10000);
                return () => clearTimeout(timerr2);
            }
            else if (response.messages) {
                setLoading(false)
                setSuccess(false)
                setErrorMessage(response.messages)
                const timerr3 = setTimeout(() => { setErrorMessage('') }, 10000);
                return () => clearTimeout(timerr3);
            }
            else {
                setLoading(false)
                setSuccess(false)

            }
        } catch (err) {
            console.log(err);
        }


    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className={'section shippingRequestSection '}
                style={{ backgroundImage: `url(${backImages[stage - 1]})` }}>
                <div className='container padding-top'>

                    <div className='row shippingRequestIntro'>
                        <div className="row">

                            <div className="col-md-12  ">
                                <h3>{t('Send Shipment')}</h3>
                            </div>
                        </div>
                        <div className=" col-md-12 row ">
                            <div className=" col-md-4 horizonal-align currentStage stage "
                            >
                                <div className="shipping-icon  d-flex align-times-center">

                                    <i class="fa fa-id-card-o" aria-hidden="true"></i>
                                </div>
                                <p className="d-flex justify-content-center ">
                                    {t('Fill Your Form')}
                                </p>
                            </div>
                            <div className=" col-md-4 horizonal-align stage">
                                <div className='shipping-icon'>
                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </div>
                                <p>

                                    {t('Choose Best Offer')}
                                </p>
                            </div>
                            <div className=" col-md-4 horizonal-align stage">
                                <div className='shipping-icon'>
                                    <i class="fa fa-bus" aria-hidden="true"></i>
                                </div>
                                <p>

                                    {t('Ready To Send')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='row shippingRequestRow '>

                        <div className='col-md-12 col-lg-9 shippingRequestCol '
                        >
                            {stage === 1 && (

                                <ShippingRequestForm
                                    myAddress={myAddress}
                                    typesArr={types}
                                    profile={profile}
                                    countries={countries}
                                    recipients={recipients}
                                    handleFields={handleFields}
                                    formFields={formFields}
                                    handleAddressForm={handleAddressForm}
                                    errorMessage={errorMessage}
                                />

                            )}
                            {
                                stage === 2 && (<Offers
                                    setActiveOffer={setActiveOffer} rateStatus={rateStatus} success={success}
                                    handleStage={handleStage} handleFields={handleFields} />)
                            }
                            {
                                stage === 3 && (<Offer activeOffer={activeOffer} formFields={formFields} />)
                            }
                            <img src={abimg2} className='loginImg'></img>
                        </div>

                    </div>

                    {myAddress && myAddress != 'EMPTY' && <div className="row nextStage col-md-12 m-0">
                        <RequestButton Type="Next" loading={loading} stage={stage} handleStage={handleStage} />
                        <RequestButton Type="Previous" stage={stage} handleStage={handleStage} />
                    </div>}

                </div>

            </div>

            <FooterSection />
            {visible && (
                <NewAddress
                    isSender={addressFormType.isSender}
                    type={addressFormType.type}
                    userToken={userToken}
                    visible={visible}
                    setVisible={setVisible}
                    refreshRecipients={refreshRecipients}
                    setRefreshRecipients={setRefreshRecipients}
                    refreshMyAddress={refreshMyAddress}
                    setRefreshMyAddress={setRefreshMyAddress}
                    recipientID={formFields.Recipient}
                />
            )}
        </div>
    )
}
export default ShippingRequest;