"use client"
import React from 'react'
import toast from 'react-hot-toast';
import { useState } from "react";
import Image from 'next/image'
import { Modal } from "flowbite-react";
import { Button, Popover } from "flowbite-react";
import { Spinner } from "flowbite-react";
export default function PostCard({ post, role, token, id }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [offerContent, setOfferContent] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [openFinanceOfferModal, setOpenFinanceOfferModal] = useState(false);
    // async function sendOfferRequest(content,id) {
    //     const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/support-charity/${id}`;

    //     const data = {
    //         contentMsg: content
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
    //         console.log(error)
    //         // ممكن ترجع الخطأ لو عاوز تستخدمه في حتة تانية
    //         return null;
    //     }
    // }
    async function sendOfferRequest(content, id) {
        const url = `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/support-charity/${id}`;

        const data = {
            contentMsg: content
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
                // ❌ لو الريسبونس فيه خطأ، نعرض توست خطأ مرة واحدة بس
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full  bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-600">حدث خطأ أثناء إرسال العرض</p>
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
            console.error("حدث خطأ أثناء إرسال العرض:", error.message);
            return null;
        }
    }

    return (
        <div>
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

            <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
                <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
                    <div className="relative z-10 w-full h-[250px] ">
                        <Image
                            className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage(post.attachedImage.secure_url); }}
                            unoptimized
                            src={post.attachedImage.secure_url}
                            width={700}
                            height={400}
                            alt=""
                        />
                    </div>
                </div>
                <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
                    <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'> {post.title} </p>
                    <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {post.content}  </p>
                </div>
                <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
                    < div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
                        <div className='w-1/6  xs:p-1'>
                            <img src={post.organizationId.image.secure_url} className='w-full p-1 rounded-lg' alt="" />
                        </div>
                        <div className='w-5/12'><p className='font-semibold'>   {post.organizationId.name}   </p></div>
                        <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
                    </div>
                    <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
                        {/* <div   onClick={() => { setOpenFinanceOfferModal(true); }} className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
                            قدم الدعم
                        </div> */}
                        <button
                            onClick={() => setOpenFinanceOfferModal(true)}
                            disabled={!role}
                            className={`w-[80%] mx-auto py-3 rounded-full text-black font-medium text-center bg-[#00F560]
                ${!role ? "opacity-50 cursor-not-allowed" : " hover:bg-[#38ba6c] cursor-pointer"}`}
                        >
                            قدم الدعم
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                dismissible
                show={openFinanceOfferModal}
                onClose={() => setOpenFinanceOfferModal(false)}
                className="bg-black bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
            >
                <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                    <p className="text-white text-center">تقديم عرض لبرنامج <span className="text-[#00F560]">{post.title}</span> الخيري</p>
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
                        onClick={() => sendOfferRequest(offerContent, post._id)}
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
            {/* 
            <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
                <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
                    <div className="relative z-10 w-full h-[250px] ">
                        <Image
                            className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage(post.attachedImage.secure_url); }}
                            unoptimized
                            src={post.attachedImage.secure_url}
                            width={700}
                            height={400}
                            alt=""
                        />
                    </div>
                </div>
                <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
                    <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>برنامج {post.title}</p>
                    <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {post.content}</p>
                </div>
                <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
                    <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
                        <div className='w-1/6  xs:p-1'>
                            <img src={post.organizationId.image.secure_url} className='w-full p-1 rounded-lg' alt="" />
                        </div>
                        <div className='w-5/12'><p className='font-semibold'>{post.organizationId.name}</p></div>
                        <div className='w-5/12'><p className='text-[13px] '>حاضنة أعمال</p></div>
                    </div>
                    <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
                        {role == "company" ? <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
                            قدم الآن
                        </div> : ""}
                    </div>
                </div>
            </div> */}
        </div>
    )
}







// <div className=' mx-auto text-white'>
//     <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">

//         <div className=' w-full  md:w-1/2 py-4 '>
//             <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
//                 <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                     <div className="relative z-10 w-full h-[250px] ">
//                         <Image
//                             className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage("/charityexable.png"); }}
//                             unoptimized
//                             src="/charityexable.png"
//                             width={700}
//                             height={400}
//                             alt=""
//                         />
//                     </div>
//                 </div>
//                 <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                     <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                     <p className='text-xs xs:w-[95%] mx-auto leading-loose '>أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو </p>
//                 </div>
//                 <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                     < div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                         <div className='w-1/6  xs:p-1'>
//                             <img src="/misrElkheir.png" className='w-full p-1 rounded-lg' alt="" />
//                         </div>
//                         <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                         <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
//                     </div>
//                     <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                         <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                             قدم الدعم
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className=' w-full  md:w-1/2 py-4 '>
//             <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
//                 <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                     <div className="relative z-10 w-full h-[250px] ">
//                         <Image
//                             className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage("/charityexable.png"); }}
//                             unoptimized
//                             src="/charityexable.png"
//                             width={700}
//                             height={400}
//                             alt=""
//                         />
//                     </div>
//                 </div>
//                 <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                     <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                     <p className='text-xs xs:w-[95%] mx-auto leading-loose '>أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو </p>
//                 </div>
//                 <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                     < div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                         <div className='w-1/6  xs:p-1'>
//                             <img src="/misrElkheir.png" className='w-full p-1 rounded-lg' alt="" />
//                         </div>
//                         <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                         <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
//                     </div>
//                     <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                         <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                             قدم الدعم
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className=' w-full  md:w-1/2 py-4 '>
//             <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
//                 <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                     <div className="relative z-10 w-full h-[250px] ">
//                         <Image
//                             className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage("/charityexable.png"); }}
//                             unoptimized
//                             src="/charityexable.png"
//                             width={700}
//                             height={400}
//                             alt=""
//                         />
//                     </div>
//                 </div>
//                 <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                     <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                     <p className='text-xs xs:w-[95%] mx-auto leading-loose '>أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو </p>
//                 </div>
//                 <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                     < div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                         <div className='w-1/6  xs:p-1'>
//                             <img src="/misrElkheir.png" className='w-full p-1 rounded-lg' alt="" />
//                         </div>
//                         <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                         <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
//                     </div>
//                     <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                         <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                             قدم الدعم
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>