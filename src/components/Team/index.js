import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import team_1 from '../../images/team/1.jpg';
import team_2 from '../../images/team/2.jpg';
import team_3 from '../../images/team/3.jpg';

class TeamSection extends Component {
    render() {
        return (
            <div className="wpo-team-area-2">
                <div className="container">
                    <div className="col-l2">
                        <div className="wpo-section-title text-center">
                            <span>We Are With You</span>
                            <h2>Our Team Members</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-team-single">
                                <div className="wpo-team-img">
                                    <img src={team_1} alt=""/>
                                    <div className="social-1st">
                                        <ul>
                                            <li><Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                            <li><Link to="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                            <li><Link to="/"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="wpo-team-content">
                                    <h4>Elizabeth Bannet</h4>
                                    <span>Logistic Maneger</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-team-single">
                                <div className="wpo-team-img">
                                    <img src={team_2} alt=""/>
                                    <div className="social-1st">
                                        <ul>
                                            <li><Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                            <li><Link to="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                            <li><Link to="/"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="wpo-team-content">
                                    <h4>Johnthan Rok</h4>
                                    <span>Packeging Maneger</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-team-single">
                                <div className="wpo-team-img">
                                    <img src={team_3} alt=""/>
                                    <div className="social-1st">
                                        <ul>
                                            <li><Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                            <li><Link to="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                            <li><Link to="/"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="wpo-team-content">
                                    <h4>Simon D’soza</h4>
                                    <span>Logistic Maneger</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamSection;            