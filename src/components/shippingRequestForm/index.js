
import React, { Component, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Select, Form, Input, Button, Divider, DatePicker } from 'antd';
import { Alert } from 'antd';
import Fade from 'react-reveal/Fade';
import MyAddress from './MyAddress';
import "../../globalVar"
import { InfoLabel } from '../InfoLabel/infolabel'
import { OptionRemovable } from '../OptionRemovable/optionremovable'


export const ShippingRequestForm = (props) => {
    const { errorMessage, countries,
        profile, typesArr, recipients, handleFields,
        formFields, handleAddressForm, myAddress, handleChangeDate } = props
    let history = useHistory();
    const [t, i18n] = useTranslation();

    const [succesAdd, setSuccessAdd] = useState();
    const [animat, setAnimat] = useState(false)
    const [newRecipient, setNewRecipient] = React.useState(false)
    const { Option } = Select
    // const typesArr = [t('Food'), t('Tyres'), t("Cloths")]
    let [addressArr, setAddressArr] = useState([])
    let [activeAddress, setActiveAddress] = useState()
    let [btnTypeName, setBtnTypeName] = useState({ type: "Recipient", btnName: t("Add Recipient") })
    let [selectedIndex, setSelectedIndex] = useState(-1)
    const formRef = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm();
    const [form] = Form.useForm();
    // Select components arrays 
    let DocumentedOptions = [{ val: true, item: t('Documented') }, { val: false, item: t('NotDocumented') }]
    let shipmentPurposes = [{ val: "GIFT", item: t("GIFT") }, { val: "NOT_SOLD", item: t("NOT_SOLD") }
        , { val: "PERSONAL_EFFECTS", item: t("PERSONAL_EFFECTS") }
        , { val: "REPAIR_AND_RETURN", item: t("REPAIR_AND_RETURN") }
        , { val: "SAMPLE", item: t("SAMPLE") }, { val: "SOLD", item: t("SOLD") }
        , { val: "COMMERCIAL", item: t("COMMERCIAL") }, { val: "RETURN_AND_REPAIR", item: t("RETURN_AND_REPAIR") }
        , { val: "PERSONAL_USE", item: t('PERSONAL_USE') }]


    useEffect(async () => {
        formFields.Recipient && await setAddressArr(recipients ? recipients.filter(item => item.id === formFields.Recipient)[0].addresses : [])
        formRef.current && formRef.current.setFieldsValue({
            ...formFields,
            Country: formFields.Country !== '' ? formFields.Country : null,
            RecipientAddress: formFields.RecipientAddress !== '' ? formFields.RecipientAddress : null,
            Recipient: formFields.Recipient !== '' ? formFields.Recipient : null,
            Type: formFields.Type != '' ? formFields.Type : null,
            Category: formFields.Category !== '' ? formFields.Category : null,
            DocumentShipment: formFields.DocumentShipment !== '' ? formFields.DocumentShipment : null,
            ShipmentPurpose: formFields.ShipmentPurpose !== '' ? formFields.ShipmentPurpose : null,

        })
    })
    useEffect(() => {

        if (Boolean(formFields['Recipient'])) {
            let btnName = `${t("Add New Address")} ${i18n.language === 'ar' ? "للمرسل إليه" : "To Recipient"}`
            let type = "Address"
            setBtnTypeName(pre => ({ ...pre, btnName, type }))
        }
        else {
            let type = "Recipient"
            let btnName = t("Add Recipient")

            setBtnTypeName(pre => ({ ...pre, type, btnName }))
        }


    }, [formFields])
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {



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

        }

    }
    function onSearch(val) {
        console.log('search:', val);
    }
    const handleAddress = (type, isSender) => {
        handleAddressForm(type, isSender)
        setNewRecipient(true)
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
                            // onSearch={onSearch}

                            listItemHeight={10} listHeight={250}
                            optionLabelProp="label"

                        >
                            {recipients && recipients !== "EMPTY" && recipients.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}
                                        label={
                                            <>
                                                <div className={'d-flex selectLabel'}>
                                                    {i18n.language === 'ar' ? item.name_ar ? item.name_ar : item.name_en : item.name_en}
                                                    <i className="fa fa-close" aria-hidden="true"
                                                        onClick={() => handleFields('Recipient', "")} ></i>
                                                </div>
                                            </>

                                        }
                                    >
                                        {i18n.language === 'ar' ? item.name_ar + ' / ' : item.name_en + ' / '} <span dir='ltr'>{item.phone}</span>
                                        {/* <OptionRemovable
                                            // option={i18n.language === 'ar' ? item.name_ar + ' / ' + item.phone : item.name_en + ' / ' + item.phone}
                                            show={formFields['Recipient'] && index === selectedIndex}
                                            fun={() => handleFields('Recipient', "")}
                                            setSelectedIndex={() => setSelectedIndex(index)}
                                        /> */}
                                    </Option>)
                            })}


                        </Select>


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
                                console.log (addressArr)
                                return (
                                    <Option key={ele.id} vlaue={ele.id}>
                                        <div className={i18n.language === "ar" ? 'toRight' : ""}>
                                            {
                                                ele.city ?
                                                `${ele.city.country.country_name_en} (${ele.country_code}) / ${ele.city.name_en} / ${ele.city.country.id === 117 ? `${JSON.parse(ele.line_1).Area} / ${JSON.parse(ele.line_1).Block} / ${JSON.parse(ele.line_2).Street}`
                                                :
                                                ele.line_1
                                                }`
                                                :''
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
                                handleAddress(btnTypeName.type, false)
                                //     history.push(
                                //     !Boolean(formFields['Recipient']) ?
                                //         '/Recipients'
                                //         :
                                //         `/Recipient/${formFields['Recipient']}`
                                // )

                            } >
                            {btnTypeName.btnName}
                        </Button>
                    </div>
                    {/* <Button onClick={() => handleAddress(type, false)} >
                        {btnName}
                    </Button> */}
                </div>}
                {activeAddress &&
                    <>
                        <div className=' col-md-12   '>
                            <div className='col-md-12 formLabel'><i class="fa fa-map-marker" aria-hidden="true"></i> {i18n.language === "ar" ? "عنوان المرسل اليه :" : "Recipient Address:"} </div>
                            <MyAddress myAddress={activeAddress} />
                        </div>
                        {/* <div className='col-md-12 formLabel'> {i18n.language === "ar" ?
                            "معلومات المرسل إليه :"
                            :
                            "Recipent Information :"}
                        </div>
                        <MyAddress myAddress={activeAddress} /> */}
                    </>
                }
                <Divider orientation='horizonal col-md-6' />
                <div className=' col-md-12   '>
                    <div className='col-md-12 formLabel'><i class="fa fa-truck" aria-hidden="true"></i> {i18n.language === "ar" ? "معلومات الشحنة :" : "Shipment Informations :"} </div>

                </div>

                <div className=" col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4">

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
                <div className=" col-6 col-xs-6 col-sm-6  col-md-6 col-lg-4">

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
                {/* <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-4'>
                    <Form.Item
                        label={t('NumberOfPieces')}
                        name='NumberOfPieces'
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['NumberOfPiecesError'] ? "error" : ""}
                        help={<InfoLabel
                            infoText={t('NumberOfPiecesDescription')} />}
                    >

                        <Input
                            name="NumberOfPieces"
                            type="number"
                            min="1"
                            placeholder={t('NumberOfPieces')}
                            value={formFields["NumberOfPieces"]}
                            onChange={handleChange} />
                    </Form.Item>

                </div> */}
                {/* <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-4'>
                    <Form.Item
                        label={t('groupPackageCount')}
                        name='GroupPackageCount'
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['GroupPackgeCount'] ? "error" : ""}

                    >

                        <Input
                            name="GroupPackageCount"
                            type="number"
                            min="1"
                            placeholder={t('groupPackageCount')}
                            value={formFields["GroupPackageCount"]}
                            onChange={handleChange} />
                    </Form.Item>

                </div> */}
                {/* <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-4'>
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
                </div> */}

                {/* <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
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
                            // max='100'
                            placeholder={`(${i18n.language === 'ar' ? "د.ك" : "KWD"})`}
                            value={formFields["CustomsAmount"]}
                            onChange={handleChange} />
                    </Form.Item>
                </div> */}

                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-4'>
                    <Form.Item
                        label={`${t('CustomsAmount')}`}
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
                <div className='  col-md-6 col-lg-4 col-sm-6'>
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
                        <DatePicker
                            dropdownClassName="datePopUP"
                            className=""
                            name="Date"
                            placeholder={t('Sending Date')}
                            value={formFields["Date"]}
                            onChange={(date, dateString) => handleChangeDate(date, dateString)} />

                        {/* <Input
                            name="Date"
                            type="date"
                            value={formFields["Date"]}
                            onChange={handleChange} /> */}
                    </Form.Item>
                </div>
                {/* <div className='col-md-6 col-lg-4 col-sm-6'>

                    <Form.Item
                        label={t('DocumentShipment')}
                        name="DocumentShipment"
                        type='text'
                        className={'halfWidth'}
                        rules={[
                            { required: true, message: t('Required'), },]}
                        validateStatus={formFields['DocumentShipmentError'] ? "error" : ""}
                    >
                        <Select
                            placeholder={t('DocumentShipment')}
                            // optionFilterProp="children"
                            value={formFields["DocumentShipment"]}

                            onChange={(e, v) => handleSelect(e, v, 'DocumentShipment')}

                            listItemHeight={10} listHeight={250}
                        >
                            {DocumentedOptions.map((ele, index) => {
                                return (<Option key={index} value={ele.val}>{ele.item}</Option>)
                            })}


                        </Select>
                    </Form.Item>
                </div> */}

                <Divider orientation='horizonal col-md-6' />
                <div className=' col-md-12   '>
                    <div className='col-md-12 formLabel'><i class="fa fa-cube" aria-hidden="true"></i> {i18n.language === "ar" ? "الأبعاد :" : "Dimensions :"} </div>

                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        name="Weight"
                        value={formFields["Weight"]}
                        label={`${t('Weight')} (${i18n.language === 'ar' ? "كجم" : "KG"})`}
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['WeightError'] ? "error" : ""}
                        help={<InfoLabel infoText={t("WeightDescription")} />}
                    >



                        <Input
                            type="number"
                            name="Weight"
                            min='0.00'
                            max='67.00'
                            value={formFields["Weight"]}
                            step="0.5"

                            // stringMode
                            placeholder={t('Weight')} onChange={handleChange} />
                    </Form.Item>


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
                            disabled={formFields.Type === "BAG" || formFields.Type === "ENVELOPE"}
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
                            disabled={formFields.Type === "BAG" || formFields.Type === "ENVELOPE"}
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
                            disabled={formFields.Type === "BAG" || formFields.Type === "ENVELOPE"}
                            placeholder={t('Length')}
                            value={formFields["Length"]}
                            name="Length"
                            onChange={handleChange} />
                    </Form.Item>


                </div>
                <div className='col-6 col-xs-6 col-sm-6  col-md-6 col-lg-3'>
                    <Form.Item
                        min='0'
                        name="ActualWeight"
                        label={`${t('ActualWeight')} (${i18n.language === 'ar' ? "كغ" : "KG"})`}
                        rules={[{ required: true, message: t('Required'), },]}
                        validateStatus={formFields['LengthError'] ? "error" : ""}
                        validateTrigger={t('Required')}
                        help={<InfoLabel infoText={t("ActualWeightDescription")} />}
                    >

                        <Input type="number"
                            disabled={true}
                            placeholder={t('ActualWeight')}
                            value={formFields["ActualWeight"]}
                            name="ActualWeight"
                            onChange={handleChange} />
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