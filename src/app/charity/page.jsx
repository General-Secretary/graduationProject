'use client';
import axios from "axios";
import { PDFDocument } from 'pdf-lib';
import React, { useEffect, useState } from 'react'
import { Spinner } from "flowbite-react";
import * as Yup from "yup";
import { Button, Modal } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { useFormik } from 'formik';
import { Datepicker } from "flowbite-react";
import 'react-international-phone/style.css';
import toast from 'react-hot-toast';

//  import { Slide, ToastContainer, toast } from 'react-toastify';
import { InputAdornment, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { defaultCountries, FlagImage, parseCountry, usePhoneInput, } from 'react-international-phone';
import Link from 'next/link';
import { TermsOfService } from '@/components/TermsOfService';
import { useRouter } from "next/navigation";
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
const v = `يجب أن يكون كلمة المرور مكونة من 8 أحرف أو أكثر وتحتوي على:
1. حرف واحد على الأقل من الحروف الكبيرة .
2. حرف واحد على الأقل من الحروف الصغيرة .
3. رقم واحد على الأقل (0-9).
4. رمز خاص واحد على الأقل (مثل #؟!@$%^&*-).`;
const countries = ["السعوديه", "الإمارات", "مصر", "الكويت", "البحرين", "قطر", "عمان", "الأردن", "لبنان", "فلسطين", "اليمن", "الجزائر", "المغرب", "تونس", "ليبيا", "السودان", "موريتانيا", "جيبوتي", "جزر القمر", "الصومال"
]
const governorates = {
    السعوديه: ["الرياض", "جدة", "مكة المكرمة", "الدمام", "المدينة المنورة", "الخبر", "الطائف", "القصيم", "الخرج", "تبوك"]
    , الإمارات: ["دبي", "أبوظبي", "الشارقة", "العين", "رأس الخيمة", "الفجيرة", "أم القيوين", "الذيد"]
    , مصر: ["القاهرة", "الإسكندرية", "الجيزة", "الأقصر", "أسوان", "طنطا", "المنصورة", "شرم الشيخ", "المحلة الكبرى", "الزقازيق"]
    , الكويت: ["الكويت العاصمة", "الفروانية", "حولي", "الجهراء", "مبارك الكبير", "الأحمدي", "الصور", "العديلية"]
    , البحرين: ["المنامة", "المحرق", "الحد", "سترة", "الرفاع", "مركز البحرين التجاري", "السانبوسة", "مدينة عيسى"]
    , قطر: ["الدوحة", "الريان", "الوكرة", "الخور", "مسيعيد", "الشیحانیة", "أم صلال", "الزبارة"]
    , عمان: ["مسقط", "صلالة", "نزهة", "نزوى", "البريمي", "صحار", "الرستاق", "مطرح", "بهلاء"]
    , الأردن: ["عمان", "إربد", "الزرقاء", "السلط", "عجلون", "الكرك", "معان", "مادبا", "الطفيلة"]
    , فلسطين: ["القدس", "رام الله", "غزة", "نابلس", "بيت لحم", "الخليل", "جنين", "أريحا", "طولكرم", "قلقيلية"]
    , اليمن: ["صنعاء", "عدن", "تعز", "المكلا", "المعلا", "إب", "الحديدة", "لحج", "الضالع", "ذمار"]
    , لبنان: ["بيروت", "طرابلس", "صيدا", "صور", "بعلبك", "زحلة", "جبيل", "النبطية", "المتن", "كسروان"]
    , الجزائر: ["الجزائر العاصمة", "وهران", "قسنطينة", "عنابة", "المدية", "تلمسان", "سيدي بلعباس", "البليدة", "الشلف", "ورقلة"]
    , المغرب: ["الرباط", "الدار البيضاء", "مراكش", "فاس", "طنجة", "أكادير", "العيون", "تطوان", "مكناس", "الجدية"]
    , تونس: ["تونس العاصمة", "سوسة", "صفاقس", "قابس", "المنستير", "المهدية", "قصر هلال", "قليبية", "نابل", "بنزرت"]
    , ليبيا: ["طرابلس", "بنغازي", "مصراتة", "البيضاء", "الزاوية", "طرابلس", "درنة", "سبها", "الخمس", "سرت"]
    , السودان: ["الخرطوم", "أم درمان", "الخرطوم بحري", "مدني", "بورتسودان", "الأبيض", "كوستي", "كادقلي", "دنقلا", "نيالا"]
    , موريتانيا: ["نواكشوط", "نواديبو", "كيفة", "الزويرات", "نواكشوط الجنوبية", "ألاك", "بوتلميت", "الشيخ"]
    , جيبوتي: ["جيبوتي العاصمة", "علي سبيح", "تخوتا", "سمحة", "مخا", "مريسي"]
    , جزر_القمر: ["موروني", "فومبوني", "موتسامودو", "دوموني", "بامبي", "ويوني"]
    , الصومال: ["مقديشو", "هرجيسا", "بوصاصو", "جروي", "كيسمايو", "بلدوين", "بيدوا", "طوسمريب", "شكوشو"]
}




const options = [
    "التكنولوجيا والابتكار -",
    "الذكاء الاصطناعي والتعلم الآلي",
    "البرمجيات كخدمة (SaaS) والتطبيقات",
    "التكنولوجيا المالية (FinTech) والمدفوعات الرقمية",
    "الأمن السيبراني وحماية البيانات",
    "البلوكتشين والعملات الرقمية",
    "إنترنت الأشياء (IoT) والأتمتة الذكية",
    "الواقع الافتراضي والمعزز (VR/AR)",
    "الحوسبة السحابية وتحليل البيانات الضخمة",
    "الروبوتات والأنظمة الذكية",
    "التجارة والخدمات -",
    "التجارة الإلكترونية والمتاجر الرقمية",
    "التجزئة والماركات التجارية",
    "الخدمات اللوجستية والتوصيل",
    "إدارة سلاسل الإمداد والتوزيع",
    "السياحة والسفر والفنادق",
    "إدارة الفعاليات والترفيه",
    "التأمين والخدمات المالية",
    "البنية التحتية والتطوير العقاري -",
    "التطوير العقاري السكني والتجاري",
    "المدن الذكية والبنية التحتية الرقمية",
    "تقنيات البناء والهندسة المعمارية",
    "المقاولات والتشييد",
    "إدارة الممتلكات وصناديق العقارات",
    "الصناعة والتصنيع -",
    "التصنيع الذكي والروبوتات الصناعية",
    "السيارات الكهربائية وتقنيات التنقل الذكي",
    "الطباعة ثلاثية الأبعاد والتصنيع المبتكر",
    "الصناعات الثقيلة والمعدات الهندسية",
    "الصناعات الكيميائية والبتروكيماويات",
    "الإلكترونيات وأشباه الموصلات",
    "الطاقة والاستدامة -",
    "الطاقة المتجددة (الطاقة الشمسية، الرياح، الهيدروجين الأخضر)",
    "إدارة النفايات وإعادة التدوير",
    "تحلية المياه ومعالجة المياه الذكية",
    "الكفاءة الطاقية وحلول الاستدامة",
    "النفط والغاز والطاقة التقليدية",
    "الزراعة والصناعات الغذائية -",
    "الزراعة الذكية والتكنولوجيا الزراعية (AgriTech)",
    "إنتاج وتصنيع الأغذية والمشروبات",
    "الأمن الغذائي والاستدامة الزراعية",
    "الاستزراع السمكي والموارد البحرية",
    "تقنيات الأسمدة والمبيدات الحيوية",
    "الرعاية الصحية والتكنولوجيا الطبية -",
    "الأدوية والتكنولوجيا الحيوية (BioTech)",
    "الأجهزة الطبية والتقنيات العلاجية",
    "الرعاية الصحية الرقمية والتطبيب عن بُعد ",
    "الذكاء الاصطناعي في الطب وتحليل البيانات الصحية",
    "الطب التجديدي والعلاج الجيني",
    "الإعلام والترفيه -",
    "صناعة المحتوى الرقمي والإعلام الجديد",
    "ألعاب الفيديو والرياضات الإلكترونية",
    "السينما والإنتاج الإعلامي",
    "البث المباشر ومنصات الفيديو",
    "الصحافة الرقمية والإعلام التفاعلي",
    "التعليم والتطوير المهني -",
    "تكنولوجيا التعليم (EdTech) والتعلم الإلكتروني",
    "الجامعات والمراكز البحثية",
    "التدريب المهني وتنمية المهارات",
    "الذكاء الاصطناعي في التعليم",
    "الاستثمار والتمويل -",
    "ريادة الأعمال والاستثمار",
    "رأس المال الجريء (Venture Capital) والاستثمارات الناشئة",
    "الأسهم والأسواق المالية",
    "العقارات والصناديق الاستثمارية",
    "القروض والتمويل الجماعي",
    "العملات الرقمية والاستثمار اللامركزي (DeFi)",
    "النقل والمواصلات -",
    "الطيران وتقنيات الفضاء",
    "المواصلات الذكية والبنية التحتية للطرق",
    "الشحن والنقل البحري",
    "القطارات والمترو وأنظمة النقل الجماعي",
    "المنتجات الاستهلاكية والموضة -",
    "الأزياء والملابس",
    "مستحضرات التجميل والعناية الشخصية",
    "المنتجات المنزلية والإلكترونية",
    "المجوهرات والساعات الفاخرة",
    "الصناعات البيطرية ورعاية الحيوانات -",
    "الأدوية البيطرية والتكنولوجيا البيطرية",
    "مستلزمات الحيوانات الأليفة",
    "مزارع الإنتاج الحيواني الحديثة",
    "التكنولوجيا المساعدة وذوي الاحتياجات الخاصة -",
    "الأجهزة الطبية المساعدة",
    "البرمجيات والتقنيات الموجهة لذوي الاحتياجات الخاصة",
    "إمكانية الوصول الرقمي والتصميم الشامل"
];


const options2 =
    [
        "دعم التعليم والتدريب",
        "الرعاية الصحية والخدمات الطبية",
        "تمكين المرأة والمساواة",
        "التنمية الاقتصادية والمشاريع الصغيرة",
        "دعم ذوي الهمم",
        "التنمية المستدامة والبيئة",
        "القضاء على الفقر وتحسين المعيشة",
        "توفير المياه والصرف الصحي",
        "المساعدات الإنسانية والإغاثة",
        "الإسكان والبنية التحتية",
        "أخرى"

    ];



const options3 = [
    "تمويل مالي مباشر",
    "توفير معدات وموارد أساسية",
    "استشارات قانونية وإدارية",
    "دعم تقني وتكنولوجي",
    "توفير مساحات عمل وخدمات لوجستية",
    "تسويق وترويج",
    "تدريب وتطوير مهارات",
    "برامج شراكات وربط مع جهات داعمة",
    "أخرى"
];
const options4 = [
    "أصحاب المشاريع الصغيرة ومتناهية الصغر",
    "الأطفال والشباب",
    "النساء",
    "كبار السن",
    "ذوي الهمم",
    "العائلات ذات الدخل المحدود",
    "اللاجئون والنازحون",
    "المرضى والمحتاجون للرعاية الصحية",
    "المجتمعات الريفية والمناطق الفقيرة"
];
const options5 = [
    "دعم محلي (داخل الدولة فقط)",
    "دعم إقليمي (داخل عدة دول في نفس المنطقة)",
    "دعم دولي (في دول متعددة)",
    "المناطق الريفية والمهمشة",
    "المناطق الحضرية والضواحي",
    "المجتمعات المتأثرة بالكوارث والنزاعات",
    "أخرى"
];
const empNumArray = ["5-10", "10-20", "20-40", "40-60", "اكثر من ذلك"]
const SignUp = () => {
    const router = useRouter();
    const [openTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false);//خاص بالمودال 
    const [currentStep, setCurrentStep] = useState(1); console.log(Object.values(governorates).flat());
    const [preview, setPreview] = useState(null);
    const [openModal2, setOpenModal2] = useState(false);
    const [submitLoading, setsubmitLoading] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);
    const [openModal5, setOpenModal5] = useState(false);
    const [BDFName, setBDFName] = useState("لم يتم اختيار ملف بعد");
    const [fileName, setFileName] = useState("لم يتم اختيار ملف بعد");
    const validation = Yup.object().shape({
        CommercialRegister: Yup.string().required("يجب ادخال رقم السجل التجارى  ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, " يجب ادخال رقم سجل تجارى  صالح"),
        Taxcard: Yup.string().required("يجب ادخال رقم البطاقه الضريبيه  ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, "يجب ادخال رقم بطاقه ضريبيه صالح     "),
        Companyrepresentativename: Yup.string().required("يجب ادخال الاسم ").min(3).max(30),
        CompanyrepresentativenameEmail: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        nationalId: Yup.string().required("يجب ادخال الرقم القومي (لو مصرى ) او جواز السفر( لو غير مصرى)  ").matches(/(^\d{14}$)|(^[A-Za-z0-9]{6,9}$)/, "يجب ادخال id صالح "),
        notification: Yup.boolean(),
        organizationDescription: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل الوصف عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال وصف الشركه  ").min(3),
        agreement: Yup.boolean().oneOf([true], "يجب الموافقه على الشروط والاحكام بعد الاطلاع عليها لاتمام التسجيل معنا").required(),
        organizationName: Yup.string().required("يجب ادخال الاسم ").min(3).max(30),
        englishName: Yup.string().required("يجب ادخال الاسم بالانجليزيه").matches(/^[A-Za-z- ]+$/, "الاسم باللغه الانجليزيه لو سمحت").min(3).max(20),
        organizationType: Yup.string().oneOf(["مؤسسة خيرية عامة", "جمعية تنموية", "منظمة إغاثية وإنسانية", "مؤسسة تعليمية غير ربحية", "مؤسسة طبية خيرية", "منظمة بيئية وتنموية", "جمعية لرعاية الأيتام والمسنين", "منظمة لدعم ذوي الاحتياجات الخاصة", "منظمة دعم المرأة وتمكينها", "منظمة للأعمال التطوعية", "مؤسسة ثقافية وفنية خيرية", "جمعية خيرية اجتماعية", "أخرى"], "الاختيار غير صحيح").required("ادخل نوع مناسب"),
        // image: Yup.mixed().required("الصورة مطلوبة").test("fileRequired", "يجب رفع صورة", (value) => value instanceof File),
        image: Yup.mixed()
            .required("الصورة مطلوبة")
            .test("fileRequired", "يجب رفع صورة", (value) => value instanceof File)
            .test("fileType", "يجب أن يكون الملف صورة بصيغة (JPG, PNG, GIF)", (value) => {
                if (!value) return false;
                const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                return allowedTypes.includes(value.type);
            })
            .test("fileSize", "حجم الصورة يجب ألا يتجاوز 3 ميجا بايت", (value) => {
                if (!value) return false;
                return value.size <= 3 * 1024 * 1024; // 3MB
            }),

        organizationEmail: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        phone: Yup.string().matches(/^\+?[1-9]\d{3,14}$/, '! ادخل رقم تليفون او محمول صالح').required('! التليفون مطلوب'),
        organizationWebsite: Yup.string().matches(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\/[a-z0-9\-._~:\/?#[\]@!$&'()*+,;=]*)?$/, 'رابط الموقع غير صالح').required('رابط الويب مطلوب'),
        country: Yup.string().oneOf(countries, "الاختيار غير صحيح").required("اختار دوله مناسبه"),
        Headquarters: Yup.string().oneOf(Object.values(governorates).flat(), "الاختيار غير صحيح").required("اختار محافظه او ولايه مناسبه"),
        rePassword: Yup.string().required("اعد كتابه كلمه السر").oneOf([Yup.ref("password")], "يجب مطابقه كلمه السر الاصليه "),
        password: Yup.string().required("ادخل كلمه سر مناسبه").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, v),
        FieldsSupported: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        supportTypes: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        targetedgroups: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        targetedareas: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        Targetfinancingvalue: Yup.number().min(.01, "قيمة التمويل المستهدفةغير صالحه)"),
        // EvidenceDocument: Yup.mixed()
        //     .required(" نموذج العمل التجارى مطلوب !").test("fileRequired", "يجب رفع نموذج العمل التجارى", (value) => value instanceof File)
        //     .test("fileType", "الملف يجب أن يكون PDF أو DOC أو PPTX", (value) => {
        //         if (!value) return false;
        //         const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
        //         return allowedTypes.includes(value.type);
        //     }),
        EvidenceDocument: Yup.mixed().required("نموذج العمل التجاري مطلوب!")
            .test("fileRequired", "يجب رفع نموذج العمل التجاري", (value) => value instanceof File)
            .test("fileType", "الملف يجب أن يكون PDF أو DOC أو PPTX", (value) => {
                if (!value) return false;
                const allowedTypes = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.ms-powerpoint",
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                ];
                return allowedTypes.includes(value.type);
            })
            .test("fileSize", "حجم الملف يجب ألا يتجاوز 3 ميجا بايت", (value) => {
                if (!value) return false;
                return value.size <= 3 * 1024 * 1024; // 3MB
            }),
    });
    // async function submitting(value) {
    //     console.log(value)
    //     const formData = new FormData();
    //     formData.append("name", value.organizationName);//
    //     formData.append("username", value.englishName);//
    //     formData.append("organizationType", value.organizationType);//
    //     formData.append("commercialRegistrationNumber", value.CommercialRegister);//
    //     formData.append("taxIdNumber", value.Taxcard);//
    //     formData.append("representativeName", value.Companyrepresentativename);//
    //     formData.append("representativeEmail", value.CompanyrepresentativenameEmail);///
    //     formData.append("representativeNationalId", value.nationalId);//
    //     formData.append("acceptNotifications", value.notification);
    //     formData.append("description", value.organizationDescription);//
    //     if (value.image) {
    //         formData.append("image", value.image);//
    //     }
    //     if (value.EvidenceDocument) {
    //         formData.append("doc", value.EvidenceDocument);
    //     }
    //     formData.append("email", value.organizationEmail);//
    //     formData.append("phoneNumber", value.phone);//
    //     formData.append("website", value.organizationWebsite);//
    //     formData.append("country", value.country);//
    //     formData.append("headQuarter", value.Headquarters);//
    //     formData.append("password", value.password);//
    //     formData.append("rePassword", value.rePassword);
    //     formData.append("projectTypes", JSON.stringify(value.FieldsSupported));//
    //     formData.append("supportTypes", JSON.stringify(value.supportTypes));//
    //     formData.append("targetedGroups", JSON.stringify(value.targetedgroups));//
    //     formData.append("targetedRegions", JSON.stringify(value.targetedareas));//
    //     formData.forEach((value, key) => {
    //         console.log(key, value);
    //     });
    // }




    // const compressPDF = async (file) => {
    //   const reader = new FileReader();
    //   reader.readAsArrayBuffer(file);

    //   return new Promise((resolve) => {
    //     reader.onload = async (event) => {
    //       const pdfDoc = await PDFDocument.load(event.target.result);
    //       const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

    //       const compressedFile = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    //       resolve(compressedFile);
    //     };
    //   });
    // };


    // const compressPDF = async (file) => {
    //     const reader = new FileReader();
    //     reader.readAsArrayBuffer(file);

    //     return new Promise((resolve, reject) => {
    //         reader.onload = async (event) => {
    //             try {
    //                 const pdfDoc = await PDFDocument.load(event.target.result);

    //                 // تقليل جودة الصور داخل الملف
    //                 const pages = pdfDoc.getPages();
    //                 for (const page of pages) {
    //                     const { width, height } = page.getSize();
    //                     page.setSize(width * 0.9, height * 0.9); // تقليل الأبعاد بنسبة 10%
    //                 }

    //                 // حفظ PDF مع ضغط إضافي
    //                 const compressedPdfBytes = await pdfDoc.save({
    //                     useObjectStreams: false,
    //                     updateFieldAppearances: false, 
    //                     objectsPerTick: 50, 
    //                 });

    //                 // تحويل إلى ملف Blob
    //                 const compressedFile = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    //                 resolve(compressedFile);
    //             } catch (error) {
    //                 console.error("Error compressing PDF:", error);
    //                 reject(error);
    //             }
    //         };
    //     });
    // };

    async function submitting(value) {
        try {
            console.log(value);
            const formData = new FormData();
            formData.append("name", value.organizationName);
            formData.append("username", value.englishName);
            formData.append("organizationType", value.organizationType);
            formData.append("commercialRegistrationNumber", value.CommercialRegister);
            formData.append("taxIdNumber", value.Taxcard);
            formData.append("representativeName", value.Companyrepresentativename);
            formData.append("representativeEmail", value.CompanyrepresentativenameEmail);
            formData.append("representativeNationalId", value.nationalId);
            formData.append("acceptNotifications", value.notification);
            formData.append("description", value.organizationDescription);

            if (value.image) {
                formData.append("image", value.image);
            }
            if (value.EvidenceDocument) {
                formData.append("doc", value.EvidenceDocument);
            }

            formData.append("email", value.organizationEmail);
            formData.append("phoneNumber", value.phone);
            formData.append("website", value.organizationWebsite);
            formData.append("country", value.country);
            formData.append("headQuarter", value.Headquarters);
            formData.append("password", value.password);
            formData.append("rePassword", value.rePassword);
            formData.append("projectTypes", JSON.stringify(value.FieldsSupported));
            formData.append("supportTypes", JSON.stringify(value.supportTypes));
            formData.append("targetedGroups", JSON.stringify(value.targetedgroups));
            formData.append("targetedRegions", JSON.stringify(value.targetedareas));
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            setsubmitLoading(true)
            const response = await axios.post(
                "https://estethmarat-estethmarats-projects.vercel.app/api/v1/charityOrganizations/register", // 🔹 ضع رابط الـ API الصحيح هنا
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("✅ Success:", response.data);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-[#00F560]">
                                    {response.data.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-green-500">
                        <button
                            onClick={() => {toast.dismiss(t.id);toast.dismiss(t.id);toast.dismiss(t.id)}}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 })
            
            setsubmitLoading(false)
            router.push("/Login");
            return response.data;
        } catch (error) {
            setsubmitLoading(false)
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-red-600">
                                        {error.response.data.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-red-500">
                        <button
                            onClick={() => {toast.dismiss(t.id);toast.dismiss(t.id);toast.dismiss(t.id)}}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 })
            
            if (error.response) {
                console.log("❌ Server Error:", error.response.data);
            } else if (error.request) {
                console.log("❌ Network Error: No response received from server");
            } else {
                console.log("❌ Unknown Error:", error.message);
            }
        }
    }

    const x = useFormik({
        initialValues: {
            organizationName: "", englishName: "", FieldsSupported: [], EvidenceDocument: null, organizationDescription: "", supportTypes: [], targetedgroups: [], targetedareas: [], image: null, organizationEmail: "", phone: "", organizationWebsite: "",
            country: "", Headquarters: "", password: "", rePassword: "",
            organizationType: "", Targetfinancingvalue: "",
            CommercialRegister: "", Taxcard: "", Companyrepresentativename: "", CompanyrepresentativenameEmail: "",
            nationalId: "", notification: false, agreement: false
        },
        onSubmit: submitting,
        validationSchema: validation,
    });
    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        }
    }; console.log(x)
    function show1() {
        if (currentStep == 1) {
            if (Object.keys(x.touched).length == 0 || !x.values.image || x.errors.englishName || x.errors.image || x.errors.organizationType || x.errors.organizationEmail || x.errors.password || x.errors.rePassword
                || x.errors.organizationName || x.errors.phone || x.errors.organizationWebsite || x.errors.country || x.errors.Headquarters
            ) {
                return true
            }
        } return false
    }
    function show2() {
        if (currentStep == 2) {
            if (Object.keys(x.touched).length == 0
                || x.errors.FieldsSupported || x.errors.organizationDescription || x.errors.supportTypes || x.errors.targetedgroups || x.errors.targetedareas) {
                return true
            }
        } return false
    }
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
        usePhoneInput({
            defaultCountry: 'eg',
            value: x.values.phone,
            countries: defaultCountries,
            onChange: (data) => {
                x.setFieldValue("phone", data.phone);
            },
        });
    function submitdisable() {
        if (Object.keys(x.errors).length > 0 || Object.keys(x.touched).length == 0 || currentStep < 3) {
            return true
        }
        return false
    }
    return (
        <div className={vazir.className}>
          {}
            {openTermsOfServiceModal && (
                <TermsOfService
                    openTermsOfServiceModal={openTermsOfServiceModal}
                    setOpenTermsOfServiceModal={setOpenTermsOfServiceModal}
                />
            )}//خاص بالمودال
            <div className="my-20">
                <form onSubmit={x.handleSubmit}>
                    <div className='w-full md:w-[50%] px-4 mx-auto'>
                        <h2 className=' font-vazir text-white  me-4 text-center  font-extrabold text-5xl'>كلمتين مبرين </h2>
                        <p style={{ direction: 'rtl' }} className=' font-vazir  text-[#00F560B0] me-4 font-thin text-2xl'>
                            جملة مؤثرة
                        </p>

                        <div style={{ direction: 'rtl' }} className='w-full py-16 px-2 flex  justify-center items-center'>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px] ${currentStep === 1 || currentStep === 2 || currentStep === 3 ? "border-b-[#00F560]" : ""}`}>
                                    <p className={`${currentStep === 1 || currentStep === 2 || currentStep === 3 ? "text-[#00F560]" : ""} m-2`}>بيانات اساسية</p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px] ${currentStep === 2 || currentStep === 3 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}  `}>
                                    <p className={`${currentStep === 2 || currentStep === 3 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}>  تفاصيل المنظمة </p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px]  ${currentStep === 3 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}`}>
                                    <p className={`${currentStep === 3 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}>  البيانات الثبوتية</p>
                                </div>
                            </div>
                        </div>
                        {currentStep === 1 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='organizationName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم المنظمة  {' '}
                                    </label>
                                    <input placeholder=' اسم المنظمه' onBlur={x.handleBlur} value={x.values.organizationName} onChange={x.handleChange} name='organizationName' id='organizationName' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationName && x.touched.organizationName && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationName}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='englishName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم المستخدم {' '}
                                    </label>
                                    <input placeholder='  @Example_A' onBlur={x.handleBlur} value={x.values.englishName} onChange={x.handleChange} name='englishName' id='englishName' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.englishName && x.touched.englishName && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.englishName}
                                    </div>
                                )}
                                <div className='mb-14 relative w-full ' >
                                    <label htmlFor='organizationType' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p> نوع المنظمة</p>
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <select id="organizationType" onBlur={x.handleBlur} value={x.values.organizationType} onChange={x.handleChange} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                            <option defaultValue> نوع المنظمه</option>
                                            <option value="مؤسسة خيرية عامة">مؤسسة خيرية عامة</option>
                                            <option value="جمعية تنموية">جمعية تنموية</option>
                                            <option value="منظمة إغاثية وإنسانية">منظمة إغاثية وإنسانية</option>
                                            <option value="مؤسسة تعليمية غير ربحية">مؤسسة تعليمية غير ربحية</option>
                                            <option value="مؤسسة طبية خيرية">مؤسسة طبية خيرية</option>
                                            <option value="منظمة بيئية وتنموية">منظمة بيئية وتنموية</option>
                                            <option value="جمعية لرعاية الأيتام والمسنين">جمعية لرعاية الأيتام والمسنين</option>
                                            <option value="منظمة لدعم ذوي الاحتياجات الخاصة">منظمة لدعم ذوي الاحتياجات الخاصة</option>
                                            <option value="منظمة دعم المرأة وتمكينها">منظمة دعم المرأة وتمكينها</option>
                                            <option value="منظمة للأعمال التطوعية">منظمة للأعمال التطوعية</option>
                                            <option value="مؤسسة ثقافية وفنية خيرية">مؤسسة ثقافية وفنية خيرية</option>
                                            <option value="جمعية خيرية اجتماعية">جمعية خيرية اجتماعية</option>
                                            <option value="أخرى">أخرى</option>

                                        </select>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                    </div>
                                    {x.errors.organizationType && x.touched.organizationType && (
                                        <div className='p-4 mb-4 xs:absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.organizationType}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-10'>
                                    <div className="flex items-center  justify-end">
                                        <div className=' flex justify-between flex-col xs:flex-row items-center w-full' style={{ direction: "rtl" }}>
                                            <div className='w-[104px] my-4 border overflow-hidden border-[#00F56059] justify-center flex items-center h-[104px] rounded-full bg-[#D9D9D940]'>
                                                {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" /> || <i className="fa-regular text-white opacity-70 text-[56px] fa-user"></i>}
                                            </div>
                                            <div className='w-[85%] flex-col sm:flex-row flex justify-start items-center '>
                                                <label onClick={(event) => { x.setFieldTouched("image", true) }} htmlFor="image" className="bg-[#00F560] mx-4  text-white p-2 px-4 rounded-full cursor-pointer">
                                                    ارفع شعار المنظمه
                                                </label>
                                                <span className="ml-4 mt-4 sm:mt-0 text-white">{fileName}</span>
                                            </div>
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                id="image"
                                                className="hidden"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setFileName(file ? file.name : "لم يتم اختيار ملف بعد");
                                                    if (file) {
                                                        setPreview(URL.createObjectURL(file));
                                                        x.setFieldValue("image", file);
                                                    } else { setPreview(null); x.setFieldValue("image", null); }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {x.errors.image && x.touched.image && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.image}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='organizationEmail' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p>  البريد الالكتروني الرسمي للمنظمه </p>{' '}
                                    </label>
                                    <input placeholder=' example@gmail.com' onBlur={x.handleBlur} value={x.values.organizationEmail} onChange={x.handleChange} name='organizationEmail' id='organizationEmail' type='email' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationEmail && x.touched.organizationEmail && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationEmail}
                                    </div>
                                )}
                                <div className='mb-10  w-full'>
                                    <label htmlFor='phone' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> رقم هاتف المنظمة</p>{' '}
                                    </label>
                                    <TextField
                                        variant="outlined"
                                        value={inputValue}
                                        name='phone'
                                        onBlur={x.handleBlur}
                                        id='phone'
                                        onChange={handlePhoneValueChange}
                                        type="tel"
                                        inputRef={inputRef}
                                        InputProps={{
                                            style: {
                                                backgroundColor: "transparent",
                                                borderRadius: "9999px",
                                                border: "1px solid #84e1bc",
                                                color: "white",
                                                padding: "12px 16px", width: "100%"
                                            },
                                            startAdornment: (
                                                <InputAdornment position="start" style={{ marginRight: "2px", borderColor: "black", marginLeft: "-8px" }}>
                                                    <Select
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: "300px",
                                                                    width: "360px", backgroundColor: "black"
                                                                },
                                                            },
                                                        }}
                                                        sx={{
                                                            width: "max-content",
                                                            borderRadius: "9999px",
                                                            border: "none",
                                                            '& .MuiSelect-select': {
                                                                padding: "8px",
                                                                paddingRight: "24px !important",
                                                            },


                                                            '&.Mui-focused': {
                                                                border: "0px solid #84e1bc",
                                                            },
                                                        }}
                                                        value={country.iso2}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        renderValue={(value) => (<div className="flex justify-between items-center">
                                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down"></i>
                                                            <FlagImage iso2={value} style={{ display: "flex" }} />
                                                        </div>
                                                        )}>
                                                        {defaultCountries.map((c) => {
                                                            const country = parseCountry(c);
                                                            return (
                                                                <MenuItem key={country.iso2} value={country.iso2}>
                                                                    <FlagImage iso2={country.iso2} style={{ marginRight: "8px" }} />
                                                                    <Typography marginRight="8px" color="white">{country.name}</Typography>
                                                                    <Typography color="gray">+{country.dialCode}</Typography>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: "100%",
                                            input: {
                                                color: "white",
                                                placeholderColor: "#ccc",
                                            },
                                            fieldset: {
                                                display: "none",
                                            },
                                            '&.Mui-focused fieldset': {
                                                display: "block",
                                                borderColor: "#84e1bc",
                                            },
                                        }}
                                    />
                                </div>
                                {x.errors.phone && x.touched.phone && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.phone}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='organizationWebsite' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الموقع الالكتروني للمنظمه{' '}
                                    </label>
                                    <input placeholder=' www.example.com ' onBlur={x.handleBlur} value={x.values.organizationWebsite} onChange={x.handleChange} name='organizationWebsite' id='organizationWebsite' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationWebsite && x.touched.organizationWebsite && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationWebsite}
                                    </div>
                                )}
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14  relative w-full xs:w-[45%] ' >
                                        <label htmlFor='Headquarters' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>   المقر  </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="Headquarters" onBlur={x.handleBlur} value={x.values.Headquarters} onChange={x.handleChange} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option >مكان المقر </option>
                                                {
                                                    governorates[x?.values?.country]?.map((p) => {
                                                        return <option value={p}>{p}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.Headquarters && x.touched.Headquarters && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.Headquarters}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14  relative w-full xs:w-[45%] ' >
                                        <label htmlFor='country' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> الدوله </p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="country" onBlur={x.handleBlur} value={x.values.country} onChange={(e) => { x.handleChange(e); x.setFieldValue("Headquarters", ""); }} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option >اختر الدوله </option>
                                                {countries.map((country) => {
                                                    return <option value={country}>{country}
                                                    </option>
                                                })}
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.country && x.touched.country && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.country}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor='password' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> كلمة المرور</p>{' '}
                                    </label>
                                    <input placeholder=' **********' onBlur={x.handleBlur} value={x.values.password} onChange={x.handleChange} name='password' id='password' type='password' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.password && x.touched.password && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.password}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='rePassword' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> تأكيد كلمة المرور</p>{' '}
                                    </label>
                                    <input placeholder=' **********' onBlur={x.handleBlur} value={x.values.rePassword} onChange={x.handleChange} name='rePassword' id='rePassword' type='password' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.rePassword && x.touched.rePassword && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.rePassword}
                                    </div>)}
                            </>
                        )}
                        {currentStep === 2 && (
                            <>




                                <div className='mb-10'>
                                    <label htmlFor='organizationDescription' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        وصف مختصر عن دور المنظمة وهدفها {' '}
                                    </label>
                                    <textarea placeholder='   ' onBlur={x.handleBlur} value={x.values.organizationDescription} onChange={x.handleChange} name='organizationDescription' rows="5" id='organizationDescription' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organizationDescription && x.touched.organizationDescription && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organizationDescription}
                                    </div>
                                )}
                                <div className='mb-14  relative w-full ' >
                                    <label htmlFor='FieldsSupported' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p>  انواع المشاريع التي تدعمها المنظمة </p>
                                        <p className='text-gray-200'></p>{' '}
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <div className='border select-none truncate mb-4  text-start ps-10 border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal2(true); x.setFieldTouched("FieldsSupported", true); }} > {x.values.FieldsSupported[0] || "انواع المشاريع "}</div>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        <Modal
                                            dismissible
                                            show={openModal2}
                                            onClose={() => setOpenModal2(false)}
                                            className="bg-black bg-opacity-80  backdrop-blur-sm"
                                        >
                                            <Modal.Header className="bg-black border  border-b border-green-400">
                                                <p className="text-white">  انواع المشاريع التي تدعمها المنظمة </p>
                                            </Modal.Header>
                                            <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                <div className="space-y-6">
                                                    {options2.map((option) => (
                                                        <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                            {option.includes('-') ? (
                                                                <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="FieldsSupported"
                                                                        value={option}
                                                                        checked={x.values.FieldsSupported.includes(option)}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            let newSelection = [...x.values.FieldsSupported];
                                                                            if (checked) {
                                                                                newSelection.push(value);
                                                                            } else {
                                                                                newSelection = newSelection.filter(
                                                                                    (item) => item !== value
                                                                                );
                                                                            }
                                                                            x.setFieldValue("FieldsSupported", newSelection);
                                                                        }}
                                                                        className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                    />
                                                                    {option}
                                                                </>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                <button
                                                    className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                    onClick={() => setOpenModal2(false)}
                                                >
                                                    done
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    {x.errors.FieldsSupported && x.touched.FieldsSupported && (
                                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.FieldsSupported}
                                        </div>
                                    )}
                                </div>







                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14  relative w-full xs:w-[45%] ' >
                                        <label htmlFor='targetedgroups' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  الفئات  المستهدفه</p>
                                            <p className='text-gray-200'></p>{' '}
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <div className='border select-none truncate mb-4  text-start ps-10 border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal4(true); x.setFieldTouched("targetedgroups", true); }} > {x.values.targetedgroups[0] || " الفئات المستهدفه"}</div>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                            <Modal
                                                dismissible
                                                show={openModal4}
                                                onClose={() => setOpenModal4(false)}
                                                className="bg-black bg-opacity-80  backdrop-blur-sm">
                                                <Modal.Header className="bg-black border  border-b border-green-400">
                                                    <p className="text-white">  الفئات  المستهدفه</p>
                                                </Modal.Header>
                                                <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                    <div className="space-y-6">
                                                        {options4.map((option) => (
                                                            <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                                {option.includes('-') ? (
                                                                    <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="targetedgroups"
                                                                            value={option}
                                                                            checked={x.values.targetedgroups.includes(option)}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                let newSelection = [...x.values.targetedgroups];
                                                                                if (checked) {
                                                                                    newSelection.push(value);
                                                                                } else {
                                                                                    newSelection = newSelection.filter(
                                                                                        (item) => item !== value
                                                                                    );
                                                                                }
                                                                                x.setFieldValue("targetedgroups", newSelection);
                                                                            }}
                                                                            className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                        />
                                                                        {option}
                                                                    </>
                                                                )}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                    <button
                                                        className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                        onClick={() => setOpenModal4(false)}
                                                    >
                                                        done
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                        {x.errors.targetedgroups && x.touched.targetedgroups && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.targetedgroups}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14  relative w-full xs:w-[45%] ' >
                                        <label htmlFor='targetedareas' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  المناطق المستهدفه</p>
                                            <p className='text-gray-200'></p>{' '}
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <div className='border select-none truncate mb-4  text-start ps-10 border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal5(true); x.setFieldTouched("targetedareas", true); }} > {x.values.targetedareas[0] || " المناطق المستهدفه "}</div>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                            <Modal
                                                dismissible
                                                show={openModal5}
                                                onClose={() => setOpenModal5(false)}
                                                className="bg-black bg-opacity-80  backdrop-blur-sm">
                                                <Modal.Header className="bg-black border  border-b border-green-400">
                                                    <p className="text-white"> المناطق المستهدفه </p>
                                                </Modal.Header>
                                                <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                    <div className="space-y-6">
                                                        {options5.map((option) => (
                                                            <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                                {option.includes('-') ? (
                                                                    <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="targetedareas"
                                                                            value={option}
                                                                            checked={x.values.targetedareas.includes(option)}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                let newSelection = [...x.values.targetedareas];
                                                                                if (checked) {
                                                                                    newSelection.push(value);
                                                                                } else {
                                                                                    newSelection = newSelection.filter(
                                                                                        (item) => item !== value
                                                                                    );
                                                                                }
                                                                                x.setFieldValue("targetedareas", newSelection);
                                                                            }}
                                                                            className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                        />
                                                                        {option}
                                                                    </>
                                                                )}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                    <button
                                                        className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                        onClick={() => setOpenModal5(false)}
                                                    >
                                                        done
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                        {x.errors.targetedareas && x.touched.targetedareas && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.targetedareas}
                                            </div>
                                        )}
                                    </div>
                                </div>









                                <div className='mb-14  relative w-full ' >
                                    <label htmlFor='supportTypes' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        <p>  أنواع الدعم</p>
                                        <p className='text-gray-200'></p>{' '}
                                    </label>
                                    <div className="relative" style={{ direction: "rtl" }}>
                                        <div className='border select-none truncate mb-4  text-start ps-10 border-green-300  text-lg rounded-full py-5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal3(true); x.setFieldTouched("supportTypes", true); }} > {x.values.supportTypes[0] || " انواع الدعم"}</div>
                                        <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        <Modal
                                            dismissible
                                            show={openModal3}
                                            onClose={() => setOpenModal3(false)}
                                            className="bg-black bg-opacity-80  backdrop-blur-sm"
                                        >
                                            <Modal.Header className="bg-black border  border-b border-green-400">
                                                <p className="text-white"> أنواع الدعم</p>
                                            </Modal.Header>
                                            <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                <div className="space-y-6">
                                                    {options3.map((option) => (
                                                        <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                            {option.includes('-') ? (
                                                                <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="supportTypes"
                                                                        value={option}
                                                                        checked={x.values.supportTypes.includes(option)}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            let newSelection = [...x.values.supportTypes];
                                                                            if (checked) {
                                                                                newSelection.push(value);
                                                                            } else {
                                                                                newSelection = newSelection.filter(
                                                                                    (item) => item !== value
                                                                                );
                                                                            }
                                                                            x.setFieldValue("supportTypes", newSelection);
                                                                        }}
                                                                        className="w-5 h-5 text-green-500 mx-3 bg-transparent border border-green-500 rounded-md focus:outline-none focus:ring-0"
                                                                    />
                                                                    {option}
                                                                </>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-black  border  border-t border-green-300">
                                                <button
                                                    className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
                                                    onClick={() => setOpenModal3(false)}
                                                >
                                                    done
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    {x.errors.supportTypes && x.touched.supportTypes && (
                                        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                            <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                خطأ :{' '}
                                            </span>
                                            {x.errors.supportTypes}
                                        </div>
                                    )}
                                </div>


                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='CommercialRegister' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        رقم السجل التجاري{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.CommercialRegister} onChange={x.handleChange} name='CommercialRegister' id='CommercialRegister' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.CommercialRegister && x.touched.CommercialRegister && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.CommercialRegister}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Taxcard' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        رقم البطاقة الضريبية إن وجد  {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Taxcard} onChange={x.handleChange} name='Taxcard' id='Taxcard' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Taxcard && x.touched.Taxcard && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Taxcard}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='Companyrepresentativename' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم ممثل الشركة {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.Companyrepresentativename} onChange={x.handleChange} name='Companyrepresentativename' id='Companyrepresentativename' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.Companyrepresentativename && x.touched.Companyrepresentativename && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.Companyrepresentativename}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='CompanyrepresentativenameEmail' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        البريد الالكتروني لممثل الشركة{' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.CompanyrepresentativenameEmail} onChange={x.handleChange} name='CompanyrepresentativenameEmail' id='CompanyrepresentativenameEmail' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.CompanyrepresentativenameEmail && x.touched.CompanyrepresentativenameEmail && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.CompanyrepresentativenameEmail}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='nationalId' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الرقم القومي/ رقم جواز السفر لممثل الشركة   {' '}
                                    </label>
                                    <input onBlur={x.handleBlur} value={x.values.nationalId} onChange={x.handleChange} name='nationalId' id='nationalId' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.nationalId && x.touched.nationalId && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.nationalId}
                                    </div>
                                )}

                                <div className='mb-10'>
                                    <label htmlFor='EvidenceDocument' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        مستند إثبات بتسجيل المنظمة كمؤسسة غير هادفه للربح {' '}
                                    </label>
                                    <div onClick={(event) => { x.setFieldTouched("EvidenceDocument", true) }} className="flex text-center items-center justify-center w-full ">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center  rounded-[50px] w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-[#02C04D1A] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-green-800 dark:border-gray-600 dark:hover:border-gray-500 ">
                                            <div className="flex flex-col  rounded-full items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg> <p className="text-sm text-gray-500 dark:text-gray-400">قم برفع ملف بصيغة  من على جهازك يتضمن النموذج بشكل واضح وكامل.</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400"> (.pdf, .doc, .pptx)</p>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                onBlur={x.handleBlur}
                                                name="EvidenceDocument"
                                                accept=".pdf,.doc,.docx,.pptx"
                                                type="file"
                                                // onChange={ (event) => {
                                                //     const file = event.currentTarget.files[0];
                                                //     setBDFName(file ? file.name : "لم يتم اختيار ملف بعد");
                                                //     x.setFieldValue("EvidenceDocument", file);
                                                // }}
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];

                                                    if (file) {
                                                        // if (file.size > 3 * 1024 * 1024) { // 3 ميجا بايت
                                                        //     alert("حجم الملف يجب ألا يتجاوز 3 ميجا بايت.");
                                                        //     return;
                                                        // }

                                                        setBDFName(file.name);
                                                        x.setFieldValue("EvidenceDocument", file);
                                                    } else {
                                                        setBDFName("لم يتم اختيار ملف بعد");
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                        </label>
                                    </div> <span className="ml-4 mt-4 sm:mt-0 text-white">{BDFName}</span>
                                </div>
                                {x.errors.EvidenceDocument && x.touched.EvidenceDocument && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.EvidenceDocument}
                                    </div>
                                )}


                                <div className="mb-10">
                                    <div className='flex justify-end items-center'>
                                        <label htmlFor="notification" className="block  me-4 text-sm font-thin text-end   text-white"> <p >  هل تود تلقي اشعارات بآخر الفرص والتحديثات؟ </p> </label>
                                        <input onBlur={x.handleBlur} checked={x.values.notification} onChange={x.handleChange} name="notification" id="notification" type="checkbox" className="w-5 h-5 text-green-600 mx-3  bg-transparent border-[#00F56059]  rounded-md focus:outline-none focus:ring-0" />
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <div className='flex justify-end items-center'>
                                        <label className="block  me-4 text-sm font-thin text-end   text-white"> <p >  أوافق على <span onClick={() => { setOpenTermsOfServiceModal(true) }} className='text-[#00F560] cursor-pointer'>الشروط والأحكام وسياسة الخصوصية الخاصة بمنصة استثمارات.</span></p> </label>
                                        <input onBlur={x.handleBlur} checked={x.values.agreement} onChange={x.handleChange} name="agreement" id="agreement" type="checkbox" className="w-5 h-5 text-green-600 mx-3  bg-transparent border-[#00F56059]  rounded-md focus:outline-none focus:ring-0" />
                                    </div>

                                </div>
                                {x.errors.agreement && x.touched.agreement && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-semibold" style={{ direction: 'rtl' }}>خطأ : </span>{x.errors.agreement}
                                </div>}
                            </>
                        )}
                        <div className="flex justify-between items-start mb-32 w-full">
                            <div className="flex flex-col-reverse  md:flex-row justify-start  ">
                                <button
                                    type="submit"
                                    disabled={submitdisable() || submitLoading}
                                    className={`text-white  rounded-full  text-xl ${submitdisable() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    تسجيل {submitLoading && <Spinner color="info" aria-label="Info spinner example" />}
                                </button>

                                <button
                                    type="button"
                                    disabled={show1() || show2() || currentStep === 3}
                                    onClick={handleNext}
                                    className={`text-white  rounded-full  text-xl ${show1() || show2() || currentStep === 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    التالى
                                </button>
                            </div>
                            <div className="flex justify-end  items-start ">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentStep === 1}
                                    className={`text-white rounded-full  text-xl ${currentStep === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium   px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    السابق

                                </button>



                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;




