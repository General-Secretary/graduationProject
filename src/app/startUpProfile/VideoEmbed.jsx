import React from 'react';

const VideoEmbed = ({ videoLink }) => {
    // دالة لتحويل الرابط إلى embed إذا كان رابط يوتيوب صالح
    const convertToEmbedURL = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu\.be)\/(watch\?v=|embed\/|)([a-zA-Z0-9_-]{11})$/;

        // إذا كان الرابط هو رابط youtu.be
        if (url.includes('youtu.be')) {
            const videoId = url.split('/').pop().split('?')[0]; // استخراج ID الفيديو وتجاهل أي معلمات إضافية
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // إذا كان الرابط هو رابط youtube.com/watch، نقوم باستخراج ID الفيديو وتحويله إلى embed
        if (url.includes('youtube.com/watch')) {
            const urlParams = new URLSearchParams(new URL(url).search);
            if (urlParams.has('v')) {
                return `https://www.youtube.com/embed/${urlParams.get('v')}`;
            }
        }

        // إذا كان الرابط هو بالفعل embed، نعيده كما هو
        if (url.includes('youtube.com/embed')) {
            return url;
        }

        // إذا لم يكن رابط يوتيوب صالح، نعيده كما هو (أو نعرض رسالة خطأ)
        return 'Invalid YouTube URL';
    };

    // تحويل الرابط المرسل إلى embed
    const embedUrl = convertToEmbedURL(videoLink);

    return (
          <div className="w-full h-full">
            {embedUrl === 'Invalid YouTube URL' ? (
                <p className="text-red-500">رابط الفيديو غير صالح</p>
            ) : (
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    allowFullScreen
                    title="Company Video"
                    style={{
                        overflow: 'hidden', // منع التمرير داخل الـ iframe
                    }}
                ></iframe>
            )}
        </div>
    );
};
export default VideoEmbed;
