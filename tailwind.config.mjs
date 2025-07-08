/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [flowbite.content(),
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { screens: {
      xs: '480px', 
          sm: "600px",   
          md: "900px",  
          lg: "1200px",  
          xl: "1536px",  
    },

      fontFamily: {
        kufi: ["Noto Kufi Arabic", "sans-serif"],
        vazir: ["Vazirmatn", "sans-serif"],  roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [ flowbite.plugin(),],
};


// /** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite/plugin");
// const daisyui = require("daisyui");

// module.exports = {
//   important: true, // يجعل جميع الكلاسات في Tailwind لها الأولوية
//   content: [
//     "./node_modules/flowbite-react/**/*.js",
//     "./node_modules/daisyui/dist/**/*.js",
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         xs: "480px",
//         sm: "600px",
//         md: "900px",
//         lg: "1200px",
//         xl: "1536px",
//       },
//       fontFamily: {
//         kufi: ["Noto Kufi Arabic", "sans-serif"],
//         vazir: ["Vazirmatn", "sans-serif"],
//         roboto: ["Roboto", "sans-serif"],
//       },
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   daisyui: {
//     base: false,  // تعطيل التأثيرات الافتراضية على عناصر HTML
//     styled: false, // إيقاف تنسيقات DaisyUI الافتراضية
//     themes: false, // منع تغيير الثيم التلقائي
//   },
//   plugins: [flowbite, daisyui], // تحميل Flowbite أولًا ثم DaisyUI
// };
