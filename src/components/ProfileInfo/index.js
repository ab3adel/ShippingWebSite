import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import '../../globalVar';

import './style.css'

const ProfileInfo = () => {
    let history = useHistory();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const profile = useSelector((state) => state.profile.profile)
    const [t, i18n] = useTranslation();
    useEffect(() => {
        !userToken && history.push('/')
    })
    console.log('profileStateReduxProfilePAge', profile)
    return (
        <div className="section">
            {profile &&
                <div className='container'>
                    <div className="row  d-flex justify-content-center">
                        <div className=" col-md-12">
                            <div className="carddd user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white USerCont">
                                            <div className=" ">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                                            <h6 className="f-w-600 nameProfile ">
                                                {profile.name}
                                            </h6>
                                            <p className='comp'>  {profile.customer.company ? profile.customer.company :
                                                i18n.language == 'ar' ? 'الشركة غير معرفة' : 'No Company'}</p>
                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>

                                        </div>
                                    </div>
                                    <div className="col-sm-8">
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
                                                        {profile.customer.phone ? profile.customer.phone : '-'}
                                                    </h6>
                                                </div>
                                                <div className="col-sm-12">
                                                    <p className="m-b-10 f-w-600">
                                                        {i18n.language == 'ar' ? `العنوان` : `Address`}

                                                    </p>
                                                    <h6 className="text-muted f-w-400">
                                                        {profile.customer.address ? profile.customer.address : '-'}
                                                    </h6>
                                                </div>
                                            </div>
                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                {i18n.language == 'ar' ? `معلومات مصرفية` : `Banking Information`}</h6>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `اسم البنك` : `Bank Name`}</p>
                                                    <h6 className="text-muted f-w-400">
                                                        {profile.customer.address ? profile.customer.bank_name : '-'}
                                                    </h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `رقم الحساب` : `Account Number`}</p>
                                                    <h6 className="text-muted f-w-400">
                                                        {profile.customer.address ? profile.customer.bank_account_number : '-'}
                                                    </h6>
                                                </div>

                                                <div className="col-sm-4">
                                                    <p className="m-b-10 f-w-600">{i18n.language == 'ar' ? `رقم IBAN` : `IBAN Number`}</p>
                                                    <h6 className="text-muted f-w-400">
                                                        {profile.customer.address ? profile.customer.IBAN_number : '-'}
                                                    </h6>
                                                </div>

                                            </div>
                                            {profile.customer.attachments.length > 0 ?
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
                </div>}
        </div>

    )

}

export default ProfileInfo;
