import React, { useState, useEffect } from 'react';

import { Link, useHistory, useParams } from 'react-router-dom'

import '../../globalVar';

import './styleBills.scss'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Invoice from './invoice'





const BillInfo = ({ match }) => {

    const { id, token } = useParams();
    const [loading, setLoading] = useState(true)
    const [working, setWorking] = useState(true)
    let history = useHistory();

    useEffect(() => {

        fetchOffer();

    }, [])

    const fetchOffer = () => {
        fetch(`${global.apiUrl}api/offers?offer_id=${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                },
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    new Promise((resolve) => {
                        setActiveBill(res.payload)
                        resolve(true)
                    }).then(setTimeout(() => { handleExportWithFunction() }, 1000)

                    )

                }
            })
            .catch(err => console.log(err))
    }


    const [activeBill, setActiveBill] = useState('')



    const handleExportWithFunction = () => {
        const input = document.getElementById('PDFCONT');
        // , {
        //     scale: 2,

        // }
        html2canvas(input)
            .then((canvas) => {
                var width = canvas.width;
                var height = canvas.height;
                var millimeters = {
                    width: 0,
                    height: 0,
                };
                millimeters.width = Math.floor(width * 0.264583);
                millimeters.height = Math.floor(height * 0.264583);

                var imgData = canvas.toDataURL(
                    'image/png');
                var doc = new jsPDF("p", "mm", [millimeters.width, millimeters.height]);

                doc.addImage(imgData, 'PNG', 0, 0);
                doc.save(`${new Date().toISOString().toString().slice(0, 19)}.pdf`);

                setTimeout(() => { setLoading(false) }, 1000)
            }).then(setTimeout(() => { setWorking(false) }, 2000))
            ;

    }
    return (
        <div className="section bilsSection">
            <div className="loadexport">{working ? <>
                {loading ? <i className="fa fa-spinner fa-spin" ></i> :
                    <div>Downloading...</div>
                }
            </> : <>    <div> Done</div></>} </div>

            {activeBill ?
                <div style={{ height: '0px', overflow: 'hidden' }} >
                    <Invoice bill={activeBill && activeBill} />
                </div> : null}

        </div>

    )

}

export default BillInfo;
