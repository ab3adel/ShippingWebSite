import React from 'react';
import feimg from '../../images/features/1.png'
import './style.css'


import { useTranslation } from 'react-i18next';

const WpoFeatures = () => {
    const [t, i18n] = useTranslation();
    return (
        <div className="wpo-features-area">
            <div className="container">
                <div className="wpo-section-title text-center">
                    <span>    {i18n.language === 'ar' ?
                        "نحن نقدم الأفضل"
                        :
                        "We Provide the Best"
                    }</span>
                    <h2>
                        {i18n.language === 'ar' ?
                            "ميزاتنا الرائعة"
                            :
                            "Our Awesome Features"
                        }

                    </h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="wpo-features-item-2">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="wpo-feature-wrap">
                                    <div className="wpo-features-icon2">
                                        <i className="fi flaticon-plane"></i>
                                    </div>
                                    <div className="wpo-features-text">
                                        <h3>
                                            {i18n.language === 'ar' ?
                                                "أول شحن جوي"
                                                :
                                                "First Air Freight"
                                            }
                                        </h3>
                                        <p>
                                            {i18n.language === 'ar' ?
                                                "خدمات عالية المستوى في تولي الإشراف على الشحنات و تحميلها و تفريغها و نقلها بالمعدات و الآليات المعدة خصيصاً لذلك"

                                                :
                                                "High-level services in supervising shipments, loading, unloading and transporting them with equipment and mechanisms specially prepared for that."
                                            }


                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="wpo-feature-wrap">
                                    <div className="feature-icon3">
                                        <i className="fi flaticon-truck"></i>
                                    </div>
                                    <div className="wpo-features-text">
                                        <h3>
                                            {i18n.language === 'ar' ?
                                                "أول شحن بري"
                                                :
                                                "First Ground Freight"
                                            }
                                        </h3>
                                        <p>
                                            {i18n.language === 'ar' ?
                                                "يقدم خبراء الشحن البحري لدينا مجموعة متكاملة من الحلول اللوجستية الدولية، والمُعدّة خصيصاً وفقاً لاحتياجات العملاء "

                                                :
                                                "Our sea freight experts offer a full range of international logistics solutions, tailored to customer needs"
                                            }


                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="wpo-features-item">
                            <div className="wpo-feature-img">
                                <img src={feimg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="wpo-features-item">
                            <div className="col-lg-12 col-md-6 col-sm-12">
                                <div className="wpo-feature-wrap">
                                    <div className="wpo-features-icon">
                                        <i className="fi flaticon-ship"></i>
                                    </div>
                                    <div className="wpo-features-text">
                                        <h3>
                                            {i18n.language === 'ar' ?
                                                "الشحن الأسرع"
                                                :
                                                " Quickest Cargo"
                                            }

                                        </h3>
                                        <p>
                                            {i18n.language === 'ar' ?
                                                "قادرين على التعامل مع المركبات و البضائع و نقلها من أي مكان في جميع أنحاء قارات أوروبا و افريقيا و أمريكا و آسيا و استراليا, بما يتماشى مع متطلبات العملاء"

                                                :
                                                "Able to deal with vehicles and goods and transport them from anywhere throughout the continents of Europe, Africa, America, Asia and Australia, in line with customer requirements"
                                            }


                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-6 col-sm-12">
                                <div className="wpo-feature-wrap">
                                    <div className="wpo-features-icon">
                                        <i className="fi flaticon-truck-1"></i>
                                    </div>
                                    <div className="wpo-features-text">
                                        <h3>
                                            {i18n.language === 'ar' ?
                                                "التسليم في الوقت"
                                                :
                                                "Timely Delivery"
                                            }

                                        </h3>
                                        <p>
                                            {i18n.language === 'ar' ?
                                                "يدير خبرائنا في قطاع النقل جميع العمليات من خلال أنظمة تقنية وبرمجية للتخطيط والمتابعة ولضمان الشفافية أمام عملائنا والالتزام بتسليم واستلام الشحنات في المكان المحدد والوقت المطلوب."

                                                :
                                                "Our experts in the transportation sector manage all operations through technical and software systems for planning and follow-up and to ensure transparency in front of our customers and a commitment to deliver and receive shipments at the specified place and the required time."
                                            }


                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WpoFeatures;
