import React from 'react';
import {Link} from 'react-router-dom'
import BlogSidebar from '../BlogSidebar'
import blog1 from '../../images/blog-page/1.jpg'
import blog2 from '../../images/blog-details/1.jpg'
import blog3 from '../../images/blog-details/author.jpg'
import blog4 from '../../images/blog-page/6.jpg'
import blog5 from '../../images/blog-details/comment/1.jpg'
import blog6 from '../../images/blog-details/comment/2.jpg'
import './style.css'

const BlogDetailsSection = () => {

    const SubmitHandler = (e) => {
      e.preventDefault()
    }

    return(
        <div className="blog-page-area section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="blog-left-bar">
                            <div className="blog-item">
                                <div className="blog-img">
                                    <div className="blog-s2">
                                        <img src={blog1} alt=""/>
                                    </div>
                                    <ul className="post-meta">
                                        <li><img src={blog4} alt=""/></li>
                                        <li><Link to="/blog-single">By Aliza anne</Link></li>
                                        <li className="clr">logisTics</li>
                                        <li> Oct 12,2018</li>
                                    </ul>
                                </div>
                                <div className="blog-content-2">
                                    <h2>What we can do for you</h2>
                                    <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
                                    <p> No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
                                </div>
                            </div>
                            <div className="importent-section">
                                <div className="importent-img">
                                    <img src={blog2} alt=""/>
                                </div>
                                <div className="importent-text">
                                    <h2>The display is most important</h2>
                                    <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                                    <p>because it is pleasure, but because those who do not know how to pursue pleasure</p>
                                </div>
                            </div>
                            <blockquote>“Those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.”
                            </blockquote>
                            <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
                            <div className="tag-share">
                                <div className="tag">
                                    <ul>
                                        <li><Link to="/blog-single">Business</Link></li>
                                        <li><Link to="/blog-single">Corporate</Link></li>
                                        <li><Link to="/blog-single">Law</Link></li>
                                    </ul>
                                </div>
                                <div className="share">
                                    <ul>
                                        <li><Link to="/blog-single"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link to="/blog-single"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link to="/blog-single"><i className="fa fa-linkedin"></i></Link></li>
                                        <li><Link to="/blog-single"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="author-box">
                                <div className="author-avatar">
                                    <Link to="/blog-single" target="_blank"><img src={blog3} alt=""/></Link>
                                </div>
                                <div className="author-content">
                                    <Link to="/blog-single" className="author-name">Alizabeth Anne</Link>
                                    <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth,</p>
                                    <div className="socials">
                                        <ul className="social-lnk">
                                            <li><Link to="/blog-single"><i aria-hidden="true" className="fa fa-twitter"></i></Link></li>
                                            <li><Link to="/blog-single"><i aria-hidden="true" className="fa fa-facebook"></i></Link></li>
                                            <li><Link to="/blog-single"><i className="fa fa-linkedin"></i></Link></li>
                                            <li><Link to="/blog-single"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                            <div className="more-posts">
                                <div className="previous-post">
                                    <Link to="/blog-single">
                                        <span className="post-control-link"><i className="fa fa-long-arrow-left"></i>Previous post</span>
                                    </Link>
                                </div>
                                <div className="next-post">
                                    <Link to="/blog-single">
                                        <span className="post-control-link">Next post<i className="fa fa-long-arrow-right"></i></span>
                                    </Link>
                                </div>
                            </div> 
                            <div className="comments-area">
                                <div className="comments-section">
                                    <h3 className="comments-title">Comments</h3>
                                    <ol className="comments">
                                        <li className="comment even thread-even depth-1" id="comment-1">
                                            <div id="div-comment-1">
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog5} alt=""/></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single"><span className="comment-reply-link"><i className="fa fa-reply" aria-hidden="true"></i>Reply</span></Link>
                                                            </div>
                                                            <h4>John Abraham</h4>
                                                            <span className="comments-date">says Oct 15, 2017 at 11:00</span>
                                                        </div>
                                                        <div className="comment-area-sub">
                                                            <p>account of the system, and expound the actual teachings of the great explorer of the truth,</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="children">
                                                <li className="comment comment-2">
                                                    <div>
                                                        <div className="comment-theme">
                                                            <div className="comment-image"><img src={blog6} alt=""/></div>
                                                        </div>
                                                        <div className="comment-main-area">
                                                            <div className="comment-wrapper">
                                                                <div className="comments-meta">
                                                                    <div className="comments-reply">
                                                                        <Link className="comment-reply-link" to="/blog-single"><span className="comment-reply-link"><i className="fa fa-reply" aria-hidden="true"></i>Reply</span></Link>
                                                                    </div>
                                                                    <h4>Alizabeth Anne</h4>
                                                                    <span className="comments-date">says Oct 15, 2017 at 11:00</span>
                                                                </div>
                                                                <div className="comment-area-sub">
                                                                    <p>account of the system, and expound the actual teachings of the great explorer of the truth,</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        <li className="comment">
                                                            <div>
                                                                <div className="comment-theme">
                                                                    <div className="comment-image"><img src={blog5} alt=""/></div>
                                                                </div>
                                                                <div className="comment-main-area">
                                                                    <div className="comment-wrapper">
                                                                        <div className="comments-meta">
                                                                            <div className="comments-reply">
                                                                                <Link className="comment-reply-link" to="/blog-single"><span className="comment-reply-link"><i className="fa fa-reply" aria-hidden="true"></i>Reply</span></Link>
                                                                            </div>
                                                                            <h4>John Abraham</h4>
                                                                            <span className="comments-date">says Oct 15, 2017 at 11:00</span>
                                                                        </div>
                                                                        <div className="comment-area-sub">
                                                                            <p>account of the system, and expound the actual teachings of the great explorer of the truth,</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="comment">
                                            <div>
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog6} alt=""/></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single"><span className="comment-reply-link"><i className="fa fa-reply" aria-hidden="true"></i>Reply</span></Link>
                                                            </div>
                                                            <h4>John Abraham</h4>
                                                            <span className="comments-date">says Oct 15, 2017 at 11:00</span>
                                                        </div>
                                                        <div className="comment-area-sub">
                                                            <p>account of the system, and expound the actual teachings of the great explorer of the truth,</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="comment comment-5">
                                            <div>
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog5} alt=""/></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single"><span className="comment-reply-link"><i className="fa fa-reply" aria-hidden="true"></i>Reply</span></Link>
                                                            </div>
                                                            <h4>Alizabeth Anne</h4>
                                                            <span className="comments-date">says Oct 15, 2017 at 11:00</span>
                                                        </div>
                                                        <div className="comment-area-sub">
                                                            <p>account of the system, and expound the actual teachings of the great explorer of the truth,</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div> 
                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">Leave a Comment</h3>
                                    <form onSubmit={SubmitHandler} id="commentform" className="comment-form">
                                        <div className="form-textarea">
                                            <textarea id="comment" placeholder="Write Your Comments..."></textarea>
                                        </div>
                                        <div className="form-inputs">
                                            <input placeholder="Website" type="url"/>
                                            <input placeholder="Name" type="text"/>
                                            <input placeholder="Email" type="email"/>
                                        </div>
                                        <div className="form-submit">
                                            <input id="submit" value="Reply" type="submit"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <BlogSidebar/>
                    </div>
                </div>
            </div>
        </div>
     )
        
}

export default BlogDetailsSection;
