import React from 'react'
import Image from 'next/image'
import { Vazirmatn } from 'next/font/google';
import Button from '@mui/material/Button';
import Link from 'next/link';


const vazir = Vazirmatn({
    subsets: ['arabic'],
    weight: ['400', '700']
});
export default function Header() {
    return (
        <div className='header-bg -z-10'>
            <div className="layer flex justify-center min-h-[100vh] items-center bg-black absolute bg-opacity-[.4] top-0 bottom-0 left-0 right-0">
                <div className='text-center flex flex-col  justify-around h-4/5 items-center'>
                    {/* <Image unoptimized src={"/assits/logo.png"} width={275} height={275} alt="Logo" /> */}
                    <div className="relative w-[150px] aspect-square md:w-[275px]">
                        <Image
                            unoptimized
                            src="/assits/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className='text-center  font-vazir text-white  font-extrabold text-5xl'>أهلاً بك في عالم استثمارات</h2>
                    <Link href="/Login" className='w-full mx-auto'> <Button sx={{ borderRadius: '50px', borderColor: '#00F560', width: "100%", marginX: "auto" }} color="success" variant="outlined">
                        <p className='font-vazir text-3xl my-2 text-white'>
                            سجل الدخول</p></Button></Link>
                    <p className='font-vazir text-3xl  text-white'> أو</p>
                    <a href='#describeSection' className='font-vazir text-3xl my-2 text-[#00F560]' >تسجيل مستخدم جديد</a>
                </div>
            </div>
        </div>
    )
}
