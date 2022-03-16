import React from 'react';
import abimg2 from '../../images/about/2.png'
import { useTranslation } from 'react-i18next';

import './style.css'

const AboutSection2 = ({ data }) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="wpo-about-style-4">
            {/* <div className="container"> */}
            <div className="row">
                <div className="col-lg-12   about-wrap">
                    <div className="wpo-about-content22">
                        <div className="wpo-about-icon">
                            {/* <i className="fi flaticon-travel"></i> */}
                        </div>
                        <h2>{i18n.language == 'ar' ? data.title_ar : data.title_en}</h2>
                        <div dangerouslySetInnerHTML={{ __html: i18n.language == 'ar' ? data.content_ar : data.content_en }}></div>
                    </div>

                </div>
            </div>
            {/* </div> */}
        </div>
    )

}

export default AboutSection2;
