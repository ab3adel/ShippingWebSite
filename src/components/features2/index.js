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
                                <i className="fi flaticon-ship"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p><Link to="/ocean">{t('Ocean Freight')}</Link></p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة"
                                        :
                                        " There are many variations of passages of Lorem Ipsum"
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
                                <p> <Link to="/road">{t('Road Freight')}</Link></p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة"
                                        :
                                        " There are many variations of passages of Lorem Ipsum"
                                    }

                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-d">
                        <div className="wpo-section-item-2">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-plane"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p> <Link to="/freight">{t('Air Freight')}</Link></p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة"
                                        :
                                        " There are many variations of passages of Lorem Ipsum"
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
