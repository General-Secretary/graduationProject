export default function GlowBackground() {
    return (
        <>
            <div className="fixed left-0 top-0 w-2/3 h-1/3 sm:w-1/2 sm:h-1/4 md:w-1/3 md:h-1/3 lg:w-1/4 lg:h-1/2 bg-green-700 opacity-50 blur-2xl rounded-full z-0" style={{ filter: 'blur(80px)' }}></div>
            <div className="fixed right-0 bottom-0 w-2/3 h-1/3 sm:w-1/2 sm:h-1/4 md:w-1/3 md:h-1/3 lg:w-1/4 lg:h-1/2 bg-green-700 opacity-50 blur-2xl rounded-full z-0" style={{ filter: 'blur(70px)' }}></div>
        </>
    );
}