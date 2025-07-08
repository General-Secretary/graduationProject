'use client';
import axios from "axios";
import React, { useState } from 'react'
import * as Yup from "yup";
import { Button, Modal } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { useFormik } from 'formik';
import { Spinner } from "flowbite-react";
import 'react-international-phone/style.css';
import { InputAdornment, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { defaultCountries, FlagImage, parseCountry, usePhoneInput, } from 'react-international-phone';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

import { TermsOfService } from '@/components/TermsOfService';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
const v = `
يجب أن يكون كلمة المرور مكونة من 8 أحرف أو أكثر وتحتوي على:
1. حرف واحد على الأقل من الحروف الكبيرة .
2. حرف واحد على الأقل من الحروف الصغيرة .
3. رقم واحد على الأقل (0-9).
4. رمز خاص واحد على الأقل (مثل #؟!@$%^&*-).
`;

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
const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [openTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false);//خاص بالمودال 
    const [preview, setPreview] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [fileName, setFileName] = useState("لم يتم اختيار ملف بعد");
    const [submitLoading, setsubmitLoading] = useState(false);
    const router = useRouter();

    const validation = Yup.object().shape({
        name: Yup.string().required("يجب ادخال الاسم ").matches(/^[\u0621-\u064A]+ [\u0621-\u064A]+ [\u0621-\u064A]+$/, "يجب ادخال اسم عربي ثلاثي").min(3).max(20),
        englishName: Yup.string().required("يجب ادخال الاسم بالانجليزيه").matches(/^[A-Za-z- ]+$/, "الاسم باللغه الانجليزيه لو سمحت").min(3).max(20),
        image: Yup.mixed().required("الصورة مطلوبة").test("fileRequired", "يجب رفع صورة", (value) => value instanceof File),
        phone: Yup.string().matches(/^\+?[1-9]\d{3,14}$/, '! ادخل رقم تليفون او محمول صالح').required('! التليفون مطلوب'),
        description: Yup.string().matches(/^\s*(\S+\s+){2,499}\S+\s*$/, "يجب الا يقل الوصف عن 3 كلمات والا يزيد عن 500 كلمه").required("يجب ادخال وصف المستثمر").min(3),
        email: Yup.string().required("يجب ادخال البريد الالكتروني").email("ادخل بريد الكتروني صالح"),
        password: Yup.string().required("ادخل كلمه سر مناسبه").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, v),
        rePassword: Yup.string().required("اعد كتابه كلمه السر").oneOf([Yup.ref("password")], "يجب مطابقه كلمه السر الاصليه "),
        jopTitle: Yup.string().required("يجب ادخال المسمي الوظيفي ").min(3),
        organization: Yup.string().required("يجب ادخال اسم المنظمه او الشركه ").min(3),
        investFields: Yup.array().min(1, "يجب اختيار خيار واحد على الأقل").required("هذا الحقل مطلوب"),
        investLevel: Yup.string().oneOf(["Pre-Seed", "Seed", "Series A", "Series B", "Late Stage / IPO"], "الاختيار غير صحيح").required("ادخل مرحله مناسبه"),
        currency: Yup.string().oneOf(["EGP", "USD", "EUR", "SAR", "AED"], "الاختيار غير صحيح").required("ادخل عمله مناسبه"),
        money: Yup.string().matches(/^\d+$/, "الرجاء إدخال أرقام فقط"),
        nationalId: Yup.string().required("يجب ادخال الرقم القومي (لو مصرى ) او جواز السفر( لو غير مصرى)  ").matches(/(^\d{14}$)|(^[A-Za-z0-9]{6,9}$)/, "يجب ادخال id صالح "),
        CommercialRegister: Yup.string().required("يجب ادخال رقم السجل التجارى او الرخصه الاستثماريه ").matches(/(^\d{10,15}$)|(^[A-Za-z0-9]{10,15}$)/, " يجب ادخال رقم السجل التجارى او الرخصه الاستثماريه صالحين"),
        notification: Yup.boolean(),
        agreement: Yup.boolean().oneOf([true], "يجب الموافقه على الشروط والاحكام بعد الاطلاع عليها لاتمام التسجيل معنا").required()
    });
    // async function submitting(value) {
    //     console.log(value)
    //     const formData = new FormData();
    //     formData.append("fullArabicName", value.name);
    //     formData.append("fullEnglishName", value.englishName);
    //     if (value.image) {
    //         formData.append("profilePhoto", value.image);
    //     }
    //     if (value.money) {
    //         formData.append("availableBudget", value.money);
    //     }
    //     formData.append("email", value.email);
    //     formData.append("password", value.password);
    //     formData.append("passwordConfirm", value.rePassword);
    //     formData.append("jobTitle", value.jopTitle);
    //     formData.append("organization", value.organization);
    //     formData.append("phoneNumber", value.phone);
    //     formData.append("investmentStage", value.investLevel);
    //     formData.append("currency", value.currency);
    //     formData.append("investmentfields", JSON.stringify(value.investFields));
    //     formData.append("idNumber", value.nationalId);
    //     formData.append("investmentLicenseNumber", value.CommercialRegister);
    //     formData.append("notification", value.notification);
    //     formData.forEach((value, key) => {
    //         console.log(key, value);
    //     });
    // }


    async function submitting(value) {
        try {
            console.log(value)
            const formData = new FormData();
            formData.append("fullArabicName", value.name);
            formData.append("fullEnglishName", value.englishName);
            if (value.image) {
                formData.append("profilePhoto", value.image);
            }
            if (value.money) {
                formData.append("availableBudget", value.money);
            }
            formData.append("email", value.email);
            formData.append("description", value.description);
            formData.append("password", value.password);
            formData.append("passwordConfirm", value.rePassword);
            formData.append("jobTitle", value.jopTitle);
            formData.append("organization", value.organization);
            formData.append("phoneNumber", value.phone);
            formData.append("investmentStage", value.investLevel);
            formData.append("currency", value.currency);
            formData.append("investmentfields", JSON.stringify(value.investFields));
            formData.append("idNumber", value.nationalId);
            formData.append("investmentLicenseNumber", value.CommercialRegister);
            formData.append("notification", value.notification);
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            setsubmitLoading(true)
            const response = await axios.post(
                "https://estethmarat-estethmarats-projects.vercel.app/api/v1/investors/register", // 🔹 ضع رابط الـ API الصحيح هنا
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
                                    {response.data.status}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-green-500">
                        <button
                            onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
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
                                    {error?.response?.data?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-red-500">
                        <button
                            onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
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
            name: "", englishName: "", image: null, description: "", email: "", password: "", rePassword: "", jopTitle: "", organization: "", phone: "", investFields: [], investLevel: "", currency: "", money: "", nationalId: "", CommercialRegister: "", notification: false, agreement: false
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
    };
    function show1() {
        if (currentStep == 1) {
            if (Object.keys(x.touched).length == 0 || x.errors.name || !x.values.image || x.errors.englishName || x.errors.email || x.errors.password || x.errors.rePassword) {
                return true
            }
        } return false
    }
    function show2() {
        if (currentStep == 2) {
            if (Object.keys(x.touched).length == 0 || x.errors.jopTitle || x.errors.organization || x.errors.phone|| x.errors.description  || x.errors.investFields || x.errors.investLevel || x.errors.currency) {
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
    } console.log(x)
    return (
        <div className={vazir.className}>
            <div className="my-20">
                <form onSubmit={x.handleSubmit}>
                    {openTermsOfServiceModal && (
                        <TermsOfService
                            openTermsOfServiceModal={openTermsOfServiceModal}
                            setOpenTermsOfServiceModal={setOpenTermsOfServiceModal}
                        />
                    )}//خاص بالمودال
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
                                    <p className={`${currentStep === 2 || currentStep === 3 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}>بيانات شخصية </p>
                                </div>
                            </div>
                            <div className='w-1/3 px-1'>
                                <div className={` border-b-[3px]  ${currentStep === 3 ? "border-b-[#00F560]" : "border-b-[#A1A1AA]"}`}>
                                    <p className={`${currentStep === 3 ? "text-[#00F560]" : "text-[#A1A1AA]"} m-2`}> تأكيد الهوية</p>
                                </div>
                            </div>
                        </div>
                        {currentStep === 1 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='name' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        الاسم{' '}
                                    </label>
                                    <input placeholder=' اسمك' onBlur={x.handleBlur} value={x.values.name} onChange={x.handleChange} name='name' id='name' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.name && x.touched.name && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.name}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='englishName' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        اسم المستخدم (بالانجليزيه){' '}
                                    </label>
                                    <input placeholder=' @Example_A' onBlur={x.handleBlur} value={x.values.englishName} onChange={x.handleChange} name='englishName' id='englishName' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
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
                                <div className='mb-10'>
                                    <div className="flex items-center   justify-end">
                                        <div className=' flex flex-col xs:flex-row  justify-between items-center w-full' style={{ direction: "rtl" }}>
                                            <div className='w-[104px] border my-5 xs:my-0 overflow-hidden border-[#00F56059] justify-center flex items-center h-[104px] rounded-full bg-[#D9D9D940]'>
                                                {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" /> || <i className="fa-regular text-white opacity-70 text-[56px] fa-user"></i>}
                                            </div>
                                            <div className='w-[85%] flex-col xs:flex-row flex justify-start items-center '>
                                                <label onClick={(event) => { x.setFieldTouched("image", true) }} htmlFor="image" className="bg-[#00F560] mx-4  text-white p-2 px-4 rounded-full cursor-pointer">
                                                    ارفع صورة شخصيه
                                                </label>
                                                <span className="ml-4 mt-4 xs:mt-0 text-white">{fileName}</span>
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
                                                    x.setFieldValue("image", file);
                                                    if (file) {
                                                        setPreview(URL.createObjectURL(file));
                                                        x.setFieldValue("image", file);
                                                    } else setPreview(null);
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
                                    <label htmlFor='email' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> البريد الالكتروني </p>{' '}
                                    </label>
                                    <input placeholder=' example@gmail.com' onBlur={x.handleBlur} value={x.values.email} onChange={x.handleChange} name='email' id='email' type='email' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.email && x.touched.email && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.email}
                                    </div>
                                )}
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
                                    </div>
                                )}
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className='mb-10'>
                                    <label htmlFor='jopTitle' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        المسمي الوظيفي{' '}
                                    </label>
                                    <input placeholder=' المسمي الوظيفي' onBlur={x.handleBlur} value={x.values.jopTitle} onChange={x.handleChange} name='jopTitle' id='jopTitle' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.jopTitle && x.touched.jopTitle && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.jopTitle}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='description' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        وصف المستثمر (بحد اقصي 500 كلمه) {' '}
                                    </label>
                                    <textarea placeholder='  وصف المستثمر' onBlur={x.handleBlur} value={x.values.description} onChange={x.handleChange} name='description' rows="5" id='description' type='text' className='bg-transparent border  border-green-300  text-lg rounded-[35px] py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.description && x.touched.description && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.description}
                                    </div>
                                )}
                                <div className='mb-10'>
                                    <label htmlFor='organization' className='block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white'>
                                        {' '}
                                        المنظمة/الشركه{' '}
                                    </label>
                                    <input placeholder=' المنظمة/الشركه' onBlur={x.handleBlur} value={x.values.organization} onChange={x.handleChange} name='organization' id='organization' type='text' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                                    />
                                </div>
                                {x.errors.organization && x.touched.organization && (
                                    <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                        <span className='font-semibold' style={{ direction: 'rtl' }}>
                                            خطأ :{' '}
                                        </span>
                                        {x.errors.organization}
                                    </div>
                                )}
                                {/* <div className='mb-10  w-full'>
                                    <label htmlFor='phone' className='block mb-2 me-4 text-sm font-thin text-end   text-white'>
                                        <p> رقم هاتف للتواصل </p>{' '}
                                    </label>
                                    <TextField
                                        variant="outlined"
                                        value={inputValue}
                                        name='phone'
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
                                                        )}
                                                    >
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
                                )} */}


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



                                <div className='flex justify-between  flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='investLevel' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p>  مرحلة الاستثمار المفضلة </p>
                                            <p className='text-gray-200'>( مرحلة المشاريع التي تفضل الاستثمار بها)</p>{' '}
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="investLevel" onBlur={x.handleBlur} value={x.values.investLevel} onChange={x.handleChange} className=" border mb-4 border-green-300 truncate text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option >مرحلة الاستثمار </option>
                                                <option value="Pre-Seed">Pre-Seed ( النماذج الأولية)
                                                </option>
                                                <option value="Seed">Seed (مرحلة التأسيس والتمويل الأولي)
                                                </option>
                                                <option value="Series A">Series A (التوسع الأولي)
                                                </option>
                                                <option value="Series B">Series B  (التوسع والنمو السريع)
                                                </option>
                                                <option value="Late Stage / IPO">Late Stage / IPO  (ما قبل الطرح العام)</option>
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.investLevel && x.touched.investLevel && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.investLevel}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14  relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='investFields' className='block mb-2  me-4    text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> مجالات الاستثمار</p>
                                            <p className='text-gray-200'>(القطاعات التي تفضل الاستثمار بها)</p>{' '}
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <div className='border truncate select-none mb-4 text-start ps-10 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal(true); x.setFieldTouched("investFields", true); }}> {x.values.investFields[0] || "مجالات الاستثمار "}</div>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                            <Modal
                                                dismissible
                                                show={openModal}
                                                onClose={() => setOpenModal(false)}
                                                className="bg-black bg-opacity-80  backdrop-blur-sm"
                                            >
                                                <Modal.Header className="bg-black border  border-b border-green-400">
                                                    <p className="text-white"> مجالات الاستثمار</p>
                                                </Modal.Header>
                                                <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                    <div className="space-y-6">
                                                        {options.map((option) => (
                                                            <label key={option} className="flex items-center mb-2 text-sm font-thin text-white">
                                                                {option.includes('-') ? (
                                                                    <p className="text-green-400 border mb-4 font-semibold border-green-300 text-center text-lg rounded-full py-2    block w-full p-2.5 ">{option.replace('-', '')}</p>
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="investFields"
                                                                            value={option}
                                                                            checked={x.values.investFields.includes(option)}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                let newSelection = [...x.values.investFields];
                                                                                if (checked) {
                                                                                    newSelection.push(value);
                                                                                } else {
                                                                                    newSelection = newSelection.filter(
                                                                                        (item) => item !== value
                                                                                    );
                                                                                }
                                                                                x.setFieldValue("investFields", newSelection);
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
                                                        onClick={() => setOpenModal(false)}
                                                    >
                                                        done
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                        {x.errors.investFields && x.touched.investFields && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.investFields}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='flex justify-between flex-col-reverse xs:flex-row items-center'>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='currency' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> العمله</p>
                                        </label>
                                        <div className="relative" style={{ direction: "rtl" }}>
                                            <select id="currency" onBlur={x.handleBlur} value={x.values.currency} onChange={x.handleChange} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                                <option defaultValue>العملة </option>
                                                <option value="USD">USD</option>
                                                <option value="EGP">EGP</option>
                                                <option value="EUR">EUR</option>
                                                <option value="SAR">SAR</option>
                                                <option value="AED">AED</option>
                                            </select>
                                            <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                        </div>
                                        {x.errors.currency && x.touched.currency && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.currency}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-14 relative w-[90%] xs:w-[45%] ' >
                                        <label htmlFor='money' className='block my-4  me-4 text-sm font-thin text-end  font-vazir text-white'>
                                            {' '}
                                            <p> المبلغ المتوقع استثماره (اختياري)</p>
                                        </label>
                                        <input placeholder=' .' type="number" pattern="\d*" onBlur={x.handleBlur} value={x.values.money} onChange={x.handleChange} name='money' id='money' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                                        {x.errors.money && x.touched.money && (
                                            <div className='p-4 mb-4 absolute b-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                                                <span className='font-semibold' style={{ direction: 'rtl' }}>
                                                    خطأ :{' '}
                                                </span>
                                                {x.errors.money}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className="mb-10">
                                    <label htmlFor="nationalId" className="block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white"> الرقم القومي/ رقم جواز السفر </label>
                                    <input placeholder=' .' onBlur={x.handleBlur} value={x.values.nationalId} onChange={x.handleChange} name="nationalId" id="nationalId" type="text" className="bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 " />
                                </div>
                                {x.errors.nationalId && x.touched.nationalId && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-semibold" style={{ direction: 'rtl' }}>خطأ : </span>{x.errors.nationalId}
                                </div>}
                                <div className="mb-10">
                                    <label htmlFor="CommercialRegister" className="block mb-2 me-4 text-sm font-thin text-end  font-vazir text-white">  رقم السجل التجاري/ الرخصة الاستثمارية  </label>
                                    <input placeholder=' .' onBlur={x.handleBlur} value={x.values.CommercialRegister} onChange={x.handleChange} name="CommercialRegister" id="CommercialRegister" type="text" className="bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 " />
                                </div>
                                {x.errors.CommercialRegister && x.touched.CommercialRegister && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-semibold" style={{ direction: 'rtl' }}>خطأ : </span>{x.errors.CommercialRegister}
                                </div>}
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
                                {/* <button
                                    type="submit"
                                    disabled={submitdisable()}
                                    className={`text-white  rounded-full  text-xl ${submitdisable() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2cce6d] hover:bg-[#25ff7c]  focus:ring-green-300'} font-medium px-8 py-3 me-2 mb-2  focus:outline-none `}>
                                    تسجيل
                                </button> */}
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