"use client";
import { Drawer } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { Modal } from "flowbite-react";

const countries = ["السعوديه", "الإمارات", "مصر", "الكويت", "البحرين", "قطر", "عمان", "الأردن", "لبنان", "فلسطين", "اليمن", "الجزائر", "المغرب", "تونس", "ليبيا", "السودان", "موريتانيا", "جيبوتي", "جزر القمر", "الصومال"
]
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
const options2 = [
    "خدمات تقنية وتكنولوجية",
    "خدمات التسويق والترويج",
    "خدمات لوجستية وتشغيلية",
    "خدمات التدريب والتطوير المهني",
    "خدمات القانون والاستشارات",
    "خدمات إدارية",
    "خدمات أخرى"
];
const options3 = [
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
const options4 = [
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

export function FilterDrawer({ filter, setfilter }) {
    const [isOpen, setIsOpen] = useState(false);
    const [accountType, setAccountType] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [businessField, setBusinessField] = useState([]);
    const [wantedServices, setWantedServices] = useState([]);
    const [organizationType, setorganizationType] = useState("");
    const [charityorganizationType, setcharityorganizationType] = useState("");
    const [country, setCountry] = useState("");
    const [supportCountry, setsupportCountry] = useState("");
    const [charityCountry, setcharityCountry] = useState("");
    const [stage, setStage] = useState("");
    const [rangeFrom, setRangeFrom] = useState("");
    const [rangeTo, setRangeTo] = useState("");
    const [supportedProjectFields, setsupportedProjectFields] = useState([]);
    const [charityFieldsSupported, setcharityFieldsSupported] = useState([]);
    function filterCompanyData(data) {
        if (data.accountType === "شركة") {
            return {
                businessField: data.businessField,
                accountType: data.accountType,
                country: data.country,
                rangeFrom: data.rangeFrom,
                rangeTo: data.rangeTo,
                stage: data.stage,
                wantedServices: data.wantedServices
            };
        } else if (data.accountType === "مستثمر") {
            return {
                accountType: data.accountType,
            };
        } else if (data.accountType === "منظمة داعمة") {
            return {
                accountType: data.accountType,
                organizationType: data.organizationType,
                supportCountry: data.supportCountry,
                supportedProjectFields: data.supportedProjectFields,
            };
        } else if (data.accountType === "منظمة خيرية") {
            return {
                accountType: data.accountType,
                charityCountry: data.charityCountry,
                charityFieldsSupported: data.charityFieldsSupported,
                charityorganizationType: data.charityorganizationType,
            };
        } else if (data.accountType === "منشور") {
            return {
                accountType: data.accountType,
            };
        }
        return {}; // إرجاع كائن فارغ في حالة لم يكن accountType "شركة"
    }
    function cleanObject(obj) {
        return Object.fromEntries(
            Object.entries(obj).filter(
                ([_, value]) =>
                    value !== "" && // استبعاد القيم الفارغة ""
                    value !== null && // استبعاد القيم null
                    !(Array.isArray(value) && value.length === 0) // استبعاد المصفوفات الفارغة []
            )
        );
    }
    
    const handleClose = () => {
        setIsOpen(false);
        let filterObj = {
            accountType, businessField, wantedServices, organizationType
            , charityorganizationType, country, supportCountry, charityCountry,
            stage, rangeFrom, rangeTo, supportedProjectFields, charityFieldsSupported
        }
        let final1 = filterCompanyData(filterObj)
        let final2 =cleanObject(final1)
        setfilter(final2)
    }
    const customTheme = {
        root: {
            base: "fixed z-[12000] overflow-y-auto bg-black p-4 transition-transform dy-800",
            backdrop: "fixed inset-0 z-30 bg-gray-900/50 dy-900/80",
            edge: "bottom-16",
            position: {
                top: {
                    on: "left-0 right-0 top-0 w-full transform-none",
                    off: "left-0 right-0 top-0 w-full -translate-y-full",
                },
                right: {
                    on: "right-0 top-0 h-screen w-60 transform-none",
                    off: "right-0 top-0 h-screen w-60 translate-x-full",
                },
                bottom: {
                    on: "bottom-0 left-0 right-0 w-full transform-none",
                    off: "bottom-0 left-0 right-0 w-full translate-y-full",
                },
                left: {
                    on: "left-0 top-0 h-screen w-60 transform-none",
                    off: "left-0 top-0 h-screen w-60 -translate-x-full",
                },
            },
        },
        header: {
            inner: {
                closeButton:
                    "absolute end-2.5 hover:bg-green-400 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dbg-gray-600 dtext-white",
                closeIcon: "h-4 w-4 hover:bg-green-400 ",
                titleIcon: "me-2.5 h-4 w-4",
                titleText: "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dray-400",
            },
            collapsed: {
                on: "hidden",
                off: "block",
            },
        },
        items: {
            base: "",
        },
    };
    return (
        <>
            <div className="flex my-10 items-center justify-center">
                <button className=" text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-md px-6 py-2" onClick={() => setIsOpen(true)}>فلتر البحث <HiAdjustments className={"inline"} />
                </button>
            </div>
            <Drawer className="overflow-x-hidden" theme={customTheme} style={{ direction: "rtl" }} open={isOpen} onClose={handleClose} position="right">
                <Drawer.Header titleIcon={HiAdjustments} title="فلتر البحث" />
                <Drawer.Items>
                    <div>
                        <p className="text-white">
                            انت تبحث عن :
                        </p>
                        <div className="flex my-2  items-center ">
                            <input id="شركة"
                                value="شركة"
                                checked={accountType === "شركة"}
                                onChange={(e) => setAccountType(e.target.value)}
                                type="radio" name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="شركة" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300"> شركة</label>
                        </div>

                        {/* "company","investor","supportOrganization","charityOrganization", */}

                        <div className="flex my-2 items-center">
                            <input id="مستثمر" type="radio" value="مستثمر"
                                checked={accountType === "مستثمر"}
                                onChange={(e) => setAccountType(e.target.value)} name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="مستثمر" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300"> مستثمر</label>
                        </div>
                        <div className="flex my-2 items-center">
                            <input id="منظمة داعمة" type="radio" value="منظمة داعمة"
                                checked={accountType === "منظمة داعمة"}
                                onChange={(e) => setAccountType(e.target.value)} name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="منظمة داعمة" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300"> منظمه داعمه</label>
                        </div>
                        <div className="flex my-2 items-center">
                            <input id="منظمة خيرية" type="radio" value="منظمة خيرية"
                                checked={accountType === "منظمة خيرية"}
                                onChange={(e) => setAccountType(e.target.value)} name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="منظمة خيرية" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300">منظمه خيريه </label>
                        </div>
                        <div className="flex my-2 items-center">
                            <input id="منشور" type="radio" value="منشور"
                                checked={accountType === "منشور"}
                                onChange={(e) => setAccountType(e.target.value)} name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="منشور" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300">منشور  </label>
                        </div>
                    </div>
                    <div className={`${accountType != "شركة" && "hidden"}`}>
                        <div className="">
                            <p className="  my-5 text-white">
                                وصف الشركة :
                            </p>
                            <div className="relative" style={{ direction: "rtl" }}>
                                <div className='border select-none mb-4 text-start ps-10 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400  truncate text-white focus:ring-green-500' onClick={() => { setOpenModal(true); }}> {businessField[0] || "مجال الشركة"}</div>
                                <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                <Modal
                                    dismissible
                                    show={openModal}
                                    onClose={() => setOpenModal(false)}
                                    className="bg-black z-[120000] bg-opacity-80  backdrop-blur-sm" >
                                    <Modal.Header className="bg-black border  border-b border-green-400">
                                        <p className="text-white">  مجالات الشركة</p>
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
                                                                name="Fields"
                                                                value={option}
                                                                checked={businessField.includes(option)}
                                                                onChange={(e) => {
                                                                    const { checked, value } = e.target;
                                                                    let newSelection = [...businessField];
                                                                    if (checked) {
                                                                        newSelection.push(value);
                                                                    } else {
                                                                        newSelection = newSelection.filter(
                                                                            (item) => item !== value
                                                                        );
                                                                    }
                                                                    setBusinessField(newSelection);
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
                                            onClick={() => setOpenModal(false)} >
                                            done
                                        </button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div>
                            <div className='  relative' >
                                <div className="relative" style={{ direction: "rtl" }}>
                                    <select id="country" value={country} onChange={(e) => { setCountry(e.target.value) }} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                        <option value="">اختر الدوله </option>
                                        {countries.map((country, id) => {
                                            return <option key={id} value={country}>{country}
                                            </option>
                                        })}
                                    </select>
                                    <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='  relative  ' >
                                <div className="relative" style={{ direction: "rtl" }}>
                                    <select id="level" value={stage} onChange={(e) => { setStage(e.target.value) }} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 truncate text-white focus:ring-green-500">
                                        <option value="">مرحلة المشروع  </option>
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
                            </div>
                        </div>
                        <div>
                            <div className="relative" style={{ direction: "rtl" }}>
                                <div className='border select-none mb-4 text-start ps-10 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400  truncate text-white focus:ring-green-500' onClick={() => { setOpenModal2(true); }}> {wantedServices[0] || "  الخدمات المطلوبه "}</div>
                                <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                <Modal
                                    dismissible
                                    show={openModal2}
                                    onClose={() => setOpenModal2(false)}
                                    className="bg-black z-[120000] bg-opacity-80  backdrop-blur-sm"
                                >
                                    <Modal.Header className="bg-black border  border-b border-green-400">
                                        <p className="text-white">الخدمات التي يحتاجها المشروع </p>
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
                                                                name="servicesNeeded"
                                                                value={option}
                                                                checked={wantedServices.includes(option)}
                                                                onChange={(e) => {
                                                                    const { checked, value } = e.target;
                                                                    let newSelection = [...wantedServices];
                                                                    if (checked) {
                                                                        newSelection.push(value);
                                                                    } else {
                                                                        newSelection = newSelection.filter(
                                                                            (item) => item !== value
                                                                        );
                                                                    }
                                                                    setWantedServices(newSelection);
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
                        </div>
                        <div >
                            <div className=' relative w-full ' >
                                <p className="  my-5 text-white">
                                    التمويل المطلوب  :
                                </p>
                                <label htmlFor='rangeFrom' className='block my-4   ms-4 text-sm font-thin text-start  font-vazir text-white'>
                                    {' '}
                                    من
                                </label>
                                <input placeholder=' .' type="number" pattern="\d*" value={rangeFrom} onChange={(e) => { setRangeFrom(e.target.value) }} name='rangeFrom' id='rangeFrom' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                            </div>
                            <div className=' relative w-full ' >
                                <label htmlFor='rangeTo' className='block my-4  ms-4 text-sm font-thin text-start  font-vazir text-white'>
                                    {' '}
                                    <p className="me-auto">  الى  </p>
                                </label>
                                <input placeholder=' .' type="number" pattern="\d*" value={rangeTo} onChange={(e) => { setRangeTo(e.target.value) }} name='rangeTo' id='rangeTo' className=' border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 bg-transparent   ' />
                            </div>
                        </div>
                    </div>
                    <div className={`${accountType != "منظمة داعمة" && "hidden"}`}>
                        <div>
                            <p className="  my-5 text-white">
                                وصف المنظمه الداعمه :
                            </p>
                            <div className='  relative' >
                                <div className="relative" style={{ direction: "rtl" }}>
                                    <select id="supportCountry" value={supportCountry} onChange={(e) => { setsupportCountry(e.target.value) }} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                        <option value="">اختر الدوله </option>
                                        {countries.map((supportCountry, id) => {
                                            return <option key={id} value={supportCountry}>{supportCountry}
                                            </option>
                                        })}
                                    </select>
                                    <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                </div>
                            </div>
                        </div>
                        <div className='relative w-full ' >
                            <div className="relative" style={{ direction: "rtl" }}>
                                <select id="organizationType" value={organizationType} onChange={(e) => { setorganizationType(e.target.value) }} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                    <option value=""> نوع المنظمة</option>
                                    <option value="حاضنة الأعمال">حاضنة الأعمال (Business Incubator)</option>
                                    <option value="مسرعة الأعمال">مسرعة الأعمال (Startup Accelerator)</option>
                                    <option value="مركز الابتكار والتكنولوجيا">مركز الابتكار والتكنولوجيا (Innovation Hub)</option>
                                    <option value="رأس المال الجريء">رأس المال الجريء (Venture Capital Firm)</option>
                                    <option value="مؤسسة تمويل جماعي">مؤسسة تمويل جماعي (Crowdfunding Platform)</option>
                                    <option value="بنك/ مؤسسة تمويلية">بنك/ مؤسسة تمويلية (Bank/Financial Institution)</option>
                                    <option value="منظمة حكومية/ هيئة اقتصادية">منظمة حكومية/ هيئة اقتصادية (Government Organization/Economic Authority)</option>
                                    <option value="أخرى">أخرى (Other)</option>
                                </select>
                                <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                            </div>
                        </div>
                        <div className=' relative w-full ' >
                            <div className="relative" style={{ direction: "rtl" }}>
                                <div className='border select-none mb-4 text-start ps-10 truncate border-green-300  text-lg rounded-full py-2.5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal3(true); }}> {supportedProjectFields[0] || "مجالات المشاريع التي تدعمها المنظمه "}</div>
                                <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                <Modal
                                    dismissible
                                    show={openModal3}
                                    onClose={() => setOpenModal3(false)}
                                    className="bg-black  z-[120000] bg-opacity-80  backdrop-blur-sm"
                                >
                                    <Modal.Header className="bg-black border  border-b border-green-400">
                                        <p className="text-white"> مجالات المشاريع </p>
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
                                                                name="supportedProjectFields"
                                                                value={option}
                                                                checked={supportedProjectFields.includes(option)}
                                                                onChange={(e) => {
                                                                    const { checked, value } = e.target;
                                                                    let newSelection = [...supportedProjectFields];
                                                                    if (checked) {
                                                                        newSelection.push(value);
                                                                    } else {
                                                                        newSelection = newSelection.filter(
                                                                            (item) => item !== value
                                                                        );
                                                                    }
                                                                    setsupportedProjectFields(newSelection);
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
                        </div>
                    </div>
                    <div className={`${accountType != "منظمة خيرية" && "hidden"}`}>
                        <div>
                            <p className="  my-5 text-white">
                                وصف المنظمه الخيريه :
                            </p>
                            <div className='  relative' >
                                <div className="relative" style={{ direction: "rtl" }}>
                                    <select id="charityCountry" value={charityCountry} onChange={(e) => { setcharityCountry(e.target.value) }} className=" border mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                        <option value="">اختر الدوله </option>
                                        {countries.map((charityCountry, id) => {
                                            return <option key={id} value={charityCountry}>{charityCountry}
                                            </option>
                                        })}
                                    </select>
                                    <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                </div>
                            </div>
                        </div>
                        <div className=' relative w-full ' >
                            <div className="relative" style={{ direction: "rtl" }}>
                                <select id="charityorganizationType" value={charityorganizationType} onChange={(e) => { setcharityorganizationType(e.target.value) }} className=" border  mb-4 border-green-300  text-lg rounded-full py-2 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500">
                                    <option value=""> نوع المنظمه</option>
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
                        </div>
                        <div className='  relative w-full ' >
                            <div className="relative" style={{ direction: "rtl" }}>
                                <div className='border select-none truncate mb-4  text-start ps-10 border-green-300  text-lg rounded-full py-2.5 bg-black   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500' onClick={() => { setOpenModal4(true); }} > {charityFieldsSupported[0] || "انواع المشاريع "}</div>
                                <i className="fa-solid px-2 text-[#02C04D] fa-caret-down absolute top-1/2 left-2 transform -translate-y-1/2"></i>
                                <Modal
                                    dismissible
                                    show={openModal4}
                                    onClose={() => setOpenModal4(false)}
                                    className="bg-black  z-[120000] bg-opacity-80  backdrop-blur-sm"
                                >
                                    <Modal.Header className="bg-black border  border-b border-green-400">
                                        <p className="text-white">  انواع المشاريع التي تدعمها المنظمة </p>
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
                                                                name="charityFieldsSupported"
                                                                value={option}
                                                                checked={charityFieldsSupported.includes(option)}
                                                                onChange={(e) => {
                                                                    const { checked, value } = e.target;
                                                                    let newSelection = [...charityFieldsSupported];
                                                                    if (checked) {
                                                                        newSelection.push(value);
                                                                    } else {
                                                                        newSelection = newSelection.filter(
                                                                            (item) => item !== value
                                                                        );
                                                                    }
                                                                    setcharityFieldsSupported(newSelection);
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
                        </div>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
    );
}
