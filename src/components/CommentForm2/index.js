import React, { Component, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Fade from 'react-reveal/Fade';
import "../../globalVar"
const ContactForm2 = () => {
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [loading, setLoading] = useState('')
    const [animat, setAnimat] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();



    const onSubmit = async (data) => {
        console.log(JSON.stringify({ data }))
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/contacts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': 'https://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),

                }
            );
            const response = await responsee.json();
            if (response.success) {
                setLoading(false)
                setSuccessAdd(t('succes'))
                setAnimat(!animat)
                const timer = setTimeout(() => { setSuccessAdd('') }, 8000);
                reset()
                return () => clearTimeout(timer);

            }
            else { setErrorMessage(response.messages) }
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
        // reset({})
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contact-form form-style row">
                <div className="col-12 col-lg-6">
                    <input type="text"   {...register("name", { required: true })} placeholder={t('Name')} id="fname" name="name" />
                    <p>{errors.name && t('Name is required.')}</p>
                </div>
                <div className="col-12  col-lg-6">
                    <input type="email" placeholder={t('Email')} {...register("email", { required: true })} id="email" name="email" />
                    <p>{errors.email && t('Email is required.')}</p>
                </div>

                <div className="col-12  col-lg-12">
                    <input type="text" placeholder={t('Subject')}  {...register("subject", { required: true })} id="adress" name="subject" />
                    <p>{errors.subject && t('Subject is required.')}</p>
                </div>
                <div className="col-12 col-sm-12">
                    <textarea className="contact-textarea"  {...register("message", { required: true })} placeholder={t('Message')} name="message"></textarea>
                    <p>{errors.message && t('Message is required.')}</p>
                </div>
                {succesAdd && <>
                    <div className='col-12 col-sm-12 col-md-12 p-2   animatemsg'>
                        <Fade left spy={animat} duration={1000} >
                            <p className='successMsg'>{t('succes')}</p>
                        </Fade>
                    </div></>}
                <div className="col-12">
                    <button type="submit" className="theme-btn">{t('Send Message')}
                        {loading && <>{' '}  <i className="fa fa-spinner fa-spin" ></i></>}
                    </button>

                </div>
            </div>
        </form>
    )

}



export default ContactForm2;