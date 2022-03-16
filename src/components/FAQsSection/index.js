import React from 'react';
import abimg2 from '../../images/about/222.png'
import { useTranslation } from 'react-i18next';
// import { BackdropUnstyled } from '@mui/base';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import './style.css'

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
const FAQsSection = ({ data }) => {
    const AccordionSummary = styled((props) => (

        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', fill: '#c60874' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        color: '#274091',
        '& .MuiAccordionSummary-expandIconWrapper': {
            transform: i18n.language == 'ar' ? 'rotate(180deg)' : 'rotate(0deg)',
            fill: '#274091 !important'
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
            fill: '#c60874 !important'
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));
    const [expanded, setExpanded] = React.useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [t, i18n] = useTranslation();


    return (
        <div className="FAQsSection">
            {/* <div className="container"> */}
            <div className="row m-0">
                <div className="col-lg-12   about-wrap">
                    <div className="wpo-about-content">
                        <div className="wpo-about-icon">
                            <i className="fi flaticon-travel"></i>
                        </div>

                    </div>
                    <div className=' col-sm-12 col-md-8 m-0-auto'>
                        {data.map((item, index) => {
                            return (
                                <Accordion key={item.id}
                                    expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)
                                    }>
                                    <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                                        <Typography>{i18n.language == 'ar' ? item.question_ar : item.question_en} </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {i18n.language == 'ar' ? item.answer_ar : item.answer_en}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}



                    </div>




                    <div className="signature-section">

                        <img className='faqsImg' src={abimg2} alt="" />
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div >
    )

}

export default FAQsSection;
