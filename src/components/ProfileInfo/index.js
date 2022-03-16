import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import './style.css'

const ProfileInfo = () => {
    const profile = useSelector((state) => state.profile.profile)
    console.log('profileStateRedux', profile)
    return (
        <div className="section">
            <div className='container' >
                <div className='row'>

                </div>

            </div>
        </div>
    )

}

export default ProfileInfo;
