import React from 'react';
import './style.css'

const Newsletter = (props) => {
  
    const submitHandler = (e) => {
        e.preventDefault()
    }

    return(
        <section className={`${props.nwclass} wpo-newsletter-section-2 `}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <h2>Subscribe Our newsletter</h2>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                    </div>
                    <div className="col-lg-8">
                        <div className="newsletter">
                            <div className="wpo-newsletter-form">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div>
                                                <input type="text" className="form-control" placeholder="Name"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div>
                                                <input type="text" className="form-control" placeholder="Email"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <button type="submit">Subscribe</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     )
        
}

export default Newsletter;
