import React from 'react'
import {Button} from 'antd'
import { useTranslation } from 'react-i18next';
export const RequestButton =(props)=>{
let {stage,handleStage}=props
const [t, i18n] = useTranslation();
if (stage === 2)return null
    return (
        <div className="row nextStage">
            <div className='col-md-8 buttonContainer'>

                    <Button onClick={()=>handleStage()}>
                   { stage ===1 ?
                   <>

                   {t('Next')} <i class="fa fa-arrow-right" aria-hidden="true"></i>
                   </>
                   :
                   <>
                       
                   {t("Done")} <i class="fa fa-check" aria-hidden="true"></i>
                   </>
                   }
                    </Button>
            </div>
      </div>
    )
}