import React, { useEffect, useState } from 'react';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import MobileMenu from '../../components/MobileMenu'
import logo from '../../images/logo/logo.png'
import logow from '../../images/logo/logow.png'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'
import './style.css'
import { useTranslation } from 'react-i18next';
import '../../globalVar';
const Header = () => {
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const [userData, setUserData] = useState('')
    const [logged, setLogged] = useState(false)
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const { clearProfile, setProfile } = bindActionCreators(actionCreators, dispatch)


    const SubmitHandler = (e) => {
        e.preventDefault()
    }
    const langChange = async (langss) => {
        i18n.changeLanguage(langss);
    }
    useEffect(() => {
        if (userToken) {
            const getUser = async () => {

                try {
                    const responsee = await fetch(
                        `${global.apiUrl}api/profile`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: "Bearer " + userToken,
                                Accept: "application/json",
                            },
                        }
                    );

                    const response = await responsee.json();
                    console.log('response', response);

                    if (response.success == true) {
                        // setUserData(response.payload)
                        setProfile(response.payload)
                        setLogged(true)
                    }
                } catch (err) {
                    console.log(err);

                }
            }
            getUser()
        }
        else {
            clearProfile()
            setLogged(false)
        }

    }, [localStorage.getItem("token")])
    const handleLogout = async () => {
        try {
            const responsee = await fetch(
                `${global.apiUrl}api/logout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        Accept: "application/json",
                    },
                }
            );

            const response = await responsee.json();
            console.log('response', response);

            if (response.success == true) {
                localStorage.clear()
                setLogged(false)
                clearProfile()

                history.push('/Login')
            }
        } catch (err) {
            console.log(err);

        }
    }
    const handleLogoutall = async () => {
        try {
            const responsee = await fetch(
                `${global.apiUrl}api/alldevices/logout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + userToken,
                        Accept: "application/json",
                    },
                }
            );

            const response = await responsee.json();
            console.log('response', response);

            if (response.success == true) {
                localStorage.clear()
                setLogged(false)
                clearProfile()
                setLogged(false)
                history.push('/Login')
            }
        } catch (err) {
            console.log(err);

        }
    }

    console.log('logged', logged);
    return (
        <header>
            <div className="header-top-1" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-sm-12 col-12">
                            <ul className="d-flex account_login-area">
                                <li><i className="fa fa-clock-o" aria-hidden="true"></i>
                                    {i18n.language == 'ar' ?
                                        `الاثنين - الثلاثاء : 6:00 صباح - 10:00 مساء` :
                                        `Mon - Tues : 6.00 am - 10.00 pm`}

                                </li>
                                <li><i className="fa fa-map-marker"></i>
                                    {i18n.language == 'ar' ?
                                        `الكويت ,الكويت ,شارع 150` :
                                        `150 Street, London, USA`}
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="btn-style"><Link to="/">{i18n.language == 'ar' ? `اتصل بنا` : `Contact Us`}</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-style-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-10 col-sm-10 col-8 col-t">
                            <div className="logo">
                                <Link to="/"><img src={logo} alt="" className='logImg logImgnormal' />
                                    <img src={logow} alt="" className='logImg logImgWhit' />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 d-none d-lg-block col-m">
                            <div className="main-menu">
                                <nav className="nav_mobile_menu">
                                    <ul>

                                        <li className="active">
                                            <Link to="/">{t('Home')}</Link>
                                            {/* <ul className="submenu">
                                                <li className="active"><Link to="/">Home One</Link></li>
                                                <li><Link to="/home2">Home Two</Link></li>
                                                <li><Link to="/home3">Home Three</Link></li>
                                            </ul> */}
                                        </li>


                                        <li><Link to="/about">{i18n.language == 'ar' ? `من نحن` : `About Us`}</Link></li>
                                        {/* <li><Link to="/service">Service</Link>
                                            <ul className="submenu">
                                                <li><Link to="/servicesingle">service single</Link></li>
                                                <li><Link to="/freight">Air Freight</Link></li>
                                                <li><Link to="/road">Road Freight</Link></li>
                                                <li><Link to="/ocean">Ocean Freight</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/">Blog</Link>
                                            <ul className="submenu">
                                                <li><Link to="/blog">Blog with sidebar</Link></li>
                                                <li><Link to="/blog-fullwidth">Blog full width</Link></li>
                                                <li><Link to="/blog-single">Blog single sidebar</Link></li>
                                                <li><Link to="/blog-single-fullwidth">Blog single fullwidth</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/">Pages</Link>
                                            <ul className="submenu">
                                                <li><Link to="/pricing">pricing table</Link></li>
                                                <li><Link to="/team">Team</Link></li>
                                            </ul>
                                        </li> */}

                                        <li><Link to="/contact">{i18n.language == 'ar' ? `تواصل معنا` : `Contact`}</Link></li>

                                        <li><Link    >{i18n.language == 'ar' ? `اللغة` : `Lang`}</Link>
                                            <ul className="submenu">
                                                <li><Link onClick={() => { langChange('en') }}>{i18n.language == 'ar' ? `الانكليزية` : `English`}</Link></li>
                                                <li><Link onClick={() => { langChange('ar') }} >{i18n.language == 'ar' ? `العربية` : `Arabic`}</Link></li>
                                            </ul>
                                        </li>
                                        {logged && profile.profile ?
                                            <>
                                                <li><Link className='userLi' to="/Profile"  >
                                                    <Avatar icon={<UserOutlined />} />
                                                    {profile.profile.name}</Link>
                                                    <ul className="submenu">
                                                        {/* <li><Link to="/">service single</Link></li>
                                                        <li><Link to="/freight">Air Freight</Link></li>
                                                        <li><Link to="/road">Road Freight</Link></li> */}
                                                        <li><Link to="/Profile">{i18n.language == 'ar' ? `الملف الشخصي` : `Profile`}</Link></li>

                                                        <li><Link onClick={() => handleLogout()}>
                                                            {i18n.language == 'ar' ? `تسجيل الخروج` : `Logout`}</Link></li>
                                                        <li><Link onClick={() => handleLogoutall()}>
                                                            {i18n.language == 'ar' ? `تسجيل الخروج من كافة الأجهزة` : `Logout From All devices`}</Link></li>

                                                    </ul>
                                                </li>
                                            </>
                                            :
                                            <li><Link to="/Login">{i18n.language == 'ar' ? `تسجيل الدخول` : `Login`}</Link></li>

                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/* <div className="col-lg-1 col-md-1 col-sm-1 col-2 search">
                            <ul>
                                <li><Link to="/"><i className="fa fa-search"></i></Link>
                                    <ul>
                                        <li>
                                            <form onSubmit={SubmitHandler}>
                                                <input type="text" placeholder="search here.." />
                                                <button type="btn"><i className="fa fa-search"></i></button>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div> */}
                        <div className="col-md-1 col-sm-1 col-2">
                            <MobileMenu />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )

}

export default Header;
