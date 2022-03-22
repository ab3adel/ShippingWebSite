import React from 'react'
import {Button} from 'antd'
import { useTranslation } from 'react-i18next';
export const Company =(props)=>{
    const [t, i18n] = useTranslation();
    let {image,companyName,price,handleStage,whiteBackground,lightWitheBackground,handleFields}=props
    const handleOffer = ()=>{
        let data ={'OfferPrice':price,'CompanyName':companyName}
       Object.keys(data).map(ele=>{
           handleFields(ele,data[ele])
       })

        handleStage("Next")
    }
    return (
        <div className="col-md-12 row"  onMouseOver={(e)=>whiteBackground(e)}
                        onMouseLeave={(e)=>lightWitheBackground(e)}>
                <div className='col-md-4'>
                   <img src={image}></img>
                </div>
                <div className='col-md-4 d-flex flex-column justify-content-center'
                >
                  <div className="detailsContainer">
                        <div className="detail">
                            <div > {t('Name')}<span>:</span> </div>
                            <div className='bold'>{companyName}</div>
                        </div>
                        <div className='detail'>
                            <div > {t('Price')} <span>:</span> </div>
                            <div className='bold'>{price}$</div>
                        </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-column justify-content-center">
                        <div className="buttonContainer">
                           <Button onClick={()=>handleOffer()}>{t('Choose')}</Button>
                        </div>
                </div>
        </div>
    )
}