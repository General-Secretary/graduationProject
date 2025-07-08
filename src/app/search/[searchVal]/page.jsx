// "use client"
// import React, { useState, useEffect } from "react";
// import { use } from 'react';
// import { Vazirmatn } from 'next/font/google';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
// import { Spinner } from "flowbite-react";
// import { FilterDrawer } from "@/components/homePage Comp/FilterDrawer";
// const vazir = Vazirmatn({
//     subsets: ['arabic'],
//     weight: ['400', '700']
// });
// export default function page({ params }) {
//     let { searchVal } = use(params);
//     searchVal = decodeURIComponent(searchVal);
//     const [searchValue, setSearchValue] = useState(searchVal || "");
//     const [loading, setLoading] = useState(false)
//     const [filter, setfilter] = useState({})
//     console.log(filter)
//     const [results, setResults] = useState([])
//     useEffect(() => {
//         if (searchValue.trim() === "") {
//             setResults([]);
//             return;
//         }
//         const fetchResults = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(
//                     `https://estethmarat-estethmarats-projects.vercel.app/api/v1/search?name=${searchValue}`,
//                     {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(filter),
//                     }
//                 );
//                 const data = await response.json();
//                 setLoading(false);
//                 setResults(data);
//             } catch (error) {
//                 setLoading(false);
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchResults();
//     }, [searchValue, filter]);
//     useEffect(() => {
//         console.log(results);
//     }, [results, filter]);
//     return (
//         <div className={`searchBackGround relative min-h-[130vh] ${vazir.className}`}>
//             <div className="layer   items-center bg-black absolute bg-opacity-[.5] top-0 bottom-0 left-0 right-0">
//                 <div className=' min-h-[100vh]'>
//                     <div className="w-full mt-32 ">
//                         <h2 className='text-center  font-vazir text-white my-3  font-extrabold text-5xl'>  ابحث عن فرص استثمارية</h2>
//                         <h2 className='text-center  font-vazir text-white my-3  font-extralight text-5xl'>تناسب <span className="text-[#00F560]">متطلباتك</span></h2>
//                         <div className="flex justify-center items-center">
//                             <div className="xs:max-w-[450px] relative  w-full">
//                                 <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                                 <div className="relative  w-full">
//                                     <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
//                                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         autoComplete="off"
//                                         style={{ direction: "rtl" }}
//                                         type="search"
//                                         id="default-search"
//                                         className="block font-vazir w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-full bg-[#D9D9D9] focus:ring-blue-500 focus:border-blue-500"
//                                         placeholder="ابحث هنا ..."
//                                         value={searchValue}
//                                         onChange={(e) => { setSearchValue(e.target.value); }}
//                                     />
//                                 </div>
//                                 <FilterDrawer filter setfilter={setfilter} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mt-10 mx-auto lg:w-[90%]  container">
//                         <div style={{ direction: "rtl" }} className="flex flex-wrap justify-center items-center">
//                             {loading ? <Spinner color="info" aria-label="Info spinner example" /> :
//                                 results?.userResults?.length > 0 ? (
//                                     results?.userResults?.map((item, id) => {
//                                         return (
//                                             <div key={id} className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
//                                                 <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto h-[270px] rounded-[50px]'>
//                                                     <div className='w-full text-white    px-5 py-4'>
//                                                         <div className='flex justify-center items-center '>
//                                                             <div className='w-1/5 xs:p-1'>
//                                                                 <img src={"/assits/logo2.png"} className='w-full' alt="" />
//                                                             </div>
//                                                             <div className='w-full p-1  xs:px-2'>
//                                                                 <p className='text-2xl xs:text-3xl'>استثمارات</p>
//                                                                 <p className='text-xs  '>ريادة الأعمال والاستثمار</p>
//                                                             </div>
//                                                             <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
//                                                                 <Rating
//                                                                     name="text-feedback"
//                                                                     value={2.5}
//                                                                     readOnly
//                                                                     precision={0.5}
//                                                                     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                                 />
//                                                                 <p className='text-center'>Pre Seed</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className='w-full    px-5 py-4'>
//                                                         <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
//                                                             <div className='w-1/3 p-1'>
//                                                                 <p>الإيرادات</p>
//                                                                 <p className='font-semibold'>11 مليون جنيه</p>
//                                                             </div>
//                                                             <div className='w-1/3 border-x border-gray-500  p-1'>
//                                                                 <p>صافي الأرباح</p>
//                                                                 <p className='font-semibold'>3 مليون جنيه</p>
//                                                             </div>
//                                                             <div className='w-1/3 p-1'>
//                                                                 <p>الربحية</p>
//                                                                 <p className='font-semibold'>25%</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className='w-full    px-5 py-2'>
//                                                         <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
//                                                             <div className="w-1/2 border-l border-gray-500 py-2 text-center">
//                                                                 <p className='xs:font-semibold  xs:text-lg text-white'>500 ألف جنيه / 20%</p>
//                                                             </div>
//                                                             <div className="w-1/2  flex text-center py-2 justify-around items-center">
//                                                                 <div className='w-[30px] bg-white h-[30px] rounded-full'>
//                                                                 </div>
//                                                                 <div className='w-[30px] bg-white h-[30px] rounded-full'>
//                                                                 </div>
//                                                                 <div className='w-[30px] bg-white h-[30px] rounded-full'>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )
//                                     })) : (
//                                     <p className="text-center text-white text-lg mt-4">لا توجد نتائج مطابقة لما تبحث عنه</p>
//                                 )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"
import React, { useState, useEffect } from "react";
import { use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { useSelector, useDispatch } from "react-redux";

import { Vazirmatn } from 'next/font/google';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Spinner } from "flowbite-react";
import { FilterDrawer } from "@/components/homePage Comp/FilterDrawer";
import PostCard from './PostCard';
const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
export default function page() {
    // let { searchVal } = use(params);
    // searchVal = decodeURIComponent(searchVal);
    const params = useParams();

    const searchVal = decodeURIComponent(params?.searchVal || '');
    console.log(searchVal);
    const [searchValue, setSearchValue] = useState(searchVal || "");
    const [role, setRoleOfTheUser] = useState(null);
    const [error, setError] = useState(null);
const [token, setTokenOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [filter, setfilter] = useState({})
    console.log(filter)
    const [results, setResults] = useState({})

    const dispatch = useDispatch();


 useEffect(() => {
        const fetchHomePageData = async () => {
            try {
 
                const result2 = await dispatch(fetchUserToken()).unwrap();
                const token = result2;

                if (!token) throw new Error("User Token is null");
                setTokenOfTheUser(token)
                const result3 = await dispatch(fetchUserRole()).unwrap();
                const role = result3;
                if (!role) throw new Error("User Role is null");
                setRoleOfTheUser(role)
            } catch (err) {
                setError(err.message);
                console.error('فشل في جلب البيانات:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomePageData();
    }, [dispatch ]);





    // useEffect(() => {
    //     const getUserRole = async () => {
    //         try {
    //             const result2 = await dispatch(fetchUserRole()).unwrap();
    //             const role = result2;
    //             if (!role) throw new Error("User Role is null");
    //             setRoleOfTheUser(role);
    //         } catch (err) {
    //             setError(err.message);
    //             console.error('فشل في جلب البيانات:', err);
    //         }
    //     };

    //     getUserRole();
    // }, [dispatch]);
    console.log(role);
    useEffect(() => {
        if (searchValue.trim() === "") {
            setResults({});
            return;
        }
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://estethmarat-estethmarats-projects.vercel.app/api/v1/search?name=${searchValue}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(filter),
                    }
                );
                const data = await response.json();
                setLoading(false);
                let res = {
                    investors: data.userResults.filter(user => user.role === "investor"),
                    companies: data.userResults.filter(user => user.role === "company"),
                    supportOrganizations: data.userResults.filter(user => user.role === "supportOrganization"),
                    charityOrganizations: data.userResults.filter(user => user.role === "charityOrganization"),
                    posts: data.userResults.filter(item => item.content !== undefined)
                }
                setResults(res);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        };
        fetchResults();
    }, [searchValue, filter]);
    useEffect(() => {
        console.log(results);
    }, [results, filter]);
    return (
        <div className={`searchBackGround relative min-h-[130vh] ${vazir.className}`}>
            <div className="layer   items-center bg-black absolute bg-opacity-[.5] top-0 bottom-0 left-0 right-0">
                <div className=' min-h-[100vh]'>
                    <div className="w-full mt-32 ">
                        <h2 className='text-center  font-vazir text-white my-3  font-extrabold text-5xl'>  ابحث عن فرص استثمارية</h2>
                        <h2 className='text-center  font-vazir text-white my-3  font-extralight text-5xl'>تناسب <span className="text-[#00F560]">متطلباتك</span></h2>
                        <div className="flex justify-center items-center">
                            <div className="xs:max-w-[450px] relative  w-full">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative  w-full">
                                    <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        style={{ direction: "rtl" }}
                                        type="search"
                                        id="default-search"
                                        className="block font-vazir w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-full bg-[#D9D9D9] focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="ابحث هنا ..."
                                        value={searchValue}
                                        onChange={(e) => { setSearchValue(e.target.value); }}
                                    />
                                </div>
                                <FilterDrawer filter setfilter={setfilter} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 mx-auto lg:w-[90%]  container">
                        <div style={{ direction: "rtl" }} className="">
                            {
                                loading ? <div className='flex justify-center items-center'> <Spinner color="info" aria-label="Info spinner mx-auto example" /></div> : results.investors?.length > 0 || results.companies?.length > 0 || results.supportOrganizations?.length > 0 || results.charityOrganizations?.length > 0 || results.posts?.length > 0 ? <div>
                                    {results.investors?.length > 0 && (
                                        <div>
                                            <div className='flex justify-center items-center'>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                                <div className='xs:w-1/2 md:w-1/4'>
                                                    <p className='text-white text-center  font-semibold my-7 text-3xl'>المستثمرين </p>
                                                </div>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                            </div>
                                            <div style={{ direction: "rtl" }} className="flex flex-wrap justify-center items-center">
                                                {

                                                    results?.investors?.map((item, id) => {
                                                        return (



                                                            <div key={id} className=' w-full text-white  md:w-1/2 py-4 lg:w-1/3'>
                                                                <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                                                    <Link href={`/investors/${item._id}`}>  <div className='w-full    px-5 py-4'>
                                                                        <div className='flex justify-center items-center '>
                                                                            <div className='w-1/3 sm:w-1/4  xs:p-1'>
                                                                                <img src={item.profilePhoto} className=' rounded-3xl' alt="" />
                                                                            </div>
                                                                            <div className=' p-1 w-2/3 sm:w-3/4  xs:px-2'>
                                                                                <p className='text-xl xs:text-3xl whitespace-nowrap overflow-hidden my-2 text-ellipsis'> {item.fullArabicName}</p>
                                                                                <div style={{ direction: "rtl" }} className='flex justify-start tracking-widest items-center '>
                                                                                    <p className='text-xs mx-2 '> {item.jobTitle}   </p>
                                                                                    <p className='text-xs whitespace-nowrap overflow-hidden  text-ellipsis'>  {item.organization} </p>
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






                                                            // <div  className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
                                                            //     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto h-[270px] rounded-[50px]'>
                                                            //         <div className='w-full text-white    px-5 py-4'>
                                                            //             <div className='flex justify-center items-center '>
                                                            //                 <div className='w-1/5 xs:p-1'>
                                                            //                     <img src={"/assits/logo2.png"} className='w-full' alt="" />
                                                            //                 </div>
                                                            //                 <div className='w-full p-1  xs:px-2'>
                                                            //                     <p className='text-2xl xs:text-3xl'>استثمارات</p>
                                                            //                     <p className='text-xs  '>ريادة الأعمال والاستثمار</p>
                                                            //                 </div>
                                                            //                 <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                            //                     <Rating
                                                            //                         name="text-feedback"
                                                            //                         value={2.5}
                                                            //                         readOnly
                                                            //                         precision={0.5}
                                                            //                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            //                     />
                                                            //                     <p className='text-center'>Pre Seed</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-4'>
                                                            //             <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الإيرادات</p>
                                                            //                     <p className='font-semibold'>11 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 border-x border-gray-500  p-1'>
                                                            //                     <p>صافي الأرباح</p>
                                                            //                     <p className='font-semibold'>3 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الربحية</p>
                                                            //                     <p className='font-semibold'>25%</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-2'>
                                                            //             <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                            //                 <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                            //                     <p className='xs:font-semibold  xs:text-lg text-white'>500 ألف جنيه / 20%</p>
                                                            //                 </div>
                                                            //                 <div className="w-1/2  flex text-center py-2 justify-around items-center">
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //     </div>
                                                            // </div>
                                                        )
                                                    })}
                                            </div>

                                        </div>
                                    )}
                                    {results.companies?.length > 0 && (
                                        <div>
                                            <div className='flex justify-center items-center'>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                                <div className='xs:w-1/2 md:w-1/4'>
                                                    <p className='text-white text-center  font-semibold my-7 text-3xl'>الشركات </p>
                                                </div>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                            </div>
                                            <div style={{ direction: "rtl" }} className="flex flex-wrap justify-center items-center">
                                                {

                                                    results?.companies?.map((item, id) => {
                                                        return (
                                                            // <div key={id} className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
                                                            //     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto h-[270px] rounded-[50px]'>
                                                            //         <div className='w-full text-white    px-5 py-4'>
                                                            //             <div className='flex justify-center items-center '>
                                                            //                 <div className='w-1/5 xs:p-1'>
                                                            //                     <img src={"/assits/logo2.png"} className='w-full' alt="" />
                                                            //                 </div>
                                                            //                 <div className='w-full p-1  xs:px-2'>
                                                            //                     <p className='text-2xl xs:text-3xl'>استثمارات</p>
                                                            //                     <p className='text-xs  '>ريادة الأعمال والاستثمار</p>
                                                            //                 </div>
                                                            //                 <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                            //                     <Rating
                                                            //                         name="text-feedback"
                                                            //                         value={2.5}
                                                            //                         readOnly
                                                            //                         precision={0.5}
                                                            //                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            //                     />
                                                            //                     <p className='text-center'>Pre Seed</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-4'>
                                                            //             <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الإيرادات</p>
                                                            //                     <p className='font-semibold'>11 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 border-x border-gray-500  p-1'>
                                                            //                     <p>صافي الأرباح</p>
                                                            //                     <p className='font-semibold'>3 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الربحية</p>
                                                            //                     <p className='font-semibold'>25%</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-2'>
                                                            //             <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                            //                 <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                            //                     <p className='xs:font-semibold  xs:text-lg text-white'>500 ألف جنيه / 20%</p>
                                                            //                 </div>
                                                            //                 <div className="w-1/2  flex text-center py-2 justify-around items-center">
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //     </div>
                                                            // </div>
                                                            <div className=' w-full text-white md:w-1/2 py-4 lg:w-1/3'>
                                                                <Link href={`/startUps/${item._id}`}>
                                                                    <div className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto max-h-[290px] min-h-[255px] rounded-[50px]'>
                                                                        <div className='w-full    px-5 py-4'>
                                                                            <div className='flex justify-center items-center '>
                                                                                <div className='w-1/5 xs:p-1'>
                                                                                    <img src={item.companyPhoto} className='w-full' alt="" />
                                                                                </div>
                                                                                <div className='w-full p-1  xs:px-2'>
                                                                                    <p className='text-xl xs:text-2xl'>{item.companyName}</p>
                                                                                    <p className="text-xs line-clamp-2 overflow-hidden">{item?.companyField[0]}</p> 
                                                                                </div>
                                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                                                    <Rating
                                                                                        name="text-feedback"
                                                                                        value={2.5}
                                                                                        readOnly
                                                                                        precision={0.5}
                                                                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                                    />
                                                                                    <p className='text-center'>{item.businessModel}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='w-full    px-5 py-4'>
                                                                            <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                                                <div className='w-1/3 p-1'>
                                                                                    <p>الإيرادات</p>
                                                                                    <p className='font-semibold'>{item.netProfit} </p>
                                                                                </div>
                                                                                <div className='w-1/3 border-x border-gray-500  p-1'>
                                                                                    <p>صافي الأرباح</p>
                                                                                    <p className='font-semibold'> {item.annualRevenue} </p>
                                                                                </div>
                                                                                <div className='w-1/3 p-1'>
                                                                                    <p>الربحية</p>
                                                                                    <p className='font-semibold'>{item.percentageProfitMargin}%</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='w-full    px-5 py-2'>
                                                                            <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                                                <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                                                    <p className='xs:font-semibold  xs:text-lg text-white'> {item.investmentAmount}$</p>
                                                                                </div>
                                                                                <div className="w-1/2  flex text-center py-2 justify-around items-center">
                                                                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>

                                                                                    </div>
                                                                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>

                                                                                    </div>
                                                                                    <div className='w-[30px] bg-white h-[30px] rounded-full'>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )}
                                    {results.supportOrganizations?.length > 0 && (
                                        <div>
                                            <div className='flex justify-center items-center'>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                                <div className='xs:w-1/2 md:w-1/4'>
                                                    <p className='text-white text-center  font-semibold my-7 text-3xl'>حاضنات الاعمال </p>
                                                </div>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                            </div>
                                            <div style={{ direction: "rtl" }} className="flex flex-wrap justify-center items-center">
                                                {

                                                    results?.supportOrganizations?.map((item, id) => {
                                                        return (
                                                            // <div key={id} className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
                                                            //     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto h-[270px] rounded-[50px]'>
                                                            //         <div className='w-full text-white    px-5 py-4'>
                                                            //             <div className='flex justify-center items-center '>
                                                            //                 <div className='w-1/5 xs:p-1'>
                                                            //                     <img src={"/assits/logo2.png"} className='w-full' alt="" />
                                                            //                 </div>
                                                            //                 <div className='w-full p-1  xs:px-2'>
                                                            //                     <p className='text-2xl xs:text-3xl'>استثمارات</p>
                                                            //                     <p className='text-xs  '>ريادة الأعمال والاستثمار</p>
                                                            //                 </div>
                                                            //                 <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                            //                     <Rating
                                                            //                         name="text-feedback"
                                                            //                         value={2.5}
                                                            //                         readOnly
                                                            //                         precision={0.5}
                                                            //                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            //                     />
                                                            //                     <p className='text-center'>Pre Seed</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-4'>
                                                            //             <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الإيرادات</p>
                                                            //                     <p className='font-semibold'>11 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 border-x border-gray-500  p-1'>
                                                            //                     <p>صافي الأرباح</p>
                                                            //                     <p className='font-semibold'>3 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الربحية</p>
                                                            //                     <p className='font-semibold'>25%</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-2'>
                                                            //             <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                            //                 <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                            //                     <p className='xs:font-semibold  xs:text-lg text-white'>500 ألف جنيه / 20%</p>
                                                            //                 </div>
                                                            //                 <div className="w-1/2  flex text-center py-2 justify-around items-center">
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //     </div>
                                                            // </div>


                                                            <div className=' w-full text-white md:w-1/2 py-4 lg:w-1/3'>
                                                                <Link href={`/incubators/${item._id}`}>
                                                                    <div className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                                                        <div className='w-full    px-5 py-4'>
                                                                            <div className='flex justify-center items-center '>
                                                                                <div className='w-1/5 xs:p-1'>
                                                                                    <img src={item.image.secure_url} className='w-full' alt="" />
                                                                                </div>
                                                                                <div className='w-full p-1  xs:px-2'>
                                                                                    <p className='text-xl xs:text-2xl overflow-hidden text-ellipsis line-clamp-2'>{item.name}</p>
                                                                                    <p className='text-xs  '> {item.organizationType}</p>
                                                                                </div>
                                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>

                                                                                    <p className='text-center'> {item.headQuarter}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )}
                                    {results.charityOrganizations?.length > 0 && (
                                        <div>
                                            <div className='flex justify-center items-center'>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                                <div className='xs:w-1/2 md:w-1/4'>
                                                    <p className='text-white text-center  font-semibold my-7 text-3xl'>المنظمات الخيريه </p>
                                                </div>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                            </div>
                                            <div style={{ direction: "rtl" }} className="flex flex-wrap justify-center items-center">
                                                {
                                                    results?.charityOrganizations?.map((item, id) => {
                                                        return (
                                                            // <div key={id} className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
                                                            //     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto h-[270px] rounded-[50px]'>
                                                            //         <div className='w-full text-white    px-5 py-4'>
                                                            //             <div className='flex justify-center items-center '>
                                                            //                 <div className='w-1/5 xs:p-1'>
                                                            //                     <img src={item.name} className='w-full' alt="" />
                                                            //                 </div>
                                                            //                 <div className='w-full p-1  xs:px-2'>
                                                            //                     <p className='text-2xl xs:text-3xl'>استثمارات</p>
                                                            //                     <p className='text-xs  '>ريادة الأعمال والاستثمار</p>
                                                            //                 </div>
                                                            //                 <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                            //                     <Rating
                                                            //                         name="text-feedback"
                                                            //                         value={2.5}
                                                            //                         readOnly
                                                            //                         precision={0.5}
                                                            //                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            //                     />
                                                            //                     <p className='text-center'>Pre Seed</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-4'>
                                                            //             <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الإيرادات</p>
                                                            //                     <p className='font-semibold'>11 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 border-x border-gray-500  p-1'>
                                                            //                     <p>صافي الأرباح</p>
                                                            //                     <p className='font-semibold'>3 مليون جنيه</p>
                                                            //                 </div>
                                                            //                 <div className='w-1/3 p-1'>
                                                            //                     <p>الربحية</p>
                                                            //                     <p className='font-semibold'>25%</p>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className='w-full    px-5 py-2'>
                                                            //             <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                            //                 <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                            //                     <p className='xs:font-semibold  xs:text-lg text-white'>500 ألف جنيه / 20%</p>
                                                            //                 </div>
                                                            //                 <div className="w-1/2  flex text-center py-2 justify-around items-center">
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                     <div className='w-[30px] bg-white h-[30px] rounded-full'>
                                                            //                     </div>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //     </div>
                                                            // </div>

                                                            <div className=' w-full text-white md:w-1/2 py-4 lg:w-1/3'>
                                                                <Link href={`/charaties/${item._id}`}>
                                                                    <div className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                                                        <div className='w-full    px-5 py-4'>
                                                                            <div className='flex justify-center items-center '>
                                                                                <div className='w-1/5 xs:p-1'>
                                                                                    <img src={item.image.secure_url} className='w-full' alt="" />
                                                                                </div>
                                                                                <div className='w-full p-1  xs:px-2'>
                                                                                    <p className='text-xl xs:text-2xl overflow-hidden text-ellipsis line-clamp-2'>{item.name}</p>
                                                                                    <p className='text-xs  '> {item.organizationType}</p>
                                                                                </div>
                                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>

                                                                                    <p className='text-center'> {item.headQuarter}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </div>

                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )}
                                    {results.posts?.length > 0 && (
                                        <div>
                                            <div className='flex justify-center items-center'>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                                <div className='xs:w-1/2 md:w-1/4'>
                                                    <p className='text-white text-center  font-semibold my-7 text-3xl'>المنشورات </p>
                                                </div>
                                                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                                                </div>
                                            </div>
                                            <div style={{ direction: "rtl" }} className="flex flex-wrap justify-center items-center">
                                                {
                                                    results?.posts?.map((item, id) => {
                                                        return (
                                                            <div key={item._id} className="w-full text-white md:w-1/2 py-4">
                                                                <PostCard post={item} role={role} token={token} />
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )}
                                </div> : <p className="text-center text-white text-lg mt-4">لا توجد نتائج مطابقة لما تبحث عنه</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
