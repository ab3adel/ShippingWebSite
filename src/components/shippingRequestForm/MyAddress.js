import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


const MyAddress = ({ myAddress }) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="row myAddressRow">
            <div className=" addressDetail ">

                <h6 className=" f-w-400">{myAddress.city.country.country_name_en}{' / '}{myAddress.country_code}
                </h6>
            </div>
            <div className="addressDetail">

                <h6 className="  f-w-400">{myAddress.city.name_en}
                </h6>
            </div>

            {myAddress.city.country_id === 117 ?
                <>
                    <div className="addressDetail">

                        <h6 className="  f-w-400">{JSON.parse(myAddress.line_1).Area}
                        </h6>
                    </div>
                    <div className="addressDetail">

                        <h6 className=" f-w-400">{JSON.parse(myAddress.line_1).Block}
                        </h6>
                    </div>
                    {JSON.parse(myAddress.line_1).Jaddah ? <div className="addressDetail">

                        <h6 className=" f-w-400">{JSON.parse(myAddress.line_1).Jaddah}
                        </h6>
                    </div> : null}
                    <div className="addressDetail">

                        <h6 className="  f-w-400">{JSON.parse(myAddress.line_2).Street}
                        </h6>
                    </div>
                    <div className=" addressDetail">

                        <h6 className="  f-w-400">{JSON.parse(myAddress.line_2).Building}
                        </h6>
                    </div>

                </>
                :
                <>
                    <div className="addressDetail  ">

                        <h6 className=" f-w-400">{myAddress.line_1}
                        </h6>
                    </div>
                    {myAddress.line_2 && <div className="addressDetail ">

                        <h6 className="  f-w-400">{myAddress.line_2}
                        </h6>
                    </div>}
                    {myAddress.line_3 && <div className=" addressDetail ">

                        <h6 className="  f-w-400">{myAddress.line_3}
                        </h6>
                    </div>}
                </>

            }





        </div>
    )
}

export default MyAddress;