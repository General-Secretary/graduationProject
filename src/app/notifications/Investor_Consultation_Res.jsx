import React from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast';
import { useState } from "react";
import Image from 'next/image'
import { Modal } from "flowbite-react";
import { Button, Popover } from "flowbite-react";
import { Spinner } from "flowbite-react";

export default function Investor_Consultation_Res({ notification, index, createdAt, token }) {
    const [offerContent, setOfferContent] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [openFinanceOfferModal, setOpenFinanceOfferModal] = useState(false);
    async function sendOfferRequest(content, id) {
        const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/reply-consultation/${id}`;

        const data = {
            investorReply: content
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
                                    تم تقديم الرد
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

            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-red-600">
                                    حدث خطأ أثناء إرسال الرد
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

            console.error("حدث خطأ أثناء إرسال الرد:", error.message);
            return null;
        }
    }

    return (
        <div>
            <>

                <>
                    <h3 className="font-bold mb-2">🗣️ استشارة من شركة</h3>
                    <p><strong>💬 محتوى الاستشارة:</strong> {notification.consultationContent}</p>
                    <p className="text-sm text-gray-600">
                        📥 هل تم الرد؟ {notification.investorIsReplied ? "نعم" : "لا"}
                    </p>
                    {notification.investorIsReplied && (
                        
                                <div className="mt-2 p-3 bg-[#00F56033] text-black rounded-xl">
                            <p><strong>📝 ردك:</strong> {notification.investorReply}</p></div>
                    )}
                </>
            </>

            <Modal
                dismissible
                show={openFinanceOfferModal}
                onClose={() => setOpenFinanceOfferModal(false)}
                className="bg-black bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
            >
                <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                    <p className="text-white text-center">الرد على استشاره</p>
                </Modal.Header>

                <Modal.Body className="bg-black border-x border-green-300 text-white">
                    <div style={{ direction: "rtl" }} className="space-y-6">
                        <label className="block text-sm font-medium text-white"> {notification.consultationContent}</label>
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
                        className="bg-[#00F560] hover:bg-green-600 me-2 mb-2 focus:outline-none rounded-full text-black  font-semibold px-4 py-2"
                        onClick={() => sendOfferRequest(offerContent, notification._id)}
                        disabled={modalLoading || offerContent.trim() === ""}
                    >
                        {modalLoading ? (
                            <Spinner color="info" aria-label="جاري الإرسال" />
                        ) : (
                            "إرسال الرد"
                        )}
                    </button>
                </Modal.Footer>
            </Modal>
            <small>📅 {createdAt}</small>
            <div className="mt-4 flex gap-4">
                <Link
                    href={`/startUps/${notification.company}`}
                    className="px-4 py-2 rounded-full bg-[#00F560] text-black hover:bg-[#00d74c] transition"
                >
                    👤 زيارة صفحة الشركه
                </Link>
                {!notification.investorIsReplied  && (<button
                    onClick={() => setOpenFinanceOfferModal(true)}
                    className="px-4 py-2 rounded-full bg-transparent border border-[#00F560] text-[#00F560] hover:bg-[#00F560] hover:text-black transition"
                >
                    ✉️  الرد على الاستشاره
                </button>)}
            </div>
        </div>

    )
}
