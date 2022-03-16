import React, { Component, } from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './style.css'
import { useTranslation } from 'react-i18next';


const SimpleSlider = () => {
    const [t, i18n] = useTranslation();
    const settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // rtl: true,
        autoplaySpeed: 2500,
        fade: true,
        vertical: true,
        // slideHeight: 0,
    }

    return (
        <section className="hero hero-slider-wrapper hero-style-1">
            <div className="hero-slider"  >
                <Slider {...settings}>
                    <div className="slide1 slide">
                        <div className="container">
                            <div className="row">
                                <div className="col col-lg-9 slide-caption">
                                    <h2>
                                        <span> {i18n.language == 'ar' ? 'نحن نقدم أفضل الحلول' : 'We Provide the Best Solution'}</span><br></br>
                                        <span> {i18n.language == 'ar' ? 'من أجل نقلياتك.' : 'For Your Transport.'}</span></h2>
                                    <div className="btns">
                                        <div className="btn-style"><Link to="/">{i18n.language == 'ar' ? 'اتصل بنا الآن' : 'Contact us now'}</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide2 slide">
                        <div className="container">
                            <div className="row">
                                <div className="col col-lg-9 slide-caption">
                                    <h2>
                                        <span> {i18n.language == 'ar' ? 'نحن نقدم أفضل الحلول' : 'We Provide the Best Solution'}</span><br></br>
                                        <span> {i18n.language == 'ar' ? 'من أجل نقلياتك.' : 'For Your Transport.'}</span></h2>
                                    <div className="btns">
                                        <div className="btn-style"><Link to="/">{i18n.language == 'ar' ? 'اتصل بنا الآن' : 'Contact us now'}</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide3 slide">
                        <div className="container">
                            <div className="row">
                                <div className="col col-lg-9 slide-caption">
                                    <h2>
                                        <span> {i18n.language == 'ar' ? 'نحن نقدم أفضل الحلول' : 'We Provide the Best Solution'}</span><br></br>
                                        <span> {i18n.language == 'ar' ? 'من أجل نقلياتك.' : 'For Your Transport.'}</span></h2>
                                    <div className="btns">
                                        <div className="btn-style"><Link to="/">{i18n.language == 'ar' ? 'اتصل بنا الآن' : 'Contact us now'}</Link></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );

}

export default SimpleSlider;