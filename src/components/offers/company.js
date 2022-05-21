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
        handleFields(pre=>
            (
                {
                    ...pre
                ,company_id:props.company_id
                ,serviceType:props.serviceType
                ,serviceName:props.serviceName
                ,serviceId:props.serviceId
                ,serviceCode:props.serviceCode
                ,delivery_date_time:deliveryDate
                ,signatureOptionType:props.signatureOptionType
                ,required_documents:props.required_documents
                ,totalNetCharge:price
                
            }
                
                )
            )

        handleStage("Next")
        
    }
    return (
        <div className="col-md-12 row p-0 m-0" onMouseOver={(e) => whiteBackground(e)}
            onMouseLeave={(e) => lightWitheBackground(e)}>
            <div className='col-md-3 text-center'>
                <img src={image}></img>
            </div>
            <div className='col-md-7 d-flex flex-column justify-content-center p-0'
            >
                <div className="detailsContainer p-0">
                    <div className="detail">
                        <div > {t('Name')}<span>:</span> </div>
                        <div className='bold'>{companyName}</div>
                    </div>
                    {deliveryDate && <div className="detail">
                        <div > {t('Delivery Date')}<span>:</span> </div>
                        <div className='bold'>{deliveryDate}</div>
                    </div>}
                    {success ?
                        <div className='detail p-0 '>
                            <div > {t('Price')} <span>:</span> </div>
                            <div className='bold'>
                                {price.toFixed(2)}
                                {/* {price.toString().slice(0, 5)} */}
                                {i18n.language === 'ar' ? "(د.ك)" : "(KWd)"}
                             </div>
                             <div className="note">
                              
                                ({companyName === 'Aramex' ? t('NoTax') :t('Tax')})
                             </div>

                        </div>
                        :
                        <div className='detail'>

                            <div className='bold'>{t("NoResponse")} </div>
                        </div>
                    }
                </div>
            </div>
            <div className="col-md-2 d-flex flex-column justify-content-center">
                <div className="buttonContainer  text-center">
                    {success && <Button onClick={() => handleOffer()}>{t('Choose')}</Button>}
                </div>
            </div>
        </div>
    )
}