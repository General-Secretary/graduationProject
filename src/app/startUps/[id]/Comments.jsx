// "use client"
// import { useState } from 'react';
// import { useSelector } from "react-redux";

// export default function Comments() {
//     const role = useSelector((state) => state.userType.role);

//     const [comments, setComments] = useState([
//         {
//             id: 'c1',
//             userName: 'كريم جعفر',
//             userAvatar: 'https://ui-avatars.com/api/?name=Ahmed+Ali',
//             text: 'يا ألافتي !!',
//             replies: [
//                 {
//                     id: 'r1',
//                     userName: 'انور جعفر',
//                     userAvatar: 'https://ui-avatars.com/api/?name=Anwer',
//                     text: 'يب'
//                 }
//             ]
//         }
//     ]);
//     const [newComment, setNewComment] = useState('');
//     // هنا نخلي مثلا نحدد مين صاحب الصفحة
//     const isPageOwner = true; // غيرها حسب اللي داخل
//     const handleAddComment = () => {
//         if (newComment.trim() === '') return;
//         const newCommentObj = {
//             id: Math.random().toString(36).substr(2, 9),
//             userName: isPageOwner ? 'Zidan' : 'Visitor',
//             userAvatar: 'https://ui-avatars.com/api/?name=Visitor',
//             text: newComment,
//             replies: []
//         };
//         setComments([...comments, newCommentObj]);
//         setNewComment('');
//     };
//     const handleAddReply = (commentId, replyText) => {
//         if (replyText.trim() === '') return;
//         const updatedComments = comments.map((comment) => {
//             if (comment.id === commentId) {
//                 return {
//                     ...comment,
//                     replies: [
//                         ...comment.replies,
//                         {
//                             id: Math.random().toString(36).substr(2, 9),
//                             userName: 'Zidan', // صاحب الصفحة فقط
//                             userAvatar: 'https://ui-avatars.com/api/?name=Zidan',
//                             text: replyText
//                         }
//                     ]
//                 };
//             }
//             return comment;
//         });
//         setComments(updatedComments);
//     };
//     return (<div id="comment" className='p-5 container xl:w-[95%] mx-auto'>
//         <div className='flex justify-center items-center'>
//             <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//             </div>
//             <div className='xs:w-1/2 md:w-1/4'>
//                 <p className='text-white text-center  font-semibold my-7 text-3xl'> التعليقات والأسئلة</p>
//             </div>
//             <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//             </div>
//         </div>
//         <div style={{ direction: "rtl" }} className="max-w-2xl text-white mx-auto p-4">
//             {comments.map((comment) => (
//                 <div key={comment.id} className="mb-6">
//                     <div className="flex items-start gap-3">
//                         <img src={comment.userAvatar} alt="" className="w-10 h-10 rounded-full" />
//                         <div>
//                             <p className="font-semibold">{comment.userName}</p>
//                             <p className="text-gray-400">{comment.text}</p>
//                         </div>
//                     </div>
//                     {/* عرض الردود */}
//                     <div className="mr-12 mt-2 space-y-2">
//                         {comment.replies.map((reply) => (
//                             <div key={reply.id} className="flex items-start gap-3">
//                                 <img src={reply.userAvatar} alt="" className="w-8 h-8 rounded-full" />
//                                 <div>
//                                     <p className="font-semibold text-sm">{reply.userName}</p>
//                                     <p className="text-gray-400 text-sm">{reply.text}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     {/* لو انت صاحب الصفحة يظهرلك input للرد */}
//                     {isPageOwner && (
//                         <ReplyInput onSubmit={(text) => handleAddReply(comment.id, text)} />
//                     )}
//                 </div>
//             ))}
//             {/* إضافة تعليق جديد */}
//             <div className="mt-6">
//                 {role=="investor"&&
//                     <div className="relative  w-full">
//                     <textarea
//                         autoComplete="off"
//                         style={{ direction: "rtl" }}
//                         className="bg-transparent border border-green-300 text-lg rounded-3xl py-5 focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500"
//                         placeholder="اكتب تعليقك..."
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         name="name"
//                         rows="4" // عدد الأسطر الافتراضية
//                     />
//                     <button onClick={handleAddComment}
//                         className="text-black  absolute end-1 bottom-1   bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
//                     >
//                         اضافه تعليق
//                     </button>
//                 </div>
//                 }
//             </div>
//         </div>
//     </div>
//     );
// }
// // كومبوننت input الرد
// function ReplyInput({ onSubmit }) {
//     const [replyText, setReplyText] = useState('');
//     const handleReply = () => {
//         onSubmit(replyText);
//         setReplyText('');
//     };
//     return (
//         <div className="mt-2">
//             <div className="relative pr-12  w-full">
//                 {/* <textarea
//                     autoComplete="off"
//                     type="text"
//                     style={{ direction: "rtl" }}
//                     id="default-search"
//                     className="bg-transparent border  border-green-300  text-lg rounded-3xl py-2  focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 "
//                     placeholder="اكتب ردك..." value={replyText} onChange={(e) => setReplyText(e.target.value)}
//                     rows="2"
//                 />
//                 <button onClick={handleReply}
//                     type="button"
//                     className="text-black  absolute end-1 bottom-1  bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
//                 >
//                     إرسال الرد
//                 </button> */}
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { Vazirmatn } from 'next/font/google';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';

const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });

const Comments = ({ companyId, role }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const fetchComments = async () => {
        try {
            const res = await axios.get(
                `https://estethmarat-estethmarats-projects.vercel.app/api/v1/comments?companyId=${companyId}`
            );
            setComments(res.data.data.comments);
        } catch (error) {
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
        }
    };

    const submitComment = async () => {
        if (!newComment.trim()) {
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

        setSubmitting(true);
        try {
            const result = await dispatch(fetchUserToken()).unwrap();
            await axios.post(
                'https://estethmarat-estethmarats-projects.vercel.app/api/v1/comments',
                {
                    companyId,
                    questionText: newComment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${result}`,
                    },
                }
            );
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
            setNewComment('');
            fetchComments();
        } catch (err) {
            console.error('Error submitting comment:', err);
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
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [companyId]);

    
    return (
        <div id="comment" className={` ${vazir.className}`}>
            <div className='flex mx-auto lg:w-[85%] justify-center items-center'>
                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'></div>
                <div className='xs:w-1/2 md:w-1/4'>
                    <p className='text-white text-center font-semibold my-7 text-3xl'> التعليقات والأسئلة</p>
                </div>
                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'></div>
            </div>

            <div style={{ direction: 'rtl' }} className="max-w-4xl mx-auto my-4 lg:p-6 bg-transparent shadow-lg rounded-lg">
                {/* عرض التعليقات */}
                {role == "investor" ? <div className="mt-8 relative">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="اكتب تعليقك أو سؤالك هنا..."
                        className="resize-none bg-transparent border border-green-300 text-lg rounded-3xl py-5 focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={submitComment}
                            disabled={submitting}
                            className="text-black   absolute end-1.5 bottom-1 -translate-y-1/2 bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
                        >
                            {submitting ? <Spinner size="sm" /> : 'إرسال التعليق'}
                        </button>
                    </div>
                </div> : ""}
                {comments.length === 0 ? (
                    <p className="text-white text-center text-xl my-6">لا يوجد تعليقات حتى الآن.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="mb-6 p-4">
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
                            <p className="text-gray-500 mb-4">
                                <span className="text-[#00F560]">الرد:</span> {comment.answerText ? ` ${comment.answerText}` : 'لم يتم الرد بعد'}
                            </p>
                        </div>
                    ))
                )}

                {/* إضافة تعليق جديد */}

            </div>
        </div>
    );
};

export default Comments;
