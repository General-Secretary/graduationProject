"use client"

import React from 'react'
import { useState } from "react";
import Image from 'next/image'
import SupportPostCard from './SupportPostCard';
import CharityPostCard from './CharityPostCard';

export default function PostCard({ post, role ,token}) {
    const [selectedImage, setSelectedImage] = useState(null);
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
            {post?.organizationType == "SupportOrganization" && 
            // <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
            //     <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
            //         <div className="relative z-10 w-full h-[250px] ">
            //             <Image
            //                 className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage(post?.attachedImage?.secure_url); }}
            //                 unoptimized
            //                 src={post?.attachedImage?.secure_url}
            //                 width={700}
            //                 height={400}
            //                 alt=""
            //             />
            //         </div>
            //     </div>
            //     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
            //         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>برنامج {post?.title}</p>
            //         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {post?.content}</p>
            //     </div>
            //     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
            //         <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
            //             <div className='w-1/6  xs:p-1'>
            //                 <img src={post?.organizationId?.image?.secure_url} className='w-full p-1 rounded-lg' alt="" />
            //             </div>
            //             <div className='w-5/12'><p className='font-semibold'>{post?.organizationId?.name}</p></div>
            //             <div className='w-5/12'><p className='text-[13px] '>حاضنة أعمال</p></div>
            //         </div>
            //         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
            //             {role == "company" ? <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
            //                 قدم الآن
            //             </div> : ""}
            //         </div>
            //     </div>
            // </div>
            
            <SupportPostCard post={post} role={role} token={token}/>
            
            }
            {post?.organizationType == "CharityOrganization" && 
            // <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
            //     <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
            //         <div className="relative z-10 w-full h-[250px] ">
            //             <Image
            //                 className="w-full h-full  rounded-[50px] object-cover cursor-pointer" onClick={() => { setSelectedImage(post?.attachedImage?.secure_url); }}
            //                 unoptimized
            //                 src={post?.attachedImage?.secure_url}
            //                 width={700}
            //                 height={400}
            //                 alt=""
            //             />
            //         </div>
            //     </div>
            //     <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
            //         <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'> {post?.title} </p>
            //         <p className='text-xs xs:w-[95%] mx-auto leading-loose '>  {post?.content}  </p>
            //     </div>
            //     <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
            //         < div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
            //             <div className='w-1/6  xs:p-1'>
            //                 <img src={post?.organizationId?.image?.secure_url} className='w-full p-1 rounded-lg' alt="" />
            //             </div>
            //             <div className='w-5/12'><p className='font-semibold'>   {post?.organizationId?.name}   </p></div>
            //             <div className='w-5/12'><p className='text-[13px] '>منظمة خيرية عامة </p></div>
            //         </div>
            //         <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
            //             <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
            //                 قدم الدعم
            //             </div>
            //         </div>
            //     </div>
            // </div>
            
            
            <CharityPostCard post={post} role={role} token={token}/>
            
            
            
            }
        </div>
    )
}