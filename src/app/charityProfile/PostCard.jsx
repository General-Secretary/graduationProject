// "use client"

// import React from 'react'
// import { useState } from "react";
// import Image from 'next/image'
// import { Button, Modal } from "flowbite-react";
// import { Spinner } from "flowbite-react";
// import toast from 'react-hot-toast';

// export default function PostCard({ post, token, triggerRefresh }) {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [title, setTitle] = useState(post.title);
//     const [content, setContent] = useState(post.content);
//     const [attachedImage, setAttachedImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(post.attachedImage.secure_url);
//     const [modalLoading, setModalLoading] = useState(false);
//     const [openModal, setOpenModal] = useState(false);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setAttachedImage(file);
//         setImagePreview(URL.createObjectURL(file));
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("content", content);
//         if (attachedImage) {
//             formData.append("attachedImage", attachedImage);
//         }
//         try {
//             setModalLoading(true)
//             const res = await fetch(
//                 `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app//api/v1/posts/${post._id}`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: formData,
//                 }
//             );
//             setModalLoading(false)
//             const data = await res.json();
//             console.log(data)
//             if (res.ok) {


//                 triggerRefresh()
//                 // setTimeout(() => {
//                 //     post.attachedImage.secure_url = data.post.attachedImage.secure_url
//                 //     post.title = data.post.title
//                 //     post.content = data.post.content
//                 //     setRefresh(true);
//                 //     setTimeout(() => {
//                 //         setRefresh(true);
//                 //     }, 500);
//                 // }, 500);

//                 setOpenModal(false)
//                 toast.custom((t) => (
//                     <div
//                         className={`${t.visible ? 'animate-enter' : 'animate-leave'
//                             } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//                     >
//                         <div className="flex-1 w-0 p-4">
//                             <div className="flex items-start">
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium text-[#00F560]">
//                                         تم تعديل المنشور بنجاح
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex border-l border-green-500">
//                             <button
//                                 onClick={() => toast.dismiss(t.id)}
//                                 className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 ), { duration: 1000 });
//             } else {
//                 toast.custom((t) => (
//                     <div
//                         className={`${t.visible ? 'animate-enter' : 'animate-leave'
//                             } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//                     >
//                         <div className="flex-1 w-0 p-4">
//                             <div className="flex items-start">
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium text-red-600">
//                                         {"Error: " + data?.message}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex border-l border-red-500">
//                             <button
//                                 onClick={() => toast.dismiss(t.id)}
//                                 className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 ), { duration: 1000 });
//             }
//         } catch (error) {
//             setModalLoading(false)
//             console.error("Error submitting post:", error);
//         }
//     };
//     return (
//         <div>
//             {selectedImage && (
//                 <div
//                     onClick={() => setSelectedImage(null)}
//                     className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
//                 >
//                     <button
//                         onClick={() => setSelectedImage(null)}
//                         className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
//                     >
//                         &times;
//                     </button>
//                     <img
//                         src={selectedImage}
//                         onClick={(e) => e.stopPropagation()}
//                         alt="صورة مكبرة"
//                         className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
//                     />
//                 </div>
//             )}


//             <Modal
//                 dismissible
//                 show={openModal}
//                 onClose={() => setOpenModal(false)}
//                 className="bg-black bg-opacity-80  backdrop-blur-sm"
//             >
//                 <Modal.Header className="bg-black border flex justify-center items-center  border-b border-green-400">
//                     <p className="text-white text-center">  اضافه منشور</p>
//                 </Modal.Header>
//                 <Modal.Body className="bg-black border rounded-b-2xl border-green-300 text-white">
//                     <div className="space-y-6">
//                         <form style={{ direction: "rtl" }}
//                             onSubmit={handleSubmit}
//                             className="sm:max-w-md mx-auto bg-black sm:p-6 p-1 rounded-lg shadow-lg space-y-4"
//                         >
//                             <h2 className="text-xl font-bold">إضافة منشور جديد</h2>
//                             <label
//                                 htmlFor="imageUpload"
//                                 className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
//                             >
//                                 {imagePreview ? (
//                                     <img
//                                         src={imagePreview}
//                                         alt="Preview"
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <span className="text-gray-400">اضغط للرفع</span>
//                                 )}
//                             </label>
//                             <input
//                                 id="imageUpload"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                             />
//                             <input type="text"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 placeholder="العنوان"
//                                 required className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
//                             />
//                             <textarea
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 placeholder="المحتوى"
//                                 className="bg-transparent border resize-none border-green-300  text-lg rounded-3xl py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 "
//                                 rows={4}
//                                 required
//                             ></textarea>

//                             <button
//                                 type="submit"
//                                 className="w-full px-4 hover:bg-green-700 bg-[#00F560] text-black cursor-pointer mx-auto py-3 rounded-full"
//                             >
//                                 نشر {modalLoading && <Spinner color="info" aria-label="Info spinner example" />}
//                             </button>
//                         </form>
//                     </div>
//                 </Modal.Body>
//             </Modal>



//             <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
//                 <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                     <div className="relative z-10 w-full h-[250px] ">
//                         <Image
//                             className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage(post.attachedImage.secure_url); }}
//                             unoptimized
//                             src={post.attachedImage.secure_url}
//                             width={700}
//                             height={400}
//                             alt=""
//                         />
//                     </div>
//                 </div>
//                 <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                     <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>برنامج {post.title}</p>
//                     <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {post.content}</p>
//                 </div>
//                 <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                     <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                         <div className='w-1/6  xs:p-1'>
//                             <img src={post?.organizationId?.image?.secure_url} className='w-full p-1 rounded-lg' alt="" />
//                         </div>
//                         <div className='w-5/12'><p className='font-semibold'>{post?.organizationId?.name}</p></div>
//                         <div className='w-5/12'><p className='text-[13px] '>حاضنة أعمال</p></div>
//                     </div>
//                     <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                         <div onClick={() => { setOpenModal(true); }} className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                             تعديل المنشور
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }











"use client"

import React from 'react'
import { useState } from "react";
import Image from 'next/image'
import { Button, Modal } from "flowbite-react";
import { Spinner } from "flowbite-react";
import toast from 'react-hot-toast';

export default function PostCard({ post, token, triggerRefresh }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [attachedImage, setAttachedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(post.attachedImage.secure_url);
    const [modalLoading, setModalLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAttachedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (attachedImage) {
            formData.append("attachedImage", attachedImage);
        }
        try {
            setModalLoading(true)
            const res = await fetch(
                `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/posts/${post._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            setModalLoading(false)
            const data = await res.json();
            console.log(data)
            if (res.ok) {


                triggerRefresh()
                // setTimeout(() => {
                //     post.attachedImage.secure_url = data.post.attachedImage.secure_url
                //     post.title = data.post.title
                //     post.content = data.post.content
                //     setRefresh(true);
                //     setTimeout(() => {
                //         setRefresh(true);
                //     }, 500);
                // }, 500);

                setOpenModal(false)
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-[#00F560]">
                                        تم تعديل المنشور بنجاح
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
            } else {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-600">
                                        {"Error: " + data?.message}
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
        } catch (error) {
            setModalLoading(false)
            console.error("Error submitting post:", error);
        }
    };
    const handleDeletePost = async (e) => {

        try {
            setModalLoading(true)
            const res = await fetch(
                `https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/posts/${post._id}`,
                {
                    method: "DELETE",
                }
            );
            setModalLoading(false)
            const data = await res.json();
            console.log(data)
            if (res.ok) {


                triggerRefresh()
                // setTimeout(() => {
                //     post.attachedImage.secure_url = data.post.attachedImage.secure_url
                //     post.title = data.post.title
                //     post.content = data.post.content
                //     setRefresh(true);
                //     setTimeout(() => {
                //         setRefresh(true);
                //     }, 500);
                // }, 500);

                setOpenModal2(false)
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-[#00F560]">
                                        تم حذف المنشور بنجاح
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
            } else {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-600">
                                        {"Error: " + data?.message}
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
        } catch (error) {
            setModalLoading(false)
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-red-600">
                                    {"Error: خطأ ما"}
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
            console.error("Error submitting post:", error);
        }
    };
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


            <Modal
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
                className="bg-black bg-opacity-80  backdrop-blur-sm"
            >
                <Modal.Header className="bg-black border flex justify-center items-center  border-b border-green-400">
                    <p className="text-white text-center">  اضافه منشور</p>
                </Modal.Header>
                <Modal.Body className="bg-black border rounded-b-2xl border-green-300 text-white">
                    <div className="space-y-6">
                        <form style={{ direction: "rtl" }}
                            onSubmit={handleSubmit}
                            className="sm:max-w-md mx-auto bg-black sm:p-6 p-1 rounded-lg shadow-lg space-y-4"
                        >
                            <h2 className="text-xl font-bold">إضافة منشور جديد</h2>
                            <label
                                htmlFor="imageUpload"
                                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400">اضغط للرفع</span>
                                )}
                            </label>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <input type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="العنوان"
                                required className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 '
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="المحتوى"
                                className="bg-transparent border resize-none border-green-300  text-lg rounded-3xl py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 "
                                rows={4}
                                required
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full px-4 hover:bg-green-700 bg-[#00F560] text-black cursor-pointer mx-auto py-3 rounded-full"
                            >
                                نشر {modalLoading && <Spinner color="info" aria-label="Info spinner example" />}
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal
                dismissible
                show={openModal2}
                onClose={() => setOpenModal2(false)}
                className="bg-black  bg-opacity-80 fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
            >
                {/* <Modal.Header  className="bg-black border  border-b border-green-400">
            <p   className="text-white text-center ">أنت على وشك حذف حسابك نهائيًا</p>
          </Modal.Header> */}
                <Modal.Header className="bg-black border border-b border-green-400 flex justify-center items-center">
                    <p className="text-white text-center">أنت على وشك حذف المنشور نهائيًا</p>
                </Modal.Header>
                <Modal.Body className="bg-black border-x border-green-300 text-white">
                    <div style={{ direction: "rtl" }} className="space-y-6">
                        <p> اتمام حذف المنشور؟ </p>

                    </div>
                </Modal.Body>

                <Modal.Footer className="bg-black border border-t border-green-300">
                    <button
                        className="hover:bg-red-400 me-2 mb-2 focus:outline-none rounded-full  bg-red-700 text-white font-semibold px-4 py-2"
                        onClick={() => {
                            handleDeletePost()
                        }}
                    >
                        تأكيد{modalLoading && <Spinner color="info" aria-label="Info spinner example" />}
                    </button>
                    <button
                        className="hover:bg-[#00F560] me-2 mb-2 focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2"
                        onClick={() => {
                            setOpenModal2(false);
                        }}
                    >
                        عدم الحذف
                    </button>
                </Modal.Footer>
            </Modal>



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
                <div className='w-[95%] xs:w-[85%] relative mx-auto my-7'>
                    <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>برنامج {post.title}</p>
                    <i onClick={() => { setOpenModal2(true); }} class="fa-solid text-red-700 cursor-pointer text-xl absolute top-0 left-0 hover:text-red-400 fa-trash-can"></i>

                    <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {post.content}</p>
                </div>
                <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
                    <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
                        <div className='w-1/6  xs:p-1'>
                            <img src={post?.organizationId?.image?.secure_url} className='w-full p-1 rounded-lg' alt="" />
                        </div>
                        <div className='w-5/12'><p className='font-semibold'>{post?.organizationId?.name}</p></div>
                        <div className='w-5/12'><p className='text-[13px] '>حاضنة أعمال</p></div>
                    </div>
                    <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
                        <div onClick={() => { setOpenModal(true); }} className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
                            تعديل المنشور
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
