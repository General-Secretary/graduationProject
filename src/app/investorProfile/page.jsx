
'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import { Button, Popover } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import Rating from '@mui/material/Rating';
import Comments from './Comments';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import Loading from './../loading';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });

export default function page() {
    const [investor, setInvestor] = useState(null);
    const [deals, setDeals] = useState(null);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [idOfTheUser, setIdOfTheUser] = useState(null);
        const [selectedImage, setSelectedImage] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const userIdFromStore = useSelector((state) => state.userId.id);
    useEffect(() => {
        const fetchInvestorData = async () => {
            try {
                const result = await dispatch(fetchUserId()).unwrap();
                const userId = result;
                if (!userId) throw new Error("User ID is null");
                setIdOfTheUser(userId)
                const [resInvestor, resInvestorDeals, resInvestorComments] = await Promise.all([
                    fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/investors/${userId}`),
                    fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/deal/?investorId=${userId}`),
                    fetch(`https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1/comments/investors?investorId=${userId}`),

                ]);
                if (!resInvestor.ok) {
                    throw new Error(`HTTP error! status: ${resInvestor.status}`);
                }
 let dataDeals;
                if (resInvestorDeals.ok) {
                    dataDeals = await resInvestorDeals.json();
                } else if (resInvestorDeals.status === 404) {
                    dataDeals = {
                        status: "fail",
                        data: {
                            allDeals: [
                            ]
                        }
                    } // مفيش دييلز
                } else {
                    throw new Error(`HTTP error in deals! status: ${resInvestorDeals.status}`);
                }
                if (!resInvestorComments.ok) {
                    throw new Error(`HTTP error! status: ${resInvestorComments.status}`);
                }

                const dataInvestor = await resInvestor.json();
                const dataInvestorComments = await resInvestorComments.json();
                setInvestor(dataInvestor);
                setDeals(dataDeals);
                setComments(dataInvestorComments)
                console.log(dataInvestor);
                console.log(dataDeals);
                console.log(dataInvestorComments);
            } catch (err) {
                setError(err.message);
                console.error('فشل في جلب البيانات:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestorData();
    }, [dispatch]);
    if (loading) {
        return (
            <Loading />
        );
    }



    return (
        <div className="overflow-auto">
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
                <div style={{ direction: "rtl" }} className="bg-[#00F5601A]  mt-44 mb-14 bg-opacity-10">
                    <div className='hidden md:flex  justify-start items-center'>
                        <div className=' w-[400px] relative'>
                            <div className='w-[204px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full overflow-hidden  ms-2  text-center'>
                                <img onClick={() => { setSelectedImage(investor?.data?.investor?.profilePhoto);}} src={investor.data.investor.profilePhoto} className='cursor-pointer w-full' alt="" />
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
                            <button
                                type="button"
                                className="text-black mx-auto  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                            >
                                تعديل الملف الشخصي
                            </button>
                        </div>
                    </div>
                    <div className='md:hidden p-3'>
                        <div className=' w-full '>
                            <div className='w-[204px]   rounded-full overflow-hidden  mx-auto  text-center'>
                                <img onClick={() => { setSelectedImage(investor?.data?.investor?.profilePhoto);}} src={investor.data.investor.profilePhoto} className='cursor-pointer w-full' alt="" />
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
                            <button
                                type="button"
                                className="text-black  w-full  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                            >
                                تعديل الملف الشخصي
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
                        {/* {deals.data.allDeals.map(obj =>
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
                                                href={`startUps/${obj.companyId._id}`}
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
                        )} */}

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


                    </div>
                </div>
                <Comments comments={comments} name={investor.data.investor.fullArabicName} img={investor.data.investor.profilePhoto} />
            </div>
        </div>
    )
}