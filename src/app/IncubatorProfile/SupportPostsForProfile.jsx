// import React from 'react'
// import Image from 'next/image'
// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'
// export default function SupportPosts() {
//     return (
//         <div style={{ direction: "rtl" }} className="container  mx-auto   xl:w-[95%]">
//             <h2 className=' mx-auto font-vazir mt-32 mb-10 text-white  font-extrabold text-3xl'>فرص داعمة</h2>


//             <div className=' mx-auto text-white'>
//                 <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">

//                     <div className=' w-full  md:w-1/2 py-4 '>
//                         <div className=' bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
//                             <div className=' bg-gray-200  bg-clip-padding backdrop-filter overflow-hidden backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                 <div className="relative z-10 w-full h-[250px] ">
//                                         <Image
//                                             className="w-full h-full  rounded-[50px] object-cover"
//                                             unoptimized
//                                             src="/assits/234.png"
//                                             width={700}
//                                             height={400}
//                                             alt=""
//                                         />
//                                 </div>
//                             </div>
//                             <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                 <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>برنامج Flat6Labs Seed Program – Cairo</p>
//                                 <p className='text-xs xs:w-[95%] mx-auto leading-loose '>برنامج التمويل التأسيسي هو البرنامج الأساسي الذي تقدمه Flat6Labs Cairo لدعم الشركات الناشئة التقنية في مراحلها الأولى. يُعقد هذا البرنامج على مدار 4 أشهر، يتم خلالها تزويد رواد الأعمال بكل ما يحتاجونه لتحويل فكرتهم إلى مشروع قابل للنمو والنجاح في السوق. مميزات البرنامج: تمويل تأسيسي: يصل إلى 500,000 جنيه مصري مقابل نسبة </p>
//                             </div>
//                             <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                 <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                     <div className='w-1/6  xs:p-1'>
//                                         <img src="/assits/123.png" className='w-full p-1 rounded-lg' alt="" />
//                                     </div>
//                                     <div className='w-5/12'><p className='font-semibold'>Flat6Labs Cairo</p></div>
//                                     <div className='w-5/12'><p className='text-[13px] '>حاضنة أعمال</p></div>
//                                 </div>
//                                 <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                     <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                         قدم الآن
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className=' w-full  md:w-1/2 py-4 '>
//                         <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[97%]  mx-auto rounded-[50px]'>
//                             <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5   mx-auto  rounded-[50px]'>
//                                 <div className="relative z-10 w-full h-[250px] overflow-hidden">
//                                     <Image
//                                         className="w-full h-full object-cover"
//                                         unoptimized
//                                         src="/assits/234.png"
//                                         width={700}
//                                         height={400}
//                                         alt=""
//                                     />
//                                 </div>                                        </div>
//                             <div className='w-[95%] xs:w-[85%] mx-auto my-7'>
//                                 <p className='text-2xl  xs:w-[95%]  mx-auto font-semibold'>برنامج Flat6Labs Seed Program – Cairo</p>
//                                 <p className='text-xs xs:w-[95%] mx-auto leading-loose '>برنامج التمويل التأسيسي هو البرنامج الأساسي الذي تقدمه Flat6Labs Cairo لدعم الشركات الناشئة التقنية في مراحلها الأولى. يُعقد هذا البرنامج على مدار 4 أشهر، يتم خلالها تزويد رواد الأعمال بكل ما يحتاجونه لتحويل فكرتهم إلى مشروع قابل للنمو والنجاح في السوق. مميزات البرنامج: تمويل تأسيسي: يصل إلى 500,000 جنيه مصري مقابل نسبة </p>
//                             </div>
//                             <div className='flex flex-wrap justify-center xs:px-9 text-center items-center '>
//                                 <div className='xs:w-2/3 my-5 w-[90%] xs:px-4 flex justify-center bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full items-center '>
//                                     <div className='w-1/6  xs:p-1'>
//                                         <img src="/assits/123.png" className='w-full p-1 rounded-lg' alt="" />
//                                     </div>
//                                     <div className='w-5/12'><p className='font-semibold'>Flat6Labs Cairo</p></div>
//                                     <div className='w-5/12'><p className='text-[13px] '>حاضنة أعمال</p></div>
//                                 </div>
//                                 <div className='w-full  xs:p-1 my-5 xs:w-1/3 px-4'>
//                                     <div className='bg-[#00F560] text-black cursor-pointer w-[80%] mx-auto py-3 rounded-full'>
//                                         قدم الآن
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }







"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from "react";
import 'react-medium-image-zoom/dist/styles.css'
import PostCard from './PostCard';
export default function SupportPostsForProfile({ posts ,token ,triggerRefresh}) {
    // const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div style={{ direction: "rtl" }} className="container  mx-auto   xl:w-[95%]">
            {/* {selectedImage && (
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
            )} */}
            <div className=' mx-auto text-white'>
                <div className=" flex justify-center container mx-auto items-center w-full flex-wrap ">
                    {posts.map((post) => {
                        return <div className=' w-full  md:w-1/2 py-4 '>
                            <PostCard post={post} token={token} triggerRefresh={triggerRefresh}/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
