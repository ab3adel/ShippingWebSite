import React from 'react';

// components
// import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'

import Contactpage from '../../components/Contactpage'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';


const ContactPage = () => {
    const [t, i18n] = useTranslation();
    return (
        <div>
            {/* <Navbar /> */}
            <Breadcumb bdtitle={i18n.language == 'ar' ? `اتصل بنا` : `Contact Us`}
                bdsub={i18n.language == 'ar' ? `تواصل` : `Contact`} />
            <Contactpage />
            <FooterSection />
        </div>
    )
}

export default ContactPage;