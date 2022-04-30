import React, { useState, useEffect } from 'react';
import { Result, Button } from 'antd';
// components

import FooterSection from '../../components/Footer'
import { useTranslation } from 'react-i18next';
import './res.scss'

const Success = () => {
    const [t, i18n] = useTranslation();

    return (
        <div className='resDiv'>
            <Result
                dir='rtl'
                direction='rtl'
                status="success"
                title={i18n.language === 'ar' ?
                    "تمت عملية الدفع بنجاح"
                    :
                    "Payment Completed Successfully"

                }
                subTitle={
                    i18n.language === 'ar' ?
                        "سيتواصل معك فريق ووديكس في وقت قريب من اجل اتمام عملية الشحن ،، كن صبورا من فضلك ، شكرا لك "
                        :

                        "Wodex team will contact you shortly in order to complete the shipping process,, Be patient please, thank you"

                }
            // extra={[
            //     <Button type="primary" key="console">

            //     </Button> 

            // ]}
            />
            <FooterSection />
        </div>
    )
}

export default Success;