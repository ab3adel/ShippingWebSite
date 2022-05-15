import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom'
import { Modal, Carousel, Form, Input, Button, notification, Upload, Radio, message } from 'antd';
import { AddCharges } from '../addedCharges/addedCharge'
// import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { Base64File } from './base64File'

import '../../globalVar';
import { Field } from './field'
import './styleBills.scss'
import { details, columns } from "./data";
import { PaymentForm } from './paymentForm'
// import "./styles.css";




const BillInfo = ({ match }) => {

    const { id } = useParams();
    const { TextArea } = Input;
    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const profile = useSelector((state) => state.profile.profile)
    const [t, i18n] = useTranslation();
    let [data, setData] = useState([])
    let [visible, setVisible] = useState(false)
    let tableData = { data }

    const [open, setOpen] = useState(false)

    const [paymentUrl, setPaymentUrl] = useState()

    useEffect(() => { !userToken && history.push('/') })
    useEffect(() => {
        fetchOffers();

    }, [])
    useEffect(() => {
        if (data.length > 0) {
            tableData = { data }
            console.log(tableData)
        }
    }, [data])
    const fetchOffers = () => {
        fetch(`${global.apiUrl}api/offers`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + userToken,
                    Accept: "application/json",
                },
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setActiveBill(res.payload.filter(item => item.id == id)[0])
                    setData(res.payload)
                }
            })
            .catch(err => console.log(err))
    }


    const [activeBill, setActiveBill] = useState('')


    const handlePayment = (payer) => {

        let dataform = new FormData()
        dataform.append('offer_id', activeBill.id)
        dataform.append('payer', payer)
        dataform.append('lang_code', 'AR')

        fetch(`${global.apiUrl}api/payment`,
            {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + userToken,
                    Accept: "application/json",
                },
                body: dataform
            })
            .then(res => res.json())
            .then(res => {

                if (res.messages && res.messages.length > 0) {
                    setOpen(false)
                    res.messages.map((ele) => {

                        notification.error({
                            message: ' Failed',
                            description: ele,
                            placement: 'bottomRight',
                            duration: 4,

                        })
                    })
                }
                else {

                    if (payer === 'sender') {
                        window.open(res.transaction.url)
                    }
                    else {

                        setPaymentUrl(res.transaction.url)
                    }
                }
            })
            .catch(err => console.log(err))

    }
    const addCharges = (name, value) => {
        let dataform = new FormData()
        dataform.append('offer_id', activeBill.id)
        dataform.append('name', name)
        dataform.append('value', value)

        let response = fetch(`${global.apiUrl}api/addedCharge`,
            {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + userToken,
                    Accept: "application/json",
                },
                body: dataform
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.success) {
                    notification.success({
                        message: t('SuccessfullRequest'),
                        description: i18n.language === 'en' ?
                            "your request has been added successfully" :
                            "تمت الاضافة  بنجاح",
                        duration: 5,
                        rtl: i18n.language === 'ar',
                        placement: 'bottomRight'
                    })
                    return true

                }
                else {
                    notification.error({
                        message: ' Failed',
                        description: i18n.language === 'en' ?
                            "your request has been faild" :
                            "  فشلت اضافة الكلفة",
                        placement: 'bottomRight',
                        duration: 4,

                    })
                    return false
                }
            })
            .catch(err => console.log(err))
        return response
    }

    return (
        <div className="section bilsSection">
            {profile && activeBill &&
                <>

                    <div className=' d-flex '>
                        <div className='container'>
                            <div className="row  d-flex justify-content-center">
                                <div className='col-md-12'>
                                    <div className="col-md-12 col-lg-12 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white USerCont">

                                            <h6 className="f-w-600 nameProfile  col-md-4 col-lg-5 p-0 ">
                                                {i18n.language == 'ar' ? `تفاصيل فاتورة` : `Bill Details`}
                                            </h6>

                                            <Button type="primary"
                                                className='col-md-3 profileButton'
                                                onClick={() => { setVisible(true) }}
                                                disabled={activeBill && activeBill.paid}>
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                {t("ExtraCharges")}

                                            </Button>
                                            <Button

                                                type="primary"
                                                className='col-md-3 profileButton'
                                                onClick={() => setOpen(true)}
                                                disabled={activeBill && activeBill.paid}>
                                                <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
                                                {i18n.language == 'ar' ? `دفع` : `Pay`}

                                            </Button>



                                        </div>
                                    </div>


                                    {activeBill &&
                                        <div className=" col-md-12 col-lg-12  ">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600 text-center">

                                                    {i18n.language == 'ar' ? `رقم الشحنة` : `Shipment Number`} {' / '}{activeBill.shipment_id ? activeBill.shipment_id : "-"}
                                                </h6>
                                                <div className="row">
                                                    {details.offerInfo.map((ele, index) => {

                                                        if (ele.key === "accepted" && Number(activeBill.weight) <= 3) {

                                                            return (
                                                                <Field
                                                                    title={ele.name}
                                                                    content={1}
                                                                    key={index}
                                                                    unit={ele.unit}
                                                                    nestedKey={null}
                                                                />
                                                            )
                                                        }
                                                        return (
                                                            <Field
                                                                title={ele.name}
                                                                content={activeBill[ele.key]}
                                                                key={index}
                                                                unit={ele.unit}
                                                                nestedKey={ele.nestedKey}
                                                            />
                                                        )
                                                    })}


                                                    <h6 className="m-b-20 p-b-5 b-b-default col-md-12 f-w-600  ">

                                                        {i18n.language == 'ar' ? ` تفاصيل الشحنة` : `ٍShipment Details `}
                                                    </h6>
                                                    <div className='row col-sm-12'>
                                                        {

                                                            details.shipmentInfo.map((ele, index) => {

                                                                return (
                                                                    <Field title={ele.name}
                                                                        content={activeBill[ele.key]}
                                                                        nestedKey={ele.nestedKey}
                                                                        key={index}
                                                                        unit={ele.unit}
                                                                    />
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                    {
                                                        activeBill.added_charges && activeBill.added_charges.length > 0 ?
                                                            <>
                                                                <h6 className="m-b-20 p-b-5 b-b-default col-md-12 f-w-600  ">

                                                                    {t('ExtraCharges')}
                                                                </h6>
                                                                <div className='row col-sm-12'>
                                                                    {activeBill.added_charges.map((ele, index) => {
                                                                        return (

                                                                            <Field title={ele.name}
                                                                                content={ele.value}
                                                                                unit={i18n.language === 'ar' ? "د.ك" : "KWD"}
                                                                                nestedKey={null}
                                                                                key={index}
                                                                            />

                                                                        )
                                                                    })
                                                                    }
                                                                </div>
                                                            </>
                                                            :
                                                            ''
                                                    }
                                                    {/* <h6 className="m-b-20 p-b-5 b-b-default col-md-12 f-w-600  ">

                                                            {i18n.language == 'ar' ? `معلومات المرسل` : `Sender Data`}
                                                        </h6>
                                                        <div className='row'> 
                                                            <div className="col-sm-12 ">
                                                                <p className="m-b-10 f-w-600">
                                                                    {i18n.language == 'ar' ? `العنوان` : `Address`}

                                                                </p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {profile.customer && profile.customer.address ? profile.customer.address : '-'}
                                                                </h6>
                                                            </div>
                                                           {
                                                               details.senderInfo.map((ele,index)=>{
                                                                   return (
                                                                       <Field 
                                                                        title={ele.name}
                                                                        content={profile[ele.key]}
                                                                        nestedKey={ele.nestedKey}
                                                                        key={index}
                                                                        unit={ele.unit}
                                                                        />
                                                                   )
                                                               })
                                                               
                                                               
                                                           }
                                                        </div> */}

                                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600 col-md-12  ">

                                                        {i18n.language == 'ar' ? `معلومات المستلم` : `Recipient Data`}
                                                    </h6>
                                                    <div className="col-sm-12 row">

                                                        <div className="col-sm-12">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `العنوان` : `Address`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {activeBill.recipient.city.name_en || " " + "-" +
                                                                    activeBill.recipient.city.country.country_name_en || " " + "-" +
                                                                    activeBill.recipient.city.line_1 || " "}
                                                            </h6>
                                                        </div>
                                                        {
                                                            details.recipientInfo.map((ele, index) => {
                                                                return (
                                                                    <Field title={ele.name}
                                                                        content={activeBill[ele.key]}
                                                                        nestedKey={ele.nestedKey}
                                                                        key={index}
                                                                        unit={ele.unit}
                                                                    />
                                                                )
                                                            })

                                                        }
                                                    </div>
                                                    {activeBill.shipment_documents && <><h6 className="m-b-20 p-b-5 b-b-default f-w-600 col-md-12  ">

                                                        {i18n.language == 'ar' ? ` مستندات` : `Documents`}
                                                    </h6>
                                                        <div className="col-sm-12 row">
                                                            {
                                                                activeBill.shipment_documents && activeBill.shipment_documents.length > 0 ?
                                                                    activeBill.shipment_documents.map((ele, index) => {
                                                                        return <Base64File url={ele.url} />
                                                                    }) : ""
                                                            }
                                                        </div>
                                                    </>
                                                    }
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>






                </>
            }
            <PaymentForm
                open={open}
                setOpen={setOpen}
                handlePayment={handlePayment}
                paymentUrl={paymentUrl}


            />
            <AddCharges
                visible={visible}
                setVisible={setVisible}
                addCharges={addCharges}
            />
        </div>

    )

}

export default BillInfo;
