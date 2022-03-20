import React, { useState, useEffect } from 'react';

// components
// import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import CustomTabs from '../../components/CustomTabs'
import RecipientsInfo from '../../components/Recipients'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import '../../globalVar'

import { useSelector, useDispatch } from 'react-redux';

const Recipients = () => {
    const [t, i18n] = useTranslation();

    const profile = useSelector((state) => state.profile)

    return (
        <div>
            <Breadcumb bdsub={i18n.language == 'ar' ? `المستلمين` : `Recipients`} />
            <CustomTabs active={'Recipients'} />
            <RecipientsInfo />
            <FooterSection />
        </div>
    )
}

export default Recipients;