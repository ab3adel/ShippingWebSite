import React from 'react';

// components
// import Navbar from '../../components/Navbar'

import BillInfo from '../../components/Bills/exportInvoice'
import FooterSection from '../../components/Footer'

import '../../globalVar'



const Bill = () => {


    return (
        <div>

            <BillInfo />
            <FooterSection />
        </div>
    )
}

export default Bill;