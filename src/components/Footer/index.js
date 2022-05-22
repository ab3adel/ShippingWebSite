import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../images/logo/logo33.png'
import in1 from '../../images/instragram/1.jpg'
import in2 from '../../images/instragram/2.jpg'
import in3 from '../../images/instragram/3.jpg'
import in4 from '../../images/instragram/4.jpg'
import in5 from '../../images/instragram/5.jpg'
import in6 from '../../images/instragram/6.jpg'
import './style.css'
import { useTranslation } from 'react-i18next';
const FooterSection = () => {
    const [t, i18n] = useTranslation();
    return (
        <div className="wpo-footer-area">
            <div className="wpo-footer-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-6 col-sm-6 footer-t">
                            <div className="wpo-footer-logo">
                                <img src={logo} alt="" />
                            </div>
                            <p>
                                {i18n.language === 'ar' ?
                                    " إن خبرائنا ذوي المهارات العالية المتمركزين في الفروع في جميع أنحاء العالم على أهبة الاستعداد لتلبية أي متطلبات محتملة متعلقة بالشحن."
                                    :
                                    "Our highly skilled experts stationed in branches all over the world are ready to meet any potential freight related requirements."
                                }
                            </p>
                            <p>
                                {/* {i18n.language == 'ar' ?
                                    "هناك العديد من لوريم للتغيير"
                                    :
                                    "By injected hum or randomised"
                                } */}
                            </p>
                            <div className="social">
                                <ul className="d-flex p-0">
                                    <li><Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                    <li><Link to="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                    <li><Link to="/"><i className="fa fa-whatsapp" aria-hidden="true"></i></Link></li>
                                    <li><Link to="/"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                    <li><Link to="/"><i className="fa fa-envelope" aria-hidden="true"></i></Link></li>

                                </ul>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                        <div className="col-lg-3 col-md-6 col-sm-6 row justify-content-center footer-t">
                            <div className="footer-link  text-center">
                                <h3>{i18n.language === 'ar' ? `رابط سريع` : `Quick Link`}</h3>
                                <ul className='p-0'>
                                    <li><Link to="/">{t('Home')}</Link></li>
                                    <li><Link to="/about">{i18n.language === 'ar' ? `من نحن` : `About Us`} </Link></li>
                                    <li><Link style={{ textTransform: 'unset' }} to="/terms-Conditions">{i18n.language === 'ar' ? `الشروط والأحكام` : `Terms and Conditions`} </Link></li>
                                    <li><Link style={{ textTransform: 'unset' }} to="/FAQs">{i18n.language == 'ar' ? `الأسئلة المكررة` : `FAQs`}</Link></li>
                                    {/* <li><Link to="/">Testimonial</Link></li> */}
                                    <li><Link to="/contact">{i18n.language === 'ar' ? `تواصل معنا` : `Contact`} </Link></li>

                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-lg-3 col-md-6 col-sm-6 footer-b">
                            <div className="Recent-News-area">
                                <h3>{i18n.language == 'ar' ? `آخر الأخبار` : `Recent News`}</h3>
                                <div className="resent-sub">
                                    <p>There are many variations of passages of Lorem</p>
                                    <span><i className="fa fa-clock-o" aria-hidden="true"></i> Octobor 10, 2018</span>
                                </div>
                                <p>There are many variations of passages of Lorem</p>
                                <span><i className="fa fa-clock-o" aria-hidden="true"></i> Octobor 10, 2018</span>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-3 col-sm-6 col-12">
                            <div className="footer-widget instagram">
                                <h3>{i18n.language == 'ar' ? `انستقرام` : `Instagram`}</h3>
                                <ul className="d-flex">
                                    <li><Link to="/"><img src={in1} alt="" /></Link></li>
                                    <li><Link to="/"><img src={in2} alt="" /></Link></li>
                                    <li><Link to="/"><img src={in3} alt="" /></Link></li>
                                    <li><Link to="/"><img src={in4} alt="" /></Link></li>
                                    <li><Link to="/"><img src={in5} alt="" /></Link></li>
                                    <li><Link to="/"><img src={in6} alt="" /></Link></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="wpo-footer-bottom">
                <div className="container">
                    <div className="wpo-footer-bottom-content">
                        <div className="row">
                            <div className="col-12">
                                <span>
                                    {i18n.language == 'ar' ?
                                        `© حقوق 2022. جميع الحقوق محفوظة.`
                                        :
                                        `© Copyrights 2022. All Rights Reserved.`
                                    }

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FooterSection;
