import React, { useState, useEffect } from 'react';
import axios from 'axios'; import { Spinner } from "flowbite-react";
import toast from 'react-hot-toast';
import { Vazirmatn } from 'next/font/google';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });
const CommentComponent = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [replyTexts, setReplyTexts] = useState({});
    const [repliedComments, setRepliedComments] = useState({});
    const [loadingStates, setLoadingStates] = useState({});
    const [token, setTokenOfTheUser] = useState(null);
    const dispatch = useDispatch();
    const fetchComments = async () => {
        const result = await dispatch(fetchUserToken()).unwrap();
        const userToken = result;
        if (!userToken) throw new Error("User ID is null");
        setTokenOfTheUser(userToken)
        axios
            .get(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/comments?companyId=${id}`)
            .then((response) => {
                setComments(response.data.data.comments);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-600">
                                        Failed to load comments.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-red-500">
                            <button
                                onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ), { duration: 1000 })
            });
    };
    useEffect(() => {
        fetchComments();
    }, [id]);
    const handleReplyChange = (commentId, value) => {
        setReplyTexts((prev) => ({
            ...prev,
            [commentId]: value,
        }));
    };
    const handleReplySubmit = (commentId) => {
        if (repliedComments[commentId]) {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-red-600">
                                    You can only reply once to this comment!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-red-500">
                        <button
                            onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 1000 })
            return;
        }
        const replyText = replyTexts[commentId] || "";
        if (replyText.trim() === "") {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`} >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-red-600">
                                    Please enter a reply.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-red-500">
                        <button
                            onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 1000 })
            return;
        }
        setLoadingStates((prev) => ({ ...prev, [commentId]: true }));
        axios
            .patch(
                `https://estethmarat-estethmarats-projects.vercel.app/api/v1/comments/${commentId}/answer`,
                { answerText: replyText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-[#00F560]">
                                        {"Reply submitted successfully!"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-green-500">
                            <button
                                onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ), { duration: 1000 })
                setRepliedComments((prev) => ({
                    ...prev,
                    [commentId]: true,
                }));
                setReplyTexts((prev) => ({
                    ...prev,
                    [commentId]: '',
                }));
                fetchComments();
            })
            .catch((error) => {
                console.error('Error submitting reply:', error);
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-600">
                                        Failed to submit reply.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-red-500">
                            <button
                                onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ), { duration: 1000 })
            })
            .finally(() => {
                setLoadingStates((prev) => ({ ...prev, [commentId]: false }));
            });
    };
    return (<div className={` ${vazir.className}`}>
        <div className='flex mx-auto lg:w-[85%] justify-center items-center'>
            <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
            </div>
            <div className='xs:w-1/2 md:w-1/4'>
                <p className='text-white text-center  font-semibold my-7 text-3xl'> التعليقات والأسئلة</p>
            </div>
            <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
            </div>
        </div>
        <div style={{ direction: "rtl" }} className="max-w-4xl mx-auto my-4 lg:p-6 bg-transparent shadow-lg rounded-lg">
            {comments.length === 0 ? (
                <p className="text-white text-center text-xl my-6">لا يوجد تعليقات حتى الآن.</p>
            ) :
                (comments.map((comment) => (
                    <div key={comment._id} className="mb-6 p-4 ">
                        <div className="flex items-center gap-3 mb-4">
                            {comment?.investorId?._id ? (
                                <Link href={`/investors/${comment.investorId._id}`}>
                                    <img
                                        src={comment.investorId?.profilePhoto || `https://ui-avatars.com/api/?name=مجهول`}
                                        alt="Investor"
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                </Link>
                            ) : (
                                <img
                                    src={comment.investorId?.profilePhoto || `https://ui-avatars.com/api/?name=مجهول`}
                                    alt="Investor"
                                    className="w-12 h-12 rounded-full mr-3 opacity-60 cursor-default"
                                />
                            )}
                            <div>
                                {comment?.investorId?._id ? (
                                    <Link href={`/investors/${comment.investorId._id}`}>
                                        <p className="font-medium text-white">{comment.investorId?.fullArabicName || 'مجهول'}</p>
                                    </Link>
                                ) : (
                                    <p className="font-medium text-white opacity-60">{comment.investorId?.fullArabicName || 'مجهول'}</p>
                                )}
                                <p className="text-sm text-gray-500">{comment.createdAt}</p>
                            </div>
                        </div>
                        <p className="text-lg text-[#00F560] mb-2">{comment.questionText}</p>
                        <p className="text-gray-500  mb-4"> <span className="text-[#00F560]">الرد:</span> {comment.answerText ? ` ${comment.answerText}` : 'لم تجب بعد'}</p>
                        {comment.status === 'pending' && !repliedComments[comment._id] && (
                            <div className="flex relative flex-col">
                                <textarea
                                    value={replyTexts[comment._id] || ''}
                                    onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                                    placeholder="اكتب الرد المناسب هنا"
                                    className="resize-none  mb-4       bg-transparent border  border-green-300  text-lg rounded-3xl py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500"
                                />
                                <button onClick={() => handleReplySubmit(comment._id)}
                                    disabled={loadingStates[comment._id]}
                                    className="text-black  absolute end-1.5 bottom-1 -translate-y-1/2 bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                                >
                                    {loadingStates[comment._id] ? <Spinner aria-label="جاري التحميل" size="md" /> : "إرسال الرد"}
                                </button>
                            </div>
                        )}
                    </div>
                )))}
        </div>
    </div>
    );
};

export default CommentComponent;