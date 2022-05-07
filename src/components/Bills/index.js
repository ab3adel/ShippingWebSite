import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'

import DataTable from "react-data-table-component";
// import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import '../../globalVar';
import { Field } from './field'
import './styleBills.scss'
import { details, columns } from "./data";

// import "./styles.css";



const ProfileInfo = () => {



    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const profile = useSelector((state) => state.profile.profile)
    const [t, i18n] = useTranslation();
    let [data, setData] = useState([])
    let tableData = { data }


    useEffect(() => { !userToken && history.push('/') })
    useEffect(() => {
        fetchOffers();

    }, [])
    useEffect(() => {
        if (data.length > 0) {
            tableData = { data }
            // console.log(tableData)
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

                    setData(res.payload)
                }
            })
            .catch(err => console.log(err))
    }



    const onRowClicked = async (row, event) => {
        // console.log(row);
        history.push(`/Bill/${row.id}`)
        // setActiveBill(row)
        // handleNext()
    }
    const paginationComponentOptions = {
        rowsPerPageText: i18n.language == 'ar' ? `عدد الاسطر في الصفحة` : `Rows Per Page`,

    };

    return (
        <div className="section bilsSection ">
            {profile &&
                <>

                    {/* <div className=' d-flex '> */}


                    <div className='container'>
                        <div className="row  d-flex justify-content-center p-0">
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

                                            <DataTableExtensions  {...tableData} columns={columns}>
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
                    {/* </div> */}





                </>
            }

        </div>

    )

}

export default ProfileInfo;
