import React from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import simg1 from '../../images/about-page/1.jpg'
import simg2 from '../../images/about-page/2.jpg'
import simg3 from '../../images/about-page/4.jpg'

const Mission = ( ) => {

    return(
        <div className="service-style-1">
            <div className="container">
                <div className="col-l2">
                    <div className="wpo-section-title text-center">
                        <span>We Provide the Best</span>
                        <h2>Our Mission</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={simg1} alt=""/>
                                </div>
                                <div className="service-content">
                                    <h3>Ensure Safety</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority , There are many variations of passages of Lorem Ipsum available,</p>
                                    <Link to="/about">See More...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                     <img src={simg2} alt=""/>
                                </div>
                                <div className="service-content2">
                                    <h3>Build Up Community</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority , There are many variations of passages of Lorem Ipsum available,</p>
                                    <Link to="/about">See More...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="wpo-service-item">
                            <div className="wpo-service-single">
                                <div className="service-img">
                                    <img src={simg3} alt=""/>
                                </div>
                                <div className="service-content3">
                                    <h3>In Time Delivery</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority , There are many variations of passages of Lorem Ipsum available, </p>
                                    <Link to="/about">See More...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default Mission;
