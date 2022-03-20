import React from 'react';
import { Link } from 'react-router-dom'
import sv1 from '../../images/service/1.jpg'
import sv2 from '../../images/service/2.jpg'
import sv3 from '../../images/service/3.jpg'
import sv4 from '../../images/service/4.jpg'
import sv5 from '../../images/service/5.jpg'
import sv6 from '../../images/service/6.jpg'
import { useTranslation } from 'react-i18next';


const ServiceArea2 = (props) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="wpo-service-area">
            <div className="container">
                <div className="col-l2">
                    <div className="wpo-section-title text-center">
                        <span>
                            {i18n.language == 'ar' ?
                                "نحن نقدم الأفضل"
                                :
                                "We Provide the Best"
                            }
                        </span>
                        <h2>
                            {i18n.language == 'ar' ?
                                "خدماتنا"
                                :
                                "Our Services"
                            }


                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={sv1} alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>
                                        {i18n.language == 'ar' ?
                                            "النقل البري"
                                            :
                                            "Land Transport"
                                        }

                                    </h3>
                                    <p>
                                        {i18n.language == 'ar' ?
                                            "خدمة نقل الشحنة من باب المرسل الى باب المستلم بسهولة و سرعة فائقة"
                                            :
                                            "The service of transferring the shipment from the sender's door to the recipient's door easily and  quickly"
                                        }
                                    </p>
                                    {/* <Link to="/servicesingle">See More...</Link>ظ */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={sv2} alt="" />
                                </div>
                                <div className="service-content2">
                                    <h3>
                                        {i18n.language == 'ar' ?
                                            "الشحن البحري"
                                            :
                                            "Sea Freight"
                                        }
                                    </h3>
                                    <p>
                                        {i18n.language == 'ar' ?
                                            "يتلقى عدد هائل من خبراء الشحن البحري في شبكتنا العالمية أي نوع من طلباتك وأوامرك ويتعامل معها بمرونة و عناية"
                                            :
                                            "A huge number of sea freight experts in our global network receive any type of your requests and orders and deal with them with flexibility and care"
                                        }
                                    </p>
                                    {/* <Link to="/servicesingle">See More...</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={sv3} alt="" />
                                </div>
                                <div className="service-content3">
                                    <h3>
                                        {i18n.language == 'ar' ?
                                            "الشحن الجوي"
                                            :
                                            "Air Freight"
                                        }
                                    </h3>
                                    <p>
                                        {i18n.language == 'ar' ?
                                            "نعي تماماً أن الشحن الجوي خدمة غالية ومكلفة لذلك يساعدك الأخصائيون لدينا في توفير المال من خلال حلول تركز على العبور السريع في وقت قصير"
                                            :
                                            "We are fully aware that air freight is an expensive service, so our specialists help you save money with solutions that focus on express transit in a short time"
                                        }
                                    </p>
                                    {/* <Link to="/servicesingle">See More...</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={sv4} alt="" />
                                </div>
                                <div className="service-content4">
                                    <h3>
                                        {i18n.language == 'ar' ?
                                            "حلول لوجستية"
                                            :
                                            "Logistic Solutions"
                                        }

                                    </h3>
                                    <p>
                                        {i18n.language == 'ar' ?
                                            "تعتبر خدمات التخليص الجمركي من أهم الحلول اللوجستية التي نقدمها لعملائنا المستوردين والمصدرين لدينا ، من خلال مجموعة من الخبراء والمتخصصين."
                                            :
                                            "Customs clearance services are one of the most important logistical solutions that we offer to our clients, importers and exporters, through a group of experts and specialists."
                                        }
                                    </p>
                                    {/* <Link to="/servicesingle">See More...</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={sv5} alt="" />
                                </div>
                                <div className="service-content5">
                                    <h3>
                                        {i18n.language == 'ar' ?
                                            "التغليف والتخزين"
                                            :
                                            "Packaging and Store"
                                        }
                                    </h3>
                                    <p>
                                        {i18n.language == 'ar' ?
                                            "​ لدينا مجموعة شاملة من المركبات و وسائل النقل العالية الجودة بما في ذلك الشاحنات المجهزة بالتجهيزات القياسية لتلبية جميع المتطلبات."
                                            :
                                            "We have a comprehensive range of high quality vehicles and transportation including trucks equipped with standard equipment to meet all requirements."
                                        }
                                    </p>
                                    {/* <Link to="/servicesingle">See More...</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={sv6} alt="" />
                                </div>
                                <div className="service-content6">
                                    <h3>
                                        {i18n.language == 'ar' ?
                                            "التخزين"
                                            :
                                            "Warehousing"
                                        }
                                    </h3>
                                    <p>
                                        {i18n.language == 'ar' ?
                                            "نقدم خدمات النقل التي تتناسب مع نوع الشحن الذي يتم شحنه، مثل خدمات التجميد والتبريد للبضائع، التي تتطلب التحكم في درجة الحرارة، والخدمات التي تضمن عناية خاصة عند نقل الأشياء القيّمة، والأدوات الدقيقة "
                                            :
                                            "We provide transportation services that are appropriate to the type of freight being shipped,freezing and cooling services for goods, which require temperature control"
                                        }
                                    </p>
                                    {/* <Link to="/servicesingle">See More...</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ServiceArea2;
