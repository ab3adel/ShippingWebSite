import React from 'react';
import abimg2 from '../../images/about/2.png'

import './style.css'
import { useTranslation } from 'react-i18next';

const AboutSection2 = () => {
    const [t, i18n] = useTranslation();
    return (
        <div className="wpo-about-style-2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6  offset-lg-6 about-wrap">
                        <div className="wpo-about-content">
                            <div className="wpo-about-icon">
                                <i className="fi flaticon-travel"></i>
                            </div>
                            <h2>  {i18n.language == 'ar' ?
                                "من نحن ؟"
                                :
                                "Who We Are?"
                            }

                            </h2>
                            <p>
                                {i18n.language == 'ar' ?
                                    "هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة"

                                    :
                                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less"
                                }
                            </p>
                            <p>
                                {i18n.language == 'ar' ?
                                    "هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة هذا النص للاختبار ويجب تغييره بما يناسب توجهات الشركة"

                                    :
                                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less"
                                }

                            </p>
                            <span>
                                {i18n.language == 'ar' ?
                                    "هذا النص للاختبار ويجب تغييره"

                                    :
                                    "Long established fact that a reader"
                                }
                            </span>
                            <span>
                                {i18n.language == 'ar' ?
                                    "هذا النص للاختبار ويجب تغييره"

                                    :
                                    "Long established fact that a reader"
                                }
                            </span>
                            <span>
                                {i18n.language == 'ar' ?
                                    "هذا النص للاختبار ويجب تغييره"

                                    :
                                    "Long established fact that a reader"
                                }
                            </span>
                        </div>
                        <div className="signature-section">
                            <div className="si-text">
                                <p>
                                    {i18n.language == 'ar' ?
                                        "اسم الموظف"
                                        :
                                        "Ketty Raigott"
                                    }
                                </p>
                                <span>
                                    {i18n.language == 'ar' ?
                                        "رئيس مجلس الإدارة & الرئيس التنفيذي"
                                        :
                                        "Chairman & Chief Executive Officer"
                                    }

                                </span>
                            </div>
                            <img src={abimg2} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AboutSection2;
