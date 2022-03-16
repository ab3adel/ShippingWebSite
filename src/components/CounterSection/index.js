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
                                    "لدينا بعض الأشياء المهمة التي سوف ترضيك ..."
                                    :
                                    "Our Some Important Things That will Satisfite You..."
                                }

                            </h2>
                            <p>
                                {i18n.language == 'ar' ?
                                    "هذا النص تجريبي ويجب تغييره بما يناسب توجهات الشركة ، هذا النص تجريبي ويجب تغييره بما يناسب توجهات الشركة هذا النص تجريبي ويجب تغييره بما يناسب توجهات الشركة ، هذا النص تجريبي ويجب تغييره بما يناسب توجهات الشركة"
                                    :
                                    "  Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Many desktop publishing packages and web page editors now"
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
