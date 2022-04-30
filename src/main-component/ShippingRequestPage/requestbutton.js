import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next';
export const RequestButton = (props) => {
    let { stage, handleStage, Type, loading, saveOffer, disableButton } = props
    const [t, i18n] = useTranslation();
    let icon = "";
    const handleButtonFunction = (type) => {

        if (stage === 3 && Type === "Next") {
            saveOffer()
        }
        else {
            handleStage(type)

        }

    }
    if (Type === "Next") {

        icon = <i class="fa fa-arrow-left" aria-hidden="true"></i>
        if (i18n.language === 'en') icon = <i class="fa fa-arrow-right" aria-hidden="true"></i>

    }
    else {
        icon = <i class="fa fa-arrow-right" aria-hidden="true"></i>

        if (i18n.language === 'en') icon = <i class="fa fa-arrow-left" aria-hidden="true"></i>
    }
    if (stage === 2 && Type === "Next") return null

    if (stage === 1 && Type === "Previous") return null

    return (

        <div className='col-md-4 buttonContainer'>

            <Button onClick={() => handleButtonFunction(Type)} className='col-md-12' disabled={loading || disableButton}>
                {stage === 3 ?
                    Type === "Next" ?
                        <>

                            {t("Save")}{loading ? <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></> : <i class="fa fa-check" aria-hidden="true"></i>}
                        </> :
                        <>
                            {t(Type)} {loading ? <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></> : icon}
                        </> :
                    <>
                        {t(Type)} {loading ? <>{'  '}  <i className="fa fa-spinner fa-spin" ></i></> : icon}
                    </>

                }
            </Button>
        </div>

    )
}