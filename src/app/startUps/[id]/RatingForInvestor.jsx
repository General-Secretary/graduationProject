// 'use client';

// import { useState } from 'react';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';

// export default function RatingForInvestor({userId,companyId,token,reviewerType}) {
//     const [value, setValue] = useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//         console.log('القيمة الجديدة:', newValue);
//     };

//     return (
//         <Rating
//             name="text-feedback"
//             value={value}
//             precision={0.5}
//             onChange={handleChange}
//             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//         />

//     );
// }
'use client';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
export default function RatingForInvestor({ userId, companyId, token, reviewerType }) {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRating = async () => {
            try {
                const res = await fetch(`https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ companyId }),
                });
                if (!res.ok) throw new Error('No previous review');
                const data = await res.json();
                setValue(data.review.rating);
            } catch (error) {
                console.log('No previous review or error:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRating();
    }, [userId, companyId, token]);
    const handleChange = async (event, newValue) => {
        setValue(newValue);
        try {
            const res = await fetch('https://estethmarat-estethmarats-projects.vercel.app/api/v1/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    companyId,
                    reviewerType,
                    rating: newValue,
                }),
            });
            const data = await res.json();
            console.log('تم إرسال التقييم:', data);
        } catch (error) {
            console.error('خطأ في إرسال التقييم:', error);
        }
    };
    if (loading) return <p>جاري التحميل...</p>;
    return (
        <Rating
            name="text-feedback"
            value={value}
            readOnly={value}
            precision={0.5}
            onChange={handleChange}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
    );
}
