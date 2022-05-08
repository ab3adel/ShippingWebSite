
import React from 'react'


export const Field =(props)=>{
let {title,content,nestedKey,unit}=props
let theContent=content

if ( nestedKey && theContent !== null) {
    if (typeof(content) === 'number'){

        theContent=nestedKey[content]
    }
    else if (typeof (content) === "boolean") {
        if (content) {
            theContent=nestedKey[1]
        }
        else {
            theContent=nestedKey[0]
        }
    }
    else {
        for (let i of nestedKey) {
            theContent=theContent[i]  
        }
        
    }
}

    return (
        <div className="col-sm-6 col-md-4 col-lg-4">
        <p className="m-b-10 f-w-600">

            {title}
        </p>
        <h6 className="text-muted f-w-400">{theContent  || "-"}  {unit}</h6>
    </div>
    )
}