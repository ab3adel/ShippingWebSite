import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next';
import { PersonPinSharp } from '@mui/icons-material';
export const Company = (props) => {
    const [t, i18n] = useTranslation();
    let { deliveryDate, setActiveOffer,
        success, msg, image, companyName, price
        , handleStage, whiteBackground, lightWitheBackground
        , handleFields } = props
    const handleOffer = async () => {
        setActiveOffer({
            'image': image,
            'OfferPrice': price,
            'CompanyName': companyName
        })

        // await Object.keys(data).map(async (ele) => {
        //     await handleFields(ele, data[ele])
        // })
        handleFields(pre =>
        (
            {
                ...pre
                , company_id: props.company_id
                , serviceType: props.serviceType
                , serviceName: props.serviceName
                , serviceId: props.serviceId
                , serviceCode: props.serviceCode
                , delivery_date_time: deliveryDate
                , signatureOptionType: props.signatureOptionType
                , required_documents: props.required_documents
                , totalNetCharge: price

            }

        )
        )

        handleStage("Next")

    }
    return (
        <div className="col-md-6 col-lg-4 p-1  mx-0 my-2  " >
            <div className='col-md-12 m-auto  companyParent ' onMouseOver={(e) => whiteBackground(e)}
                onMouseLeave={(e) => lightWitheBackground(e)}>
                <div className='col-md-11 text-center m-auto'>
                    <img src={image}></img>
                </div>
                <div className='col-md-11 d-flex m-auto flex-column justify-content-center p-0'
                >
                    <div className="detailsContainer  ">
                        <div className="detail mx-auto">
                            {/* <div > {t('Name')}<span>:</span> </div> */}
                            <div className='bold'>{companyName}</div>
                        </div>

                        {success ? <>
                            <div className='detail    '>
                                <div className='col-6 textStart p-0'> {t('Price')} <span>:</span> </div>
                                <div className='col-6 textStart px-2 bold'>
                                    {price.toFixed(2)}

                                    {i18n.language === 'ar' ? "(د.ك)" : "(KWd)"}
                                </div>
                            </div>
                            <div className="detail">
                                <div className='col-6 textStart p-0'> {t('Delivery Date')}<span>:</span> </div>
                                <div className='col-6 textStart px-2 bold'>{deliveryDate ? deliveryDate : "-"}</div>
                            </div>
                            <div className="detail note mx-auto">
                                {/* <div > </div> */}
                                {/* <div className='bold'> */}
                                {/* {t('P.S')} <span>:</span> */}
                                ({companyName === 'Aramex' ? t('NoTax') : t('Tax')})
                                {/* </div> */}
                            </div>
                        </>
                            :
                            <div className='detail mx-auto'>

                                <div className='bold'>{t("NoResponse")} </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-md-7 d-flex flex-column justify-content-center m-auto">
                    {/* <div className="buttonContainer  text-center"> */}
                    {success && <Button className='addInFormBTN col-md-12' onClick={() => handleOffer()}>{t('Choose')}</Button>}
                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}