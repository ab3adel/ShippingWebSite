import React, { useState, useEffect } from 'react';

// components
// import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import CustomTabs from '../../components/CustomTabs'
import RecipientInfo from '../../components/Recipient'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import '../../globalVar'

import { useSelector, useDispatch } from 'react-redux';

const Recipient = () => {
    const [t, i18n] = useTranslation();



    return (
        <div>
            <Breadcumb bdsub={i18n.language == 'ar' ? `المستلمين` : `Recipients`} />
            <CustomTabs active={'Recipients'} />
            <RecipientInfo />
            <FooterSection />
        </div>
    )
}

export default Recipient;