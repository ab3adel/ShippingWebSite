import React, { useState, useEffect } from 'react';

// components

import Breadcumb from '../../components/breadcumb'
// import Features2 from '../../components/features2'
// import AboutSection2 from '../../components/about2'
import AboutSection4 from '../../components/about4'
// import Mission from '../../components/Mission'
// import TeamSection from '../../components/Team'
// import Newsletter from '../../components/Newsletter'
import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import '../../globalVar'

const Terms = () => {
    const [i18n] = useTranslation();
    const [data, setData] = useState('')
    useEffect(() => {
        const fetchAbout = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/getPageByTitle?title=Terms And Conditions`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );
                const response = await responsee.json();

                if (response.success) {
                    setData(response.payload[0])
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchAbout()
    }, [])
    return (
        <div>

            <Breadcumb bdtitle={i18n.language === 'ar' ? `الشروط والأحكام` : `Terms and Conditions`}
                bdsub={i18n.language === 'ar' ? `الشروط و الأحكام` : `Terms and Conditions`}
            />

            {data && <AboutSection4 data={data} />}

            <FooterSection />
        </div>
    )
}

export default Terms;