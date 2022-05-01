import React from 'react'
import Base64Downloader from 'react-base64-downloader'


export const Base64File =({url}) =>{



    return (
        <div className="col-sm-6 col-md-4 col-lg-4">
        <Base64Downloader  base64={url} downloadName="dhlpdf">
            click to download
        </Base64Downloader>
        </div>
    )
}