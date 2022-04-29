import './infolabel.scss'
import React from 'react'


export const InfoLabel =({infoText}) =>{
const [showText,setShowText]=React.useState(false)

return (
    <div className='infoContainer' 
    onMouseOver={()=>setShowText(true)}
    onMouseOut={()=>setShowText(false)}
    onTouchStart={()=>setShowText(true)}
    onTouchEnd ={()=>setShowText(false)}>

    {showText &&
      (<div className="infoLabel" >
      <p>
        {infoText}
      </p>
         
      </div>)
      }
      <i className="fa fa-info" aria-hidden="true"></i>
    </div>
)
}