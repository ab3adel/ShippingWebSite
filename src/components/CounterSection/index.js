import React from 'react';
import { Link } from 'react-router-dom'

import './style.css'
import { useTranslation } from 'react-i18next';





const CounterSection = (props) => {
    const [t, i18n] = useTranslation();
    return (
        <div className={`wpo-counter-area ${props.subclass}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <div className="wpo-counter-content">
                            <h2>
                                {i18n.language == 'ar' ?
                                    " تمتع بضمان تسليم شحنتك في الوقت المحدد"
                                    :
                                    "Get a Guarantee That Your Shipment Will Be Delivered On Time"
                                }

                            </h2>
                            <p>
                                {i18n.language == 'ar' ?
                                    "نهدف الى خدمة أصحاب المشاريع الصغيرة و المتوسطة في خدمة الشحن الخارجي و التوصيل الداخلي , حيث نقدم ربط آلي مع شركات الشحن الدولية فتساعدك بذلك خدماتنا على النمو بشركتك بأسعار شحن تنافسية مصممة لتلائم احتياجاتك"
                                    :
                                    "We aim to serve the owners of small and medium enterprises in the service of external shipping and internal delivery, where we provide automatic linkage with international shipping companies, so that our services help you to grow your company at competitive shipping prices designed to suit your needs"
                                }
                            </p>
                            <div className="btns">
                                <div className="btn-style btn-style-3">
                                    <Link to="/">
                                        {i18n.language == 'ar' ?
                                            "أرسل شحنتك بخطوات بسيطة..."
                                            :
                                            "Send your Cargo in a few simple steps..."
                                        }

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                        <div className="wpo-counter-grids">
                            <div className="grid">
                                <div>
                                    <h2><span>4,012</span></h2>
                                </div>
                                <p>
                                    {i18n.language == 'ar' ?
                                        "حزم مسلّمة"
                                        :
                                        "Delivered Packages"
                                    }
                                </p>
                            </div>
                            <div className="grid">
                                <div>
                                    <h2><span>605</span></h2>
                                </div>
                                <p>
                                    {i18n.language == 'ar' ?
                                        "دول مغطاة"
                                        :
                                        "Countries Covered"
                                    }
                                </p>
                            </div>
                            <div className="grid">
                                <div>
                                    <h2><span>920</span></h2>
                                </div>
                                <p>
                                    {i18n.language == 'ar' ?
                                        "زبائن راضون"
                                        :
                                        "Satisfied Clients"
                                    }
                                </p>
                            </div>
                            <div className="grid">
                                <div>
                                    <h2><span>3,592</span></h2>
                                </div>
                                <p>
                                    {i18n.language == 'ar' ?
                                        "طن من البضائع"
                                        :
                                        "Tons of Goods"
                                    }

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CounterSection;
