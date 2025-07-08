"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import VideoEmbed from './VideoEmbed';
import { Spinner } from "flowbite-react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Button, Popover } from "flowbite-react";
import Comments from './Comments';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loading from './../../loading';
import { Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import RatingForInvestor from './RatingForInvestor';
import { Vazirmatn } from 'next/font/google';
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import CompanySlider from './CompanySlider';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function Page({ params }) {
    const { id } = params;
    const decodedId = decodeURIComponent(id);
    console.log(decodedId);
    const [investors, setInvestors] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [offerContent, setOfferContent] = useState("");
    const [ServiceOfferContent, setServiceOfferContent] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [company, setCompany] = useState(null);
    const [saveLoading, setsaveLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setTokenOfTheUser] = useState(null);
    const [openFinanceOfferModal, setOpenFinanceOfferModal] = useState(false);
    const [openServiceOfferModal, setOpenServiceOfferModal] = useState(false);
    const [role, setRoleOfTheUser] = useState(null);
    const [userId, setIdOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [avgReviews, setAvgReviews] = useState(null);
    const dispatch = useDispatch();
    const getRandomImage = () => {
        return `https://picsum.photos/80?random=${Math.floor(Math.random() * 1000)}`;
    };
    useEffect(() => {
        if (!loading) {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100); // تأخير بسيط بعد اختفاء اللودينج
                }
            }
        }
    }, [loading]);
    // useEffect(() => {
    //     const fetchUserDataAndCompany = async () => {
    //         try {
    //             const result = await dispatch(fetchUserToken()).unwrap();
    //             const token = result;
    //             if (!token) throw new Error("User Token is null");
    //             setTokenOfTheUser(token)
    //             const result2 = await dispatch(fetchUserRole()).unwrap();
    //             const role = result2;
    //             if (!role) throw new Error("User Role is null");
    //             setRoleOfTheUser(role)
    //             const result3 = await dispatch(fetchUserId()).unwrap();
    //             const id = result3;
    //             if (!id) throw new Error("User id is null");
    //             setIdOfTheUser(id)
    //             const [resCompany, resInvestors, resTotalReviewsArray, resAvgRating] = await Promise.all([
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/companies/${decodedId}`),
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/investors/invested?companyId=${decodedId}`),
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews?companyId=${decodedId}`),
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews/avg-rating?companyId=${decodedId}`),
    //             ]);
    //             if (!resCompany.ok) {
    //                 throw new Error(`HTTP error! status: ${resCompany.status}`);
    //             }
    //             if (!resInvestors.ok) {
    //                 throw new Error(`HTTP error! status: ${resInvestors.status}`);
    //             }
    //             if (!resTotalReviewsArray.ok) {
    //                 throw new Error(`HTTP error! status: ${resTotalReviewsArray.status}`);
    //             }
    //             if (!resAvgRating.ok) {
    //                 throw new Error(`HTTP error! status: ${resAvgRating.status}`);
    //             }
    //             const dataCompany = await resCompany.json();
    //             const dataInvestors = await resInvestors.json();
    //             const dataTotalReviews = await resTotalReviewsArray.json();
    //             const dataAvgRating = await resAvgRating.json();
    //             setCompany(dataCompany);
    //             setInvestors(dataInvestors);
    //             setReviews(dataTotalReviews)
    //             setAvgReviews(dataAvgRating)
    //             console.log(dataCompany);
    //             console.log(dataInvestors);
    //             console.log(dataTotalReviews);
    //             console.log(dataAvgRating);
    //         } catch (err) {
    //             setError(err.message);
    //             console.error('فشل في جلب البيانات:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchUserDataAndCompany();
    // }, [dispatch]);





useEffect(() => {
    const fetchUserDataAndCompany = async () => {
        try {
            // ✅ أولاً: جلب بيانات الشركة والمستثمرين والتقييمات (دايمًا)
            const [resCompany, resInvestors, resTotalReviewsArray, resAvgRating] = await Promise.all([
                fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/companies/${decodedId}`),
                fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/investors/invested?companyId=${decodedId}`),
                fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews?companyId=${decodedId}`),
                fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews/avg-rating?companyId=${decodedId}`),
            ]);

            if (!resCompany.ok) throw new Error(`HTTP error in company! status: ${resCompany.status}`);
            if (!resInvestors.ok) throw new Error(`HTTP error in investors! status: ${resInvestors.status}`);
            if (!resTotalReviewsArray.ok) throw new Error(`HTTP error in reviews! status: ${resTotalReviewsArray.status}`);
            if (!resAvgRating.ok) throw new Error(`HTTP error in avg rating! status: ${resAvgRating.status}`);

            const dataCompany = await resCompany.json();
            const dataInvestors = await resInvestors.json();
            const dataTotalReviews = await resTotalReviewsArray.json();
            const dataAvgRating = await resAvgRating.json();

            setCompany(dataCompany);
            setInvestors(dataInvestors);
            setReviews(dataTotalReviews);
            setAvgReviews(dataAvgRating);

            console.log(dataCompany);
            console.log(dataInvestors);
            console.log(dataTotalReviews);
            console.log(dataAvgRating);

            // ✅ ثانياً: جلب بيانات المستخدم لو فيه توكن
            const token = await dispatch(fetchUserToken()).unwrap();
            if (token) {
                setTokenOfTheUser(token);

                const role = await dispatch(fetchUserRole()).unwrap();
                setRoleOfTheUser(role || "guest");

                const id = await dispatch(fetchUserId()).unwrap();
                if (id) setIdOfTheUser(id);
            } else {
                console.log("زائر بدون توكن، تخطى بيانات المستخدم");
            }

        } catch (err) {
            setError(err.message);
            console.error('فشل في جلب البيانات:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchUserDataAndCompany();
}, [dispatch]);






    console.log(role);
    console.log(token);
    const sendRequest = async (data) => {
        try {
            setsaveLoading(true)
            console.log("Token:", token);
            console.log("Sending data:", data);
            let endpoint = '';
            switch (role) {
                case 'investor':
                    endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/save-profile';
                    break;
                case 'supportOrganization':
                    endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/supportOrganizations/save-profile';
                    break;
                case 'company':
                    endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/companies/save-profile';
                    break;
                case 'charityOrganization':
                    endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/charityOrganizations/save-profile';
                    break;
                default:
                    throw new Error('Invalid role type');
            }
            const response = await axios.post(
                endpoint,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setsaveLoading(false)
            const result = response.data;
            console.log(result)
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-[#00F560]">
                                    تم حفظ الحساب بنجاح
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-green-500">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 1000 });
            return result;
        } catch (error) {
            setsaveLoading(false)
            console.log(error)
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-red-600">
                                    {error?.response?.data.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-red-500">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 1000 });
        }
    };
    console.log(serviceType)
    // async function sendOfferRequest(content ) {
    //     const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/offers?companyId=${id}`;

    //     const data = {
    //         type: "عرض مالي",
    //         content: content
    //     };

    //     try {
    //         setModalLoading(true)
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         setModalLoading(false)
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-[#00F560]">
    //                                 تم تقديم العرض ,  عند الرد هيجيلك اشعار بذلك
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-l border-green-500">
    //                     <button
    //                         onClick={() => toast.dismiss(t.id)}
    //                         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    //                     >
    //                         Close
    //                     </button>
    //                 </div>
    //             </div>
    //         ), { duration: 1000 });
    //         setOfferContent("")
    //         setOpenFinanceOfferModal(false);
    //         if (!response.ok) {
    //             toast.custom((t) => (
    //                 <div
    //                     className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                         } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //                 >
    //                     <div className="flex-1 w-0 p-4">
    //                         <div className="flex items-start">
    //                             <div className="ml-3 flex-1">
    //                                 <p className="text-sm font-medium text-red-600">
    //                                     {"حدث خطأ أثناء إرسال العرض   "}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="flex border-l border-red-500">
    //                         <button
    //                             onClick={() => toast.dismiss(t.id)}
    //                             className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
    //                         >
    //                             Close
    //                         </button>
    //                     </div>
    //                 </div>
    //             ), { duration: 1000 });

    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }


    //         const result = await response.json();
    //         console.log("تم إرسال العرض بنجاح:", result);
    //         return result;
    //     } catch (error) {
    //         setModalLoading(false)
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-red-600">
    //                                 {"حدث خطأ أثناء إرسال العرض   "}
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-l border-red-500">
    //                     <button
    //                         onClick={() => toast.dismiss(t.id)}
    //                         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
    //                     >
    //                         Close
    //                     </button>
    //                 </div>
    //             </div>
    //         ), { duration: 1000 });
    //         console.error("حدث خطأ أثناء إرسال العرض:", error.message);
    //         // ممكن ترجع الخطأ لو عاوز تستخدمه في حتة تانية
    //         return null;
    //     }
    // }
    async function sendOfferRequest(content) {
    const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/offers?companyId=${id}`;

    const data = {
        type: "عرض مالي",
        content: content
    };

    try {
        setModalLoading(true);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        setModalLoading(false);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-[#00F560]">
                                تم تقديم العرض، عند الرد هيجيلك إشعار بذلك
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-green-500">
                    <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 1000 });

        setOfferContent("");
        setOpenFinanceOfferModal(false);

        console.log("تم إرسال العرض بنجاح:", result);
        return result;

    } catch (error) {
        setModalLoading(false);

        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-red-600">
                                حدث خطأ أثناء إرسال العرض
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-red-500">
                    <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 1000 });

        console.error("حدث خطأ أثناء إرسال العرض:", error.message);
        return null;
    }
}


    // async function sendServiceOffer(content) {
    //     const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/offers?companyId=${id}`;

    //     const data = {
    //         type: "عرض خدمة",
    //         content: content,
    //         serviceType: serviceType
    //     };

    //     try {
    //         setModalLoading(true)
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         setModalLoading(false)
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-[#00F560]">
    //                                 تم تقديم العرض ,  عند الرد هيجيلك اشعار بذلك
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-l border-green-500">
    //                     <button
    //                         onClick={() => toast.dismiss(t.id)}
    //                         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    //                     >
    //                         Close
    //                     </button>
    //                 </div>
    //             </div>
    //         ), { duration: 1000 });
    //         setServiceOfferContent("")
    //         setOpenServiceOfferModal(false);
    //         if (!response.ok) {
    //             toast.custom((t) => (
    //                 <div
    //                     className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                         } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //                 >
    //                     <div className="flex-1 w-0 p-4">
    //                         <div className="flex items-start">
    //                             <div className="ml-3 flex-1">
    //                                 <p className="text-sm font-medium text-red-600">
    //                                     {"حدث خطأ أثناء إرسال العرض   "}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="flex border-l border-red-500">
    //                         <button
    //                             onClick={() => toast.dismiss(t.id)}
    //                             className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
    //                         >
    //                             Close
    //                         </button>
    //                     </div>
    //                 </div>
    //             ), { duration: 1000 });

    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }


    //         const result = await response.json();
    //         console.log("تم إرسال العرض بنجاح:", result);
    //         return result;
    //     } catch (error) {
    //         setModalLoading(false)
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-red-600">
    //                                 {"حدث خطأ أثناء إرسال العرض   "}
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-l border-red-500">
    //                     <button
    //                         onClick={() => toast.dismiss(t.id)}
    //                         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
    //                     >
    //                         Close
    //                     </button>
    //                 </div>
    //             </div>
    //         ), { duration: 1000 });
    //         console.error("حدث خطأ أثناء إرسال العرض:", error.message);
    //         // ممكن ترجع الخطأ لو عاوز تستخدمه في حتة تانية
    //         return null;
    //     }
    // }

    async function sendServiceOffer(content) {
    const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/offers?companyId=${id}`;

    const data = {
        type: "عرض خدمة",
        content: content,
        serviceType: serviceType
    };

    try {
        setModalLoading(true);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        setModalLoading(false);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // ✅ توست النجاح بعد التأكد من نجاح الريسبونس
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-[#00F560]">
                                تم تقديم العرض، عند الرد هيجيلك إشعار بذلك
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-green-500">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 1000 });

        setServiceOfferContent("");
        setOpenServiceOfferModal(false);

        console.log("تم إرسال العرض بنجاح:", result);
        return result;

    } catch (error) {
        setModalLoading(false);

        // ✅ توست خطأ موحد داخل الكاتش فقط
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-red-600">
                                حدث خطأ أثناء إرسال العرض
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-red-500">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 1000 });

        console.error("حدث خطأ أثناء إرسال العرض:", error.message);
        return null;
    }
}

    if (loading) {
        return (
            <Loading />
        );
    }
    return (
        <div className={` ${vazir.className}`}>
            <div className='md:mt-32 mt-16'>
                <div style={{ direction: "rtl" }} className="bg-[#00F5601A] bg-opacity-10">
                    {selectedImage && (
                        <div
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
                            >
                                &times;
                            </button>
                            <img
                                src={selectedImage}
                                onClick={(e) => e.stopPropagation()}
                                alt="صورة مكبرة"
                                className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
                            />
                        </div>
                    )}
                    <div className="container m-auto flex flex-wrap justify-center items-center xl:w-[95%] ">
                        <div className='md:w-2/3 py-5 flex  justify-around items-center  md:my-0 border-b md:border-0 border-gray-700 w-full  '>
                            <div className='w-1/3  hidden md:inline  mx-5'>
                                <div className='w-[80px] mx-auto  text-center'>
                                    <img src={company?.data?.company?.companyPhoto} onClick={() => { setSelectedImage(company?.data?.company?.companyPhoto); }} className='w-full cursor-pointer' alt="" />
                                    <p style={{ whiteSpace: 'nowrap' }} className='text-[#8080808C] text-center'>@{company?.data?.company?.socialName}</p>
                                </div>
                            </div>
                            <div className='w-2/3 md:mx-auto'>
                                <div className="text-center">
                                    <p className="text-white font-extrabold xs:text-2xl md:text-3xl">{company?.data?.company?.companyName}  </p>
                                </div>
                                <div className='hidden md:block'>
                                    <div className="flex justify-around   items-center">
                                        {company?.data?.company?.companyField.slice(0, 2).map((field, index) => (
                                            <p key={index} className="text-end text-white text-sm font-thin md:text-md md:mx-3"> {field}</p>
                                        ))}
                                    </div>
                                    <p className="text-center text-white text-sm my-2 font-thin md:text-md md:mx-3 ">{company?.data?.company?.state}</p>
                                </div>
                                <div className='md:hidden'>
                                    <div className="flex justify-around   items-center">
                                        <Popover
                                            theme={{
                                                "base": "absolute z-20 inline-block w-max max-w-[100vw]  outline-none   rounded-lg shadow-sm  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
                                                "content": "z-10 overflow-hidden rounded-[7px]",
                                                "arrow": {
                                                    "base": "absolute h-2 w-2 z-0 rotate-45   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
                                                    "placement": "-4px"
                                                }
                                            }}
                                            aria-labelledby="profile-popover"
                                            content={
                                                <div className="w-64 p-3">
                                                    <p className='text-white text-start text-lg'>مجالات الشركة</p>
                                                    <div className="my-4 space-y-2">
                                                        {company?.data?.company?.companyField.map((field, index) => (
                                                            <div key={index} className='w-full'>
                                                                <p className='text-white text-start text-sm'>{field}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <button className="">
                                                <p className="text-end text-[#00F560] text-sm font-thin md:text-md md:mx-3"> مجالات الشركه ▼</p>
                                            </button>
                                        </Popover>
                                        <p className="text-center text-white text-sm font-thin md:text-md md:mx-3 ">{company?.data?.company?.state}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/3   md:hidden  '>
                                <div className='w-[50px]  ms-2  text-center'>
                                    <img src={company?.data?.company?.companyPhoto} onClick={() => { setSelectedImage(company?.data?.company?.companyPhoto); }} className='w-full cursor-pointer' alt="" />
                                    <p style={{ whiteSpace: 'nowrap' }} className='text-[#8080808C] text-start'>@{company?.data?.company?.socialName}</p>
                                </div>
                            </div>
                        </div>
                        <div className='md:w-1/3  w-full flex  justify-center items-center'>
                            <div className='md:w-1/3 my-5  md:ms-auto text-center'>
                                <div style={{ direction: "ltr" }}>
                                    {role == "company" || role == null || role == "charityOrganization" ?
                                        <Rating
                                            name="text-feedback"
                                            value={avgReviews?.avgRating}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />


                                        : ""}
                                    {role == "investor" || role == "supportOrganization" ?
                                        <RatingForInvestor userId={userId} companyId={decodedId} token={token} reviewerType={role} /> : ""}

                                </div>
                                <div className='flex justify-center text-center items-center'>
                                    <div><p className='text-gray-600 mx-3' >({reviews?.reviews.length} Review)</p></div>
                                    <div><p className='text-white mx-3 text-xl' >{avgReviews?.avgRating}</p></div>
                                </div>

                            </div>
                            <div className="    mx-auto md:me-auto">
                                <button  disabled={!role}
                                    type="button"
                                    onClick={() => {
                                        sendRequest({
                                            profileId: decodedId,
                                            profileType: "Company"
                                        })
                                    }}
                                    className={`text-black mx-auto ${!role ? "opacity-50 cursor-not-allowed" : ""} bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2`}
                                >
                                    حفظ الملف {saveLoading ? <Spinner color="info" aria-label="Info spinner example" /> : <i className="fa-solid fa-bookmark"></i>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ direction: "rtl" }} className="container mx-auto my-32 flex flex-wrap justify-center items-center xl:w-[95%] ">
                    <div className='md:w-2/5 w-full p-5 md:border-l md:border-l-[#00F560]'>
                        <div className='border-b md:me-16 pb-10 border-b-gray-300'>
                            <p className='text-white text-start font-semibold my-7 text-3xl'>معلومات الشركة</p>
                            <div className='flex justify-center items-center'>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-white text-start text-xl'> الخدمات:</p>
                                </div>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'> {company?.data?.company?.offeredServices}</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-white text-start text-xl'> نمودج العمل:</p>
                                </div>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'> {company?.data?.company?.businessModel}</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-white text-start text-xl'>  السوق المستهدف:</p>
                                </div>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'> {company?.data?.company?.targetMarket}</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-white text-start text-xl'> عدد الموظفين الحاليين:</p>
                                </div>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'> {company?.data?.company?.currentClerksNumber}</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-white text-start text-xl'>   تاريخ التأسيس:</p>
                                </div>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'>
                                        {company?.data?.company?.foundationDate ? new Date(company?.data?.company?.foundationDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric',
                                        }) : 'غير متوفر'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-white text-start text-xl'>  الشراكات:</p>
                                </div>
                                <div className='w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'>{company?.data?.company?.partnerShip}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center my-10 items-center'>
                            <div className='w-1/2 my-2'>
                                <p className=' text-white text-start text-xl'> المستثمرين:</p>
                            </div>
                            <div className='w-1/2 my-2'>
                                <div className=" flex  py-2 justify-start gap-2 items-center">
                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                    </div>
                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                    </div>
                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-3/5 w-full md:p-5'>
                        <div className='md:w-[85%] iframe-container overflow-auto  rounded-2xl  w-full mx-auto'>
                            <VideoEmbed videoLink={company?.data?.company?.videoLink} />
                        </div>
                    </div>
                </div>
                <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32  xl:w-[95%]">
                    <p className='text-white text-start  font-semibold my-7 text-3xl'>وصف المشروع</p>
                    <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
                        {company?.data?.company?.companyDescription} </p>
                </div>
                <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32  xl:w-[95%]">
                    <div className='flex justify-center items-center'>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                        <div className='xs:w-1/2 md:w-1/4'>
                            <p className='text-white text-center  font-semibold my-7 text-3xl'>التفاصيل المالية</p>
                        </div>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                    </div>
                    <div className='flex justify-start flex-wrap items-center'>
                        <div className='md:w-1/2 w-full md:border-l md:border-l-gray-500'>
                            <div className='flex lg:justify-center justify-start items-center'>
                                <div className='  lg:w-1/2 my-2'>
                                    <p style={{ whiteSpace: 'nowrap' }} className=' text-white text-start text-xl'> نسبة الربحية الإجمالية : </p>
                                </div>
                                <div className='  lg:w-1/2 my-2 '>
                                    <p className=' text-[#00F560] text-start text-xl'> {company?.data?.company?.percentageProfitMargin}% </p>
                                </div>
                            </div>
                            <div className='flex lg:justify-center justify-start items-center'>
                                <div className='  lg:w-1/2 my-2'>
                                    <p style={{ whiteSpace: 'nowrap' }} className=' text-white text-start text-xl'>    نقطة التعادل : </p>
                                </div>
                                <div className='  lg:w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'>
                                        {company?.data?.company?.breakEvenPoint ? new Date(company?.data?.company?.foundationDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric',
                                        }) : 'غير متوفر'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex lg:justify-center justify-start items-center'>
                                <div className='  lg:w-1/2 my-2'>
                                    <p style={{ whiteSpace: 'nowrap' }} className=' text-white text-start text-xl'>   عدد العملاء والمستخدمين : </p>
                                </div>
                                <div className='  lg:w-1/2 my-2'>
                                    <p className=' text-[#00F560] text-start text-xl'>{company?.data?.company?.activeClients} </p>
                                </div>
                            </div>
                            <div className=' my-2'>
                                <p style={{ whiteSpace: 'nowrap' }} className='my-2 text-white text-start text-xl'>التوقعات :</p>
                                <div className='w-full my-4 ps-10'>
                                    <p className=' text-start  text-[#00F560] px-3 text-sm '>{company?.data?.company?.expectedProfitPerYear}</p>
                                </div>
                            </div>
                        </div>
                        <div className='md:w-1/2  w-full'>
                            <div className=''>
                                <div className='flex justify-center my-6 items-center md:w-[80%] border-2 p-6 border-gray-300 rounded-3xl mx-auto'>
                                    <div className=' my-2'>
                                        <p className=' text-white text-start font-semibold md:font-bold mx-2  text-xl md:text-3xl'> اللإيرادات السنوية:</p>
                                    </div>
                                    <div className=' my-2'>
                                        <p className=' text-[#00F560] text-start font-semibold md:font-bold mx-2 text-xl md:text-3xl'>{company?.data?.company?.annualRevenue}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center my-6 md:w-[80%] border-2 p-6 border-gray-300 rounded-3xl mx-auto'>
                                    <div className=' my-2'>
                                        <p className=' text-white text-start font-semibold md:font-bold mx-2 text-xl md:text-3xl'>  صافي الأرباح السنوية:</p>
                                    </div>
                                    <div className=' my-2'>
                                        <p className=' text-[#00F560] text-start font-semibold md:font-bold mx-2 text-xl md:text-3xl'> {company?.data?.company?.netProfit} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex my-5 justify-center items-center ">
                        <a target="_blank" href={company?.data?.company?.financialReportPDF} className="text-black bg-[#00F560] hover:bg-[#38ba6c] font-semibold rounded-full text-sm px-10 py-2">الاطلاع على بيان الدخل/ الميزانية العمومية للمشروع</a>
                    </div>
                </div>
                <div style={{ direction: "rtl" }} className=" mx-auto my-32 p-5 container xl:w-[95%]">
                    <div className='flex justify-center items-center'>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                        <div className='xs:w-1/2 md:w-1/4'>
                            <p className='text-white text-center  font-semibold my-7 text-3xl'>احتياجات الشركة</p>
                        </div>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                    </div>
                    <div className='flex justify-start flex-wrap items-start '>
                        <div className='md:w-1/2 w-full my-10 md:border-l md:border-l-gray-500'>
                            <p className='text-white text-center  font-semibold my-7 text-xl'> التمويل المطلوب</p>
                            <div className="flex justify-center my-16 h-20 overflow-hidden w-[80%]  mx-auto border-2 rounded-full border-[#00F560]  items-center">
                                <div className='w-3/5 '><p className='text-white text-center  font-semibold my-5  text-3xl'>{company?.data?.company?.investmentAmount}</p></div>
                                {role == "investor" ? <div onClick={() => { setOpenFinanceOfferModal(true); }} className='w-2/5 bg-[#00F560]  cursor-pointer hover:bg-[#38ba6c] h-full flex items-center justify-center '><p className='text-black text-center   font-semibold  text-3xl'>تقديم عرض</p></div> : ""
                                }
                            </div>

                            <Modal
                                dismissible
                                show={openFinanceOfferModal}
                                onClose={() => setOpenFinanceOfferModal(false)}
                                className="bg-black bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
                            >
                                <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                                    <p className="text-white text-center">تقديم عرض استثمار</p>
                                </Modal.Header>

                                <Modal.Body className="bg-black border-x border-green-300 text-white">
                                    <div style={{ direction: "rtl" }} className="space-y-6">
                                        <label className="block text-sm font-medium text-white">محتوى العرض</label>
                                        <textarea
                                            value={offerContent}
                                            onChange={(e) => setOfferContent(e.target.value)}
                                            placeholder="المحتوى"
                                            className="bg-transparent border resize-none border-green-300  text-lg rounded-3xl py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 "
                                            rows={4}
                                            required
                                        ></textarea>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="bg-black border border-t border-green-300">
                                    <button
                                        className="hover:bg-green-500 me-2 mb-2 focus:outline-none rounded-full bg-green-700 text-white font-semibold px-4 py-2"
                                        onClick={() => sendOfferRequest(offerContent)}
                                        disabled={modalLoading || offerContent.trim() === ""}
                                    >
                                        {modalLoading ? (
                                            <Spinner color="info" aria-label="جاري الإرسال" />
                                        ) : (
                                            "إرسال العرض"
                                        )}
                                    </button>
                                    <button
                                        className="hover:bg-red-400 me-2 mb-2 focus:outline-none rounded-full bg-red-700 text-white font-semibold px-4 py-2"
                                        onClick={() => setOpenFinanceOfferModal(false)}
                                    >
                                        إغلاق
                                    </button>
                                </Modal.Footer>
                            </Modal>

                            <Modal
                                dismissible
                                show={openServiceOfferModal}
                                onClose={() => setOpenServiceOfferModal(false)}
                                className="bg-black bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
                            >
                                <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                                    <p className="text-white text-center">تقديم عرض لخدمه مطلوبه({serviceType})</p>
                                </Modal.Header>

                                <Modal.Body className="bg-black border-x border-green-300 text-white">
                                    <div style={{ direction: "rtl" }} className="space-y-6">
                                        <label className="block text-sm font-medium text-white">محتوى العرض</label>
                                        <textarea
                                            value={ServiceOfferContent}
                                            onChange={(e) => setServiceOfferContent(e.target.value)}
                                            placeholder="المحتوى"
                                            className="bg-transparent border resize-none border-green-300  text-lg rounded-3xl py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 "
                                            rows={4}
                                            required
                                        ></textarea>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="bg-black border border-t border-green-300">
                                    <button
                                        className="hover:bg-green-500 me-2 mb-2 focus:outline-none rounded-full bg-green-700 text-white font-semibold px-4 py-2"
                                        onClick={() => sendServiceOffer(ServiceOfferContent)}
                                        disabled={modalLoading || ServiceOfferContent.trim() === ""}
                                    >
                                        {modalLoading ? (
                                            <Spinner color="info" aria-label="جاري الإرسال" />
                                        ) : (
                                            "إرسال العرض"
                                        )}
                                    </button>

                                    <button
                                        className="hover:bg-red-400 me-2 mb-2 focus:outline-none rounded-full bg-red-700 text-white font-semibold px-4 py-2"
                                        onClick={() => setOpenFinanceOfferModal(false)}
                                    >
                                        إغلاق
                                    </button>
                                </Modal.Footer>
                            </Modal>

                            <div className=' w-[80%] mx-auto'>
                                <p className='text-white text-start  font-semibold my-7 text-2xl'>الغرض من التمويل</p>
                                <p className='text-white text-start leading-[1.8]  my-7 text-xl'> {company?.data?.company?.fundingPurpose} </p>
                            </div>
                        </div>
                        <div className='md:w-1/2 w-full my-10'>
                            <div className=' w-full my-10'>

                                <p className='text-white text-center  font-semibold my-7 text-xl'> الخدمات المطلوبة </p>
                                <div className=" flex flex-wrap py-2 justify-center gap-10  items-center">
                                    {company?.data?.company?.requiredServices &&
                                        Object.entries(company?.data?.company?.requiredServices).map(([key, value], index) => (
                                            <div key={index} className="my-2">
                                                <Popover
                                                    theme={{
                                                        "base": "absolute z-20 inline-block w-max max-w-[100vw] outline-none rounded-lg shadow-sm bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
                                                        "content": "z-10 overflow-hidden rounded-[7px]",
                                                        "arrow": {
                                                            "base": "absolute h-2 w-2 z-0 rotate-45 bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
                                                            "placement": "-4px"
                                                        }
                                                    }}
                                                    aria-labelledby="profile-popover"
                                                    content={
                                                        <div className="w-64 p-3">
                                                            <p className='text-white text-start text-lg'> {key}</p>
                                                            <div className=''>
                                                                <div className='w-full my-4'>
                                                                    <p className='text-start text-[#00F560] px-3 text-sm'>
                                                                        {value}
                                                                    </p>
                                                                </div>
                                                                {role == "investor" || role == "company" ? <div className="flex justify-center items-center">
                                                                    <button onClick={() => { setOpenServiceOfferModal(true);setServiceType(key); }}
                                                                        type="button"
                                                                        className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
                                                                    >
                                                                        تقديم عرض
                                                                    </button>
                                                                </div> : ""}
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <button>
                                                        <div className='w-[80px] bg-white h-[80px] rounded-full'>
                                                            {/* <img
                                                                src={getRandomImage()}
                                                                alt={key}
                                                                className="w-full h-full object-cover rounded-full"
                                                            /> */}
                                                        </div>
                                                    </button>







                                                </Popover>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32  xl:w-[95%]">
                    <div className='flex justify-center items-center'>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                        <div className='xs:w-1/2 md:w-1/4'>
                            <p className='text-white text-center  font-semibold my-7 text-3xl'>استراتيجية الخروج</p>
                        </div>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                    </div>
                    <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
                        {company?.data?.company?.exitStrategy} </p>
                </div>
                <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32  xl:w-[95%]">
                    <div className='flex justify-center items-center'>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                        <div className='xs:w-1/2 md:w-1/4'>
                            <p className='text-white text-center  font-semibold my-7 text-3xl'>المخاطر التي يواجهها المشروع</p>
                        </div>
                        <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                        </div>
                    </div>
                    <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
                        {company?.data?.company?.risksAndDifficults} </p>
                </div>
                <Comments companyId={decodedId} role={role} />
                <CompanySlider data={company?.data?.similarCompaniesSorted} />
            </div>
        </div>
    )
}