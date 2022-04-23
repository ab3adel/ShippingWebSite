import React, { Component, useState } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom'

import PerfectScrollbar from 'react-perfect-scrollbar'
import bgIMG from '../../images/blog/33.jpg'
import './style.css';
import { useTranslation } from 'react-i18next';

import 'react-perfect-scrollbar/dist/css/styles.css';
const menus = [
    {
        id: 1,
        title: 'Home',
        title_ar: 'الرئيسية',
        link: '/',

    },

    {
        id: 2,
        title: 'About Us',
        title_ar: 'من نحن',
        link: '/about',
    },
    // {
    //     id: 3,
    //     title: 'Service',
    //     title_ar: 'خدمة',
    //     submenu: [
    //         {
    //             id: 31,
    //             title: 'service single',
    //             link: '/servicesingle',
    //         },
    //         {
    //             id: 32,
    //             title: 'Air Freight',
    //             link: '/freight',
    //         },
    //         {
    //             id: 33,
    //             title: 'Road Freight',
    //             link: '/road',
    //         },
    //         {
    //             id: 34,
    //             title: 'Ocean Freight',
    //             link: '/ocean',
    //         },
    //     ]
    // },
    // {
    //     id: 4,
    //     title: 'Blog',
    //     title_ar: 'مدونة',
    //     submenu: [
    //         {
    //             id: 41,
    //             title: 'Blog with sidebar',
    //             link: '/blog',
    //         },
    //         {
    //             id: 42,
    //             title: 'Blog full width',
    //             link: '/blog-fullwidth',
    //         },
    //         {
    //             id: 43,
    //             title: 'Blog single sidebar',
    //             link: '/blog-single',
    //         },
    //         {
    //             id: 44,
    //             title: 'Blog single fullwidth',
    //             link: '/blog-single-fullwidth',
    //         },
    //     ]
    // },

    // {
    //     id: 7,
    //     title: 'Pages',
    //     title_ar: 'صفحات',
    //     submenu: [
    //         {
    //             id: 71,
    //             title: 'pricing table',
    //             link: '/pricing',
    //         },
    //         {
    //             id: 72,
    //             title: 'Team',
    //             link: '/team',
    //         },
    //     ]
    // },
    {
        id: 633,
        title: 'FAQs',
        title_ar: `الأسئلة المكررة`,
        link: '/FAQs',
    },
    {
        id: 6,
        title: 'Contact',
        title_ar: 'اتصل بنا',
        link: '/contact',
    },


]


const MobileMenu = ({ logged, handleLogout, handleLogoutall, profile }) => {
    const [t, i18n] = useTranslation();
    const [isMenuShow, setIsMenuShow] = useState(false)
    const [isOpen, setIsOpen] = useState(0)


    const menuHandler = () => {
        setIsMenuShow(!isMenuShow)
        setIsOpen(0)

    }

    const setIsOpenn = id => () => {
        setIsOpen(id === isOpen ? 0 : id)

    }


    const langChange = async (langss) => {
        i18n.changeLanguage(langss);
    }
    // const { isMenuShow, isOpen } = this.state;

    return (
        <div>
            {/* <PerfectScrollbar > */}

            <div className={`mobileMenu ${isMenuShow ? 'mobileMenu show' : 'mobileMenu'}`}>
                {/* <div className="clox" onClick={() => menuHandler()}>Close Me</div> */}
                {/* <img src={bgIMG} className='bg-img' ></img> */}
                {/* <div className='divBack'></div> */}
                <ul className="responsivemenu">

                    {menus.map(item => {
                        return (
                            <li key={item.id}>
                                {item.submenu ? <p onClick={setIsOpenn(item.id)}>
                                    {i18n.language == 'ar' ? item.title_ar : item.title}

                                    {item.submenu ? <i className={`fa fa-angle-${i18n.language == 'ar' ? `left` : `right`}`} aria-hidden="true"></i> : ''}
                                </p>
                                    : <Link onClick={() => setIsMenuShow(false)} to={item.link}>  {i18n.language == 'ar' ? item.title_ar : item.title}</Link>}
                                {item.submenu ?
                                    <Collapse isOpen={item.id === isOpen}>
                                        <Card>
                                            <CardBody>
                                                <ul className='subUL'>
                                                    {item.submenu.map(submenu => (
                                                        <li key={submenu.id}>

                                                            <Link className="active" onClick={() => setIsMenuShow(false)} to={submenu.link}>{submenu.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                    : ''}
                            </li>
                        )
                    })}
                    {logged && profile.profile ?


                        <li >
                            <p onClick={setIsOpenn(552)}>
                                {profile.profile.name}
                                <i className={`fa fa-angle-${i18n.language == 'ar' ? `left` : `right`}`} aria-hidden="true"></i>
                            </p>

                            <Collapse isOpen={552 === isOpen}>
                                <Card>
                                    <CardBody>
                                        <ul className='subUL'>


                                            <li><Link to="/Profile" onClick={() => { setIsMenuShow(false); setIsOpen(0) }}>{i18n.language == 'ar' ? `الملف الشخصي` : `Profile`}</Link></li>
                                            <li><Link to="/Addresses" onClick={() => { setIsMenuShow(false); setIsOpen(0) }}>{i18n.language == 'ar' ? `عنواني` : `My Address`}</Link></li>
                                            <li><Link to="/Recipients" onClick={() => { setIsMenuShow(false); setIsOpen(0) }}>      {t('Recipients')}</Link></li>
                                            <li><Link to="/Bills" onClick={() => { setIsMenuShow(false); setIsOpen(0) }}>{i18n.language == 'ar' ? `الفواتير` : `Bills`}</Link></li>
                                            <li><Link onClick={() => { handleLogout(); setIsMenuShow(false); setIsOpen(0) }}>
                                                {i18n.language == 'ar' ? `تسجيل الخروج` : `Logout`}</Link></li>
                                            <li><Link onClick={() => { handleLogoutall(); setIsMenuShow(false); setIsOpen(0) }}>
                                                {i18n.language == 'ar' ? `تسجيل الخروج من كافة الأجهزة` : `Logout From All devices`}</Link></li>




                                        </ul>
                                    </CardBody>
                                </Card>
                            </Collapse>

                        </li>
                        :
                        <li><Link to="/Login" onClick={() => setIsMenuShow(false)}>{i18n.language == 'ar' ? `تسجيل الدخول` : `Login`}</Link></li>


                    }

                    <li >
                        <p onClick={setIsOpenn(55)}>
                            {i18n.language == 'ar' ? `اللغة` : `Lang`}
                            <i className={`fa fa-angle-${i18n.language == 'ar' ? `left` : `right`}`} aria-hidden="true"></i>
                        </p>

                        <Collapse isOpen={55 === isOpen}>
                            <Card>
                                <CardBody>
                                    <ul className='subUL'>
                                        <li><Link onClick={() => { setIsMenuShow(false); langChange('en'); }}>{i18n.language == 'ar' ? `الانكليزية` : `English`}</Link></li>
                                        <li><Link onClick={() => { setIsMenuShow(false); langChange('ar'); }} >{i18n.language == 'ar' ? `العربية` : `Arabic`}</Link></li>




                                    </ul>
                                </CardBody>
                            </Card>
                        </Collapse>

                    </li>
                </ul>
            </div>
            {/* </PerfectScrollbar> */}
            <div className="showmenu" onClick={menuHandler}><i className="fa fa-bars" aria-hidden="true"></i></div>
        </div>
    )

}

export default MobileMenu;