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
import { notification } from 'antd'


const ShippingRequest = () => {
    let history = useHistory();
    const dispatch = useDispatch()

    const { profile, types } = useSelector((state) => state.profile)
    const { countries } = useSelector((state) => state.address)
    const { setTypes, setCountries } = bindActionCreators(actionCreators, dispatch)
    const [checkList, setCheckListError] = useState([])
    const [visible, setVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disableButton, setDisableButton] = React.useState(false)
    const [success, setSuccess] = React.useState()
    const [errorMessage, setErrorMessage] = useState();
    const [expectedArrivalDate, setExpectedArrivalDate] = useState()
    const [formFields, setFormFields] = useState({
        // SenderAddress: '',
        RecipientAddress: ''
        , Type: '', Date: '', Width: '', Length: '', Recipient: "",
        Category: "", NumberOfPieces: 1, DocumentShipment: '',
        Height: '', Weight: '', Hermonized: '1',
        HermonizedError: false, Price: "", PriceError: "", ShipmentPurpose: "PERSONAL_USE",
        ShipmentPurposeError: false,
        RecipientAddressError: false, TypeError: false,
        DateError: false, WidthError: false, LengthError: false,
        HeightError: false, WeightError: false, RecipientError: false, CategoryError: false
        , GroupPackageCount: 1, GroupPackageCountError: false,

    })
    const [addressFormType, setAddressFormType] = useState({ type: "address", isSender: true })
    let [stage, setStage] = useState(1)
    let [dateString, setDateString] = useState("")
    let [rateStatus, setRateStatus] = useState(1)
    let [myAddress, setMyAddress] = useState()
    let [recipients, setRcipients] = useState()
    let [activeOffer, setActiveOffer] = useState({
        image: '',
        CompanyName: '',
        OfferPrice: '', id: ""
    })
    let [refreshMyAddress, setRefreshMyAddress] = useState(false)
    let [refreshRecipients, setRefreshRecipients] = useState(false)
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [t, i18n] = useTranslation();
    let backImages = [back, pack]
    let typeDimensions = {
        "BAG": { Width: 10, Height: 1, Length: 10 },
        "CARTON": { Width: 30, Height: 20, Length: 30 },
        "ENVELOPE": { Width: 1, Height: 1, Length: 1 }
    }
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

        if (type === "Next" && checkError()) return

        let collection = document.querySelectorAll('.stage')
        let inbetweenStages = document.querySelectorAll('.inbetweenStages')

        if (type === "Next") {
            if (stage === 1) {
                let done = await rateRequest()

                if (done) {

                    collection[1].classList.add('currentStage')
                    collection[0].classList.add('previousStage')
                    collection[0].classList.remove('currentStage')
                    inbetweenStages[0].classList.add('inprogress')
                    inbetweenStages[0].style.visibility = 'visible'
                    setStage(2)
                    goTostart("indeCator")
                }
            }
            if (stage === 2) {
                collection[1].classList.add('previousStage')
                collection[1].classList.remove('currentStage')
                collection[2].classList.add('currentStage')

                inbetweenStages[0].classList.remove('inprogress')
                inbetweenStages[1].classList.add('inprogress')

                setStage(3)
                goTostart("indeCator")
            }
            if (stage === 3) return

        }

        if (type === "Previous") {
            if (stage === 1) {
                collection[1].classList.remove('previousStage')
                collection[1].classList.remove('currentStage')

                inbetweenStages[0].classList.remove('inprogress')
                inbetweenStages[1].classList.remove('inprogress');
                goTostart("indeCator")
                return
            }
            if (stage === 2) {
                collection[1].classList.remove('previousStage')
                collection[1].classList.remove('currentStage')
                collection[0].classList.remove('previousStage')
                collection[0].classList.add('currentStage')
                inbetweenStages[0].classList.remove('inprogress')
                setStage(1)
                goTostart("indeCator")
            }
            if (stage === 3) {
                collection[2].classList.remove('previousStage')
                collection[2].classList.remove('currentStage')
                collection[1].classList.remove('previousStage')
                collection[1].classList.add('currentStage')
                inbetweenStages[1].classList.remove('inprogress')
                inbetweenStages[0].classList.add('inprogress')

                setStage(2)
                goTostart("indeCator")

            }




        }


    }
    const handleChangeDate = (date, stringDate) => {
        handleFields("Date", date)
        let newDate = new Date(Number(date._d))
        newDate = newDate.setDate(newDate.getDate() + 4)
        newDate = new Date(newDate).toISOString().slice(0, 10)

        setExpectedArrivalDate(newDate)

        setDateString(stringDate)
    }
    const handleFields = (name, value) => {

        setErrorMessage('')
        if (name && name === "Recipient") {
            setFormFields({ ...formFields, [name]: value, RecipientAddress: null, [`${name}Error`]: value ? false : true })

        }
        else if (name === "Category") {
            if (value === 2) {
                setFormFields(pre => ({ ...pre, [name]: value, DocumentShipment: true, [`${name}Error`]: value || value === false ? false : true }))
            }
            else {
                setFormFields(pre => ({ ...pre, [name]: value, DocumentShipment: false, [`${name}Error`]: value || value === false ? false : true }))
            }
        }
        else if (name === "Type") {
            setFormFields({
                ...formFields
                , [name]: value
                , [`${name}Error`]: value || value === false ? false : true
                , Width: typeDimensions[value].Width
                , Height: typeDimensions[value].Height
                , Length: typeDimensions[value].Length
            })
        }
        else {
            setFormFields({ ...formFields, [name]: value, [`${name}Error`]: value || value === false ? false : true })
        }

    }
    const checkError = () => {

        let newFormFields = { ...formFields }
        if (checkList.length === 0) {

            let checkListError = Object.keys(newFormFields).filter(ele => !ele.includes('Error'))
            setCheckListError(pre => checkListError)
        }
        let checker = checkList.length > 0 ? checkList : Object.keys(newFormFields)
        let emptyVal = checker.filter(ele => !newFormFields[ele] && !ele.includes('Error') && newFormFields[ele] !== false)

        if (emptyVal.length === 0) {

            let typeObj = types.filter(ele => ele.name_en === formFields["Type"] || ele.name_ar === formFields["Type"])
            let allowed_weight = typeObj[0]["allowed_weight"] * formFields.GroupPackageCount
            if (formFields["Type"] !== "CARTON" && formFields["Weight"] > allowed_weight) {
                setFormFields(pre => ({ ...pre, WeightError: true }))
                setErrorMessage(pre => ({ WeightError: `${t("AllowedWeightError")} ${allowed_weight} KG` }))

                return true
            }
            if (formFields["Type"] === "CARTON") {
                let volumeWeight = ((formFields["Height"] * formFields["Width"] * formFields["Length"]) / 5000) * formFields.GroupPackageCount
                let maxWeight = volumeWeight > formFields["Weight"] ? volumeWeight : formFields["Weight"]
                if (maxWeight > allowed_weight) {
                    setErrorMessage(pre => ({ WeightError: `${t("AllowedWeightError")} ${allowed_weight} KG` }))
                    if (volumeWeight > formFields["Weight"]) {
                        newFormFields['HeightError'] = true
                        newFormFields['LengthError'] = true
                        newFormFields['WidthError'] = true
                    }
                    else {
                        newFormFields['WeightError'] = true
                    }
                    setFormFields(pre => ({ ...pre, ...newFormFields }))
                    return true
                }
                else {
                    handleFields('Weight', maxWeight)
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
        const data = {
            category_id: formFields.Category,
            xLocale: i18n.language === "ar" ? "ar_AE" : "en_US",
            recipientAddressId: formFields.RecipientAddress,
            shipDateStamp: dateString,
            NumberOfPieces: formFields.NumberOfPieces,
            CustomsValueAmount: formFields.Price,
            // GoodsOriginCountryCode: formFields.Country,
            harmonizedCode: formFields.Hermonized,
            unitPrice: formFields.Price,
            documentShipment: formFields.Category === 2 ? true : false,
            shipmentPurpose: formFields.ShipmentPurpose,
            requestedPackageLineItems: [
                {
                    subPackagingType: formFields.Type,
                    weight: {
                        units: "KG",
                        value: formFields.Weight,
                    },
                    dimensions: {
                        length: Number(formFields.Length),
                        width: Number(formFields.Width),
                        height: Number(formFields.Height),
                        units: "CM"
                    },
                    groupPackageCount: formFields.GroupPackageCount
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
                setErrorMessage({ error: i18n.language === 'ar' ? "التصنيف غير مدعوم" : "Category Not Supported" })
                return false
            }
            if (!response.messages) {
                setRateStatus(response)
                setSuccess(true)
                setLoading(false)
                goTostart("indeCator")
                return true

            }
            // else if (response && response.FedEx && response.FedEx.errors) {
            //     setLoading(false)
            //     setSuccess(false)
            //     setErrorMessage(response.FedEx.errors[0])
            //     const timerr2 = setTimeout(() => { setErrorMessage('') }, 10000);
            //     return () => clearTimeout(timerr2);
            // }
            // else if (response.messages) {
            //     setLoading(false)
            //     setSuccess(false)
            //     setErrorMessage(response.messages)
            //     const timerr3 = setTimeout(() => { setErrorMessage('') }, 10000);
            //     return () => clearTimeout(timerr3);
            // }
            else {
                setLoading(false)
                setErrorMessage(response.messages)
                setSuccess(false)
                return false
            }
        } catch (err) {
            console.log(err);
        }


    };
    // console.log("formFields",formFields)
    const saveOffer = () => {

        let collection = document.querySelectorAll('.stage')
        let inbetweenStages = document.querySelectorAll('.inbetweenStages')
        setLoading(true)
        let formData = {
            company_id: formFields.company_id, serviceType: formFields.serviceType,
            serviceName: formFields.serviceName, serviceCode: formFields.serviceCode,
            serviceId: formFields.serviceId, ship_date: dateString,
            width: formFields.Width, height: formFields.Height, length: formFields.Length,
            subPackagingType: formFields.Type, documentShipment: formFields.DocumentShipment,
            shipmentPurpose: formFields.ShipmentPurpose, harmonizedCode: formFields.Hermonized,
            unitPrice: formFields.Price, totalNetCharge: formFields.totalNetCharge,
            required_documents: formFields.required_documents, delivery_date_time: formFields.delivery_date_time,
            NumberOfPieces: formFields.NumberOfPieces, groupPackageCount: formFields.GroupPackageCount,
            weight: formFields.Weight, signatureOptionType: formFields.signatureOptionType,
            recipient_address_id: formFields.RecipientAddress, category_id: formFields.Category,
            customer_id: profile.customer.id, commodityName: formFields.commodityName,
            addedCharges: formFields.addedCharges ? formFields.addedCharges : [],
            payment_method: 'online', CustomsValueAmount: formFields.Price,
        }

        fetch(global.apiUrl + 'api/offers', {
            method: "POST",
            headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(res => {
                setLoading(false)

                return res.json()
            })
            .then(res => {

                if (res.success && res.payload.accepted) {
                    notification.success({
                        message: t('SuccessfullRequest'),
                        description: i18n.language === 'en' ?
                            "your request has been added successfully" :
                            "تمت اضافة العرض بنجاح",
                        duration: 5,
                        rtl: i18n.language === 'ar',
                        placement: 'bottomRight'
                    })
                    setDisableButton(true)
                    setActiveOffer({
                        ...activeOffer, id: res.payload.id, accepted: res.payload.accepted,
                        recipient: recipients.find(item => item.id == formFields.Recipient)


                    }
                    )
                    inbetweenStages[1].classList.remove('inprogress')
                    collection[2].classList.add('previousStage')
                    collection[2].classList.remove('currentStage')

                }
                else if (res.success && !res.payload.accepted) {


                    notification.info({
                        message: t('InProgress'),
                        description: i18n.language === "en" ?
                            "we are proccessing your request ,will let you know when succeed" :
                            "نحن نعالج الطلب , سنعلمك عند نجاح الطلب",
                        duration: 5,
                        rtl: i18n.language === 'ar',
                        placement: 'bottomRight'
                    })
                    setDisableButton(true)
                    inbetweenStages[1].classList.remove('inprogress')
                    collection[2].classList.add('previousStage')
                    collection[2].classList.remove('currentStage')

                }
                else {
                    notification.error({
                        message: "we are soory",
                        description: "something wrong went ",
                        rtl: i18n.language === 'ar',
                        duration: 5,
                        placement: 'bottomRight'
                    })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {/* <Navbar /> */}
            <div className={'section shippingRequestSection '}
                style={{ backgroundImage: `url(${backImages[stage - 1]})` }}>
                <div className='container padding-top'>

                    <div className='row shippingRequestIntro'>
                        <div className="row" id="indeCator" >

                            <div className="col-md-12  ">
                                <h3>{t('Send Shipment')}</h3>
                            </div>
                        </div>
                        {/* <div className=" col-md-12 row ">
                        <div  className=" col-1"  ></div>
                            <div
                                className=" col-2 col-md-2 col-sm-2 horizonal-align 
                                        currentStage stage circleShape "
                            >
                                <div className="shipping-icon  d-flex align-times-center">

                                    <i class="fa fa-id-card-o" aria-hidden="true"></i>
                                </div>


                            </div>
                            <div className="col-2 col-md-2  inbetweenStages">

                            </div>
                            <div className=" col-2 col-md-2 col-sm-2
                                        horizonal-align stage circleShape">
                                <div className='shipping-icon'>
                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </div>

                            </div>
                            <div className="col-2 col-md-2  inbetweenStages">

                            </div>
                            <div className="  col-2 col-md-2 col-sm-2
                                             horizonal-align stage circleShape">
                                <div className='shipping-icon'>
                                    <i class="fa fa-bus" aria-hidden="true"></i>
                                </div>

                            </div>
                            <div  className=" col-1"  ></div>
                        </div> */}
                        <div className=" col-md-9 row " style={{ direction: "rtl" }}>

                            <div
                                className="   horizonal-align 
                                        currentStage stage circleShape "
                            >
                                <div className="shipping-icon  d-flex align-times-center">

                                    <i class="fa fa-id-card-o" aria-hidden="true"></i>
                                </div>


                            </div>
                            <div className="  inbetweenStages">

                            </div>
                            <div className="  
                                        horizonal-align stage circleShape">
                                <div className='shipping-icon'>
                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </div>

                            </div>
                            <div className="  inbetweenStages">

                            </div>
                            <div className="  
                                             horizonal-align stage circleShape">
                                <div className='shipping-icon'>
                                    <i class="fa fa-bus" aria-hidden="true"></i>
                                </div>

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
                                    handleChangeDate={handleChangeDate}
                                />

                            )}
                            {
                                stage === 2 && (<Offers
                                    setActiveOffer={setActiveOffer}
                                    rateStatus={rateStatus}
                                    success={success}
                                    handleStage={handleStage} handleFields={setFormFields}
                                    expectedArrivalDate={expectedArrivalDate}
                                    formFields={formFields}

                                />)
                            }
                            {
                                stage === 3 && (<Offer
                                    activeOffer={activeOffer}
                                    handleFields={setFormFields}
                                    dateString={dateString}
                                    formFields={formFields}
                                    disableButton={disableButton}
                                    expectedArrivalDate={expectedArrivalDate}
                                />)
                            }
                            <img src={abimg2} className='loginImg'></img>
                        </div>

                    </div>

                    {myAddress && myAddress != 'EMPTY' &&
                        <div className="row nextStage col-md-12 m-0">
                            <RequestButton
                                saveOffer={saveOffer}
                                Type="Next"
                                loading={loading}
                                stage={stage}
                                disableButton={disableButton}
                                handleStage={handleStage} />
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