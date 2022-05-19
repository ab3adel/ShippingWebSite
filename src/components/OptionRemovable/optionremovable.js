import React from 'react'
import { CloseButton } from './closebutton'



export const OptionRemovable = ({ option, show, fun, setSelectedIndex }) => {


    return (
        <div className="d-flex" onClick={setSelectedIndex}>

            {/* {option} */}
            <CloseButton fun={fun}
                show={show} />
        </div>
    )
}