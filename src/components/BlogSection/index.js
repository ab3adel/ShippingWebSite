import React from 'react';
import {Link} from 'react-router-dom'
import blog1 from '../../images/blog/4.jpg'
import blog2 from '../../images/blog/5.jpg'
import blog3 from '../../images/blog/6.jpg'
import './style.css'

const BlogSection = () => {

    return(
        <div className="wpo-blog-style-2">
            <div className="container">
                <div className="col-l2">
                    <div className="wpo-section-title wpo-section-title-3 text-center">
                        <span>Stay With Our Blog</span>
                        <h2>Our Latest News</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="wpo-blog-item">
                            <div className="wpo-blog-img">
                                <img src={blog1} alt=""/>
                                <div className="blog-s-text">
                                    <div className="wpo-blog-content">
                                        <h3>We can ensure you about the safe delevery</h3>
                                    </div>
                                    <div className="wpo-blog-content-sub-2">
                                        <ul>
                                            <li><Link to="/blog-single">Business</Link></li>
                                            <li>October 13, 2018</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="wpo-blog-text">
                                    <div className="wpo-blog-content2">
                                        <h3><Link to="/blog-single">We can ensure you about the safe delevery</Link></h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                                        <Link to="/blog-single">Read more...</Link>
                                    </div>
                                    <div className="wpo-blog-content-sub-2">
                                        <ul>
                                            <li><Link to="/blog-single">Business</Link></li>
                                            <li>October 13, 2018</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="wpo-blog-item">
                            <div className="wpo-blog-img">
                                <img src={blog2} alt=""/>
                                <div className="blog-s-text">
                                    <div className="wpo-blog-content">
                                        <h3>We can ensure you about the safe delevery</h3>
                                    </div>
                                    <div className=" wpo-blog-content-sub-2">
                                        <ul>
                                            <li><Link to="/blog-single">Business</Link></li>
                                            <li>October 13, 2018</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="wpo-blog-text">
                                    <div className=" wpo-blog-content2">
                                        <h3><Link to="/blog-singlelog-details.html">We can ensure you about the safe delevery</Link></h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                                        <Link to="/blog-single">Read more...</Link>
                                    </div>
                                    <div className=" wpo-blog-content-sub-2">
                                        <ul>
                                            <li><Link to="/blog-single">Business</Link></li>
                                            <li>October 13, 2018</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="wpo-blog-item">
                            <div className="wpo-blog-img">
                                <img src={blog3} alt=""/>
                                <div className="blog-s-text">
                                    <div className="wpo-blog-content">
                                        <h3>We can ensure you about the safe delevery</h3>
                                    </div>
                                    <div className="wpo-blog-content-sub-2">
                                        <ul>
                                            <li><Link to="/blog-single">Business</Link></li>
                                            <li>October 13, 2018</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="wpo-blog-text">
                                    <div className="wpo-blog-content2">
                                        <h3><Link to="/blog-single">We can ensure you about the safe delevery</Link></h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                                        <Link to="/blog-single">Read more...</Link>
                                    </div>
                                    <div className="wpo-blog-content-sub-2">
                                        <ul>
                                            <li><Link to="/blog-single">Business</Link></li>
                                            <li>October 13, 2018</li>
                                        </ul>
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

export default BlogSection;
