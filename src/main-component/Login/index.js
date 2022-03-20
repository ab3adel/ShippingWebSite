import React from 'react';

// components
// import Navbar from '../../components/Navbar'


import LoginForm from '../../components/Login'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import abimg2 from '../../images/about/222.png'
import './login.css'

const Login = () => {
    const [t, i18n] = useTranslation();
    return (
        <div>

            <div className={'section loginSection'}>
                <div className='container'>
                    <div className='row loginRow'>
                        <div className='col-md-5 loginFormCol'>
                            <LoginForm />
                            <img src={abimg2} className='loginImg'></img>
                        </div>
                    </div>
                </div>

            </div>

            <FooterSection />
        </div>
    )
}

export default Login;