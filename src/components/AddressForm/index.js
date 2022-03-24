import React from 'react'
import './addressform.scss'
import 
{
    Modal
    ,Form
    ,Input
    ,Select
} 
from 'antd'
import {useForm} from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import '../../globalVar'
import {useDispatch,useSelector} from 'react-redux'
import {setCountries} from '../../redux/actions'
const NewAddress =(props)=>{
    let {visible,setVisible,userToken,isSender,type}=props
    const [t, i18n] = useTranslation();

    const [loadingCities,setLoadingCites]=React.useState(false)
    const [disableCities,setDisableCities]=React.useState(true)
    const [countryCode,setCountryCode]=React.useState(-1)
    const [form] =Form.useForm()
    const {Option} =Select
    const types=['Work','Home','Others']
    const dispatch =useDispatch()
    const {cities,countries}=useSelector((state)=>state.address)
    const {profile} =useSelector((state)=>state.profile)
   
    React.useEffect(()=>{

        fetchCountries()
    },[])

    const handleCancel=()=>{
        setVisible(false)
    }
    const handleOk=(values)=>{
        console.log(values,"ok")
        if (!isSender ) {
            if (type==="Recipient") {
                addRecipeint(values)
            }
        }
    }
    const addRecipeint=async(values)=>{
        let form ={
            name_en:values.name,
            name_ar:values.name,
            customer_id:profile.id,
            addresses:[
                {line_1:values.address_line1
                    ,line_2:values.address_line2
                    ,line_3:values.address_line3
                    ,city:values.city
                    ,country:values.country
                    ,post_code:values.post_code
                    ,state_code:values.state_code
                    ,country_code:countryCode
                    ,type:values.type
                    ,main:values.main ==="main"?0:1
                }
            ]
        }
        await fetch ( `${global.apiUrl}api/reciepients`,
        {
            method:"POST",
            headers:{
             'Authorization': `Bearer ${userToken}`
            },
            body:{...form}
            
        }

        )
    }
   const fetchCountries=async ()=>{
        await fetch(
           `https://Backend.wodex.online/api/shipping/countries`,
           {
               method:"GET",
               headers:{
                'Authorization': `Bearer ${userToken}`
               }
               
           }
       )
       .then(res=>res.json())
       .then(res=> 
        {
            dispatch({
        type:'SET_COUNTRIES',
        payload:res.payload
    })
    setDisableCities(false)
}
    )
       
       .catch(err=>console.log(err))
       

   }
   const fetchCities=async (id)=>{
       let respons = await fetch(
           `${global.apiUrl}api/shipping/cities?country_id=${id}`,
           {
               method:"GET",
               headers:{
                'Authorization': `Bearer ${userToken}`
               }
              
           },
           
       )
       .then(res=>res.json())
       .then(res=>

       { 
           dispatch({
           type:'SET_CITIES',
           payload:res.payload
       })
       setLoadingCites(false)
    })
       .catch(err=>console.log(err))
       console.log(respons)
   }
   const handleCountryChange=(e)=>{
       setLoadingCites(true)
       let obj = countries.filter(ele=>ele.country_name_en ===e)[0]
       if (!obj) return
       setCountryCode(obj.country_code)
       fetchCities(obj.id)
   }
console.log(cities)
    return (
        <Modal 
        title={type==="Address"? t("New Address"):t('Add Recipient')}
        visible={visible}
        onOk={()=>{
            form.
            validateFields()
            .then(values=>{
                handleOk(values)
            })
        }}
        onCancel={handleCancel}
       className={i18n.language === "ar"?"myModal arabicAlign":"myModal"}
       
        >
            <Form 
            form={form}
            autoComplete={false}
            labelCol={{
                span:32
            }}
            wrapperCol={{
                span:30
            }}
            initialValues={{
                remember:true
            }}
        
            layout="vertical"
            >
              <div className='row'>
               {!isSender && type ==="Recipient" &&(<div className='col-md-6'>
                    <Form.Item
                     name="name"
                     label={t('Name')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                      <Input placeholder={t('Name')}/>
                    </Form.Item>
                </div>)}
                <div className='col-md-6'>
                    <Form.Item
                     name="type"
                     label={t('Type')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                      <Select placeholder={t('Type')}
                       className={i18n.language==="ar"?"arabicAlign":"englishAlign"}
                       direction={i18n.language==="ar"?'rtl':'ltr'}>
                          {types.map((ele,index)=>{
                              return (
                                  <Option value={ele} key={index} >
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
                     name="main"
                     label={t('Main Address')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                      <Select placeholder={t('Main Address')} 
                       className={i18n.language==="ar"?"arabicAlign":"englishAlign"}
                      direction={i18n.language==="ar"?'rtl':'ltr'}>
                          <Option value={'main'}> 
                                   <div className={i18n.language==="ar"?'toRight':""}>
                                                     {t('Main')}
                                    </div>
                                    </Option>
                          <Option value={'extra'}>
                          <div className={i18n.language==="ar"?'toRight':""}>

                            {t('Extra')}
                          </div>
                          </Option>
                      </Select>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                     name="country"
                     label={t('Country')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                        <Select onChange={(e)=>handleCountryChange(e)} 
                               placeholder={t('Country')}
                               direction={i18n==="ar"?'rtl':'ltr'}
                               className={i18n.language==="ar"?"arabicAlign":"englishAlign"}>
                            {countries.map((ele,index)=>{
                                return (<Option  key={index} value={ele.country_name_en}>{ele.country_name_en}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                     name="city"
                     label={t('City')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                        <Select placeholder={t('City')} 
                                loading={loadingCities} 
                                disabled={disableCities}
                                direction={i18n.language==="ar"?'rtl':'ltr'}
                                className={i18n.language==="ar"?"arabicAlign":"englishAlign"}>
                        {cities.map((ele,index)=>{
                                return (<Option  key={index} value={ele.name_en}>{ele.name_en}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                     name="state_code"
                     label={t('State Code')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                      <Input placeholder={t('State Code')}/>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                     name="post_code"
                     label={t('Post Code')}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                      <Input placeholder={t('Post Code')}/>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                     name="address_line1"
                     label={t('Address Line')+"1"}
                     rules={[
                         {
                             required:true,
                             message:t('Required')
                         }
                     ]}
                    >
                      <Input placeholder={t('Address Line')+"1"}/>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                     name="address_line2"
                     label={t('Address Line')+"2"}
                
                    >
                      <Input placeholder={t('Address Line')+"2"}/>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item
                        name="address_line3"
                     label={t('Address Line')+"3"}
                    
                    >
                      <Input placeholder={t('Address Line')+"3"}/>
                    </Form.Item>
                </div>

              </div>
            </Form>
        </Modal>
    )
}
export default  NewAddress;