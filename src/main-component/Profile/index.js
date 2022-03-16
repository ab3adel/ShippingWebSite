import React, { useState, useEffect } from 'react';

// components
// import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import CustomTabs from '../../components/CustomTabs'
import ProfileInfo from '../../components/ProfileInfo'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import '../../globalVar'

import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const [t, i18n] = useTranslation();
    const [data, setData] = useState('')
    const profile = useSelector((state) => state.profile)

    return (
        <div>
            <Breadcumb bdsub={i18n.language == 'ar' ? `الملف الشخصي` : `Profile`} />
            <CustomTabs active={'profile'} />
            <ProfileInfo />
            <FooterSection />
        </div>
    )
}

export default Profile;