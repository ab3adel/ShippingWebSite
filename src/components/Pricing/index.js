import React from 'react';

import {Link} from 'react-router-dom'
import './style.css'

const PricingSection = (props) => {

    return(
        <div className="wpo-pricing-area">
            <div className="container">
                <div className="wpo-section-title text-center">
                    <span>We Give You The Best</span>
                    <h2>Our Pricing Plan</h2>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="col-lg-4 col-l2 col-md-6 col-12">
                                <div className="wpo-price-item">
                                    <div className="wpo-pricing-header">
                                        <h3>Free</h3>
                                        <span>Per Mile</span>
                                    </div>
                                    <div className="wpo-pricing-table">
                                        <div className="wpo-price-sub-header">
                                            <h4>$120</h4>
                                        </div>
                                        <ul>
                                            <li>3000 kg load</li>
                                            <li>125 kg / pallet</li>
                                            <li>24/7 support</li>
                                            <li>Free Packaging</li>
                                            <li>Warehousing</li>
                                        </ul>
                                        <div className="wpo-pricing-footer">
                                            <div className="btns">
                                                <div className="btn-style btn-style-4"><Link to="/">Order Now</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-l2 col-md-6 col-12">
                                <div className="wpo-price-item">
                                    <div className="wpo-pricing-header">
                                        <h3>Basaic</h3>
                                        <span>Per Mile</span>
                                    </div>
                                    <div className="wpo-pricing-table">
                                        <div className="wpo-price-sub-header">
                                            <h4>$250</h4>
                                        </div>
                                        <ul>
                                            <li>3000 kg load</li>
                                            <li>125 kg / pallet</li>
                                            <li>24/7 support</li>
                                            <li>Free Packaging</li>
                                            <li>Warehousing</li>
                                        </ul>
                                        <div className="wpo-pricing-footer">
                                            <div className="btns">
                                                <div className="btn-style btn-style-4"><Link to="/">Order Now</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-l2 col-md-6 col-12">
                                <div className="wpo-price-item">
                                    <div className="wpo-pricing-header">
                                        <h3>Premium</h3>
                                        <span>Per Mile</span>
                                    </div>
                                    <div className="wpo-pricing-table">
                                        <div className="wpo-price-sub-header">
                                            <h4>$250</h4>
                                        </div>
                                        <ul>
                                            <li>3000 kg load</li>
                                            <li>125 kg / pallet</li>
                                            <li>24/7 support</li>
                                            <li>Free Packaging</li>
                                            <li>Warehousing</li>
                                        </ul>
                                        <div className="wpo-pricing-footer">
                                            <div className="btns">
                                                <div className="btn-style btn-style-4"><Link to="/">Order Now</Link></div>
                                            </div>
                                        </div>
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

export default PricingSection;
