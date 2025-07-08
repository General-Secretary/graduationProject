"use client"
import React from 'react'
import { Vazirmatn } from 'next/font/google';
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import toast from 'react-hot-toast';
import Loading from './../loading';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import Company_finance_offer from './Company_finance_offer';
import Investor_finance_offer_responsed from './Investor_finance_offer_responsed';
import Investor_Consultation_Res from './Investor_Consultation_Res';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function page() {
    const [role, setRoleOfTheUser] = useState(null);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [notifications, setNotifications] = useState(null);
    const [error, setError] = useState(null);
    const [idOfTheUser, setIdOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setTokenOfTheUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserDataAndNotifications = async () => {
            try {
                setLoading(true)
                // 1. Get User ID
                const result = await dispatch(fetchUserId()).unwrap();
                const userId = result;
                if (!userId) throw new Error("User ID is null");
                setIdOfTheUser(userId);
                // 2. Get Token
                const result2 = await dispatch(fetchUserToken()).unwrap();
                const token = result2;
                if (!token) throw new Error("User Token is null");
                setTokenOfTheUser(token);
                // 3. Get Role
                const result3 = await dispatch(fetchUserRole()).unwrap();
                const role = result3;
                if (!role) throw new Error("User Role is null");
                setRoleOfTheUser(role);
                // 4. Pick correct notifications endpoint based on role
                let notificationsUrl = '';
                switch (role) {
                    case 'charityOrganization':
                        notificationsUrl = 'https://estethmarat-estethmarats-projects.vercel.app/api/v1/charity-notifications';
                        break;
                    case 'company':
                        notificationsUrl = 'https://estethmarat-estethmarats-projects.vercel.app/api/v1/companies/getNotifications';
                        break;
                    case 'investor':
                        notificationsUrl = 'https://estethmarat-estethmarats-projects.vercel.app/api/v1/investors/getNotifications';
                        break;
                    case 'supportOrganization':
                        notificationsUrl = 'https://estethmarat-estethmarats-projects.vercel.app/api/v1/incubator-notifications';
                        break;
                    default:
                        throw new Error("Unknown role: " + role);
                }
                // 5. Fetch notifications with Authorization token
                const res = await fetch(notificationsUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }); setLoading(false)
                if (!res.ok) {
                    throw new Error(`فشل في جلب الإشعارات: ${res.status}`);
                }
                const notifications = await res.json();
                setNotifications(notifications)
                console.log("📢 Notifications:", notifications);
            } catch (err) {
                setLoading(false)
                setError(err.message);
                console.error('فشل في جلب البيانات:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserDataAndNotifications();
    }, [dispatch, reloadFlag]);
    if (loading) {
        return (
            <Loading />
        );
    }
    return (<div style={{ direction: "rtl" }} className="overflow-auto text-white ">
        <div className={`mt-28 container max-w-7xl mx-auto overflow-y-hidden  text-white ${vazir.className}`}>
            {/* {role == "company" && notifications?.allData?.map((notification, index) => {
                const createdAt = new Date(notification.createdAt).toLocaleString("ar-EG");
                // النوع 1: عرض استثمار
                if (notification.type === "عرض مالي") {
                    return (<Company_finance_offer setReloadFlag={setReloadFlag} token={token} index={index} createdAt={createdAt} notification={notification} />
                    );
                }
                // النوع 4: رد على استشارة
                if (notification.requestType === "Ask for consultation!") {
                    return (
                        <div key={index} className="border border-[#00F560] overflow-hidden p-4 mb-3   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  shadow">
                            <strong>📌 إشعار: رد على استشارة</strong><br />
                            <strong>الاستشارة:</strong> {notification.consultationContent}<br />
                            <div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                                <strong>الرد:</strong> {notification.investorReply || "لم يتم الرد بعد"}<br /> </div>
                            <small>📅 {createdAt}</small>
                            <div className="mt-4 flex gap-4">   <Link
                                href={`/investors/${notification.investor}`}
                                className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                            >
                                👤 زيارة صفحة المستثمر
                            </Link>
                            </div>
                        </div>
                    );
                }
            })} */}

            {role === "company" && (
                notifications?.allData?.length === 0 ? (
                    <div className="text-center text-white text-lg mt-10">
                        📭 لا يوجد إشعارات لديك إلى الآن
                    </div>
                ) : (
                    notifications?.allData?.map((notification, index) => {
                        const createdAt = new Date(notification.createdAt).toLocaleString("ar-EG");

                        // النوع 1: عرض استثمار
                        if (notification.type === "عرض مالي") {
                            return (
                                <Company_finance_offer
                                    key={index}
                                    setReloadFlag={setReloadFlag}
                                    token={token}
                                    index={index}
                                    createdAt={createdAt}
                                    notification={notification}
                                />
                            );
                        }

                        // النوع 2: رد على استشارة
                        if (notification.requestType === "Ask for consultation!") {
                            return (
                                <div
                                    key={index}
                                    className="border border-[#00F560] overflow-hidden p-4 mb-3 bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow"
                                >
                                    <strong>📌 إشعار: رد على استشارة</strong><br />
                                    <strong>الاستشارة:</strong> {notification.consultationContent}<br />
                                    <div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                                        <strong>الرد:</strong> {notification.investorReply || "لم يتم الرد بعد"}
                                    </div>
                                    <small>📅 {createdAt}</small>
                                    <div className="mt-4 flex gap-4">
                                        <Link
                                            href={`/investors/${notification.investor}`}
                                            className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                                        >
                                            👤 زيارة صفحة المستثمر
                                        </Link>
                                    </div>
                                </div>
                            );
                        }

                        return null; // لو مش من النوعين دول، تجاهل
                    })
                )
            )}





            {/* {role == "charityOrganization" && notifications?.data?.finalSupports?.map((support, index) => (
                <div key={index} className="border border-[#00F560] overflow-hidden  p-4 mb-3 shadow  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  ">
                    <h3 className="font-bold mb-2"></h3>
                    <strong> 📢 إشعار دعم جمعية خيرية</strong><br />
                    <div className="mt-2">
                        <p><strong>📰 عنوان البوست:</strong> {support.postId.title}</p>
                    </div><div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                        <p><strong>✍️ الرسالة:</strong> {support.contentMsg}</p>  </div>
                    <div className="mt-4 flex gap-4">
                        <Link
                            href={
                                support.supporterRole === "Company"
                                    ? `/startUps/${support.supporterId}`
                                    : support.supporterRole === "Investor"
                                        ? `/investors/${support.supporterId}`
                                        : support.supporterRole === "CharityOrganization"
                                            ? `/charaties/${support.supporterId}`
                                            : support.supporterRole === "SupportOrganization"
                                                ? `/incubators/${support.supporterId}`
                                                : "#"
                            }
                            className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                        >
                            👤 زيارة صفحة {support.supporterRole === "Company"
                                ? "الشركة"
                                : support.supporterRole === "Investor"
                                    ? "المستثمر"
                                    : support.supporterRole === "CharityOrganization"
                                        ? "الجمعية"
                                        : support.supporterRole === "SupportOrganization"
                                            ? "الحاضنة"
                                            : ""}
                        </Link>
                    </div>
                </div>
            ))} */}




            {role == "charityOrganization" && (
                notifications?.data?.finalSupports?.length === 0 ? (
                    <div className="text-center text-white text-lg mt-10">
                        📭 لا يوجد إشعارات لديك إلى الآن
                    </div>
                ) : (
                    notifications?.data?.finalSupports?.map((support, index) => (
                        <div
                            key={index}
                            className="border border-[#00F560] overflow-hidden p-4 mb-3 shadow bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                        >
                            <h3 className="font-bold mb-2"></h3>
                            <strong> 📢 إشعار دعم جمعية خيرية</strong><br />

                            <div className="mt-2">
                                <p>
                                    <strong>📰 عنوان البوست:</strong> {support.postId.title}
                                </p>
                            </div>

                            <div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                                <p>
                                    <strong>✍️ الرسالة:</strong> {support.contentMsg}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-4">
                                <Link
                                    href={
                                        support.supporterRole === "Company"
                                            ? `/startUps/${support.supporterId}`
                                            : support.supporterRole === "Investor"
                                                ? `/investors/${support.supporterId}`
                                                : support.supporterRole === "CharityOrganization"
                                                    ? `/charaties/${support.supporterId}`
                                                    : support.supporterRole === "SupportOrganization"
                                                        ? `/incubators/${support.supporterId}`
                                                        : "#"
                                    }
                                    className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                                >
                                    👤 زيارة صفحة {
                                        support.supporterRole === "Company"
                                            ? "الشركة"
                                            : support.supporterRole === "Investor"
                                                ? "المستثمر"
                                                : support.supporterRole === "CharityOrganization"
                                                    ? "الجمعية"
                                                    : support.supporterRole === "SupportOrganization"
                                                        ? "الحاضنة"
                                                        : ""
                                    }
                                </Link>
                            </div>
                        </div>
                    ))
                )
            )}






            {/* {role == "supportOrganization" && notifications?.data?.finalSupports?.map((support, index) => (
                <div key={index} className="border border-[#00F560] overflow-hidden  p-4 mb-3 shadow  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  ">
                    <h3 className="font-bold mb-2"></h3>
                    <strong> 🚀 إشعار دعم لحاضنة أعمال</strong><br />
                    
                    <div className="mt-2">
                        <p><strong>📰 عنوان البوست:</strong> {support.postId.title}</p>
                    </div><div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                        <p><strong>✍️ الرسالة:</strong> {support.contentMsg}</p>  </div>
                    <div className="mt-4 flex gap-4">
                        <Link
                            href={
                                support.supporterRole === "Company"
                                    ? `/startUps/${support.supporterId}`
                                    : support.supporterRole === "Investor"
                                        ? `/investors/${support.supporterId}`
                                        : support.supporterRole === "CharityOrganization"
                                            ? `/charaties/${support.supporterId}`
                                            : support.supporterRole === "SupportOrganization"
                                                ? `/incubators/${support.supporterId}`
                                                : "#"
                            }
                            className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                        >
                            👤 زيارة صفحة {support.supporterRole === "Company"
                                ? "الشركة"
                                : support.supporterRole === "Investor"
                                    ? "المستثمر"
                                    : support.supporterRole === "CharityOrganization"
                                        ? "الجمعية"
                                        : support.supporterRole === "SupportOrganization"
                                            ? "الحاضنة"
                                            : ""}
                        </Link>
                    </div>
                </div>
            ))} */}
            {role == "supportOrganization" && (
                notifications?.data?.finalSupports?.length === 0 ? (
                    <div className="text-center text-white text-lg mt-10">
                        📭 لا يوجد إشعارات لديك إلى الآن
                    </div>
                ) : (
                    notifications?.data?.finalSupports?.map((support, index) => (
                        <div key={index} className="border border-[#00F560] overflow-hidden  p-4 mb-3 shadow  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  ">
                            <h3 className="font-bold mb-2"></h3>
                            <strong> 🚀 إشعار دعم لحاضنة أعمال</strong><br />

                            <div className="mt-2">
                                <p><strong>📰 عنوان البوست:</strong> {support.postId.title}</p>
                            </div>

                            <div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                                <p><strong>✍️ الرسالة:</strong> {support.contentMsg}</p>
                            </div>

                            <div className="mt-4 flex gap-4">
                                <Link
                                    href={
                                        support.supporterRole === "Company"
                                            ? `/startUps/${support.supporterId}`
                                            : support.supporterRole === "Investor"
                                                ? `/investors/${support.supporterId}`
                                                : support.supporterRole === "CharityOrganization"
                                                    ? `/charaties/${support.supporterId}`
                                                    : support.supporterRole === "SupportOrganization"
                                                        ? `/incubators/${support.supporterId}`
                                                        : "#"
                                    }
                                    className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                                >
                                    👤 زيارة صفحة {
                                        support.supporterRole === "Company"
                                            ? "الشركة"
                                            : support.supporterRole === "Investor"
                                                ? "المستثمر"
                                                : support.supporterRole === "CharityOrganization"
                                                    ? "الجمعية"
                                                    : support.supporterRole === "SupportOrganization"
                                                        ? "الحاضنة"
                                                        : ""
                                    }
                                </Link>
                            </div>
                        </div>
                    ))
                )
            )}

            {/* {role == "investor" && notifications?.allData?.map((item, index) => {
                const createdAt = new Date(item.createdAt).toLocaleString("ar-EG");
                const isFinancialOfferResponse = item.type === "عرض مالي";
                const isConsultation = item.requestType === "Ask for consultation!";
                return (
                    <div key={index} className="border border-[#00F560] overflow-hidden  p-4 mb-3 shadow text-white bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20  ">
                        {isFinancialOfferResponse && (
                            <>
                                <Investor_finance_offer_responsed notification={item} createdAt={createdAt} token={token} />
                            </>
                        )}
                        {isConsultation && (
                            <>
                                <Investor_Consultation_Res notification={item} createdAt={createdAt} token={token} />
                            </>
                        )}
                    </div>
                );
            })} */}



            {role === "investor" && (
                notifications?.allData?.length === 0 ? (
                    <div className="text-center text-white text-lg mt-10">
                        📭 لا يوجد إشعارات لديك إلى الآن
                    </div>
                ) : (
                    notifications?.allData?.map((item, index) => {
                        const createdAt = new Date(item.createdAt).toLocaleString("ar-EG");
                        const isFinancialOfferResponse = item.type === "عرض مالي";
                        const isConsultation = item.requestType === "Ask for consultation!";

                        return (
                            <div
                                key={index}
                                className="border border-[#00F560] overflow-hidden  p-4 mb-3 shadow text-white bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
                            >
                                {isFinancialOfferResponse && (
                                    <Investor_finance_offer_responsed
                                        notification={item}
                                        createdAt={createdAt}
                                        token={token}
                                    />
                                )}
                                {isConsultation && (
                                    <Investor_Consultation_Res
                                        notification={item}
                                        createdAt={createdAt}
                                        token={token}
                                    />
                                )}
                            </div>
                        );
                    })
                )
            )}






        </div>
    </div >
    )
}
