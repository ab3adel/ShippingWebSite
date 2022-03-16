import React from 'react';
import {Link} from 'react-router-dom'

import './style.css'

const Features = (props) => {

    return(
        <div className={`wpo-section-area ${props.tbclass}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6 col-d">
                        <div className="wpo-section-item">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-ship"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p><Link to="/ocean">Ocean Freight</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6 col-d">
                        <div className="wpo-section-item">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-truck"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p><Link to="/road">Road Freight</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6 col-d">
                        <div className="wpo-section-item">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-plane"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p><Link to="/freight">Air Freight</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6 col-d">
                        <div className="wpo-section-item">
                            <div className="wpo-section-icon">
                                <i className="fi flaticon-delivery"></i>
                            </div>
                            <div className="wpo-section-content">
                                <p><Link to="#">Warehousing</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default Features;
