import React from 'react'
import {Button} from 'antd'
import { useTranslation } from 'react-i18next';
export const RequestButton =(props)=>{
let {stage,handleStage,Type}=props
const [t, i18n] = useTranslation();
let icon="";
if (Type ==="Next") {

    icon =<i class="fa fa-arrow-left" aria-hidden="true"></i>
    if (i18n.language === 'en') icon=<i class="fa fa-arrow-right" aria-hidden="true"></i>

}
else {
     icon =<i class="fa fa-arrow-right" aria-hidden="true"></i>

    if (i18n.language === 'en') icon=<i class="fa fa-arrow-left" aria-hidden="true"></i>
}
if (stage=== 2 && Type==="Next")return null
if (stage===1 && Type==="Previous") return null

    return (
       
            <div className='col-md-4 buttonContainer'>

                    <Button onClick={()=>handleStage(Type)}>
                   { stage === 3 ? Type==="Next"?
                   <>
                       
                   {t("Done")} <i class="fa fa-check" aria-hidden="true"></i>
                   </>:
                  <>
                  {t(Type)} {icon}
                  </> :
                  <>
                  {t(Type)} {icon}
                  </>
                 
                   }
                    </Button>
            </div>
     
    )
}