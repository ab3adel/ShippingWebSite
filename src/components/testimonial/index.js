import React, { Component } from 'react';
import Slider from "react-slick";
import './style.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import testimonialImg_1 from '../../images/testimonial/2.jpg';

class Testimonial extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1200,
            slidesToShow: 1,
            arrows: false,
            margin:50,
            autoplay:true,
            slidesToScroll: 1,
            centerPadding: 30,
            focusOnSelect: false,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        };
        return (
            <div className="wpo-testimonial-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="wpo-testimonial-active owl-carousel">
                                <Slider {...settings}>
                                    <div className="wpo-testimonial-wrap">
                                        <div className="wpo-testimonial-img">
                                            <img src={testimonialImg_1} alt=""/>
                                        </div>
                                        <div className="wpo-testimonial-item">
                                            <div className="wpo-testimonial-content">
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
                                                <h4>Manela Watson</h4>
                                                <span>Derector of ATV</span>
                                            </div>
                                        </div>
                                        <div className="test-c d-none d-lg-block"></div>
                                        <div className="test-b d-none d-lg-block"></div>
                                    </div>
                                    <div className="wpo-testimonial-wrap">
                                        <div className="wpo-testimonial-img">
                                            <img src={testimonialImg_1} alt=""/>
                                        </div>
                                        <div className="wpo-testimonial-item">
                                            <div className="wpo-testimonial-content">
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
                                                <h4>Manela Watson</h4>
                                                <span>Derector of ATV</span>
                                            </div>
                                        </div>
                                        <div className="test-c d-none d-lg-block"></div>
                                        <div className="test-b d-none d-lg-block"></div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Testimonial;            