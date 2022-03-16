import React from 'react';
import {Link} from 'react-router-dom'
import './style.css'

const TransportAir = (props) => {

    return(
        <div className="Freight-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        <div className="row">
                            <div className="col-lg-12 col-md-6">
                                <div className="contact-us-area">
                                    <h3>Contuct Us</h3>
                                    <div className="contact-s">
                                        <span><i className="fa fa-phone" aria-hidden="true"></i>Call Us</span>
                                        <p>Tel: +555 965 325</p>
                                    </div>
                                    <div className="contact-s">
                                        <span><i className="fa fa-envelope-o" aria-hidden="true"></i>Email Us</span>
                                        <p>youremail@gmail.com</p>
                                    </div>
                                    <div className="contact-s">
                                        <span><i className="fa fa-map-marker" aria-hidden="true"></i>Our Location</span>
                                        <p>123 Banena Street, London</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-6">
                                <div className="catagory-item">
                                    <div className="widget-title">
                                        <h3 className="text-left">Our Services</h3>
                                    </div>
                                    <div className="category-section">
                                        <ul>
                                            <li><Link to="/">Ocean Freight</Link></li>
                                            <li><Link to="/">Land Freight</Link></li>
                                            <li><Link to="/">Air Freight</Link></li>
                                            <li><Link to="/">Packeging & Transpotation</Link></li>
                                            <li><Link to="/">Cargo Transpotation</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="Freight-item">
                            <h3>Internation Logistics & Transport</h3>
                            <p>We Provide you the best service in the world.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
                            <img src={props.simg} alt=""/>
                            <p>We Provide you the best service in the world.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                            <div className="Freight-s">
                                <div className="Freight-img">
                                     <img src={props.simg2} alt=""/>
                                </div>
                                <div className="f-s">
                                    <span>Ipsum is that it has a more-or-less normal distribution</span>
                                    <span>The point of using Lorem Ipsum is that it has any probl</span>
                                    <span>We Provide you the best service in the world.</span>
                                    <span>It is a long established fact that a reader will do this</span>
                                    <span>Normal distribution of letters, as opposed</span>
                                    <span>We can ensure your delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default TransportAir;
