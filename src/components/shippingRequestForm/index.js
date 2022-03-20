
import React, { Component, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Select,Form, Input, Button, Divider } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import "../../globalVar"


export const ShippingRequestForm =(props) =>{
    const {setVisible} = props
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [animat, setAnimat] = useState(false)
    const [loading,setLoading]=React.useState(false)
    const {Option} = Select
    const typesArr =[t('Food'),t('Tyres'),t("Cloths")]
    const addressArr=["Address 1","Address 2","Address 3"]
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        if (values.password != values.password_confirmation) {
            setAnimat(!animat)
            setErrorMessage({
                credentials: i18n.language == 'ar' ?
                    `كلمة المرور وتأكيد كلمة المرور غير متطابقين`
                    :
                    `Password and confirm password don't match`
            })


            const timer = setTimeout(() => { setErrorMessage('') }, 8000);
            return () => clearTimeout(timer);
        }
        else {
            onSubmit(values)
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onSubmit = async (data) => {
        console.log(JSON.stringify({ data }))
        setErrorMessage('')
        setSuccessAdd('')
        setLoading(true)

        try {
            const responsee = await fetch(
                `${global.apiUrl}api/register`,
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
                setAnimat(!animat)
                setSuccessAdd(i18n.language == 'ar' ? `نجاح` : `Success`)
                setLoading(false)
                form.resetFields();

                const timer = setTimeout(() => { setSuccessAdd('') }, 8000);
                await localStorage.setItem(
                    "token",
                    JSON.stringify(response.payload.access_token)
                );
                history.push('/')
                return () => clearTimeout(timer);

            }
            else {
                setLoading(false)
                setAnimat(!animat)
                setErrorMessage(response.errors)


                const timer = setTimeout(() => { setErrorMessage('') }, 8000);
                return () => clearTimeout(timer);

            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
        // reset({})
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 30,
            }}
            wrapperCol={{
                span: 32,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            autoComplete="off"
            layout="vertical"
        >
            <Fade top spy={animat} duration={1000} >
                <div>

                    {succesAdd && <>

                        <Alert message={succesAdd} type="success" showIcon />
                    </>

                    }
                </div>
            </Fade>
            <Fade top spy={animat} duration={1000} >
                <div>

                    {errorMessage && <>

                        {Object.keys(errorMessage).map((item, i) => (
                            <Alert message={errorMessage[item]} type="error" showIcon />
                        ))}

                    </>

                    }
                </div>
            </Fade>

            <div className='row'>
                <div className=' col-md-12 centerContent'>

                    
                        <Form.Item
                            label={t('Sender Address')}
                            name="SenderAddress"
                            // type='email'
                            rules={[
                                {
                                    required: true,
                                    message: t('Required'),
                                },

                            ]}
                            className={'halfWidth'}
                        >
                            {/* type='email' */}
                            <Select placeholder={t('Sender Address')} >
                            {addressArr.map((ele,index)=>{
                                return (<Option key={index} vlaue={ele}>{ele}</Option>)
                            })}
                            </Select>
                        </Form.Item>
                
                    <div className=" buttonContainer">

                            <Button onClick={()=>setVisible(true)} >{t('Add New Address')}</Button>
                    </div>
                        
                
                </div>
               
                <div className=' col-md-12 centerContent'>

                      
                        <Form.Item
                            label={t('Recipient Address')}
                            name="RecipientAddress"
                            type='text'
                            className={'halfWidth'}
                            rules={[
                                {
                                    // type: 'email',
                                    required: true,
                                    message: t('Required'),
                                },

                            ]}
                        >
                            {/* type='email' */}
                            <Select placeholder={t('Sender Address')} >
                            {addressArr.map((ele,index)=>{
                                return (<Option key={index} vlaue={ele}>{ele}</Option>)
                            })}
                            </Select>
                        </Form.Item>
                        

                    
            
                       <div className='buttonContainer'>

                          <Button  onClick={()=>setVisible(true)} >{t('Add New Address')}</Button>
                       </div>
                    
                 
               </div>
         

                    
                        <div className="col-md-6">

                            <Form.Item
                                label={t('Shipment Type')}
                                name="ShipmentType"
                                rules={[
                                    {
                                        required: true,
                                        message:t('Required'),
                                    },
                                ]}
                            >

                                <Select placeholder={t('Shipment Type')} >
                                {typesArr.map((ele,index)=>{
                                    return (<Option key={index} vlaue={ele}>{ele}</Option>)
                                })}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='col-md-6'>
                           <Form.Item
                                label={t('Sending Date')}
                                name="SendingDate"
                                rules={[
                                    {
                                        required: true,
                                        message:t('Required'),
                                    },
                                ]}
                            >

                               <Input type="date" />
                            </Form.Item>
                        </div>
                 
                

                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Width')}
                            name="Width"
                            rules={[
                                {
                                    required: true,
                                    message:t('Required'),
                                },
                            ]}
                        >

                            <Input placeholder={t('Width')} />
                        </Form.Item>


                    </div>

                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Height')}
                            name="Height"
                        >

                            <Input placeholder={t('Height')} />
                        </Form.Item>


                    </div>
                
                
                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Weight')}
                            name="customer[company]"
                        >

                            <Input placeholder={t('Weight')} />
                        </Form.Item>


                    </div>
                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Lenght')}
                            name="Lenght"
                        >

                            <Input placeholder={t('Lenght')} />
                        </Form.Item>


                    </div>
                    
                   

            </div>






           
        </Form>

    )
}