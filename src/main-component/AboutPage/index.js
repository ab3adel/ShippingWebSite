import React, { useState, useEffect } from 'react';

// components
// import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'
import Features2 from '../../components/features2'
import AboutSection2 from '../../components/about2'
import AboutSection4 from '../../components/about4'
// import Mission from '../../components/Mission'
// import TeamSection from '../../components/Team'
// import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import '../../globalVar'

const Aboutpage = () => {
    const [t, i18n] = useTranslation();
    const [data, setData] = useState('')
    useEffect(() => {
        const fetchAbout = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/aboutus`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );
                const response = await responsee.json();
                console.log('fetchAbout', response);
                if (response.success) {
                    setData(response.payload)
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchAbout()
    }, [])
    return (
        <div>
            {/* <Navbar /> */}
            <Breadcumb bdtitle={i18n.language === 'ar' ? `من نحن` : `About Us`} bdsub={i18n.language === 'ar' ? `من نحن` : `About Us`} />
            <Features2 />
            {/* <AboutSection2 /> */}
            {data && <AboutSection4 data={data} />}
            {/* <Mission /> */}
            {/* <TeamSection /> */}
            {/* <Newsletter nwclass={'wpo-newsletter-section'} /> */}
            <FooterSection />
        </div>
    )
}

export default Aboutpage;