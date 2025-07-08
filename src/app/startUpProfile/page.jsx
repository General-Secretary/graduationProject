// 'use client';
// import { useEffect, useState } from 'react';
// import React from 'react';
// import { Vazirmatn } from 'next/font/google';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
// import { Button, Popover } from "flowbite-react";
// import Comments from './Comments';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
// import Loading from './../loading';

// const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });

// export default function Page() {
//     const [company, setCompany] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const dispatch = useDispatch();
//     const userIdFromStore = useSelector((state) => state.userId.id);

//     useEffect(() => {
//         const fetchUserDataAndCompany = async () => {
//             try {
//                 const result = await dispatch(fetchUserId()).unwrap();
//                 const userId = result;
//                 if (!userId) throw new Error("User ID is null");
//                 const res = await fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/companies/${userId}`);
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const data = await res.json();
//                 setCompany(data);
//                 console.log(data);
//             } catch (err) {
//                 setError(err.message);
//                 console.error('فشل في جلب بيانات الشركة:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserDataAndCompany();
//     }, [dispatch]);
//     if (loading) {
//         return (
//             <Loading />
//         );
//     }
//     return (
//         <div className={` ${vazir.className}`}>

//             <div className='md:mt-32 mt-16'>
//                 <div style={{ direction: "rtl" }} className="bg-[#00F5601A] bg-opacity-10">
//                     <div className="container m-auto flex flex-wrap justify-center items-center xl:w-[95%] ">
//                         <div className='md:w-1/2 py-5 flex  justify-around items-center  md:my-0 border-b md:border-0 border-gray-700 w-full  '>
//                             <div className='w-2/3 md:mx-auto'>
//                                 <div className="text-center">
//                                     <p className="text-white font-extrabold xs:text-2xl md:text-3xl">شركة المرعبين المحدودة</p>
//                                 </div>

//                                 <div className="flex justify-around   items-center">
//                                     <p className="text-end text-white text-sm font-thin md:text-md md:mx-3">التكنولوجيا - التعليم</p>
//                                     <p className="text-start text-white text-sm font-thin md:text-md md:mx-3 ">Seed</p>
//                                 </div>
//                             </div>
//                             <div className='w-1/3   md:hidden  '>
//                                 <div className='w-[50px]  ms-2  text-center'>
//                                     <img src={"/assits/logo2.png"} className='w-full' alt="" />
//                                     <p className='text-[#8080808C] text-start'>@Abcdefj</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='md:w-1/2  w-full flex  justify-center items-center'>
//                             <div className='md:w-1/3 my-5  md:ms-auto text-center'>
//                                 <div style={{ direction: "ltr" }}>
//                                     <Rating
//                                         name="text-feedback"
//                                         value={3.5}
//                                         readOnly
//                                         precision={0.5}
//                                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                     />
//                                 </div>
//                                 <div className='flex justify-center text-center items-center'>
//                                     <div><p className='text-gray-600 mx-3' >(42 Review)</p></div>
//                                     <div><p className='text-white mx-3 text-xl' >3.5</p></div>
//                                 </div>
//                             </div>
//                             <div className='w-1/3  hidden md:inline  mx-5'>
//                                 <div className='w-[80px] mx-auto  text-center'>
//                                     <img src={"/assits/logo2.png"} className='w-full' alt="" />
//                                     <p className='text-[#8080808C] text-center'>@Abcdefj</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ direction: "rtl" }} className="container mx-auto my-32 flex flex-wrap justify-center items-center xl:w-[95%] ">
//                     <div className='md:w-2/5 w-full p-5 md:border-l md:border-l-[#00F560]'>
//                         <div className='border-b md:me-16 pb-10 border-b-gray-300'>
//                             <p className='text-white text-start font-semibold my-7 text-3xl'>معلومات الشركة</p>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'> الخدمات:</p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> التسويق والدعايا</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'> نمودج العمل:</p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> B2B</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'>  السوق المستهدف:</p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> الخليج</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'> عدد الموظفين الحاليين:</p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> 28</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'>   تاريخ التأسيس:</p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> مارس 2021</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'>  الشراكات:</p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> لا يوجد</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='flex justify-center my-10 items-center'>
//                             <div className='w-1/2 my-2'>
//                                 <p className=' text-white text-start text-xl'> المستثمرين:</p>
//                             </div>
//                             <div className='w-1/2 my-2'>
//                                 <div className=" flex  py-2 justify-start gap-2 items-center">
//                                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
//                                     </div>
//                                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
//                                     </div>
//                                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='md:w-3/5 w-full md:p-5'>
//                         <div className='md:w-[85%] iframe-container overflow-auto  rounded-2xl  w-full mx-auto'>
//                             <iframe
//                                 src="https://drive.google.com/file/d/17nZX08NpQ_MII4PJkT2qOFPFHvZjmD0t/preview?usp=drive_link"
//                                 width="100%"
//                                 height="100%"
//                                 allow="autoplay"
//                                 allowFullScreen
//                             ></iframe>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32  xl:w-[95%]">
//                     <p className='text-white text-start  font-semibold my-7 text-3xl'>وصف المشروع</p>
//                     <p className='text-white text-start leading-[1.8]  my-7 text-xl'>
//                         كل ما أجي أفرح حبة بتعدبيني كأن ما بيني وبيتك ت
//                         ار وحالفة لتوريني، كل ما أجي أفرح حبة بتعدبيني كأن م
//                         ا بيني وبيتك تار وحالفة لتوريني، كل ما أجي أفرح حبة
//                         بتعدبيني كأن ما بيني وبيتك تار وحالفة لتوريني، كل م
//                         ا أجي أفرح حبة بتعدبيني كأن ما بيني وبيتك تار وحالفة
//                         لتوريني، كل ما أجي أفرح حبة بتعدبيني كأن ما بيني وب
//                         يتك تار وحالفة لتوريني، كل ما أجي أفرح حبة بتعدبيني
//                         كأن ما بيني وبيتك تار وحالفة لتوريني، كل ما أجي أفر
//                         ح حبة بتعدبيني كأن ما بيني وبيتك تار وحالفة لتوريني،
//                         كل ما أجي أفرح حبة بتعدبيني كأن ما بيني وبيتك تار
//                         وحالفة لتوريني، كل ما أجي أفرح حبة بتعدبيني كأن ما
//                         بيني وبيتك تار كل ما أجي أفرح حبة بتعدبيني كأن ما
//                         بيني وبيتك تار وحالفة لتوريني، كل ما أجي أفرح حبة
//                         بتعدبيني كأن ما بيني وبيتك تار وحالفة لتوريني،
//                         كل ما أجي أفرح حبة بتعدبيني كأن ما بيني وبيتك
//                         تار وحالفة لتوريني، كل ما أجي أفرح حبة بتعدبيني
//                         كأن ما بيني وبيتك تار وحالفة لتوريني، كل ما أجي
//                         أفرح حبة بتعدبيني كأن ما بيني وبيتك تار وحالفة
//                         لتوريني، كل ما أجي أفرح حبة بتعدبيني كأن ما بيني
//                         وبيتك تار وحالفة لتوريني، كل ما أجي أفرح حبة
//                         بتعدبيني كأن ما بيني وبيتك تار وحالفة
//                         لتوريني، كل ما أجي أفرح حبة بتعدبيني
//                         كأن ما بيني وبيتك تار وحالفة لتوريني،
//                         كل ما أجي أفرح حبة بتعدبيني كأن ما بيني
//                         وبيتك تار وحالفة لتوريني، وحالفة لتوريني، </p>
//                 </div>
//                 <div style={{ direction: "rtl" }} className="container p-5 mx-auto my-32  xl:w-[95%]">
//                     <div className='flex justify-center items-center'>
//                         <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//                         </div>
//                         <div className='xs:w-1/2 md:w-1/4'>
//                             <p className='text-white text-center  font-semibold my-7 text-3xl'>التفاصيل المالية</p>
//                         </div>
//                         <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//                         </div>
//                     </div>




//                     <div className='flex justify-start flex-wrap items-center'>
//                         <div className='md:w-1/2 w-full md:border-l md:border-l-gray-500'>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'> نسبة الربحية الإجمالية : </p>
//                                 </div>
//                                 <div className='w-1/2 my-2 '>
//                                     <p className=' text-[#00F560] text-start text-xl'> 30% </p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'>    نقطة التعادل : </p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'> مارس 2023</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center items-center'>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-white text-start text-xl'>   عدد العملاء والمستخدمين : </p>
//                                 </div>
//                                 <div className='w-1/2 my-2'>
//                                     <p className=' text-[#00F560] text-start text-xl'>2345 </p>
//                                 </div>
//                             </div>

//                             <div className=' my-2'>
//                                 <p className='my-2 text-white text-start text-xl'>التوقعات :</p>
//                                 <div className=''>
//                                     <div className='w-full my-4 ps-10'>
//                                         <p className=' text-white text-start  text-sm'>2025:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                     </div>
//                                     <div className='w-full my-4 ps-10'>
//                                         <p className=' text-white text-start  text-sm'>2026:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                     </div>
//                                     <div className='w-full my-4 ps-10'>
//                                         <p className=' text-white text-start  text-sm'>2027:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                     </div>
//                                     <div className='w-full my-4 ps-10'>
//                                         <p className=' text-white text-start  text-sm'>2028:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                         <div className='md:w-1/2  w-full'>
//                             <div className=''>
//                                 <div className='flex justify-center my-6 items-center md:w-[80%] border-2 p-6 border-gray-300 rounded-3xl mx-auto'>
//                                     <div className=' my-2'>
//                                         <p className=' text-white text-start font-semibold md:font-bold mx-2  text-xl md:text-3xl'> اللإيرادات السنوية:</p>
//                                     </div>
//                                     <div className=' my-2'>
//                                         <p className=' text-[#00F560] text-start font-semibold md:font-bold mx-2 text-xl md:text-3xl'> 11 مليون جنيه </p>
//                                     </div>
//                                 </div>
//                                 <div className='flex justify-center items-center my-6 md:w-[80%] border-2 p-6 border-gray-300 rounded-3xl mx-auto'>
//                                     <div className=' my-2'>
//                                         <p className=' text-white text-start font-semibold md:font-bold mx-2 text-xl md:text-3xl'>  صافي الأرباح السنوية:</p>
//                                     </div>
//                                     <div className=' my-2'>
//                                         <p className=' text-[#00F560] text-start font-semibold md:font-bold mx-2 text-xl md:text-3xl'> 3 مليون جنيه </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full flex my-5 justify-center items-center ">
//                         <a target="_blank" href='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' className="text-black bg-[#00F560] hover:bg-[#38ba6c] font-semibold rounded-full text-sm px-10 py-2">الاطلاع على بيان الدخل/ الميزانية العمومية للمشروع</a>
//                     </div>
//                 </div>
//                 <div style={{ direction: "rtl" }} className=" mx-auto my-32 p-5 container xl:w-[95%]">
//                     <div className='flex justify-center items-center'>
//                         <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//                         </div>
//                         <div className='xs:w-1/2 md:w-1/4'>
//                             <p className='text-white text-center  font-semibold my-7 text-3xl'>احتياجات الشركة</p>
//                         </div>
//                         <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//                         </div>
//                     </div>
//                     <div className='flex justify-start flex-wrap items-start '>
//                         <div className='md:w-1/2 w-full my-10 md:border-l md:border-l-gray-500'>
//                             <p className='text-white text-center  font-semibold my-7 text-xl'> التمويل المطلوب</p>
//                             <div className="flex justify-center my-16 h-20 overflow-hidden w-[80%]  mx-auto border-2 rounded-full border-[#00F560]  items-center">
//                                 <div className='w-3/5 '><p className='text-white text-center  font-semibold my-5  text-3xl'>500 ألف جنيه / 20%</p></div>
//                                 {/* <div className='w-2/5 bg-[#00F560] cursor-pointer hover:bg-[#38ba6c] h-full flex items-center justify-center '><p className='text-black text-center  font-semibold  text-3xl'>تقديم عرض</p></div> */}
//                             </div>
//                             <div className=' w-[80%] mx-auto'>
//                                 <p className='text-white text-start  font-semibold my-7 text-2xl'>الغرض من التمويل</p>
//                                 <p className='text-white text-start leading-[1.8]  my-7 text-xl'> خونت ناس بالحب صانتني وصنت ناس عايزة تموتني، خونت ناس بالحب صانتني وصنت ناس عايزة تموتني، خونت ناس بالحب صانتني وصنت ناس عايزة تموتني، خونت ناس بالحب صانتني وصنت ناس عايزة تموتني، خونت ناس بالحب صانتني وصنت ناس عايزة تموتني،</p>
//                             </div>
//                         </div>
//                         <div className='md:w-1/2 w-full my-10'>
//                             <div className=' w-full my-10'>
//                                 <p className='text-white text-center  font-semibold my-7 text-xl'> الخدمات المطلوبة </p>
//                                 <div className=" flex  py-2 justify-center gap-10  items-center">
//                                     <Popover
//                                         theme={{
//                                             "base": "absolute z-20 inline-block w-max max-w-[100vw]  outline-none   rounded-lg shadow-sm  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
//                                             "content": "z-10 overflow-hidden rounded-[7px]",
//                                             "arrow": {
//                                                 "base": "absolute h-2 w-2 z-0 rotate-45   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
//                                                 "placement": "-4px"
//                                             }
//                                         }}
//                                         aria-labelledby="profile-popover"
//                                         content={
//                                             <div className="w-64 p-3">
//                                                 <p className='text-white text-start text-lg'> نوع الخدمه </p>
//                                                 <div className=''>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2025:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2026:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2027:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2028:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     {/* <div className="flex justify-center items-center">
//                                                         <button
//                                                             type="button"
//                                                             className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
//                                                         >
//                                                             تقديم عرض
//                                                         </button>
//                                                     </div> */}
//                                                 </div>
//                                             </div>
//                                         }
//                                     >
//                                         <button>
//                                             <div className='w-[80px] bg-white h-[80px] rounded-full'>
//                                             </div>
//                                         </button>
//                                     </Popover>
//                                     <Popover
//                                         theme={{
//                                             "base": "absolute z-20 inline-block w-max max-w-[100vw]  outline-none   rounded-lg shadow-sm  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
//                                             "content": "z-10 overflow-hidden rounded-[7px]",
//                                             "arrow": {
//                                                 "base": "absolute h-2 w-2 z-0 rotate-45   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
//                                                 "placement": "-4px"
//                                             }
//                                         }}
//                                         aria-labelledby="profile-popover"
//                                         content={
//                                             <div className="w-64 p-3">
//                                                 <p className='text-white text-start text-lg'> نوع الخدمه </p>
//                                                 <div className=''>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2025:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2026:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2027:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2028:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     {/* <div className="flex justify-center items-center">
//                                                         <button
//                                                             type="button"
//                                                             className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
//                                                         >
//                                                             تقديم عرض
//                                                         </button>
//                                                     </div> */}
//                                                 </div>
//                                             </div>
//                                         }
//                                     >
//                                         <button>
//                                             <div className='w-[80px] bg-white h-[80px] rounded-full'>
//                                             </div>
//                                         </button>
//                                     </Popover>
//                                     <Popover
//                                         theme={{
//                                             "base": "absolute z-20 inline-block w-max max-w-[100vw]  outline-none   rounded-lg shadow-sm  bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
//                                             "content": "z-10 overflow-hidden rounded-[7px]",
//                                             "arrow": {
//                                                 "base": "absolute h-2 w-2 z-0 rotate-45   bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
//                                                 "placement": "-4px"
//                                             }
//                                         }}
//                                         aria-labelledby="profile-popover"
//                                         content={
//                                             <div className="w-64 p-3">
//                                                 <p className='text-white text-start text-lg'> نوع الخدمه </p>
//                                                 <div className=''>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2025:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2026:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2027:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     <div className='w-full my-4 '>
//                                                         <p className=' text-white text-start  text-sm'>2028:<span className=' text-[#00F560] px-3 text-sm'>مبياعت 20 مليون جنيه، صافي أرباح: 9 مليون جنيه </span></p>
//                                                     </div>
//                                                     {/* <div className="flex justify-center items-center">
//                                                         <button
//                                                             type="button"
//                                                             className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
//                                                         >
//                                                             تقديم عرض
//                                                         </button>
//                                                     </div> */}
//                                                 </div>
//                                             </div>
//                                         }
//                                     >
//                                         <button>
//                                             <div className='w-[80px] bg-white h-[80px] rounded-full'>
//                                             </div>
//                                         </button>
//                                     </Popover>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <Comments />
//             </div>
//         </div>
//     )
// }



















































'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Button, Popover } from "flowbite-react";
import Comments from './Comments';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import Loading from './../loading';
import VideoEmbed from './VideoEmbed';
import { Vazirmatn } from 'next/font/google';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function Page() {
    const [company, setCompany] = useState(null);
    const [investors, setInvestors] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [avgReviews, setAvgReviews] = useState(null);
    const [error, setError] = useState(null);
    const [idOfTheUser, setIdOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const userIdFromStore = useSelector((state) => state.userId.id);
    // useEffect(() => {
    //     const fetchUserDataAndCompany = async () => {
    //         try {
    //             const result = await dispatch(fetchUserId()).unwrap();
    //             const userId = result;
    //             if (!userId) throw new Error("User ID is null");
    //             setIdOfTheUser(userId)
    //             const [resCompany, resInvestors, resTotalReviewsArray, resAvgRating] = await Promise.all([
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/companies/${userId}`),
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/investors/invested?companyId=${userId}`),
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews?companyId=${userId}`),
    //                 fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews/avg-rating?companyId=${userId}`),
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
      const result = await dispatch(fetchUserId()).unwrap();
      const userId = result;
      if (!userId) throw new Error("User ID is null");
      setIdOfTheUser(userId);

      const responses = await Promise.allSettled([
        fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/companies/${userId}`),
        fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/investors/invested?companyId=${userId}`),
        fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews?companyId=${userId}`),
        fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews/avg-rating?companyId=${userId}`),
      ]);

      const [resCompany, resInvestors, resTotalReviewsArray, resAvgRating] = responses;

      if (resCompany.status === 'fulfilled' && resCompany.value.ok) {
        const dataCompany = await resCompany.value.json();
        setCompany(dataCompany);
        console.log(dataCompany);
      } else {
        console.warn("فشل في تحميل بيانات الشركة");
      }

      if (resInvestors.status === 'fulfilled' && resInvestors.value.ok) {
        const dataInvestors = await resInvestors.value.json();
        setInvestors(dataInvestors);
        console.log(dataInvestors);
      } else {
        console.warn("فشل في تحميل بيانات المستثمرين");
      }

      if (resTotalReviewsArray.status === 'fulfilled' && resTotalReviewsArray.value.ok) {
        const dataTotalReviews = await resTotalReviewsArray.value.json();
        setReviews(dataTotalReviews);
        console.log(dataTotalReviews);
      } else {
        console.warn("فشل في تحميل التعليقات");
      }

      if (resAvgRating.status === 'fulfilled' && resAvgRating.value.ok) {
        const dataAvgRating = await resAvgRating.value.json();
        setAvgReviews(dataAvgRating);
        console.log(dataAvgRating);
      } else {
        console.warn("فشل في تحميل التقييم المتوسط");
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

    if (loading) {
        return (
            <Loading />
        );
    }
    const getRandomImage = () => {
        return `https://picsum.photos/80?random=${Math.floor(Math.random() * 1000)}`;
    };
    return (
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

            <div className='md:mt-32 mt-16'>
                {/* <div style={{ direction: "rtl" }} className="bg-[#00F5601A] bg-opacity-10">
                    <div className="container m-auto flex flex-wrap justify-center items-center xl:w-[95%] ">
                        <div className='md:w-1/2 py-5 flex  justify-around items-center  md:my-0 border-b md:border-0 border-gray-700 w-full  '>
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
                        <div className='md:w-1/2  w-full flex  justify-center items-center'>
                            <div className='md:w-1/3 my-5  md:ms-auto text-center'>
                                <div style={{ direction: "ltr" }}>
                                    <Rating
                                        name="text-feedback"
                                        value={avgReviews.avgRating}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                </div>
                                <div className='flex justify-center text-center items-center'>
                                    <div><p className='text-gray-600 mx-3' >({reviews.reviews
                                        .length} Review)</p></div>
                                    <div><p className='text-white mx-3 text-xl' >{avgReviews.avgRating}</p></div>
                                </div>
                            </div>
                            <div className='w-1/3  hidden md:inline  mx-5'>
                                <div className='w-[80px] mx-auto  text-center'>
                                    <img src={company?.data?.company?.companyPhoto} onClick={() => { setSelectedImage(company?.data?.company?.companyPhoto); }} className='w-full cursor-pointer' alt="" />
                                    <p style={{ whiteSpace: 'nowrap' }} className='text-[#8080808C] text-center'>@{company?.data?.company?.socialName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


                <div style={{ direction: "rtl" }} className="bg-[#00F5601A] bg-opacity-10">
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
                                    <Rating
                                        name="text-feedback"
                                        value={avgReviews?.avgRating||1.5}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                </div>
                                <div className='flex justify-center text-center items-center'>
                                    <div><p className='text-gray-600 mx-3' >({reviews.reviews
                                        .length} Review)</p></div>
                                    <div><p className='text-white mx-3 text-xl' >{avgReviews.avgRating}</p></div>
                                </div>
                            </div>
                            <div className="  w-1/4 mx-auto md:me-auto">
                                <button
                                    type="button"
                                    className="text-black mx-auto  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                                >
                                    تعديل الملف
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
                            {/* <div className=" flex flex-wrap py-2 justify-start gap-2 items-center">
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
                                                            <div className="flex justify-center items-center">
                                                                <button
                                                                    type="button"
                                                                    className="text-black   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full  text-sm px-6 py-2"
                                                                >
                                                                    تقديم عرض
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            >
                                                <button>
                                                    <div className='w-[40px] bg-white h-[40px] rounded-full'>
                                                        <img
                                                            src={getRandomImage()}
                                                            alt={key}
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    </div>
                                                </button>
                                            </Popover>
                                        </div>
                                    ))}
                            </div> */}
                            <div className="flex flex-wrap py-2 justify-start gap-2 items-center">
                                {company?.data?.company?.requiredServices &&
                                    Object.keys(company.data.company.requiredServices).length > 0 ? (
                                    Object.entries(company.data.company.requiredServices).map(([key, value], index) => (
                                        <div key={index} className="my-2">
                                            <Popover
                                                theme={{
                                                    base: "absolute z-20 inline-block w-max max-w-[100vw] outline-none rounded-lg shadow-sm bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20",
                                                    content: "z-10 overflow-hidden rounded-[7px]",
                                                    arrow: {
                                                        base: "absolute h-2 w-2 z-0 rotate-45 bg-gray-700 rounded-[40px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 mix-blend-color",
                                                        placement: "-4px"
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
                                                            <div className="flex justify-center items-center">
                                                                <button
                                                                    type="button"
                                                                    className="text-black bg-[#00F560] hover:bg-[#38ba6c] font-medium rounded-full text-sm px-6 py-2"
                                                                >
                                                                    تقديم عرض
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            >
                                                <button>
                                                    <div className='w-[40px] bg-white h-[40px] rounded-full'>
                                                        <img
                                                            src={getRandomImage()}
                                                            alt={key}
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    </div>
                                                </button>
                                            </Popover>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white text-sm">لا يوجد مستثمرين بعد</p>
                                )}
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
                            </div>
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
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <button>
                                                        <div className='w-[80px] bg-white h-[80px] rounded-full'>
                                                            <img
                                                                src={getRandomImage()}
                                                                alt={key}
                                                                className="w-full h-full object-cover rounded-full"
                                                            />
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
                <Comments id={idOfTheUser} />
            </div>
        </div>
    )
}
