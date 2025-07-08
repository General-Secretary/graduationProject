// "use client"
// import { useEffect, useState } from 'react';
// import React from 'react'
// import { Spinner } from "flowbite-react";
// import { Vazirmatn } from 'next/font/google';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
// import { Button, Popover } from "flowbite-react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
// import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
// import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
// import Link from 'next/link';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import Image from 'next/image'
// import Loading from './../loading';
// const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
// export default function page() {
//     const [error, setError] = useState(null);
//     const [token, setTokenOfTheUser] = useState(null);
//     const [role, setRoleOfTheUser] = useState(null);
//     const [userId, setIdOfTheUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         const fetchUserDataAndCompany = async () => {
//             try {
//                 const result = await dispatch(fetchUserToken()).unwrap();
//                 const token = result;
//                 if (!token) throw new Error("User Token is null");
//                 setTokenOfTheUser(token)
//                 const result2 = await dispatch(fetchUserRole()).unwrap();
//                 const role = result2;
//                 if (!role) throw new Error("User Role is null");
//                 setRoleOfTheUser(role)
//                 const result3 = await dispatch(fetchUserId()).unwrap();
//                 const id = result3;
//                 if (!id) throw new Error("User id is null");
//                 setIdOfTheUser(id)
//             } catch (err) {
//                 setError(err.message);
//                 console.error('فشل في جلب البيانات:', err);
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
//         <div>

//         </div>
//     )
// }





// "use client"
// import { useEffect, useState } from 'react';
// import React from 'react';
// import { Spinner } from "flowbite-react";
// import { Vazirmatn } from 'next/font/google';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
// import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
// import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
// import Loading from './../loading';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });

// export default function Page() {
//     const [error, setError] = useState(null);
//     const [token, setTokenOfTheUser] = useState(null);
//     const [role, setRoleOfTheUser] = useState(null);
//     const [userId, setIdOfTheUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [savedDate, setSavedDate] = useState(null);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = await dispatch(fetchUserToken()).unwrap();
//                 if (!token) throw new Error("User Token is null");
//                 setTokenOfTheUser(token);

//                 const role = await dispatch(fetchUserRole()).unwrap();
//                 if (!role) throw new Error("User Role is null");
//                 setRoleOfTheUser(role);

//                 const id = await dispatch(fetchUserId()).unwrap();
//                 if (!id) throw new Error("User ID is null");
//                 setIdOfTheUser(id);
//             } catch (err) {
//                 console.error("فشل في جلب بيانات المستخدم:", err);
//                 setError(err.message);
//             }
//         };

//         fetchUserData();
//     }, [dispatch]);

//     useEffect(() => {
//         const fetchsavedDate = async () => {
//             if (!role || !token) return;

//             const baseURL = "https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1";
//             let endpoint = "";

//             switch (role) {
//                 case "charityOrganization":
//                     endpoint = `${baseURL}/charityOrganizations/save-profile`;
//                     break;
//                 case "company":
//                     endpoint = `${baseURL}/companies/save-profile`;
//                     break;
//                 case "investor":
//                     endpoint = `${baseURL}/investors/save-profile`;
//                     break;
//                 case "supportOrganization":
//                     endpoint = `${baseURL}/supportOrganizations/save-profile`;
//                     break;
//                 default:
//                     setError("دور المستخدم غير معروف");
//                     return;
//             }

//             try {
//                 const response = await axios.get(endpoint, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 setSavedDate(response.data?.data);
//             } catch (err) {
//                 console.error("فشل في جلب البيانات:", err);
//                 setError(err.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
//                 toast.error("فشل في تحميل البيانات");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchsavedDate();
//     }, [role, token]);
//     const categorizedProfiles = {
//         Investor: [],
//         company: [],
//         charityOrganization: [],
//         supportOrganization: []
//     };

//     response.savedProfiles.forEach(profile => {
//         const type = profile.profileType;

//         if (categorizedProfiles.hasOwnProperty(type)) {
//             categorizedProfiles[type].push(profile);
//         } else {
//             // اختياري: لو ظهر نوع جديد غير معروف
//             categorizedProfiles[type] = [profile];
//         }
//     });

//     console.log(categorizedProfiles);








//     if (loading) return <Loading />;

//     if (error) return (
//         <div className="text-red-600 text-center mt-8">
//             خطأ: {error}
//         </div>
//     );

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">بيانات البروفايل</h1>
//             <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
//                 {JSON.stringify(savedDate, null, 2)}
//             </pre>
//         </div>
//     );
// }












"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import { Spinner } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { useDispatch } from "react-redux";
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import Loading from './../loading';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });

export default function Page() {
    const [error, setError] = useState(null);
    const [token, setTokenOfTheUser] = useState(null);
    const [role, setRoleOfTheUser] = useState(null);
    const [userId, setIdOfTheUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savedDate, setSavedDate] = useState({
        Investor: [],
        company: [],
        charityOrganization: [],
        supportOrganization: []
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await dispatch(fetchUserToken()).unwrap();
                if (!token) throw new Error("User Token is null");
                setTokenOfTheUser(token);

                const role = await dispatch(fetchUserRole()).unwrap();
                if (!role) throw new Error("User Role is null");
                setRoleOfTheUser(role);

                const id = await dispatch(fetchUserId()).unwrap();
                if (!id) throw new Error("User ID is null");
                setIdOfTheUser(id);
            } catch (err) {
                console.error("فشل في جلب بيانات المستخدم:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch]);

    useEffect(() => {
        const fetchsavedDate = async () => {
            if (!role || !token) return;

            const baseURL = "https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1";
            let endpoint = "";

            switch (role) {
                case "charityOrganization":
                    endpoint = `${baseURL}/charityOrganizations/save-profile`;
                    break;
                case "company":
                    endpoint = `${baseURL}/companies/save-profile`;
                    break;
                case "investor":
                    endpoint = `${baseURL}/investors/save-profile`;
                    break;
                case "supportOrganization":
                    endpoint = `${baseURL}/supportOrganizations/save-profile`;
                    break;
                default:
                    setError("دور المستخدم غير معروف");
                    return;
            }

            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const savedProfiles = response.data?.data?.savedProfiles || [];

                const categorizedProfiles = {
                    Investor: [],
                    Company: [],
                    CharityOrganization: [],
                    SupportOrganization: []
                };

                savedProfiles.forEach(profile => {
                    // تجاهل العناصر اللي مالهاش profileId
                    if (!profile.profileId) return;

                    const type = profile.profileType;
                    if (categorizedProfiles.hasOwnProperty(type)) {
                        categorizedProfiles[type].push(profile);
                    } else {
                        categorizedProfiles[type] = [profile]; // لو فيه نوع جديد
                    }
                });
                console.log(categorizedProfiles);

                setSavedDate(categorizedProfiles);
            } catch (err) {
                console.error("فشل في جلب البيانات:", err);
                setError(err.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
                toast.error("فشل في تحميل البيانات");
            } finally {
                setLoading(false);
            }
        };

        fetchsavedDate();
    }, [role, token]);

    if (loading) return <Loading />;

    if (error) return (
        <div className="text-red-600 text-center mt-8">
            خطأ: {error}
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">الملفات المحفوظة حسب النوع</h1>

            {/* {["Investor", "Company", "CharityOrganization", "SupportOrganization"].map(type => (
                <div key={type} className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">{type}:</h2>
                    {savedDate[type].length > 0 ? (
                        savedDate[type].map((profile, idx) => (
                            <div key={idx} className="border-b py-2">
                                <p><strong>الاسم:</strong> {profile.profileId?.fullArabicName || "غير متوفر"}</p>
                                <p><strong>الوظيفة:</strong> {profile.profileId?.jobTitle || "غير متوفرة"}</p>
                                <p><strong>المنظمة:</strong> {profile.profileId?.organization || "غير متوفرة"}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">لا توجد ملفات محفوظة لهذا النوع.</p>
                    )}
                </div>
            ))} */}


            {
                savedDate.Investor?.length > 0 || savedDate.company?.length > 0 || savedDate.SupportOrganization?.length > 0 || savedDate.CharityOrganization?.length > 0 ? <div>
                    {savedDate.Investor?.length > 0 && (
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

                                    savedDate?.Investor?.map((item, id) => {
                                        return (



                                            <div key={id} className=' w-full text-white  md:w-1/2 py-4 lg:w-1/3'>
                                                <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                                    <Link href={`/investors/${item.profileId?._id}`}>  <div className='w-full    px-5 py-4'>
                                                        <div className='flex justify-center items-center '>
                                                            <div className='w-1/3 sm:w-1/4  xs:p-1'>
                                                                <img src={item.profileId?.profilePhoto} className=' rounded-3xl' alt="" />
                                                            </div>
                                                            <div className=' p-1 w-2/3 sm:w-3/4  xs:px-2'>
                                                                <p className='text-xl xs:text-3xl whitespace-nowrap overflow-hidden my-2 text-ellipsis'> {item.profileId?.fullArabicName}</p>
                                                                <div style={{ direction: "rtl" }} className='flex justify-start tracking-widest items-center '>
                                                                    <p className='text-xs mx-2 '> {item.profileId?.jobTitle}   </p>
                                                                    <p className='text-xs whitespace-nowrap overflow-hidden  text-ellipsis'>  {item.profileId?.organization} </p>
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
                    {savedDate.company?.length > 0 && (
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

                                    savedDate?.company?.map((item, id) => {
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
                                                <Link href={`/startUps/${item.profileId?._id}`}>
                                                    <div className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto max-h-[290px] min-h-[255px] rounded-[50px]'>
                                                        <div className='w-full    px-5 py-4'>
                                                            <div className='flex justify-center items-center '>
                                                                <div className='w-1/5 xs:p-1'>
                                                                    <img src={item.profileId?.companyPhoto} className='w-full' alt="" />
                                                                </div>
                                                                <div className='w-full p-1  xs:px-2'>
                                                                    <p className='text-xl xs:text-2xl'>{item.profileId?.companyName}</p>
                                                                    <p className='text-xs '> {item.profileId?.companyField[0]}</p>
                                                                </div>
                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                                    <Rating
                                                                        name="text-feedback"
                                                                        value={2.5}
                                                                        readOnly
                                                                        precision={0.5}
                                                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                    />
                                                                    <p className='text-center'>{item.profileId?.businessModel}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='w-full    px-5 py-4'>
                                                            <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                                <div className='w-1/3 p-1'>
                                                                    <p>الإيرادات</p>
                                                                    <p className='font-semibold'>{item.profileId?.netProfit} </p>
                                                                </div>
                                                                <div className='w-1/3 border-x border-gray-500  p-1'>
                                                                    <p>صافي الأرباح</p>
                                                                    <p className='font-semibold'> {item.profileId?.annualRevenue} </p>
                                                                </div>
                                                                <div className='w-1/3 p-1'>
                                                                    <p>الربحية</p>
                                                                    <p className='font-semibold'>{item.profileId?.percentageProfitMargin}%</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full    px-5 py-2'>
                                                            <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                                <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                                    <p className='xs:font-semibold  xs:text-lg text-white'> {item.profileId?.investmentAmount}$</p>
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
                    {savedDate.SupportOrganization?.length > 0 && (
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

                                    savedDate?.SupportOrganization?.map((item, id) => {
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
                                                <Link href={`/incubators/${item.profileId?._id}`}>
                                                    <div className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                                        <div className='w-full    px-5 py-4'>
                                                            <div className='flex justify-center items-center '>
                                                                <div className='w-1/5 xs:p-1'>
                                                                    <img src={item.profileId?.image.secure_url} className='w-full' alt="" />
                                                                </div>
                                                                <div className='w-full p-1  xs:px-2'>
                                                                    <p className='text-xl xs:text-2xl overflow-hidden text-ellipsis line-clamp-2'>{item.profileId?.name}</p>
                                                                    <p className='text-xs  '> {item.profileId?.organizationType}</p>
                                                                </div>
                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>

                                                                    <p className='text-center'> {item.profileId?.headQuarter}</p>
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
                    {savedDate.CharityOrganization?.length > 0 && (
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
                                    savedDate?.CharityOrganization?.map((item, id) => {
                                        return (
                                            // <div key={id} className=' w-full  md:w-1/2 py-4 lg:w-1/3'>
                                            //     <div className=' bg-gray-200 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto h-[270px] rounded-[50px]'>
                                            //         <div className='w-full text-white    px-5 py-4'>
                                            //             <div className='flex justify-center items-center '>
                                            //                 <div className='w-1/5 xs:p-1'>
                                            //                     <img src={item.profileId?.name} className='w-full' alt="" />
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
                                                <Link href={`/charaties/${item.profileId?._id}`}>
                                                    <div className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto  rounded-[50px]'>
                                                        <div className='w-full    px-5 py-4'>
                                                            <div className='flex justify-center items-center '>
                                                                <div className='w-1/5 xs:p-1'>
                                                                    <img src={item.profileId?.image.secure_url} className='w-full' alt="" />
                                                                </div>
                                                                <div className='w-full p-1  xs:px-2'>
                                                                    <p className='text-xl xs:text-2xl overflow-hidden text-ellipsis line-clamp-2'>{item.profileId?.name}</p>
                                                                    <p className='text-xs  '> {item.profileId?.organizationType}</p>
                                                                </div>
                                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>

                                                                    <p className='text-center'> {item.profileId?.headQuarter}</p>
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
                </div> : <p className="text-center text-white text-lg mt-4"> لا يوجد لديك محفوظات بعد </p>}
        </div>
    );
}
