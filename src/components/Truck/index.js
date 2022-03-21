import React from 'react';
import logo from '../../images/logo/logo33.png'
import './style.css'
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
  
const TruckArea = (props) => {

    let history = useHistory();
    const [t, i18n] = useTranslation();
    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <section className="wpo-track-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="track">
                            <h3>
                                {i18n.language == 'ar' ?
                                    "أدخل رقم التتبع وتتبع شحنتك"
                                    :
                                    "Enter Tracking Number and Track Your Cargo"
                                }

                            </h3>
                            <div className="wpo-tracking-form">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        {/* <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control"

                                                    placeholder={i18n.language == 'ar' ?
                                                        "البريد الالكتروني"
                                                        :
                                                        "Email"
                                                    } />
                                            </div>
                                        </div> */}
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control"
                                                    placeholder={i18n.language == 'ar' ?
                                                        "رقم التتبع"
                                                        :
                                                        "Tracking Number"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6" style={{ textAlign: 'start' }}>
                                            <button type="submit">
                                                {i18n.language == 'ar' ?
                                                    "تتبع شحنتك"
                                                    :
                                                    "Track Your Cargo"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 sendCArgo ">
                        <div className="track">

                            <h3 style={{ textAlign: 'center' }}>
                                {i18n.language == 'ar' ?
                                    "يمكنك إرسال شحنة"
                                    :
                                    "You Can Send a Shipment"
                                }

                            </h3>
                            <button type="submit" className='sendCargobt' onClick={()=>{history.push('/shippingrequest')}}>
                                <img src={logo} alt="" className='sendLogo' />
                                {i18n.language == 'ar' ?
                                    "ارسل شحنة"
                                    :
                                    "Send a Cargo"
                                }
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </section>
    )

}

export default TruckArea;
