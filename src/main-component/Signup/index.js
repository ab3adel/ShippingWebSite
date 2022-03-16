import React from 'react';

// components
// import Navbar from '../../components/Navbar'
import SignupForm from '../../components/Signup'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import abimg2 from '../../images/about/222.png'
import './Signup.css'

const Signup = () => {
    const [t, i18n] = useTranslation();
    return (
        <div>
            {/* <Navbar /> */}
            <div className={'section signupSection'}>
                <div className='container'>
                    <div className='row signupRow'>
                        <div className='col-md-8 signupFormCol'>
                            <SignupForm />
                            <img src={abimg2} className='loginImg'></img>
                        </div>
                    </div>
                </div>

            </div>

            <FooterSection />
        </div>
    )
}

export default Signup;