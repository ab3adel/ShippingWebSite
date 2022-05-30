import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


const MyAddress = ({ myAddress }) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="row myAddressRow">
            <div className=" addressDetail ">
                <strong className='colStart'></strong>

                <strong className='addrssTitle'>{i18n.language === 'ar' ? 'الدولة : ' : "Country : "}</strong>
                <strong className=" f-w-400">{i18n.language === 'ar' ? myAddress.city.country.country_name_ar ? myAddress.city.country.country_name_ar : myAddress.city.country.country_name_en : myAddress.city.country.country_name_en}{' / '}{myAddress.country_code}
                </strong>
            </div>
            <div className="addressDetail">
                <strong className='colStart'></strong>

                <strong className='addrssTitle'>{i18n.language === 'ar' ? 'المدينة : ' : "City : "}</strong>
                <strong className="  f-w-400">{i18n.language === 'ar' ? myAddress.city.name_ar ? myAddress.city.name_ar : myAddress.city.name_en : myAddress.city.name_en}
                </strong>
            </div>

            {myAddress.city.country_id === 117 ?
                <>
                    <div className="addressDetail">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{t('Area')} {" : "}</strong>

                        <strong className="  f-w-400">{JSON.parse(myAddress.line_1).Area}
                        </strong>
                    </div>
                    <div className="addressDetail">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{t('Block')} {" : "}</strong>
                        <strong className=" f-w-400">{JSON.parse(myAddress.line_1).Block}
                        </strong>
                    </div>
                    {JSON.parse(myAddress.line_1).Jaddah ? <div className="addressDetail">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{t('Jaddah')} {" : "}</strong>
                        <strong className=" f-w-400">{JSON.parse(myAddress.line_1).Jaddah}
                        </strong>
                    </div> : null}
                    <div className="addressDetail">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{t('Street')} {" : "}</strong>
                        <strong className="  f-w-400">{JSON.parse(myAddress.line_2).Street}
                        </strong>
                    </div>
                    <div className=" addressDetail">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{t('Building')} {" : "}</strong>
                        <strong className="  f-w-400">{JSON.parse(myAddress.line_2).Building}
                        </strong>
                    </div>

                </>
                :
                <>
                    <div className="addressDetail  ">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{i18n.language == 'ar' ? `العنوان الكامل` : `Full Address`} {" : "}</strong>
                        <strong className=" f-w-400">{myAddress.line_1}
                        </strong>
                    </div>
                    {myAddress.line_2 && <div className="addressDetail ">
                        <strong className='colStart'></strong>

                        <strong className='addrssTitle'>{i18n.language == 'ar' ? `علامات مميزة للعنوان` : `Distinctive signs of address`} {" : "}</strong>

                        <strong className="  f-w-400">{myAddress.line_2}
                        </strong>
                    </div>}
                    {myAddress.line_3 && <div className=" addressDetail ">

                        <strong className="  f-w-400">{myAddress.line_3}
                        </strong>
                    </div>}
                </>

            }





        </div>
    )
}

export default MyAddress;