import React from 'react';
import {Link} from 'react-router-dom'

import './style.css'

const Features3 = () => {

    return(
        <div className="wpo-section-style-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-9 col-sm-12 col-d c-pd">
                        <div className="section-wrap">
                            <div className="wpo-section-item-2">
                                <div className="wpo-section-icon">
                                    <i className="fi flaticon-ship"></i>
                                </div>
                                <div className="wpo-section-content">
                                    <p><Link to="/ocean">Ocean Freight</Link></p>
                                    <span>There are many variations of passages of Lorem Ipsum</span>
                                </div>
                            </div>
                            <div className="wpo-section-item-2">
                                <div className="wpo-section-icon">
                                    <i className="fi flaticon-truck"></i>
                                </div>
                                <div className="wpo-section-content">
                                    <p><Link to="/road">Road Freight</Link></p>
                                    <span>There are many variations of passages of Lorem Ipsum</span>
                                </div>
                            </div>
                            <div className="wpo-section-item-2">
                                <div className="wpo-section-icon">
                                    <i className="fi flaticon-plane"></i>
                                </div>
                                <div className="wpo-section-content">
                                    <p><Link to="/freight">Air Freight</Link></p>
                                    <span>There are many variations of passages of Lorem Ipsum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="tr-wrap">
                            <div className="t-text">
                                <h2>Internation Logistics & Transport</h2>
                                <p>We Provide you the best service in the world.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                            </div>
                            <div className="tr-s">
                                <span>Ipsum is that it has a more-or-less normal distribution of letters</span>
                                <span>The point of using Lorem Ipsum is that it has a more-or-less normal distribution </span>
                                <span>We Provide you the best service in the world.</span>
                                <span>It is a long established fact that a reader will be distracted by the readable </span>
                                <span>normal distribution of letters, as opposed </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default Features3;
