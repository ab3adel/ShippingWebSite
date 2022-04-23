
import React, { Component, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Select, Form, Input, Button, Divider } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import MyAddress from './MyAddress';
import "../../globalVar"


export const ShippingRequestForm = (props) => {
    const { errorMessage, countries, profile, typesArr, recipients, handleFields, formFields, handleAddressForm, myAddress } = props
    let history = useHistory();
    const [t, i18n] = useTranslation();

    const [succesAdd, setSuccessAdd] = useState();
    const [animat, setAnimat] = useState(false)
    const [newRecipient, setNewRecipient] = React.useState(false)
    const { Option } = Select
    // const typesArr = [t('Food'), t('Tyres'), t("Cloths")]
    let [addressArr, setAddressArr] = useState([])
    let [activeAddress, setActiveAddress] = useState()
    const formRef = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
    useEffect(async () => {
        formFields.Recipient && await setAddressArr(recipients ? recipients.filter(item => item.id === formFields.Recipient)[0].addresses : [])
        formRef.current && formRef.current.setFieldsValue({
            ...formFields,
            Country: formFields.Country !== '' ? formFields.Country : null,
            RecipientAddress: formFields.RecipientAddress !== '' ? formFields.RecipientAddress : null,
            Recipient: formFields.Recipient !== '' ? formFields.Recipient : null,
            Type: formFields.Type != '' ? formFields.Type : null,
            Category: formFields.Category !== '' ? formFields.Category : null,


        })
    })

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        console.log('Success:', values);


    };
    const handleChange = (e, v) => {
        let input = e.target
        handleFields(input.name, input.value)

    }
    const handleSelect = async (e, v, n) => {
        // handleFields(n, v.children)
        await handleFields(n, v.value)
        if (n && n === "Recipient") {
            await setAddressArr(recipients ? recipients.filter(item => item.id === v.value)[0].addresses : [])
            // handleFields('RecipientAddress', '')

            formRef.current.setFieldsValue({

                RecipientAddress: null,
            })
            setActiveAddress()

        }
        if (n && n === "RecipientAddress" && v.value !== '') {
            setActiveAddress(addressArr.filter(item => item.id == v.value)[0])
            console.log("RecipientAddress", addressArr.filter(item => item.id == v.value)[0])
        }

    }
    function onSearch(val) {
        console.log('search:', val);
    }
    const handleAddress = (type, isSender) => {
        handleAddressForm(type, isSender)
        setNewRecipient(true)
    }
    let btnName = t("Add Recipient")
    let type = "Recipient"

    if (Boolean(formFields['Recipient'])) {
        btnName = `${t("Add New Address")} ${i18n.language === 'ar' ? "للمرسل إليه" : "To Recipient"}`
        type = "Address"
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
            ref={formRef}
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


            <div className='row padding'>
                {myAddress === "EMPTY" &&
                    <>
                        <div className=' col-md-8 warningForEnterAddress '>
                            {i18n.language === "ar" ?
                                "يجب إدخال عنوانك من أجل ارسال الشحنات"
                                :
                                "You Must Add Your Address To Send Shipments"}
                        </div>
                        <div className=' col-md-4 '>
                            <div className=" buttonContainer justifyBtn ">

                                <Button className="col-md-12 addInFormBTN"
                                    onClick={() => handleAddress('Address', true)
                                        // history.push('/Addresses')

                                    } >
                                    {t('Add New Address')}
                                </Button>
                            </div>
                        </div>
                    </>
                }
                {myAddress && myAddress !== "EMPTY" &&
                    <>
                        <div className=' col-md-12   '>
                            <div className='col-md-12 formLabel'><i class="fa fa-map-marker" aria-hidden="true"></i> {i18n.language === "ar" ? "عنوانك :" : "Your Address :"} </div>
                            <MyAddress myAddress={myAddress} />
                        </div>
                    </>
                }

                {/* <Form.Item
                            label={t('Sender Address')}
                            name="SenderAddress"
                           
                            rules={[
                                {
                                    required: true,
                                    message: t('Required'),
                                },
                            ]}
                            className={'halfWidth'}
                            validateStatus={formFields['SenderAddressError'] ? "error":""}
                            
                            
                        >
                           
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
                        </Form.Item> */}




                {/* <div className=" buttonContainer col-md-6 justifyBtn">

                            <Button onClick={()=>handleAddress('Address',true)} >
                            {t('Add New Address')
                            }</Button>
                    </div> */}


                <Divider orientation='horizonal col-md-6' />
                <div className=' col-md-12   '>
                    <div className='col-md-12 formLabel'><i class="fa fa-user" aria-hidden="true"></i> {i18n.language === "ar" ? "معلومات المرسل إليه :" : "Recipient Informations :"} </div>

                </div>
                <div className='col-md-6'>

                    <Form.Item
                        label={t('Recipient')}
                        name="Recipient"
                        type='text'
                        className={'halfWidth'}
                        value={formFields["Recipient"]}
                        rules={[
                            {
                                required: true,
                                message: t('Required'),
                            },

                        ]}
                        validateStatus={formFields['RecipientError'] ? "error" : ""}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            value={formFields["Recipient"]}
                            placeholder={t('Recipient')}
                            onChange={(e, v) => handleSelect(e, v, 'Recipient')}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {recipients && recipients !== "EMPTY" && recipients.map((item) => {
                                return (<Option key={item.id} value={item.id}>
                                    {i18n.language === 'ar' ? item.name_ar : item.name_en}{' / '}{item.phone}
                                </Option>)
                            })}


                        </Select>
                        {/* <Select
                            value={formFields["Recipient"]}
                            placeholder={t('Recipient')}
                            onChange={(e, v) => handleSelect(e, v, 'Recipient')}
                            direction={i18n.language === "ar" ? "rtl" : "ltr"}
                            className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}>
                            {addressArr.map((ele, index) => {
                                return (
                                    <Option key={index} vlaue={ele}>
                                        <div className={i18n.language === "ar" ? 'toRight' : ""}>
                                            {ele}
                                        </div>
                                    </Option>)
                            })}
                        </Select> */}

                    </Form.Item>
                </div>


                <div className='col-md-6'>

                    <Form.Item
                        label={t('Recipient Address')}
                        name="RecipientAddress"
                        value={formFields["RecipientAddress"]}

                        className={''}
                        rules={[
                            {
                                required: true,
                                message: t('Required'),
                            },

                        ]}
                        validateStatus={formFields['RecipientAddressError'] ? "error" : ""}
                    >

                        <Select
                            disabled={!Boolean(formFields['Recipient'])}
                            value={formFields["RecipientAddress"]}
                            placeholder={t('Recipient Address')}
                            onChange={(e, v) => handleSelect(e, v, 'RecipientAddress')}
                            direction={i18n.language === "ar" ? "rtl" : "ltr"}
                            className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}>
                            {addressArr.length > 0 && addressArr.map((ele, index) => {
                                return (
                                    <Option key={ele.id} vlaue={ele.id}>
                                        <div className={i18n.language === "ar" ? 'toRight' : ""}>
                                            {`${ele.city.country.country_name_en} (${ele.country_code}) / ${ele.city.name_en} / ${ele.city.country.id === 117 ? `${JSON.parse(ele.line_1).Area} / ${JSON.parse(ele.line_1).Block} / ${JSON.parse(ele.line_2).Street}`
                                                :
                                                ele.line_1
                                                }`
                                            }
                                        </div>
                                    </Option>)
                            })}
                        </Select>

                    </Form.Item>
                </div>



                {!activeAddress && <div className='buttonContainer col-md-6'>
                    <div className=" buttonContainer justifyBtn ">

                        <Button className="col-md-7 addInFormBTN"
                            onClick={() =>
                                handleAddress(type, false)
                                //     history.push(
                                //     !Boolean(formFields['Recipient']) ?
                                //         '/Recipients'
                                //         :
                                //         `/Recipient/${formFields['Recipient']}`
                                // )

                            } >
                            {btnName}
                        </Button>
                    </div>
                    {/* <Button onClick={() => handleAddress(type, false)} >
                        {btnName}
                    </Button> */}
                </div>}
                {activeAddress &&
                    <>
                        <div className='col-md-12 formLabel'> {i18n.language === "ar" ?
                            "معلومات المرسل إليه :"
                            :
                            "Recipent Information :"}
                        </div>
                        <MyAddress myAddress={activeAddress} />
                    </>
                }
                <Divider orientation='horizonal col-md-6' />
                <div className=' col-md-12   '>
                    <div className='col-md-12 formLabel'><i class="fa fa-truck" aria-hidden="true"></i> {i18n.language === "ar" ? "معلومات الشحنة :" : "Shipment Informations :"} </div>

                </div>

                <div className=" col-6 col-xs-6 col-sm-6 col-md-6 col-lg-3">

                    <Form.Item
                        label={t('Packaging Type')}
                        name="Type"
                        value={formFields.Type}
                        rules={[
                            {
                                required: true,
                                message: t('Required'),
                            },
                        ]}
                        validateStatus={formFields['TypeError'] ? "error" : ""}
                    >

                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder={t('Packaging Type')}
                            value={formFields.Type}
                            onChange={(e, v) => handleSelect(e, v, 'Type')}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {typesArr && typesArr.map((item) => {
                                return (<Option key={item.id} value={item.name_en}>
                                    {i18n.language === 'ar' ? item.name_ar : item.name_en}
                                </Option>)
                            })}


                        </Select>
                        {/* <Select placeholder={t('Packaging Type')}
                            value={formFields["Type"]}
                            onChange={(e, v) => handleSelect(e, v, 'Type')}
                            className={i18n.language === "ar" ? "arabicAlign" : "englishAlign"}
                        >
                            {typesArr.map((ele, index) => {
                                return (<Option

                                    key={index}
                                    vlaue={ele}>

                                    <div className={i18n.language === "ar" ? 'toRight' : ""}>
                                        {ele}
                                    </div>
                                </Option>)
                            })}
                        </Select> */}
                    </Form.Item>
                </div>
                <div className=" col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3">

                    <Form.Item
                        label={t('Category')}
                        name="Category"
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['CategoryError'] ? "error" : ""}
                    >
                        <Select
                            placeholder={t('Category')}
                            value={formFields["Category"]}
                            onChange={(e, v) => handleSelect(e, v, 'Category')}
                            listItemHeight={10} listHeight={250}
                        >
                            {profile && profile.customer && profile.customer.categories.map((item) => {
                                return (<Option key={item.id} value={item.id}>
                                    {i18n.language === 'ar' ? item.name_ar : item.name_en}
                                </Option>)
                            })}


                        </Select>
                    </Form.Item>
                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        label={t('NumberOfPieces')}
                        name='NumberOfPieces'
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['NumberOfPiecesError'] ? "error" : ""}
                    >
                        <Input
                            name="NumberOfPieces"
                            type="number"
                            min="1"
                            placeholder={t('NumberOfPieces')}
                            value={formFields["NumberOfPieces"]}
                            onChange={handleChange} />
                    </Form.Item>
                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        label={t('Hermonized')}
                        name='Hermonized'
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['HermonizedError'] ? "error" : ""}
                    >
                        <Input
                            name="Hermonized"
                            placeholder={t('Hermonized')}
                            value={formFields["Hermonized"]}
                            onChange={handleChange} />
                    </Form.Item>
                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        label={`${t('CustomsAmount')}`}
                        name='CustomsAmount'
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['CustomsAmountError'] ? "error" : ""}
                    >
                        <Input
                            name="CustomsAmount"
                            type="number"
                            min="0"
                            max='100'
                            placeholder={`(${i18n.language === 'ar' ? "د.ك" : "KWD"})`}
                            value={formFields["CustomsAmount"]}
                            onChange={handleChange} />
                    </Form.Item>
                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        label={`${t('UnitPrice')}`}
                        name='Price'
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['PriceError'] ? "error" : ""}
                    >
                        <Input
                            name="Price"
                            type="number"
                            min="1"
                            placeholder={`(${i18n.language === 'ar' ? "د.ك" : "KWD"})`}
                            value={formFields["Price"]}
                            onChange={handleChange} />
                    </Form.Item>
                </div>
                <div className='  col-md-6 col-lg-3'>
                    <Form.Item
                        label={t('Sending Date')}
                        name='Date'
                        rules={[
                            {
                                required: true,
                                message: t('Required'),
                            },
                        ]}
                        validateStatus={formFields['DateError'] ? "error" : ""}
                    >


                        <Input
                            name="Date"
                            type="date"
                            value={formFields["Date"]}
                            onChange={handleChange} />
                    </Form.Item>
                </div>
                <div className='col-md-6 col-lg-3'>

                    <Form.Item
                        label={t('provenance country')}
                        name="Country"
                        type='text'
                        className={'halfWidth'}
                        rules={[
                            { required: true, message: t('Required'), },]}
                        validateStatus={formFields['CountryError'] ? "error" : ""}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            value={formFields["Country"]}
                            placeholder={t('provenance country')}
                            onChange={(e, v) => handleSelect(e, v, 'Country')}
                            onSearch={onSearch}
                            listItemHeight={10} listHeight={250}
                        >
                            {countries && countries.map((item) => {
                                return (<Option key={item.id} value={item.country_code}>{item.country_name_en}{' / '}{item.country_code}</Option>)
                            })}


                        </Select>
                    </Form.Item>
                </div>

                <Divider orientation='horizonal col-md-6' />
                <div className=' col-md-12   '>
                    <div className='col-md-12 formLabel'><i class="fa fa-cube" aria-hidden="true"></i> {i18n.language === "ar" ? "الأبعاد :" : "Dimensions :"} </div>

                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        label={`${t('Width')} (${i18n.language === 'ar' ? "سم" : "CM"})`}
                        name="Width"
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['WidthError'] ? "error" : ""}
                    >


                        <Input
                            type="number"
                            name="Width"
                            min='0'
                            value={formFields["Width"]}
                            placeholder={t('Width')}
                            onChange={handleChange} />
                    </Form.Item>


                </div>

                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        name="Height"

                        label={`${t('Height')} (${i18n.language === 'ar' ? "سم" : "CM"})`}
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['HeightError'] ? "error" : ""}
                    >
                        <Input
                            value={formFields["Height"]}
                            type="number"
                            name="Height"
                            min='0'
                            placeholder={t('Height')}
                            onChange={handleChange} />
                    </Form.Item>


                </div>



                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        min='0'
                        name="Length"
                        label={`${t('Length')} (${i18n.language === 'ar' ? "سم" : "CM"})`}
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['LengthError'] ? "error" : ""}
                        validateTrigger={t('Required')}

                    >

                        <Input type="number"
                            placeholder={t('Length')}
                            value={formFields["Length"]}
                            name="Length"
                            onChange={handleChange} />
                    </Form.Item>


                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        name="Weight"
                        value={formFields["Weight"]}
                        label={`${t('Weight')} (${i18n.language === 'ar' ? "كجم" : "KG"})`}
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['WeightError'] ? "error" : ""}
                    >



                        <Input type="number"
                            name="Weight"
                            min='0'
                            max='67'
                            value={formFields["Weight"]}
                            placeholder={t('Weight')} onChange={handleChange} />
                    </Form.Item>


                </div>
                <Fade top spy={animat} duration={1000} >
                    <div className='col-md-12'>

                        {errorMessage && <>

                            {Object.keys(errorMessage).map((item, i) => (
                                <Alert message={errorMessage[item]} type="error" showIcon />
                            ))}

                        </>

                        }
                    </div>
                </Fade>

            </div>
        </Form>

    )
}