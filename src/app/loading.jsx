import React from 'react'
import { Spinner } from "flowbite-react"; // 👈 استيراد السبينر من Flowbite

export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner aria-label="جاري التحميل" size="xl" />
            <span className="ml-2 text-gray-700">جاري تحميل البيانات...</span>
        </div>
    );
}