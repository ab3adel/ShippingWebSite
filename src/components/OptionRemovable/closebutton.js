import React from 'react'
import './closebutton.scss'


export const CloseButton =({fun,show})=> {

    return (
        <>

            {
                show && (
                    <div className="closeButton " onClick={fun}>
    
                       <i class="fa fa-window-close" aria-hidden="true"></i>
                    </div>
                )
            }
        </>
    )
}