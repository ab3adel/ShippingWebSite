import React from 'react';
import {Link} from 'react-router-dom'
import blog1 from '../../images/blog/1.jpg'
import blog2 from '../../images/blog/2.jpg'
import blog3 from '../../images/blog/3.jpg'
import blog5 from '../../images/blog/4.jpg'
import blog6 from '../../images/blog/5.jpg'
import blog7 from '../../images/blog/6.jpg'
import blog4 from '../../images/blog-page/6.jpg'


const BlogGrid = () => {

    return(
        <div className="blog-area blog-grid section-padding">
            <div className="container">
                <div className="col-l2">
                    <div className="section-title-1 text-center">
                        <span>From Our Blog</span>
                        <h2>Latest News</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog-item">
                            <div className="blog-img">
                               <img src={blog1} alt=""/>
                            </div>
                            <div className="blog-content">
                                <h3><Link to="/blog">Justice May For You If You Are Innocent</Link></h3>
                                <ul className="post-meta">
                                    <li><img src={blog4} alt=""/></li>
                                    <li><Link to="/blog">By Aliza anne</Link></li>
                                    <li> Oct 12,2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog-item">
                            <div className="blog-img">
                               <img src={blog2} alt=""/>
                            </div>
                            <div className="blog-content">
                                <h3><Link to="/blog">Justice May For You If You Are Innocent</Link></h3>
                                <ul className="post-meta">
                                    <li><img src={blog4} alt=""/></li>
                                    <li><Link to="/blog">By Aliza anne</Link></li>
                                    <li> Oct 12,2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog-item b-0">
                            <div className="blog-img">
                                <img src={blog3} alt=""/>
                            </div>
                            <div className="blog-content">
                                <h3><Link to="/blog">Justice May For You If You Are Innocent</Link></h3>
                                <ul className="post-meta">
                                    <li><img src={blog4} alt=""/></li>
                                    <li><Link to="/blog">By Aliza anne</Link></li>
                                    <li> Oct 12,2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog-item">
                            <div className="blog-img">
                               <img src={blog5} alt=""/>
                            </div>
                            <div className="blog-content">
                                <h3><Link to="/blog">Justice May For You If You Are Innocent</Link></h3>
                                <ul className="post-meta">
                                    <li><img src={blog4} alt=""/></li>
                                    <li><Link to="/blog">By Aliza anne</Link></li>
                                    <li> Oct 12,2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog-item">
                            <div className="blog-img">
                               <img src={blog6} alt=""/>
                            </div>
                            <div className="blog-content">
                                <h3><Link to="/blog">Justice May For You If You Are Innocent</Link></h3>
                                <ul className="post-meta">
                                    <li><img src={blog4} alt=""/></li>
                                    <li><Link to="/blog">By Aliza anne</Link></li>
                                    <li> Oct 12,2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog-item b-0">
                            <div className="blog-img">
                                <img src={blog7} alt=""/>
                            </div>
                            <div className="blog-content">
                                <h3><Link to="/blog">Justice May For You If You Are Innocent</Link></h3>
                                <ul className="post-meta">
                                    <li><img src={blog4} alt=""/></li>
                                    <li><Link to="/blog">By Aliza anne</Link></li>
                                    <li> Oct 12,2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default BlogGrid;
