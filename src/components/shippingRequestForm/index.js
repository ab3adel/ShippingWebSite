
import React, { Component, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Select,Form, Input, Button, Divider } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import "../../globalVar"


export const ShippingRequestForm =(props) =>{
    const {handleFields,formFields,handleAddressForm} = props
    let history = useHistory();
    const [t, i18n] = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [succesAdd, setSuccessAdd] = useState();
    const [animat, setAnimat] = useState(false)
    const [newRecipient,setNewRecipient]=React.useState(false)
    const {Option} = Select
    const typesArr =[t('Food'),t('Tyres'),t("Cloths")]
    const addressArr=["Address 1","Address 2","Address 3"]
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
       

    };
const handleChange=(e,v)=>{
    let input =e.target
    handleFields(input.name,input.value)
   
}
const handleSelect=(e,v,n)=>{
    handleFields(n,v.children)
}
const handleAddress =(type,isSender)=>{
    handleAddressForm(type,isSender)
    setNewRecipient(true)
}
let btnName=t("Add Recipient")
let type="Recipient"

if (Boolean(formFields['Recipient'])) {
    btnName=t("Add New Address")
    type="Address"
}
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
            onChange={onFinish}
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

            <div className='row padding'>
                <div className=' col-md-6 '>

                    
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
                            validateStatus={formFields['SenderAddressError'] ? "error":""}
                            
                            
                        >
                            {/* type='email' */}
                            <Select placeholder={t('Sender Address')}
                             name="SenderAddress"
                             value={formFields["SenderAddress"]}
                            onChange={(e,v)=>handleSelect(e,v,'SenderAddress')} 
                            direction={i18n.language==="ar"?"ltr":"rtl"}
                           className={i18n.language==="ar"?"arabicAlign":"englishAlign"}
                           >
                            {addressArr.map((ele,index)=>{
                                return (
                                    <Option key={index} vlaue={ele}>
                                    <div className={i18n.language==="ar"?'toRight':""}>
                                                     {ele}
                                    </div>
                                </Option>)
                            })}
                            </Select>
                        </Form.Item>
                
                        
                
                </div>
                    <div className=" buttonContainer col-md-6 justifyBtn">

                            <Button onClick={()=>handleAddress('Address',true)} >
                            {t('Add New Address')
                            }</Button>
                    </div>
               
           
                       <Divider orientation='horizonal col-md-6'/> 
         
                       <div className='col-md-6'>

                        <Form.Item
                            label={t('Recipient')}
                            name="Recipient"
                            type='text'
                            className={'halfWidth'}
                            rules={[
                                {
                                    // type: 'email',
                                    required: true,
                                    message: t('Required'),
                                },

                            ]}
                            validateStatus={formFields['RecipientError'] ? "error":""}
                        >
                        
                            <Select 
                            value={formFields["Recipient"]}
                            placeholder={t('Recipient')} 
                            onChange={(e,v)=>handleSelect(e,v,'Recipient')} 
                            direction={i18n.language==="ar"?"rtl":"ltr"}
                            className={i18n.language==="ar"?"arabicAlign":"englishAlign"}>
                            {addressArr.map((ele,index)=>{
                                return (
                                    <Option key={index} vlaue={ele}>
                                    <div className={i18n.language==="ar"?'toRight':""}>
                                                     {ele}
                                    </div>
                                </Option>)
                            })}
                            </Select>
                        
                        </Form.Item>
                       </div>
                    

                       <div className='col-md-6'>

                        <Form.Item
                            label={t('Recipient Address')}
                            name="RecipientAddress"
                            type='text'
                            className={''}
                            rules={[
                                {
                                    // type: 'email',
                                    required: true,
                                    message: t('Required'),
                                },

                            ]}
                            validateStatus={formFields['RecipientAddressError'] ? "error":""}
                        >
                           
                                <Select 
                                disabled={!Boolean(formFields['Recipient'])}
                                value={formFields["RecipientAddress"]}
                                placeholder={t('Recipient Address')} 
                                onChange={(e,v)=>handleSelect(e,v,'RecipientAddress')} 
                                direction={i18n.language==="ar"?"rtl":"ltr"}
                                className={i18n.language==="ar"?"arabicAlign":"englishAlign"}>
                            {addressArr.map((ele,index)=>{
                                return (
                                    <Option key={index} vlaue={ele}>
                                    <div className={i18n.language==="ar"?'toRight':""}>
                                                     {ele}
                                    </div>
                                </Option>)
                            })}
                            </Select>
                            
                        </Form.Item>
                       </div>
                       

                        <div className='buttonContainer col-md-6'>

                            <Button  onClick={()=>handleAddress(type,false)} >
                                {btnName}
                            </Button>
                        </div>
                      
                      <Divider orientation='horizonal col-md-6'/>

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
                                validateStatus={formFields['TypeError'] ? "error":""}
                        >
                            

                                <Select placeholder={t('Shipment Type')}
                                 value={formFields["Type"]}
                                  onChange={(e,v)=>handleSelect(e,v,'Type')} 
                                  className={i18n.language==="ar"?"arabicAlign":"englishAlign"}
                                  >
                                {typesArr.map((ele,index)=>{
                                    return (<Option 
                                                  
                                                   key={index} 
                                                   vlaue={ele}>
                                                     
                                                   <div className={i18n.language==="ar"?'toRight':""}>
                                                     {ele}
                                                   </div>
                                                   </Option>)
                                })}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='col-md-6'>
                           <Form.Item
                                label={t('Sending Date')}
                               
                                rules={[
                                    {
                                        required: true,
                                        message:t('Required'),
                                    },
                                ]}
                                validateStatus={formFields['DateError'] ? "error":""}
                        >
                            

                               <Input 
                                name="Date"
                               type="date" 
                               value={formFields["Date"]}
                                onChange={handleChange} />
                            </Form.Item>
                        </div>
                 
                

                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Width')}
                           
                            rules={[
                                {
                                    required: true,
                                    message:t('Required'),
                                },
                            ]}
                            validateStatus={formFields['WidthError'] ? "error":""}
                        >
                        

                            <Input 
                             type="number"
                             name="Width"
                             value={formFields["Width"]}
                            placeholder={t('Width')}  
                            onChange={handleChange} />
                        </Form.Item>


                    </div>

                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Height')}
                            validateStatus={formFields['HeightError'] ? "error":""}
                        >
                            <Input 
                             value={formFields["Height"]}
                             type="number"
                             name="Height"
                            placeholder={t('Height')} 
                             onChange={handleChange} />
                        </Form.Item>


                    </div>
                
                
                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Weight')}
                            validateStatus={formFields['WeightError'] ? "error":""}
                        >
                           
                        

                            <Input  type="number"
                             name="Weight"
                             value={formFields["Weight"]}
                             placeholder={t('Weight')}  onChange={handleChange} />
                        </Form.Item>


                    </div>
                    <div className='col-md-6'>
                        <Form.Item
                            label={t('Length')}
                            validateStatus={formFields['LengthError'] ? "error":""}
                            validateTrigger={t('Required')}
                           
                        >

                            <Input type="number" 
                            placeholder={t('Length')} 
                            value={formFields["Length"]}
                            name="Length" 
                            onChange={handleChange} />
                        </Form.Item>


                    </div>
                    
                   

            </div>
        </Form>

    )
}