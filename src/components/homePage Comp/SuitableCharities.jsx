// import React from 'react'
// import { Vazirmatn } from 'next/font/google';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
// import Image from 'next/image'

// const vazir = Vazirmatn({
//     subsets: ['arabic'],
//     weight: ['400', '700']
// });
// export default function SuitableCharities() {
//     return (
//         <div style={{ direction: "rtl" }} className='overflow-auto font-vazir'>
//             <div className="my-14 relative sutableCharitiesBG ">
//                 <div className="layer   min-h-[110vh] bg-black  bg-opacity-[.3] top-0 bottom-0 left-0 right-0">
//                     <div className='w-[95%] my-14 mx-auto'>
//                         <h2 className=' mx-auto font-vazir text-white  font-extrabold text-3xl'>ساهم </h2>
//                         <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">
//                             <div className=' w-full  md:w-1/2 py-4 '>
//                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto rounded-[50px]'>
//                                     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                         <Image className="relative z-10 w-full h-auto" unoptimized src={"/charity exable.png"} width={700} height={400} alt="" />
//                                     </div>
//                                     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                                         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو</p>
//                                     </div>
//                                     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                             <div className='w-1/6 xs:p-1'>
//                                                 <img src={"/misrElkheir.png"} className='w-full' alt="" />
//                                             </div>
//                                             <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                                             <div className='w-5/12'><p className='text-[13px] '> منظمة خيرية عامة  </p></div>
//                                         </div>
//                                         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                             <div className='bg-[#00F560] cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                                 قدم الدعم
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=' w-full  md:w-1/2 py-4 '>
//                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto rounded-[50px]'>
//                                     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                         <Image className="relative z-10 w-full h-auto" unoptimized src={"/charity exable.png"} width={700} height={400} alt="" />
//                                     </div>
//                                     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                                         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو</p>
//                                     </div>
//                                     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                             <div className='w-1/6 xs:p-1'>
//                                                 <img src={"/misrElkheir.png"} className='w-full' alt="" />
//                                             </div>
//                                             <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                                             <div className='w-5/12'><p className='text-[13px] '> منظمة خيرية عامة  </p></div>
//                                         </div>
//                                         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                             <div className='bg-[#00F560] cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                                 قدم الدعم
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=' w-full  md:w-1/2 py-4 '>
//                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto rounded-[50px]'>
//                                     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                         <Image className="relative z-10 w-full h-auto" unoptimized src={"/charity exable.png"} width={700} height={400} alt="" />
//                                     </div>
//                                     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                                         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو</p>
//                                     </div>
//                                     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                             <div className='w-1/6 xs:p-1'>
//                                                 <img src={"/misrElkheir.png"} className='w-full' alt="" />
//                                             </div>
//                                             <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                                             <div className='w-5/12'><p className='text-[13px] '> منظمة خيرية عامة  </p></div>
//                                         </div>
//                                         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                             <div className='bg-[#00F560] cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                                 قدم الدعم
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className=' w-full  md:w-1/2 py-4 '>
//                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto rounded-[50px]'>
//                                     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                         <Image className="relative z-10 w-full h-auto" unoptimized src={"/charity exable.png"} width={700} height={400} alt="" />
//                                     </div>
//                                     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                                         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو</p>
//                                     </div>
//                                     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                             <div className='w-1/6 xs:p-1'>
//                                                 <img src={"/misrElkheir.png"} className='w-full' alt="" />
//                                             </div>
//                                             <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                                             <div className='w-5/12'><p className='text-[13px] '> منظمة خيرية عامة  </p></div>
//                                         </div>
//                                         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                             <div className='bg-[#00F560] cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                                 قدم الدعم
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=' w-full  md:w-1/2 py-4 '>
//                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto rounded-[50px]'>
//                                     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                         <Image className="relative z-10 w-full h-auto" unoptimized src={"/charity exable.png"} width={700} height={400} alt="" />
//                                     </div>
//                                     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                                         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو</p>
//                                     </div>
//                                     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                             <div className='w-1/6 xs:p-1'>
//                                                 <img src={"/misrElkheir.png"} className='w-full' alt="" />
//                                             </div>
//                                             <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                                             <div className='w-5/12'><p className='text-[13px] '> منظمة خيرية عامة  </p></div>
//                                         </div>
//                                         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                             <div className='bg-[#00F560] cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                                 قدم الدعم
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=' w-full  md:w-1/2 py-4 '>
//                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto rounded-[50px]'>
//                                     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                         <Image className="relative z-10 w-full h-auto" unoptimized src={"/charity exable.png"} width={700} height={400} alt="" />
//                                     </div>
//                                     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
//                                         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو</p>
//                                     </div>
//                                     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                             <div className='w-1/6 xs:p-1'>
//                                                 <img src={"/misrElkheir.png"} className='w-full' alt="" />
//                                             </div>
//                                             <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
//                                             <div className='w-5/12'><p className='text-[13px] '> منظمة خيرية عامة  </p></div>
//                                         </div>
//                                         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                             <div className='bg-[#00F560] cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                                 قدم الدعم
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <p className="text-center text-[#00F560] cursor-pointer">عرض المزيد <i className="fa-solid fa-arrow-left"></i> </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// =================================================================================================================

"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from "react";
import 'react-medium-image-zoom/dist/styles.css'
import Link from 'next/link';
import PostCard from './CharityPostCard';
export default function SupportPosts({ recommendedCharatyPosts, role,token }) {
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div style={{ direction: "rtl" }} className="container  mx-auto   xl:w-[95%]">
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
            <h2 className=' mx-auto font-vazir mt-32 mb-10 text-white  font-extrabold text-3xl'> ساهم</h2>
            <div className=' mx-auto text-white'>
                <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">
                    {/* <div className=' w-full  md:w-1/2 py-4 '>
                        <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
                            <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
                                <div className="relative z-10 w-full h-[250px] ">
                                    <Image
                                        className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => {  setSelectedImage("/charityexable.png"); }}
                                        unoptimized
                                        src="/charityexable.png"
                                        width={700}
                                        height={400}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
                                <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>حملة إطعام 100 نبهاني فقير</p>
                                <p className='text-xs xs:w-[95%] mx-auto leading-loose '>أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو نبهان أبو نبهان تحتاج للمساعدة أنقدوا أبو </p>
                            </div>
                            <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
                                <Link href={"/charaties/iulhyukgkyu"} className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
                                    <div className='w-1/6  xs:p-1'>
                                        <img src="/misrElkheir.png" className='w-full p-1 rounded-lg' alt="" />
                                    </div>
                                    <div className='w-5/12'><p className='font-semibold'>مؤسسة مصر الخير </p></div>
                                    <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
                                </Link>
                                <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
                                    <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
                                        قدم الدعم
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {recommendedCharatyPosts?.length > 0 ? (
                        recommendedCharatyPosts.map((obj, index) =>
                            <div key={index} className="w-full text-white md:w-1/2 py-4">
                                {/* <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
                                    <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
                                        <div className="relative z-10 w-full h-[250px] ">
                                            <Image
                                                className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage(obj?.attachedImage?.secure_url); }}
                                                unoptimized
                                                src={obj?.attachedImage?.secure_url}
                                                width={700}
                                                height={400}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
                                        <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'> {obj?.title} </p>
                                        <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {obj?.content}  </p>
                                    </div>
                                    <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
                                        < div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
                                            <div className='w-1/6  xs:p-1'>
                                                <img src={obj?.organizationId?.image?.secure_url} className='w-full p-1 rounded-lg' alt="" />
                                            </div>
                                            <div className='w-5/12'><p className='font-semibold'>   {obj?.organizationId?.name}   </p></div>
                                            <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
                                        </div>
                                        <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
                                            <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
                                                قدم الدعم
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <PostCard post={obj} role={role} token={token}/>
                            </div>
                        )
                    ) : (
                        <p>لا يوجد منشورات جمعيات خرييه مناسبه لك</p>
                    )}
                </div>
            </div>
        </div>
    )
}
