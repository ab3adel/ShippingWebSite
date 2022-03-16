import React, { useState, useEffect } from 'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'

import FAQsSection from '../../components/FAQsSection'

import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import '../../globalVar'

const Faqs = () => {
    const [t, i18n] = useTranslation();
    const [data, setData] = useState('')
    useEffect(() => {
        const fetchFAQs = async (e) => {
            try {
                const responsee = await fetch(
                    `${global.apiUrl}api/faq`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );
                const response = await responsee.json();
                console.log('FAQs', response);
                if (response.success) {
                    setData(response.payload)
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchFAQs()
    }, [])
    return (
        <div>
            {/* <Navbar /> */}
            <Breadcumb bdtitle={i18n.language == 'ar' ? `الأسئلة مكررة` : `Frequently Asked Questions`} bdsub={i18n.language == 'ar' ? `الاسئلة المكررة` : `FAQs`} />

            {data && <FAQsSection data={data} />}

            <FooterSection />
        </div>
    )
}

export default Faqs;