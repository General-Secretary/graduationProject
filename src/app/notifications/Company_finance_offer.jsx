import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast';
import { useState } from "react";
import Image from 'next/image'
import { Modal } from "flowbite-react";
import { Button, Popover } from "flowbite-react";
import { Spinner } from "flowbite-react";


export default function Company_finance_offer({ notification, index, createdAt, token, setReloadFlag }) {
    const [offerContent, setOfferContent] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [negotiationMode, setNegotiationMode] = useState(false);
    const [openFinanceOfferModal, setOpenFinanceOfferModal] = useState(false);
    async function sendOfferRequest(content, id) {
        console.log(id)
        const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/offers/${id}`;

        const data = {
            response: content
        };

        try {
            setModalLoading(true);
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            setReloadFlag(prev => !prev);
            setModalLoading(false);

            if (!response.ok) {
                // ❌ لو الريسبونس فيه خطأ، نعرض توست خطأ مرة واحدة بس
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full  bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-600">حدث خطأ أثناء الرد</p>
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

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // ✅ فقط بعد التأكد من إن الريسبونس ناجح
            const result = await response.json();

            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full  bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-[#00F560]">
                                    تم الرد على العرض المالى
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

            console.log("تم إرسال الرد بنجاح:", result);
            return result;

        } catch (error) {
            setModalLoading(false);
            console.error("حدث خطأ أثناء إرسال الرد:", error.message);
            console.log("حدث خطأ أثناء إرسال الرد:", error);
            return null;
        }
    }
    return (
        <div key={index} className="border border-[#00F560] overflow-hidden p-4 mb-3 text-white bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow">
            <strong>📌 إشعار: عرض استثمار من مستثمر</strong><br />
            <strong>المحتوى:</strong> {notification.content}<br />

            {notification.response && (
                <div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                    <strong>✉️ ردك:</strong> {notification.response}
                </div>
            )}
            <Modal
                dismissible
                show={openFinanceOfferModal}
                onClose={() => {
                    setOpenFinanceOfferModal(false);
                    setNegotiationMode(false);
                    setOfferContent('');
                }}
                className="bg-black bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
            >
                <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                    <p className="text-white text-center">الرد على العرض المالي</p>
                </Modal.Header>

                <Modal.Body className="bg-black border-x border-b   border-green-300 text-white">
                    <div style={{ direction: 'rtl' }} className="space-y-6">
                        {!negotiationMode ? (
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => sendOfferRequest('موافق', notification._id)}
                                    className="bg-[#00F560] hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-full"
                                >
                                    موافق {modalLoading ? <Spinner color="info" aria-label="جاري الإرسال" /> : '✅ '}
                                </button>
                                <button
                                    onClick={() => sendOfferRequest('رافض', notification._id)}
                                    className="bg-[#D1D1D6] hover:bg-gray-700 text-black font-semibold py-2 px-4 rounded-full"
                                >
                                    رافض {modalLoading ? <Spinner color="info" aria-label="جاري الإرسال" /> : '❌ '}
                                </button>
                                <button
                                    onClick={() => setNegotiationMode(true)}
                                    className="bg-[#FFD900] hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full"
                                >
                                    تفاوض {modalLoading ? <Spinner color="info" aria-label="جاري الإرسال" /> : '🤝 '}
                                </button>
                            </div>
                        ) : (
                            <>
                                <label className="block text-sm font-medium text-white">محتوى الرد</label>
                                <textarea
                                    value={offerContent}
                                    onChange={(e) => setOfferContent(e.target.value)}
                                    placeholder="اكتب تفاصيل التفاوض هنا"
                                    className="bg-transparent border resize-none border-green-300 text-lg rounded-3xl py-5 focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500"
                                    rows={4}
                                    required
                                ></textarea>
                            </>
                        )}
                    </div>
                </Modal.Body>

                {negotiationMode && (<Modal.Footer className="bg-black border ">

                    <button
                        className="bg-[#00F560] hover:bg-green-600 me-2 mb-2 focus:outline-none rounded-full   text-black font-semibold px-4 py-2"
                        onClick={() => sendOfferRequest(offerContent, notification._id)}
                        disabled={modalLoading || offerContent.trim() === ''}
                    >
                        {modalLoading ? <Spinner color="info" aria-label="جاري الإرسال" /> : 'إرسال التفاوض'}
                    </button>


                </Modal.Footer>)}
            </Modal>
            <small>📅 {createdAt}</small>
            <div className="mt-4 flex gap-4">
                <Link
                    href={`/investors/${notification.investor||"686943ea75a42baf5d357e19"}`}
                    className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                >
                    👤 زيارة صفحة المستثمر
                </Link>
                {!notification.response && (<button
                    onClick={() => setOpenFinanceOfferModal(true)}
                    className="px-4 py-2 rounded-full bg-transparent border border-[#00F560] text-[#00F560] hover:bg-[#00F560] hover:text-black transition"
                >
                    ✉️ الرد على العرض
                </button>)}
            </div>
        </div>


    )
}
