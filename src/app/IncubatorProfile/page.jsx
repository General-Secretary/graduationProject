"use client"
import React from 'react'
import { Button, Modal } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { Spinner } from "flowbite-react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image'
import Choice from './Choice';
import { useEffect, useState } from 'react';
import { Popover } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import toast from 'react-hot-toast';
import Loading from './../loading';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import Link from 'next/link';
import SupportPostsForProfile from './SupportPostsForProfile';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function page() {
    const [incubator, setIncubator] = useState(null);
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [idOfTheUser, setIdOfTheUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setTokenOfTheUser] = useState(null);

    const [modalLoading, setModalLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachedImage, setAttachedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const organizationType = "SupportOrganization";
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
        formData.append("organizationType", organizationType);
        if (attachedImage) {
            formData.append("attachedImage", attachedImage);
        }
        try {
            setModalLoading(true)
            const res = await fetch(
                "https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/posts/add",
                {
                    method: "POST",
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
                // setRefresh(true)
                // setPosts(prev => ({
                //     ...prev,
                //     posts: [...prev.posts, data.post]
                // }));
                setTitle("")
                setContent("")
                setAttachedImage(null)
                setImagePreview(null)
                setOpenModal(false)
                setRefresh(prev => !prev)

                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-[#00F560]">
                                        تم اضافه المنشور بنجاح
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
                                        {"Error: " + data.message}
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
    const dispatch = useDispatch();
    const userIdFromStore = useSelector((state) => state.userId.id);
    useEffect(() => {
        const fetchIncubatorData = async () => {
            try {
                const result = await dispatch(fetchUserId()).unwrap();
                const userId = result;
                if (!userId) throw new Error("User ID is null");
                setIdOfTheUser(userId)
                const result2 = await dispatch(fetchUserToken()).unwrap();
                const token = result2;
                if (!token) throw new Error("User Token is null");
                setTokenOfTheUser(token)
                const [resIncubator, resIncubatorPosts] = await Promise.all([
                    fetch(`https://estethmarat-estethmarat794-gmailcom-estethmarats-projects.vercel.app/api/v1/supportOrganizations/${userId}`),
                    fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/posts/?organizationId=${userId}`),
                ]);
                if (!resIncubator.ok) {
                    throw new Error(`HTTP error! status: ${resIncubator.status}`);
                }
                if (!resIncubatorPosts.ok) {
                    throw new Error(`HTTP error! status: ${resIncubatorPosts.status}`);
                }
                const dataIncubator = await resIncubator.json();
                const dataPosts = await resIncubatorPosts.json();
                setIncubator(dataIncubator);
                setPosts(dataPosts);
                console.log(dataIncubator);
                console.log(dataPosts);
            } catch (err) {
                setError(err.message);
                console.error('فشل في جلب البيانات:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchIncubatorData();
    }, [dispatch, refresh]);
    if (loading) {
        return (
            <Loading />
        );
    }
    return (
        <div>
            <div className="overflow-auto">
                <div className={` ${vazir.className}`}>
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
                    <div style={{ direction: "rtl" }} className="bg-[#00F5601A]  mt-44 mb-14 bg-opacity-10">
                        <div className='hidden md:flex  justify-start items-center'>
                            <div className=' w-[400px] relative'>
                                <div className='w-[204px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  overflow-hidden  ms-2  text-center'>
                                    <img onClick={() => { setSelectedImage(incubator?.organization?.image?.secure_url); }} src={incubator.organization.image.secure_url} className='w-full cursor-pointer' alt="" />
                                </div>
                            </div>
                            <div className='w-2/3  my-5 '>
                                <div className="text-start">
                                    <p className="text-white font-extrabold xs:text-2xl  my-2 md:text-3xl">{incubator.organization.name}</p>
                                </div>
                                <div className="flex justify-start text-start  items-center">
                                    <p className=" text-white text-sm   font-semibold md:text-lg ">حاضنة أعمال (Incubator) </p>
                                    <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">{incubator.organization.headQuarter} ، {incubator.organization.country}</p>
                                </div>
                            </div>
                            <div className="  w-1/4 ms-auto">
                                <button
                                    type="button"
                                    className="text-black mx-auto  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                                >
                                    تعديل الملف
                                </button>
                            </div>
                        </div>
                        <div className='md:hidden p-3'>
                            <div className=' w-full '>
                                <div className='w-[204px]    overflow-hidden  mx-auto  text-center'>
                                    <img onClick={() => { setSelectedImage(incubator?.organization?.image?.secure_url); }} src={incubator.organization.image.secure_url} className='w-full cursor-pointer' alt="" />
                                </div>
                            </div>
                            <div className='w-full  my-5 '>
                                <div className="text-center">
                                    <p className="text-white font-extrabold   my-2 text-2xl">{incubator.organization.name}</p>
                                </div>
                                <div className=" text-start  ">
                                    <p className=" text-white text-sm   font-semibold my-2 md:text-lg ">حاضنة أعمال (Incubator) </p>
                                    <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">{incubator.organization.headQuarter} ، {incubator.organization.country}</p>
                                </div>
                            </div>
                            <div className="  w-full ">
                                <button
                                    type="button"
                                    className="text-black  w-full  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                                >
                                    تعديل الملف
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ direction: "rtl" }} className="container p-5 mx-auto   xl:w-[91%]">
                        <p className='text-white text-start  font-semibold my-7 text-3xl'>الوصف </p>
                        <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
                            {incubator.organization.description}
                        </p>
                    </div>
                    <div>
                        <Choice providedPrograms={incubator.organization.providedPrograms} supportTypes={incubator.organization.supportTypes} targetedProjectStages={incubator.organization.targetedProjectStages} supportedProjectFields={incubator.organization.supportedProjectFields} />
                    </div>
                    <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32 ">
                        <div className='flex justify-center items-center'>
                            <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                            </div>
                            <div className='xs:w-1/2 md:w-1/4'>
                                <p className='text-white text-center  font-semibold my-7 text-3xl'>منشورات وبرامج المنظمة </p>
                            </div>
                            <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                            </div>
                        </div>
                        <div className=' mx-auto text-white'>
                            <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">
                                <div className=' w-full   flex justify-center container mx-auto items-center  flex-wrap md:w-1/2 py-4 '>
                                    <button className="bg-[#00F560]    w-[80%] mx-auto py-3 rounded-full hover:bg-green-700 text-black font-semibold   px-4   shadow-md transition duration-300 ease-in-out " onClick={() => { setOpenModal(true); }}>اضافه منشور +</button>
                                </div>
                            </div>
                        </div>
                        <SupportPostsForProfile posts={posts.posts} token={token} triggerRefresh={() => setRefresh(prev => !prev)} />

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
                    </div>
                </div>
            </div>
        </div>
    )
}