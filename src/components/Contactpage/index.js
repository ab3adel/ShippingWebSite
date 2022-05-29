import React from 'react';
import ContactForm2 from '../CommentForm2'
import { useTranslation } from 'react-i18next';

import './style.css'

const Contactpage = () => {
    const [t, i18n] = useTranslation();
    return (
        <div className="contact-page-area section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-12">
                        <div className="contact-page-item">
                            <h2>{i18n.language === 'ar' ? `معلومات التواصل` : `Contact Information`}</h2>
                            {/* <p>
                                {i18n.language === 'ar' ?
                                    `خلافًا للاعتقاد الشائع ، فإن لوريم إيبسوم ليس مجرد نص عشوائي.
                                     لها جذور في قطعة من الأدب اللاتيني الكلاسيكي من 45 قبل الميلاد ، مما يجعلها أكثر من 2000 عام.`
                                    :
                                    `  Contrary to popular belief, Lorem Ipsum is not simply random text. 
                             It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old.`
                                }

                            </p> */}
                            {/* <div className="adress">
                                <h3>{i18n.language === 'ar' ? `العنوان` : `Address`}</h3>
                                <span>
                                    {i18n.language === 'ar' ?
                                        `الكويت ,الكويت ,شارع 150 ,جادة 434`
                                        :
                                        ` 245 King Street, Touterie Victoria 8520 Australia`}
                                </span>
                            </div>
                            <div className="phone">
                                <h3>{i18n.language === 'ar' ? `هاتف` : `Phone`}</h3>
                                <span>0-123-456-7890</span>
                                <span>0-123-456-7890</span>
                            </div> */}
                            <div className="email">
                                <h3>{i18n.language === 'ar' ? `البريد الالكتروني` : `Email`}</h3>
                                <span>info@wodex.online</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12">
                        <div className="contact-area contact-area-2 contact-area-3">
                            <h2>{i18n.language === 'ar' ? `نموذج الاتصال السريع` : `Quick Contact Form`}</h2>
                            <ContactForm2 />
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col col-xs-12">
                        <div className="contact-map">
                            <iframe title='db' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57763.58882182253!2d55.38442113562169!3d25.195692423227655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2z4Kam4KeB4Kas4Ka-4KaHIC0g4Kam4KeB4Kas4Ka-4KaHIOCmhuCmruCmv-CmsOCmvuCmpCAtIOCmuOCmguCmr-CngeCmleCnjeCmpCDgpobgprDgpqwg4KaG4Kau4Ka_4Kaw4Ka-4Kak!5e0!3m2!1sbn!2sbd!4v1540725271741"></iframe>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )

}

export default Contactpage;
