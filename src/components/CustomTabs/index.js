import React from 'react';

import { Link } from 'react-router-dom'

import './style.css'
import { useTranslation } from 'react-i18next';

const CustomTabs = ({ active }) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="section TabsSection">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <div className={`col-md-2 singleTabCont ${active == 'profile' ? 'activeCont' : ''}  `}>
                        <Link to='/Profile' className={`tabLink  ${active == 'profile' ? 'ActiveTabLInk' : ''}`}>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            {i18n.language == 'ar' ? `الملف الشخصي` : `Profile`}
                        </Link>
                    </div>
                    <div className="col-md-2 singleTabCont   ">
                        <Link to='/Profile' className='tabLink  '>
                            <i class="fa fa-users" aria-hidden="true"></i>

                            {i18n.language == 'ar' ? `المستلمين` : `Recipients`}
                        </Link>
                    </div>
                    <div className="col-md-2 singleTabCont   ">
                        <Link to='/Profile' className='tabLink  '>
                            <i class="fa fa-indent bellICon" aria-hidden="true"></i>
                            {i18n.language == 'ar' ? `الفواتير` : `Bills`}
                        </Link>
                    </div>
                    <div className="col-md-2 singleTabCont   ">
                        <Link to='/Profile' className='tabLink  '>
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            {i18n.language == 'ar' ? `العناوين` : `Addresses`}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CustomTabs;
