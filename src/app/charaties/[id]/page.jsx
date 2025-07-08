"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import { Spinner } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Button, Popover } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import Loading from './../../loading';
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image'
import Choice from './Choice';
import CharityPostsForProfile from './CharityPostsForProfile';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function page({ params }) {
    const { id } = params;
    const decodedId = decodeURIComponent(id);
    const [error, setError] = useState(null);
    console.log(decodedId);
    const [token, setTokenOfTheUser] = useState(null);
    const [saveLoading, setsaveLoading] = useState(false);
    const [role, setRoleOfTheUser] = useState(null);
    const [userId, setIdOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [charity, setCharity] = useState(null);
    const [posts, setPosts] = useState(null);
    const dispatch = useDispatch();
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
    //             const [resCharity, resCharityPosts] = await Promise.all([
    //                 fetch(`https://estethmarat-estethmarat794-gmailcom-estethmarats-projects.vercel.app/api/v1/charityOrganizations/${decodedId}`),
    //                 fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/posts/?organizationId=${decodedId}`),
    //             ]);
    //             if (!resCharity.ok) {
    //                 throw new Error(`HTTP error! status: ${resCharity.status}`);
    //             }
    //             if (!resCharityPosts.ok) {
    //                 throw new Error(`HTTP error! status: ${resCharityPosts.status}`);
    //             }
    //             const dataCharity = await resCharity.json();
    //             const dataPosts = await resCharityPosts.json();
    //             setCharity(dataCharity);
    //             setPosts(dataPosts);
    //             console.log(dataCharity);
    //             console.log(dataPosts);
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
                // ✅ أولًا: تحميل بيانات الجمعية والمنشورات (دايمًا)
                const [resCharity, resCharityPosts] = await Promise.all([
                    fetch(`https://estethmarat-estethmarat794-gmailcom-estethmarats-projects.vercel.app/api/v1/charityOrganizations/${decodedId}`),
                    fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/posts/?organizationId=${decodedId}`),
                ]);

                if (!resCharity.ok) throw new Error(`HTTP error! status: ${resCharity.status}`);
                if (!resCharityPosts.ok) throw new Error(`HTTP error! status: ${resCharityPosts.status}`);

                const dataCharity = await resCharity.json();
                const dataPosts = await resCharityPosts.json();

                setCharity(dataCharity);
                setPosts(dataPosts);

                // ✅ ثانيًا: محاولة تحميل بيانات المستخدم لو فيه توكن
                const tokenResult = await dispatch(fetchUserToken()).unwrap();

                if (tokenResult) {
                    setTokenOfTheUser(tokenResult);

                    const roleResult = await dispatch(fetchUserRole()).unwrap();
                    setRoleOfTheUser(roleResult || "guest");

                    const idResult = await dispatch(fetchUserId()).unwrap();
                    if (idResult) setIdOfTheUser(idResult);
                } else {
                    console.log("زائر بدون توكن");
                }

                console.log(dataCharity);
                console.log(dataPosts);
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
                                    <img onClick={() => { setSelectedImage(charity?.organization?.image?.secure_url); }} src={charity.organization.image.secure_url} className='w-full cursor-pointer' alt="" />
                                </div>
                            </div>
                            <div className='w-2/3  my-5 '>
                                <div className="text-start">
                                    <p className="text-white font-extrabold xs:text-2xl  my-2 md:text-3xl">    {charity.organization.name} </p>
                                </div>
                                <div className="flex justify-start text-start  items-center">
                                    <p className=" text-white text-sm   font-semibold md:text-lg "> منظمة خيرية عامة </p>
                                    <p className=" text-white text-sm font-thin md:text-md md:ms-10 ">   {charity.organization.headQuarter} ، {charity.organization.country}</p>
                                </div>
                            </div>
                            <div className="  w-1/4 ms-auto">
                                <button disabled={!role}
                                    type="button"
                                    onClick={() => {
                                        sendRequest({
                                            profileId: decodedId,
                                            profileType: "CharityOrganization"
                                        })
                                    }}
                                    className={`text-black mx-auto ${!role ? "opacity-50 cursor-not-allowed" : ""} bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2`}
                                >
                                    حفظ الملف {saveLoading ? <Spinner color="info" aria-label="Info spinner example" /> : <i className="fa-solid fa-bookmark"></i>}
                                </button>
                            </div>
                        </div>
                        <div className='md:hidden p-3'>
                            <div className=' w-full '>
                                <div className='w-[204px]    overflow-hidden  mx-auto  text-center'>
                                    <img onClick={() => { setSelectedImage(charity?.organization?.image?.secure_url); }} src={charity.organization.image.secure_url} className='w-full cursor-pointer' alt="" />
                                </div>
                            </div>
                            <div className='w-full  my-5 '>
                                <div className="text-center">
                                    <p className="text-white font-extrabold   my-2 text-2xl">{charity.organization.name}</p>
                                </div>
                                <div className=" text-start  ">
                                    <p className=" text-white text-sm   font-semibold my-2 md:text-lg "> منظمة خيرية عامة </p>
                                    <p className=" text-white text-sm font-thin md:text-md md:ms-10 "> {charity.organization.headQuarter} ، {charity.organization.country} </p>
                                </div>
                            </div>
                            <div className="  w-full ">
                                <button disabled={!role}
                                    type="button"
                                    onClick={() => {
                                        sendRequest({
                                            profileId: decodedId,
                                            profileType: "CharityOrganization"
                                        })
                                    }}
                                    className={`text-black mx-auto   ${!role ? "opacity-50 cursor-not-allowed" : ""} bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2`}
                                >
                                    حفظ الملف {saveLoading ? <Spinner color="info" aria-label="Info spinner example" /> : <i className="fa-solid fa-bookmark"></i>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ direction: "rtl" }} className="container p-5 mx-auto   xl:w-[91%]">
                        <p className='text-white text-start  font-semibold my-7 text-3xl'>الوصف </p>
                        <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
                            {charity.organization.description}
                        </p>
                    </div>
                    <div>
                        <Choice providedPrograms={charity.organization.projectTypes} supportTypes={charity.organization.supportTypes} targetedGroups={charity.organization.targetedGroups} targetedRegions={charity.organization.targetedRegions} />
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
                        <CharityPostsForProfile role={role} token={token} posts={posts.posts} id={decodedId} />
                    </div>
                </div>
            </div>
        </div>
    )
}