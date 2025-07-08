import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
export default function Top3({ topCompanies, topInvestors }) {
    
    function sortInvestorsByScoreDescending(investors) {
        return investors.sort((a, b) => b.score - a.score);
    }
    let topInv = sortInvestorsByScoreDescending(topInvestors)
    let topCo = sortInvestorsByScoreDescending(topCompanies)
    return (
        <div>
            <div className='flex justify-center flex-wrap container w-[95%]  mx-auto items-center'>
                <div className='md:w-1/2 w-full relative  flex justify-center py-10 border-b sm:p-5 items-center md:border-b-0 md:border-e border-gray-800'>
                    <div className='w-1/3 flex flex-col  md:h-[400px] xl:h-[450px] h-[250px] xs:h-[300px] justify-end items-center '>
                        <div className='w-full '>
                            <Link href={`/investors/${topInv[2]?.investor_result?._id}`}>
                                <div className="xs:w-[95%] cursor-pointer w-[97%] sm:w-[80%]    mx-auto relative  hover:z-40 bg-gray-700 rounded-2xl md:rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                                    <div className=' md:p-3 xs:p-1 relative bottom-5 md:bottom-6 lg:bottom-14 hover:scale-[1.45] z-40 hover:z-50 transition-transform duration-300 '>
                                        <Image unoptimized src={topInv[2]?.investor_result?.profilePhoto} width={400} height={400} alt="" className="relative  rounded-2xl md:rounded-3xl  z-40 hover:z-50" />
                                    </div><h4 className='text-center relative bottom-5 md:bottom-6 lg:bottom-14 font-vazir text-white  font-extrabold  md:text-2xl'>   {topInv[2]?.investor_result?.fullEnglishName} </h4>
                                    <img src="/assits/third-removebg-preview.png" alt="" className='absolute -bottom-5 md:-bottom-7 lg:-bottom-10  right-0  w-[35px] xs:w-[45px] md:w-[35px] lg:w-[70px] ' />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col md:h-[400px] xl:h-[450px] h-[250px] xs:h-[300px] justify-start items-center '>
                        <div className='w-full '><Link href={`/investors/${topInv[0]?.investor_result?._id}`}>
                            <div className="xs:w-[95%] cursor-pointer w-[97%] sm:w-[80%]    mx-auto relative  hover:z-40 bg-gray-700 rounded-2xl md:rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                                <div className=' md:p-3 xs:p-1 relative bottom-5 md:bottom-6 lg:bottom-14 hover:scale-[1.45] z-40 hover:z-50 transition-transform duration-300 '>
                                    <Image unoptimized src={topInv[0]?.investor_result?.profilePhoto} width={400} height={400} alt="" className="relative  rounded-2xl md:rounded-3xl  z-40 hover:z-50" />
                                </div><h4 className='text-center relative bottom-5 md:bottom-6 lg:bottom-14 font-vazir text-white  font-extrabold  md:text-2xl'> {topInv[0]?.investor_result?.fullEnglishName}</h4>
                                <img src="/assits/first-removebg-preview.png" alt="" className='absolute -bottom-5 md:-bottom-7 lg:-bottom-10  right-0  w-[35px] xs:w-[45px] md:w-[35px] lg:w-[70px] ' />
                            </div></Link>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col md:h-[400px] xl:h-[450px] h-[250px] xs:h-[300px] justify-center items-center '>
                        <div className='w-full '><Link href={`/investors/${topInv[1]?.investor_result?._id}`}>
                            <div className="xs:w-[95%] cursor-pointer w-[97%] sm:w-[80%]    mx-auto relative  hover:z-40 bg-gray-700 rounded-2xl md:rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                                <div className=' md:p-3 xs:p-1 relative bottom-5 md:bottom-6 lg:bottom-14 hover:scale-[1.45] z-40 hover:z-50 transition-transform duration-300 '>
                                    <Image unoptimized src={topInv[1]?.investor_result?.profilePhoto} width={400} height={400} alt="" className="relative  rounded-2xl md:rounded-3xl  z-40 hover:z-50" />
                                </div><h4 className='text-center relative bottom-5 md:bottom-6 lg:bottom-14 font-vazir text-white  font-extrabold  md:text-2xl'> {topInv[1]?.investor_result?.fullEnglishName}</h4>
                                <img src="/assits/second-removebg-preview.png" alt="" className='absolute -bottom-5 md:-bottom-7 lg:-bottom-10  right-0  w-[35px] xs:w-[45px] md:w-[35px] lg:w-[70px] ' />
                            </div></Link>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2 w-full flex justify-center py-10  sm:p-5 items-center '>
                    <div className='w-1/3 flex flex-col md:h-[400px] xl:h-[450px] h-[250px] xs:h-[300px] justify-end items-center '>
                        <div className='w-full '><Link href={`/startUps/${topCo[2]?.company?._id}`}>
                            <div className="xs:w-[95%] cursor-pointer w-[97%] sm:w-[80%]    mx-auto relative  hover:z-40 bg-gray-700 rounded-2xl md:rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                                <div className=' md:p-3 xs:p-1 relative bottom-5 md:bottom-6 lg:bottom-14 hover:scale-[1.45] z-40 hover:z-50 transition-transform duration-300 '>
                                    <Image unoptimized src={topCo[2]?.company?.companyPhoto} width={400} height={400} alt="" className="relative  rounded-2xl md:rounded-3xl  z-40 hover:z-50" />
                                </div><h4 className='text-center relative bottom-5 md:bottom-6 lg:bottom-14 font-vazir text-white  font-extrabold  md:text-2xl'> {topCo[2]?.company?.companyName}</h4>
                                <img src="/assits/third-removebg-preview.png" alt="" className='absolute -bottom-5 md:-bottom-7 lg:-bottom-10  right-0  w-[35px] xs:w-[45px] md:w-[35px] lg:w-[70px] ' />
                            </div></Link>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col md:h-[400px] xl:h-[450px] h-[250px] xs:h-[300px] justify-start items-center '>
                        <div className='w-full '><Link href={`/startUps/${topCo[0]?.company?._id}`}>
                            <div className="xs:w-[95%] cursor-pointer w-[97%] sm:w-[80%]    mx-auto relative  hover:z-40 bg-gray-700 rounded-2xl md:rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                                <div className=' md:p-3 xs:p-1 relative bottom-5 md:bottom-6 lg:bottom-14 hover:scale-[1.45] z-40 hover:z-50 transition-transform duration-300 '>
                                    <Image unoptimized src={topCo[0]?.company?.companyPhoto} width={400} height={400} alt="" className="relative  rounded-2xl md:rounded-3xl  z-40 hover:z-50" />
                                </div><h4 className='text-center relative bottom-5 md:bottom-6 lg:bottom-14 font-vazir text-white  font-extrabold  md:text-2xl'> {topCo[0]?.company?.companyName}</h4>
                                <img src="/assits/first-removebg-preview.png" alt="" className='absolute -bottom-5 md:-bottom-7 lg:-bottom-10  right-0  w-[35px] xs:w-[45px] md:w-[35px] lg:w-[70px] ' />
                            </div></Link>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col md:h-[400px] xl:h-[450px] h-[250px] xs:h-[300px] justify-center items-center '>
                        <div className='w-full '><Link href={`/startUps/${topCo[1]?.company?._id}`}>
                            <div className="xs:w-[95%] cursor-pointer w-[97%] sm:w-[80%]    mx-auto relative  hover:z-40 bg-gray-700 rounded-2xl md:rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
                                <div className=' md:p-3 xs:p-1 relative bottom-5 md:bottom-6 lg:bottom-14 hover:scale-[1.45] z-40 hover:z-50 transition-transform duration-300 '>
                                    <Image unoptimized src={topCo[1]?.company?.companyPhoto} width={400} height={400} alt="" className="relative  rounded-2xl md:rounded-3xl  z-40 hover:z-50" />
                                </div><h4 className='text-center relative bottom-5 md:bottom-6 lg:bottom-14 font-vazir text-white  font-extrabold  md:text-2xl'> {topCo[1]?.company?.companyName}</h4>
                                <img src="/assits/second-removebg-preview.png" alt="" className='absolute -bottom-5 md:-bottom-7 lg:-bottom-10  right-0  w-[35px] xs:w-[45px] md:w-[35px] lg:w-[70px] ' />
                            </div></Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
