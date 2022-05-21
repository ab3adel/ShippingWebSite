import { fabClasses } from "@mui/material";
import React from "react";
import { getI18n } from 'react-i18next'

export const details = {
    offerInfo: [
        { key: 'id', nestedKey: null, name: 'ID', unit: '' },
        { key: 'payment_id', nestedKey: null, name: getI18n().language === "ar" ? 'معرف الدفع' : "Payment ID" },
        {
            key: 'documentShipment', nestedKey: {
                0: getI18n().language === "ar" ? 'غير ورقية' : "Not Documents",
                1: getI18n().language === "ar" ? 'مستندات' : "Documents"
            }
            , name: getI18n().language === "ar" ? 'شحنة مستندات' : 'Documents Shipment'
        },
        { key: 'offer_id', nestedKey: null, name: getI18n().language === "ar" ? 'معرف الشحنة' : "Shipment ID" },
        // { key: 'profit_percentage', nestedKey: null, name: getI18n().language === "ar" ? 'نسبة الربح' : "Profit Percentage" },
        { key: 'company', nestedKey: getI18n().language === "ar" ? ['name_ar'] : ['name_en'], name: getI18n().language === "ar" ? 'الشركة' : 'Company' },
        { key: 'totalNetCharge', nestedKey: null, name: getI18n().language === "ar" ? 'المبلغ' : 'The Price', unit: getI18n().language === 'ar' ? "د.ك" : "KWD" },
        { key: 'ship_date', nestedKey: null, name: getI18n().language === "ar" ? 'تاربخ الارسال' : 'Shipment Date' },
        { key: 'delivery_date_time', nestedKey: null, name: getI18n().language === "ar" ? 'تاريخ الاستلام' : 'Delivery Date ' },
        {
            key: 'paid', nestedKey: {
                0: getI18n().language === "ar" ? 'غير مدفوعة' : 'Not Paid',
                1: getI18n().language === "ar" ? 'مدفوعة' : "Paid"

            }
            , name: getI18n().language === "ar" ? 'حالة الدفع' : 'Payment Status'
        },
        {
            key: 'accepted', nestedKey: {
                0: getI18n().language === "ar" ? 'مرفوضة' : "Not Accepted",
                1: getI18n().language === "ar" ? 'مقبولة' : "Accepted"
            }
            , name: getI18n().language === "ar" ? 'الموافقة' : 'ِAccepted'
        },
        {
            key: 'active', nestedKey:
            {
                0: getI18n().language === "ar" ? 'غير فعالة' : "Unactive",
                1: getI18n().language === "ar" ? 'فعالة' : 'Active'
            }
            , name: getI18n().language === "ar" ? 'الحالة' : 'Status'
        },
        { key: 'offer_expiration_date', nestedKey: null, name: getI18n().language === "ar" ? 'تاريخ انتهاء العرض' : 'Offer Expiration Date' },
        { key: 'payer', nestedKey: null, name: getI18n().language === "ar" ? 'الدافع' : 'The Payer' },


    ],
    shipmentInfo: [
        { key: 'NumberOfPieces', nestedKey: null, name: getI18n().language === "ar" ? "عدد القطع" : "Number of Pieces" },
        { key: 'category', nestedKey: getI18n().language === 'ar' ? ['name_ar'] : ['name_en'], name: getI18n().language === "ar" ? "نوع الشحنة" : "Shipment Type" },
        // { key: 'groupPackageCount', nestedKey: null, name: getI18n().language === "ar" ? "عدد البكج" : "Packages Count" },
        // { key: 'harmonizedCode', nestedKey: null, name: getI18n().language === "ar" ? "رمز التناغم" : "Harmonized Code" },
        { key: 'height', nestedKey: null, name: getI18n().language === "ar" ? "الارتفاع" : "Height", unit: getI18n().language === 'ar' ? "سم" : "CM" },
        { key: 'length', nestedKey: null, name: getI18n().language === "ar" ? "الطول" : "Length", unit: getI18n().language === 'ar' ? "سم" : "CM" },
        { key: 'width', nestedKey: null, name: getI18n().language === "ar" ? "العرض" : "Width", unit: getI18n().language === 'ar' ? "سم" : "CM" },
        { key: 'weight', nestedKey: null, name: getI18n().language === "ar" ? "الوزن" : "Weight", unit: getI18n().language === 'ar' ? "كجم" : "KG" },
        { key: 'subPackagingType', nestedKey: null, name: getI18n().language === "ar" ? "نوع التغليف" : "Packaging Type" },
        // { key: 'shipmentPurpose', nestedKey: null, name: getI18n().language === 'ar' ? "غرض الشحنة" : "Shipment Purpose" }
    ],
    senderInfo: [
        { key: 'name', nestedKey: null, name: getI18n().language === "ar" ? 'الاسم' : 'Name' },
        { key: 'email', nestedKey: null, name: getI18n().language === "ar" ? 'ايميل' : 'Email' },
        { key: 'customer', nestedKey: ['phone'], name: getI18n().language === "ar" ? 'هاتف' : 'Phone' },

    ],
    recipientInfo: [
        {
            key: 'recipient', nestedKey: getI18n().language === "ar" ? ['recipient', 'name_ar'] : ['recipient', 'name_en']
            , name: getI18n().language === "ar" ? 'الاسم' : 'Name'
        },
        { key: 'recipient', nestedKey: ['recipient', 'email'], name: getI18n().language === "ar" ? 'ايميل' : 'Email' },
        { key: 'recipient', nestedKey: ['recipient', 'phone'], name: getI18n().language === "ar" ? 'هاتف' : 'Phone' },

    ]

}
export const columns = [
    {
        name: getI18n().language == 'ar' ? `ID` : `ID`,

        selector: (row) => row.id,
        sortable: true
    },
    {
        name: getI18n().language == 'ar' ? `معرف الشحنة` : `Shipment Id`,

        selector: (row) => row.shipment_id ? row.shipment_id : '-',
        sortable: true
    },
    // {
    //     name: getI18n().language == 'ar' ? `رقم الشحنة` : `Shipment Number`,

    //     selector: (row) => row.id,
    //     sortable: true
    // },
    {
        name: getI18n().language == 'ar' ? `نوع الشحنة` : `Shipment Type`,
        selector: (row) => getI18n().language === "ar" ? row.category.name_ar : row.category.name_en,
        sortable: true,

    },
    {
        name: getI18n().language == 'ar' ? `تاريخ الارسال` : `Sending Date`,
        selector: (row) => row.ship_date,
        sortable: true,

    },
    {
        name: getI18n().language == 'ar' ? `تاريخ الاستلام` : `Reception Date`,
        selector: (row) => row.delivery_date_time,

        sortable: true
    },
    {
        name: getI18n().language == 'ar' ? ` القبول` : `Acceptence `,
        selector: (row) => {
            if (Number(row.weight) > 3) {

                if (row.accepted) {
                    return getI18n().language == 'ar' ? 'مقبول' : 'Accepted'
                }
                else {
                    return getI18n().language == 'ar' ? 'غير مقبول' : 'Unaccepted'
                }
            }
            else {
                return getI18n().language === 'ar' ? 'مقبول' : 'Accepted'
            }
        },

        sortable: true
    },
    {
        name: getI18n().language === 'ar' ? 'الحالة' : 'Active',
        selector: (row) => {
            if (row.active) {
                return getI18n().language == 'ar' ? 'فعالة' : 'Active'
            }
            else {
                return getI18n().language == 'ar' ? 'غير فعال' : 'Unactive'
            }
        },
        sortable: true

    },
    {
        name: getI18n().language === 'ar' ? `المبلغ الاجمالي` : `Total Amount`,

        selector: (row) => row.totalNetCharge,
        sortable: true
    },
    {
        name: getI18n().language === 'ar' ? 'المرسل اليه' : 'Recipient',
        selector: (row) => getI18n().language === 'ar' ? row.recipient.recipient.name_ar : row.recipient.recipient.name_en
    },

    //     {
    //         name: "Action",
    //         sortable: false,
    //         selector: (row) => row.id,
    //         cell: (d) => [<i
    //             // onClick={handleClick.bind(this, d.title)}
    //             className="tableIcon fa fa-trash "
    //         ></i>
    //         ]
    //     }
    // 

];
