"use client"
import { Button, Modal } from "flowbite-react";
import { Vazirmatn } from 'next/font/google';
import { Spinner } from "flowbite-react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Popover } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import toast from 'react-hot-toast';
import Loading from './../loading';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';
import Link from 'next/link';
import React from 'react'
import SuitableCo from '../../components/homePage Comp/SuitableCo';
import SuitableCharities from '@/components/homePage Comp/SuitableCharities';
import SearchBar from './../../components/homePage Comp/SearchBar';
import Top3 from '@/components/homePage Comp/Top3';
import RecommendedInverstors from '@/components/homePage Comp/RecommendedInverstors';
import SupportPosts from '@/components/homePage Comp/SupportPosts';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
export default function page() {
    const [topCompanies, setTopCompanies] = useState(null);
    const [topInvestors, setTopInvestors] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    const [role, setRoleOfTheUser] = useState(null);
    const [error, setError] = useState(null);
    const [idOfTheUser, setIdOfTheUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setTokenOfTheUser] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const userIdFromStore = useSelector((state) => state.userId.id);
    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                const result = await dispatch(fetchUserId()).unwrap();
                const userId = result;
                if (!userId) throw new Error("User ID is null");
                setIdOfTheUser(userId)
                const result2 = await dispatch(fetchUserToken()).unwrap();
                const token = result2;

                if (!token) throw new Error("User Token is null");
                setTokenOfTheUser(token)
                const result3 = await dispatch(fetchUserRole()).unwrap();
                const role = result3;
                if (!role) throw new Error("User Role is null");
                setRoleOfTheUser(role)
                const [topCompanies, topInvestors, recommendation] = await Promise.all([
                    fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/three-top-companies`),
                    fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/three-top-investors`),
                    fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/recommendations?userId=${userId}`),

                ]);
                if (!topCompanies.ok) {
                    throw new Error(`HTTP error! status: ${topCompanies.status}`);
                }
                if (!recommendation.ok) {
                    throw new Error(`HTTP error! status: ${recommendation.status}`);
                }
                if (!topInvestors.ok) {
                    throw new Error(`HTTP error! status: ${topInvestors.status}`);
                }
                const dataTopCompanies = await topCompanies.json();
                const dataTopInvestors = await topInvestors.json();
                const dataRecommendations = await recommendation.json();
                setTopCompanies(dataTopCompanies);
                setTopInvestors(dataTopInvestors)
                setRecommendations(dataRecommendations);
                console.log(dataTopCompanies);
                console.log(dataTopInvestors)
                console.log(dataRecommendations);
            } catch (err) {
                setError(err.message);
                console.error('فشل في جلب البيانات:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomePageData();
    }, [dispatch, refresh]);
    if (loading) {
        return (
            <Loading />
        );
    }
    return (
        <div className="overflow-auto ">
            <div className={`mt-14  overflow-y-hidden text-white ${vazir.className}`}  >
                <SearchBar />
                <Top3 topCompanies={topCompanies?.data?.finalTopThreeCompaines} topInvestors={topInvestors?.data?.investor} />
                <SuitableCo recommendedCo={recommendations?.data?.companies||recommendations?.data?.suggestedCompanies}/>
                {role == "company" ? <SupportPosts recommendedSupportPosts={recommendations?.data?.newSupportPosts} role={role} token={token}/> : ""}
                {role == "company" || role == "charityOrganization" || role == "supportOrganization" ? <RecommendedInverstors  recommendedInvestors={recommendations?.data?.investors}/> : ""}
                <SuitableCharities  role={role} recommendedCharatyPosts={recommendations?.data?.newCharityPosts||recommendations?.data?.posts} token={token}/>
            </div>
        </div>
    )
}

