import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { Modal, Carousel, Form, Input, Button, Alert, Upload, Radio, message } from 'antd';
import DataTable from "react-data-table-component";
// import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";



import Fade from 'react-reveal/Fade';
import '../../globalVar';

import './styleBills.scss'
import { data } from "./data";

// import "./styles.css";



const ProfileInfo = () => {

    const tableData = { data };
    const { TextArea } = Input;
    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const profile = useSelector((state) => state.profile.profile)
    const [t, i18n] = useTranslation();

    const carousel = useRef();

    const [reciepients, setRecipients] = useState([])
    useEffect(() => { !userToken && history.push('/') })
    useEffect(async () => {


    }, [])
    const handleNext = () => carousel.current.next();
    const handlePrev = () => carousel.current.prev();
    const columns = [
        {
            name: i18n.language == 'ar' ? `رقم الشحنة` : `Shipment Number`,

            selector: (row) => row.shipment_number,
            sortable: true
        },
        {
            name: i18n.language == 'ar' ? `نوع الشحنة` : `Shipment Type`,
            selector: (row) => row.shipment_type,
            sortable: true,

        },
        {
            name: i18n.language == 'ar' ? `تاريخ الارسال` : `Sending Date`,
            selector: (row) => row.sending_date,
            sortable: true,

        },
        {
            name: i18n.language == 'ar' ? `تاريخ الاستلام` : `Reception Date`,
            selector: (row) => row.reception_date,

            sortable: true
        },
        {
            name: i18n.language == 'ar' ? `طريقة الدفع` : `Payment Method`,
            selector: (row) => row.payment_method,

            sortable: true
        },
        {
            name: i18n.language == 'ar' ? `المبلغ الاجمالي` : `Total Amount`,

            selector: (row) => row.total_amount,
            sortable: true
        },
        {
            name: "Action",
            sortable: false,
            selector: (row) => row.id,
            cell: (d) => [<i
                // onClick={handleClick.bind(this, d.title)}
                className="tableIcon fa fa-trash "
            ></i>
            ]
        }
    ];
    const [activeBill, setActiveBill] = useState('')
    const onRowClicked = async (row, event) => {
        console.log(row);

        setActiveBill(row)
        handleNext()
    }
    const paginationComponentOptions = {
        rowsPerPageText: i18n.language == 'ar' ? `عدد الاسطر في الصفحة` : `Rows Per Page`,

    };

    return (
        <div className="section bilsSection">
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
                                                <div className="col-md-12 col-lg-12 bg-c-lite-green user-profile">
                                                    <div className="card-block text-center text-white USerCont">

                                                        <h6 className="f-w-600 nameProfile ">
                                                            {i18n.language == 'ar' ? `كل  الفواتير` : `All Bills`}
                                                        </h6>

                                                        {/* <Button type="primary" className='col-md-4 profileButton' onClick={() => { handleNext() }} >
                                                            <i className="fa fa-plus" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `إضافة مستلم جديد` : `Add New Recipient`}

                                                        </Button> */}
                                                        {/* <Button type="primary" className='col-md-8 profileButton' onClick={() => { handleOpenAttachModal() }} >
                                                            <i className="fa fa-paperclip" aria-hidden="true"  ></i> {i18n.language == 'ar' ? `اضافة مرفق` : `Add Attachment`}

                                                        </Button> */}


                                                    </div>
                                                </div>



                                                <div className="col-md-12 col-lg-12 mt-2 recipentParent">

                                                    <DataTableExtensions {...tableData} columns={columns}>
                                                        <DataTable
                                                            columns={columns}
                                                            data={data}
                                                            // noHeader
                                                            defaultSortField="id"
                                                            // sortIcon={<SortIcon />}
                                                            // defaultSortAsc={true}
                                                            onRowClicked={onRowClicked}
                                                            pagination
                                                            highlightOnHover
                                                            rtl={false}
                                                            paginationComponentOptions={paginationComponentOptions}
                                                            dense
                                                        />
                                                    </DataTableExtensions>
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
                                            <div className="card-block text-center text-white USerCont">

                                                <h6 className="f-w-600 nameProfile ">
                                                    {i18n.language == 'ar' ? `تفاصيل فاتورة` : `Bill Details`}
                                                </h6>

                                                <Button type="primary" className='col-md-3 profileButton' onClick={() => { handlePrev() }} >
                                                    <i className="fa fa-undo" aria-hidden="true"  ></i>
                                                    {i18n.language == 'ar' ? `رجوع` : `Back`}

                                                </Button>



                                            </div>
                                        </div>


                                        {activeBill &&
                                            <div className=" col-md-12 col-lg-12  ">
                                                <div className="card-block">
                                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600 text-center">

                                                        {i18n.language == 'ar' ? `رقم الشحنة` : `Shipment Number`} {' / '}{activeBill.shipment_number}
                                                    </h6>
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-4 col-lg-4">
                                                            <p className="m-b-10 f-w-600">

                                                                {i18n.language == 'ar' ? `نوع الشحنة` : `Shipment Type`}
                                                            </p>
                                                            <h6 className="text-muted f-w-400">{activeBill.shipment_type}</h6>
                                                        </div>
                                                        <div className="col-sm-6 col-md-4 col-lg-4">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `تاريخ الارسال` : `Sending Date`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {activeBill.sending_date}
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-6 col-md-4 col-lg-4">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `تاريخ الاستلام` : `Reception Date`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {activeBill.reception_date}
                                                            </h6>
                                                        </div>
                                                        <div className="col-sm-6 col-md-4 col-lg-4">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `طريقة الدفع` : `Payment Method`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {activeBill.payment_method}
                                                            </h6>
                                                        </div>
                                                        <div className="col-sm-6 col-md-4 col-lg-4">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `المبلغ الاجمالي` : `Total Amount`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {activeBill.total_amount}
                                                            </h6>
                                                        </div>

                                                        <h6 className="m-b-20 p-b-5 b-b-default col-md-12 f-w-600  ">

                                                            {i18n.language == 'ar' ? `معلومات المرسل` : `Sender Data`}
                                                        </h6>
                                                        <div className="col-sm-12">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `العنوان` : `Address`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {profile.customer && profile.customer.address ? profile.customer.address : '-'}
                                                            </h6>
                                                        </div>
                                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600 col-md-12  ">

                                                            {i18n.language == 'ar' ? `معلومات المستلم` : `Recipient Data`}
                                                        </h6>
                                                        <div className="col-sm-12">
                                                            <p className="m-b-10 f-w-600">
                                                                {i18n.language == 'ar' ? `العنوان` : `Address`}

                                                            </p>
                                                            <h6 className="text-muted f-w-400">
                                                                {profile.customer && profile.customer.address ? profile.customer.address : '-'}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
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

export default ProfileInfo;
