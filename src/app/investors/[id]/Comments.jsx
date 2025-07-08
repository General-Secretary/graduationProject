// "use client"
// import { useState } from 'react';

// export default function Comments() {
//     const [comments, setComments] = useState([
//         {
//             id: 'c1',
//             userName: 'Ahmed Ali',
//             userAvatar: 'https://ui-avatars.com/api/?name=Ahmed+Ali',
//             text: 'مبروك يا زيدان!',
//             replies: [
//                 {
//                     id: 'r1',
//                     userName: 'Zidan',
//                     userAvatar: 'https://ui-avatars.com/api/?name=Zidan',
//                     text: 'الله يبارك فيك يا أحمد ❤️'
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

//     return (<div className='p-5 container xl:w-[95%] mx-auto'>
//         <div className='flex justify-center items-center'>
//             <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
//             </div>
//             <div className='xs:w-1/2 md:w-1/4'>
//                 <p className='text-white text-center  font-semibold my-7 text-3xl'> آخر التعليقات </p>
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
//             {/* <div className="mt-6">
//                 <input placeholder="اكتب تعليقك..." type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} name='name' id='name' className='bg-transparent border  border-green-300  text-lg rounded-full py-5   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 ' />
//                 <button
//                     onClick={handleAddComment}
//                     className="text-black bg-[#00F560] hover:bg-[#38ba6c] font-semibold rounded-full text-sm px-10 py-4 my-3"
//                 >
//                     إضافة تعليق
//                 </button>
//             </div> */}
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
//                     className="text-black  absolute end-1.5 top-1/2 -translate-y-1/2 bg-[#00F560] hover:bg-[#38ba6c]   font-medium rounded-full text-sm px-6 py-2"
//                 >
//                     إرسال الرد
//                 </button> */}
//             </div>
//         </div>
//     );
// } 


import Link from 'next/link'
import React from 'react'

export default function Comments({ comments, name, img }) {
    return (
        <div className="lg:w-[95%] mx-auto">
            <div className='flex justify-center items-center'>
                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                </div>
                <div className='xs:w-1/2 md:w-1/4'>
                    <p className='text-white text-center  font-semibold my-7 text-3xl'> آخر التعليقات </p>
                </div>
                <div className='xs:w-[25%] md:w-[37.5%] border-b border-gray-500'>
                </div>
            </div>
            <div style={{ direction: "rtl" }} className="max-w-2xl text-white mx-auto p-4">
                {/* {comments.data.comments.map(obj => <Link href={`/startUps/${obj.companyId._id}#comment`}>
                    <div className="mb-6 bg-[#FFFFFF0D] hover:bg-green-800 cursor-pointer p-4 rounded-3xl ">
                        <p className="text-[#00F560]">
                            تعليق لشركه {obj.companyId.companyName}
                        </p>
                        <div className="flex items-start gap-3">
                            <img src={img} alt="" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{name}</p>
                                <p className="text-gray-400">{obj.questionText}</p>
                            </div>
                        </div>
                    </div>
                </Link>)} */}


{comments.data.comments.length === 0 ? (
                    <p className=" text-center">لا يوجد تعليقات لهذا المستثمر بعد</p>
                ) : (
                    comments.data.comments.map(obj => (
                        <Link href={`/startUps/${obj.companyId._id}#comment`} key={obj._id}>
                            <div className="mb-6 bg-[#FFFFFF0D] hover:bg-green-800 cursor-pointer p-4 rounded-3xl">
                                <p className="text-[#00F560]">
                                    تعليق لشركه {obj.companyId.companyName}
                                </p>
                                <div className="flex items-start gap-3">
                                    <img src={img} alt="" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{name}</p>
                                        <p className="text-gray-400">{obj.questionText}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}

            </div>
        </div>
    )
}
