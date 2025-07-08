"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import { Vazirmatn } from 'next/font/google';
import Rating from '@mui/material/Rating';
import { Spinner } from "flowbite-react";

import StarIcon from '@mui/icons-material/Star';
import Comments from './Comments';
import { Button, Popover } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import Loading from './../../loading';
import { Modal } from "flowbite-react";

import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function Page({ params }) {
    const { id } = params;
    const decodedId = decodeURIComponent(id);
    const [error, setError] = useState(null);
    console.log(decodedId);
    const [token, setTokenOfTheUser] = useState(null);
        const [openFinanceOfferModal, setOpenFinanceOfferModal] = useState(false);
            const [modalLoading, setModalLoading] = useState(false);
                const [offerContent, setOfferContent] = useState("");

    const [role, setRoleOfTheUser] = useState(null);
    const [userId, setIdOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveLoading, setsaveLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [investor, setInvestor] = useState(null);
    const [deals, setDeals] = useState(null);
    const [comments, setComments] = useState(null);
    const dispatch = useDispatch();


        async function sendOfferRequest(content) {
    const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/request-consultaion/${id}`;

    const data = {
 
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
                                تم تقديم الاستشاره، عند الرد هيجيلك إشعار بذلك
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

        console.log("تم إرسال الاستشاره بنجاح:", result);
        return result;

    } catch (error) {
        setModalLoading(false);

        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-red-600">
                                حدث خطأ أثناء إرسال الاستشاره
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

        console.error("حدث خطأ أثناء إرسال الاستشاره:", error.message);
        return null;
    }
}











    // useEffect(() => {
    //     // const fetchUserDataAndCompany = async () => {
    //     //     try {
    //     //         const result = await dispatch(fetchUserToken()).unwrap();
    //     //         const token = result;
    //     //         if (!token) throw new Error("User Token is null");
    //     //         setTokenOfTheUser(token)
    //     //         const result2 = await dispatch(fetchUserRole()).unwrap();
    //     //         const role = result2;
    //     //         if (!role) throw new Error("User Role is null");
    //     //         setRoleOfTheUser(role)
    //     //         const result3 = await dispatch(fetchUserId()).unwrap();
    //     //         const id = result3;
    //     //         if (!id) throw new Error("User id is null");
    //     //         setIdOfTheUser(id)
    //     //         const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
    //     //             fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${decodedId}`),
    //     //             fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${decodedId}`),
    //     //             fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${decodedId}`),
    //     //         ]);
    //     //         if (!resInvestor.ok) {
    //     //             throw new Error(`HTTP error! status: ${resInvestor.status}`);
    //     //         }
    //     //         if (!resInvestorDeals.ok) {
    //     //             throw new Error(`HTTP error! status: ${resInvestorDeals.status}`);
    //     //         }
    //     //         if (!resInvestorComments.ok) {
    //     //             throw new Error(`HTTP error! status: ${resInvestorComments.status}`);
    //     //         }
    //     //         const dataInvestor = await resInvestor.json();
    //     //         const dataDeals = await resInvestorDeals.json();
    //     //         const dataInvestorComments = await resInvestorComments.json();
    //     //         setInvestor(dataInvestor);
    //     //         setDeals(dataDeals);
    //     //         setComments(dataInvestorComments)
    //     //         console.log(dataInvestor);
    //     //         console.log(dataDeals);
    //     //         console.log(dataInvestorComments);
    //     //     } catch (err) {
    //     //         setError(err.message);
    //     //         console.error('فشل في جلب البيانات:', err);
    //     //     } finally {
    //     //         setLoading(false);
    //     //     }
    //     // };
    //     const fetchUserDataAndCompany = async () => {
    //         try {
    //             const result = await dispatch(fetchUserToken()).unwrap();
    //             const token = result;
    //             if (!token) throw new Error("User Token is null");
    //             setTokenOfTheUser(token);

    //             const result2 = await dispatch(fetchUserRole()).unwrap();
    //             const role = result2;
    //             if (!role) throw new Error("User Role is null");
    //             setRoleOfTheUser(role);

    //             const result3 = await dispatch(fetchUserId()).unwrap();
    //             const id = result3;
    //             if (!id) throw new Error("User id is null");
    //             setIdOfTheUser(id);

    //             const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
    //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${decodedId}`),
    //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${decodedId}`),
    //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${decodedId}`),
    //             ]);

    //             if (!resInvestor.ok) {
    //                 throw new Error(`HTTP error in investor! status: ${resInvestor.status}`);
    //             }

    //             let dataDeals;
    //             if (resInvestorDeals.ok) {
    //                 dataDeals = await resInvestorDeals.json();
    //             } else if (resInvestorDeals.status === 404) {
    //                 dataDeals = {
    //                     status: "fail",
    //                     data: {
    //                         allDeals: [
    //                         ]
    //                     }
    //                 } // مفيش دييلز
    //             } else {
    //                 throw new Error(`HTTP error in deals! status: ${resInvestorDeals.status}`);
    //             }

    //             if (!resInvestorComments.ok) {
    //                 throw new Error(`HTTP error in comments! status: ${resInvestorComments.status}`);
    //             }

    //             const dataInvestor = await resInvestor.json();
    //             const dataInvestorComments = await resInvestorComments.json();

    //             setInvestor(dataInvestor);
    //             setDeals(dataDeals);
    //             setComments(dataInvestorComments);

    //             console.log(dataInvestor);
    //             console.log(dataDeals);
    //             console.log(dataInvestorComments);
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
            // ✅ أولاً: بيانات المستثمر والعروض والتعليقات
            const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
                fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${decodedId}`),
                fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${decodedId}`),
                fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${decodedId}`),
            ]);

            if (!resInvestor.ok) throw new Error(`HTTP error in investor! status: ${resInvestor.status}`);
            if (!resInvestorComments.ok) throw new Error(`HTTP error in comments! status: ${resInvestorComments.status}`);

            let dataDeals;
            if (resInvestorDeals.ok) {
                dataDeals = await resInvestorDeals.json();
            } else if (resInvestorDeals.status === 404) {
                dataDeals = {
                    status: "fail",
                    data: { allDeals: [] }
                };
            } else {
                throw new Error(`HTTP error in deals! status: ${resInvestorDeals.status}`);
            }

            const dataInvestor = await resInvestor.json();
            const dataInvestorComments = await resInvestorComments.json();

            setInvestor(dataInvestor);
            setDeals(dataDeals);
            setComments(dataInvestorComments);

            console.log(dataInvestor);
            console.log(dataDeals);
            console.log(dataInvestorComments);

            // ✅ ثانياً: لو فيه توكن، جيب بيانات المستخدم
            const token = await dispatch(fetchUserToken()).unwrap();
            if (token) {
                setTokenOfTheUser(token);

                const role = await dispatch(fetchUserRole()).unwrap();
                setRoleOfTheUser(role || "guest");

                const id = await dispatch(fetchUserId()).unwrap();
                if (id) setIdOfTheUser(id);
            } else {
                console.log("زائر بدون توكن");
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
    // const sendRequest = async (data) => {
    //     try {
    //         console.log("Token:", token);
    //         console.log("Sending data:", data);
    //         const response = await axios.post(
    //             'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/save-profile',
    //             data,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         const result = response.data;
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-[#00F560]">
    //                                 تم حفظ الحساب بنجاح
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
    //         return result;
    //     } catch (error) {
    //         console.error('Error:', error?.response?.data || error.message);
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-red-600">
    //                                 حدث خطأ ما
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
    //     }
    // };




    const sendRequest = async (data ) => {
    try {setsaveLoading(true)
        console.log("Token:", token);
        console.log("Sending data:", data);

        // تحديد الرابط بناءً على نوع الـ role
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

    } catch (error) {setsaveLoading(false)
        console.error('Error:', error?.response?.data || error.message);

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

    if (loading) {
        return (
            <Loading />
        );
    }
    return (<div className="overflow-auto">
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
        <div className={` ${vazir.className}`}>
             <Modal
                                            dismissible
                                            show={openFinanceOfferModal}
                                            onClose={() => setOpenFinanceOfferModal(false)}
                                            className="bg-black bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
                                        >
                                            <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                                                <p className="text-white text-center" > طلب استشاره </p>
                                            </Modal.Header>
            
                                            <Modal.Body className="bg-black border-x border-green-300 text-white">
                                                <div style={{ direction: "rtl" }} className="space-y-6">
                                                    <label className="block text-sm font-medium text-white">محتوى الاستشاره</label>
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
                                                        "إرسال الاستشاره"
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
            <div className='md:mt-32 mt-16'>
                <div style={{ direction: "rtl" }} className="text-white">
                    <div className={` ${vazir.className}`}>
                        <div style={{ direction: "rtl" }} className="bg-[#00F5601A]  mt-44 mb-14 bg-opacity-10">
                            <div className='hidden md:flex  justify-start items-center'>
                                <div className=' w-[400px] relative'>
                                    <div className='w-[204px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full overflow-hidden  ms-2  text-center'>
                                        <img onClick={() => { setSelectedImage(investor?.data?.investor?.profilePhoto); }} src={investor.data.investor.profilePhoto} className='cursor-pointer w-full' alt="" />
                                    </div>
                                </div>
                                <div className='w-2/3  my-5 '>
                                    <div className="text-start">
                                        <p className="text-white font-extrabold xs:text-2xl  my-2 md:text-3xl">{investor.data.investor.fullArabicName} </p>
                                    </div>
                                    <div className="flex justify-start text-start  items-center">
                                        <p className=" text-white text-sm   font-semibold md:text-lg "> شريك نجاح</p>
                                        <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">  {investor.data.investor.jobTitle} - {investor.data.investor.organization}</p>
                                    </div>
                                </div>
                                <div className="  w-1/4 ms-auto">
                                    <button disabled={!role}
                                        type="button"
                                        onClick={() => {
                                            sendRequest({
                                                profileId: decodedId,
                                                profileType: "Investor"
                                            })
                                        }}
                                    className={`text-black mx-auto ${!role ? "opacity-50 cursor-not-allowed" : ""} bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2`}
                                    >
                                        حفظ الملف {saveLoading ?<Spinner color="info" aria-label="Info spinner example" />:<i className="fa-solid fa-bookmark"></i>}
                                    </button>
                                </div>
                            </div>
                            <div className='md:hidden p-3'>
                                <div className=' w-full '>
                                    <div className='w-[204px]   rounded-full overflow-hidden  mx-auto  text-center'>
                                        <img onClick={() => { setSelectedImage(investor?.data?.investor?.profilePhoto); }} src={investor.data.investor.profilePhoto} className='cursor-pointer w-full' alt="" />
                                    </div>
                                </div>
                                <div className='w-full  my-5 '>
                                    <div className="text-center">
                                        <p className="text-white font-extrabold   my-2 text-2xl">{investor.data.investor.fullArabicName}   </p>
                                    </div>
                                    <div className=" text-start  ">
                                        <p className=" text-white text-sm   font-semibold my-2 md:text-lg "> شريك نجاح</p>
                                        <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">  {investor.data.investor.jobTitle} - {investor.data.investor.organization}</p>
                                    </div>
                                </div>
                                <div className="  w-full ">
                                    <button disabled={!role}
                                        type="button"
                                        onClick={() => {
                                            sendRequest({
                                                profileId: decodedId,
                                                profileType: "Investor"
                                            })
                                        }}
                                    className={`text-black mx-auto ${!role ? "opacity-50 cursor-not-allowed" : ""} bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2`}
                                    >
                                        حفظ الملف {saveLoading ?<Spinner color="info" aria-label="Info spinner example" />:<i className="fa-solid fa-bookmark"></i>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{ direction: "rtl" }} className="container p-5 mx-auto   xl:w-[91%]">
                            <p className='text-white text-start  font-semibold my-7 text-3xl'>الوصف </p>
                            <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
                                {investor.data.investor.description}
                            </p>
                        </div>
                        <div className='my-4'>
                            <div className='w-[91%] mx-auto   px-5 py-4'>
                                <div className='flex flex-wrap text-center text-white text-2xl justify-center items-center '>
                                    <div className=' w-full sm:w-1/3  p-3'>
                                        <p className='font-extrabold text-5xl'>6</p>
                                        <p className='font-medium'>صفقات ناجحه  </p>
                                    </div>
                                    <div className=' w-full sm:w-1/3 border-y  sm:border-x sm:border-y-0 border-gray-500  p-3'>
                                        <p className='font-extrabold text-5xl'> 21</p>
                                        <p className='font-medium'>استشاره</p>
                                    </div>
                                    <div className=' w-full sm:w-1/3 p-3'>
                                        <p className='font-extrabold text-5xl'>39</p>
                                        <p className='font-medium'>تقيمات وتغليقات</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-14  xl:w-[91%]">
                            <p className='text-white text-start  font-semibold my-7 text-3xl'>الاستثمارات </p>
                            <div className=" flex justify-center container mx-auto items-center w-full text-white flex-wrap ">
                                {deals.data.allDeals.length === 0 ? (
                                    <p>لا يوجد اتفاقيات حتى الآن.</p>
                                ) : (
                                    deals.data.allDeals.map(obj =>
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
                                                    <p className='text-white text-start text-lg'> التفاصيل</p>
                                                    <div className=''>
                                                        <div className='w-full my-4'>
                                                            <p className='text-start text-[#00F560] px-3 text-sm'>
                                                                {obj.offerDetails}
                                                            </p>
                                                        </div>
                                                        <Link
                                                            href={`/startUps/${obj.companyId._id}`}
                                                            type="button"
                                                            className="text-black mx-auto   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
                                                        >
                                                            زياره صفحتهم
                                                        </Link>
                                                    </div>
                                                </div>
                                            } >
                                            <button key={obj._id} className=' w-full  md:w-1/2  lg:w-1/3'>
                                                <div key={obj._id} className=' w-full  '>
                                                    <div className=' bg-gray-200 overflow-hidden cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5  xs:w-[95%]  mx-auto rounded-[50px]'>
                                                        <div className='w-full    px-5 py-4'>
                                                            <div className='flex justify-center items-center '>
                                                                <div className='w-1/5 xs:p-1'>
                                                                    <img src={obj.companyId.companyPhoto} className='w-full rounded-xl' alt="" />
                                                                </div>
                                                                <div className='w-2/5 p-1  xs:px-2'>
                                                                    <p className='text-xl xs:text-2xl truncate max-w-full'>{obj.companyId.companyName}</p>
                                                                    <p className='text-xs  truncate max-w-full '>{obj.companyId.companyField[0]}  </p>
                                                                </div>
                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                                    <Rating
                                                                        name="text-feedback"
                                                                        value={2.5}
                                                                        readOnly
                                                                        precision={0.5}
                                                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                    />
                                                                    <p className='text-center truncate max-w-full'>{obj.companyId.state}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </Popover>

                                    )
                                )}
                                {/* {
                                deals.data.allDeals.map(obj =>
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
                                                <p className='text-white text-start text-lg'> التفاصيل</p>
                                                <div className=''>
                                                    <div className='w-full my-4'>
                                                        <p className='text-start text-[#00F560] px-3 text-sm'>
                                                            {obj.offerDetails}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={`/startUps/${obj.companyId._id}`}
                                                        type="button"
                                                        className="text-black mx-auto   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
                                                    >
                                                        زياره صفحتهم
                                                    </Link>
                                                </div>
                                            </div>
                                        } >
                                        <button key={obj._id} className=' w-full  md:w-1/2  lg:w-1/3'>
                                            <div key={obj._id} className=' w-full  '>
                                                <div className=' bg-gray-200 overflow-hidden cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5  xs:w-[95%]  mx-auto rounded-[50px]'>
                                                    <div className='w-full    px-5 py-4'>
                                                        <div className='flex justify-center items-center '>
                                                            <div className='w-1/5 xs:p-1'>
                                                                <img src={obj.companyId.companyPhoto} className='w-full rounded-xl' alt="" />
                                                            </div>
                                                            <div className='w-2/5 p-1  xs:px-2'>
                                                                <p className='text-xl xs:text-2xl truncate max-w-full'>{obj.companyId.companyName}</p>
                                                                <p className='text-xs  truncate max-w-full '>{obj.companyId.companyField[0]}  </p>
                                                            </div>
                                                            <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                                <Rating
                                                                    name="text-feedback"
                                                                    value={2.5}
                                                                    readOnly
                                                                    precision={0.5}
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                                <p className='text-center truncate max-w-full'>{obj.companyId.state}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </Popover>
                                
                                ) } */}
                            </div>
                        </div>
                        {role == "company" ? <div style={{ direction: "rtl" }} className="bg-[#00F5601A] p-5  mt-44 mb-14 bg-opacity-10">
                            <div className='flex justify-center flex-wrap items-center w-[91%] mx-auto'>
                                <div className='md:w-1/2 w-full h-[300px]'>
                                    <div className='flex flex-col    h-[300px] justify-between items-start'>
                                        <div>
                                            <p className='text-white text-start  font-semibold my-4 text-2xl md:text-3xl'>يمكنك طلب استشارة من المستثمر!</p>
                                            <p className='text-white text-start  font-semibold my-4 text-md md:text-xl'>جملة كدا للوصف</p>
                                        </div>
                                        <button onClick={() => { setOpenFinanceOfferModal(true); }}
                                            type="button"
                                            className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                                        >
                                            طلب استشاره
                                        </button>
                                    </div>
                                </div>
                                <div className='md:w-1/2 w-full '>
                                    <div className='  overflow-hidden  md:w-[80%] lg:w-[60%] mx-auto  text-center'>
                                        <img src={"/fdsfd.png"} className='w-full rounded-md' alt="" />
                                    </div>
                                </div>
                            </div>
                        </div> : ""}
                        <Comments comments={comments} name={investor.data.investor.fullArabicName} img={investor.data.investor.profilePhoto} />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}



// "use client"
// import { useEffect, useState } from 'react';
// import React from 'react'
// import { Vazirmatn } from 'next/font/google';
// import Rating from '@mui/material/Rating';
// import { Spinner } from "flowbite-react";

// import StarIcon from '@mui/icons-material/Star';
// import Comments from './Comments';
// import { Button, Popover } from "flowbite-react";
// import { useSelector, useDispatch } from "react-redux";
// import Loading from './../../loading';
// import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
// import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
// import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
// import Link from 'next/link';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
// export default function Page({ params }) {
//     const { id } = params;
//     const decodedId = decodeURIComponent(id);
//     const [error, setError] = useState(null);
//     console.log(decodedId);
//     const [token, setTokenOfTheUser] = useState(null);
//     const [role, setRoleOfTheUser] = useState(null);
//     const [userId, setIdOfTheUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [saveLoading, setsaveLoading] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [investor, setInvestor] = useState(null);
//     const [deals, setDeals] = useState(null);
//     const [comments, setComments] = useState(null);
//     const dispatch = useDispatch();
//     // useEffect(() => {

//     //     const fetchUserDataAndCompany = async () => {
//     //         try {
//     //             const result = await dispatch(fetchUserToken()).unwrap();
//     //             const token = result;
//     //             if (!token) throw new Error("User Token is null");
//     //             setTokenOfTheUser(token);

//     //             const result2 = await dispatch(fetchUserRole()).unwrap();
//     //             const role = result2;
//     //             if (!role) throw new Error("User Role is null");
//     //             setRoleOfTheUser(role);

//     //             const result3 = await dispatch(fetchUserId()).unwrap();
//     //             const id = result3;
//     //             if (!id) throw new Error("User id is null");
//     //             setIdOfTheUser(id);

//     //             const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
//     //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${decodedId}`),
//     //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${decodedId}`),
//     //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${decodedId}`),
//     //             ]);

//     //             if (!resInvestor.ok) {
//     //                 throw new Error(`HTTP error in investor! status: ${resInvestor.status}`);
//     //             }

//     //             let dataDeals;
//     //             if (resInvestorDeals.ok) {
//     //                 dataDeals = await resInvestorDeals.json();
//     //             } else if (resInvestorDeals.status === 404) {
//     //                 dataDeals = {
//     //                     status: "fail",
//     //                     data: {
//     //                         allDeals: [
//     //                         ]
//     //                     }
//     //                 } // مفيش دييلز
//     //             } else {
//     //                 throw new Error(`HTTP error in deals! status: ${resInvestorDeals.status}`);
//     //             }

//     //             if (!resInvestorComments.ok) {
//     //                 throw new Error(`HTTP error in comments! status: ${resInvestorComments.status}`);
//     //             }

//     //             const dataInvestor = await resInvestor.json();
//     //             const dataInvestorComments = await resInvestorComments.json();

//     //             setInvestor(dataInvestor);
//     //             setDeals(dataDeals);
//     //             setComments(dataInvestorComments);

//     //             console.log(dataInvestor);
//     //             console.log(dataDeals);
//     //             console.log(dataInvestorComments);
//     //         } catch (err) {
//     //             setError(err.message);
//     //             console.error('فشل في جلب البيانات:', err);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchUserDataAndCompany();
//     // }, [dispatch]);
   
   
   
   
// //     useEffect(() => {
// //     const fetchUserDataAndCompany = async () => {
// //         try {
// //             const result = await dispatch(fetchUserToken()).unwrap();
// //             const token = result;

// //             // لو مفيش توكن، اعتبره زائر وخلاص
// //             if (!token) { 
// //                 console.log("مستخدم غير مسجل الدخول");
// //                 setLoading(false);
// //                 return;
// //             }

// //             setTokenOfTheUser(token);

// // const result2 = await dispatch(fetchUserRole()).unwrap();
// // const role = result2;

// // if (!role) {
// //     console.log("زائر بدون دور (role)");
// //     setRoleOfTheUser(null); // أو مثلاً "guest"
// // } else {
// //     setRoleOfTheUser(role);
// // }

// // const result3 = await dispatch(fetchUserId()).unwrap();
// // const id = result3;
// // if (!id) {
// //     console.log("زائر بدون ID، مش هنجيب بيانات المستثمر");
// //     setLoading(false);
// //     return; // وقف باقي العمليات
// // }
// // setIdOfTheUser(id);

// //             // استكمال استدعاءات البيانات بناءً على الـ ID
// //             const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
// //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${decodedId}`),
// //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${decodedId}`),
// //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${decodedId}`),
// //             ]);

// //             if (!resInvestor.ok) {
// //                 throw new Error(`HTTP error in investor! status: ${resInvestor.status}`);
// //             }

// //             let dataDeals;
// //             if (resInvestorDeals.ok) {
// //                 dataDeals = await resInvestorDeals.json();
// //             } else if (resInvestorDeals.status === 404) {
// //                 dataDeals = {
// //                     status: "fail",
// //                     data: { allDeals: [] }
// //                 };
// //             } else {
// //                 throw new Error(`HTTP error in deals! status: ${resInvestorDeals.status}`);
// //             }

// //             if (!resInvestorComments.ok) {
// //                 throw new Error(`HTTP error in comments! status: ${resInvestorComments.status}`);
// //             }

// //             const dataInvestor = await resInvestor.json();
// //             const dataInvestorComments = await resInvestorComments.json();

// //             setInvestor(dataInvestor);
// //             setDeals(dataDeals);
// //             setComments(dataInvestorComments);

// //             console.log(dataInvestor);
// //             console.log(dataDeals);
// //             console.log(dataInvestorComments);
// //         } catch (err) {
// //             setError(err.message);
// //             console.error('فشل في جلب البيانات:', err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     fetchUserDataAndCompany();
// // }, [dispatch]);




// useEffect(() => {
//     const fetchUserDataAndCompany = async () => {
//         try {
//             // ✅ أولاً: جلب بيانات المستثمر (دائمًا)
//             const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
//                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${decodedId}`),
//                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${decodedId}`),
//                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${decodedId}`),
//             ]);

//             if (!resInvestor.ok) {
//                 throw new Error(`HTTP error in investor! status: ${resInvestor.status}`);
//             }

//             let dataDeals;
//             if (resInvestorDeals.ok) {
//                 dataDeals = await resInvestorDeals.json();
//             } else if (resInvestorDeals.status === 404) {
//                 dataDeals = {
//                     status: "fail",
//                     data: { allDeals: [] }
//                 };
//             } else {
//                 throw new Error(`HTTP error in deals! status: ${resInvestorDeals.status}`);
//             }

//             if (!resInvestorComments.ok) {
//                 throw new Error(`HTTP error in comments! status: ${resInvestorComments.status}`);
//             }

//             const dataInvestor = await resInvestor.json();
//             const dataInvestorComments = await resInvestorComments.json();

//             setInvestor(dataInvestor);
//             setDeals(dataDeals);
//             setComments(dataInvestorComments);

//             // ✅ ثانيًا: لو فيه توكن، نجيب بيانات المستخدم
//             const tokenResult = await dispatch(fetchUserToken()).unwrap();
//             if (tokenResult) {
//                 setTokenOfTheUser(tokenResult);

//                 const roleResult = await dispatch(fetchUserRole()).unwrap();
//                 setRoleOfTheUser(roleResult || "guest");

//                 const idResult = await dispatch(fetchUserId()).unwrap();
//                 if (idResult) {
//                     setIdOfTheUser(idResult);
//                 }
//             } else {
//                 console.log("زائر بدون توكن");
//             }

//         } catch (err) {
//             setError(err.message);
//             console.error('فشل في جلب البيانات:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchUserDataAndCompany();
// }, [dispatch]);




//     console.log(role);
//     console.log(token);
  


//     const sendRequest = async (data ) => {
//     try {setsaveLoading(true)
//         console.log("Token:", token);
//         console.log("Sending data:", data);

//         // تحديد الرابط بناءً على نوع الـ role
//         let endpoint = '';
//         switch (role) {
//             case 'investor':
//                 endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/save-profile';
//                 break;
//             case 'supportOrganization':
//                 endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/supportOrganizations/save-profile';
//                 break;
//             case 'company':
//                 endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/companies/save-profile';
//                 break;
//             case 'charityOrganization':
//                 endpoint = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/charityOrganizations/save-profile';
//                 break;
//             default:
//                 throw new Error('Invalid role type');
//         }

//         const response = await axios.post(
//             endpoint,
//             data,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
// setsaveLoading(false)
//         const result = response.data;

//         toast.custom((t) => (
//             <div
//                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
//                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//             >
//                 <div className="flex-1 w-0 p-4">
//                     <div className="flex items-start">
//                         <div className="ml-3 flex-1">
//                             <p className="text-sm font-medium text-[#00F560]">
//                                 تم حفظ الحساب بنجاح
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

//         return result;

//     } catch (error) {setsaveLoading(false)
//         console.error('Error:', error?.response?.data || error.message);

//         toast.custom((t) => (
//             <div
//                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
//                     } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//             >
//                 <div className="flex-1 w-0 p-4">
//                     <div className="flex items-start">
//                         <div className="ml-3 flex-1">
//                             <p className="text-sm font-medium text-red-600">
//                                {error?.response?.data.message}
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
//     }
// };

//     if (loading) {
//         return (
//             <Loading />
//         );
//     }
//     return (<div className="overflow-auto">
//         {selectedImage && (
//             <div
//                 onClick={() => setSelectedImage(null)}
//                 className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
//             >
//                 <button
//                     onClick={() => setSelectedImage(null)}
//                     className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
//                 >
//                     &times;
//                 </button>
//                 <img
//                     src={selectedImage}
//                     onClick={(e) => e.stopPropagation()}
//                     alt="صورة مكبرة"
//                     className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
//                 />
//             </div>
//         )}
//         <div className={` ${vazir.className}`}>
//             <div className='md:mt-32 mt-16'>
//                 <div style={{ direction: "rtl" }} className="text-white">
//                     <div className={` ${vazir.className}`}>
//                         <div style={{ direction: "rtl" }} className="bg-[#00F5601A]  mt-44 mb-14 bg-opacity-10">
//                             <div className='hidden md:flex  justify-start items-center'>
//                                 <div className=' w-[400px] relative'>
//                                     <div className='w-[204px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full overflow-hidden  ms-2  text-center'>
//                                         <img onClick={() => { setSelectedImage(investor?.data?.investor?.profilePhoto); }} src={investor?.data?.investor?.profilePhoto} className='cursor-pointer w-full' alt="" />
//                                     </div>
//                                 </div>
//                                 <div className='w-2/3  my-5 '>
//                                     <div className="text-start">
//                                         <p className="text-white font-extrabold xs:text-2xl  my-2 md:text-3xl">{investor.data.investor.fullArabicName} </p>
//                                     </div>
//                                     <div className="flex justify-start text-start  items-center">
//                                         <p className=" text-white text-sm   font-semibold md:text-lg "> شريك نجاح</p>
//                                         <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">  {investor.data.investor.jobTitle} - {investor.data.investor.organization}</p>
//                                     </div>
//                                 </div>
//                                 <div className="  w-1/4 ms-auto">
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             sendRequest({
//                                                 profileId: decodedId,
//                                                 profileType: "Investor"
//                                             })
//                                         }}
//                                         className="text-black mx-auto  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
//                                     >
//                                         حفظ الملف {saveLoading ?<Spinner color="info" aria-label="Info spinner example" />:<i className="fa-solid fa-bookmark"></i>}
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className='md:hidden p-3'>
//                                 <div className=' w-full '>
//                                     <div className='w-[204px]   rounded-full overflow-hidden  mx-auto  text-center'>
//                                         <img onClick={() => { setSelectedImage(investor?.data?.investor?.profilePhoto); }} src={investor.data.investor.profilePhoto} className='cursor-pointer w-full' alt="" />
//                                     </div>
//                                 </div>
//                                 <div className='w-full  my-5 '>
//                                     <div className="text-center">
//                                         <p className="text-white font-extrabold   my-2 text-2xl">{investor.data.investor.fullArabicName}   </p>
//                                     </div>
//                                     <div className=" text-start  ">
//                                         <p className=" text-white text-sm   font-semibold my-2 md:text-lg "> شريك نجاح</p>
//                                         <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">  {investor.data.investor.jobTitle} - {investor.data.investor.organization}</p>
//                                     </div>
//                                 </div>
//                                 <div className="  w-full ">
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             sendRequest({
//                                                 profileId: decodedId,
//                                                 profileType: "Investor"
//                                             })
//                                         }}
//                                         className="text-black mx-auto  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
//                                     >
//                                         حفظ الملف {saveLoading ?<Spinner color="info" aria-label="Info spinner example" />:<i className="fa-solid fa-bookmark"></i>}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ direction: "rtl" }} className="container p-5 mx-auto   xl:w-[91%]">
//                             <p className='text-white text-start  font-semibold my-7 text-3xl'>الوصف </p>
//                             <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
//                                 {investor.data.investor.description}
//                             </p>
//                         </div>
//                         <div className='my-4'>
//                             <div className='w-[91%] mx-auto   px-5 py-4'>
//                                 <div className='flex flex-wrap text-center text-white text-2xl justify-center items-center '>
//                                     <div className=' w-full sm:w-1/3  p-3'>
//                                         <p className='font-extrabold text-5xl'>6</p>
//                                         <p className='font-medium'>صفقات ناجحه  </p>
//                                     </div>
//                                     <div className=' w-full sm:w-1/3 border-y  sm:border-x sm:border-y-0 border-gray-500  p-3'>
//                                         <p className='font-extrabold text-5xl'> 21</p>
//                                         <p className='font-medium'>استشاره</p>
//                                     </div>
//                                     <div className=' w-full sm:w-1/3 p-3'>
//                                         <p className='font-extrabold text-5xl'>39</p>
//                                         <p className='font-medium'>تقيمات وتغليقات</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-14  xl:w-[91%]">
//                             <p className='text-white text-start  font-semibold my-7 text-3xl'>الاستثمارات </p>
//                             <div className=" flex justify-center container mx-auto items-center w-full text-white flex-wrap ">
//                                 {deals.data.allDeals.length === 0 ? (
//                                     <p>لا يوجد اتفاقيات حتى الآن.</p>
//                                 ) : (
//                                     deals.data.allDeals.map(obj =>
//                                         <Popover
//                                             theme={{
//                                                 "base": "absolute z-20 inline-block w-max max-w-[100vw] outline-none rounded-lg shadow-sm bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
//                                                 "content": "z-10 overflow-hidden rounded-[7px]",
//                                                 "arrow": {
//                                                     "base": "absolute h-2 w-2 z-0 rotate-45 bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
//                                                     "placement": "-4px"
//                                                 }
//                                             }}
//                                             aria-labelledby="profile-popover"
//                                             content={
//                                                 <div className="w-64 p-3">
//                                                     <p className='text-white text-start text-lg'> التفاصيل</p>
//                                                     <div className=''>
//                                                         <div className='w-full my-4'>
//                                                             <p className='text-start text-[#00F560] px-3 text-sm'>
//                                                                 {obj.offerDetails}
//                                                             </p>
//                                                         </div>
//                                                         <Link
//                                                             href={`/startUps/${obj.companyId._id}`}
//                                                             type="button"
//                                                             className="text-black mx-auto   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
//                                                         >
//                                                             زياره صفحتهم
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             } >
//                                             <button key={obj._id} className=' w-full  md:w-1/2  lg:w-1/3'>
//                                                 <div key={obj._id} className=' w-full  '>
//                                                     <div className=' bg-gray-200 overflow-hidden cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5  xs:w-[95%]  mx-auto rounded-[50px]'>
//                                                         <div className='w-full    px-5 py-4'>
//                                                             <div className='flex justify-center items-center '>
//                                                                 <div className='w-1/5 xs:p-1'>
//                                                                     <img src={obj.companyId.companyPhoto} className='w-full rounded-xl' alt="" />
//                                                                 </div>
//                                                                 <div className='w-2/5 p-1  xs:px-2'>
//                                                                     <p className='text-xl xs:text-2xl truncate max-w-full'>{obj.companyId.companyName}</p>
//                                                                     <p className='text-xs  truncate max-w-full '>{obj.companyId.companyField[0]}  </p>
//                                                                 </div>
//                                                                 <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
//                                                                     <Rating
//                                                                         name="text-feedback"
//                                                                         value={2.5}
//                                                                         readOnly
//                                                                         precision={0.5}
//                                                                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                                     />
//                                                                     <p className='text-center truncate max-w-full'>{obj.companyId.state}</p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </button>
//                                         </Popover>

//                                     )
//                                 )}
//                                 {/* {
//                                 deals.data.allDeals.map(obj =>
//                                     <Popover
//                                         theme={{
//                                             "base": "absolute z-20 inline-block w-max max-w-[100vw] outline-none rounded-lg shadow-sm bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
//                                             "content": "z-10 overflow-hidden rounded-[7px]",
//                                             "arrow": {
//                                                 "base": "absolute h-2 w-2 z-0 rotate-45 bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
//                                                 "placement": "-4px"
//                                             }
//                                         }}
//                                         aria-labelledby="profile-popover"
//                                         content={
//                                             <div className="w-64 p-3">
//                                                 <p className='text-white text-start text-lg'> التفاصيل</p>
//                                                 <div className=''>
//                                                     <div className='w-full my-4'>
//                                                         <p className='text-start text-[#00F560] px-3 text-sm'>
//                                                             {obj.offerDetails}
//                                                         </p>
//                                                     </div>
//                                                     <Link
//                                                         href={`/startUps/${obj.companyId._id}`}
//                                                         type="button"
//                                                         className="text-black mx-auto   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
//                                                     >
//                                                         زياره صفحتهم
//                                                     </Link>
//                                                 </div>
//                                             </div>
//                                         } >
//                                         <button key={obj._id} className=' w-full  md:w-1/2  lg:w-1/3'>
//                                             <div key={obj._id} className=' w-full  '>
//                                                 <div className=' bg-gray-200 overflow-hidden cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5  xs:w-[95%]  mx-auto rounded-[50px]'>
//                                                     <div className='w-full    px-5 py-4'>
//                                                         <div className='flex justify-center items-center '>
//                                                             <div className='w-1/5 xs:p-1'>
//                                                                 <img src={obj.companyId.companyPhoto} className='w-full rounded-xl' alt="" />
//                                                             </div>
//                                                             <div className='w-2/5 p-1  xs:px-2'>
//                                                                 <p className='text-xl xs:text-2xl truncate max-w-full'>{obj.companyId.companyName}</p>
//                                                                 <p className='text-xs  truncate max-w-full '>{obj.companyId.companyField[0]}  </p>
//                                                             </div>
//                                                             <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
//                                                                 <Rating
//                                                                     name="text-feedback"
//                                                                     value={2.5}
//                                                                     readOnly
//                                                                     precision={0.5}
//                                                                     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                                 />
//                                                                 <p className='text-center truncate max-w-full'>{obj.companyId.state}</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </button>
//                                     </Popover>
                                
//                                 ) } */}
//                             </div>
//                         </div>
//                         {role == "company" ? <div style={{ direction: "rtl" }} className="bg-[#00F5601A] p-5  mt-44 mb-14 bg-opacity-10">
//                             <div className='flex justify-center flex-wrap items-center w-[91%] mx-auto'>
//                                 <div className='md:w-1/2 w-full h-[300px]'>
//                                     <div className='flex flex-col    h-[300px] justify-between items-start'>
//                                         <div>
//                                             <p className='text-white text-start  font-semibold my-4 text-2xl md:text-3xl'>يمكنك طلب استشارة من المستثمر!</p>
//                                             <p className='text-white text-start  font-semibold my-4 text-md md:text-xl'>جملة كدا للوصف</p>
//                                         </div>
//                                         <button
//                                             type="button"
//                                             className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
//                                         >
//                                             طلب استشاره
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className='md:w-1/2 w-full '>
//                                     <div className='  overflow-hidden  md:w-[80%] lg:w-[60%] mx-auto  text-center'>
//                                         <img src={"/fdsfd.png"} className='w-full rounded-md' alt="" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div> : ""}
//                         <Comments comments={comments} name={investor.data.investor.fullArabicName} img={investor.data.investor.profilePhoto} />
                        
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>)
// }