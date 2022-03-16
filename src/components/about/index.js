import React from 'react';
import abimg1 from '../../images/about/about.svg'
import abimg2 from '../../images/about/1.png'

import './style.css'

const AboutSection = () => {

    return(
        <div className="wpo-about-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="wpo-about-img">
                              <img src={abimg1} alt=""/>               
                        </div>
                    </div>
                    <div className="col-lg-6 sec-p">
                        <div className="wpo-about-content">
                            <div className="wpo-about-icon">
                                <i className="fi flaticon-travel"></i>
                            </div>
                            <h2>Who We Are?</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less</p>
                            <span>Long established fact that a reader</span>
                            <span>We making it look like readable English.</span>
                            <span>Long established fact that a reader</span>
                        </div>
                        <div className="signature-section">
                            <div className="si-text">
                                <p>Ketty Raigott</p>
                                <span>Chairman & Chief Executive Officer</span>
                            </div>
                            <img src={abimg2} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default AboutSection;
