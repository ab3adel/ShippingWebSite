import React from 'react';
import { Link } from 'react-router-dom'

import './style.css'
import { useTranslation } from 'react-i18next';

const Features2 = () => {
    const [t, i18n] = useTranslation();
    return (
        <div className="wpo-section-style-2">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4 col-md-6 col-sm-12 col-d">
                        <div className="wpo-section-item-2">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-plane"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p> <Link to="/">{t('Air Freight')}</Link></p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "استلم الشحنة عبر الشحن الجوي من خلال حلول تعمل على توفير الوقت والمال"
                                        :
                                        "The service of transferring the shipment from the sender's door to the recipient's door easily and  quickly"
                                    }

                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-d">
                        <div className="wpo-section-item-2">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-truck"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p> <Link to="/">{t('Road Freight')}</Link></p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "تقديم خدمات الشحن البري الدولي على أفضل صورة"
                                        :
                                        "Providing international road freight services in the best way"
                                    }

                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 col-d">
                        <div className="wpo-section-item-2">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-ship"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p><Link to="/">{t('Ocean Freight')}</Link></p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "شحن البضائع القيّمة الخاصّة بك الى وجهاتها في الموعد المحدد"
                                        :
                                        "Ship your valuable goods to their destinations on time"
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

export default Features2;
