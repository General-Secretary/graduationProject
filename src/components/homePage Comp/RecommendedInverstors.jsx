import React from 'react'
import { Vazirmatn } from 'next/font/google';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import GlowBackground from "../GlowBackground";

import Link from 'next/link';
const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
export default function RecommendedInverstors({ recommendedInvestors }) {
    return (
        <div style={{ direction: "rtl" }} id='suggestions' className='overflow-y-hidden font-vazir'>
            <div className="mt-14 relative sutableCoBG ">
                <div className="layer   min-h-[160vh] bg-black  bg-opacity-[.3] top-0 bottom-0 left-0 right-0">
                    <div className='lg:w-[95%] my-14 mx-auto'>
                        <h2 className=' mx-auto font-vazir text-white  font-extrabold text-3xl'>شركاء نجاح محتملين </h2>
                        <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">
                            {/* <div className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
                                <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                    <Link href={"/investors/sdfdsfsdfds"}>  <div className='w-full    px-5 py-4'>
                                        <div className='flex justify-center items-center '>
                                            <div className='w-1/3 sm:w-1/4  xs:p-1'>
                                                <img src={"/assits/awadeen.jpg"} className=' rounded-3xl' alt="" />
                                            </div>
                                            <div className=' p-1 w-2/3 sm:w-3/4  xs:px-2'>
                                                <p className='text-xl xs:text-3xl whitespace-nowrap overflow-hidden my-2 text-ellipsis'>بيچامه ✌</p>
                                                <div style={{ direction: "rtl" }} className='flex justify-start tracking-widest items-center '>
                                                    <p className='text-xs mx-2 '>شريك مؤسس </p>
                                                    <p className='text-xs whitespace-nowrap overflow-hidden  text-ellipsis'> . Companyname</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <div className='w-full px-5 py-1'>
                                            <div className='flex  justify-end items-center '>
                                                <div className='flex w-5/6 text-center text-gray-500 text-[13px] justify-center items-center '>
                                                    <div className='w-1/3 border-l border-gray-500  p-1'>
                                                        <p> التفاعلات</p>
                                                        <p className='font-semibold'>63</p>
                                                    </div>
                                                    <div className='w-1/3 p-1'>
                                                        <p>الصفقات</p>
                                                        <p className='font-semibold'>4</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full    px-5 pb-6 pt-2'>
                                            <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                <div className="w-1/3 border-l border-gray-500 py-2 text-center">
                                                    <p className='xs:font-medium  xs:text-lg text-white'>استثمارات</p>
                                                </div>
                                                <div className="w-2/3  flex text-center py-2 justify-around items-center">
                                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                    </div>
                                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                    </div>
                                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  </Link>
                                </div>

                            </div> */}
                            {recommendedInvestors.length > 0 ? (
                                recommendedInvestors.slice(0, 6).map((obj, index) =>
                                    <div key={index} className=' w-full text-white  md:w-1/2 py-4 lg:w-1/3'>
                                        <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                            <Link href={`/investors/${obj?._id}`}>  <div className='w-full    px-5 py-4'>
                                                <div className='flex justify-center items-center '>
                                                    <div className='w-1/3 sm:w-1/4  xs:p-1'>
                                                        <img src={obj?.profilePhoto} className=' rounded-3xl' alt="" />
                                                    </div>
                                                    <div className=' p-1 w-2/3 sm:w-3/4  xs:px-2'>
                                                        <p className='text-xl xs:text-3xl whitespace-nowrap overflow-hidden my-2 text-ellipsis'> {obj?.fullArabicName}</p>
                                                        <div style={{ direction: "rtl" }} className='flex justify-start tracking-widest items-center '>
                                                            <p className='text-xs mx-2 '> {obj?.jobTitle}   </p>
                                                            <p className='text-xs whitespace-nowrap overflow-hidden  text-ellipsis'>  {obj?.organization} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                <div className='w-full px-5 py-1'>
                                                    <div className='flex  justify-end items-center '>
                                                        <div className='flex w-5/6 text-center text-gray-500 text-[13px] justify-center items-center '>
                                                            <div className='w-1/3 border-l border-gray-500  p-1'>
                                                                <p> التفاعلات</p>
                                                                <p className='font-semibold'>63</p>
                                                            </div>
                                                            <div className='w-1/3 p-1'>
                                                                <p>الصفقات</p>
                                                                <p className='font-semibold'>4</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-full    px-5 pb-6 pt-2'>
                                                    <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                        <div className="w-1/3 border-l border-gray-500 py-2 text-center">
                                                            <p className='xs:font-medium  xs:text-lg text-white'>استثمارات</p>
                                                        </div>
                                                        <div className="w-2/3  flex text-center py-2 justify-around items-center">
                                                            <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            </div>
                                                            <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            </div>
                                                            <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>  </Link>
                                        </div>

                                    </div>
                                )
                            ) : (
                                <p>لا يوجد مستثمرين مقترحين لك</p>
                            )}
                        </div>
                    </div>
                    <p className="text-center text-[#00F560] cursor-pointer">عرض المزيد <i className="fa-solid fa-arrow-left"></i> </p>
                </div>
            </div>
        </div>
    )
}
