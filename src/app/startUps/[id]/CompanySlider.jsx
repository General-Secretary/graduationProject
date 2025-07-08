"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import { Vazirmatn } from 'next/font/google';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import Link from "next/link";
const NextArrow = ({ onClick }) => (
    // <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full" onClick={onClick}>
    //     <i className="fa-regular text-green-700 text-2xl  fa-circle-right"></i>
    // </div>
    <div
  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full
             transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1/2"
  onClick={onClick}
>
  <i className="fa-regular text-green-700 text-2xl fa-circle-right"></i>
</div>
 

);
const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
const PrevArrow = ({ onClick }) => (
    // <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full" onClick={onClick}>
    //  <i className="fa-regular text-green-700 text-2xl  fa-circle-left"></i>
    // </div>
    <div
  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full
             transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1/2"
  onClick={onClick}
>
  <i className="fa-regular text-green-700 text-2xl fa-circle-left"></i>
</div>

);

export default function CompanySlider({ data }) {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        // autoplay: true,
        // autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div  className="relative sm:px-6 xl:w-[95%] mx-auto py-8   font-vazir'">
            <div className='flex mx-auto lg:w-[85%] justify-center items-center'>
                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'></div>
                <div className='xs:w-1/2 md:w-1/4'>
                    <p className='text-white text-center font-semibold my-7 text-3xl'>  شركات مشابهه  </p>
                </div>
                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'></div>
            </div>

            <Slider  {...settings}>
                {data.slice(0, 8).map((item) => (
                    // <div key={item?.id} className="px-2">
                    //     <div className="bg-white rounded-lg shadow-md p-4 h-40 flex flex-col justify-center items-center">
                            <div style={{ direction: "rtl" }} key={item?._id} className=' w-full text-white md:w-1/2 py-4 lg:w-1/3'>
                                <Link style={{ direction: "rtl" }} href={`/startUps/${item?._id}`}>
                                    <div style={{ direction: "rtl" }} className=' bg-gray-200 overflow-hidden bg-clip-padding cursor-pointer backdrop-filter backdrop-blur-md bg-opacity-5 w-[98%] xs:w-[95%]  mx-auto max-h-[290px] min-h-[255px] rounded-[50px]'>
                                        <div  className='w-full    px-5 py-4'>
                                            <div style={{ direction: "rtl" }} className='flex justify-center items-center '>
                                                <div className='w-1/5 xs:p-1'>
                                                    <img src={item?.companyPhoto} className='w-full' alt="" />
                                                </div>
                                                <div className='w-full p-1  xs:px-2'>
                                                    <p className='text-xl xs:text-2xl'>{item?.companyName}</p>
<p className="text-xs line-clamp-2 overflow-hidden">{item?.companyField[0]}</p>                                                </div>
                                                <div style={{ direction: "ltr" }} className='w-2/5 xs:px-3 py-1 '>
                                                    <Rating
                                                        name="text-feedback"
                                                        value={2.5}
                                                        readOnly
                                                        precision={0.5}
                                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                    />
                                                    <p className='text-center'>{item?.businessModel}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div  className='w-full    px-5 py-4'>
                                            <div className='flex text-center text-gray-500 text-[13px] justify-center items-center '>
                                                <div className='w-1/3 p-1'>
                                                    <p>الإيرادات</p>
                                                    <p className='font-semibold'>{item?.netProfit} </p>
                                                </div>
                                                <div className='w-1/3 border-x border-gray-500  p-1'>
                                                    <p>صافي الأرباح</p>
                                                    <p className='font-semibold'> {item?.annualRevenue} </p>
                                                </div>
                                                <div className='w-1/3 p-1'>
                                                    <p>الربحية</p>
                                                    <p className='font-semibold'>{item?.percentageProfitMargin}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full    px-5 py-2'>
                                            <div className='flex text-center text-gray-500 bg-[#00F5601F] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-full text-[13px] justify-center items-center '>
                                                <div className="w-1/2 border-l border-gray-500 py-2 text-center">
                                                    <p className='xs:font-semibold  xs:text-lg text-white'> {item?.investmentAmount}$</p>
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
                    //     </div>
                    // </div>
                ))}
            </Slider>
            <style jsx global>{`
            .slick-dots li button:before 
            {
            color: white;
            font-size: 10px;
            }
            .slick-dots li.slick-active button:before 
            {
            color: #22c55e;
            } `}</style>
        </div>
    );
}
